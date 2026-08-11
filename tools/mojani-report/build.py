# -*- coding: utf-8 -*-
FT=3.28084; SQFT=10.7639; GUNTHA=101.17
def ft(m): return '%.2f'%(m*FT)

import sys, os, json
PORTRAIT='--portrait' in sys.argv
plan=open('plan_portrait.svg' if PORTRAIT else 'plan.svg').read()
iso=open('iso.svg').read()
det={n:open('det_2457_%s.svg'%n).read() for n in '1234'}

MAIN=[('A–B','उत्तर बाजू — मुख्य',25.28,'सि.स.नं. 2453/5 व 2460'),
      ('B–C','उत्तर बाजू — पश्चिम टोक',1.93,'सि.स.नं. 2460'),
      ('C–D','पश्चिम बाजू — उत्तर भाग',5.35,'सि.स.नं. 2461'),
      ('D–E','पश्चिम बाजू — दक्षिण भाग',5.74,'सि.स.नं. 2463'),
      ('E–F','दक्षिण बाजू — मुख्य',29.37,'सि.स.नं. 2496/1, 2496/2, 2496/3'),
      ('F–G','पूर्व बाजू — दक्षिण भाग',5.78,'लागू रस्ता'),
      ('G–H','पूर्व बाजू — मधला भाग',2.36,'लागू रस्ता'),
      ('H–A','पूर्व बाजू — उत्तर भाग',2.10,'लागू रस्ता')]

SUB={
 '2457/1':{'owner':'श्री. नेमिनाथ आण्णाप्पा वसवाडे','area':164.06,'pos':'दक्षिणेकडील संपूर्ण लांबीचा पट्टा',
   'sides':[('D–G','उत्तर — अंतर्गत हद्द',28.21,'सि.स.नं. 2457/4 व 2457/2',True),
            ('G–F','पूर्व',5.78,'लागू रस्ता',False),
            ('F–E','दक्षिण',29.37,'सि.स.नं. 2496/1, 2496/2, 2496/3',False),
            ('E–D','पश्चिम',5.74,'सि.स.नं. 2463',False)]},
 '2457/2':{'owner':'श्री. देवाप्पा आण्णाप्पा वसवाडे','area':62.30,'pos':'मधला पट्टा',
   'sides':[('P1–H','उत्तर — अंतर्गत हद्द',25.71,'सि.स.नं. 2457/3',True),
            ('H–G','पूर्व',2.36,'लागू रस्ता',False),
            ('G–P2','दक्षिण — अंतर्गत हद्द',26.11,'सि.स.नं. 2457/1',True),
            ('P2–P1','पश्चिम — अंतर्गत हद्द',2.46,'सि.स.नं. 2457/4',True)]},
 '2457/3':{'owner':'श्री. आदिनाथ आण्णाप्पा वसवाडे','area':62.30,'pos':'उत्तरेकडील पट्टा',
   'sides':[('B–A','उत्तर',25.28,'सि.स.नं. 2460 व 2453/5',False),
            ('A–H','पूर्व',2.10,'लागू रस्ता',False),
            ('H–P1','दक्षिण — अंतर्गत हद्द',25.71,'सि.स.नं. 2457/2',True),
            ('P1–B','पश्चिम — अंतर्गत हद्द',2.81,'सि.स.नं. 2457/4',True)]},
 '2457/4':{'owner':'तिघांच्या नावे सामाईक — नेमिनाथ, देवाप्पा व आदिनाथ वसवाडे','area':10.54,
   'pos':'पश्चिम टोकाचा सामाईक तुकडा',
   'sides':[('C–B','उत्तर',1.93,'सि.स.नं. 2460',False),
            ('B–P1','पूर्व — अंतर्गत हद्द',2.81,'सि.स.नं. 2457/3',True),
            ('P1–P2','पूर्व — अंतर्गत हद्द',2.46,'सि.स.नं. 2457/2',True),
            ('P2–D','दक्षिण — अंतर्गत हद्द',2.10,'सि.स.नं. 2457/1',True),
            ('D–C','पश्चिम',5.35,'सि.स.नं. 2461',False)]}}

AVG={'2457/1':(28.79,5.70),'2457/2':(25.91,2.40),'2457/3':(25.50,2.44),'2457/4':(5.35,1.97)}
TINT={'2457/1':'p1','2457/2':'p2','2457/3':'p3','2457/4':'p4'}

def side_rows(rows):
    out=[]
    for r in rows:
        code,desc,m,adj=r[0],r[1],r[2],r[3]
        cls=' class="internal"' if len(r)>4 and r[4] else ''
        out.append(f'<tr{cls}><td class="code">{code}</td><td>{desc}</td><td class="num strong">{ft(m)}</td>'
                   f'<td class="num alt">{m:.2f}</td><td class="adj">{adj}</td></tr>')
    return '\n'.join(out)

