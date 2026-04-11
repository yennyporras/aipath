// Script: agrega bienvenida (l0) y recap (l9 o l11) a B8, B9 y B10 de M1
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/m1/index.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// ─────────────────────────────────────────────
// B8 — BIENVENIDA (l0)
// B8: Infraestructura y compute
// ─────────────────────────────────────────────
const b8Bienvenida = {
  "id": "m1-b8-l0",
  "titulo": "Bienvenida al Bloque 8: La infraestructura que mueve la IA en producción",
  "bloque": 8,
  "tipo": "bienvenida",
  "duracion_min": 10,
  "xp": 25,
  "contenido": {
    "teoria": {
      "explicacion": "Construir un prototipo de IA que funciona en tu laptop es relativamente sencillo. Desplegarlo para que respondan miles de usuarios al mismo tiempo, a costos razonables, con latencias aceptables y sin incumplir regulaciones de localización de datos — eso es otro nivel.\n\nEste bloque cubre la infraestructura que hace posible la IA a escala: las diferencias reales entre GPUs y TPUs, la decisión estratégica de cloud vs infraestructura propia, los costos concretos que debes presupuestar en 2026 y las métricas de latencia y throughput que determinan si tu sistema funciona en producción.\n\nTambién explorarás edge computing — procesar IA directamente en el dispositivo del usuario, sin enviar datos a servidores — y verás por qué esto está creciendo rápido, en parte impulsado por regulaciones europeas de privacidad que restringen la transferencia de datos personales fuera de la UE.\n\nTerminarás con una perspectiva práctica: qué hardware y configuración tiene sentido para un developer con presupuesto real, y cómo optimizar costos sin sacrificar rendimiento.\n\nAl terminar, podrás tomar decisiones de infraestructura con criterio técnico y económico — no solo elegir lo que recomienda el tutorial de turno.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "Las decisiones de infraestructura afectan directamente el costo, la velocidad y la viabilidad legal de cualquier sistema de IA. Un developer que entiende estos trade-offs puede diseñar sistemas sostenibles — no solo prototipos que nunca llegan a producción.",
      "tip_profesional": null
    },
    "verificacion": [],
    "practica": {
      "tipo": "reflexion",
      "contexto": "Antes de empezar el bloque, activa tu intuición sobre infraestructura de IA.",
      "instruccion": "Imagina que quieres construir un chatbot de atención al cliente en español para una empresa española mediana — 500 empleados, 2,000 consultas diarias de clientes. ¿Usarías una API de IA (Claude, GPT-4) o desplegarías tu propio modelo? ¿Por qué? ¿Qué factores considerarías antes de decidir? Escribe tu razonamiento en 3-4 frases.",
      "input_malo": null,
      "pista": "Piensa en: costo por consulta, tiempo de implementación, privacidad de datos de clientes europeos bajo GDPR, mantenimiento a largo plazo, y si el equipo tiene capacidad técnica para gestionar infraestructura propia.",
      "solucion": "Al terminar B8 sabrás que para este caso concreto la respuesta casi siempre es API externa (Claude o similar): las 2,000 consultas diarias a ~$0.002-0.01 por consulta resultan en $4-20 diarios — completamente viable. Desplegar un modelo propio requeriría una GPU dedicada ($300-800/mes mínimo), expertise en MLOps, y mantenimiento continuo. La excepción sería si los datos de clientes son tan sensibles que no pueden salir de la infraestructura propia bajo GDPR, en cuyo caso opciones como Mistral en servidor europeo o edge deployment se vuelven relevantes.",
      "criterios_de_exito": [
        "Consideraste el factor costo como elemento de decisión",
        "Mencionaste al menos una consideración sobre privacidad o localización de datos",
        "Guardaste la respuesta para compararla al terminar el bloque"
      ]
    },
    "conexion": {
      "siguiente_concepto": "Por qué el hardware importa: GPUs, TPUs y el cómputo detrás de la IA",
      "por_que_importa_despues": "La primera lección establece por qué el hardware especializado es fundamental para la IA moderna y cómo las diferencias entre GPU y TPU afectan las decisiones técnicas y económicas de cualquier proyecto."
    }
  }
};

