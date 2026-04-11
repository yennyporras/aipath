const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b1 = data.bloques.find(b => b.id === 'm1-b1');

// ── l1: IA vs ML vs DL ──────────────────────────────────────────────────────
const l1 = b1.lecciones.find(l => l.id === 'm1-b1-l1');
l1.contenido.teoria.explicacion = [
  "La confusión entre IA, Machine Learning y Deep Learning es el malentendido más común en el campo. Son capas concéntricas, no sinónimos, y mezclarlos lleva a expectativas equivocadas sobre costos, datos necesarios y capacidades reales.",
  "IA (Inteligencia Artificial) es el campo más amplio: cualquier técnica que hace que una máquina resuelva problemas que normalmente requieren inteligencia humana. Incluye desde un árbol de decisión de tres nodos hasta GPT-4. Machine Learning es un subconjunto de IA específicamente centrado en sistemas que APRENDEN de datos en lugar de seguir reglas programadas a mano. Un árbol que aprende de ejemplos es ML. Un árbol codificado por un programador no lo es. Deep Learning es un subconjunto de ML: redes neuronales con muchas capas ocultas. 'Deep' se refiere a la profundidad de capas, no a ninguna complejidad filosófica.",
  "Todos los grandes modelos de lenguaje — GPT-4, Claude, Gemini, Llama — son Deep Learning. Pero no todo Deep Learning es un LLM: las redes convolucionales que detectan tumores en radiografías en hospitales europeos también son Deep Learning, sin ser modelos de lenguaje.",
  "En la práctica empresarial la distinción importa porque determina qué datos necesitas, cuántos y cuánto cuesta. Un modelo de ML clásico (gradient boosting, random forest) puede funcionar con 1.000 ejemplos etiquetados y entrenarse en minutos en un portátil. Un modelo de Deep Learning necesita típicamente 100.000 ejemplos o más y horas de GPU. Un LLM se preentrenó en trillones de tokens durante semanas en miles de GPUs, y tú lo consumes vía API por fracciones de céntimo por llamada, sin reentrenarlo.",
  "El sistema antifraude de Mastercard en Europa usa ML supervisado clásico para clasificar transacciones en milisegundos: rápido, interpretable y auditable bajo GDPR. Su asistente de atención al cliente usa un LLM. La habilidad real del AI Engineer no es dominar todas las técnicas, sino saber cuándo usar cada una."
].join("\n\n");

// ── l2: IA Generativa ────────────────────────────────────────────────────────
const l2 = b1.lecciones.find(l => l.id === 'm1-b1-l2');
l2.contenido.teoria.explicacion = [
  "La IA Generativa es una categoría específica de IA que puede crear nuevo contenido — texto, imágenes, código, audio, video — que no existía antes. Esto la hace fundamentalmente diferente de la IA discriminativa, que solo clasifica o predice sobre contenido existente.",
  "Un modelo discriminativo te dice 'este email ES spam con 90% de probabilidad'. Un modelo generativo escribe un email completo desde cero. La diferencia no es solo técnica: es un cambio de paradigma en el rol de la IA. La discriminativa automatiza decisiones. La generativa amplifica la creatividad y el trabajo del conocimiento, colaborando activamente con el profesional.",
  "Los LLMs (Large Language Models) como Claude, GPT-4o y Gemini son el principal tipo de IA generativa en texto. Se llaman 'generativos' porque su tarea central durante el preentrenamiento fue predecir y generar el siguiente token a partir del contexto previo. Esa capacidad, entrenada a escala de cientos de miles de millones de parámetros sobre datos de internet, libros y código, generó por emergencia habilidades de razonamiento, análisis y escritura que nadie programó explícitamente. Nadie le enseñó a Claude a resolver ecuaciones: esa capacidad emergió del escala.",
  "En 2026 la IA generativa es el segmento de mayor crecimiento en tecnología: el mercado global pasó de 40.000 millones de dólares en 2023 a un estimado de 280.000 millones en 2026. Europa contribuye activamente: Mistral AI (Francia, fundada en 2023) es el laboratorio europeo de referencia, con modelos open-weights competitivos con GPT-4 y especialmente valorados por empresas que necesitan cumplir el EU AI Act sin depender de proveedores estadounidenses para datos sensibles.",
  "La razón del crecimiento explosivo es estructural: es la primera IA que colabora directamente con trabajadores del conocimiento en su propio idioma natural, sin necesidad de datasets propios, sin equipos de ingeniería especializados, el mismo día que se contrata. Un abogado, un médico o un educador pueden integrarla en su flujo de trabajo inmediatamente."
].join("\n\n");

