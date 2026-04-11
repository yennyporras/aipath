const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b1 = data.bloques.find(b => b.id === 'm1-b1');

// ── B1-l1: IA vs ML vs DL ──────────────────────────────────────────────────
const l1 = b1.lecciones.find(l => l.id === 'm1-b1-l1');
l1.contenido.verificacion.push(
  {
    pregunta: "Un hospital en Alemania tiene 80.000 radiografías etiquetadas por radiólogos y quiere construir un sistema para detectar neumonía automáticamente. ¿Qué categoría de técnica es la más adecuada?",
    opciones: [
      "ML clásico con reglas manuales de umbral de píxeles",
      "IA simbólica con reglas codificadas por expertos",
      "Una hoja de cálculo con fórmulas estadísticas",
      "Deep Learning con redes convolucionales entrenadas sobre las imágenes"
    ],
    correcta: 3,
    explicacion_profunda: "Las redes convolucionales (CNNs) son Deep Learning especializado en visión por computador. Con 80.000 imágenes etiquetadas el volumen supera el umbral mínimo necesario y hace que DL sea la opción correcta. ML clásico no puede procesar directamente píxeles sin ingeniería de características manual extensiva. Las reglas simbólicas son imposibles de escalar a la variabilidad de radiografías reales. En Europa, sistemas equivalentes están desplegados en hospitales del NHS (Reino Unido) y en Charité (Berlín), con precisión diagnóstica comparable a especialistas en detección de patologías pulmonares. El EU AI Act clasifica estos sistemas como de alto riesgo, exigiendo validación clínica rigurosa antes del despliegue. La elección de DL aquí no es arbitraria: es la única técnica que puede aprender representaciones jerárquicas directamente de píxeles a diagnóstico.",
    concepto_reforzado: "Selección de técnica correcta según volumen de datos y tipo de problema"
  },
  {
    pregunta: "Un equipo de ingeniería codifica manualmente reglas como 'si precio > 100€ Y devoluciones > 2 → alto riesgo'. ¿Esto es Machine Learning?",
    opciones: [
      "No, es IA simbólica basada en reglas programadas manualmente, no aprendidas de datos",
      "Sí, porque usa datos para tomar decisiones",
      "Sí, es ML supervisado porque tiene condiciones lógicas",
      "Depende del número de reglas definidas"
    ],
    correcta: 0,
    explicacion_profunda: "El criterio definitorio de Machine Learning es que el sistema aprende los patrones DESDE datos en lugar de seguir reglas escritas por un programador. Un árbol con condiciones codificadas a mano es IA simbólica o sistema experto, la categoría dominante antes de los años 90. Aunque toma decisiones inteligentes, no es ML porque ningún parámetro fue aprendido de ejemplos. La distinción tiene consecuencias legales reales en Europa: el EU AI Act y los reguladores financieros como el Banco Central Europeo tratan de forma diferente los modelos aprendidos frente a las reglas codificadas. Los modelos de ML requieren documentación adicional de explicabilidad bajo GDPR Artículo 22. Las reglas simbólicas, al ser completamente trazables, tienen un régimen regulatorio más simple. Saber hacer esta distinción evita clasificaciones erróneas con consecuencias de cumplimiento normativo.",
    concepto_reforzado: "Diferencia entre IA simbólica y Machine Learning"
  }
);