// ─────────────────────────────────────────────
// B8 — RECAP (l9)
// ─────────────────────────────────────────────
const b8Recap = {
  "id": "m1-b8-l9",
  "titulo": "Recapitulación B8: Decisiones de infraestructura que definen el costo real de la IA",
  "bloque": 8,
  "tipo": "recapitulacion",
  "duracion_min": 15,
  "xp": 75,
  "contenido": {
    "teoria": {
      "explicacion": "Completaste el bloque de infraestructura — una perspectiva que la mayoría de los tutoriales de IA ignoran completamente, y que separa a los developers que construyen prototipos de los que construyen sistemas que funcionan en producción.\n\nAprendiste que GPUs son procesadores masivamente paralelos optimizados para las operaciones matriciales del deep learning, mientras que TPUs son chips diseñados por Google específicamente para multiplicación de matrices a escala. La elección entre ambos depende del framework, el volumen y el presupuesto — no existe una respuesta universal.\n\nLa decisión cloud vs local se resume en tres variables: volumen, latencia y restricciones legales. Para la mayoría de proyectos, cloud es la respuesta correcta por su escalabilidad y cero inversión inicial en hardware. La excepción son los casos donde el GDPR u otras regulaciones europeas de soberanía digital exigen que los datos no salgan de la infraestructura controlada por la organización — en cuyo caso cloud europeo certificado (AWS eu-west, Azure Europe, OVH) o infraestructura propia son las alternativas válidas.\n\nLos costos concretos de 2026: tokens de LLM vía API cuestan entre $0.001 y $0.015 por mil tokens según el modelo. Una GPU A100 en cloud ronda $2-4 por hora. Un servidor con GPU dedicada tiene costos de amortización de $300-800 mensuales. El edge computing — ejecutar modelos directamente en el dispositivo — está creciendo impulsado por privacidad y latencia: modelos como Phi-3-mini y Mistral 7B corren en hardware de consumo moderno.\n\nLa optimización de costos no es solo reducir cómputo — es elegir el modelo mínimo suficiente para la tarea, implementar caché de respuestas para consultas repetitivas, y monitorear el gasto real versus el estimado desde el día uno.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "Con este bloque puedes construir el presupuesto de infraestructura de cualquier proyecto de IA con números reales. Eso convierte propuestas vagas en planes ejecutables — y te diferencia de quienes diseñan sin considerar los costos operativos.",
      "tip_profesional": "Para monitorear costos de APIs de IA en tiempo real, integra LangSmith o Helicone desde el primer día — no cuando ya hayas gastado de más. Para evaluar si vale la pena desplegar un modelo local vs usar API, calcula el breakeven: divide el costo del servidor entre el costo por consulta en API. Si tu volumen supera ese número mensualmente, la infraestructura propia puede ser más económica."
    },
    "verificacion": [
      {
        "pregunta": "Una startup en Madrid está construyendo un sistema de IA que procesa contratos legales de clientes empresariales europeos. Los contratos contienen datos personales y confidenciales. ¿Qué consideración de infraestructura es crítica bajo el GDPR?",
        "opciones": [
          "Solo necesitan cifrar los contratos antes de enviarlos a cualquier API de IA",
          "Deben asegurarse de que los datos no se usen para entrenar modelos del proveedor, que el procesamiento ocurra dentro del Espacio Económico Europeo, y que tengan un contrato de tratamiento de datos (DPA) firmado con el proveedor de IA",
          "El GDPR no aplica a datos empresariales, solo a datos de personas físicas privadas",
          "Basta con usar HTTPS para cumplir con los requisitos de seguridad del GDPR"
        ],
        "correcta": 1,
        "explicacion_profunda": "El GDPR aplica a cualquier dato que pueda identificar directa o indirectamente a personas físicas — incluyendo datos en contratos empresariales que mencionan empleados, representantes o clientes. Para usar una API de IA con estos datos, la startup necesita: (1) Que el proveedor tenga centros de procesamiento dentro del EEE o garantías equivalentes (Privacy Shield sucesor, cláusulas contractuales estándar); (2) Un Data Processing Agreement (DPA) firmado con el proveedor que garantice que los datos no se usan para entrenamiento de modelos; (3) Documentar la base legal del tratamiento (normalmente interés legítimo o contrato). Anthropic, OpenAI y Azure OpenAI ofrecen opciones empresariales que cumplen estos requisitos, pero requieren contratos específicos — no aplican por defecto en planes de pago estándar.",
        "concepto_reforzado": "GDPR y localización de datos: obligaciones de infraestructura para procesar datos personales europeos con IA"
      },
      {
        "pregunta": "¿Por qué el edge computing está ganando relevancia en aplicaciones de IA en Europa, más allá de la reducción de latencia?",
        "opciones": [
          "Porque los modelos de edge son más precisos que los modelos en cloud para todas las tareas",
          "Porque ejecutar el modelo directamente en el dispositivo del usuario evita que datos personales viajen a servidores externos, lo que simplifica el cumplimiento del GDPR y reduce la exposición en caso de brechas de seguridad",
          "Porque el cloud computing está siendo prohibido en varios países europeos para aplicaciones de IA",
          "Porque los modelos edge consumen menos energía total a nivel global que los modelos en cloud"
        ],
        "correcta": 1,
        "explicacion_profunda": "El edge computing — ejecutar modelos de IA directamente en el dispositivo del usuario sin enviar datos a servidores — tiene una ventaja estratégica clara en el contexto europeo: si los datos nunca salen del dispositivo, no aplican las obligaciones del GDPR sobre transferencia y tratamiento de datos en servidores externos. Esto simplifica enormemente el cumplimiento legal para aplicaciones de salud, finanzas, RRHH y otras categorías sensibles. Modelos como Phi-3-mini (3.8B parámetros, Microsoft), Mistral 7B y LLaMA 3.1 8B pueden ejecutarse en hardware de consumo — laptops con 16GB RAM o smartphones de gama alta — con rendimiento suficiente para muchas tareas empresariales. El crecimiento de chips de IA integrados (Apple Silicon, Snapdragon X) está acelerando esta tendencia.",
        "concepto_reforzado": "Edge computing como estrategia de compliance GDPR y soberanía de datos en Europa"
      },
      {
        "pregunta": "Un equipo está decidiendo entre usar GPT-4o vía API ($0.005/1K tokens) o desplegar Llama 3.1 70B en un servidor GPU ($600/mes). Con un volumen de 500,000 tokens diarios, ¿cuál es más económico?",
        "opciones": [
          "La API siempre es más económica para cualquier volumen porque elimina los costos de infraestructura",
          "La API cuesta ~$75/mes y el servidor $600/mes, por lo que la API es más económica a ese volumen; el breakeven está en aproximadamente 4 millones de tokens diarios",
          "El servidor propio es más económico porque el costo de infraestructura no varía con el volumen",
          "Son equivalentes en costo cuando se consideran todos los factores operativos"
        ],
        "correcta": 1,
        "explicacion_profunda": "El cálculo concreto: 500,000 tokens/día × 30 días = 15 millones de tokens/mes. A $0.005 por 1,000 tokens = $75/mes en API. El servidor GPU cuesta $600/mes independientemente del volumen. A este volumen, la API es 8 veces más económica. El breakeven se calcula dividiendo el costo del servidor entre el costo por token: $600 / $0.000005 = 120 millones de tokens/mes ≈ 4 millones de tokens/día. Solo si superas ese volumen el servidor propio comienza a ser más económico. Este análisis simplifica algunos factores (el servidor tiene capacidad fija, los costos de API incluyen latencia cero de infraestructura), pero el principio de calcular el breakeven antes de comprometerse con infraestructura propia es fundamental para tomar decisiones económicas sólidas.",
        "concepto_reforzado": "Análisis de breakeven API vs infraestructura propia para tomar decisiones de costo fundadas"
      }
    ],
    "practica": {
      "tipo": "caso_real",
      "contexto": "Una empresa de recursos humanos en Berlín quiere implementar un sistema de IA que analiza CVs y entrevistas de video para preseleccionar candidatos. El sistema procesará videos de entrevistas (datos biométricos) y documentos con información personal. El equipo técnico propone usar una API de IA de un proveedor americano por ser la opción más rápida de implementar.",
      "instruccion": "Evalúa la decisión de infraestructura propuesta. Identifica los problemas de compliance, propón alternativas viables, y diseña la arquitectura de datos que permitiría implementar el sistema cumpliendo el EU AI Act y el GDPR.",
      "input_malo": "Usamos HTTPS y los datos están cifrados, así que cumplimos con el GDPR.",
      "pista": "Recuerda que: (1) los datos biométricos son categoría especial bajo GDPR (Art. 9); (2) los sistemas de RRHH de preselección son de alto riesgo bajo el EU AI Act; (3) transferir datos personales a EE.UU. requiere garantías adicionales. Piensa en qué alternativas de infraestructura permitirían procesar en Europa.",
      "solucion": "Problemas identificados: (1) Datos biométricos de video requieren consentimiento explícito bajo GDPR Art. 9 — base legal más estricta; (2) El sistema es de alto riesgo bajo EU AI Act, lo que impone documentación obligatoria, supervisión humana y evaluación de sesgos antes del despliegue; (3) Transferir a un proveedor americano requiere garantías adicionales (SCCs o equivalente). Arquitectura propuesta: (a) Procesamiento de video en infraestructura europea (AWS eu-central-1 Frankfurt o Azure Germany) con DPA firmado; (b) Alternativamente, edge processing del análisis de video en servidor local — el modelo pequeño extrae características y solo metadatos (no video) van al cloud; (c) El proveedor de IA debe tener opción 'no training on customer data' documentada contractualmente; (d) Implementar supervisión humana obligatoria para todos los rechazos; (e) Documentar el proceso de evaluación de sesgos antes del lanzamiento.",
      "criterios_de_exito": [
        "Identificas los datos biométricos como categoría especial con restricciones específicas",
        "Mencionas el EU AI Act y sus obligaciones para sistemas de RRHH",
        "Propones al menos una alternativa de infraestructura europeo o local",
        "Incluyes supervisión humana como requisito del EU AI Act",
        "El plan es técnicamente implementable con herramientas reales"
      ]
    },
    "conexion": {
      "siguiente_concepto": "Sesgos, fairness y los límites éticos de la IA",
      "por_que_importa_despues": "El Bloque 9 completa el marco de responsabilidad profesional: después de entender la infraestructura, aprenderás los principios éticos y el marco regulatorio que determinan qué sistemas de IA se pueden construir, cómo, y con qué obligaciones."
    }
  }
};