// ── l3: Supervisado vs no supervisado vs refuerzo ────────────────────────────
const l3 = b1.lecciones.find(l => l.id === 'm1-b1-l3');
l3.contenido.teoria.explicacion = [
  "Los tres paradigmas de aprendizaje en ML definen cómo un modelo extrae conocimiento de los datos. Elegir el correcto es la primera decisión técnica de cualquier proyecto de IA y determina los costos, el tiempo de desarrollo y la viabilidad del sistema.",
  "Aprendizaje supervisado: el modelo aprende de ejemplos etiquetados. Tienes 10.000 emails marcados como 'spam' o 'no spam' y el modelo aprende a clasificar los nuevos. Es el paradigma dominante en aplicaciones empresariales porque los resultados son predecibles, medibles y auditables. El NHS en Reino Unido usa modelos supervisados para detectar retinopatía diabética en imágenes de fondo de ojo, con precisión comparable a la de especialistas humanos y a una fracción del costo.",
  "Aprendizaje no supervisado: el modelo encuentra patrones en datos SIN etiquetas previas. Tienes 100.000 transacciones bancarias sin clasificar y el modelo descubre por cuenta propia que existen cinco perfiles de comportamiento distintos. Es útil para exploración cuando no sabes exactamente qué buscar. Los bancos europeos lo usan extensamente para segmentación de clientes y detección de anomalías en tiempo real, donde etiquetar cada fraude a priori es imposible.",
  "Aprendizaje por refuerzo: el modelo aprende por prueba y error, recibiendo señales de recompensa por acciones correctas y penalizaciones por las incorrectas. AlphaGo de DeepMind (Londres) aprendió a jugar Go a nivel sobrehumano jugando millones de partidas contra sí mismo. También es la base del RLHF (Reinforcement Learning from Human Feedback), el componente que hace que los LLMs respondan de manera útil y segura en lugar de simplemente predecir el siguiente token más probable.",
  "En la práctica empresarial actual: el 70% de los casos de uso son supervisados (datos históricos con resultados conocidos), el 20% no supervisados (segmentación, detección de anomalías) y el 10% refuerzo (sistemas de recomendación, optimización de procesos). Los LLMs modernos combinan los tres paradigmas en su ciclo completo de entrenamiento."
].join("\n\n");

// ── l4: Foundation Models ────────────────────────────────────────────────────
const l4 = b1.lecciones.find(l => l.id === 'm1-b1-l4');
l4.contenido.teoria.explicacion = [
  "Los Foundation Models son el cambio más profundo en la historia de la IA desde la invención del backpropagation en los 80. No es hipérbole: cambiaron el modelo económico de toda la industria en menos de tres años.",
  "Antes de 2020, cada aplicación de IA requería un modelo entrenado desde cero para su tarea específica: un modelo para clasificar emails, otro para traducir, otro para resumir. Costo típico por proyecto: entre 500.000 y varios millones de dólares, más equipos especializados y meses de desarrollo. Solo las grandes corporaciones con recursos de investigación podían construir IA avanzada.",
  "Los Foundation Models invierten este paradigma radicalmente: un único modelo masivo, preentrenado en cientos de miles de millones de parámetros sobre datos generales de texto, código e imágenes, puede adaptarse a miles de tareas distintas con mínima personalización adicional. GPT-4, Claude 3.5, Llama 3 y Gemini 1.5 son Foundation Models. Su impacto económico es directo: el costo marginal de usar uno para una nueva tarea es casi cero comparado con entrenar un modelo específico.",
  "Esto democratizó el acceso a IA avanzada a nivel global. Una startup en Helsinki, Berlín o Bogotá puede usar el mismo nivel de capacidad que usa Google internamente, vía API, por fracciones de céntimo por llamada. Europa respondió con sus propios Foundation Models: Mistral AI (París, 2023) levantó 385 millones de euros en 18 meses. Sus modelos open-weights son la opción preferida de empresas que necesitan soberanía de datos y cumplimiento del EU AI Act sin depender de infraestructura extranjera.",
  "Los Foundation Models tienen tres propiedades que los definen técnicamente: emergencia (capacidades no programadas aparecen al aumentar la escala de parámetros y datos), generalización (funcionan razonablemente bien en dominios no presentes en el entrenamiento) y adaptabilidad (se ajustan con fine-tuning supervisado o con prompts sin reentrenarse desde cero). El AI Engineer de 2026 no entrena Foundation Models — los evalúa, orquesta y adapta."
].join("\n\n");

// ── QA ──────────────────────────────────────────────────────────────────────
const ids = ['m1-b1-l1','m1-b1-l2','m1-b1-l3','m1-b1-l4'];
let allOk = true;
for (const id of ids) {
  const l = b1.lecciones.find(l => l.id === id);
  const w = l.contenido.teoria.explicacion.split(/\s+/).filter(Boolean).length;
  const q = (l.contenido.verificacion || []).length;
  const estado = w >= 300 ? 'OK' : 'FALLO';
  if (estado !== 'OK') allOk = false;
  console.log(`${id}  ${w}w  ${q}q  ${estado}`);
}

if (allOk) {
  fs.writeFileSync('src/content/m1/index.json', JSON.stringify(data, null, 2));
  console.log('\nArchivo guardado.');
} else {
  console.log('\nERROR: alguna lección no cumple 300w. No se guardó.');
  process.exit(1);
}