// ── B1-l2: IA Generativa ──────────────────────────────────────────────────
const l2 = b1.lecciones.find(l => l.id === 'm1-b1-l2');
l2.contenido.verificacion.push(
  {
    pregunta: "Una aseguradora en los Países Bajos necesita un sistema que apruebe o rechace solicitudes de seguro de salud automáticamente. ¿Qué tipo de IA es más adecuada?",
    opciones: [
      "IA Generativa con LLM porque puede procesar texto libre del formulario",
      "IA Generativa porque puede generar explicaciones para el solicitante",
      "IA Discriminativa (ML supervisado) porque clasifica sobre datos estructurados, es determinista y auditable bajo GDPR Art. 22",
      "Cualquiera de las dos con los mismos resultados"
    ],
    correcta: 2,
    explicacion_profunda: "Las decisiones automatizadas de aprobación o rechazo sobre personas son el caso de uso central de la IA discriminativa: clasificar un input estructurado en una categoría binaria. Tres razones hacen a ML supervisado la elección correcta aquí. Primera, los datos son estructurados (edad, historial médico, ingresos) y el resultado es binario, encaje perfecto con clasificación supervisada. Segunda, bajo GDPR Artículo 22, el solicitante tiene derecho a explicación cuando una decisión automatizada le afecta significativamente — los modelos discriminativos clásicos son más interpretables que un LLM. Tercera, un LLM generativo introduce variabilidad no determinista en decisiones que exigen consistencia absoluta y trazabilidad total. La AFM, regulador financiero neerlandés, exige documentación completa del modelo para estos casos. Usar un LLM generativo aquí sin controles adicionales sería un riesgo regulatorio significativo.",
    concepto_reforzado: "Seleccionar entre IA discriminativa y generativa según el tipo de tarea"
  },
  {
    pregunta: "Claude genera código Python funcional aunque fue entrenado principalmente en texto general. ¿Qué propiedad de los modelos generativos explica esto?",
    opciones: [
      "Que fue entrenado específicamente con todos los repositorios de GitHub",
      "Emergencia: capacidades que aparecen con el aumento de escala sin haber sido programadas explícitamente",
      "Que tiene un módulo de código separado del módulo de texto",
      "Que accede a internet para buscar ejemplos de código en tiempo real"
    ],
    correcta: 1,
    explicacion_profunda: "La emergencia es una de las propiedades más sorprendentes de los modelos generativos a gran escala. Se refiere a capacidades que aparecen cuando el modelo supera ciertos umbrales de tamaño y datos, sin que nadie las haya programado explícitamente como módulos separados. Claude no fue construido con un componente específico de Python: su capacidad para generar código emergió del entrenamiento masivo en texto general que incluía repositorios, documentación técnica y discusiones de Stack Overflow. Lo mismo ocurre con las matemáticas, la traducción simultánea y el razonamiento lógico multinivel. Esta propiedad es lo que hace que los Foundation Models sean tan versátiles. Al mismo tiempo, hace que su comportamiento sea difícil de predecir completamente, tema central del EU AI Act en su categoría de modelos de propósito general (GPAI), que exige evaluaciones de capacidades emergentes antes de la comercialización en la Unión Europea.",
    concepto_reforzado: "Propiedad de emergencia en modelos generativos a gran escala"
  }
);

// ── B1-l3: Supervisado / No sup / Refuerzo ──────────────────────────────────
const l3 = b1.lecciones.find(l => l.id === 'm1-b1-l3');
l3.contenido.verificacion.push(
  {
    pregunta: "Spotify quiere un sistema de recomendación que mejore continuamente según si el usuario escucha una canción completa, la salta o la guarda en favoritos. ¿Qué paradigma es más adecuado?",
    opciones: [
      "Supervisado, entrenando con el historial de escuchas etiquetadas manualmente",
      "No supervisado, agrupando canciones por características acústicas",
      "Semi-supervisado, combinando los dos anteriores",
      "Por refuerzo, donde escuchar completo es recompensa y saltar es penalización"
    ],
    correcta: 3,
    explicacion_profunda: "Este es un caso clásico de aprendizaje por refuerzo en sistemas de recomendación. Las acciones del usuario son señales de recompensa explícitas en tiempo real: escuchar completo suma recompensa positiva, saltar a los cinco segundos suma penalización, guardar en favoritos es recompensa fuerte. El modelo aprende una política de recomendación que maximiza la recompensa acumulada a largo plazo, no solo la satisfacción inmediata. Esto es diferente al supervisado porque no hay etiquetas predefinidas de 'buena recomendación': la señal emerge de la interacción real con el usuario real. Spotify, Deezer (Francia) y otros servicios europeos de streaming usan variantes de deep reinforcement learning para sus motores de recomendación. La diferencia práctica es significativa: el sistema supervisado optimiza para lo que fue etiquetado en el pasado, mientras que el sistema de refuerzo aprende continuamente del comportamiento actual del usuario.",
    concepto_reforzado: "Aprendizaje por refuerzo con señales de recompensa del usuario"
  },
  {
    pregunta: "Un sistema de reconocimiento de voz europeo tiene 95% de precisión para hablantes nativos de inglés pero solo 72% para hablantes no nativos. ¿Qué problema describe esto?",
    opciones: [
      "Un error de implementación del algoritmo de audio",
      "Sesgo de representación en los datos de entrenamiento supervisado: el grupo con peor rendimiento estaba subrepresentado",
      "Que el aprendizaje no supervisado no puede manejar acentos",
      "Un problema de hardware con micrófonos de baja calidad"
    ],
    correcta: 1,
    explicacion_profunda: "Este escenario describe con precisión el sesgo de representación en aprendizaje supervisado. El modelo fue entrenado con datos etiquetados donde los hablantes nativos de inglés estaban sobrerrepresentados, resultando en un modelo con buen rendimiento para ese grupo mayoritario y peor para los subrepresentados. El modelo aprendió patrones del conjunto de datos sesgado, no del conjunto completo de usuarios reales que debería servir. Este tipo de sesgo es crítico bajo el EU AI Act: los sistemas de reconocimiento de voz usados en entornos de alto riesgo como atención médica, justicia y servicios públicos deben demostrar rendimiento equitativo entre grupos demográficos mediante evaluaciones desagregadas. Amazon, Microsoft y Apple han publicado estudios de equidad de sus sistemas de voz precisamente por esta presión regulatoria europea y de organizaciones de derechos digitales como AlgorithmWatch (Berlín). La solución técnica es recolectar y etiquetar datos balanceados de todos los grupos relevantes.",
    concepto_reforzado: "Sesgo de representación en datos de entrenamiento supervisado"
  }
);

