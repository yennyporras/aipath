// Script: agrega bienvenida (l0) y recap (lN+1) a B5, B6 y B7 de M1
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/m1/index.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// ─────────────────────────────────────────────
// B5 — BIENVENIDA (l0)
// ─────────────────────────────────────────────
const b5Bienvenida = {
  "id": "m1-b5-l0",
  "titulo": "Bienvenida al Bloque 5: Los datos que dan vida a los modelos",
  "bloque": 5,
  "tipo": "bienvenida",
  "duracion_min": 10,
  "xp": 25,
  "contenido": {
    "teoria": {
      "explicacion": "Hay un mito persistente en el mundo de la IA: que el modelo lo es todo. La realidad que descubren los equipos de producción es diferente. El modelo es el 20% del resultado — el 80% restante lo determinan los datos.\n\nEn este bloque entrarás al mundo de los datos que entrenan y potencian los modelos: cómo se recopilan, qué los hace valiosos, y por qué la calidad supera a la cantidad casi siempre. Aprenderás sobre datasets históricos que cambiaron la IA, sobre técnicas que multiplican datos limitados, y sobre las bases de datos vectoriales que hacen posible la búsqueda semántica a escala.\n\nTambién explorarás RAG — Retrieval Augmented Generation — la técnica que conecta modelos con conocimiento externo sin reentrenarlos. Y terminarás con algo crítico para cualquier profesional con clientes en Europa o en mercados regulados: cómo manejar datos sensibles respetando el GDPR y las regulaciones emergentes de IA.\n\nAl terminar este bloque, podrás diseñar pipelines de datos con criterio técnico y legal sólido.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "Entender los datos transforma cómo construyes soluciones de IA. Pasas de depender del modelo a controlar la calidad desde la fuente — la diferencia entre un prototipo que falla y un sistema que funciona en producción.",
      "tip_profesional": null
    },
    "verificacion": [],
    "practica": {
      "tipo": "reflexion",
      "contexto": "Antes de empezar el bloque, activa lo que ya intuyes sobre los datos detrás de los modelos.",
      "instruccion": "Sin buscar ninguna referencia: ¿qué tipos de datos crees que usaron para entrenar a Claude o GPT-4? ¿Qué problemas podrías anticipar con esos datos? Escribe tu respuesta en 2-3 frases.",
      "input_malo": null,
      "pista": "Piensa en las fuentes de texto disponibles masivamente en internet: páginas web, libros digitales, código, artículos. ¿Qué sesgos o problemas podrían traer esas fuentes?",
      "solucion": "Al terminar B5 sabrás que los LLMs modernos se entrenan con corpus masivos de texto web (Common Crawl), libros digitalizados, código de GitHub, Wikipedia y datasets curados. Los problemas incluyen: sesgo por sobrerrepresentación de contenido anglosajón, datos desactualizados (cutoff date), contenido de baja calidad difícil de filtrar a escala, y datos privados incluidos inadvertidamente. La calidad del filtrado y la curaduría impactan directamente las capacidades y limitaciones del modelo.",
      "criterios_de_exito": [
        "Mencionaste al menos dos fuentes de datos posibles",
        "Identificaste al menos un problema potencial con esos datos",
        "Guardaste la respuesta para compararla al terminar el bloque"
      ]
    },
    "conexion": {
      "siguiente_concepto": "Por qué los datos importan más que el modelo",
      "por_que_importa_despues": "La primera lección establece el argumento central del bloque: los datos son el factor más determinante en la calidad de un sistema de IA, más que la arquitectura del modelo."
    }
  }
};

