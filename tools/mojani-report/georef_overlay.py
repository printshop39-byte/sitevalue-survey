# -*- coding: utf-8 -*-
"""मोजणी नकाशातील हद्द उपग्रह प्रतिमेवर बसवणे (georeferenced satellite overlay).

मोजणी नकाशा स्थानिक ग्रिडवर असतो — त्यात अक्षांश-रेखांश नसतात. पण नकाशावर
प्रमाण (1:500) आणि उत्तर दिशेचा बाण दिलेला असतो. म्हणजे scale व rotation आधीच माहीत
असतात — फक्त "हा नकाशा पृथ्वीवर नेमका कुठे" एवढेच ठरवायचे उरते.

दोन पद्धती:
  anchor  — एकाच कोपऱ्याचे lat/lon पुरे. rotation नकाशाच्या उत्तर बाणावरून, scale 1:500 वरून.
  २ बिंदू — दोन कोपऱ्यांचे lat/lon दिल्यास similarity transform काढून scale व rotation
            पडताळले जातात. जास्त विश्वासार्ह; शक्य असल्यास हेच वापरा.

वापर:
    python georef_overlay.py control.json --out overlay.png --geojson plot.geojson

control.json चा नमुना control.sample.json मध्ये आहे.

टीप: टाइल सर्व्हरचा वापर त्या-त्या सेवेच्या अटींनुसारच करावा. व्यावसायिक अहवालात
Esri / Google यांच्या प्रतिमा वापरताना परवाना व श्रेय (attribution) बंधनकारक आहे;
OpenStreetMap ODbL अंतर्गत येते.
"""
from __future__ import annotations
import argparse, io, json, math, sys, urllib.request

TILE = 256

# ---------- Web Mercator ----------
def ll2m(lat, lon):
    """अक्षांश-रेखांश → Web Mercator मीटर."""
    x = math.radians(lon) * 6378137.0
    y = math.log(math.tan(math.pi / 4 + math.radians(lat) / 2)) * 6378137.0
    return x, y

def m2ll(x, y):
    lon = math.degrees(x / 6378137.0)
    lat = math.degrees(2 * math.atan(math.exp(y / 6378137.0)) - math.pi / 2)
    return lat, lon

def m2px(x, y, z):
    s = TILE * 2 ** z
    return (x + 20037508.342789244) / 40075016.685578488 * s, \
           (20037508.342789244 - y) / 40075016.685578488 * s

# ---------- similarity transform ----------
def solve_similarity(src, dst):
    """दोन जुळणाऱ्या बिंदूंवरून scale+rotation+translation काढते.

    src, dst: [(x1,y1),(x2,y2)] — src स्थानिक मीटर, dst Web Mercator मीटर.
    परत: फंक्शन (x,y) -> (X,Y)
    """
    (ax, ay), (bx, by) = src
    (AX, AY), (BX, BY) = dst
    sdx, sdy = bx - ax, by - ay
    ddx, ddy = BX - AX, BY - AY
    slen = math.hypot(sdx, sdy)
    dlen = math.hypot(ddx, ddy)
    if slen < 1e-9:
        raise SystemExit('control बिंदू एकाच जागी आहेत — वेगवेगळे दोन कोपरे द्या.')
    k = dlen / slen
    th = math.atan2(ddy, ddx) - math.atan2(sdy, sdx)
    ct, st = math.cos(th), math.sin(th)
    def f(x, y):
        dx, dy = x - ax, y - ay
        return (AX + k * (dx * ct - dy * st), AY + k * (dx * st + dy * ct))
    f.scale, f.rotation_deg = k, math.degrees(th)
    return f