cards=[]
for i,(no,d) in enumerate(SUB.items(),1):
    L,W=AVG[no]
    cards.append(f'''<article class="card">
 <header class="card-head">
  <span class="swatch sw-{TINT[no]}" aria-hidden="true"></span>
  <div>
   <h3>सि.स.नं. {no}</h3>
   <p class="owner">{d['owner']}</p>
  </div>
  <div class="card-area"><strong>{d['area']*SQFT:,.2f}</strong><span>चौ.फूट · {d['area']:.2f} चौ.मी.</span></div>
 </header>
 <figure class="fig-det">{det[str(i)]}
  <figcaption>{d['pos']} — सर्व बाजूंची मापे फुटांमध्ये. बाण उत्तर दिशा दाखवतो.</figcaption>
 </figure>
 <div class="tbl-wrap"><table>
  <caption>सि.स.नं. {no} — बाजूनिहाय मापे</caption>
  <thead><tr><th>बाजू</th><th>दिशा / प्रकार</th><th class="num">फूट</th><th class="num">मीटर</th><th>लगत</th></tr></thead>
  <tbody>{side_rows(d['sides'])}</tbody>
 </table></div>
 <dl class="mini">
  <div><dt>सरासरी लांबी</dt><dd>{ft(L)} फूट <span class="alt">({L:.2f} मी.)</span></dd></div>
  <div><dt>सरासरी रुंदी</dt><dd>{ft(W)} फूट <span class="alt">({W:.2f} मी.)</span></dd></div>
  <div><dt>क्षेत्र</dt><dd>{d['area']*SQFT:,.2f} चौ.फूट <span class="alt">({d['area']/GUNTHA:.3f} गुंठे)</span></dd></div>
 </dl>
</article>''')

RATES_FILE=os.environ.get('RATES','rates.json')
def valuation_section():
    """rates.json मध्ये दर भरलेला असेल तरच पूर्ण मूल्यांकन तक्ता, अन्यथा काय हवे ते सांगणारा ब्लॉक."""
    if not os.path.exists(RATES_FILE):
        cfg=None
    else:
        cfg=json.load(open(RATES_FILE,encoding='utf-8'))
    asr=(cfg or {}).get('asr_rate_per_sqm')
    mkt=(cfg or {}).get('market_rate_per_sqft')
    if not asr and not mkt:
        return """<section>
 <div class="sec-head">
  <h2>मूल्यांकन (सूचक)</h2>
  <p class="sub">क्षेत्रफळ निश्चित झाले आहे; मूल्य काढण्यासाठी फक्त दर भरायचा बाकी आहे.</p>
 </div>
 <div class="notes">
  <h2>दर भरल्यावर हा विभाग आपोआप भरतो</h2>
  <ol>
   <li><strong>शासकीय दर (रेडी रेकनर / ASR).</strong> नोंदणी व मुद्रांक विभागाच्या त्या वर्षीच्या
       वार्षिक बाजारमूल्य दर तक्त्यातून — मौजे हुपरी, ता. हातकणंगले या गावाच्या संबंधित झोनचा
       <strong>खुल्या जमिनीचा दर ₹ प्रति चौ.मी.</strong> ही सि.स. (सिटी सर्व्हे) मिळकत असल्याने
       झोन/उपझोन सि.स.नं. क्रमांकाच्या पट्ट्यानुसार ठरतो — तक्त्यात 2457 कोणत्या पट्ट्यात येतो ते पहावे.</li>
   <li><strong>वर्ष.</strong> दर दरवर्षी 1 एप्रिलपासून बदलतो — अहवालात कोणत्या वर्षाचा दर वापरला ते नमूद होते.</li>
   <li><strong>बाजार दर (ऐच्छिक).</strong> ₹ प्रति चौ.फूट — नोंदणीकृत दस्तांवरून किंवा स्थानिक व्यवहारांवरून.</li>
   <li><strong>घटक (ऐच्छिक).</strong> रस्ता तोंड, आकार, सामाईक वापर यासाठी गुणक. काहीही गृहीत धरलेले नाही —
       प्रत्येक गुणक तुम्हीच ठरवायचा.</li>
  </ol>
 </div>
</section>
"""
    sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
    from valuation import compute, inr
    rows,tot=compute(cfg)
    cols='<th class="num">शासकीय मूल्य ₹</th>' if asr else ''
    cols+='<th class="num">बाजार मूल्य ₹</th>' if mkt else ''
    body=''
    for r in rows:
        body+=('<tr><td class="code">%s</td><td>%s</td><td class="num">%s</td>'
               '<td class="num">%.2f</td><td class="num">%.2f</td>'%(
                r['no'],r['holder'],format(round(r['sqft'],2),','),r['sqm'],r['factor']))
        if asr: body+='<td class="num strong">%s</td>'%inr(r['asr_value'])
        if mkt: body+='<td class="num">%s</td>'%inr(r['mkt_value'])
        body+='</tr>\n'
    foot='<tr><td>एकूण</td><td>—</td><td class="num">%s</td><td class="num">%.2f</td><td class="num">—</td>'%(
        format(round(tot['sqft'],2),','),tot['sqm'])
    if asr: foot+='<td class="num">%s</td>'%inr(tot['asr'])
    if mkt: foot+='<td class="num">%s</td>'%inr(tot['mkt'])
    foot+='</tr>'
    common=cfg.get('common_parcel'); extra=''
    if common:
        cr=next((r for r in rows if r['no']==common),None)
        shares=cfg.get('common_shares') or [r['no'] for r in rows if r['no']!=common]
        if cr and cr.get('asr_value'):
            extra=('<p class="sub">सामाईक %s चे शासकीय मूल्य ₹%s — %d धारकांत समान वाटल्यास '
                   'प्रत्येकी <strong>₹%s</strong>.</p>'%(common,inr(cr['asr_value']),len(shares),
                                                          inr(cr['asr_value']/len(shares))))
    src=[]
    if asr: src.append('शासकीय दर ₹%s/चौ.मी. — %s'%(inr(asr),cfg.get('asr_source') or 'स्रोत नोंदवलेला नाही'))
    if mkt: src.append('बाजार दर ₹%s/चौ.फूट — %s'%(inr(mkt),cfg.get('market_source') or 'स्रोत नोंदवलेला नाही'))
    return ("""<section>
 <div class="sec-head">
  <h2>मूल्यांकन (सूचक)</h2>
  <p class="sub">%s</p>
 </div>
 <div class="tbl-wrap"><table>
  <caption>पोटहिस्सानिहाय मूल्य</caption>
  <thead><tr><th>सि.स.नं.</th><th>धारक</th><th class="num">क्षेत्र (चौ.फूट)</th>
   <th class="num">चौ.मी.</th><th class="num">घटक</th>%s</tr></thead>
  <tbody>%s</tbody>
  <tfoot>%s</tfoot>
 </table></div>
 %s
 <p class="sub"><strong>अस्वीकरण:</strong> हे मूल्य सूचक (indicative) आहे. मुद्रांक शुल्कासाठीचे
 अधिकृत बाजारमूल्य नोंदणी व मुद्रांक विभागाच्या दर तक्त्यानुसार व शासनमान्य मूल्यांकनकर्त्याकडूनच ठरते.</p>
</section>
"""%(' · '.join(src),cols,body,foot,extra))

