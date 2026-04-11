const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b0 = data.bloques.find(b => b.id === 'm1-b0');
const b1 = data.bloques.find(b => b.id === 'm1-b1');

// ═══════════════════════════════════════════════════════════════════════════
// B0 — BIENVENIDA (m1-b0-l0)
// ═══════════════════════════════════════════════════════════════════════════
const b0_bienvenida = {
  id: "m1-b0-l0",
  titulo: "Bienvenida al Bloque 0: El momento histórico",
  bloque: 0,
  tipo: "bienvenida",
  duracion_min: 5,
  xp: 20,
  contenido: {
    teoria: {
      explicacion: [
        "Esto no es un curso sobre tecnología futura. Es sobre la tecnología que ya está transformando industrias hoy, en este momento, mientras lees esto.",
        "En este bloque vas a entender por qué 2026 es un punto de inflexión real y no otro ciclo de hype. Vas a recorrer la línea de tiempo desde los primeros experimentos de los años 50 hasta los modelos que usas hoy, incluyendo los dos inviernos de IA que casi mataron el campo y las tres convergencias técnicas que lo resucitaron: transformers, computación masiva en la nube y datos digitales a escala sin precedentes.",
        "También vas a poner números reales al impacto económico, entender dónde están las oportunidades concretas para profesionales en el mercado europeo y global, y aprender el método que diferencia a quienes realmente dominan IA de los que siguen consumiendo tutoriales sin avanzar.",
        "Para trabajar en IA en Europa en 2026 necesitas este contexto: los reguladores, inversores y clientes toman decisiones basadas en esta narrativa histórica. Quien entiende de dónde viene el campo sabe hacia dónde va.",
        "Nada de esto es teoría vacía. Todo tiene aplicación directa en el trabajo que vas a hacer. Empieza cuando estés listo."
      ].join("\n\n"),
      analogia: null,
      ejemplo_malo: null,
      ejemplo_bueno: null,
      por_que_importa: "Entrar a un campo sin contexto histórico es como llegar tarde a una reunión sin saber qué se ha decidido antes. Este bloque te pone al día en 90 minutos sobre 70 años de historia.",
      tip_profesional: null
    },
    verificacion: [],
    practica: {
      tipo: "reflexion",
      contexto: "Antes de empezar el bloque, tómate 3 minutos para reflexionar sobre tu punto de partida.",
      instruccion: "¿Qué esperas que cambie en tu trabajo o carrera gracias a dominar IA? Sé específico: menciona una tarea concreta que haces hoy que podría transformarse.",
      input_malo: null,
      pista: "No respondas con generalidades como 'ser más eficiente'. Piensa en una tarea real: 'paso 3 horas a la semana escribiendo informes de análisis' o 'el 60% de mi tiempo es contestar emails repetitivos'.",
      solucion: "No hay respuesta incorrecta aquí. El objetivo es activar tu intención de aprendizaje específica antes de empezar. Las personas que aprueban cursos de IA son las que conectan el contenido con un problema real que tienen.",
      criterios_de_exito: [
        "Identificas una tarea concreta, no un objetivo genérico",
        "Puedes medir el impacto (horas, dinero, volumen de trabajo)",
        "La tarea es realista en los próximos 6-12 meses"
      ]
    },
    conexion: {
      siguiente_concepto: "El momento histórico: por qué 2026 es diferente",
      por_que_importa_despues: "Arrancar con los datos duros sobre por qué este momento es único te da los argumentos que necesitas cuando alguien te pregunte por qué invertir tiempo en aprender IA ahora."
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// B0 — RECAPITULACIÓN (m1-b0-l9)
// ═══════════════════════════════════════════════════════════════════════════
const b0_recap = {
  id: "m1-b0-l9",
  titulo: "Recapitulación B0: El contexto que necesitabas",
  bloque: 0,
  tipo: "recapitulacion",
  duracion_min: 10,
  xp: 40,
  contenido: {
    teoria: {
      explicacion: [
        "Has completado el Bloque 0. Antes de avanzar, consolida los cinco conceptos que definen este bloque.",
        "Primero: 2026 es un punto de inflexión real porque tres fuerzas convergieron simultáneamente — la arquitectura transformer (2017), la computación en la nube a escala masiva y los datos digitales acumulados durante décadas. No es un ciclo de hype más: es una confluencia técnica que no se había dado antes.",
        "Segundo: los dos inviernos de IA (años 70 y 90) ocurrieron porque las promesas superaron la infraestructura disponible. Lo que cambió no es la ambición sino la base técnica sobre la que se construye.",
        "Tercero: el impacto económico ya es medible. McKinsey estima entre 2,6 y 4,4 billones de dólares anuales en valor añadido. No es una proyección futura: empresas reales en Europa y el mundo ya reportan estos resultados.",
        "Cuarto: aprender IA requiere práctica deliberada sobre problemas reales, no consumo pasivo de contenido. La curva de aprendizaje no es larga si aplicas desde el primer día.",
        "En el Bloque 1 vas a construir el mapa conceptual preciso del campo: qué es IA, qué es ML, qué es Deep Learning, cómo se relacionan y por qué esas distinciones determinan cada decisión técnica que tomarás. Sin ese mapa, todo lo demás es confuso."
      ].join("\n\n"),
      analogia: null,
      ejemplo_malo: null,
      ejemplo_bueno: null,
      por_que_importa: "Los conceptos de B0 no son introductorios en el mal sentido: son el marco que usarás para argumentar inversiones en IA, evaluar proyectos y entender regulación. Vuelve a ellos cuando necesites justificar decisiones ante stakeholders no técnicos.",
      tip_profesional: "Guarda los datos económicos de B0 (crecimiento del mercado, reducción de costos de API, adopción por industria). En reuniones con CEOs y directores, esos números son más persuasivos que cualquier demo técnica."
    },
    verificacion: [
      {
        pregunta: "Según lo aprendido en B0, ¿cuál es la diferencia fundamental entre el hype de IA de los años 80 y el crecimiento de 2020-2026?",
        opciones: [
          "En los 80 las IAs eran menos inteligentes que las actuales",
          "En los 80 no había internet para distribuir los modelos",
          "En 2020-2026 convergieron tres factores reales: arquitectura transformer, computación masiva en la nube y datos digitales a escala; en los 80 solo había ambición sin infraestructura",
          "La diferencia es solo de marketing y comunicación, técnicamente es similar"
        ],
        correcta: 2,
        explicacion_profunda: "Los inviernos de IA no ocurrieron por falta de ideas sino por falta de los tres pilares que los hacen viables: algoritmos eficientes, poder de cómputo asequible y datos suficientes. En los años 80, los sistemas expertos prometían razonamiento general pero dependían de reglas codificadas a mano que no escalaban. En los 90, las redes neuronales existían pero entrenarse con los datos y hardware disponibles era imposible en tiempos útiles. La convergencia de 2017-2020 fue cualitativa, no solo cuantitativa: los transformers demostraron que la escala masiva produce capacidades emergentes, AWS/GCP/Azure hicieron la GPU accesible por horas, e internet acumuló trillones de documentos digitales. Esta distinción es crucial para argumentar ante directivos escépticos que comparan 2026 con el hype anterior.",
        concepto_reforzado: "Diferencia estructural entre ciclos de hype anteriores y el momento actual"
      },
      {
        pregunta: "Una directora de operaciones en una empresa industrial alemana te dice: 'Ya intentamos implementar IA en 2019 y fue un fracaso. ¿Por qué sería diferente ahora?' ¿Cuál es el argumento más sólido?",
        opciones: [
          "Ahora la IA es más inteligente y no comete los mismos errores",
          "El costo de las APIs de IA cayó más del 90% desde 2020, los modelos Foundation ya están preentrenados y el time-to-value pasó de meses a días",
          "En 2019 las empresas no tenían suficientes datos; ahora sí los tienen",
          "Los equipos de IA son más experimentados y cometen menos errores de implementación"
        ],
        correcta: 1,
        explicacion_profunda: "El fracaso de 2019 fue probablemente un proyecto de ML a medida que requirió meses de ingeniería de datos, entrenamiento de modelos específicos y mantenimiento continuo — todo a costos elevados y con resultados frágiles. El cambio estructural desde 2020 tiene tres componentes mensurables. Primero, el costo de llamadas a la API de Claude o GPT-4 cayó más del 90% en términos de capacidad por dólar desde GPT-3 en 2020. Segundo, los Foundation Models eliminaron la necesidad de entrenar modelos desde cero para la mayoría de casos de uso: el time-to-value bajó de seis meses a días. Tercero, la madurez del ecosistema de herramientas (LangChain, vectorstores, orquestadores) reduce drásticamente la complejidad de implementación. En Alemania, empresas como Siemens, Bosch y BMW ya tienen proyectos de IA en producción con ROI documentado, lo que elimina la incertidumbre que existía en 2019.",
        concepto_reforzado: "Argumentar el cambio real desde 2020 con datos concretos"
      },
      {
        pregunta: "¿Cuál de estos enfoques describe mejor el método de aprendizaje efectivo de IA presentado en B0?",
        opciones: [
          "Ver todos los videos del módulo antes de practicar para tener la teoría completa",
          "Aplicar cada concepto a un problema real propio desde el primer día, iterando entre teoría y práctica",
          "Memorizar los conceptos clave y luego buscar proyectos donde aplicarlos",
          "Completar primero todos los módulos teóricos del curso para tener la base completa"
        ],
        correcta: 1,
        explicacion_profunda: "El aprendizaje efectivo de IA requiere práctica deliberada desde el inicio, no acumulación teórica previa. La razón es neurológica y práctica: los conceptos de IA son abstractos hasta que los anclas a problemas concretos que conoces. Leer sobre embeddings es confuso hasta que ves cómo tu propia búsqueda semántica funciona diferente a una búsqueda por palabras clave. La metodología respaldada por evidencia en aprendizaje técnico (spacing effect, retrieval practice, interleaving) apunta consistentemente a la misma dirección: alterna teoría con aplicación en ciclos cortos de uno a tres días. En el contexto europeo del mercado laboral de IA, los empleadores valoran demostrablemente proyectos en portfolio sobre certificaciones teóricas. El AI Engineer de 2026 demuestra lo que sabe con trabajo real, no con títulos.",
        concepto_reforzado: "Método de aprendizaje efectivo: práctica deliberada desde el primer día"
      }
    ],
    practica: {
      tipo: "caso_real",
      contexto: "Eres consultora de transformación digital para una cadena de retail con 200 tiendas en España y Portugal. El CEO quiere 'hacer algo con IA' pero no tiene claro qué. Acabas de completar el Bloque 0.",
      instruccion: "Usando los conceptos de B0 (contexto histórico, impacto económico, método de adopción), diseña un argumento de 3 puntos para la reunión de kick-off que responda: ¿Por qué ahora? ¿Qué tipo de impacto es realista en 12 meses? ¿Cómo evitar repetir fracasos de proyectos anteriores?",
      input_malo: "La IA es el futuro y todas las empresas la están adoptando. Si no lo hacen ahora van a quedarse atrás. Pueden usar ChatGPT para muchas cosas.",
      pista: "Ancla cada punto en datos concretos de B0. Para 'por qué ahora': costo de APIs, Foundation Models disponibles. Para 'impacto realista': elige un caso de uso específico de retail (atención al cliente, descripción de productos, análisis de inventario). Para 'evitar fracasos': el contraste entre proyectos ML a medida de 2019 vs Foundation Models hoy.",
      solucion: "1) POR QUÉ AHORA: Los Foundation Models redujeron el time-to-value de 6 meses a días y el costo de la IA API cayó 90% desde 2020. Un proyecto que en 2019 costaba 400.000€ y 8 meses hoy puede validarse en 2 semanas por menos de 5.000€. 2) IMPACTO REALISTA EN 12 MESES: Automatización de descripciones de producto (200 tiendas × 500 SKUs = 100.000 descripciones a €0.001 cada una = 100€ en lugar de 50.000€ en redacción). Chatbot de atención al cliente que resuelve el 60% de consultas sin agente humano, documentado en retailers europeos similares. 3) EVITAR FRACASOS ANTERIORES: No entrenar modelo propio. Usar un Foundation Model vía API con fine-tuning mínimo. Piloto en 2 tiendas antes de escalar.",
      criterios_de_exito: [
        "Cada punto usa datos numéricos de B0, no afirmaciones genéricas",
        "El caso de uso elegido es específico y medible, no 'usar IA en general'",
        "La propuesta distingue entre proyectos ML a medida (alto riesgo) y Foundation Models (bajo riesgo)"
      ]
    },
    conexion: {
      siguiente_concepto: "Mapa conceptual completo de IA: jerarquía IA, ML, DL, LLMs",
      por_que_importa_despues: "Ahora que tienes el contexto histórico y económico, necesitas el vocabulario técnico preciso. Sin entender qué es exactamente ML vs DL vs IA generativa, no puedes elegir la herramienta correcta para cada problema ni comunicarte con precisión con equipos técnicos."
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// B1 — BIENVENIDA (m1-b1-l0)
// ═══════════════════════════════════════════════════════════════════════════
const b1_bienvenida = {
  id: "m1-b1-l0",
  titulo: "Bienvenida al Bloque 1: El mapa conceptual de la IA",
  bloque: 1,
  tipo: "bienvenida",
  duracion_min: 5,
  xp: 20,
  contenido: {
    teoria: {
      explicacion: [
        "El campo de la IA tiene un problema de vocabulario grave. Todo el mundo usa 'IA', 'machine learning', 'deep learning' y 'LLM' de forma intercambiable, incluso profesionales con años de experiencia. Esa imprecisión tiene consecuencias directas: lleva a decisiones técnicas equivocadas, expectativas irreales y presupuestos desperdiciados.",
        "En este bloque vas a construir el mapa mental preciso que necesitas para trabajar en IA. Vas a entender la jerarquía real entre IA, ML, DL y LLMs — por qué son capas concéntricas con requisitos de datos y costos radicalmente distintos. Vas a dominar la diferencia entre IA generativa y discriminativa, cuándo usar cada una y cuándo confundirlas es un error costoso.",
        "También vas a entender qué son los Foundation Models y por qué cambiaron el modelo económico de toda la industria; los tres paradigmas de aprendizaje y cuándo aplica cada uno; y dónde estamos en la frontera actual con agentes autónomos y sistemas multimodales.",
        "Para trabajar en IA en Europa esto no es opcional. El EU AI Act categoriza sistemas usando exactamente estas distinciones: un modelo generativo de propósito general tiene obligaciones regulatorias diferentes a un sistema de clasificación supervisado. Los clientes, inversores y reguladores usan este vocabulario. No manejarlo con precisión te cuesta credibilidad desde la primera conversación."
      ].join("\n\n"),
      analogia: null,
      ejemplo_malo: null,
      ejemplo_bueno: null,
      por_que_importa: "Este bloque es el vocabulario común de toda la profesión. Sin él, las conversaciones técnicas y de negocio sobre IA son confusas. Con él, puedes entrar a cualquier sala — con ingenieros, directivos o reguladores — y comunicarte con precisión.",
      tip_profesional: null
    },
    verificacion: [],
    practica: {
      tipo: "reflexion",
      contexto: "Antes de empezar el bloque, activa lo que ya sabes sobre las categorías de IA.",
      instruccion: "Sin buscar ninguna definición: ¿cuál es la diferencia entre Machine Learning e Inteligencia Artificial? Escribe tu respuesta actual en 2-3 frases. Al terminar el bloque, compárala con lo que habrás aprendido.",
      input_malo: null,
      pista: "No hay respuesta correcta ahora mismo. El objetivo es registrar tu punto de partida para que puedas medir tu progreso real al completar el bloque.",
      solucion: "Al terminar B1 deberías poder responder: ML es un subconjunto de IA donde el sistema aprende patrones desde datos en lugar de seguir reglas programadas. IA es el campo más amplio que incluye ML, sistemas expertos, planificación y más. La confusión entre ambos lleva a expectativas incorrectas sobre qué tipo de datos y costos requiere cada enfoque.",
      criterios_de_exito: [
        "Escribiste una respuesta, aunque sea incorrecta o incompleta",
        "Identificaste al menos una distinción, aunque no estés seguro de ella",
        "Guardaste tu respuesta para compararla al terminar el bloque"
      ]
    },
    conexion: {
      siguiente_concepto: "IA vs ML vs DL: la jerarquía real",
      por_que_importa_despues: "La primera lección del bloque resuelve la confusión más común del campo con la precisión que necesitas para tomar decisiones técnicas correctas."
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// B1 — RECAPITULACIÓN (m1-b1-l11)
// ═══════════════════════════════════════════════════════════════════════════
const b1_recap = {
  id: "m1-b1-l11",
  titulo: "Recapitulación B1: El mapa que usarás siempre",
  bloque: 1,
  tipo: "recapitulacion",
  duracion_min: 10,
  xp: 40,
  contenido: {
    teoria: {
      explicacion: [
        "Has completado el mapa conceptual completo de la IA. Estos son los cinco conceptos que debes tener sólidos antes de avanzar.",
        "Primero: la jerarquía IA⊃ML⊃DL⊃LLMs no es académica — determina directamente qué datos necesitas, cuántos y cuánto cuesta. ML clásico: desde 1.000 ejemplos. Deep Learning: 100.000+. LLMs: consumes un modelo preentrenado en trillones de tokens vía API.",
        "Segundo: generativa vs discriminativa es la primera decisión de diseño de cualquier sistema de IA. La discriminativa clasifica con determinismo auditable. La generativa crea con flexibilidad pero variabilidad. Elegir mal tiene consecuencias técnicas y regulatorias bajo el EU AI Act.",
        "Tercero: los tres paradigmas de aprendizaje — supervisado, no supervisado, refuerzo — definen qué tipo de señal de entrenamiento necesitas. El 70% de los casos empresariales son supervisados porque tienes datos históricos etiquetados.",
        "Cuarto: los Foundation Models cambiaron el modelo económico. Un único modelo preentrenado adaptable a miles de tareas hizo que el costo marginal de adoptar IA para una nueva tarea sea casi cero.",
        "Quinto: los agentes autónomos y la multimodalidad son la frontera actual — sistemas que planifican, usan herramientas y procesan texto, imagen, audio y código en un flujo integrado.",
        "En el Bloque 2 vas a entender CÓMO funcionan estos sistemas por dentro. Los vectores, matrices, embeddings y gradiente descendente son el lenguaje matemático que hace posible todo lo que acabas de aprender conceptualmente. No te alarmes: no necesitas ser matemático — necesitas la intuición correcta."
      ].join("\n\n"),
      analogia: null,
      ejemplo_malo: null,
      ejemplo_bueno: null,
      por_que_importa: "El mapa de B1 es la base sobre la que se construye todo M1. Cada bloque siguiente añade profundidad a alguno de estos cinco conceptos. Vuelve a este recap cuando pierdas el hilo de dónde encaja lo que estás aprendiendo.",
      tip_profesional: "Cuando leas noticias de IA, entrena el reflejo de categorizar: ¿es generativo o discriminativo? ¿Supervisado o no supervisado? ¿Foundation Model o modelo específico? En tres semanas de práctica, ese análisis será automático."
    },
    verificacion: [
      {
        pregunta: "Un equipo de producto en Amsterdam necesita construir un sistema que detecte si una reseña de cliente es positiva, negativa o neutral. Tienen 50.000 reseñas ya etiquetadas. ¿Cuál es la arquitectura mínima viable?",
        opciones: [
          "Un LLM generativo vía API porque puede entender texto complejo",
          "Un modelo de ML supervisado de clasificación de texto entrenado con las 50.000 reseñas etiquetadas",
          "Un sistema de aprendizaje no supervisado para descubrir los clusters de sentimiento",
          "Deep Learning con transformers entrenado desde cero con las reseñas"
        ],
        correcta: 1,
        explicacion_profunda: "Este es un problema de clasificación supervisada con datos etiquetados disponibles — el caso de uso ideal para ML supervisado clásico. Con 50.000 ejemplos etiquetados, un clasificador de texto (desde Naive Bayes hasta fine-tuning de un modelo BERT pequeño) produce resultados predecibles, medibles y auditables. Usar un LLM generativo vía API es técnicamente posible pero innecesariamente costoso, no determinista (puede variar su clasificación entre llamadas) y más difícil de auditar bajo GDPR. El aprendizaje no supervisado no aplica porque ya tienes las etiquetas. Entrenar Deep Learning desde cero con 50.000 ejemplos es insuficiente para ese nivel de complejidad. Esta decisión de arquitectura es exactamente el tipo de razonamiento que distingue a un AI Engineer de alguien que solo sabe usar ChatGPT.",
        concepto_reforzado: "Selección de paradigma y técnica según el tipo de datos y requisitos del sistema"
      },
      {
        pregunta: "El EU AI Act clasifica un sistema de IA para selección de candidatos en RR.HH. como 'alto riesgo'. ¿Qué concepto de B1 explica directamente por qué tiene esa categoría?",
        opciones: [
          "Que es un Foundation Model de uso general con capacidades emergentes no controladas",
          "Que toma decisiones discriminativas automatizadas sobre personas en un dominio sensible, con riesgo de sesgo en datos de entrenamiento supervisado",
          "Que usa aprendizaje por refuerzo que puede optimizar métricas incorrectas",
          "Que es multimodal y procesa CVs tanto en texto como en imagen"
        ],
        correcta: 1,
        explicacion_profunda: "Los sistemas de selección de candidatos son típicamente sistemas de clasificación discriminativa supervisada: toman el perfil de un candidato y lo clasifican como 'apto' o 'no apto' basándose en patrones aprendidos de datos históricos de contratación. El riesgo de alto impacto viene de dos fuentes directamente conectadas con los conceptos de B1. Primera, el sesgo de representación: si los datos históricos de contratación de la empresa reflejan discriminación pasada (menos mujeres contratadas en roles técnicos, menos candidatos de ciertos orígenes), el modelo aprende esos patrones y los perpetúa. Segunda, la automatización de decisiones sobre personas bajo GDPR Artículo 22 requiere explicabilidad y posibilidad de recurso humano. El EU AI Act en su Artículo 10 exige explícitamente evaluaciones de calidad de datos y tests de equidad para sistemas de alto riesgo como este, antes de su comercialización en la UE.",
        concepto_reforzado: "Conexión entre paradigmas de aprendizaje, sesgo y regulación EU AI Act"
      },
      {
        pregunta: "Mistral AI (Francia) puede competir con OpenAI a nivel global habiendo sido fundada en 2023. ¿Qué concepto de B1 explica mejor que esto sea posible?",
        opciones: [
          "Que Francia tiene más ingenieros de IA que Estados Unidos",
          "Los Foundation Models son open-source y cualquier empresa puede copiarlos gratuitamente",
          "Los Foundation Models democratizaron el acceso: el conocimiento técnico para construirlos es público (papers de Google, Meta) y la infraestructura de cómputo es alquilable en la nube, eliminando la ventaja exclusiva del capital inicial",
          "Que los modelos europeos son inherentemente superiores por las restricciones del EU AI Act"
        ],
        correcta: 2,
        explicacion_profunda: "La emergencia de Mistral AI es la demostración más clara del efecto democratizador de los Foundation Models que vimos en B1. Tres factores convergieron para hacer posible que un equipo de 30 ingenieros en París compita con Microsoft y Google. Primero, el conocimiento técnico para construir transformers de alto rendimiento es completamente público: los papers fundacionales de Google Brain (Attention is All You Need, 2017), las técnicas de optimización de Meta (LLaMA), y los métodos de alineación de Anthropic están publicados. Segundo, la infraestructura de entrenamiento masivo es alquilable por horas en AWS, GCP o Azure, eliminando la necesidad de construir un datacenter propio. Tercero, los equipos pequeños con los skills correctos pueden moverse más rápido que organizaciones grandes. Mistral levantó 385 millones de euros en 18 meses precisamente porque los inversores europeos entienden que el moat de OpenAI no es insuperable — el conocimiento técnico ya no es el factor limitante.",
        concepto_reforzado: "Impacto democratizador de los Foundation Models en el ecosistema global"
      }
    ],
    practica: {
      tipo: "caso_real",
      contexto: "Eres AI Engineer junior en una consultora tecnológica de Madrid. Un cliente del sector financiero te presenta tres proyectos simultáneos y pide que recomiendes la arquitectura de IA más adecuada para cada uno antes de la reunión de mañana.",
      instruccion: "Usando el mapa conceptual de B1, clasifica cada proyecto con: (a) tipo de IA apropiada, (b) paradigma de aprendizaje, (c) por qué NO usar la alternativa más obvia. Proyectos: 1) Detectar transacciones fraudulentas en tiempo real usando 200.000 transacciones históricas etiquetadas. 2) Generar borradores de informes de riesgo personalizados para cada cliente. 3) Descubrir patrones inusuales en el comportamiento de 500.000 clientes sin etiquetas previas.",
      input_malo: "Para los tres proyectos usaría ChatGPT porque puede hacer cualquier cosa con texto y datos. Es el modelo más potente disponible.",
      pista: "Proyecto 1: tienes etiquetas → ¿qué paradigma? ¿Necesitas que genere texto o que clasifique? Proyecto 2: necesitas crear contenido nuevo → ¿discriminativa o generativa? Proyecto 3: no tienes etiquetas → ¿qué paradigma es el único viable?",
      solucion: "PROYECTO 1 — FRAUDE: ML supervisado de clasificación (gradient boosting o red neuronal pequeña). Paradigma supervisado con 200.000 ejemplos etiquetados. NO un LLM generativo porque: las decisiones deben ser deterministas y auditables bajo regulación bancaria del BCE, la latencia de un LLM (1-3 segundos) es inaceptable para detección en tiempo real, y el costo por transacción sería 100x mayor. PROYECTO 2 — INFORMES: IA generativa con LLM vía API (Claude o GPT-4). Paradigma: Foundation Model con prompt engineering o fine-tuning leve. NO ML supervisado porque: no clasifica, crea texto original personalizado; requiere comprensión del lenguaje financiero y capacidad de síntesis. PROYECTO 3 — PATRONES: ML no supervisado (clustering con K-means o DBSCAN, o autoencoders). Paradigma no supervisado porque no hay etiquetas. NO supervisado porque no tienes qué supervisar. NO LLM porque no procesa directamente 500.000 filas de datos tabulares eficientemente.",
      criterios_de_exito: [
        "Cada proyecto tiene una justificación técnica específica, no genérica",
        "Identificas correctamente por qué el LLM generativo no es la respuesta universal",
        "Mencionas al menos una restricción regulatoria o de negocio que justifica la elección"
      ]
    },
    conexion: {
      siguiente_concepto: "Matemáticas para IA: vectores, matrices y la base de todo",
      por_que_importa_despues: "Ahora sabes QUÉ son estos sistemas. En B2 vas a entender CÓMO funcionan por dentro. Los vectores y matrices no son abstractos: son literalmente cómo los modelos representan palabras, imágenes y conceptos en memoria. Sin esa intuición, el Bloque 3 sobre redes neuronales no tendrá sentido."
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// Insertar lecciones en el JSON
// ═══════════════════════════════════════════════════════════════════════════

// B0: insertar bienvenida al inicio, recap al final
b0.lecciones.unshift(b0_bienvenida);
b0.lecciones.push(b0_recap);

// B1: insertar bienvenida al inicio, recap al final
b1.lecciones.unshift(b1_bienvenida);
b1.lecciones.push(b1_recap);

// ═══════════════════════════════════════════════════════════════════════════
// QA
// ═══════════════════════════════════════════════════════════════════════════
let allOk = true;
const checks = [
  { l: b0_bienvenida, tipo: 'bienvenida',     minW: 150, maxW: 250, q: 0 },
  { l: b0_recap,      tipo: 'recapitulacion', minW: 200, maxW: 300, q: 3 },
  { l: b1_bienvenida, tipo: 'bienvenida',     minW: 150, maxW: 250, q: 0 },
  { l: b1_recap,      tipo: 'recapitulacion', minW: 200, maxW: 300, q: 3 },
];

for (const c of checks) {
  const w = c.l.contenido.teoria.explicacion.split(/\s+/).filter(Boolean).length;
  const q = c.l.contenido.verificacion.length;
  const ok = w >= c.minW && q === c.q && c.l.tipo === c.tipo;
  if (!ok) allOk = false;
  console.log(`${c.l.id}  tipo=${c.l.tipo}  ${w}w  ${q}q  ${ok ? 'OK' : 'FALLO'}`);
}

if (allOk) {
  fs.writeFileSync('src/content/m1/index.json', JSON.stringify(data, null, 2));
  console.log('\nArchivo guardado.');
} else {
  console.log('\nERROR: alguna lección no cumple requisitos. No se guardó.');
  process.exit(1);
}
