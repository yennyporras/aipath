const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b1 = data.bloques.find(b => b.id === 'm1-b1');
for (const id of ['m1-b1-l1','m1-b1-l2','m1-b1-l3','m1-b1-l4']) {
  const l = b1.lecciones.find(l => l.id === id);
  console.log(`\n=== ${id} ===`);
  l.contenido.verificacion.forEach((q, i) => {
    console.log(`Q${i+1} [correcta=${q.correcta}]: ${q.pregunta}`);
    console.log(`  Opciones: ${q.opciones.join(' | ')}`);
  });
}