VALUATION=valuation_section()

summary_rows='\n'.join(
 f'<tr><td class="code"><span class="swatch sw-{TINT[no]}" aria-hidden="true"></span>{no}</td>'
 f'<td>{d["owner"]}</td><td class="num">{ft(AVG[no][0])}</td><td class="num">{ft(AVG[no][1])}</td>'
 f'<td class="num strong">{d["area"]*SQFT:,.2f}</td><td class="num alt">{d["area"]:.2f}</td>'
 f'<td class="num">{d["area"]/GUNTHA:.3f}</td></tr>' for no,d in SUB.items())

HTML=f'''<title>सि.स.नं. 2457, हुपरी — पोटहिस्सा मोजमापे व क्षेत्रफळ</title>
<style>
:root{{
 --bg:#E7EAE2; --surface:#FAFBF6; --surface-2:#F1F3EB; --ink:#1A231C; --muted:#5C6A5F;
 --rule:#C7CEC0; --rule-soft:#DDE2D6; --accent:#A8331F; --accent2:#24506B;
 --p1:#CFE0E8; --p2:#E6DFC9; --p3:#DCD3E4; --p4:#F0CFC4;
 --p1s:#9DBDCC; --p2s:#C4BB99; --p3s:#B3A5C2; --p4s:#D69F8C; --edge:#5C6A5F;
}}
@media (prefers-color-scheme:dark){{
 :root:not([data-theme="light"]){{
  --bg:#131611; --surface:#1B1F19; --surface-2:#222720; --ink:#E4E8DE; --muted:#98A294;
  --rule:#333A2F; --rule-soft:#272D24; --accent:#E5876E; --accent2:#8FBAD6;
  --p1:#20394480; --p2:#3C382680; --p3:#332C3E80; --p4:#482C2380;
  --p1s:#16262E; --p2s:#2A271B; --p3s:#221D2B; --p4s:#331F19; --edge:#7C8A7F;
 }}
}}
:root[data-theme="dark"]{{
  --bg:#131611; --surface:#1B1F19; --surface-2:#222720; --ink:#E4E8DE; --muted:#98A294;
  --rule:#333A2F; --rule-soft:#272D24; --accent:#E5876E; --accent2:#8FBAD6;
  --p1:#20394480; --p2:#3C382680; --p3:#332C3E80; --p4:#482C2380;
  --p1s:#16262E; --p2s:#2A271B; --p3s:#221D2B; --p4s:#331F19; --edge:#7C8A7F;
}}
*{{box-sizing:border-box}}
body{{
 margin:0; background:var(--bg); color:var(--ink);
 font-family:"Noto Sans Devanagari","Nirmala UI","Mangal",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
 font-size:16px; line-height:1.65; -webkit-font-smoothing:antialiased;
}}
.wrap{{max-width:1120px; margin:0 auto; padding:clamp(20px,4vw,56px) clamp(16px,4vw,40px) 96px;
 display:flex; flex-direction:column; gap:clamp(32px,5vw,56px)}}
h1,h2,h3{{font-family:"Noto Serif Devanagari","Tiro Devanagari Marathi",Georgia,serif; text-wrap:balance; margin:0; line-height:1.3}}
h1{{font-size:clamp(1.6rem,3.6vw,2.4rem); letter-spacing:-.01em}}
h2{{font-size:clamp(1.15rem,2.2vw,1.45rem)}}
h3{{font-size:1.08rem}}
p{{margin:0}}
.eyebrow{{font-size:.72rem; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); font-weight:600}}
header.masthead{{display:flex; flex-direction:column; gap:14px; padding-bottom:26px; border-bottom:2px solid var(--ink)}}
.sub{{color:var(--muted); max-width:62ch}}
.meta{{display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:2px 26px; margin-top:6px}}
.meta div{{padding:9px 0; border-top:1px solid var(--rule-soft)}}
.meta dt{{font-size:.7rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); font-weight:600}}
.meta dd{{margin:2px 0 0; font-size:.95rem}}
.stats{{display:grid; grid-template-columns:repeat(auto-fit,minmax(158px,1fr)); gap:14px}}
.stat{{background:var(--surface); border:1px solid var(--rule); border-radius:2px; padding:16px 18px;
 display:flex; flex-direction:column; gap:3px}}
.stat b{{font-size:1.7rem; font-weight:700; font-variant-numeric:tabular-nums; line-height:1.1}}
.stat span{{font-size:.78rem; color:var(--muted); letter-spacing:.05em}}
.stat.hero{{background:var(--ink); color:var(--bg); border-color:var(--ink)}}
.stat.hero span{{color:var(--bg); opacity:.72}}
section{{display:flex; flex-direction:column; gap:16px}}
.sec-head{{display:flex; flex-direction:column; gap:4px; border-left:3px solid var(--accent); padding-left:14px}}
figure{{margin:0}}
.fig-plan{{background:var(--surface); border:1px solid var(--rule); border-radius:2px; padding:8px}}
.fig-plan .scroll{{overflow-x:auto}}
svg.plan{{display:block; min-width:760px; width:100%; height:auto; color:var(--ink)}}
svg.det{{display:block; width:100%; height:auto; color:var(--ink)}}
figcaption{{font-size:.8rem; color:var(--muted); padding:10px 8px 4px; line-height:1.5}}
text{{font-family:"Noto Sans Devanagari","Nirmala UI",system-ui,sans-serif}}
.dim{{font-size:17px; font-weight:600; fill:var(--accent2); font-variant-numeric:tabular-nums}}
.dim-in{{fill:var(--accent)}}
.pl-no{{font-size:21px; font-weight:700; fill:var(--ink)}}
.pl-ar{{font-size:15px; font-weight:600; fill:var(--muted); font-variant-numeric:tabular-nums}}
.nb{{font-size:14px; fill:var(--muted)}}
.vx{{font-size:15px; font-weight:700; fill:var(--muted)}}
.vx-in{{fill:var(--accent)}}
.dim,.vx,.iso-no,.iso-ar,.iso-ow,.iso-dim{{paint-order:stroke; stroke:var(--surface);
 stroke-width:2.8px; stroke-linejoin:round}}
svg.iso{{display:block; width:100%; height:auto; color:var(--ink)}}
.iso-no{{font-size:18px; font-weight:700; fill:var(--ink)}}
.iso-ar{{font-size:13px; font-weight:600; fill:var(--ink); font-variant-numeric:tabular-nums}}
.iso-ow{{font-size:12px; fill:var(--muted)}}
.iso-dim{{font-size:14px; font-weight:600; fill:var(--accent2); font-variant-numeric:tabular-nums}}
.iso-nb{{font-size:13px; font-weight:600; fill:var(--muted)}}
.fig-iso{{background:linear-gradient(180deg,var(--surface) 0%,var(--surface-2) 100%);
 border:1px solid var(--rule); border-radius:2px; padding:10px}}
.titleblock{{display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:0;
 border:1px solid var(--rule); border-radius:2px; background:var(--surface); margin-top:14px}}
.titleblock div{{padding:9px 14px; border-right:1px solid var(--rule-soft)}}
.titleblock div:last-child{{border-right:none}}
.titleblock dt{{font-size:.66rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); font-weight:600}}
.titleblock dd{{margin:2px 0 0; font-size:.9rem; font-weight:600}}
.legend{{display:flex; flex-wrap:wrap; gap:8px 22px; padding:12px 14px; border:1px solid var(--rule);
 border-radius:2px; background:var(--surface); font-size:.82rem; color:var(--muted); margin-top:12px}}
.legend span{{display:inline-flex; align-items:center; gap:8px}}
.key{{width:26px; height:0; border-top:2.6px solid var(--ink)}}
.key.dash{{border-top:2px dashed var(--accent)}}
.key.sw{{width:14px; height:14px; border:1px solid var(--rule); border-top:none}}
.tbl-wrap{{overflow-x:auto; background:var(--surface); border:1px solid var(--rule); border-radius:2px}}
table{{border-collapse:collapse; width:100%; font-size:.88rem; min-width:520px}}
caption{{text-align:left; font-size:.72rem; letter-spacing:.12em; text-transform:uppercase; color:var(--muted);
 font-weight:600; padding:12px 16px 8px}}
th,td{{text-align:left; padding:9px 16px; border-top:1px solid var(--rule-soft); vertical-align:top}}
thead th{{font-size:.72rem; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); font-weight:600;
 border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); background:var(--surface-2); white-space:nowrap}}
tbody tr:hover{{background:var(--surface-2)}}
.num{{text-align:right; font-variant-numeric:tabular-nums; white-space:nowrap}}
.strong{{font-weight:700}}
.code{{font-weight:700; white-space:nowrap}}
.adj{{color:var(--muted); font-size:.84rem}}
tr.internal .code{{color:var(--accent)}}
tfoot td{{border-top:2px solid var(--ink); font-weight:700; background:var(--surface-2)}}
.swatch{{display:inline-block; width:11px; height:11px; border:1px solid var(--rule); margin-inline-end:8px;
 vertical-align:baseline; border-radius:1px}}
.sw-p1{{background:var(--p1)}} .sw-p2{{background:var(--p2)}} .sw-p3{{background:var(--p3)}} .sw-p4{{background:var(--p4)}}
.cards{{display:grid; grid-template-columns:repeat(auto-fit,minmax(430px,1fr)); gap:20px}}
.card{{background:var(--surface); border:1px solid var(--rule); border-radius:2px; padding:18px;
 display:flex; flex-direction:column; gap:14px}}
.card-head{{display:flex; align-items:flex-start; gap:10px; padding-bottom:12px; border-bottom:1px solid var(--rule)}}
.card-head .swatch{{margin:6px 0 0}}
.card-head>div:nth-child(2){{flex:1; min-width:0}}
.owner{{font-size:.82rem; color:var(--muted)}}
.card-area{{text-align:right; white-space:nowrap}}
.card-area strong{{display:block; font-size:1.25rem; font-variant-numeric:tabular-nums; line-height:1.2}}
.card-area span{{font-size:.7rem; color:var(--muted); letter-spacing:.06em}}
.card .tbl-wrap{{border:none; background:none}}
.card table{{min-width:420px}}
.card caption{{padding-inline:0}}
.card th,.card td{{padding-inline:0 12px}}
.fig-det{{background:var(--surface-2); border:1px solid var(--rule-soft); border-radius:2px; padding:6px}}
.mini{{display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin:0; padding-top:12px; border-top:1px solid var(--rule)}}
.mini dt{{font-size:.68rem; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); font-weight:600}}
.mini dd{{margin:2px 0 0; font-size:.88rem; font-variant-numeric:tabular-nums}}
.alt{{color:var(--muted)}}
.notes{{background:var(--surface); border:1px solid var(--rule); border-left:3px solid var(--accent2);
 border-radius:2px; padding:18px 22px}}
.notes ol{{margin:10px 0 0; padding-inline-start:20px; display:flex; flex-direction:column; gap:9px; font-size:.88rem; color:var(--muted)}}
.notes li strong{{color:var(--ink)}}
footer{{border-top:1px solid var(--rule); padding-top:18px; font-size:.78rem; color:var(--muted)}}
a{{color:var(--accent2)}}
:focus-visible{{outline:2px solid var(--accent2); outline-offset:2px}}
@media (max-width:560px){{ .mini{{grid-template-columns:1fr}} }}
</style>

<div class="wrap">

<header class="masthead">
 <p class="eyebrow">पोटहिस्सा मोजणी नकाशा · अ प्रत · विश्लेषण</p>
 <h1>मौजे हुपरी — सि.स.नं. 2457<br>मुख्य मिळकत व 4 पोटहिस्स्यांची मोजमापे</h1>
 <p class="sub">भूमि अभिलेख कार्यालय, हातकणंगले यांच्या 1:500 प्रमाणातील मोजणी नकाशातून काढलेली बाजूनिहाय मापे,
 प्रत्येक हिस्स्याचे स्वतंत्र क्षेत्रफळ आणि एकूण क्षेत्राचा ताळमेळ.</p>
 <dl class="meta">
  <div><dt>मौजे / तालुका / जिल्हा</dt><dd>हुपरी · हातकणंगले · कोल्हापूर</dd></div>
  <div><dt>मोजणी रजिस्टर नं.</dt><dd>090729/2025 (नियमित पोटहिस्सा)</dd></div>
  <div><dt>मोजणी दिनांक</dt><dd>13/03/2026</dd></div>
  <div><dt>अर्जदार</dt><dd>श्री. नेमिनाथ आण्णाप्पा वसवाडे, रा. हुपरी</dd></div>
  <div><dt>सहधारक</dt><dd>श्री. देवाप्पा व श्री. आदिनाथ आण्णाप्पा वसवाडे</dd></div>
  <div><dt>मोजणी करणार</dt><dd>रमा. प्र. पाटील · उप अधीक्षक भूमि अभिलेख, हातकणंगले</dd></div>
 </dl>
</header>

<section>
 <div class="stats">
  <div class="stat hero"><b>3,220.56</b><span>एकूण क्षेत्र — चौ.फूट</span></div>
  <div class="stat"><b>299.20</b><span>एकूण क्षेत्र — चौ.मी.</span></div>
  <div class="stat"><b>2.957</b><span>एकूण क्षेत्र — गुंठे</span></div>
  <div class="stat"><b>4</b><span>पोटहिस्से</span></div>
  <div class="stat"><b>92.81 × 34.71</b><span>सरासरी लांबी × रुंदी (फूट)</span></div>
 </div>
</section>

<section>
 <div class="sec-head">
  <h2>संपूर्ण मिळकतीचा प्रमाणबद्ध नकाशा</h2>
  <p class="sub">बाहेरील जाड रेषा = मुख्य सि.स.नं. 2457 ची हद्द · तुटक तांबडी रेषा = पोटहिस्सा सीमांकन.</p>
 </div>
 <div class="legend">
  <span><i class="key"></i> मुख्य मिळकतीची हद्द</span>
  <span><i class="key dash"></i> पोटहिस्सा सीमांकन (अंतर्गत हद्द)</span>
  <span><i class="key sw sw-p1"></i> 2457/1</span>
  <span><i class="key sw sw-p2"></i> 2457/2</span>
  <span><i class="key sw sw-p3"></i> 2457/3</span>
  <span><i class="key sw sw-p4"></i> 2457/4</span>
  <span>निळे आकडे — बाह्य हद्द · तांबडे आकडे — अंतर्गत हद्द · सर्व मापे फूट</span>
 </div>
 <dl class="titleblock tb-top">
  <div><dt>रेखाचित्र</dt><dd>SV-2457-01 · भूखंड आराखडा</dd></div>
  <div><dt>प्रमाण</dt><dd>1 : 500</dd></div>
  <div><dt>एकक</dt><dd>फूट (मीटर कंसात)</dd></div>
  <div><dt>आधार</dt><dd>मो.र.नं. 090729/2025</dd></div>
  <div><dt>दिनांक</dt><dd>13/03/2026</dd></div>
 </dl>
 <figure class="fig-plan">
  <div class="scroll">{plan}</div>
  <figcaption><strong>सर्व मापे फुटांमध्ये.</strong> निळे आकडे मुख्य हद्दीच्या बाजू, तांबडे आकडे अंतर्गत पोटहिस्सा रेषा.
  प्रत्येक पोटहिस्स्याच्या सर्व बाजूंची मापे त्या-त्या तुकड्यावरच दाखवली आहेत.
  A–H ही मुख्य हद्दीची कोनबिंदू, P1 व P2 हे अंतर्गत छेदनबिंदू — खालील तक्त्यांत हेच संदर्भ वापरले आहेत.
  मिळकत पूर्व-पश्चिम लांब पट्ट्याच्या आकाराची असून पूर्वेस लागू रस्ता आहे.</figcaption>
 </figure>
</section>

<section>
 <div class="sec-head">
  <h2>त्रिमितीय (3D) दृश्य</h2>
  <p class="sub">चारही पोटहिस्से उंची देऊन दाखवले आहेत, जेणेकरून तुकड्यांची रुंदी, लांबी आणि
  एकमेकांशी असलेली मांडणी एका नजरेत समजते. उंची फक्त दृश्य स्पष्टतेसाठी आहे — ती प्रत्यक्ष उंची नव्हे.</p>
 </div>
 <figure class="fig-iso">
  <div class="scroll">{iso}</div>
  <figcaption>दृश्य नैऋत्येकडून. पश्चिम टोकाचा तांबडा तुकडा 2457/4 (सामाईक) — तो 2457/1, 2457/2 व
  2457/3 या तिन्हींना लागून आहे. पूर्वेकडे (उजवीकडे) लागू रस्ता.</figcaption>
 </figure>
</section>

<section>
 <div class="sec-head">
  <h2>तक्ता 1 — मुख्य प्लॉट (सि.स.नं. 2457) बाजूनिहाय मापे</h2>
 </div>
 <div class="tbl-wrap"><table>
  <caption>मुख्य हद्द — 8 बाजू, घड्याळाच्या दिशेने A पासून</caption>
  <thead><tr><th>बाजू</th><th>दिशा</th><th class="num">फूट</th><th class="num">मीटर</th><th>लगत मिळकत</th></tr></thead>
  <tbody>{side_rows(MAIN)}</tbody>
  <tfoot><tr><td>एकूण परिमिती</td><td>—</td><td class="num">255.61</td><td class="num alt">77.91</td><td>क्षेत्र 3,220.56 चौ.फूट</td></tr></tfoot>
 </table></div>
</section>

<section>
 <div class="sec-head">
  <h2>तक्ता 2 — चारही पोटहिस्स्यांचे क्षेत्रफळ</h2>
  <p class="sub">क्षेत्रफळ मोजणी नकाशातील अधिकृत “क्षेत्राचा तपशील” तक्त्याप्रमाणे.</p>
 </div>
 <div class="tbl-wrap"><table>
  <caption>पोटहिस्सा निहाय क्षेत्र व सरासरी मापे</caption>
  <thead><tr><th>सि.स.नं.</th><th>धारकाचे नाव</th><th class="num">सरासरी लांबी (फूट)</th>
   <th class="num">सरासरी रुंदी (फूट)</th><th class="num">क्षेत्र (चौ.फूट)</th><th class="num">क्षेत्र (चौ.मी.)</th>
   <th class="num">गुंठे</th></tr></thead>
  <tbody>{summary_rows}</tbody>
  <tfoot><tr><td>एकूण क्षेत्र</td><td>—</td><td class="num">—</td><td class="num">—</td>
   <td class="num">3,220.56</td><td class="num alt">299.20</td><td class="num">2.957</td></tr></tfoot>
 </table></div>
</section>

<section>
 <div class="sec-head">
  <h2>प्रत्येक पोटहिस्स्याची स्वतंत्र मापे</h2>
  <p class="sub">प्रत्येक तुकडा वेगळा काढून त्याच्या सर्व बाजूंची लांबी फुटांमध्ये दाखवली आहे.
  तांबड्या रंगातील बाजू म्हणजे अंतर्गत (भावांमधील) हद्द, काळ्या बाजू मूळ मिळकतीच्या हद्दीवर.</p>
 </div>
 <div class="cards">
{chr(10).join(cards)}
 </div>
</section>

<section>
 <div class="sec-head"><h2>चतु:सीमा</h2></div>
 <div class="tbl-wrap"><table>
  <caption>संपूर्ण सि.स.नं. 2457 च्या चारही दिशांना लगत मिळकती</caption>
  <thead><tr><th>दिशा</th><th>लगत मिळकत</th><th>संबंधित पोटहिस्सा</th></tr></thead>
  <tbody>
   <tr><td class="code">उत्तर</td><td>सि.स.नं. 2460 व सि.स.नं. 2453/5</td><td>2457/3 (व टोकाला 2457/4)</td></tr>
   <tr><td class="code">दक्षिण</td><td>सि.स.नं. 2496/1, 2496/2, 2496/3</td><td>2457/1</td></tr>
   <tr><td class="code">पूर्व</td><td>लागू रस्ता</td><td>2457/1, 2457/2, 2457/3 — तिन्हींना रस्त्यावर तोंड</td></tr>
   <tr><td class="code">पश्चिम</td><td>सि.स.नं. 2461 (उत्तर भाग) व सि.स.नं. 2463 (दक्षिण भाग)</td><td>2457/4 व 2457/1</td></tr>
  </tbody>
 </table></div>
</section>

{VALUATION}

<section>
 <div class="sec-head">
  <h2>स्थान व उपग्रह नकाशा (satellite overlay)</h2>
  <p class="sub">पुढच्या टप्प्यात हीच हद्द उपग्रह प्रतिमेवर बसवता येते. त्यासाठी काय लागेल ते खाली दिले आहे.</p>
 </div>
 <div class="tbl-wrap"><table>
  <caption>उपग्रह overlay साठी आवश्यक बाबी</caption>
  <thead><tr><th>बाब</th><th>सद्यस्थिती</th><th>काय करावे लागेल</th></tr></thead>
  <tbody>
   <tr><td class="code">अक्षांश-रेखांश</td><td class="adj">मोजणी नकाशात नाहीत — नकाशा स्थानिक ग्रिडवर आहे</td>
    <td><strong>एकाच कोपऱ्याचे GPS पुरे.</strong> प्रमाण (1:500) व उत्तर बाण नकाशावरच असल्याने
    scale आणि rotation आधीच माहीत असतात; फक्त स्थान ठरवायचे उरते. मोबाईल GPS ± 3–5 मी.,
    DGPS ± 10 सें.मी. — <strong>दोन</strong> कोपरे घेतल्यास scale व rotation पडताळता येतात,
    त्यामुळे शक्य असल्यास दोन घ्यावेत.</td></tr>
   <tr><td class="code">पर्यायी स्रोत</td><td class="adj">उपलब्ध</td>
    <td>महाभूमी <strong>भू-नकाशा</strong> पोर्टलवरून सि.स.नं. 2457 चा georeferenced polygon घेतल्यास
    GPS शिवायही overlay करता येईल</td></tr>
   <tr><td class="code">उपग्रह प्रतिमा</td><td class="adj">या प्रणालीतून सध्या बंद (नेटवर्क धोरण)</td>
    <td>तुमच्या सर्व्हरवर चालेल. <strong>OpenStreetMap कडे स्वतःची उपग्रह प्रतिमा नाही</strong> —
    तो रस्ते/इमारतींचा नकाशा आहे. उपग्रह प्रतिमेसाठी Esri World Imagery, ISRO भुवन,
    Mapbox किंवा MapTiler. व्यावसायिक अहवालात परवाना व श्रेय (attribution) बंधनकारक.</td></tr>
   <tr><td class="code">मिळणारे दृश्य</td><td class="adj">—</td>
    <td>उपग्रह प्रतिमेवर मुख्य हद्द + चारही पोटहिस्से, रस्त्यापासूनचे अंतर आणि लगतच्या मिळकती —
    म्हणजेच मूल्यांकन अहवालाचा दृश्य भाग</td></tr>
  </tbody>
 </table></div>
 <p class="sub"><strong>टीप:</strong> दोन बिंदूंचे GPS मिळाल्यावर स्थानिक ग्रिड ते अक्षांश-रेखांश असे
 रूपांतर (similarity transform — scale, rotation, shift) करून हद्द अचूक बसवता येते; या अहवालासोबतच्या
 <code>georef_overlay.py</code> या स्क्रिप्टमध्ये तेच काम केलेले आहे.</p>
</section>

<section class="notes">
 <h2>महत्त्वाच्या नोंदी व मर्यादा</h2>
 <ol>
  <li><strong>क्षेत्रफळ अधिकृत आहे.</strong> 1,765.93 + 670.59 + 670.59 + 113.45 = <strong>3,220.56 चौ.फूट</strong>
      (164.06 + 62.30 + 62.30 + 10.54 = 299.20 चौ.मी.) —
      नकाशातील “क्षेत्राचा तपशील” तक्त्याशी अचूक जुळते.</li>
  <li><strong>लांबी-रुंदीची मापे नकाशावरून घेतलेली आहेत.</strong> मूळ मोजणी नकाशावर बाजूंची मापे आकड्यांत लिहिलेली
      नाहीत; ती 1:500 प्रमाणानुसार नकाशातील हद्दरेषांच्या भूमितीवरून काढली आहेत. या मापांवरून पुन्हा मोजलेले
      क्षेत्र 298.55 चौ.मी. येते — अधिकृत 299.20 पेक्षा फक्त 0.22% फरक. म्हणजे प्रत्येक बाजूचे माप
      साधारण <strong>± 0.5 फूट (0.15 मीटर)</strong> अचूक आहे. बांधकाम, कंपाऊंड वॉल किंवा खरेदी-विक्रीच्या दस्तासाठी
      प्रत्यक्ष जागेवर टेप/DGPS ने खात्री करून घ्यावी.</li>
  <li><strong>2457/4 हा सामाईक तुकडा आहे.</strong> फक्त 113.45 चौ.फूट (10.54 चौ.मी.) चा हा तुकडा मिळकतीच्या पश्चिम टोकाला असून
      तो तिघाही भावांच्या नावे संयुक्त नोंदलेला आहे; तो 2457/1, 2457/2 व 2457/3 या तिन्हींना लागून आहे.</li>
  <li><strong>पूर्वेकडील रस्ता.</strong> 2457/1, 2457/2 व 2457/3 या तिन्ही हिस्स्यांना पूर्वेकडील लागू रस्त्यावर
      अनुक्रमे <strong>18.96, 7.74 व 6.89 फूट</strong> (5.78, 2.36 व 2.10 मीटर) तोंड आहे. 2457/2 व 2457/3 चे तोंड अरुंद असल्याने वाहन-प्रवेशाबाबत
      बांधकाम परवानगीच्या वेळी तपासणी आवश्यक.</li>
  <li><strong>हा नकाशा “अ प्रत” आहे</strong> — मोजणी वेळी अर्जदार व सहधारक हजर होते आणि अभिलेखाप्रमाणे व
      अर्जदाराने दाखवलेली पोटहिस्सा सीमांकन हद्द नोंदवली आहे. दस्त नोंदणीपूर्वी 7/12 व मिळकत पत्रिकेवरील
      नोंदींशी पडताळणी करावी.</li>
 </ol>
</section>

<footer>
 स्रोत: पोटहिस्सा मोजणी नकाशा, मो.र.नं. 090729/2025, उप अधीक्षक भूमि अभिलेख हातकणंगले ·
 प्रमाण 1:500 · रूपांतरण: 1 मी. = 3.28084 फूट, 1 गुंठा = 101.17 चौ.मी.
</footer>

</div>
'''
open('report-portrait.html' if PORTRAIT else 'sitevalue-2457-hupari.html','w').write(HTML)
print('written', len(HTML))
