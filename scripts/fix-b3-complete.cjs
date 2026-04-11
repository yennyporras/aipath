/**
 * fix-b3-complete.cjs
 * Agrega bienvenida + recap a B3, expande l1 y l2 a 300+ palabras con 5 preguntas.
 */

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b3 = data.bloques.find(b => b.id === 'm1-b3');

// ─── 1. BIENVENIDA l0 ─────────────────────────────────────────────────────────

const bienvenidaB3 = {
  id: 'm1-b3-l0',
  titulo: 'Bienvenida al Bloque 3: Dentro de un LLM',
  bloque: 3,
  tipo: 'bienvenida',
  duracion_min: 10,
  xp: 25,
  contenido: {
    teoria: {
      explicacion: `Puedes usar Claude o GPT-4 sin entender cómo funcionan internamente. La mayoría de las personas lo hace. Pero hay una diferencia enorme entre el profesional que usa IA como una caja negra y el que entiende qué pasa dentro.

Cuando entiendes los internos de un LLM, puedes predecir cuándo fallará antes de que falle. Sabes por qué la temperatura alta produce respuestas creativas pero imprecisas. Entiendes por qué la ventana de contexto es un recurso limitado y cómo gestionarlo. Comprendes por qué las alucinaciones no son "bugs" sino consecuencias inevitables de cómo funciona la predicción probabilística de tokens.

Este bloque te lleva desde las neuronas artificiales más básicas hasta los mecanismos específicos que hacen que Claude pueda escribir código, analizar documentos y mantener una conversación coherente durante horas.

Empezarás con redes neuronales: qué son, cómo aprenden, por qué la profundidad importa. Luego la arquitectura Transformer — el paper de 2017 que lo cambió todo — y por qué reemplazó absolutamente todo lo que existía antes. Aprenderás cómo el modelo lee texto (tokenización), cómo decide qué partes son importantes (atención y self-attention), y cómo se entrena en billones de tokens sin instrucciones explícitas (preentrenamiento).

También entenderás el fine-tuning: cómo se transforma un modelo base en un asistente útil. El RLHF: cómo se alinea con valores humanos. Los parámetros de generación: temperatura, top-p y top-k. La ventana de contexto y sus límites reales. Y las alucinaciones: por qué ocurren y qué puedes hacer.

Al terminar este bloque, tendrás un mapa mental preciso de lo que ocurre cuando escribes un mensaje y recibes una respuesta.`,
      analogia: null,
      ejemplo_malo: null,
      ejemplo_bueno: null,
      por_que_importa: 'Entender los internos de un LLM transforma cómo interactúas con él. Pasas de usuario a arquitecto: sabes qué pedirle, cómo estructurar el contexto, cuándo confiar en la respuesta y cuándo verificarla.',
      tip_profesional: null
    },
    verificacion: [],
    practica: {
      tipo: 'reflexion',
      contexto: 'Antes de empezar el bloque, activa lo que ya sabes sobre cómo funcionan los LLMs.',
      instruccion: 'Sin buscar ninguna definición: ¿qué crees que pasa técnicamente cuando escribes un mensaje a Claude y recibes una respuesta? Describe el proceso en 2-3 frases con tu comprensión actual.',
      input_malo: null,
      pista: 'No hay respuesta incorrecta. Esto es un punto de partida. Al terminar el bloque, regresa a tu respuesta y mide cuánto ha cambiado tu comprensión.',
      solucion: 'Al terminar B3 podrás describir: el texto se tokeniza en subpalabras, cada token se convierte en un embedding, los embeddings pasan por capas de atención que relacionan tokens entre sí, y finalmente una capa de salida predice el token siguiente usando una distribución de probabilidad sobre el vocabulario completo. La temperatura y top-p controlan cuánta aleatoriedad se introduce en esa selección. Este proceso se repite token por token hasta completar la respuesta.',
      criterios_de_exito: [
        'Escribiste una descripción aunque sea incompleta',
        'Identificaste al menos un paso del proceso',
        'Guardaste la respuesta para compararla al terminar'
      ]
    },
    conexion: {
      siguiente_concepto: 'Redes neuronales: de neuronas biológicas a artificiales',
      por_que_importa_despues: 'La primera lección construye la base de todo lo que sigue: entender cómo aprende una red neuronal es prerequisito para entender por qué los Transformers son tan poderosos.'
    }
  }
};

// ─── 2. EXPANDIR l1 ──────────────────────────────────────────────────────────

