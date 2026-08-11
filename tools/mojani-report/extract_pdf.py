# -*- coding: utf-8 -*-
"""मोजणी नकाशा PDF मधून मजकूर व हद्दरेषा काढणे — नव्या प्लॉटसाठी पहिली पायरी.

भूमि अभिलेखाचे मोजणी नकाशे vector PDF असतात: हद्द रेषा खऱ्या भूमितीसह असतात आणि
1:500 सारखे प्रमाण दिलेले असते. त्यामुळे बाजूंची मापे व क्षेत्रफळ थेट PDF मधून काढता येते.

वापर:
    python extract_pdf.py नकाशा.pdf                 # सारांश
    python extract_pdf.py नकाशा.pdf --words         # सर्व मजकूर + निर्देशांक
    python extract_pdf.py नकाशा.pdf --paths --min-width 0.5   # जाड (हद्द) रेषा

पुढे काय: सर्वात जाड बंद polyline म्हणजे मुख्य हद्द; तिचे कोपरे mkplan.py मधील
V{} मध्ये भरा, तुटक (dashed) रेषा म्हणजे पोटहिस्सा सीमांकन.
"""
import argparse, math

MM_PER_PT = 25.4 / 72

def main():
    import pymupdf
    ap = argparse.ArgumentParser()
    ap.add_argument('pdf')
    ap.add_argument('--page', type=int, default=0)
    ap.add_argument('--scale', type=float, default=500.0, help='नकाशाचे प्रमाण, उदा. 500 म्हणजे 1:500')
    ap.add_argument('--words', action='store_true')
    ap.add_argument('--paths', action='store_true')
    ap.add_argument('--min-width', type=float, default=0.5)
    a = ap.parse_args()

    doc = pymupdf.open(a.pdf)
    page = doc[a.page]
    M = page.rotation_matrix                    # नकाशा फिरवलेला असू शकतो
    k = MM_PER_PT * a.scale / 1000.0            # एक PDF point = किती मीटर
    print('पाने: %d · rotation: %d° · 1 pt = %.6f मी. (1:%g)' % (len(doc), page.rotation, k, a.scale))

    if a.words:
        print('\n--- मजकूर (display निर्देशांक) ---')
        for w in page.get_text('words'):
            c = pymupdf.Point((w[0] + w[2]) / 2, (w[1] + w[3]) / 2) * M
            print('%8.1f %8.1f  %s' % (c.x, c.y, w[4]))

    draws = page.get_drawings()
    print('\n--- रेषा-समूह: %d ---' % len(draws))
    for i, d in enumerate(draws):
        wdt = d.get('width') or 0
        if wdt < a.min_width:
            continue
        segs = [it for it in d['items'] if it[0] == 'l']
        if not segs:
            continue
        pts = []
        for it in segs:
            for p in (it[1], it[2]):
                q = p * M
                if not pts or math.dist(pts[-1], (q.x, q.y)) > 0.01:
                    pts.append((q.x, q.y))
        total = sum(math.dist(pts[j], pts[j + 1]) for j in range(len(pts) - 1)) * k
        print('\n#%d  width=%.2f  बिंदू=%d  एकूण लांबी=%.2f मी.' % (i, wdt, len(pts), total))
        if a.paths:
            for j in range(len(pts) - 1):
                print('   %8.2f,%8.2f -> %8.2f,%8.2f   %7.2f मी.  %7.2f फूट' % (
                    pts[j][0], pts[j][1], pts[j + 1][0], pts[j + 1][1],
                    math.dist(pts[j], pts[j + 1]) * k, math.dist(pts[j], pts[j + 1]) * k * 3.28084))

if __name__ == '__main__':
    main()
