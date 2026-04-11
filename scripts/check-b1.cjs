const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b1 = data.bloques.find(b => b.id === 'm1-b1');
if (!b1) { console.log('B1 no encontrado'); process.exit(1); }
for (const l of b1.lecciones.filter(l => ['m1-b1-l1','m1-b1-l2','m1-b1-l3','m1-b1-l4'].includes(l.id))) {
  const exp = l.contenido?.teoria?.explicacion || '';
  const w = exp.split(/\s+/).filter(Boolean).length;
  const q = (l.contenido?.verificacion || []).length;
  console.log(`\n=== ${l.id} — "${l.titulo}" ===`);
  console.log(`Palabras: ${w} | Preguntas: ${q}`);
  console.log('--- EXPLICACION ---');
  console.log(exp);
  console.log('---');
}
