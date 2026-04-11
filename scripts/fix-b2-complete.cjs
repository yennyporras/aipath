/**
 * fix-b2-complete.cjs
 * Agrega bienvenida + recap a B2, expande l1 y l2 a 300+ palabras con 5 preguntas.
 */

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b2 = data.bloques.find(b => b.id === 'm1-b2');

// ─── 1. BIENVENIDA l0 ─────────────────────────────────────────────────────────

const bienvenidaB2 = {
  id: 'm1-b2-l0',
  titulo: 'Bienvenida al Bloque 2: Las matemáticas que realmente necesitas',
  bloque: 2,
  tipo: 'bienvenida',
  duracion_min: 10,
  xp: 25,
  contenido: {
    teoria: {
      explicacion: `El miedo a las matemáticas es la barrera número uno que frena a profesionales de negocio y tecnología antes de entrar al mundo de la IA. Y tiene sentido: los libros de texto de cálculo y álgebra lineal son intimidantes, llenos de notación abstracta y ejercicios que parecen desconectados de cualquier aplicación práctica.

Pero aquí está la realidad que nadie te dice: el 90% de los profesionales que trabajan con IA en 2026 — incluyendo AI Engineers, product managers de IA, consultores, y ejecutivos técnicos — nunca derivan una ecuación. Lo que sí necesitan es intuición matemática: entender qué significa un vector, por qué la probabilidad captura incertidumbre, y cómo el gradiente descendente enseña a un modelo.

Este bloque te da exactamente eso. No fórmulas a memorizar. Intuición a construir.

Aprenderás nueve conceptos fundamentales que aparecen constantemente al trabajar con modelos de lenguaje: por qué la matemática importa y cuánta necesitas, qué son los vectores y cómo convierten texto en números, cómo operan las matrices en redes neuronales, los conceptos de probabilidad que explican por qué los modelos "predicen" en lugar de "saber", qué es el gradiente descendente y cómo aprende un modelo, qué son los embeddings y cómo capturan significado, cómo la similitud coseno permite la búsqueda semántica, qué hacen las funciones de activación como softmax y sigmoid, qué son las funciones de pérdida y cómo saben los modelos que se equivocaron, y finalmente cómo funciona el backpropagation.

Al terminar este bloque, podrás leer documentación técnica de APIs de IA, entender papers de investigación a nivel conceptual, y tomar decisiones fundamentadas sobre cuándo fine-tunear un modelo, cómo interpretar parámetros de generación, y por qué un modelo puede fallar de formas específicas.`,
      analogia: null,
      ejemplo_malo: null,
      ejemplo_bueno: null,
      por_que_importa: 'Este bloque transforma las matemáticas de un obstáculo en una herramienta. Con la intuición correcta, puedes leer el lenguaje en que está escrita la IA — sin necesitar un doctorado.',
      tip_profesional: null
    },
    verificacion: [],
    practica: {
      tipo: 'reflexion',
      contexto: 'Antes de empezar el bloque, activa tu relación actual con las matemáticas.',
      instruccion: 'Sin buscar ninguna definición: ¿qué es un vector para ti ahora mismo? Escribe tu respuesta en 1-2 frases. Al terminar el bloque, compárala con lo que habrás aprendido.',
      input_malo: null,
      pista: 'No hay respuesta incorrecta. El objetivo es registrar tu punto de partida para medir tu progreso real.',
      solucion: 'Al terminar B2 deberías poder responder: un vector es una lista de números que representa un objeto (palabra, imagen, documento) en un espacio matemático multidimensional. Palabras con significados similares tienen vectores cercanos. Esta representación numérica es lo que permite a los modelos de IA procesar lenguaje.',
      criterios_de_exito: [
        'Escribiste una respuesta, aunque sea muy básica',
        'Identificaste al menos una característica de los vectores',
        'Guardaste tu respuesta para compararla al terminar el bloque'
      ]
    },
    conexion: {
      siguiente_concepto: 'Por qué necesitas matemáticas y cuántas',
      por_que_importa_despues: 'La primera lección del bloque establece exactamente qué nivel de matemáticas necesitas según tu rol — para que inviertas tu tiempo donde más importa.'
    }
  }
};

