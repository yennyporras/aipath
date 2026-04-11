const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b0 = data.bloques.find(b => b.id === 'm1-b0');
const l1 = b0.lecciones[0];
console.log(JSON.stringify(l1.contenido.practica, null, 2));
console.log('\n--- conexion ---');
console.log(JSON.stringify(l1.contenido.conexion, null, 2));
