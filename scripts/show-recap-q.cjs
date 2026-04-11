const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));

for (const [bloqueId, lecId] of [['m1-b0','m1-b0-l9'],['m1-b1','m1-b1-l11']]) {
  const b = data.bloques.find(b => b.id === bloqueId);
  const l = b.lecciones.find(l => l.id === lecId);
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`${lecId} — "${l.titulo}"`);
  console.log('═'.repeat(60));
  l.contenido.verificacion.forEach((q, i) => {
    console.log(`\nQ${i+1}: ${q.pregunta}`);
    q.opciones.forEach((o, j) => {
      const marca = j === q.correcta ? '✓' : ' ';
      console.log(`  [${marca}] ${String.fromCharCode(65+j)}) ${o}`);
    });
    console.log(`\nExplicación (${q.explicacion_profunda.split(/\s+/).filter(Boolean).length}w):`);
    console.log(q.explicacion_profunda);
  });
}