// ─────────────────────────────────────────────
// B9 — BIENVENIDA (l0)
// B9: Ética, sesgos y regulación
// ─────────────────────────────────────────────
const b9Bienvenida = {
  "id": "m1-b9-l0",
  "titulo": "Bienvenida al Bloque 9: IA responsable — ética, fairness y regulación",
  "bloque": 9,
  "tipo": "bienvenida",
  "duracion_min": 10,
  "xp": 25,
  "contenido": {
    "teoria": {
      "explicacion": "Puedes construir un sistema de IA técnicamente impecable que sea simultáneamente injusto, opaco, ilegal o dañino. Las cuatro cosas a la vez. La competencia técnica sola no es suficiente.\n\nEste bloque aborda la dimensión que separa a los profesionales de IA de los que simplemente saben usar herramientas: el criterio para construir sistemas que funcionen bien en el mundo real, no solo en benchmarks.\n\nAprenderás a identificar y mitigar sesgos sistemáticos — los errores que no aparecen en la accuracy general pero afectan de forma desproporcionada a grupos específicos. Explorarás los conceptos de fairness y explicabilidad, y por qué no existe una definición técnica única de 'justo'. Entenderás el EU AI Act en profundidad: qué sistemas clasifica como de alto riesgo, qué obligaciones impone, y cuáles son las multas reales por incumplimiento.\n\nTambién verás cómo Anthropic aborda estos desafíos con Constitutional AI — un framework técnico concreto para entrenar modelos que rechacen comportamientos dañinos. Y terminarás con la perspectiva más práctica: cómo integrar estas consideraciones desde el diseño, no como capa de compliance añadida al final.\n\nEn Europa, este bloque ya no es opcional. El EU AI Act hace de la ética de IA una obligación legal con consecuencias económicas concretas.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "El EU AI Act está en vigor progresivo desde 2024. Para 2026, los desarrolladores de sistemas de IA clasificados como de alto riesgo tienen obligaciones legales de documentación, evaluación de sesgos y supervisión humana. Ignorar este marco ya no es una opción académica — es riesgo legal.",
      "tip_profesional": null
    },
    "verificacion": [],
    "practica": {
      "tipo": "reflexion",
      "contexto": "Antes de empezar el bloque, activa tu intuición sobre los límites éticos de la IA.",
      "instruccion": "Piensa en un sistema de IA que usas frecuentemente — recomendaciones de contenido, filtros de spam, buscadores, asistentes de escritura. ¿Podrías identificar algún sesgo o comportamiento potencialmente injusto en cómo funciona? ¿Qué información necesitarías para saberlo con certeza? Escribe 2-3 frases.",
      "input_malo": null,
      "pista": "Piensa en quién está sobrerrepresentado y quién está subrepresentado en los resultados. ¿El sistema funciona igual de bien para todos los idiomas, géneros, culturas y contextos? ¿Tienes acceso a información sobre cómo fue entrenado o evaluado?",
      "solucion": "Al terminar B9 tendrás herramientas concretas para responder estas preguntas: análisis de tasas de error por subgrupos demográficos, métricas de fairness como equalized odds y demographic parity, técnicas de interpretabilidad como LIME y SHAP, y el marco regulatorio europeo que obliga a ciertos sistemas a documentar exactamente estos análisis. La falta de transparencia en muchos sistemas comerciales es precisamente uno de los problemas que la regulación intenta resolver.",
      "criterios_de_exito": [
        "Identificaste al menos un sistema de IA concreto que usas",
        "Propusiste al menos una forma en que podría mostrar sesgo",
        "Reconociste la limitación de información disponible para verificarlo",
        "Guardaste la respuesta para compararla al terminar el bloque"
      ]
    },
    "conexion": {
      "siguiente_concepto": "Cómo los sesgos entran en los modelos y cómo detectarlos",
      "por_que_importa_despues": "La primera lección establece el origen técnico de los sesgos — no son errores de diseño intencionales sino consecuencias de los datos de entrenamiento, las métricas de optimización y los incentivos del sistema. Entender el origen es el primer paso para mitigarlos."
    }
  }
};

