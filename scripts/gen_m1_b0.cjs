const fs = require('fs'), path = require('path')
const file = path.join(__dirname, '../src/content/m1/index.json')
const data = JSON.parse(fs.readFileSync(file, 'utf8'))
const b0 = data.bloques[0]

const l7 = {
  id: "m1-b0-l7", titulo: "Mitos y realidades sobre la IA en 2026", bloque: 0,
  tipo: "leccion", duracion_min: 20, xp: 50,
  contenido: {
    teoria: {
      explicacion: `En 2026 conviven dos narrativas sobre la inteligencia artificial igualmente dañinas: el pánico catastrófico y el entusiasmo acrítico. Ninguna te ayuda a tomar decisiones profesionales correctas. Lo que necesitas es un mapa de la realidad basado en evidencia. Empecemos por los mitos más peligrosos.

Mito 1: "La IA va a reemplazar todos los empleos en 5 años." Realidad: La IA automatiza tareas específicas, no roles completos. Un abogado que hace revisión de contratos verá automatizado el 70% de esa tarea específica, pero el juicio, la negociación y la estrategia legal siguen siendo humanas. McKinsey (2024) estima que el 60% de los empleos tienen al menos 30% de tareas automatizables — pero eso no significa que esos empleos desaparecerán, sino que se transformarán.

Mito 2: "La IA entiende lo que dice." Realidad: Los LLMs no comprenden, predicen. Generan texto estadísticamente coherente basado en patrones aprendidos. La diferencia importa: un LLM puede darte una respuesta médica convincente que sea completamente incorrecta porque "suena" correcta dado el contexto. Siempre verifica afirmaciones críticas con fuentes primarias.

Mito 3: "ChatGPT y Claude son lo mismo." Realidad: Hay diferencias técnicas y filosóficas fundamentales. Claude fue entrenado con Constitutional AI (proceso de alineación diferente a RLHF estándar), tiene ventana de contexto más grande, y está diseñado específicamente para tareas de trabajo del conocimiento prolongado. GPT-4o tiene integraciones nativas con más herramientas. Gemini tiene ventajas en contexto largo y Google Search. Elegir el modelo correcto para cada tarea puede hacer una diferencia del 40% en calidad de resultados.

Mito 4: "Necesitas saber programar para usar IA productivamente." Realidad: Para el 80% de los casos de uso profesionales, programar no es necesario. Las APIs de Claude, ChatGPT y Gemini están diseñadas para ser usadas a través de interfaces no-código. Lo que sí necesitas es saber diseñar prompts efectivos, entender las capacidades y limitaciones de cada modelo, y saber cuándo el output necesita verificación humana.

Mito 5: "La IA siempre mejora con el tiempo sin supervisión." Realidad: Los modelos son estáticos después del entrenamiento. Claude Sonnet 4.5 tiene un corte de conocimiento de agosto 2025 y no aprende de tus conversaciones. Las mejoras vienen de nuevas versiones de modelos, no de uso continuado.

Mito 6: "La IA es objetiva porque es matemática." Realidad: Los modelos heredan los sesgos de sus datos de entrenamiento. Si los datos históricos muestran que ciertos grupos acceden menos a crédito, el modelo reproducirá ese patrón. La IA es tan sesgada como los humanos que produjeron los datos, a veces más, porque escala ese sesgo.

Entender estos mitos no es pesimismo — es la base para usar IA de manera efectiva y responsable.`,
      analogia: "Es como aprender a conducir: el optimismo de que un auto te lleva a cualquier lugar y el miedo de que siempre habrá accidentes son igualmente inútiles. Lo útil es entender cómo funciona el vehículo, sus límites reales, y cuándo necesitas un mecánico.",
      ejemplo_malo: "Decirle a un cliente: 'La IA lo hará todo por ustedes automáticamente' — promesa sin matices que genera expectativas irreales y proyectos fallidos.",
      ejemplo_bueno: "Decirle a un cliente: 'La IA puede automatizar el 65% de su proceso de revisión documental, reduciendo el tiempo de 8 horas a 2.8 horas, pero el 35% restante — casos excepcionales y decisiones de alto riesgo — seguirá requiriendo tu equipo legal.'",
      por_que_importa: "Un AI Engineer que no puede separar mito de realidad pierde credibilidad con clientes y toma decisiones de implementación equivocadas. Este conocimiento te posiciona como el adulto en la sala cuando todos están o en pánico o en hype.",
      tip_profesional: "Cuando alguien en una reunión haga una afirmación absoluta sobre IA ('la IA va a reemplazar X' o 'la IA nunca podrá Y'), pregunta: '¿En qué timeline? ¿Con qué nivel de supervisión? ¿Para qué subconjunto de tareas?' Esas preguntas convierten el ruido en conversaciones productivas."
    },
    verificacion: [
      {
        pregunta: "¿Cuál es la diferencia fundamental entre cómo un LLM procesa lenguaje vs cómo un humano lo comprende?",
        opciones: ["Los LLMs procesan más rápido", "Los LLMs predicen patrones estadísticos sin comprensión real del significado", "Los humanos son más precisos", "Los LLMs tienen más memoria"],
        correcta: 1,
        explicacion_profunda: "Los LLMs son máquinas de predicción estadística. Dado un contexto, predicen cuál es la siguiente token más probable. No tienen modelo del mundo, no tienen intenciones, no tienen comprensión semántica genuina. Esto explica por qué pueden generar afirmaciones falsas con perfecta fluidez — la fluidez proviene de patrones lingüísticos, no de conocimiento verificado. Esta distinción es crítica para saber cuándo confiar en el output de un modelo y cuándo verificarlo.",
        concepto_reforzado: "Límites fundamentales de los LLMs"
      },
      {
        pregunta: "Según McKinsey (2024), ¿qué porcentaje de empleos tiene al menos un 30% de tareas automatizables?",
        opciones: ["20%", "40%", "60%", "80%"],
        correcta: 2,
        explicacion_profunda: "El 60% de los empleos actuales tienen una porción significativa de tareas automatizables con IA. Sin embargo, la automatización de tareas no implica eliminación de roles. La mayoría de los empleos se transformarán: las tareas rutinarias y predecibles serán automatizadas, mientras que el juicio, la creatividad, la negociación y las relaciones interpersonales — que requieren contexto humano — permanecerán como responsabilidades humanas.",
        concepto_reforzado: "Impacto real de la IA en el empleo"
      },
      {
        pregunta: "¿Por qué es un error afirmar que 'la IA es objetiva porque es matemática'?",
        opciones: ["Porque la matemática no es precisa", "Porque los modelos heredan y pueden amplificar los sesgos presentes en sus datos de entrenamiento", "Porque los modelos no usan matemáticas reales", "Porque los humanos supervisan todo el proceso"],
        correcta: 1,
        explicacion_profunda: "Los datos de entrenamiento reflejan la realidad histórica, que está llena de sesgos sistémicos. Si los datos históricos muestran que ciertas comunidades reciben menos préstamos (por discriminación histórica), el modelo aprenderá ese patrón y lo reproducirá. Lo peligroso es que la IA puede escalar este sesgo a millones de decisiones simultáneas, y la apariencia de objetividad matemática puede hacer que los sesgos sean más difíciles de cuestionar.",
        concepto_reforzado: "Sesgos en datos y modelos de IA"
      },
      {
        pregunta: "¿Cuál es el mito más peligroso sobre los modelos de IA en contexto profesional?",
        opciones: ["Que son muy caros", "Que aprenden y mejoran automáticamente con cada conversación que tienes con ellos", "Que son difíciles de usar", "Que requieren internet"],
        correcta: 1,
        explicacion_profunda: "El mito de que los LLMs aprenden de tus interacciones en tiempo real es especialmente peligroso porque lleva a confiar en que el modelo 'recordará' preferencias o aprenderá de errores pasados. Los modelos son estáticos después del entrenamiento: Claude Sonnet 4.5 tiene el mismo conocimiento en la conversación 1 que en la conversación 1,000,000. Las mejoras solo vienen de nuevas versiones. Conocer esto te ayuda a diseñar sistemas correctos: si necesitas que el sistema 'recuerde', debes implementar memoria explícita.",
        concepto_reforzado: "Modelos estáticos vs aprendizaje continuo"
      },
      {
        pregunta: "¿Cuál es la afirmación más precisa sobre la diferencia entre Claude y ChatGPT?",
        opciones: ["Son idénticos con distinto nombre", "Claude y ChatGPT tienen diferencias técnicas y filosóficas reales que los hacen más adecuados para diferentes casos de uso", "ChatGPT siempre es mejor", "Claude siempre es mejor"],
        correcta: 1,
        explicacion_profunda: "Claude usa Constitutional AI para alineación, tiene ventana de contexto más grande en muchas configuraciones, y está optimizado para razonamiento profundo en tareas largas. GPT-4o tiene integraciones nativas más amplias y velocidad en tareas cortas. Gemini tiene ventajas en contexto muy largo y búsqueda en tiempo real. Ningún modelo es universalmente superior: elegir correctamente según la tarea puede mejorar los resultados un 30-40%.",
        concepto_reforzado: "Diferencias entre modelos de IA principales"
      }
    ],
    practica: {
      tipo: "caso_real",
      contexto: "Eres consultor de IA y un directivo de una empresa manufacturera te dice en reunión: 'Leí que la IA va a reemplazar el 80% de nuestros empleados en 2 años. ¿Deberíamos contratar menos gente ahora?'",
      instruccion: "Formula una respuesta que corrija el mito sin desestimar la preocupación del directivo, use datos concretos, y reoriente la conversación hacia una decisión empresarial productiva.",
      input_malo: "No se preocupe, eso es exagerado. La IA no va a reemplazar nada tan pronto.",
      pista: "Separa tareas de roles, usa datos específicos de la industria manufacturera si puedes, y propone una acción concreta para evaluar el impacto real en SU empresa específica.",
      solucion: "Excelente preocupación — pero hay una distinción importante: la IA automatiza tareas, no roles completos. En manufactura, el 40-50% de tareas repetitivas de control de calidad visual pueden automatizarse con computer vision, pero los técnicos que interpretan anomalías complejas, coordinan con proveedores y toman decisiones de parada de línea siguen siendo esenciales. La recomendación no es contratar menos — es hacer un mapeo de tareas en los próximos 30 días: identificar qué tareas específicas en su planta son candidatas a automatización (repetitivas, predecibles, basadas en patrones visuales o de datos) vs cuáles requieren juicio humano. Eso nos da un plan real, no una reacción a un titular.",
      criterios_de_exito: [
        "Distingue claramente entre tareas y roles",
        "Usa datos específicos del sector, no generalidades",
        "Propone una acción concreta y de bajo riesgo como siguiente paso"
      ]
    },
    conexion: { siguiente_concepto: "Cómo aprender IA de forma efectiva", por_que_importa_despues: "Con los mitos despejados, puedes construir un plan de aprendizaje basado en realidad, no en expectativas distorsionadas." }
  }
}