// ─────────────────────────────────────────────
// B5 — RECAP (l11)
// ─────────────────────────────────────────────
const b5Recap = {
  "id": "m1-b5-l11",
  "titulo": "Recapitulación B5: Los datos que determinan lo que un modelo puede hacer",
  "bloque": 5,
  "tipo": "recapitulacion",
  "duracion_min": 15,
  "xp": 75,
  "contenido": {
    "teoria": {
      "explicacion": "Completaste el bloque de datos — el factor más subestimado y más determinante en cualquier sistema de IA real.\n\nAprendiste que la calidad de los datos supera a la cantidad en casi todos los casos prácticos. Un dataset pequeño y bien curado produce mejores resultados que millones de ejemplos ruidosos. Datasets históricos como ImageNet democratizaron el deep learning; Common Crawl forma la base de entrenamiento de los LLMs modernos. Viste cómo se recopilan datos a escala, los sesgos estructurales que esto genera, y las técnicas de data augmentation que multiplican datasets limitados.\n\nLas bases de datos vectoriales — Pinecone, Weaviate, pgvector — resuelven el problema de almacenar y buscar embeddings eficientemente. RAG combina recuperación de información con generación: permite al modelo responder con datos actualizados sin reentrenamiento, lo que lo convierte en la arquitectura más práctica para aplicaciones empresariales reales.\n\nEl GDPR y sus implicaciones para IA merecen atención especial: en Europa, usar datos personales para entrenar modelos requiere base legal válida. Los derechos sobre los datos — corrección, eliminación, portabilidad — aplican incluso a datos que ya fueron usados en entrenamiento. El EU AI Act añade obligaciones de transparencia sobre los datos usados para entrenar sistemas de alto riesgo. Esto tiene consecuencias directas de arquitectura: qué datos puedes usar, cómo debes documentarlo, y qué debes poder borrar.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "El dominio de datos es escaso y valioso. Pocos AI Engineers entienden tanto el pipeline técnico como las implicaciones legales y éticas. Este bloque te da ambas perspectivas — y esa combinación es un diferenciador profesional real.",
      "tip_profesional": "Hugging Face Datasets es tu primer destino para datasets públicos de calidad. Para datos propios, empieza con Argilla o Label Studio para anotación colaborativa. Y antes de lanzar cualquier sistema con datos de usuarios en Europa, consulta con un DPO (Data Protection Officer) — el GDPR no es opcional ni negociable."
    },
    "verificacion": [
      {
        "pregunta": "¿Cuál es la principal ventaja de RAG frente a fine-tuning para mantener un modelo actualizado con información reciente de una empresa?",
        "opciones": [
          "RAG es siempre más barato en cómputo de inferencia que un modelo fine-tuneado",
          "RAG permite actualizar el conocimiento del modelo añadiendo documentos sin reentrenamiento, mientras que el fine-tuning requiere un ciclo completo de entrenamiento cada vez que cambia la información",
          "RAG elimina completamente las alucinaciones del modelo base",
          "Fine-tuning es siempre superior porque modifica los pesos del modelo directamente"
        ],
        "correcta": 1,
        "explicacion_profunda": "RAG y fine-tuning resuelven problemas diferentes. RAG es ideal cuando la información cambia frecuentemente (documentos de empresa, normativas, catálogos de productos) porque añadir documentos a la base vectorial es instantáneo y no requiere reentrenamiento. Fine-tuning es mejor cuando quieres cambiar el estilo de respuesta, el tono, o especializar el modelo en un dominio con vocabulario muy específico. En la práctica, muchos sistemas en producción combinan ambas técnicas: fine-tuning para el estilo y RAG para el conocimiento actualizado.",
        "concepto_reforzado": "RAG vs fine-tuning: cuándo usar cada técnica"
      },
      {
        "pregunta": "Un equipo en Alemania quiere entrenar un modelo de IA con datos de conversaciones de soporte al cliente. ¿Qué obligación legal impone el GDPR antes de usar esos datos?",
        "opciones": [
          "Ninguna, porque los datos ya fueron recopilados por la empresa para otro fin",
          "Solo necesitan anonimizar los nombres de los clientes",
          "Necesitan base legal válida (consentimiento, interés legítimo u otra) para el nuevo tratamiento, e informar a los usuarios si el consentimiento original no cubría el entrenamiento de IA",
          "El GDPR no aplica al entrenamiento de modelos, solo al uso de los datos en producción"
        ],
        "correcta": 2,
        "explicacion_profunda": "El GDPR regula todo tratamiento de datos personales, incluyendo el uso para entrenar modelos de IA. La Autoridad Europea de Protección de Datos ha clarificado que el entrenamiento de modelos con datos personales requiere base legal válida — normalmente consentimiento explícito o interés legítimo demostrable. El consentimiento original para 'resolver soporte al cliente' generalmente no cubre 'entrenar un modelo de IA'. Esto significa que muchos datasets corporativos no pueden usarse legalmente para entrenamiento sin un proceso adicional de información y, en muchos casos, nuevo consentimiento. En sistemas de alto riesgo bajo el EU AI Act, además se requiere documentación del dataset utilizado.",
        "concepto_reforzado": "GDPR y base legal para entrenamiento de modelos con datos personales en Europa"
      },
      {
        "pregunta": "¿Por qué \"más datos siempre es mejor\" es una afirmación incorrecta en el contexto del entrenamiento de modelos de IA?",
        "opciones": [
          "Porque los modelos actuales tienen límite de parámetros y no pueden absorber más datos",
          "Porque datos de baja calidad, ruidosos o sesgados pueden degradar el rendimiento del modelo y amplificar sesgos, haciendo que un dataset más pequeño y curado supere a uno masivo sin filtrar",
          "Porque más datos siempre aumentan el overfitting del modelo",
          "Porque el almacenamiento de datos es prohibitivamente caro a gran escala"
        ],
        "correcta": 1,
        "explicacion_profunda": "El principio de 'más datos es mejor' asume que todos los datos son igualmente informativos y libres de sesgo — lo cual rara vez es cierto. Datos ruidosos (errores, spam, contenido irrelevante) aumentan el tiempo de entrenamiento sin mejorar la calidad. Datos sesgados amplifican ese sesgo en el modelo: si los datos de entrenamiento sobrerrepresentan ciertos grupos demográficos, el modelo aprenderá y reproducirá esos sesgos. El movimiento de 'data-centric AI' defiende que invertir en calidad de datos produce mejoras de rendimiento mayores que escalar el modelo. Phi-3 de Microsoft demostró esto: un modelo de 3.8B parámetros entrenado con datos de alta calidad superó a modelos mucho más grandes en varios benchmarks.",
        "concepto_reforzado": "Calidad vs cantidad en datasets: por qué la curaduría importa más que el volumen"
      }
    ],
    "practica": {
      "tipo": "caso_real",
      "contexto": "Eres AI Engineer en una empresa de seguros con sede en España. El CTO quiere construir un chatbot que responda preguntas de clientes sobre sus pólizas usando los documentos internos de la empresa. Los datos de pólizas contienen información personal de clientes (nombre, datos de salud, situación financiera). El equipo propone usar fine-tuning con esos datos.",
      "instruccion": "Diseña una arquitectura alternativa que logre el objetivo sin exponer datos personales de clientes, y explica las razones técnicas y legales por las que tu propuesta es superior al fine-tuning con datos personales.",
      "input_malo": "Fine-tunearíamos el modelo con todos los documentos de pólizas para que aprenda el lenguaje de la empresa.",
      "pista": "Pregúntate: ¿qué necesita el chatbot para responder bien? ¿Necesita recordar los datos de cada cliente, o solo entender el lenguaje y las reglas de la empresa? ¿Existe una técnica que permite al modelo acceder a documentos en tiempo real sin memorizarlos durante el entrenamiento?",
      "solucion": "La arquitectura correcta es RAG con documentos anonimizados o no-personales: (1) Separar los documentos en dos categorías: documentos de política general (coberturas, condiciones, precios) que no contienen datos personales, y datos de póliza individual de cada cliente que sí contienen datos sensibles. (2) Indexar solo los documentos de política general en la base vectorial. (3) Para consultas sobre la póliza específica de un cliente, recuperar los datos de esa póliza desde el sistema CRM con autenticación verificada, y pasarlos como contexto en tiempo real al modelo. (4) Ventajas GDPR: los datos personales nunca se usan para entrenamiento (sin base legal problemática), los documentos en la base vectorial pueden actualizarse sin reentrenamiento, y hay trazabilidad clara de qué información usó el modelo para cada respuesta.",
      "criterios_de_exito": [
        "Propones RAG en lugar de fine-tuning con datos personales",
        "Distingues entre documentos de política general y datos personales de clientes",
        "Mencionas el problema GDPR del fine-tuning con datos personales",
        "Describes cómo manejar las consultas sobre pólizas individuales de forma segura",
        "La solución es técnicamente implementable con herramientas reales (pgvector, Pinecone, etc.)"
      ]
    },
    "conexion": {
      "siguiente_concepto": "Claude, GPT, Gemini, LLaMA, Mistral: análisis comparativo real",
      "por_que_importa_despues": "El Bloque 6 analiza los modelos de lenguaje líderes con criterios concretos. Con el conocimiento de datos del B5, ahora puedes evaluar cómo las decisiones de datos de entrenamiento de cada modelo afectan sus capacidades, sesgos y limitaciones."
    }
  }
};