// ─────────────────────────────────────────────
// B9 — RECAP (l9)
// ─────────────────────────────────────────────
const b9Recap = {
  "id": "m1-b9-l9",
  "titulo": "Recapitulación B9: El framework de ética y regulación para construir IA responsable",
  "bloque": 9,
  "tipo": "recapitulacion",
  "duracion_min": 15,
  "xp": 75,
  "contenido": {
    "teoria": {
      "explicacion": "Completaste el bloque de ética y regulación — el marco que define qué sistemas de IA se pueden construir legalmente en Europa y con qué responsabilidades.\n\nAprendiste que los sesgos en IA no son accidentes aleatorios: emergen de datos de entrenamiento que reflejan desigualdades históricas, de métricas de optimización que ignoran distribución por grupos, y de equipos homogéneos que no identifican problemas de fairness durante el diseño. Los sesgos son sistemáticos y predecibles — lo que significa que también son detectables y mitigables con las herramientas correctas.\n\nFairness no tiene una definición técnica única: demographic parity, equalized odds y predictive parity son matemáticamente incompatibles entre sí en la mayoría de escenarios reales. Esto significa que diseñar un sistema 'justo' requiere una decisión ética explícita sobre qué tipo de fairness priorizar — no existe una respuesta técnica neutral.\n\nEl EU AI Act establece una clasificación por riesgo con consecuencias legales concretas: sistemas de riesgo inaceptable (prohibidos), sistemas de alto riesgo (RRHH, crédito, salud, infraestructura crítica), sistemas de riesgo limitado (chatbots, que requieren disclosure de ser IA), y sistemas de riesgo mínimo. Los sistemas de alto riesgo deben cumplir obligaciones antes del despliegue: documentación técnica del dataset, evaluación de riesgos, gestión de calidad, logs de funcionamiento y supervisión humana efectiva. El incumplimiento puede resultar en multas de hasta €30M o el 6% de facturación global.\n\nConstitutional AI de Anthropic es un ejemplo de enfoque técnico concreto: entrenar el modelo para rechazar comportamientos dañinos usando un conjunto de principios constitucionales. El modelo evalúa sus propias respuestas contra esos principios durante el entrenamiento — una forma de alinear el comportamiento del modelo con valores humanos que no depende únicamente del RLHF.\n\nConstruir sistemas éticos por defecto significa integrar estas consideraciones en el diseño desde el inicio: qué datos se pueden usar, qué grupos pueden verse afectados, qué métricas de fairness son relevantes, qué supervisión humana es necesaria. Añadir ética como una capa de compliance al final produce sistemas que cumplen formalmente con la regulación sin abordar los problemas reales.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "En el mercado europeo, dominar el marco ético y regulatorio de IA es una ventaja competitiva real. Las empresas que construyen sistemas de IA compliance-ready desde el diseño evitan costosos rediseños regulatorios. Los profesionales que entienden tanto la técnica como la regulación son escasos — y esa combinación es lo que los clientes y empleadores europeos buscan.",
      "tip_profesional": "Para análisis de fairness en modelos, Fairlearn (Microsoft) y AI Fairness 360 (IBM) son los frameworks open source más completos. Para explicabilidad, LIME y SHAP son el estándar. Para documentar tus sistemas bajo el EU AI Act, la Comisión Europea publica plantillas de documentación técnica en su repositorio oficial. El DPO (Data Protection Officer) de tu organización es tu aliado natural para sistemas de alto riesgo — involúcralos desde el diseño, no cuando el sistema ya está en producción."
    },
    "verificacion": [
      {
        "pregunta": "Un sistema de puntuación de crédito en Francia tiene 85% de accuracy global, pero un análisis revela que tiene 73% de accuracy para solicitantes de origen norteafricano vs 91% para solicitantes de origen europeo. ¿Cómo clasificarías este hallazgo bajo el framework del EU AI Act?",
        "opciones": [
          "Es un problema de rendimiento técnico menor — la accuracy del 73% sigue siendo razonablemente alta",
          "El sistema muestra sesgo discriminatorio por origen étnico que viola el principio de fairness; como sistema de crédito (alto riesgo bajo EU AI Act), debe ser suspendido y rediseñado antes de continuar en producción",
          "Solo es un problema si hay una queja formal de algún afectado",
          "El sistema es legal siempre que la empresa informe a los clientes de que usa IA para tomar decisiones"
        ],
        "correcta": 1,
        "explicacion_profunda": "Los sistemas de puntuación crediticia están clasificados como de alto riesgo bajo el EU AI Act por su impacto significativo en el acceso a recursos financieros. La diferencia de 18 puntos porcentuales en accuracy entre grupos étnicos es evidencia de sesgo discriminatorio indirecto — el origen étnico actúa como proxy que el sistema perjudica sistemáticamente a un grupo protegido. Esto viola simultáneamente: (1) el EU AI Act, que exige evaluación de fairness y ausencia de discriminación en sistemas de alto riesgo; (2) la Directiva de igualdad racial de la UE; (3) potencialmente el GDPR si el origen étnico (categoría especial) está siendo procesado como variable de decisión implícita. El sistema debe ser suspendido, el sesgo investigado en su origen (¿datos de entrenamiento históricos? ¿variables proxy?), y rediseñado con métricas de fairness explícitas antes de retornar a producción.",
        "concepto_reforzado": "Sesgo sistemático por grupos protegidos y obligaciones del EU AI Act para sistemas financieros de alto riesgo"
      },
      {
        "pregunta": "¿Por qué es imposible optimizar simultáneamente para demographic parity y equalized odds en la mayoría de sistemas de IA reales?",
        "opciones": [
          "Porque los algoritmos actuales no son suficientemente potentes para optimizar múltiples métricas de fairness a la vez",
          "Porque demographic parity requiere igualar las tasas de predicción positiva entre grupos, mientras que equalized odds requiere igualar las tasas de falsos positivos y negativos — y cuando las tasas base de la variable a predecir son diferentes entre grupos, satisfacer ambas simultáneamente es matemáticamente imposible",
          "Porque son métricas diseñadas por organizaciones competidoras con definiciones incompatibles por razones políticas",
          "Porque equalized odds solo aplica a clasificadores binarios y demographic parity solo a regresión"
        ],
        "correcta": 1,
        "explicacion_profunda": "Este es el teorema de impossibilidad de fairness (Chouldechova, 2017; Kleinberg et al., 2016): cuando las tasas base de la variable objetivo son diferentes entre grupos (por ejemplo, si la tasa real de default crediticio es diferente entre grupos demográficos por razones históricas), no es posible satisfacer simultáneamente demographic parity (igual proporción de aprobaciones), equalized odds (igual tasa de falsos positivos y negativos) y calibration (probabilidades correctamente calibradas). Esto no es un problema técnico a resolver — es una incompatibilidad matemática fundamental. La implicación práctica es que 'hacer el sistema justo' requiere una decisión ética explícita: ¿qué tipo de fairness es prioritaria en este contexto específico? En sistemas de crédito europeos, la regulación tiende a priorizar la ausencia de discriminación indirecta, lo que apunta más hacia equalized odds que hacia demographic parity.",
        "concepto_reforzado": "Teorema de imposibilidad de fairness: por qué la equidad técnica requiere decisiones éticas explícitas"
      },
      {
        "pregunta": "¿Cuál es la diferencia fundamental entre Constitutional AI (Anthropic) y el RLHF estándar como enfoques para alinear el comportamiento de un modelo con valores humanos?",
        "opciones": [
          "Constitutional AI usa más datos de entrenamiento que RLHF estándar",
          "Constitutional AI entrena al modelo para evaluar sus propias respuestas contra un conjunto de principios explícitos, reduciendo la dependencia de anotadores humanos para cada posible comportamiento dañino; el RLHF estándar depende completamente de feedback humano caso por caso",
          "Constitutional AI solo funciona con modelos de Anthropic y no puede aplicarse a otros LLMs",
          "RLHF estándar es más efectivo que Constitutional AI para todos los tipos de alineación de valores"
        ],
        "correcta": 1,
        "explicacion_profunda": "RLHF (Reinforcement Learning from Human Feedback) estándar requiere que anotadores humanos evalúen respuestas del modelo y proporcionen preferencias par a par — un proceso costoso y difícil de escalar a todas las posibles situaciones de riesgo. Constitutional AI de Anthropic introduce un nivel de auto-evaluación: el modelo aprende un conjunto de principios constitucionales y los usa para evaluar y revisar sus propias respuestas durante el entrenamiento. Esto tiene ventajas concretas: los principios son explícitos y auditables (transparencia), el proceso escala mejor que la anotación humana masiva, y permite consistencia en la aplicación de los principios entre situaciones similares. Las limitaciones incluyen que la efectividad depende de cómo se formulan los principios constitucionales y que el modelo puede encontrar formas de satisfacer los principios formalmente sin capturar su espíritu. Es un avance técnico real, no una solución completa — la alineación de IA sigue siendo un problema abierto de investigación.",
        "concepto_reforzado": "Constitutional AI vs RLHF: técnicas concretas de alineación de LLMs con valores humanos"
      }
    ],
    "practica": {
      "tipo": "caso_real",
      "contexto": "Una empresa de seguros de salud en los Países Bajos quiere implementar un sistema de IA que predice el riesgo de hospitalización de sus asegurados para ofrecerles programas preventivos proactivos. El modelo usa historial médico, datos demográficos y actividad de la app de salud. El equipo ya entrenó el modelo y tiene 89% de accuracy. Quieren lanzarlo en 30 días.",
      "instruccion": "Identifica por qué este sistema requiere análisis detallado bajo el EU AI Act, qué evaluaciones de fairness son necesarias antes del lanzamiento, y qué obligaciones de transparencia tienen con los asegurados.",
      "input_malo": "El modelo tiene 89% de accuracy y los datos son propios, así que podemos lanzar directamente.",
      "pista": "Considera: (1) ¿Qué categorías de datos especiales bajo GDPR están involucradas? (2) ¿Qué clasificación tiene este sistema bajo el EU AI Act? (3) ¿Podría el sistema discriminar entre grupos de asegurados de formas que amplíen desigualdades de salud existentes?",
      "solucion": "Análisis completo: (1) GDPR categoría especial: los datos de salud son categoría especial (Art. 9 GDPR). Requieren consentimiento explícito para este uso específico — los asegurados deben saber que sus datos se usan para predicción de riesgo por IA, no solo para facturación. (2) EU AI Act clasificación: sistemas de seguros de salud que afectan el acceso o condiciones de los productos de seguro son potencialmente de alto riesgo. La Comisión Europea está evaluando su clasificación — precaución máxima recomendada. (3) Evaluación de fairness necesaria: analizar tasas de predicción de alto riesgo por edad, género, origen étnico, código postal (proxy socioeconómico). Si el modelo predice más riesgo sistemáticamente en grupos de menor ingreso o ciertas etnias, puede amplificar desigualdades existentes — las personas ya en desventaja reciben más intervenciones o podrían eventualmente enfrentar primas más altas. (4) Transparencia obligatoria: los asegurados deben ser informados de que se usa IA, tener derecho a explicación de la decisión y derecho a revisión humana. (5) Timeline: lanzar en 30 días sin estas evaluaciones es un riesgo legal y reputacional considerable. Recomendación: 60-90 días adicionales para análisis de fairness, documentación regulatoria, y diseño del mecanismo de supervisión humana.",
      "criterios_de_exito": [
        "Identificas los datos de salud como categoría especial GDPR con implicaciones concretas",
        "Analizas el potencial de discriminación por grupos protegidos específicos",
        "Propones métricas de fairness concretas para evaluar el modelo",
        "Incluyes el derecho a explicación y supervisión humana como obligaciones",
        "Justificas la extensión del timeline con fundamento regulatorio"
      ]
    },
    "conexion": {
      "siguiente_concepto": "IA aplicada en sectores reales: salud, finanzas, educación y más",
      "por_que_importa_despues": "El Bloque 10 lleva todo lo aprendido sobre fundamentos, capacidades, limitaciones, evaluación, infraestructura y ética a contextos industriales concretos — para que puedas ver cómo estos principios se aplican en cada sector y donde están las oportunidades profesionales reales."
    }
  }
};