// ── B1-l4: Foundation Models ────────────────────────────────────────────────
const l4 = b1.lecciones.find(l => l.id === 'm1-b1-l4');
l4.contenido.verificacion.push(
  {
    pregunta: "Una empresa mediana española quiere añadir a su software de RR.HH. una función que resuma CVs automáticamente. ¿Cuál es el enfoque más eficiente en 2026?",
    opciones: [
      "Entrenar un modelo propio desde cero con CVs históricos de la empresa",
      "Contratar un equipo de NLP para construir reglas de extracción de texto",
      "Usar un Foundation Model vía API con un prompt bien diseñado, listo en horas por céntimos por CV",
      "Esperar a que los precios bajen más antes de adoptar IA"
    ],
    correcta: 2,
    explicacion_profunda: "Este es exactamente el caso de uso para el que los Foundation Models transformaron el mercado. Antes de 2020, resumir documentos en lenguaje natural requería un equipo de NLP especializado, un dataset etiquetado de decenas de miles de CVs, meses de entrenamiento y validación, y mantenimiento continuo del modelo. Costo típico: 300.000 a 500.000 euros y seis a doce meses de desarrollo. Hoy, un desarrollador puede conectar la API de Claude o GPT-4 con un prompt diseñado y tener un MVP funcionando en horas. El costo marginal por CV es de céntimos. Para una empresa mediana española, la alternativa de entrenar desde cero sigue costando lo mismo que antes. El EU AI Act clasifica los sistemas de selección de personal como de alto riesgo, lo que significa que también deberás documentar el Foundation Model que uses, sus limitaciones conocidas y las medidas de supervisión humana implementadas antes de desplegarlo en producción.",
    concepto_reforzado: "Impacto práctico de los Foundation Models en el costo de adopción de IA"
  },
  {
    pregunta: "Mistral AI lanzó sus modelos con pesos abiertos (open-weights). ¿Qué ventaja concreta ofrece esto a un banco alemán frente a usar GPT-4 solo vía API?",
    opciones: [
      "Pueden desplegar el modelo en su propia infraestructura sin que datos bancarios salgan de sus servidores, cumpliendo GDPR y regulación bancaria europea",
      "Los modelos open-weights son siempre más precisos que los cerrados en tareas financieras",
      "Son completamente gratuitos sin ningún costo operativo",
      "OpenAI también ofrece exactamente las mismas opciones de despliegue local"
    ],
    correcta: 0,
    explicacion_profunda: "Para el sector bancario europeo la soberanía de datos no es opcional. El GDPR, la Directiva NIS2 y la regulación bancaria del BCE exigen control sobre dónde se procesan los datos de clientes. Usar la API de OpenAI implica que datos financieros potencialmente sensibles transitan por servidores de una empresa estadounidense sujeta a la CLOUD Act, lo que puede entrar en conflicto con requisitos de localización de datos europeos. Con los modelos open-weights de Mistral, el banco puede desplegar el modelo dentro de su propia infraestructura on-premise o en su nube privada europea, garantizando que ningún dato de cliente sale del perímetro controlado. Esto explica por qué Mistral AI captó inversión de Deutsche Telekom y Salesforce Europe: resuelve un problema regulatorio real que GPT-4 no puede resolver sin acuerdos contractuales muy específicos y costosos. Esta distinción entre modelos abiertos y cerrados es fundamental para el diseño de arquitecturas de IA en sectores regulados europeos.",
    concepto_reforzado: "Modelos open-weights y soberanía de datos en entornos regulados europeos"
  }
);

// ── QA ──────────────────────────────────────────────────────────────────────
let allOk = true;
for (const id of ['m1-b1-l1','m1-b1-l2','m1-b1-l3','m1-b1-l4']) {
  const l = b1.lecciones.find(l => l.id === id);
  const q = l.contenido.verificacion.length;
  // Verificar solo las 2 nuevas preguntas (índices 3 y 4)
  const nuevas = l.contenido.verificacion.slice(3);
  const minExpNuevas = Math.min(...nuevas.map(v => v.explicacion_profunda.split(/\s+/).filter(Boolean).length));
  const posiciones = l.contenido.verificacion.map(v => v.correcta);
  const ok = q === 5 && minExpNuevas >= 100;
  if (!ok) allOk = false;
  console.log(`${id}  ${q}q  nuevas_min_exp=${minExpNuevas}w  correctas=[${posiciones}]  ${ok ? 'OK' : 'FALLO'}`);
}

if (allOk) {
  fs.writeFileSync('src/content/m1/index.json', JSON.stringify(data, null, 2));
  console.log('\nArchivo guardado.');
} else {
  console.log('\nERROR: alguna lección no cumple requisitos. No se guardó.');
  process.exit(1);
}