// ─────────────────────────────────────────────
// B6 — BIENVENIDA (l0)
// ─────────────────────────────────────────────
const b6Bienvenida = {
  "id": "m1-b6-l0",
  "titulo": "Bienvenida al Bloque 6: El mapa real de modelos en producción",
  "bloque": 6,
  "tipo": "bienvenida",
  "duracion_min": 10,
  "xp": 25,
  "contenido": {
    "teoria": {
      "explicacion": "Los rankings de modelos de IA son uno de los contenidos más consumidos en LinkedIn y Twitter. También son, frecuentemente, los más engañosos.\n\nLos benchmarks de marketing muestran el modelo en condiciones ideales, en las tareas para las que fue optimizado. Lo que los profesionales necesitan es diferente: saber qué modelo usar para su caso concreto, con sus datos reales, su presupuesto real y sus requisitos de privacidad y latencia.\n\nEste bloque te da ese mapa. Analizarás en profundidad los modelos de lenguaje que dominan producción en 2026: Claude de Anthropic, la familia GPT de OpenAI, Gemini de Google, LLaMA de Meta, y Mistral — el modelo europeo que demostró que no es necesario ser una megacorporación para competir en el frente open source.\n\nTambién evaluarás los modelos de imagen más usados, los benchmarks estándar de la industria y desarrollarás un framework propio para comparar modelos con criterio técnico, no según el marketing de turno.\n\nAl terminar, sabrás exactamente qué preguntar — y qué responder — antes de elegir cualquier modelo para un proyecto.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "El mapa de modelos en producción es una de las habilidades más valoradas en consultoría de IA. Quien puede recomendar el modelo correcto con justificación técnica — y sabe cuándo rechazar el 'modelo de moda' — es el profesional al que todos llaman.",
      "tip_profesional": null
    },
    "verificacion": [],
    "practica": {
      "tipo": "reflexion",
      "contexto": "Antes de empezar el bloque, activa tus criterios actuales para elegir modelos.",
      "instruccion": "¿Cuáles son los tres criterios más importantes para ti al elegir un modelo de IA para un proyecto? Lístaloos y ordénalos por importancia. Al terminar el bloque, revisa si tu ranking cambió y por qué.",
      "input_malo": null,
      "pista": "Piensa en situaciones reales o hipotéticas: un cliente con datos sensibles, una startup con presupuesto limitado, una empresa en Europa que debe cumplir con el GDPR. ¿Qué cambiaría en tu decisión?",
      "solucion": "Al terminar B6 tu framework de decisión considerará: (1) Requisitos de privacidad y regulación — ¿los datos pueden salir de la empresa o del país? (2) Calidad para la tarea específica — no en general, sino en tu caso de uso concreto. (3) Costo por token a la escala proyectada. (4) Latencia de inferencia para tu caso de uso. (5) Capacidad de despliegue local vs. dependencia de API externa. (6) Madurez del ecosistema y soporte a largo plazo.",
      "criterios_de_exito": [
        "Listaste al menos tres criterios",
        "Los ordenaste por importancia según tu contexto actual",
        "Guardaste la lista para compararla al terminar el bloque"
      ]
    },
    "conexion": {
      "siguiente_concepto": "Claude (Anthropic): fortalezas y casos de uso reales",
      "por_que_importa_despues": "La primera lección del bloque analiza el modelo que ya estás usando en este curso — con criterio técnico real, no publicidad. Entender sus fortalezas y limitaciones te convierte en un usuario más efectivo desde el primer día."
    }
  }
};