// ─── 2. EXPANDIR l1 ──────────────────────────────────────────────────────────

const l1 = b2.lecciones.find(l => l.id === 'm1-b2-l1');
l1.contenido.teoria.explicacion = `La pregunta más frecuente de profesionales no técnicos que quieren aprender IA: ¿Necesito saber cálculo y álgebra lineal? La respuesta honesta: depende de lo que quieras hacer.

Si quieres usar IA (prompt engineering, implementar APIs, construir aplicaciones sobre Foundation Models): necesitas matemáticas mínimas — intuición de probabilidad y vectores, nada más. Si quieres entender IA (poder debuggear modelos, optimizar fine-tuning, tomar decisiones de arquitectura): necesitas álgebra lineal básica, estadística descriptiva y cálculo conceptual. Si quieres crear IA desde cero (researcher o ML engineer): necesitas toda la matemática: cálculo multivariable, álgebra lineal avanzada, estadística bayesiana, teoría de la información.

Para el 90% de los profesionales de negocio y la mayoría de los roles de AI Engineer en 2026, el nivel 1 o 2 es suficiente. Este módulo cubre el nivel 2: la matemática que te hace mejor tomador de decisiones sobre IA sin convertirte en investigador.

El nivel 2 específicamente te permite: leer documentación técnica de APIs y entender los parámetros que configuras, interpretar métricas de evaluación de modelos como perplexidad o BLEU score, tomar decisiones informadas sobre cuándo hacer fine-tuning versus prompt engineering, entender por qué un modelo falla en ciertos tipos de consultas, y comunicarte con científicos de datos e ingenieros de ML con el vocabulario correcto.

Aprenderás: vectores (cómo el texto se convierte en números), matrices (cómo fluye la información en redes neuronales), probabilidad básica (por qué el modelo 'predice' en lugar de 'saber'), y gradiente descendente (cómo aprende un modelo). Todo con intuición primero, fórmulas después.

El nivel 2 de matemáticas para IA es alcanzable en 20-30 horas de estudio enfocado. La razón es que la matemática requerida es principalmente geométrica y estadística — no manipulación de fórmulas. Necesitas entender qué significa la pendiente de una colina para el gradiente descendente, no derivar la función de costo. Khan Academy tiene toda esta matemática de forma gratuita, con explicaciones visuales que hacen los conceptos accesibles.`;

// Agregar 2 preguntas más a las 3 existentes
l1.contenido.verificacion.push(
  {
    pregunta: '¿Qué habilidades profesionales concretas te da el nivel 2 de matemáticas para IA?',
    opciones: [
      'Publicar papers en conferencias de ML',
      'Leer documentación técnica, interpretar métricas y comunicarte con científicos de datos',
      'Entrenar modelos desde cero sin datos pre-existentes',
      'Crear arquitecturas de redes neuronales nuevas'
    ],
    correcta: 1,
    explicacion_profunda: 'El nivel 2 es el nivel del profesional práctico: te permite interpretar la documentación técnica de APIs como las de Anthropic u OpenAI, entender métricas de evaluación, tomar decisiones sobre cuándo fine-tunear versus hacer prompt engineering, y comunicarte efectivamente con el equipo técnico. No te habilita para investigación original, pero sí para trabajo profesional serio con IA.',
    concepto_reforzado: 'Aplicación práctica del nivel 2 de matemáticas para IA'
  },
  {
    pregunta: '¿En cuánto tiempo aproximado puede un profesional alcanzar el nivel 2 de matemáticas para IA?',
    opciones: [
      '200-300 horas (como un semestre universitario)',
      '500+ horas (como una carrera técnica)',
      '20-30 horas de estudio enfocado',
      'Es imposible sin educación formal en matemáticas'
    ],
    correcta: 2,
    explicacion_profunda: 'El nivel 2 es alcanzable en 20-30 horas porque la matemática requerida es principalmente conceptual y geométrica, no manipulación avanzada de fórmulas. El aprendizaje just-in-time — aprenderlo cuando enfrentas un problema que lo requiere — acelera la retención. Recursos gratuitos como Khan Academy y 3Blue1Brown (Essence of Linear Algebra) cubren todo lo necesario.',
    concepto_reforzado: 'Tiempo y recursos para alcanzar matemáticas nivel 2 para IA'
  }
);

