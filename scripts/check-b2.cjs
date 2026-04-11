const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b2 = data.bloques.find(b => b.id === 'm1-b2');
console.log(`B2: "${b2?.titulo}"`);
if (b2) b2.lecciones.forEach(l => console.log(`  ${l.id} "${l.titulo}"`));
