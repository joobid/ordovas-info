#!/bin/zsh
cd "$(dirname "$0")" && mkdir -p img || exit 1
base="https://ordovas.info/wp-content/uploads/2024/12"
lista=(
"Manuel-Ordovas-de-la-Pena|Manuel-Ordovas-de-la-Pena-200x300"
"Agustin-Ordovas-Perun|Agustin-Ordovas-Perun-190x300"
"Jesus-Maria-Ordovas-Galvete|Jesus-Maria-Ordovas-Galvete-151x300"
"Cartografo-Ordovas-Kern|Cartografo-Ordovas-Kern-300x208"
"Cristina-de-la-Pena-Gomez|Cristina-de-la-Pena-Gomez-151x300"
"Manuel-Ordovas-de-la-Pena-2|Manuel-Ordovas-de-la-Pena-2-172x300"
"Carnet-de-Falange|Carnet-de-Falange-300x195"
"Certificado-de-Jose-Antonio-Giron-de-Velasco|Certificado-de-Jose-Antonio-Giron-de-Velasco-219x300"
"Firma-de-Bernabe-Blasco|Firma-de-Bernabe-Blasco-300x93"
"Bernabe-Blasco-Yague|Bernabe-Blasco-Yague-211x300"
"Prision-de-Calatayud|Prision-de-Calatayud-300x159"
"Josefa-Yague-Arrue|Josefa-Yague-Arrue-208x300"
"Josefa-Yague-Arrue-2|Josefa-Yague-Arrue-2-253x300"
"Carmen-y-Dolores-Blasco-Yague|Carmen-y-Dolores-Blasco-Yague-149x300"
"Carnet-de-funcionaria-del-CSP|Carnet-de-funcionaria-del-CSP-300x197"
"Justificante-de-presentarse-a-oposiciones|Justificante-de-presentarse-a-oposiciones-300x229"
"Manuel-y-Carmen-en-el-Retiro-de-Madrid|Manuel-y-Carmen-en-el-Retiro-de-Madrid-177x300"
"Libro-de-familia-original-matrimonio|Libro-de-familia-original-matrimonio-300x230"
)
for par in $lista; do
  orig=${par%%|*}
  mini=${par##*|}
  if [ -s "img/$orig.jpg" ]; then continue; fi
  curl -fsSL -o "img/$orig.jpg" "$base/$orig.jpg" || curl -fsSL -o "img/$orig.jpg" "$base/$mini.jpg" || echo "FALLO: $orig"
done
ls -1 img | wc -l
