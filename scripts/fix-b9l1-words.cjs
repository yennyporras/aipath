const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b9 = data.bloques.find(b => b.id === 'm1-b9');
const l1 = b9.lecciones.find(l => l.id === 'm1-b9-l1');

const nuevaExplicacion = `Los sesgos en los modelos de IA no son accidentales: son consecuencias directas de los datos y procesos con que se entrenan. Hay tres tipos principales de sesgo que todo AI Engineer debe reconocer y mitigar activamente.

Sesgo de datos históricos: si los datos de entrenamiento reflejan inequidades pasadas, el modelo las perpetúa y amplifica. El caso más documentado es COMPAS, el sistema de predicción de reincidencia criminal en EEUU, que mostraba tasas de falsos positivos dos veces más altas para personas afroamericanas que para blancas, porque fue entrenado con datos judiciales históricos que reflejan discriminación sistémica. El riesgo añadido es el ciclo de retroalimentación: el modelo niega oportunidades a ciertos grupos, esa ausencia de datos positivos refuerza el patrón en el siguiente ciclo de entrenamiento, amplificando el sesgo original con cada iteración.

Sesgo de representación: si ciertos grupos están subrepresentados en los datos, el modelo tiene peor rendimiento para ellos. Los sistemas de reconocimiento facial muestran tasas de error del 35% para mujeres con piel oscura frente a menos del 1% para hombres con piel clara, según el estudio Gender Shades del MIT MediaLab (Joy Buolamwini, 2018). Este hallazgo precipitó revisiones en los productos de Amazon Rekognition, Microsoft Azure y IBM Watson.

Sesgo de etiquetado: cuando los anotadores humanos tienen sesgos inconscientes, estos se transfieren sistemáticamente al modelo. Es especialmente difícil de detectar porque los datos parecen correctamente etiquetados pero contienen prejuicios implícitos del proceso de anotación.

Estrategias de mitigación en producción: auditar los datos de entrenamiento por representatividad antes de entrenar, medir el rendimiento del modelo desagregado por subgrupos demográficos relevantes, aplicar técnicas de fairness-aware ML (reweighting, resampling o post-processing de outputs), y mantener supervisión humana en decisiones de alto impacto. En Europa, el EU AI Act exige evaluaciones de sesgo documentadas para sistemas de alto riesgo como contratación, crédito y justicia penal.`;

const palabras = nuevaExplicacion.split(/\s+/).length;
console.log('Palabras:', palabras);

if (palabras >= 300) {
  l1.contenido.teoria.explicacion = nuevaExplicacion;
  fs.writeFileSync('src/content/m1/index.json', JSON.stringify(data, null, 2));
  console.log('OK - B9-l1 actualizado a', palabras, 'palabras');
} else {
  console.log('FALLO - aún menos de 300 palabras');
}
