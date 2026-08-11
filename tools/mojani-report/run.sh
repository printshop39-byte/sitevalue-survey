#!/usr/bin/env bash
# संपूर्ण अहवाल एका आज्ञेत तयार करतो: नकाशे → HTML → PDF → Excel
set -euo pipefail
cd "$(dirname "$0")"
CHROME="${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"

python3 mkplan.py                 # plan.svg (आडवा) + plan_portrait.svg (उभा)
python3 mksvg.py                  # det_2457_*.svg — प्रत्येक पोटहिस्स्याचे स्वतंत्र चित्र
python3 mkiso.py                  # iso.svg — त्रिमितीय दृश्य
python3 build.py                  # वेब आवृत्ती (आडवा नकाशा)
python3 build.py --portrait       # छपाईची आवृत्ती (उभा नकाशा)
python3 makeprint.py              # print.html — A4 उभा साठी CSS
python3 xl.py                     # .xlsx तक्ते

"$CHROME" --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=report.pdf --virtual-time-budget=9000 "file://$PWD/print.html"
echo "तयार: report.pdf, sitevalue-2457-hupari.html, *.xlsx"
