# -*- coding: utf-8 -*-
"""पोटहिस्सानिहाय मूल्यांकन — शासकीय (रेडी रेकनर) व बाजारभाव.

महत्त्वाचे: या स्क्रिप्टमध्ये कोणतेही दर आधीच भरलेले नाहीत, आणि ते मुद्दाम.
दर दरवर्षी व झोननिहाय बदलतात; ते वापरकर्त्यानेच द्यायचे आहेत.

  शासकीय दर  — महाराष्ट्र नोंदणी व मुद्रांक विभागाचा वार्षिक बाजारमूल्य दर तक्ता
                (Annual Statement of Rates / रेडी रेकनर, igrmaharashtra.gov.in).
                गाव + झोन + उपझोन नुसार खुल्या जमिनीचा दर ₹/चौ.मी. मध्ये मिळतो.
  बाजार दर    — प्रत्यक्ष व्यवहारांवरून (नोंदणीकृत दस्त) किंवा स्थानिक दलालांकडून.
                याला कोणताही खुला API नाही; तो हाताने भरावा लागतो.

वापर:
    python valuation.py rates.sample.json --csv मूल्यांकन.csv
"""
from __future__ import annotations
import argparse, csv, json, sys

SQFT = 10.7639
GUNTHA = 101.17

def inr(x):
    """भारतीय पद्धतीने आकडा (उदा. 12,34,567)."""
    s = '%d' % round(x)
    neg, s = s.startswith('-'), s.lstrip('-')
    if len(s) > 3:
        head, tail = s[:-3], s[-3:]
        parts = []
        while len(head) > 2:
            parts.insert(0, head[-2:]); head = head[:-2]
        if head: parts.insert(0, head)
        s = ','.join(parts) + ',' + tail
    return ('-' if neg else '') + s

def compute(cfg):
    """rates config → (rows, totals). CLI व अहवाल दोन्ही हेच वापरतात."""
    asr = cfg.get('asr_rate_per_sqm')
    mkt = cfg.get('market_rate_per_sqft')
    rows, tot = [], {'sqm': 0.0, 'sqft': 0.0, 'asr': 0.0, 'mkt': 0.0}
    for no, area in cfg['areas_sqm'].items():
        f = cfg.get('factors', {}).get(no, 1.0)
        sqft = area * SQFT
        v_asr = area * asr * f if asr else None
        v_mkt = sqft * mkt * f if mkt else None
        rows.append({'no': no, 'holder': cfg.get('holders', {}).get(no, ''),
                     'sqm': area, 'sqft': sqft, 'guntha': area / GUNTHA,
                     'factor': f, 'asr_value': v_asr, 'mkt_value': v_mkt})
        tot['sqm'] += area; tot['sqft'] += sqft
        tot['asr'] += v_asr or 0.0; tot['mkt'] += v_mkt or 0.0
    return rows, tot


def main():
    ap = argparse.ArgumentParser(description='पोटहिस्सानिहाय मूल्यांकन तक्ता')
    ap.add_argument('rates', help='rates.json — क्षेत्र, दर व घटक')
    ap.add_argument('--csv', default=None)
    a = ap.parse_args()
    cfg = json.load(open(a.rates, encoding='utf-8'))

    asr = cfg.get('asr_rate_per_sqm')
    mkt = cfg.get('market_rate_per_sqft')
    if not asr and not mkt:
        raise SystemExit('किमान एक दर द्या — asr_rate_per_sqm किंवा market_rate_per_sqft.')

    raw, tot = compute(cfg)
    rows = [{'सि.स.नं.': r['no'], 'धारक': r['holder'],
             'क्षेत्र_चौमी': round(r['sqm'], 2), 'क्षेत्र_चौफूट': round(r['sqft'], 2),
             'गुंठे': round(r['guntha'], 3), 'घटक': r['factor'],
             'शासकीय_मूल्य': round(r['asr_value']) if r['asr_value'] else '',
             'बाजार_मूल्य': round(r['mkt_value']) if r['mkt_value'] else ''} for r in raw]

    w = max(len(r['सि.स.नं.']) for r in rows) + 2
    print('\n%-*s %12s %12s %8s %16s %16s' % (w, 'सि.स.नं.', 'चौ.मी.', 'चौ.फूट', 'घटक',
                                              'शासकीय मूल्य ₹', 'बाजार मूल्य ₹'))
    print('-' * (w + 70))
    for r in rows:
        print('%-*s %12.2f %12.2f %8.2f %16s %16s' % (
            w, r['सि.स.नं.'], r['क्षेत्र_चौमी'], r['क्षेत्र_चौफूट'], r['घटक'],
            inr(r['शासकीय_मूल्य']) if r['शासकीय_मूल्य'] != '' else '—',
            inr(r['बाजार_मूल्य']) if r['बाजार_मूल्य'] != '' else '—'))
    print('-' * (w + 70))
    print('%-*s %12.2f %12.2f %8s %16s %16s' % (
        w, 'एकूण', tot['sqm'], tot['sqm'] * SQFT, '',
        inr(tot['asr']) if asr else '—', inr(tot['mkt']) if mkt else '—'))

    common = cfg.get('common_parcel')
    if common and common in cfg['areas_sqm']:
        shares = cfg.get('common_shares') or [k for k in cfg['areas_sqm'] if k != common]
        base = next(r for r in rows if r['सि.स.नं.'] == common)
        for key, label in (('शासकीय_मूल्य', 'शासकीय'), ('बाजार_मूल्य', 'बाजार')):
            if base[key] == '':
                continue
            print('\n%s सामाईक %s चे मूल्य ₹%s — %d धारकांत समान वाटल्यास प्रत्येकी ₹%s'
                  % (common, label, inr(base[key]), len(shares), inr(base[key] / len(shares))))

    if a.csv:
        with open(a.csv, 'w', newline='', encoding='utf-8-sig') as fh:
            wr = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
            wr.writeheader(); wr.writerows(rows)
        print('\nलिहिले:', a.csv)

    print('\nस्रोत — शासकीय दर: %s | बाजार दर: %s'
          % (cfg.get('asr_source', 'दिलेला नाही'), cfg.get('market_source', 'दिलेला नाही')))
    print('हे मूल्यांकन सूचक (indicative) आहे. मुद्रांक शुल्कासाठीचे अधिकृत बाजारमूल्य '
          'नोंदणी व मुद्रांक विभागाच्या दर तक्त्यानुसार व शासनमान्य मूल्यांकनकर्त्याकडूनच ठरते.',
          file=sys.stderr)

if __name__ == '__main__':
    main()