// ─── 3. EXPANDIR l2 ──────────────────────────────────────────────────────────

const l2 = b2.lecciones.find(l => l.id === 'm1-b2-l2');
l2.contenido.teoria.explicacion = `Un vector es simplemente una lista de números. En geometría, un vector [3, 4] describe un punto en 2D. En IA, los vectores son la forma en que convertimos cualquier cosa — palabras, imágenes, documentos — en matemáticas que los modelos pueden procesar.

El proceso se llama 'embedding': cada palabra se convierte en un vector de cientos o miles de dimensiones. La magia es que vectores de palabras con significados similares quedan cercanos en el espacio vectorial. 'Rey' y 'monarca' tienen vectores similares. 'Perro' y 'can' también. Esto se puede medir con la 'similitud coseno' — básicamente el ángulo entre dos vectores. Si el ángulo es 0°, son idénticos. Si es 90°, no tienen relación. Si es 180°, son opuestos.

La ecuación más famosa de los embeddings es: vector('rey') - vector('hombre') + vector('mujer') ≈ vector('reina'). Esta operación aritmética captura una relación conceptual (realeza + género femenino).

¿Por qué tantas dimensiones? El modelo text-embedding-3-large de OpenAI usa 3072 dimensiones por defecto. El ada-002 usa 1536. Claude usa dimensiones similares. Más dimensiones permiten capturar relaciones más sutiles entre conceptos: no solo que 'banco' y 'dinero' están relacionados, sino que ese 'banco' es financiero y no un asiento junto a un río. La alta dimensionalidad es lo que hace posible la comprensión semántica matizada.

En la práctica empresarial, los embeddings tienen una aplicación directa enorme: búsqueda semántica. En lugar de buscar por palabras exactas, buscas por significado. 'Cómo cancelar mi suscripción' y 'quiero dar de baja mi cuenta' tienen embeddings similares, por eso los sistemas de búsqueda semántica los reconocen como la misma consulta.

Esta tecnología también alimenta los sistemas RAG (Retrieval-Augmented Generation): cuando le das documentos a un asistente de IA, primero se convierten en embeddings, se almacenan en una base de datos vectorial como Pinecone o pgvector, y cuando haces una pregunta, tu pregunta también se convierte en embedding para buscar los documentos más relevantes. Todo el ecosistema de IA moderna sobre documentos propios depende de esta matemática de vectores.`;

l2.contenido.verificacion.push(
  {
    pregunta: '¿Por qué los modelos de embeddings modernos usan miles de dimensiones en lugar de decenas?',
    opciones: [
      'Por limitaciones técnicas de almacenamiento',
      'Para capturar relaciones semánticas más sutiles entre conceptos',
      'Porque los modelos más grandes siempre son mejores',
      'Por convención histórica sin razón técnica'
    ],
    correcta: 1,
    explicacion_profunda: 'Más dimensiones permiten capturar relaciones más matizadas. Con pocas dimensiones, solo puedes codificar relaciones simples como "similar/diferente". Con miles de dimensiones, el modelo puede capturar que "banco" puede ser financiero o un asiento, que "python" puede ser un lenguaje de programación o una serpiente, y que "ligero" puede referirse a peso, color o personalidad. Esta capacidad semántica matizada es fundamental para el rendimiento de los LLMs.',
    concepto_reforzado: 'Dimensionalidad en embeddings y capacidad semántica'
  },
  {
    pregunta: '¿Qué es RAG y cuál es el papel de los embeddings en este sistema?',
    opciones: [
      'RAG es un tipo de red neuronal; los embeddings son sus capas',
      'RAG es Retrieval-Augmented Generation; los embeddings convierten documentos y consultas en vectores para búsqueda semántica',
      'RAG es un método de entrenamiento; los embeddings son los datos de entrenamiento',
      'RAG es una API de búsqueda; los embeddings son palabras clave'
    ],
    correcta: 1,
    explicacion_profunda: 'RAG (Retrieval-Augmented Generation) es una técnica que combina recuperación de información con generación de texto. Los documentos se convierten en embeddings y se almacenan en bases de datos vectoriales. Cuando llega una consulta, también se convierte en embedding, se buscan los documentos más similares (con similitud coseno), y esos documentos se pasan como contexto al LLM. Esto permite que los modelos respondan con información actualizada o específica de la empresa sin re-entrenamiento.',
    concepto_reforzado: 'Embeddings como base de sistemas RAG'
  }
);

