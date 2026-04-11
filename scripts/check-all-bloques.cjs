const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
for (const b of data.bloques) {
  if (['m1-b0','m1-b1'].includes(b.id)) continue;
  console.log(`\n=== ${b.id} ===`);
  b.lecciones.forEach(l => console.log(`  ${l.id} "${l.titulo}"`));
}