// ─────────────────────────────────────────────
// B6 — RECAP (l11)
// ─────────────────────────────────────────────
const b6Recap = {
  "id": "m1-b6-l11",
  "titulo": "Recapitulación B6: El framework para elegir modelos que no envejece",
  "bloque": 6,
  "tipo": "recapitulacion",
  "duracion_min": 15,
  "xp": 75,
  "contenido": {
    "teoria": {
      "explicacion": "Completaste el análisis del ecosistema de modelos en producción — uno de los bloques más útiles para el trabajo diario de un AI Engineer o consultor.\n\nAnalizaste los modelos de lenguaje líderes con criterios concretos: Claude destaca en seguimiento de instrucciones complejas y razonamiento extenso; GPT-4o en velocidad y multimodalidad nativa; Gemini en integración con el ecosistema Google y contexto ultra-largo; LLaMA en despliegue local y fine-tuning sin restricciones de licencia; Mistral en eficiencia extrema — mínimo de parámetros para máximo rendimiento.\n\nEl caso Mistral merece atención especial. Una startup europea demostró que con datos de calidad, arquitectura eficiente y una política open source deliberada, se puede competir con empresas con cien veces más recursos. Para equipos europeos que deben cumplir con el GDPR, Mistral es frecuentemente la opción correcta: puede desplegarse localmente dentro de la UE sin transferir datos a servidores en terceros países.\n\nAprendiste a interpretar benchmarks con criterio real: MMLU mide conocimiento general, HumanEval mide código, HELM provee evaluación holística. Pero ningún benchmark reemplaza la evaluación en tus datos reales y tu tarea específica. Los leaderboards pueden inflarse mediante saturación en benchmarks públicos.\n\nEl framework que construiste: define la tarea, los requisitos de privacidad, latencia, calidad y costo, el contexto de despliegue, y luego — solo entonces — elige el modelo. Ningún modelo es universalmente mejor; el mejor es el que resuelve tu problema concreto.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "Este framework te separa de los profesionales que siguen titulares de prensa. Puedes argumentar por qué el modelo de moda no es el correcto para un caso específico — con datos y criterios, no con opiniones.",
      "tip_profesional": "Sigue LMSYS Chatbot Arena para rankings actualizados basados en preferencias humanas reales, no benchmarks de laboratorio. Para comparar modelos en tu caso de uso concreto, usa los playgrounds de Anthropic, OpenAI y Google con tus propios prompts — la única evaluación que importa es la tuya."
    },
    "verificacion": [
      {
        "pregunta": "¿Por qué Mistral es frecuentemente la elección preferida para empresas europeas que manejan datos personales bajo GDPR?",
        "opciones": [
          "Porque Mistral tiene la mejor puntuación en todos los benchmarks de lenguaje",
          "Porque es gratuito para uso comercial sin restricciones",
          "Porque puede desplegarse localmente dentro de la UE, evitando transferencias de datos a terceros países fuera del Espacio Económico Europeo, y es open source con licencia permisiva",
          "Porque el gobierno francés lo exige para empresas europeas por normativa local"
        ],
        "correcta": 2,
        "explicacion_profunda": "El GDPR restringe severamente las transferencias de datos personales fuera del Espacio Económico Europeo (EEE). Cuando una empresa europea usa una API de un proveedor estadounidense (OpenAI, Anthropic, Google), los datos que envía en los prompts pueden procesarse en servidores fuera de la UE, lo que requiere mecanismos legales adicionales (Standard Contractual Clauses, etc.) y añade riesgo regulatorio. Mistral, al ser open source con licencia Apache 2.0, puede desplegarse completamente en infraestructura dentro de la UE: los datos nunca salen del territorio europeo. Esto simplifica el cumplimiento del GDPR y hace a Mistral la opción de menor fricción legal para muchos casos de uso en Europa.",
        "concepto_reforzado": "GDPR, transferencias internacionales de datos y modelos open source desplegados localmente"
      },
      {
        "pregunta": "Un benchmark muestra que el Modelo A supera al Modelo B en MMLU con 82% vs 79%. ¿Qué conclusión es técnicamente correcta?",
        "opciones": [
          "El Modelo A es mejor y debería usarse en todos los proyectos nuevos",
          "El Modelo A tiene mayor conocimiento general en las categorías evaluadas por MMLU, pero esto no predice necesariamente mejor rendimiento en tu tarea específica, tus datos reales o bajo tus restricciones de latencia y costo",
          "El Modelo B ha sido manipulado y no es confiable",
          "La diferencia de 3 puntos no es estadísticamente significativa y ambos modelos son equivalentes en todo"
        ],
        "correcta": 1,
        "explicacion_profunda": "MMLU (Massive Multitask Language Understanding) evalúa conocimiento general en 57 dominios académicos en inglés. Una ventaja en MMLU significa mejor rendimiento en ese benchmark específico — no necesariamente en tu caso de uso. Si tu aplicación es generación de código en Python, HumanEval es más relevante. Si es razonamiento matemático, GSM8K. Si es seguimiento de instrucciones complejas en español, ningún benchmark estándar cubre bien tu caso. Además, los benchmarks públicos tienen el problema del 'data contamination': modelos que fueron entrenados con datos que incluyen las respuestas del benchmark obtienen ventajas artificiales. La evaluación en tu tarea real con tus datos es siempre el criterio definitivo.",
        "concepto_reforzado": "Limitaciones de los benchmarks públicos y por qué la evaluación específica es irreemplazable"
      },
      {
        "pregunta": "¿Cuál es el criterio más importante al elegir entre un modelo de lenguaje propietario (Claude, GPT) y uno open source (LLaMA, Mistral) para un sistema en producción?",
        "opciones": [
          "El número de parámetros del modelo, ya que más parámetros siempre significa mejor calidad",
          "La popularidad del modelo medida por menciones en Twitter y LinkedIn",
          "Los requisitos específicos del proyecto: privacidad de datos, capacidad de despliegue local, nivel de calidad requerido y costo total a la escala proyectada",
          "El año de lanzamiento del modelo, ya que los más recientes siempre son superiores"
        ],
        "correcta": 2,
        "explicacion_profunda": "No existe el modelo universalmente mejor. Los propietarios ofrecen generalmente mejor rendimiento out-of-the-box, SLAs garantizados y no requieren infraestructura propia, pero los datos se procesan en servidores del proveedor (implicaciones GDPR en Europa) y el costo escala con el uso. Los open source permiten despliegue local (los datos nunca salen de la empresa), fine-tuning sin restricciones y costos de inferencia muy bajos a escala, pero requieren infraestructura propia y personal técnico para mantenerlos. Para datos médicos, legales o financieros con restricciones regulatorias fuertes, el open source local puede ser la única opción viable. Para una startup sin infraestructura, la API propietaria puede ser más práctica. El framework correcto evalúa estos factores contra los requisitos reales del proyecto.",
        "concepto_reforzado": "Framework de decisión: propietario vs open source según requisitos reales del proyecto"
      }
    ],
    "practica": {
      "tipo": "caso_real",
      "contexto": "Eres consultora de IA independiente. Un bufete de abogados en Madrid te contrata para diseñar un asistente de IA que analice contratos y extraiga cláusulas clave. Los contratos contienen información altamente confidencial de clientes. El CTO sugiere usar la API de GPT-4o porque 'es el más famoso'. El presupuesto mensual es de 2.000€ para IA.",
      "instruccion": "Evalúa la propuesta del CTO y presenta una recomendación alternativa si corresponde. Usa el framework de criterios del bloque: privacidad, calidad, costo, latencia y despliegue.",
      "input_malo": "Usaría GPT-4o porque es el más conocido y fiable del mercado.",
      "pista": "¿Puede un bufete de abogados enviar contratos confidenciales de clientes a servidores de Microsoft/OpenAI en Estados Unidos? ¿Qué implicaciones tiene el GDPR y el secreto profesional? ¿Existe una alternativa que procese los datos dentro de la UE o localmente?",
      "solucion": "La propuesta del CTO tiene problemas críticos: (1) Privacidad/GDPR: enviar contratos confidenciales a la API de OpenAI implica transferir datos personales a servidores en EE.UU. El GDPR requiere mecanismos de transferencia adicionales y el secreto profesional del abogado puede prohibirlo directamente según la jurisdicción. (2) Recomendación alternativa: Mistral Large desplegado en infraestructura propia (o en un proveedor cloud europeo como OVHcloud, Hetzner o Azure región europea) — los datos nunca salen de la UE, el secreto profesional se preserva. (3) Si el cliente insiste en API externa, la única opción válida es Anthropic Claude con procesamiento de datos en EU (revisar DPA de Anthropic) o Azure OpenAI con región configurada en Europa. (4) Costo: con 2.000€/mes se puede cubrir tanto el despliegue local de Mistral como el uso de API externa con volumen moderado.",
      "criterios_de_exito": [
        "Identificas el problema de privacidad y GDPR con GPT-4o API para datos legales confidenciales",
        "Propones Mistral u otra alternativa open source con despliegue local en UE",
        "Mencionas el secreto profesional como restricción adicional a la privacidad GDPR",
        "Evalúas el costo dentro del presupuesto disponible",
        "La propuesta es técnicamente implementable con herramientas reales disponibles en 2026"
      ]
    },
    "conexion": {
      "siguiente_concepto": "Cómo medir si un modelo realmente funciona: métricas de evaluación",
      "por_que_importa_despues": "El Bloque 7 te da las herramientas para evaluar con rigor los modelos que acabas de mapear. Saber elegir un modelo es solo el primer paso — saber medir si está funcionando correctamente es lo que garantiza calidad en producción."
    }
  }
};