// ─────────────────────────────────────────────
// B10 — BIENVENIDA (l0)
// B10: IA por industria
// ─────────────────────────────────────────────
const b10Bienvenida = {
  "id": "m1-b10-l0",
  "titulo": "Bienvenida al Bloque 10: IA en el mundo real — industrias, oportunidades y lecciones de campo",
  "bloque": 10,
  "tipo": "bienvenida",
  "duracion_min": 10,
  "xp": 25,
  "contenido": {
    "teoria": {
      "explicacion": "Has completado nueve bloques construyendo la base técnica, conceptual y ética de la inteligencia artificial. Ahora llega la parte donde todo eso aterriza en el mundo real.\n\nEste bloque recorre los sectores donde la IA está teniendo mayor impacto en 2026 — salud, legal, finanzas, educación, retail, manufactura, medios, gobierno — con casos concretos de lo que funciona, lo que falla y por qué. No son demostraciones técnicas: son historias de adopción real con sus complejidades, resistencias y resultados.\n\nTambién explorarás oportunidades específicas para LATAM: un mercado con dinámicas propias, necesidades que los grandes proveedores globales no resuelven bien, y ventanas de oportunidad concretas para developers que entienden tanto la tecnología como el contexto local.\n\nVerás casos de fracaso documentado en IA — los proyectos millonarios que no funcionaron y las lecciones técnicas y de gestión que dejaron. Aprender de los fracasos ajenos es una de las formas más eficientes de crecer como profesional.\n\nAl terminar este bloque, tendrás un mapa completo de la industria de IA en 2026: dónde está la demanda real, qué competencias escasean, y cómo posicionarte en el sector que mejor combine con tu perfil y tus objetivos.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "Conocer las aplicaciones reales por industria te permite contextualizar las conversaciones con clientes y empleadores, identificar oportunidades antes de que sean obvias, y conectar los conocimientos técnicos con problemas de negocio concretos. Es la diferencia entre un developer que codifica y uno que resuelve problemas de alto valor.",
      "tip_profesional": null
    },
    "verificacion": [],
    "practica": {
      "tipo": "reflexion",
      "contexto": "Antes de empezar el bloque, mapea tu propio terreno de oportunidades.",
      "instruccion": "Elige el sector que más te interese de los que explorará este bloque (salud, legal, educación, finanzas, retail, gobierno, medios, startups). ¿Qué problema específico crees que la IA podría resolver en ese sector que hoy no está siendo bien resuelto? Sé específico — no 'automatizar procesos' sino un problema concreto con un tipo de usuario identificado.",
      "input_malo": null,
      "pista": "Piensa en ineficiencias que hayas observado en ese sector directamente — como usuario, empleado o cliente. Los mejores problemas para resolver con IA son los que implican procesar mucha información repetitiva, tomar decisiones con patrones claros, o personalizar a escala.",
      "solucion": "Al terminar B10 podrás comparar tu hipótesis inicial con el estado real del mercado en ese sector. Los mejores problemas son específicos: 'triaje de sintomatología en sistemas de salud pública con listas de espera de 6 meses', 'revisión de contratos estándar de arrendamiento para PyMEs que no pueden pagar un abogado', o 'tutorías personalizadas en matemáticas para estudiantes de secundaria con brechas de aprendizaje post-pandemia'. La especificidad es lo que convierte una idea en un proyecto con mercado real.",
      "criterios_de_exito": [
        "Elegiste un sector específico",
        "Identificaste un problema concreto (no genérico)",
        "Describiste un tipo de usuario o beneficiario identificable",
        "Guardaste la respuesta para compararla al terminar el bloque"
      ]
    },
    "conexion": {
      "siguiente_concepto": "IA en salud: de diagnóstico por imagen a drug discovery",
      "por_que_importa_despues": "La primera lección establece el patrón que repetiremos en cada sector: qué está funcionando, qué sigue siendo difícil, y qué habilidades específicas demanda. La salud es el sector donde el impacto potencial y la complejidad regulatoria son simultáneamente más altos."
    }
  }
};