const l1 = b3.lecciones.find(l => l.id === 'm1-b3-l1');
l1.contenido.teoria.explicacion = `Una red neuronal artificial es una simplificación matemática inspirada (muy libremente) en el cerebro. Una neurona artificial toma múltiples inputs numéricos, los multiplica por pesos (weights), suma todo, aplica una función de activación, y produce un output. En una red con millones de estas neuronas conectadas en capas, cada capa aprende representaciones progresivamente más abstractas.

La primera capa puede aprender bordes en una imagen. La segunda, formas. La tercera, partes de objetos. La cuarta, objetos completos. Este aprendizaje jerárquico de representaciones es la razón por la que las redes neuronales son tan poderosas. El término 'deep learning' (aprendizaje profundo) viene precisamente de este apilamiento de múltiples capas: mientras más capas, más abstractas y poderosas son las representaciones que el modelo puede aprender.

El entrenamiento ajusta los pesos de cada neurona mediante backpropagation: el modelo hace una predicción, calcula cuánto se equivocó (función de pérdida), y propaga ese error hacia atrás para ajustar los pesos en la dirección correcta. Este proceso se repite millones o billones de veces con diferentes ejemplos.

Los LLMs tienen billones de parámetros (los pesos de todas las conexiones). GPT-4 se estima en aproximadamente 1.8 trillones de parámetros. Claude Sonnet tiene cientos de miles de millones. Cada parámetro almacena un pedacito de conocimiento aprendido del texto de entrenamiento — una relación estadística entre palabras, conceptos, hechos y patrones lingüísticos.

Esta escala masiva de parámetros explica dos cosas importantes para los profesionales: primero, por qué el entrenamiento de modelos cuesta decenas de millones de dólares en GPUs (requiere enormes cantidades de cómputo). Segundo, por qué el fine-tuning (ajustar solo una fracción de los parámetros) es económicamente viable cuando el preentrenamiento completo no lo es. Entender la arquitectura básica de una red neuronal te permite tomar mejores decisiones sobre cuándo y cómo adaptar modelos existentes versus construir desde cero.`;

l1.contenido.verificacion.push(
  {
    pregunta: '¿Por qué se llama "deep learning" al aprendizaje profundo?',
    opciones: [
      'Porque procesa información a nivel profundo del disco duro',
      'Porque el aprendizaje es más profundo que el de los humanos',
      'Porque usa múltiples capas apiladas que aprenden representaciones progresivamente más abstractas',
      'Porque requiere datos muy detallados (profundos) para funcionar'
    ],
    correcta: 2,
    explicacion_profunda: 'El término "deep" en deep learning se refiere a la profundidad de la red: el número de capas apiladas. Cada capa aprende representaciones más abstractas que la anterior — bordes → formas → partes → objetos en visión, o tokens → palabras → frases → conceptos en lenguaje. Esta profundidad jerárquica es lo que permite a las redes neuronales aprender representaciones complejas que serían imposibles de programar manualmente.',
    concepto_reforzado: 'Significado de "profundidad" en deep learning y representaciones jerárquicas'
  },
  {
    pregunta: '¿Por qué el fine-tuning es económicamente viable cuando el entrenamiento completo de un LLM no lo es para la mayoría de las empresas?',
    opciones: [
      'Porque el fine-tuning usa menos datos',
      'Porque el fine-tuning ajusta solo una fracción de los parámetros, reduciendo drásticamente el cómputo necesario',
      'Porque el fine-tuning no requiere GPUs',
      'Porque el fine-tuning es un proceso más rápido en minutos'
    ],
    correcta: 1,
    explicacion_profunda: 'El preentrenamiento de un LLM como GPT-4 requiere miles de GPUs durante meses y cuesta decenas de millones de dólares. El fine-tuning, en cambio, ajusta solo una fracción pequeña de los parámetros (a veces con técnicas como LoRA que ajustan <1% de los parámetros) usando un dataset mucho más pequeño y específico. Esto reduce el cómputo en órdenes de magnitud. Por eso empresas medianas pueden hacer fine-tuning de modelos existentes como Claude o Llama sin tener presupuestos de investigación.',
    concepto_reforzado: 'Eficiencia del fine-tuning vs preentrenamiento completo'
  }
);

// ─── 3. EXPANDIR l2 ──────────────────────────────────────────────────────────