// ─── 4. RECAP l11 ────────────────────────────────────────────────────────────

const recapB2 = {
  id: 'm1-b2-l11',
  titulo: 'Recapitulación B2: La matemática que hace funcionar la IA',
  bloque: 2,
  tipo: 'recapitulacion',
  duracion_min: 15,
  xp: 75,
  contenido: {
    teoria: {
      explicacion: `Completaste el bloque de matemáticas esenciales para IA. No estudiaste matemáticas abstractas — estudiaste el lenguaje en que está escrita la IA moderna.

Empezaste entendiendo que el nivel 2 de matemáticas (intuición conceptual sin manipulación avanzada de fórmulas) es suficiente para el 90% de roles profesionales con IA. Con 20-30 horas de estudio enfocado puedes alcanzarlo.

Aprendiste que los vectores son la representación fundamental: texto, imágenes y documentos se convierten en listas de números que preservan relaciones semánticas. Las matrices organizan y transforman esos vectores a través de las capas de la red neuronal. La probabilidad explica por qué los modelos predicen tokens en lugar de "saber" la respuesta correcta.

El gradiente descendente es el algoritmo de aprendizaje: como bajar una colina con los ojos vendados, dando pasos en la dirección que más baja la pendiente, hasta encontrar un mínimo. Los embeddings son vectores entrenados que capturan significado — 3072 dimensiones para capturar relaciones semánticas matizadas. La similitud coseno mide qué tan parecidos son dos vectores, base de toda búsqueda semántica.

Las funciones de activación como softmax y sigmoid introducen no-linealidad esencial. Las funciones de pérdida cuantifican exactamente cuánto se equivocó el modelo. Y el backpropagation propaga ese error hacia atrás para ajustar todos los parámetros en la dirección correcta.

Este conocimiento no es teórico. Es lo que necesitas para leer documentación técnica, entender por qué un modelo falla, y tomar decisiones informadas sobre arquitecturas y técnicas de entrenamiento.`,
      analogia: null,
      ejemplo_malo: null,
      ejemplo_bueno: null,
      por_que_importa: 'Con este bloque completado, puedes leer el lenguaje matemático de la IA. El siguiente bloque usa exactamente estos conceptos para explicar cómo funciona un LLM desde adentro.',
      tip_profesional: 'La mejor manera de afianzar esta matemática es usarla: toma cualquier API de embeddings (Anthropic, OpenAI, Cohere) y experimenta con vectores reales. Observa cómo palabras similares tienen alta similitud coseno. La experiencia práctica consolida la intuición.'
    },
    verificacion: [
      {
        pregunta: '¿Cuál es la función matemática que mide la similitud entre dos vectores en los sistemas de búsqueda semántica?',
        opciones: [
          'Distancia euclidiana',
          'Similitud coseno',
          'Producto punto sin normalizar',
          'Correlación de Pearson'
        ],
        correcta: 1,
        explicacion_profunda: 'La similitud coseno mide el ángulo entre dos vectores, independientemente de su magnitud. Esto es ideal para embeddings porque el significado está codificado en la dirección del vector, no en su longitud. Dos vectores con ángulo 0° (similitud 1.0) son idénticos en significado. Con ángulo 90° (similitud 0.0) son semánticamente no relacionados. Esta métrica alimenta toda búsqueda semántica, sistemas RAG, y detección de duplicados semánticos.',
        concepto_reforzado: 'Similitud coseno como métrica de búsqueda semántica'
      },
      {
        pregunta: '¿Qué proceso ajusta los parámetros de una red neuronal después de calcular el error de predicción?',
        opciones: [
          'Forward propagation',
          'Regularización',
          'Backpropagation con gradiente descendente',
          'Dropout'
        ],
        correcta: 2,
        explicacion_profunda: 'El proceso de aprendizaje tiene dos fases: forward propagation (el dato viaja hacia adelante produciendo una predicción) y backpropagation (el error viaja hacia atrás ajustando cada parámetro según su contribución al error). El gradiente descendente determina la dirección y tamaño del ajuste. Este ciclo se repite millones o billones de veces durante el entrenamiento de un LLM moderno.',
        concepto_reforzado: 'Ciclo de aprendizaje: forward pass, loss, backpropagation, gradient descent'
      },
      {
        pregunta: '¿Por qué el bloque de matemáticas es relevante para un AI Engineer que no investigará modelos desde cero?',
        opciones: [
          'No es relevante — los AI Engineers solo necesitan llamar APIs',
          'Permite leer documentación técnica, debuggear fallos de modelos y tomar decisiones de arquitectura fundamentadas',
          'Es obligatorio para obtener certificaciones de IA',
          'Solo es útil si trabajas con Python directamente'
        ],
        correcta: 1,
        explicacion_profunda: 'El nivel 2 de matemáticas transforma a un AI Engineer de "usuario de APIs" a "tomador de decisiones técnicas informadas". Puedes leer y entender la documentación de parámetros (temperatura, top-p, dimensiones de embedding), interpretar métricas de evaluación, entender por qué un modelo alucina en ciertos contextos, y comunicarte con científicos de datos con vocabulario preciso. Esto multiplica la efectividad profesional sin requerir investigación original.',
        concepto_reforzado: 'Valor práctico de las matemáticas de nivel 2 para AI Engineers'
      }
    ],
    practica: {
      tipo: 'caso_real',
      contexto: 'Eres AI Engineer en una empresa de e-commerce. El equipo quiere implementar búsqueda semántica de productos para mejorar conversiones. Tienes que presentar la solución técnica al CTO.',
      instruccion: 'Explica en términos matemáticos y técnicos cómo funcionaría la búsqueda semántica de productos usando embeddings. Incluye: qué se convierte en vectores, cómo se almacenan, cómo funciona la búsqueda, y qué métrica se usa para ranquear resultados.',
      input_malo: 'Usaríamos IA para entender lo que el usuario quiere buscar y mostrarle productos similares.',
      pista: 'Piensa en el pipeline completo: (1) generar embeddings de todos los productos, (2) almacenarlos, (3) cuando llega una consulta, convertirla también en embedding, (4) buscar los productos más similares con una métrica específica.',
      solucion: 'Cada descripción de producto se convierte en un embedding (vector de 1536-3072 dimensiones) usando un modelo como text-embedding-3-large. Estos vectores se almacenan en una base de datos vectorial (pgvector, Pinecone, Weaviate). Cuando un usuario busca "zapatos cómodos para caminar", esa consulta también se convierte en embedding. Luego se calcula la similitud coseno entre el embedding de la consulta y todos los embeddings de productos, retornando los K más similares (K-NN search). Esto captura búsquedas semánticas: "calzado deportivo para trekking" encontrará los mismos productos que "zapatos cómodos para caminar".',
      criterios_de_exito: [
        'Mencionas el proceso de generar embeddings para los productos',
        'Explicas cómo se almacenan los vectores',
        'Describes cómo se convierte la consulta en embedding',
        'Mencionas la similitud coseno como métrica de ranking',
        'El CTO puede entender el pipeline sin conocimiento previo de embeddings'
      ]
    },
    conexion: {
      siguiente_concepto: 'Cómo funciona un LLM por dentro',
      por_que_importa_despues: 'El Bloque 3 usa exactamente estos conceptos matemáticos para explicar la arquitectura interna de los LLMs: redes neuronales, transformers, atención, y cómo se entrena un modelo. Con las matemáticas del B2, el B3 se vuelve mucho más claro.'
    }
  }
};

// ─── 5. INSERTAR EN EL BLOQUE ────────────────────────────────────────────────

b2.lecciones.unshift(bienvenidaB2);
b2.lecciones.push(recapB2);

// ─── 6. GUARDAR ──────────────────────────────────────────────────────────────

fs.writeFileSync('src/content/m1/index.json', JSON.stringify(data, null, 2));
console.log('✓ B2 completado: bienvenida + l1 expandida + l2 expandida + recap');
console.log('  Total lecciones B2:', b2.lecciones.length);