// ─────────────────────────────────────────────
// B10 — RECAP (l11)
// ─────────────────────────────────────────────
const b10Recap = {
  "id": "m1-b10-l11",
  "titulo": "Recapitulación B10: El mapa de oportunidades y riesgos de la IA por sector en 2026",
  "bloque": 10,
  "tipo": "recapitulacion",
  "duracion_min": 15,
  "xp": 75,
  "contenido": {
    "teoria": {
      "explicacion": "Completaste el bloque de aplicaciones industriales — el mapa del territorio real donde la IA está creando valor y donde están las oportunidades profesionales concretas en 2026.\n\nAprendiste que la IA no impacta igual en todos los sectores. En salud, la IA de imagen médica supera a especialistas humanos en tareas específicas como detección de cáncer de piel y retinopatía diabética — pero la adopción es lenta porque los sistemas de salud son conservadores, las regulaciones son estrictas (CE marking, FDA 510k) y los datos clínicos están fragmentados entre sistemas que no se comunican. En Europa, el NHS inglés y los sistemas nórdicos son pioneros en adopción; en LATAM, los desafíos de infraestructura básica dominan sobre los de IA.\n\nEn legal y finanzas, la IA ya es infraestructura: detección de fraude en tiempo real, revisión de contratos, due diligence automatizada. Pero los modelos de lenguaje en contextos legales requieren verificación humana de cada output — 'el abogado es responsable, no el modelo' sigue siendo el principio regulatorio dominante. El caso de los abogados de Nueva York citando casos inexistentes generados por ChatGPT es el ejemplo canónico de qué no hacer.\n\nEn educación, la personalización masiva que prometía la IA desde hace una década está empezando a materializarse con LLMs — tutores personalizados que adaptan el ritmo, el estilo y el contenido a cada estudiante. Khan Academy's Khanmigo y Duolingo Max son los casos más documentados. El desafío en LATAM es la brecha de acceso, no la disponibilidad tecnológica.\n\nLos casos de fracaso documentados comparten patrones: expectativas infladas en el pitch, datasets insuficientes en producción, resistencia cultural a cambiar flujos de trabajo establecidos, y falta de plan de mantenimiento post-lanzamiento. IBM Watson for Oncology es el caso de estudio más citado — millones de dólares invertidos, adopción hospitalaria mínima, descontinuado en 2022.\n\nPara developers latinoamericanos, las oportunidades más concretas son las que requieren comprensión profunda del contexto local: español coloquial regional, sistemas tributarios específicos, dinámicas de mercado informal, y sectores donde los grandes proveedores globales no tienen footprint ni interés.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "Este mapa industrial te permite posicionarte estratégicamente: no competir frontalmente con soluciones globales donde ya están consolidadas, sino identificar los espacios donde el conocimiento local es una ventaja competitiva real. Eso es estrategia de carrera, no solo conocimiento técnico.",
      "tip_profesional": "Para mantenerte actualizado sobre adopción de IA por industria, Stanford HAI publica el AI Index anual — el benchmarking más riguroso del estado de la IA en el mundo. Para LATAM específicamente, el IADB (Banco Interamericano de Desarrollo) publica reportes anuales sobre adopción de tecnología en la región. Y para casos de fracaso documentados, la newsletter 'AI Snake Oil' de Arvind Narayanan es la fuente más crítica y rigurosa disponible."
    },
    "verificacion": [
      {
        "pregunta": "¿Por qué IBM Watson for Oncology, con una inversión de cientos de millones de dólares y capacidades técnicas superiores, tuvo adopción hospitalaria mínima y fue discontinuado en 2022?",
        "opciones": [
          "Porque los modelos de IA no pueden manejar la complejidad del diagnóstico oncológico",
          "Principalmente porque fue entrenado con casos del Memorial Sloan Kettering en Nueva York y sus recomendaciones no generalizaban bien a protocolos de tratamiento, guías clínicas y disponibilidad de medicamentos en otros países y sistemas de salud — los médicos dejaron de confiar en él",
          "Porque los hospitales no tenían infraestructura tecnológica para implementarlo",
          "Porque fue superado técnicamente por modelos de OpenAI antes de poder desplegarse"
        ],
        "correcta": 1,
        "explicacion_profunda": "Watson for Oncology es el caso de estudio clásico del gap entre demostración técnica impresionante y utilidad real en producción. El sistema fue entrenado casi exclusivamente con datos y protocolos del Memorial Sloan Kettering — uno de los mejores centros oncológicos del mundo, pero con características muy específicas: disponibilidad de medicamentos de última generación, pacientes anglosajones, protocolos americanos. Cuando se desplegó en hospitales en India, Corea o Europa, las recomendaciones a menudo no coincidían con los tratamientos disponibles localmente ni con las guías clínicas regionales. Los oncólogos reportaron que el sistema a veces recomendaba tratamientos 'inseguros' según su criterio clínico. La lección técnica es fundamental: el rendimiento en el dataset de entrenamiento no garantiza generalización a distribuciones de datos diferentes — el dataset debe representar el contexto de despliegue real, no el contexto donde era conveniente recopilar datos.",
        "concepto_reforzado": "Dataset shift y generalización: por qué el rendimiento en entrenamiento no garantiza utilidad real en producción"
      },
      {
        "pregunta": "¿Cuál es la oportunidad específica para developers latinoamericanos que los grandes proveedores globales de IA no están capturando bien?",
        "opciones": [
          "Construir modelos fundacionales competidores con GPT-4 o Claude en español",
          "Desarrollar soluciones verticales que requieren comprensión profunda del contexto local — sistemas tributarios específicos, español coloquial regional, dinámicas del mercado informal, regulaciones locales y sectores donde los proveedores globales no tienen presencia ni interés económico suficiente",
          "Distribuir y revender en LATAM las APIs de los grandes proveedores globales",
          "Copiar las soluciones exitosas de Europa y adaptarlas superficialmente al español"
        ],
        "correcta": 1,
        "explicacion_profunda": "Los grandes proveedores de IA (OpenAI, Anthropic, Google) optimizan para mercados donde la escala justifica la inversión: inglés, mercados regulatorios bien definidos (EEUU, UE), sectores con alta densidad de clientes enterprise. Esto deja espacios concretos donde el conocimiento local es una barrera de entrada que protege a los developers regionales: (1) Español coloquial regional — las diferencias entre el español mexicano, rioplatense, colombiano y peninsular en contextos jurídicos, médicos o comerciales son significativas; (2) Sistemas tributarios hiperespecidfícos — la facturación electrónica en México, Colombia o Brasil tiene peculiaridades que ningún modelo global maneja bien sin especialización; (3) Mercado informal — entre el 50-60% de la economía en muchos países de LATAM opera en economía informal, con dinámicas que los modelos entrenados con datos del mundo formal no modelan; (4) Sectores de baja densidad empresarial — agro, microfinanzas rurales, salud comunitaria — donde el cliente potencial no es atractivo para empresas globales pero representa millones de personas.",
        "concepto_reforzado": "Ventaja competitiva del conocimiento local frente a proveedores globales en mercados emergentes de IA"
      },
      {
        "pregunta": "¿Qué distingue a los casos de fracaso en IA documentados (como Watson for Oncology o el escándalo del algoritmo de RRHH de Amazon) de los proyectos que sí funcionaron en producción?",
        "opciones": [
          "Los proyectos exitosos usaron siempre los modelos más avanzados disponibles en su momento",
          "Los proyectos exitosos comenzaron con un problema específico y bien delimitado, con métricas de éxito definidas antes del entrenamiento, con datasets representativos del contexto real de despliegue, y con un plan explícito de supervisión humana para los casos edge",
          "Los fracasos ocurrieron únicamente en proyectos de empresas grandes con burocracia excesiva",
          "Los proyectos exitosos siempre tenían más datos y mayor presupuesto que los fallidos"
        ],
        "correcta": 1,
        "explicacion_profunda": "El análisis de los fracasos más documentados en IA (Watson for Oncology de IBM, el sistema de RRHH de Amazon que descartó CVs de mujeres, el algoritmo de recidivismo COMPAS con sesgo racial, el sistema de asignación de NHS que favoreció a pacientes de mayor ingreso) revela patrones consistentes: (1) Definición vaga del problema — 'optimizar decisiones de oncología' es menos útil como especificación que 'recomendar régimen de quimioterapia para estadio III de cáncer de mama en pacientes sin contraindicaciones a antraciclinas'; (2) Dataset no representativo del despliegue real — entrenado con datos de un contexto, desplegado en otro; (3) Métricas de éxito mal definidas — la accuracy en el test set no predice adopción ni satisfacción clínica; (4) Ausencia de plan para los casos donde el sistema falla o tiene baja confianza. Los proyectos exitosos no son necesariamente más complejos técnicamente — son más precisos en la definición del problema y más honestos sobre las limitaciones.",
        "concepto_reforzado": "Patrones de fracaso en IA: de la definición del problema al despliegue en producción"
      }
    ],
    "practica": {
      "tipo": "caso_real",
      "contexto": "Una startup mexicana quiere construir un sistema de IA que ayude a pequeños agricultores del Bajío a optimizar el riego y predecir plagas, usando datos de sensores IoT baratos, imágenes de satélite abiertos y clima. El mercado potencial es enorme — 400,000 agricultores en la región — pero la mayoría opera con conectividad limitada, baja alfabetización digital y en economía informal. Dos inversores europeos están interesados en financiar si el equipo puede demostrar la viabilidad técnica y comercial.",
      "instruccion": "Diseña el plan técnico inicial del sistema considerando las restricciones reales del mercado (conectividad, dispositivos, literacy digital), identifica los tres mayores riesgos técnicos del proyecto, y describe cómo demostrarías viabilidad ante los inversores europeos con un MVP mínimo.",
      "input_malo": "Construimos una app móvil con un modelo de deep learning que analiza fotos de cultivos y predice plagas con 95% de accuracy.",
      "pista": "Considera: ¿qué pasa con conectividad limitada (edge vs cloud)? ¿Cómo mides '95% de accuracy' si no tienes dataset etiquetado de plagas del Bajío? ¿Quién etiqueta los datos iniciales? ¿El modelo entrenado con datos globales generaliza a condiciones específicas del Bajío?",
      "solucion": "Plan técnico realista: (1) Arquitectura edge-first — el modelo de detección de plagas debe correr en el dispositivo (Android bajo gama con 3GB RAM) porque la conectividad es intermitente. Modelos candidatos: EfficientNet-B0 o MobileNetV3 fine-tuneados en imágenes de cultivos locales, exportados a TensorFlow Lite. (2) Dataset local es crítico — los modelos de detección de plagas entrenados con imágenes de California no generalizan a condiciones del Bajío. MVP debe incluir recolección de 500-1,000 imágenes etiquetadas por agrónomos locales antes de entrenar. (3) Interfaz sin literacy digital — voz en español mexicano coloquial, no texto; resultado como semáforo (verde/amarillo/rojo), no porcentajes. (4) Tres mayores riesgos: dataset shift (modelos globales no generalizan), adopción (el agricultor debe ver valor en las primeras 3 interacciones o abandona), y conectividad (sincronización de datos cuando hay señal, funcionar sin ella). (5) MVP para inversores europeos: piloto con 50 agricultores voluntarios en una zona, 90 días, métricas de adopción (DAU), precisión de predicciones validada por agrónomo experto, y entrevistas cualitativas de satisfacción.",
      "criterios_de_exito": [
        "Propones arquitectura edge que funcione sin conectividad constante",
        "Identificas la necesidad de dataset local específico del Bajío",
        "Diseñas interfaz adaptada al nivel de literacy digital del usuario",
        "Los tres riesgos técnicos son específicos y no genéricos",
        "El MVP es verificable con métricas concretas en un timeline realista"
      ]
    },
    "conexion": {
      "siguiente_concepto": "El futuro de la IA: tendencias emergentes y hacia dónde va todo esto",
      "por_que_importa_despues": "El Bloque 11 cierra el módulo completo con una perspectiva prospectiva: los desarrollos que están en curso pero aún no son mainstream, las señales que indican hacia dónde evoluciona el campo, y cómo construir una carrera sostenible en un área que cambia tan rápido."
    }
  }
};