const l2 = b3.lecciones.find(l => l.id === 'm1-b3-l2');
l2.contenido.teoria.explicacion = `En 2017, investigadores de Google publicaron 'Attention is All You Need', el paper que introdujo la arquitectura Transformer. Esta arquitectura resolvió el problema fundamental de las RNNs (Redes Neuronales Recurrentes): no podían capturar dependencias entre palabras que estaban lejos entre sí en una oración, y debían procesar el texto secuencialmente — un token a la vez — lo que hacía imposible escalar el entrenamiento.

La innovación clave del Transformer es el mecanismo de atención (attention). La atención permite que cada token en una secuencia 'atienda' a todos los demás tokens simultáneamente y asigne pesos de importancia. Cuando el modelo procesa 'El banco donde trabajaba el hombre que vivía junto al río', el mecanismo de atención conecta correctamente 'banco' con 'trabajaba' (no con 'río'), resolviendo la ambigüedad semántica.

El Transformer usa multi-head attention: en lugar de un solo mecanismo de atención, usa múltiples cabezas en paralelo, cada una aprendiendo diferentes tipos de relaciones. Una cabeza puede capturar relaciones sintácticas (sujeto-verbo), otra relaciones semánticas (sinonimia), otra relaciones de referencia (pronombres). Esta paralelización es clave para la riqueza de las representaciones.

Otro elemento crucial es el procesamiento paralelo: los Transformers pueden procesar todos los tokens de la secuencia al mismo tiempo (a diferencia de las RNNs que van token a token). Esto permite entrenar con enormes cantidades de datos usando miles de GPUs en paralelo — algo imposible con arquitecturas secuenciales.

La arquitectura tiene dos componentes principales: encoder (comprende el input) y decoder (genera el output). BERT usa solo encoder — perfecto para tareas de comprensión como clasificación. GPT y Claude usan solo decoder — perfecto para generación de texto. Los Transformers son la base de TODOS los LLMs modernos: Claude, GPT, Gemini, Llama. Sin este paper de 2017, nada de lo que hoy llamamos IA generativa existiría.`;

l2.contenido.verificacion.push(
  {
    pregunta: '¿Qué problema específico de las RNNs resolvió la arquitectura Transformer?',
    opciones: [
      'Las RNNs no podían procesar texto, solo imágenes',
      'Las RNNs no podían capturar dependencias de largo rango y debían procesar tokens secuencialmente, imposibilitando el escalado',
      'Las RNNs requerían demasiada memoria RAM',
      'Las RNNs solo funcionaban en inglés'
    ],
    correcta: 1,
    explicacion_profunda: 'Las RNNs tenían dos problemas críticos: (1) Las dependencias de largo rango se perdían porque la información debía "viajar" a través de muchos pasos secuenciales, degradándose en el proceso (el problema del gradiente desvaneciente). (2) El procesamiento secuencial token-a-token imposibilitaba paralelizar el entrenamiento, haciendo impráctico escalar a corpus de billones de tokens. El Transformer resolvió ambos con atención (captura cualquier dependencia directamente) y procesamiento paralelo (todos los tokens a la vez).',
    concepto_reforzado: 'Ventajas del Transformer sobre RNNs: atención y paralelización'
  },
  {
    pregunta: '¿Qué es el multi-head attention y por qué aporta más valor que un único mecanismo de atención?',
    opciones: [
      'Es atención aplicada a múltiples documentos a la vez',
      'Son múltiples mecanismos de atención en paralelo, cada uno aprendiendo diferentes tipos de relaciones (sintácticas, semánticas, de referencia)',
      'Es atención aplicada múltiples veces al mismo token para mayor precisión',
      'Es un mecanismo para reducir el tiempo de inferencia'
    ],
    correcta: 1,
    explicacion_profunda: 'El multi-head attention usa H cabezas de atención en paralelo (H típicamente es 8, 12, 16 o más en modelos grandes). Cada cabeza aprende un subespacio de representación diferente: una puede especializarse en relaciones sintácticas (sujeto-verbo-objeto), otra en referencias anafóricas (pronombres y sus antecedentes), otra en relaciones semánticas. Los resultados de todas las cabezas se concatenan y proyectan, dando al modelo una representación mucho más rica que cualquier mecanismo único de atención.',
    concepto_reforzado: 'Multi-head attention: especialización y riqueza de representaciones'
  }
);

// ─── 4. RECAP l11 ────────────────────────────────────────────────────────────

