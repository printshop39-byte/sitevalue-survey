body=open('report-portrait.html').read()
css='''<style>
@page { size: A4 portrait; margin: 14mm 12mm 16mm; }
html,body{ background:#fff !important; }
:root{ --bg:#fff; --surface:#fff; --surface-2:#F3F5EE; }
body{ font-size:11pt; }
.wrap{ max-width:none; padding:0; gap:22px; }
h1{ font-size:1.6rem; }
h2{ font-size:1.12rem; }
svg.plan{ min-width:0 !important; max-height:176mm; margin:0 auto; }
svg.iso{ max-height:120mm; margin:0 auto; }
.fig-iso{ break-inside:avoid; }
.legend,.titleblock{ break-inside:avoid; break-after:avoid; page-break-after:avoid; }
.titleblock{ grid-template-columns:repeat(5,1fr); margin-top:10px; }
.titleblock div{ padding:6px 10px; }
.titleblock dd{ font-size:.8rem; }
.legend{ padding:8px 12px; font-size:.76rem; gap:5px 16px; margin-top:8px; }
.fig-plan{ margin-top:10px; }
.fig-plan .scroll{ overflow:visible; }
table, .card table{ min-width:0 !important; font-size:.86rem; }
th,td{ padding:6px 9px; }
.card th,.card td{ padding:6px 10px 6px 0; }
.tbl-wrap{ overflow:visible; }
figure,.notes,header.masthead,.tbl-wrap,.card{ break-inside:avoid; page-break-inside:avoid; }
.sec-head{ break-after:avoid; page-break-after:avoid; }
figcaption,footer{ break-before:avoid; page-break-before:avoid; break-inside:avoid; page-break-inside:avoid; }
h1,h2,h3{ break-after:avoid; }
section{ gap:12px; }
.stat b{ font-size:1.3rem; }
tbody tr:hover{ background:none; }
.cards{ display:block; break-before:page; }
.card{ margin:0 0 12px; padding:12px; gap:9px; }
.card .tbl-wrap caption{ display:none; }
.fig-det figcaption{ font-size:.72rem; padding:6px 4px 2px; }
.fig-det svg{ max-width:400px; margin:0 auto; }
.mini{ display:none; }
.meta{ grid-template-columns:repeat(3,1fr); }
</style>'''
open('print.html','w').write('<!doctype html><html lang="mr"><head><meta charset="utf-8"></head><body>'+body+css+'</body></html>')
print('ok')