// ─────────────────────────────────────────────
// B7 — BIENVENIDA (l0)
// ─────────────────────────────────────────────
const b7Bienvenida = {
  "id": "m1-b7-l0",
  "titulo": "Bienvenida al Bloque 7: Cómo saber si un modelo realmente funciona",
  "bloque": 7,
  "tipo": "bienvenida",
  "duracion_min": 10,
  "xp": 25,
  "contenido": {
    "teoria": {
      "explicacion": "Cualquiera puede decir que su modelo de IA es 'preciso' o 'inteligente'. La pregunta profesional es: ¿cómo lo demuestras con datos?\n\nLa evaluación de modelos es una de las habilidades más subestimadas y más valiosas del ecosistema de IA. Los equipos que saben evaluar correctamente detectan problemas antes de que lleguen a producción, eligen modelos con criterio real en lugar de seguir el hype, y pueden comunicar limitaciones con honestidad técnica a clientes y stakeholders.\n\nEn este bloque aprenderás el lenguaje técnico de la evaluación: accuracy, precision, recall y F1, y cuándo cada métrica importa más. Entenderás los benchmarks estándar de la industria — MMLU, HumanEval, HELM — y sus limitaciones reales. Explorarás la tensión entre evaluación humana y automática, el problema del overfitting y underfitting, y cómo detectar sesgos sistemáticos.\n\nTerminarás con evaluación continua en producción: cómo saber que tu modelo sigue funcionando correctamente semanas y meses después del lanzamiento.\n\nAl terminar, tendrás el vocabulario y los criterios para auditar cualquier sistema de IA con rigor real.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "Saber evaluar modelos con rigor es lo que separa al profesional que puede auditar un sistema de IA del que solo puede usarlo. En el contexto del EU AI Act, esta habilidad es cada vez más una exigencia legal para sistemas de alto riesgo, no solo una buena práctica.",
      "tip_profesional": null
    },
    "verificacion": [],
    "practica": {
      "tipo": "reflexion",
      "contexto": "Antes de empezar el bloque, activa tu intuición sobre evaluación de sistemas de IA.",
      "instruccion": "¿Cómo evaluarías si un chatbot de atención al cliente está haciendo su trabajo correctamente? Describe 2-3 métricas o criterios que usarías, sin buscar definiciones técnicas. Al terminar el bloque, compara tu respuesta con el framework que habrás construido.",
      "input_malo": null,
      "pista": "Piensa en diferentes tipos de errores: responder mal a una pregunta sencilla vs. no responder a una pregunta difícil. ¿Cuál es peor en el contexto de atención al cliente? ¿Cómo medirías la satisfacción del usuario vs. la corrección técnica?",
      "solucion": "Al terminar B7 evaluarías un chatbot de atención al cliente con: (1) Precision en intenciones detectadas: cuando el bot dice que puede resolver algo, ¿lo resuelve? (2) Recall de casos resueltos: ¿qué porcentaje de problemas reales resuelve correctamente? (3) CSAT (Customer Satisfaction Score) como evaluación humana. (4) Tasa de escalado a agente humano: demasiado bajo puede indicar falsa confianza; demasiado alto, un bot inútil. (5) Monitoreo de distribución de consultas en producción: si cambia, puede indicar degradación.",
      "criterios_de_exito": [
        "Propusiste al menos dos criterios de evaluación diferentes",
        "Consideraste tanto métricas automáticas como satisfacción del usuario",
        "Guardaste la respuesta para compararla al terminar el bloque"
      ]
    },
    "conexion": {
      "siguiente_concepto": "Cómo medir si un modelo realmente es bueno",
      "por_que_importa_despues": "La primera lección establece el problema central de la evaluación: por qué las métricas simples engañan y por qué necesitamos un framework más sofisticado para evaluar sistemas de IA en contextos reales."
    }
  }
};