const recapB3 = {
  id: 'm1-b3-l11',
  titulo: 'Recapitulación B3: Lo que pasa dentro de un LLM',
  bloque: 3,
  tipo: 'recapitulacion',
  duracion_min: 15,
  xp: 75,
  contenido: {
    teoria: {
      explicacion: `Completaste el bloque más técnico del módulo. Ahora tienes un mapa mental de lo que ocurre cuando escribes un mensaje a un LLM y recibes una respuesta.

El proceso comienza con tokenización: tu texto se divide en subpalabras usando algoritmos como BPE o WordPiece. Cada token se convierte en un vector (embedding). Esos vectores pasan por docenas de capas de atención — el mecanismo que relaciona cada token con todos los demás en la secuencia, capturando dependencias de cualquier distancia.

Esta arquitectura Transformer, introducida en 2017, reemplazó completamente las RNNs porque resuelve sus dos problemas fundamentales: puede capturar dependencias de largo rango directamente, y puede procesar todos los tokens en paralelo, permitiendo entrenar en corpus de billones de palabras.

El modelo base aprende prediciéndose a sí mismo durante el preentrenamiento. Luego el fine-tuning e instruction tuning lo convierten en un asistente útil. El RLHF alinea sus respuestas con valores y preferencias humanas usando retroalimentación de evaluadores.

Los parámetros de generación — temperatura, top-p, top-k — controlan cuánta aleatoriedad introduce el modelo al seleccionar el próximo token. La ventana de contexto define cuánto texto puede procesar de una vez. Y las alucinaciones no son bugs: son consecuencias inevitables de predecir texto estadísticamente cuando el modelo no tiene acceso a información correcta.

Con este bloque, pasaste de ver un LLM como una caja negra a entender su mecanismo interno con suficiente precisión para tomar mejores decisiones profesionales sobre cuándo confiar en él, cómo estructurar prompts, y cuándo el resultado requiere verificación.`,
      analogia: null,
      ejemplo_malo: null,
      ejemplo_bueno: null,
      por_que_importa: 'Entender los internos de un LLM es lo que distingue a un usuario avanzado de un profesional de IA. Este conocimiento informa cada decisión: desde cómo escribir prompts hasta cuándo verificar una respuesta.',
      tip_profesional: 'Experimenta con los parámetros de generación en la API de Anthropic: prueba temperatura 0 vs 1.0 para la misma pregunta. Observa cómo la temperatura baja produce respuestas deterministas y precisas, mientras la alta produce variedad pero menos precisión. Esta experiencia directa consolida los conceptos mejor que cualquier lectura.'
    },
    verificacion: [
      {
        pregunta: '¿Cuál es el orden correcto del pipeline de procesamiento cuando un LLM recibe un mensaje?',
        opciones: [
          'Embedding → Tokenización → Atención → Predicción de token',
          'Tokenización → Embedding → Atención → Predicción de token',
          'Atención → Tokenización → Embedding → Predicción de token',
          'Predicción → Tokenización → Embedding → Atención'
        ],
        correcta: 1,
        explicacion_profunda: 'El pipeline correcto es: (1) Tokenización — el texto se divide en subpalabras (tokens). (2) Embedding — cada token ID se convierte en un vector denso de alta dimensión. (3) Capas de atención — los vectores pasan por múltiples capas de self-attention que relacionan tokens entre sí y construyen representaciones contextuales. (4) Predicción — una capa lineal final y softmax convierten la representación final en una distribución de probabilidad sobre el vocabulario, de la que se muestrea el siguiente token.',
        concepto_reforzado: 'Pipeline completo de procesamiento en un LLM'
      },
      {
        pregunta: '¿Por qué las alucinaciones en los LLMs son inevitable (aunque mitigables) y no simplemente un bug a corregir?',
        opciones: [
          'Porque los modelos tienen poca memoria y olvidan información',
          'Porque los LLMs predicen texto estadísticamente y no tienen acceso a hechos verificados en tiempo real',
          'Porque el fine-tuning introduce errores en el modelo base',
          'Porque la temperatura siempre es mayor que cero'
        ],
        correcta: 1,
        explicacion_profunda: 'Los LLMs generan texto token a token basándose en distribuciones de probabilidad aprendidas durante el entrenamiento. No consultan una base de datos de hechos verificados — generan texto que "suena probable" dado el contexto. Cuando el modelo no tiene información correcta sobre algo específico (datos recientes, números precisos, hechos oscuros), genera el texto más plausible estadísticamente, que puede ser incorrecto. Esto no es un bug: es cómo funciona la predicción probabilística. Se mitiga con RAG, citas de fuentes y temperatura baja.',
        concepto_reforzado: 'Naturaleza probabilística de los LLMs como causa de alucinaciones'
      },
      {
        pregunta: '¿Cuál es la diferencia fundamental entre preentrenamiento y fine-tuning en términos de objetivo y escala?',
        opciones: [
          'El preentrenamiento usa más datos pero menos épocas',
          'Preentrenamiento aprende predicción de texto en billones de tokens sin instrucciones; fine-tuning adapta el modelo a tareas específicas con miles a millones de ejemplos',
          'El fine-tuning siempre produce mejores modelos que el preentrenamiento',
          'No hay diferencia significativa, son el mismo proceso con distintos nombres'
        ],
        correcta: 1,
        explicacion_profunda: 'El preentrenamiento es el aprendizaje autosupervisado masivo: el modelo aprende a predecir el siguiente token en billones de palabras de texto de Internet, libros y código. No necesita etiquetas humanas — el texto mismo es la supervisión. Aprende gramática, hechos, razonamiento y mucho más implícitamente. El fine-tuning toma ese modelo base y lo adapta con ejemplos etiquetados específicos (pares instrucción-respuesta, ejemplos de la tarea objetivo). Usa órdenes de magnitud menos datos y cómputo, pero el modelo base preentrenado es esencial para que funcione.',
        concepto_reforzado: 'Distinción entre preentrenamiento (escala, autosupervisado) y fine-tuning (especialización, supervisado)'
      }
    ],
    practica: {
      tipo: 'caso_real',
      contexto: 'Eres consultor de IA. Un cliente (CEO de una empresa de servicios legales) te pregunta: "He escuchado que los LLMs pueden alucinan. ¿Cómo puedo confiar en Claude para revisar contratos si puede inventarse cláusulas que no existen?"',
      instruccion: 'Explica al CEO, en términos no técnicos pero precisos, por qué ocurren las alucinaciones, cuándo son más probables, y qué mecanismos técnicos puedes usar para mitigarlas en su caso de uso específico (revisión de contratos).',
      input_malo: 'Los LLMs a veces se equivocan. Deberías verificar todo lo que digan para estar seguro.',
      pista: 'Piensa en: (1) qué causa las alucinaciones técnicamente, (2) en qué tipos de tareas son más vs menos probables, (3) qué técnicas específicas (RAG, temperatura, citas de fuentes) aplican a revisión de contratos.',
      solucion: 'Las alucinaciones ocurren cuando el modelo genera texto estadísticamente plausible en ausencia de información verificada. Para revisión de contratos existen tres mitigaciones clave: (1) RAG — darle el contrato completo como contexto para que "cite" cláusulas reales en lugar de generarlas, (2) Temperatura baja (0-0.1) para respuestas deterministas y conservadoras, (3) Pedir al modelo que cite el texto exacto del contrato para cada afirmación. Las alucinaciones son más probables en preguntas de conocimiento específico (fechas, números exactos) y menos probables en análisis de texto proporcionado. Con las técnicas correctas, Claude es confiable para identificar cláusulas y señalar riesgos — siempre con revisión final humana para decisiones legales.',
      criterios_de_exito: [
        'Explicas la causa técnica sin usar jerga incomprensible para un CEO',
        'Identificas cuándo son más/menos probables las alucinaciones',
        'Mencionas al menos 2 técnicas de mitigación aplicables al caso',
        'Mantienes expectativas realistas: verificación humana final siempre'
      ]
    },
    conexion: {
      siguiente_concepto: 'Tipos de modelos de IA',
      por_que_importa_despues: 'El Bloque 4 mapea todo el ecosistema de modelos disponibles en 2026. Con el conocimiento técnico del B3, podrás entender con precisión las diferencias entre modelos de lenguaje, imagen, audio, video, código y razonamiento — y elegir el correcto para cada tarea.'
    }
  }
};

// ─── 5. INSERTAR EN EL BLOQUE ────────────────────────────────────────────────

b3.lecciones.unshift(bienvenidaB3);
b3.lecciones.push(recapB3);

// ─── 6. GUARDAR ──────────────────────────────────────────────────────────────

fs.writeFileSync('src/content/m1/index.json', JSON.stringify(data, null, 2));
console.log('✓ B3 completado: bienvenida + l1 expandida + l2 expandida + recap');
console.log('  Total lecciones B3:', b3.lecciones.length);
