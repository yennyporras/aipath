const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
for (const b of data.bloques.filter(b => ['m1-b0','m1-b1'].includes(b.id))) {
  console.log(`\n=== ${b.id}: "${b.titulo}" ===`);
  for (const l of b.lecciones) {
    const w = l.contenido?.teoria?.explicacion?.split(/\s+/).filter(Boolean).length || 0;
    const q = (l.contenido?.verificacion || []).length;
    console.log(`  ${l.id} [${l.tipo||'leccion'}] "${l.titulo}"  ${w}w  ${q}q`);
  }
}