// ─────────────────────────────────────────────
// B7 — RECAP (l9)
// ─────────────────────────────────────────────
const b7Recap = {
  "id": "m1-b7-l9",
  "titulo": "Recapitulación B7: El criterio técnico para evaluar cualquier sistema de IA",
  "bloque": 7,
  "tipo": "recapitulacion",
  "duracion_min": 15,
  "xp": 75,
  "contenido": {
    "teoria": {
      "explicacion": "Completaste el bloque de evaluación — una de las habilidades más diferenciadoras para cualquier profesional de IA en 2026.\n\nAprendiste que accuracy sola es engañosa. Un clasificador de fraude que predice 'no fraude' siempre alcanza 99% de accuracy en datasets donde el 99% de los casos son legítimos — y es completamente inútil. Precision mide qué porcentaje de tus predicciones positivas son correctas. Recall mide qué porcentaje de los positivos reales detectaste. F1 balancea ambas. La elección depende del costo de los errores: en diagnóstico médico, un falso negativo puede costar una vida; en filtros de spam, un falso positivo (correo legítimo marcado como spam) puede costar un cliente.\n\nLos benchmarks industriales — MMLU, HumanEval, HELM — son útiles como filtro inicial, pero miden rendimiento en condiciones de laboratorio. La evaluación que importa es la que haces con tus datos reales y tu tarea específica. Los leaderboards pueden distorsionarse mediante overfitting en benchmarks públicos — un problema documentado en la industria.\n\nLa evaluación en producción es diferente y más compleja: la distribución de consultas cambia con el tiempo, el modelo puede degradarse silenciosamente, y los usuarios encuentran casos de uso que no anticipaste. Monitoring continuo con métricas automatizadas y revisión humana periódica es la única garantía de calidad sostenida.\n\nEn Europa, el EU AI Act exige documentación de evaluación para sistemas de IA de alto riesgo — incluyendo sistemas de RRHH, crédito financiero y servicios esenciales. Esto convierte la evaluación rigurosa en una obligación legal con consecuencias regulatorias concretas, no solo una buena práctica de ingeniería.",
      "analogia": null,
      "ejemplo_malo": null,
      "ejemplo_bueno": null,
      "por_que_importa": "Con este bloque puedes auditar la calidad de cualquier sistema de IA — propio o de un proveedor externo. En un contexto donde las organizaciones son legalmente responsables de los sistemas de IA que despliegan, este criterio técnico es un activo profesional de primer orden.",
      "tip_profesional": "Ragas es el framework open source de referencia para evaluar sistemas RAG. Para trazabilidad en producción, LangSmith y Weights & Biases son los estándares actuales. Para evaluación humana escalable, Argilla combina anotación colaborativa con analytics. Empieza con métricas simples y automatizadas — añade evaluación humana solo para los casos límite donde el costo de errores lo justifica."
    },
    "verificacion": [
      {
        "pregunta": "Un sistema de detección de cáncer de piel tiene 97% de accuracy pero su médico responsable lo rechaza. ¿Por qué es técnicamente correcto rechazarlo si la accuracy es tan alta?",
        "opciones": [
          "Porque 97% no es suficientemente alto para cualquier aplicación médica",
          "Porque si el dataset tiene 97% de casos benignos y 3% de malignos, el modelo puede alcanzar esa accuracy prediciendo siempre 'benigno', lo que significa 0% de recall en cáncer — todos los casos malignos pasan desapercibidos",
          "Porque la accuracy no se usa en medicina, solo el F1",
          "Porque el modelo necesita al menos 99.9% de accuracy para aplicaciones médicas por regulación"
        ],
        "correcta": 1,
        "explicacion_profunda": "Este es el caso clásico de accuracy paradox: en datasets desbalanceados, un clasificador trivial (que siempre predice la clase mayoritaria) puede tener accuracy muy alta pero recall cero en la clase minoritaria. Para un sistema de detección de cáncer, el recall es la métrica crítica: detectar todos los casos malignos posibles (minimizar falsos negativos) es prioritario, incluso a costa de más falsos positivos (casos benignos enviados a biopsia). En la práctica, los sistemas médicos se evalúan con curvas ROC, AUC y sensitivity/specificity — no con accuracy. El EU AI Act clasifica sistemas médicos de diagnóstico como de alto riesgo y exige evaluación rigurosa documentada antes del despliegue.",
        "concepto_reforzado": "Accuracy paradox: por qué recall supera a accuracy en clases desbalanceadas de alto impacto"
      },
      {
        "pregunta": "¿Cuál es el principal problema de usar únicamente benchmarks públicos como MMLU o HumanEval para elegir un modelo en producción?",
        "opciones": [
          "Los benchmarks públicos están desactualizados y no incluyen modelos lanzados en 2025-2026",
          "Solo miden inglés y no son útiles para proyectos en español",
          "Los modelos pueden haber sido entrenados con datos que incluyen las respuestas del benchmark (data contamination), y el rendimiento en el benchmark no predice necesariamente el rendimiento en tu tarea y datos específicos",
          "Los benchmarks públicos son demasiado difíciles y ningún modelo moderno los supera"
        ],
        "correcta": 2,
        "explicacion_profunda": "Data contamination es un problema documentado y grave: si los datos de preentrenamiento de un modelo incluyen los pares pregunta-respuesta de un benchmark, el modelo obtiene ventaja artificial en ese benchmark sin haber 'aprendido' realmente. Esto distorsiona los rankings. El segundo problema es la generalización: MMLU mide conocimiento académico general en inglés — un modelo que lidera MMLU puede ser mediocre generando SQL en PostgreSQL, redactando contratos legales en español o analizando código Python con patrones específicos de tu empresa. La única evaluación que importa es la que haces con tus prompts reales, tus datos reales y tus criterios de calidad reales.",
        "concepto_reforzado": "Data contamination en benchmarks y por qué la evaluación específica es irreemplazable"
      },
      {
        "pregunta": "¿Qué obligación impone el EU AI Act a las empresas que despliegan sistemas de IA clasificados como 'alto riesgo' en relación con la evaluación?",
        "opciones": [
          "Solo deben evaluar el sistema una vez antes del lanzamiento inicial",
          "Deben publicar los resultados de evaluación en un registro europeo público y actualizado",
          "Deben documentar la evaluación de riesgos, mantener logs de funcionamiento, implementar supervisión humana y realizar evaluaciones continuas post-despliegue; la documentación debe estar disponible para las autoridades regulatorias",
          "Solo aplica a sistemas usados por gobiernos, no a empresas privadas"
        ],
        "correcta": 2,
        "explicacion_profunda": "El EU AI Act (en vigor progresivo desde 2024-2026) clasifica sistemas de IA según su riesgo. Los de alto riesgo — que incluyen sistemas de RRHH (contratación, evaluación de empleados), crédito financiero, educación y formación, infraestructuras críticas y servicios esenciales — deben cumplir obligaciones estrictas antes y después del despliegue: documentación técnica completa incluyendo el dataset de entrenamiento, gestión de calidad, registro de eventos (logs), supervisión humana efectiva, evaluaciones de robustez y sesgo, y monitoreo post-despliegue. El incumplimiento puede resultar en multas de hasta 30 millones de euros o el 6% de la facturación global anual. Esto convierte la evaluación rigurosa de sistemas de IA en una obligación legal con consecuencias económicas concretas en el mercado europeo.",
        "concepto_reforzado": "EU AI Act: obligaciones de evaluación para sistemas de alto riesgo en Europa"
      }
    ],
    "practica": {
      "tipo": "caso_real",
      "contexto": "Una empresa de recursos humanos en Barcelona ha desplegado un sistema de IA que filtra CVs para posiciones de ingeniería. El sistema rechaza automáticamente el 60% de las candidaturas. El equipo legal te alerta: bajo el EU AI Act, este sistema es de alto riesgo. La dirección quiere saber si el sistema funciona bien y si están en cumplimiento regulatorio.",
      "instruccion": "Diseña un plan de evaluación para este sistema. Define qué métricas usarías, cómo detectarías sesgos, qué documentación necesitas producir para el regulador, y qué supervisión humana implementarías.",
      "input_malo": "El sistema funciona bien porque acepta a los mejores candidatos con las mejores puntuaciones de los tests.",
      "pista": "Piensa en tres dimensiones: (1) ¿El sistema es preciso — rechaza por razones técnicas válidas o está sesgado? (2) ¿Cumple el EU AI Act — tienes la documentación que exige? (3) ¿Hay supervisión humana efectiva o el rechazo es completamente automático?",
      "solucion": "Plan de evaluación completo: (1) Métricas de sesgo: analizar tasas de rechazo por género, edad, nombre (proxy de etnia), universidad de origen y año de graduación. Una diferencia estadísticamente significativa en tasas de rechazo entre grupos es evidencia de sesgo indirecto prohibido por el GDPR y el EU AI Act. (2) Validación de criterios: ¿los criterios de rechazo están documentados y son objetivamente relevantes para el puesto? Pedir explicabilidad del sistema — por qué rechazó a cada candidato. (3) Documentación EU AI Act: registro de datos de entrenamiento, evaluación de riesgos, logs de decisiones, política de supervisión humana. (4) Supervisión humana: los rechazos automáticos del 60% son problemáticos — implementar revisión humana para al menos el 10-20% de los casos rechazados por muestreo aleatorio, y revisión obligatoria para cualquier candidato que impugne la decisión. (5) Monitoreo continuo: revisar tasas de sesgo mensualmente y tras cada actualización del sistema.",
      "criterios_de_exito": [
        "Propones análisis de sesgo por grupos demográficos específicos",
        "Mencionas la obligación de explicabilidad del sistema bajo el EU AI Act",
        "Incluyes documentación regulatoria requerida (logs, evaluación de riesgos)",
        "Diseñas supervisión humana efectiva, no meramente simbólica",
        "El plan es implementable con herramientas reales sin rediseñar el sistema completo"
      ]
    },
    "conexion": {
      "siguiente_concepto": "GPUs, TPUs y la infraestructura que hace posible la IA",
      "por_que_importa_despues": "El Bloque 8 completa el mapa de cómo funciona la IA en producción: después de saber cómo evaluar modelos, aprenderás la infraestructura que los ejecuta — hardware, cloud vs local, costos reales y decisiones de despliegue."
    }
  }
};

// ─────────────────────────────────────────────
// INSERTAR LAS LECCIONES EN EL JSON
// ─────────────────────────────────────────────
const b5 = data.bloques.find(b => b.numero === 5);
const b6 = data.bloques.find(b => b.numero === 6);
const b7 = data.bloques.find(b => b.numero === 7);

// B5: agregar l0 al inicio y l11 al final
b5.lecciones.unshift(b5Bienvenida);
b5.lecciones.push(b5Recap);

// B6: agregar l0 al inicio y l11 al final
b6.lecciones.unshift(b6Bienvenida);
b6.lecciones.push(b6Recap);

// B7: agregar l0 al inicio y l9 al final
b7.lecciones.unshift(b7Bienvenida);
b7.lecciones.push(b7Recap);

// Guardar
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✓ B5 lecciones:', b5.lecciones.length, '(l0 + l1-l10 + l11)');
console.log('✓ B6 lecciones:', b6.lecciones.length, '(l0 + l1-l10 + l11)');
console.log('✓ B7 lecciones:', b7.lecciones.length, '(l0 + l1-l8 + l9)');
console.log('✓ Total bloques:', data.bloques.length);
console.log('Guardado en:', filePath);