const l8 = {
  id: "m1-b0-l8", titulo: "Cómo aprender IA de forma efectiva: el método que funciona", bloque: 0,
  tipo: "leccion", duracion_min: 20, xp: 50,
  contenido: {
    teoria: {
      explicacion: `Hay una forma correcta y una incorrecta de aprender IA en 2026. La incorrecta: consumir pasivamente cursos en video, coleccionar certificados, y esperar a "entender todo" antes de construir algo. La correcta: aprender en espiral, con proyectos reales desde el día uno.

El campo de la IA se mueve tan rápido que la información que aprendes tiene una vida útil promedio de 18-24 meses para conocimiento técnico específico (qué modelo usar, qué framework está de moda) y de 5-10 años para principios fundamentales (cómo funcionan los transformers, qué son los embeddings, cómo evaluar un modelo). Tu estrategia de aprendizaje debe reflejar esta diferencia.

El Framework de Aprendizaje en Capas para IA:

Capa 1 — Fundamentos inmutables (prioridad máxima, vida útil 10+ años): Cómo funcionan las redes neuronales a nivel conceptual. Qué son los embeddings y por qué importan. Qué es la atención y cómo permite a los transformers funcionar. Cómo se entrena un modelo (gradiente descendente conceptual). Cómo se evalúa un modelo. Por qué los LLMs alucinan. Estas ideas no van a cambiar aunque Claude 10 salga mañana.

Capa 2 — Habilidades prácticas de alto impacto (vida útil 3-5 años): Prompt engineering avanzado. Cómo diseñar sistemas con LLMs (RAG, agentes). Cómo usar APIs de IA de forma efectiva. Cómo evaluar outputs de IA para tu caso de uso específico. Cómo calcular ROI de implementaciones de IA.

Capa 3 — Herramientas y frameworks actuales (vida útil 1-2 años): Qué modelos usar hoy para qué tareas. Qué frameworks (LangChain, LlamaIndex) están vigentes. Qué plataformas (Cursor, Claude Code) son las más productivas. Esta capa la actualizas leyendo newsletters semanalmente, no con cursos.

El Principio del Proyecto Ancla: Desde el día uno de aprendizaje, necesitas un proyecto real que te importe. No un ejercicio académico — algo que resolverías para tu trabajo, negocio o vida. Este proyecto es tu ancla: cada nuevo concepto que aprendes, lo intentas aplicar inmediatamente. El ciclo es: concepto → intento → fracaso → diagnóstico → ajuste → éxito parcial → siguiente concepto.

La Regla del 20/80 Invertido: En IA, el 20% del conocimiento técnico te da el 80% de la capacidad práctica. Ese 20% clave: entender LLMs (cómo funcionan, cuándo fallan), prompt engineering (técnico, no básico), APIs y evaluación. El 80% restante (matemáticas profundas de optimización, teoría de grafos de transformers, etc.) es para quien quiere investigar o hacer fine-tuning propio.

Velocidad de aprendizaje realista: Un developer web con dedicación de 10 horas semanales puede estar construyendo aplicaciones funcionales con IA en 3 meses. En 6 meses, puede hacer consultoría. En 12 meses, puede ser referente en su comunidad. En 24 meses, puede estar en el top 5% de practitioners en LATAM. Este no es hype — es el ritmo real que se observa en quienes aprenden con proyecto ancla.`,
      analogia: "Aprender IA es como aprender a cocinar: puedes leer 100 libros de cocina (cursos pasivos) o puedes cocinar una cena real esta semana y aprender 10 veces más en el proceso. Los mejores chefs aprenden cocinando, no leyendo.",
      ejemplo_malo: "Completar 5 cursos de IA en Coursera, obtener certificados, y esperar 'estar listo' para construir algo. Resultado: 6 meses después tienes conocimiento desactualizado y ningún proyecto que mostrar.",
      ejemplo_bueno: "Elegir UN proyecto concreto (automatizar el seguimiento de leads de tu empresa) y construirlo iterativamente mientras aprendes solo lo necesario para esa siguiente funcionalidad. En 2 meses tienes algo funcionando Y has aprendido los fundamentos que importan.",
      por_que_importa: "El ritmo de avance del campo de IA hace que la estrategia de aprendizaje sea tan importante como el contenido. Alguien con la estrategia correcta aprenderá 3-5 veces más rápido que alguien con la estrategia incorrecta, incluso con el mismo tiempo disponible.",
      tip_profesional: "Define tu Proyecto Ancla antes de terminar este módulo. Debe ser: algo que ya conoces bien (tu industria, tu empresa), un problema real con fricción medible, y alcanzable con IA en 2-4 semanas de trabajo parte-tiempo. Este proyecto va a acelerar todo tu aprendizaje posterior."
    },
    verificacion: [
      {
        pregunta: "¿Cuál es la vida útil aproximada de conocimiento técnico específico sobre herramientas y frameworks de IA?",
        opciones: ["6 meses", "18-24 meses", "5 años", "10 años"],
        correcta: 1,
        explicacion_profunda: "El conocimiento sobre herramientas específicas (qué framework usar, qué API es la mejor para X) tiene una vida útil de 18-24 meses en promedio. LangChain era el estándar en 2023, en 2024 muchos lo reemplazaron con soluciones más simples. Por eso, esta capa de conocimiento debe actualizarse continuamente con newsletters y experimentación, no con cursos formales. En cambio, los fundamentos (transformers, embeddings, evaluación) duran 10+ años.",
        concepto_reforzado: "Estrategia de aprendizaje por capas"
      },
      {
        pregunta: "¿Qué es un 'Proyecto Ancla' en el contexto de aprendizaje de IA?",
        opciones: ["Un proyecto académico de certificación", "Un proyecto real y personal que motiva el aprendizaje y permite aplicación inmediata de conceptos", "El proyecto final de un curso", "Un proyecto empresarial de gran escala"],
        correcta: 1,
        explicacion_profunda: "El Proyecto Ancla es la diferencia entre aprendizaje activo y pasivo. Debe ser algo que genuinamente te importe resolver, en un dominio que ya conoces bien, con un problema real y medible. Cuando tienes un proyecto ancla, cada nuevo concepto que aprendes tiene un contexto de aplicación inmediata: no aprendes RAG en abstracto, lo aprendes para resolver específicamente cómo hacer que tu sistema de soporte al cliente acceda a tu documentación interna.",
        concepto_reforzado: "Aprendizaje basado en proyectos reales"
      },
      {
        pregunta: "Según la Regla del 20/80 invertido en IA, ¿cuál es el 20% de conocimiento que da el 80% de capacidad práctica?",
        opciones: ["Matemáticas avanzadas de optimización", "Cómo funcionan los LLMs, prompt engineering técnico, APIs y evaluación", "Historia de la IA", "Teoría de grafos de transformers"],
        correcta: 1,
        explicacion_profunda: "El 20% crítico que genera el 80% de valor práctico son cuatro áreas: entender LLMs (cómo funcionan conceptualmente y cuándo fallan), prompt engineering técnico (no básico), trabajar con APIs de IA efectivamente, y evaluar outputs para tu caso de uso. Las matemáticas profundas, la teoría detallada de transformers, y los algoritmos de optimización avanzados son importantes para investigadores y quienes hacen fine-tuning propio, pero para el 90% de aplicaciones prácticas no son necesarias.",
        concepto_reforzado: "Priorización de conocimiento en IA"
      },
      {
        pregunta: "¿Cuál es el ritmo de aprendizaje realista para un developer web con 10 horas semanales de estudio?",
        opciones: ["Construir apps con IA en 1 semana", "Construir apps funcionales en 3 meses, consultoría en 6, referente en 12", "Necesita 3 años antes de hacer algo funcional", "Depende exclusivamente del background técnico previo"],
        correcta: 1,
        explicacion_profunda: "Este timeline se basa en patrones observados en practitioners reales con background de desarrollo web. A los 3 meses: primera aplicación funcional con IA (chatbot con contexto, sistema de análisis de documentos). A los 6 meses: suficiente comprensión para ofrecer consultoría de implementación. A los 12 meses: capacidad de posicionarse como referente en su comunidad o empresa. El prerequisito es el Proyecto Ancla — sin proyecto real, el timeline se duplica o triplica.",
        concepto_reforzado: "Timeline realista de aprendizaje de IA"
      },
      {
        pregunta: "¿Por qué el conocimiento de fundamentos (transformers, embeddings) tiene una vida útil de 10+ años mientras que el conocimiento de herramientas específicas tiene solo 18-24 meses?",
        opciones: ["Los fundamentos son más fáciles de aprender", "Las herramientas cambian rápido pero los principios matemáticos y conceptuales en que se basan los modelos son estables", "Los fundamentos no cambian porque no importan", "Las herramientas son más complejas"],
        correcta: 1,
        explicacion_profunda: "Los transformers como arquitectura se describieron en 2017 y siguen siendo el backbone de todos los LLMs de 2026. Los embeddings como representación matemática del significado son un principio que no va a cambiar. En cambio, el framework específico que usas para orquestar llamadas a APIs (LangChain, LlamaIndex, código propio) puede quedar obsoleto en 18 meses. Esta distinción te ayuda a priorizar: dedica tiempo profundo a fundamentos y tiempo superficial/continuo a herramientas.",
        concepto_reforzado: "Durabilidad del conocimiento en IA"
      }
    ],
    practica: {
      tipo: "caso_real",
      contexto: "Eres developer web con 5 años de experiencia en WordPress y PHP. Quieres entrar al mundo de IA. Tienes 10 horas semanales disponibles y te proponen dos caminos: A) Tomar el certificado de Machine Learning de Stanford en Coursera (12 semanas, muy técnico), o B) Empezar a construir un chatbot para el sitio de un cliente usando Claude API mientras aprendes los fundamentos en paralelo.",
      instruccion: "Argumenta cuál camino elegirías y por qué, usando los principios de aprendizaje del módulo. Incluye qué proyecto ancla específico elegirías.",
      input_malo: "Tomaría el certificado de Stanford primero porque necesito tener la base teórica sólida antes de hacer cualquier cosa práctica.",
      pista: "Piensa en tu background existente (WordPress/PHP = manejo de APIs, lógica de negocio, entender clientes). ¿Qué proyecto real podrías hacer para un cliente existente en las próximas 4 semanas?",
      solucion: "Elegiría el camino B con la siguiente estructura: Semana 1-2: Hacer funcionar una integración básica de Claude API con PHP (que ya sé). Proyecto ancla: chatbot de soporte para uno de mis clientes de WordPress. Semana 3-4: Aprender prompt engineering técnico mientras construyo el primer prototipo. Semana 5-8: Completar el chatbot funcional y simultáneamente estudiar los fundamentos de LLMs (M1 de AIPath). El certificado de Stanford tiene valor, pero está optimizado para quienes quieren ser investigadores o ML Engineers. Para mi objetivo (ser AI Engineer práctico en LATAM), el aprendizaje basado en proyectos reales con clientes reales es 3x más efectivo. Además, en 8 semanas tengo algo que mostrar.",
      criterios_de_exito: [
        "Identifica el camino más efectivo para su contexto específico (developer web)",
        "Propone un proyecto ancla concreto y alcanzable",
        "Menciona cómo usaría sus habilidades existentes como ventaja"
      ]
    },
    conexion: { siguiente_concepto: "IA vs ML vs DL: las diferencias reales", por_que_importa_despues: "Con la estrategia correcta de aprendizaje en mente, ahora profundizamos en los conceptos fundamentales que tienen mayor vida útil." }
  }
}

// Reemplazar los slots en b0
b0.lecciones[6] = l7
b0.lecciones[7] = l8

fs.writeFileSync(file, JSON.stringify(data, null, 2))
console.log('B0 completado: l7 y l8 generadas')
