// Script: redistribuye las opciones del Boss Battle para distribuir correctas uniformemente
// Target: Q1→2, Q2→3, Q3→0, Q4→1, Q5→2, Q6→3, Q7→0, Q8→1, Q9→2, Q10→3
//         Q11→0, Q12→1, Q13→2, Q14→3, Q15→0, Q16→1, Q17→2, Q18→3, Q19→0, Q20→1
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/m1/index.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const bb = data.boss_battle;

// Para cada pregunta, rotar las opciones para que la correcta quede en la posición target
// Rotamos todas las opciones y actualizamos el índice de correcta
function rotateToTarget(pregunta, targetIndex) {
  const currentCorrect = pregunta.correcta;
  const opts = pregunta.opciones;
  const correctText = opts[currentCorrect];

  if (currentCorrect === targetIndex) return; // Ya está en la posición correcta

  // Remover la correcta de su posición actual
  const otherOpts = opts.filter((_, i) => i !== currentCorrect);

  // Reconstruir array poniendo la correcta en targetIndex
  const newOpts = [...otherOpts];
  newOpts.splice(targetIndex, 0, correctText);

  pregunta.opciones = newOpts;
  pregunta.correcta = targetIndex;
}

// Distribución target: cada valor 0-3 aparece 5 veces
const targets = [2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1];

bb.preguntas.forEach((q, i) => {
  rotateToTarget(q, targets[i]);
});

// Verificar distribución
const dist = {0:0, 1:0, 2:0, 3:0};
bb.preguntas.forEach(q => dist[q.correcta]++);

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('✓ Distribución de correctas ajustada');
console.log('  Nueva distribución:', dist);
bb.preguntas.forEach((q, i) => {
  console.log('  Q' + (i+1) + ' correcta=' + q.correcta + ': ' + q.opciones[q.correcta].substring(0,60) + '...');
});
