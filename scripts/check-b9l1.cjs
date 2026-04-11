const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b9 = data.bloques.find(b => b.id === 'm1-b9');
console.log('B9 encontrado:', !!b9);
if (b9) {
  const l1 = b9.lecciones.find(l => l.id === 'm1-b9-l1');
  if (l1) {
    console.log('Explicación:\n', l1.contenido.teoria.explicacion);
    console.log('\nPALABRAS:', l1.contenido.teoria.explicacion.split(/\s+/).length);
    console.log('PREGUNTAS:', l1.contenido.verificacion.length);
  }
}