// ─────────────────────────────────────────────
// INSERTAR EN EL JSON
// ─────────────────────────────────────────────
const b8 = data.bloques.find(b => b.id === 'm1-b8');
const b9 = data.bloques.find(b => b.id === 'm1-b9');
const b10 = data.bloques.find(b => b.id === 'm1-b10');

// B8: insertar l0 al inicio y l9 al final
b8.lecciones.unshift(b8Bienvenida);
b8.lecciones.push(b8Recap);

// B9: insertar l0 al inicio y l9 al final
b9.lecciones.unshift(b9Bienvenida);
b9.lecciones.push(b9Recap);

// B10: insertar l0 al inicio y l11 al final
b10.lecciones.unshift(b10Bienvenida);
b10.lecciones.push(b10Recap);

// Guardar
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('✓ B8: bienvenida (l0) + recap (l9) insertadas');
console.log('  Lecciones B8:', b8.lecciones.map(l => l.id).join(', '));
console.log('✓ B9: bienvenida (l0) + recap (l9) insertadas');
console.log('  Lecciones B9:', b9.lecciones.map(l => l.id).join(', '));
console.log('✓ B10: bienvenida (l0) + recap (l11) insertadas');
console.log('  Lecciones B10:', b10.lecciones.map(l => l.id).join(', '));
console.log('\nTotal de lecciones en M1:', data.bloques.reduce((sum, b) => sum + b.lecciones.length, 0));