# ---------- tiles ----------
def fetch_tiles(bbox_px, z, url_tpl, ua):
    from PIL import Image
    x0, y0, x1, y1 = bbox_px
    tx0, ty0 = int(x0 // TILE), int(y0 // TILE)
    tx1, ty1 = int(x1 // TILE), int(y1 // TILE)
    canvas = Image.new('RGB', ((tx1 - tx0 + 1) * TILE, (ty1 - ty0 + 1) * TILE), (32, 32, 32))
    for tx in range(tx0, tx1 + 1):
        for ty in range(ty0, ty1 + 1):
            url = url_tpl.format(z=z, x=tx, y=ty)
            req = urllib.request.Request(url, headers={'User-Agent': ua})
            try:
                with urllib.request.urlopen(req, timeout=30) as r:
                    img = Image.open(io.BytesIO(r.read())).convert('RGB')
            except Exception as e:                     # एखादी टाइल आली नाही तरी चालू ठेवा
                print('  टाइल मिळाली नाही %s/%s/%s: %s' % (z, tx, ty, e), file=sys.stderr)
                continue
            canvas.paste(img, ((tx - tx0) * TILE, (ty - ty0) * TILE))
    return canvas, tx0 * TILE, ty0 * TILE

def main():
    ap = argparse.ArgumentParser(description='मोजणी हद्द उपग्रह प्रतिमेवर बसवते')
    ap.add_argument('control', help='control.json — vertices, parcels व GPS बिंदू')
    ap.add_argument('--out', default='overlay.png')
    ap.add_argument('--geojson', default=None, help='parcels चा GeoJSON इथे लिहा')
    ap.add_argument('--zoom', type=int, default=19)
    ap.add_argument('--pad', type=float, default=25.0, help='हद्दीभोवती किती मीटर जागा')
    ap.add_argument('--no-imagery', action='store_true', help='टाइल न आणता फक्त GeoJSON काढा')
    a = ap.parse_args()

    cfg = json.load(open(a.control, encoding='utf-8'))
    V = {k: tuple(v) for k, v in cfg['vertices_m'].items()}     # स्थानिक मीटर (X पूर्व, Y उत्तर)
    cps = cfg['control_points']
    if not cps:
        raise SystemExit('किमान एक GPS control बिंदू लागतो.')
    lat0 = cps[0]['lat']
    if len(cps) == 1:
        # anchor पद्धत: rotation नकाशाच्या उत्तर बाणावरून, scale 1:500 वरून आधीच माहीत
        n_off = math.radians(cfg.get('north_offset_deg', 0.0))
        ax, ay = V[cps[0]['vertex']]
        AX, AY = ll2m(lat0, cps[0]['lon'])
        inv = 1.0 / math.cos(math.radians(lat0))     # ground मीटर → Web Mercator मीटर
        ct, st = math.cos(n_off), math.sin(n_off)
        def T(x, y):
            dx, dy = (x - ax) * inv, (y - ay) * inv
            return (AX + dx * ct - dy * st, AY + dx * st + dy * ct)
        T.scale, T.rotation_deg = inv, math.degrees(n_off)
        print('anchor पद्धत — बिंदू %s वर स्थिर, उत्तर बाणानुसार rotation %.2f°'
              % (cps[0]['vertex'], cfg.get('north_offset_deg', 0.0)))
        print('इशारा: एकाच GPS बिंदूवर आधारित — संपूर्ण हद्द त्या बिंदूइतकीच अचूक असेल '
              '(मोबाईल GPS ± 3–5 मी.). शक्य असल्यास दुसरा बिंदू घेऊन पडताळा.', file=sys.stderr)
    else:
        names = [c['vertex'] for c in cps[:2]]
        src = [V[n] for n in names]
        dst = [ll2m(cps[i]['lat'], cps[i]['lon']) for i in range(2)]
        T = solve_similarity(src, dst)
        # Web Mercator अंतर अक्षांशानुसार फुगते; प्रत्यक्ष जमिनीवरील scale काढण्यासाठी ते मागे घ्या
        ground = T.scale * math.cos(math.radians(lat0))
        print('जमिनीवरील scale %.4f  ·  rotation %.3f°  (1.0000 म्हणजे नकाशा व GPS तंतोतंत जुळले)'
              % (ground, T.rotation_deg))
        if abs(ground - 1.0) > 0.02:
            print('इशारा: scale 1.0000 पासून %.1f%% दूर आहे — GPS बिंदू किंवा कोपऱ्यांची नावे तपासा.'
                  % ((ground - 1) * 100), file=sys.stderr)

    merc = {k: T(*p) for k, p in V.items()}
    parcels = cfg['parcels']

    if a.geojson:
        feats = []
        for name, ring in parcels.items():
            coords = [list(reversed(m2ll(*merc[v]))) for v in ring]      # [lon, lat]
            coords.append(coords[0])
            feats.append({'type': 'Feature',
                          'properties': {'survey_no': name,
                                         'area_sqm': cfg.get('areas_sqm', {}).get(name),
                                         'holder': cfg.get('holders', {}).get(name)},
                          'geometry': {'type': 'Polygon', 'coordinates': [coords]}})
        json.dump({'type': 'FeatureCollection', 'features': feats},
                  open(a.geojson, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print('लिहिले:', a.geojson)

    if a.no_imagery:
        return

    from PIL import Image, ImageDraw, ImageFont
    z = a.zoom
    pts = [m2px(*merc[v], z) for v in merc]
    mpp = 40075016.685578488 / (TILE * 2 ** z) * math.cos(math.radians(lat0))
    padpx = a.pad / mpp
    x0 = min(p[0] for p in pts) - padpx; x1 = max(p[0] for p in pts) + padpx
    y0 = min(p[1] for p in pts) - padpx; y1 = max(p[1] for p in pts) + padpx
    PRESETS = {
        # उपग्रह प्रतिमा
        'esri':   'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        'bhuvan': 'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?...',   # ISRO — खाते व key लागते
        # नकाशा (उपग्रह नव्हे) — OpenStreetMap कडे स्वतःची उपग्रह प्रतिमा नाही
        'osm':    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    }
    url = cfg.get('tile_url') or PRESETS.get(cfg.get('tiles', 'esri'), PRESETS['esri'])
    canvas, ox, oy = fetch_tiles((x0, y0, x1, y1), z, url, cfg.get('user_agent', 'sitevalue-survey/1.0'))
    img = canvas.crop((int(x0 - ox), int(y0 - oy), int(x1 - ox), int(y1 - oy))).convert('RGBA')
    layer = Image.new('RGBA', img.size, (0, 0, 0, 0))
    dr = ImageDraw.Draw(layer)
    fills = cfg.get('fills', {})
    for name, ring in parcels.items():
        poly = [(m2px(*merc[v], z)[0] - x0, m2px(*merc[v], z)[1] - y0) for v in ring]
        rgb = fills.get(name, [255, 255, 0])
        dr.polygon(poly, fill=tuple(rgb) + (70,), outline=(220, 40, 20, 255))
    outer = [(m2px(*merc[v], z)[0] - x0, m2px(*merc[v], z)[1] - y0) for v in cfg['outer']]
    dr.line(outer + [outer[0]], fill=(255, 235, 0, 255), width=4)
    try:
        font = ImageFont.truetype(cfg.get('font', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'), 15)
    except Exception:
        font = ImageFont.load_default()
    for name, ring in parcels.items():
        poly = [(m2px(*merc[v], z)[0] - x0, m2px(*merc[v], z)[1] - y0) for v in ring]
        cx = sum(p[0] for p in poly) / len(poly); cy = sum(p[1] for p in poly) / len(poly)
        dr.text((cx, cy), name, fill=(255, 255, 255, 255), font=font, anchor='mm',
                stroke_width=3, stroke_fill=(0, 0, 0, 200))
    out = Image.alpha_composite(img, layer).convert('RGB')
    ImageDraw.Draw(out).text((8, out.size[1] - 20), cfg.get('attribution', 'Imagery © respective provider'),
                             fill=(255, 255, 255), font=font, stroke_width=2, stroke_fill=(0, 0, 0))
    out.save(a.out)
    print('लिहिले:', a.out, out.size)

if __name__ == '__main__':
    main()
