#!/usr/bin/env node
/**
 * Reestructura B4, B5, B6 en 3 segmentos conceptuales por lección.
 * Formato igual que B0-B3:
 *   Seg 1 — EL CONCEPTO: 60-80w
 *   Seg 2 — EL EJEMPLO: caso europeo concreto, 60-80w
 *   Seg 3 — LA CONEXIÓN: impacto carrera Europa, 40-60w
 * Separador: \n\n---\n\n
 * l0 (bienvenida): 2 segmentos máximo — no tocar si ya OK
 * l11 (recap): no tocar
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../src/content/m1/index.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const SEP = '\n\n---\n\n';

// ═══════════════════════════════════════════════════════════════════════
// B4 — El ecosistema de modelos de IA en 2026
// ═══════════════════════════════════════════════════════════════════════
const b4Contenido = {

  'l1': `En 2026 existen cuatro grandes familias de LLMs con filosofías distintas. GPT-4o es multimodal nativo (texto, imagen, audio) y lidera en adopción por su ecosistema maduro. Claude destaca en ventana de 200K tokens, seguimiento de instrucciones complejas y Constitutional AI. Gemini integra acceso a Google Search y ventana de 1M tokens. LLaMA es totalmente open source: gratuito para deployment propio y fine-tuning sin restricciones de política.

---

Un banco alemán analiza contratos regulatorios con Claude Sonnet: los 200K tokens permiten procesar pólizas completas sin dividirlas. Una consultora francesa de recursos humanos usa Gemini Flash para clasificar 50.000 CVs al mes: el precio por token —el más bajo del segmento premium— hace rentable el volumen. Mistral Small con servidores en París es la elección de hospitales alemanes que no pueden enviar datos fuera de la UE.

---

En Europa, elegir modelo implica criterios técnicos y regulatorios simultáneamente. El AI Engineer que justifica su elección con latencia, coste por token y cumplimiento GDPR —no solo benchmarks— obtiene los proyectos más estratégicos y genera confianza inmediata con clientes en sectores regulados.`,

  'l2': `Los modelos de generación de imagen dominantes en 2026 siguen cuatro filosofías. DALL-E 3 sigue instrucciones con alta fidelidad —seis perros en un barco rojo aparecen exactamente como se describen—. Midjourney V6 produce la mayor calidad artística pero sin API pública. Stable Diffusion es open source: instálalo localmente, aplica LoRA, genera sin restricciones. Flux.1 combina calidad de Midjourney con el control de instrucciones de DALL-E en versiones open source y API pública.

---

Una agencia de moda de Milán genera 200 variantes de banners de campaña con Flux Pro en 40 minutos, sustituyendo tres horas de trabajo de diseñador. Un e-commerce holandés de muebles crea imágenes de producto en ambientaciones virtuales con Stable Diffusion local: los datos de productos no salen de su infraestructura y el coste por imagen cae a fracciones de céntimo.

---

Los modelos de imagen están transformando el marketing y el e-commerce en Europa. Un AI Engineer que integra generación de imagen en pipelines de producción —no solo como demo sino como flujo automatizado— crea valor medible para clientes con catálogos grandes o necesidades de contenido visual a escala.`,

  'l3': `El ecosistema de audio IA abarca tres áreas con ROI directo. Transcripción: Whisper de OpenAI soporta 99 idiomas con tasa de error menor al 5% en habla clara; corre localmente (gratis) o vía API a 0,006 $/minuto. Síntesis de voz: ElevenLabs clona una voz con 30-60 segundos de audio y produce resultados prácticamente indistinguibles de una voz humana. Generación de música: Suno v4 crea canciones completas —letra, melodía, producción— desde un prompt de texto.

---

Un grupo de medios alemán transcribe automáticamente 8 horas diarias de contenido de radio con Whisper para indexación SEO y archivo. Una empresa de e-learning sueca narra 200 módulos de formación corporativa en cuatro idiomas europeos con ElevenLabs clonando la voz del portavoz de la empresa: coste de locución reducido en un 85%.

---

El audio IA es uno de los campos de mayor adopción empresarial en Europa por su ROI inmediato. Un profesional que construye pipelines de transcripción, análisis de llamadas o generación de narración multilingüe encuentra demanda creciente en sectores de medios, formación corporativa y atención al cliente.`,

  'l4': `Los modelos de video de 2026 tienen cuatro jugadores con capacidades distintas. Sora genera hasta 60 segundos con calidad cinematográfica desde texto. Runway Gen-3 permite Image-to-Video, Video-to-Video y control granular de movimiento: es el estándar de postproducción profesional. Kling AI genera clips de 2 minutos con movimiento de personas especialmente fluido. HeyGen clona a una persona en un avatar digital que habla cualquier texto en cualquier idioma con sincronización labial perfecta.

---

Una productora de contenido corporativo en Londres usa HeyGen para distribuir un único vídeo de 30 minutos en inglés en versiones para Francia, Alemania, España e Italia: un día de trabajo reemplaza tres semanas de grabación y doblaje. Una agencia de publicidad en Ámsterdam crea con Runway anuncios de producto en movimiento sin rodaje: el mismo nivel de un anuncio de televisión en 90 minutos.

---

Los modelos de video están redefiniendo la producción audiovisual en Europa. Constructores de pipelines de generación de video, especialistas en avatares corporativos multilingüe e integradores de Runway en flujos de postproducción son perfiles con alta demanda en agencias y equipos de comunicación europeos.`,

  'l5': `Los modelos de código tienen el ROI más medible en IA: desarrolladores con Copilot completan tareas un 55% más rápido según GitHub. GitHub Copilot se integra en VS Code y JetBrains basado en GPT-4o. Claude Code sobresale en razonamiento de código complejo, arquitectura de sistemas y comprensión de contexto amplio. Cursor AI convierte VS Code en un IDE nativo de IA con edición multi-archivo en un prompt. Devin completa tickets de GitHub de principio a fin: lee, escribe, testea y hace deploy de forma autónoma.

---

Un equipo de ingeniería de una fintech de Dublín migró su backend de Python 2 a Python 3 usando Claude Code: el modelo analizó 120.000 líneas de código, identificó dependencias circulares y propuso refactorizaciones que el equipo validó. Una startup de SaaS en Berlín eliminó un backlog de seis semanas en dos usando Cursor Composer para refactorizar componentes React en toda la base de código simultáneamente.

---

Los modelos de código no son solo herramientas para desarrolladores. En Europa, un AI Engineer que automatiza scripts de procesamiento de datos, construye prototipos de APIs o depura pipelines sin ser desarrollador senior multiplica su valor como consultor y se diferencia de perfiles puramente estratégicos.`,

  'l6': `Un modelo de embedding convierte cualquier texto en un vector numérico: textos similares quedan cerca en el espacio vectorial. text-embedding-3-large de OpenAI tiene 3.072 dimensiones y cuesta 0,13 $/M tokens. text-embedding-004 de Google se integra con Vertex. multilingual-e5-large de Microsoft y bge-m3 de BAAI son los mejores modelos open source multilingüe en 2026 —gratuitos y desplegables localmente, superiores para español, francés y alemán.

---

El Bundesarchiv alemán indexa 4 millones de documentos históricos con bge-m3 y pgvector sobre Postgres: búsquedas que antes requerían conocer terminología exacta del siglo XIX ahora responden a lenguaje natural moderno. Una plataforma legal de Londres usa Cohere Multilingual para detectar cláusulas contractuales duplicadas entre 200.000 contratos: reduce revisión manual de semanas a horas.

---

Los embeddings son la infraestructura invisible de los sistemas RAG, búsqueda semántica y recomendación empresarial. En Europa, donde los datos son multilingüe por defecto, dominar modelos de embedding multilingüe y bases de datos vectoriales como pgvector o Qdrant es una ventaja técnica directa en proyectos reales.`,

  'l7': `Los modelos multimodales procesan combinaciones de texto, imagen, audio y video en un solo modelo. GPT-4o es el más maduro: texto, imagen y audio nativo en una llamada. Claude 3.5 Sonnet con visión sobresale en análisis de documentos escaneados, gráficas de datos y diagramas técnicos —razonamiento visual de alta precisión—. Gemini 1.5 Pro puede procesar vídeos completos de una hora y responder preguntas sobre el contenido. Los modelos 'computer use' de Anthropic controlan un ordenador visualmente: ven la pantalla y ejecutan acciones.

---

Una aseguradora suiza usa Claude con visión para procesar 3.000 partes de accidente escaneados al día: extrae datos estructurados —fecha, tipo de daño, importe— directamente de PDFs fotografiados, eliminando entrada manual. Un fabricante de automóviles alemán conecta cámaras de línea de producción a GPT-4o para inspección visual de calidad en tiempo real: detecta defectos que el ojo humano no identifica a 120 piezas por minuto.

---

La multimodalidad expande el alcance del AI Engineer hacia sectores de manufactura, seguros, salud y legal en Europa. Quienes saben construir pipelines que combinan visión, texto y acción —no solo LLMs de texto— acceden a proyectos de mayor complejidad y presupuesto.`,

  'l8': `Los modelos de razonamiento generan una cadena de pensamiento interna antes de responder: exploran múltiples caminos, hacen backtracking y verifican su propia lógica. OpenAI o1 fue el primero en demostrarlo: 95° percentil en matemáticas de competencia. DeepSeek R1 —open source de China— alcanza resultados comparables a una fracción del coste. Gemini 2.0 Thinking y Claude con pensamiento extendido de Anthropic completan el panorama en 2026. Son más lentos y caros que los modelos estándar.

---

Un despacho de abogados de Frankfurt usa o1 para analizar contratos con múltiples cláusulas condicionales interdependientes: reduce de 4 horas a 35 minutos el análisis de contratos de M&A complejos. Una empresa de auditoría contable en Ámsterdam usa DeepSeek R1 on-premise para revisar declaraciones fiscales con reglas NIIF complejas: los datos no salen del servidor y el coste por análisis es un 80% menor que con la API de OpenAI.

---

Saber cuándo usar razonamiento extendido —y cuándo no— es una habilidad diferenciadora. En Europa, los sectores legal, financiero y regulatorio tienen casos de uso naturales para estos modelos. Un AI Engineer que los integra correctamente en flujos de trabajo reales —no como experimento— añade un valor que justifica honorarios de consultoría premium.`,

  'l9': `Los modelos propietarios (Claude, GPT-4o, Gemini) se acceden vía API: sin infraestructura propia, actualizaciones automáticas, soporte técnico del proveedor. Pero los datos salen de tu infraestructura y hay dependencia del proveedor. Los modelos open source (LLaMA, Mistral, DeepSeek) se despliegan en tu infraestructura: datos que nunca salen, fine-tuning sin restricciones, sin coste de API. Pero requieren equipo técnico para operar GPUs y las actualizaciones son manuales.

---

Un hospital universitario de Múnich usa Llama 4 desplegado en su propio clúster de GPUs para análisis de informes clínicos: los datos de pacientes nunca salen de la infraestructura del hospital, cumpliendo DSGVO (GDPR alemán). Una startup de SaaS de Varsovia usa Claude API para su producto: cero infraestructura GPU, actualizaciones automáticas y SLA garantizado le permiten enfocarse en producto en lugar de operaciones.

---

La elección open source vs propietario es una decisión de arquitectura con consecuencias legales en Europa. El GDPR convierte la residencia de datos en un requisito no negociable para sectores de salud, banca y educación. Un AI Engineer que entiende esta dimensión —no solo la técnica— es el que lidera decisiones de arquitectura con clientes europeos.`,

  'l10': `Con más de 100 modelos disponibles en 2026, el framework de 5 dimensiones evita decisiones por marketing. (1) TIPO DE TAREA: texto, imagen, audio, video, código o multimodal —filtra el 70% de candidatos—. (2) CALIDAD MÍNIMA: ¿estado del arte o 'suficientemente bueno'? (3) LATENCIA Y THROUGHPUT: ¿respuesta en <1s o puede tardar 30s? (4) PRIVACIDAD: ¿los datos pueden salir de la infraestructura? (5) COSTE: calcula el precio real para tu volumen específico.

---

Un retailer de moda en Madrid evalúa tres modelos para clasificar 80.000 SKUs: Gemini Flash gana por coste (0,075 $/M tokens), latencia aceptable para proceso batch nocturno y calidad suficiente en clasificación de categorías. Una fintech de Estocolmo elige Claude Sonnet para revisar contratos de crédito: ventana de 200K tokens y razonamiento legal justifican el coste premium frente al ahorro de tiempo del equipo legal.

---

En Europa, el framework de selección de modelo debe incluir siempre la dimensión regulatoria: datos fuera de la UE, servidores en terceros países y SLAs con proveedores no europeos son factores que en sectores regulados pueden invalidar una elección técnicamente superior. Documentar la decisión con estos criterios protege al consultor y al cliente.`

};

// ═══════════════════════════════════════════════════════════════════════
// B5 — Los datos que dan vida a los modelos
// ═══════════════════════════════════════════════════════════════════════
const b5Contenido = {

  'l1': `"No tenemos mejores algoritmos, tenemos más datos" —Peter Norvig, Google. Este principio sigue vigente en 2026 con matices: la calidad supera a la cantidad en casi todos los proyectos. Los LLMs modernos se preentrenaron en Common Crawl (250TB), Wikipedia, GitHub y papers científicos. El fenómeno 'garbage in, garbage out' es brutal: sesgos en los datos de entrenamiento los hereda el modelo sin excepción. Los mejores modelos con datos malos producen resultados malos.

---

Un banco sueco intentó desplegar un asistente de atención al cliente con Claude fine-tuneado en transcripciones de call center de baja calidad —audio con ruido, sin revisión—. La tasa de satisfacción fue menor que el sistema de menús anterior. Rediseñaron con 800 ejemplos curados por agentes senior: la satisfacción subió 34 puntos porcentuales. El diferencial no fue el modelo —fue la calidad de los datos.

---

En Europa, los datos propios son el activo más valioso de una empresa de IA. El historial de interacciones con clientes, los documentos de proceso y las conversaciones etiquetadas son datos que ningún modelo base tiene. Un AI Engineer que sabe identificar, curar y explotar esos datos construye sistemas que competidores no pueden replicar comprando la misma API.`,

  'l2': `Los datasets históricos revelan qué hace valiosos a los datos. MNIST (1998, Yann LeCun, Bell Labs): 70.000 imágenes de dígitos escritos a mano, perfectamente etiquetadas —el benchmark de visión computacional durante 20 años—. ImageNet (2009, Fei-Fei Li, Stanford): 14 millones de imágenes en 1.000+ categorías etiquetadas por 50.000 personas. AlexNet entrenado con ImageNet redujo el error de clasificación de 26% a 15% en 2012: el momento que lanzó el boom del deep learning. Common Crawl: 250TB de texto web que alimenta todos los LLMs modernos.

---

El proyecto AI4Europe —iniciativa de la Comisión Europea— está construyendo un dataset de 100 millones de documentos en 24 idiomas oficiales de la UE para entrenar modelos soberanos europeos. La Deutsche Nationalbibliothek digitalizó 2 millones de libros alemanes fuera de copyright para crear el corpus Germeval, que hoy es la base de los mejores modelos de NLP en alemán. La calidad de la etiquetación humana —no el volumen— fue el factor decisivo en ambos casos.

---

Entender qué hace valioso a un dataset es fundamental para evaluar proveedores, proponer proyectos de datos y auditar sistemas de IA. En Europa, donde la regulación del AI Act exige transparencia sobre los datos de entrenamiento, un AI Engineer que puede responder esas preguntas con precisión técnica se convierte en interlocutor imprescindible en proyectos de alto riesgo.`,

  'l3': `Los LLMs se construyen sobre capas de datos recopilados con métodos diferentes. Common Crawl rastrea internet mensualmente generando 250TB de texto; hasta el 95% se descarta en filtrado por baja calidad. Web scraping especializado construyó datasets curados: Wikipedia en 20+ idiomas, ArXiv con 2M de papers científicos, GitHub con cientos de millones de repositorios. Human Annotation produce los datos de mayor calidad para fine-tuning e RLHF: Scale AI y Surge AI emplean miles de anotadores para crear pares instrucción-respuesta. Datos sintéticos con LLMs —usar GPT-4 para generar datos de entrenamiento para modelos más pequeños— es la técnica más revolucionaria de 2024-2026.

---

Phi-1 de Microsoft (1.3B parámetros) fue entrenado solo con datos sintéticos generados por GPT-4 describiendo "libros de texto de alta calidad": superó a modelos diez veces más grandes entrenados con datos masivos de internet. El paper 'Textbooks Are All You Need' formalizó el principio. En Europa, el proyecto BLOOM de Hugging Face usó 400 investigadores voluntarios para curar datasets multilingüe —incluyendo 46 idiomas africanos— demostrando que la curaduría humana colectiva puede competir con los datos propietarios de los grandes labs.

---

Entender cómo se recopilan los datos permite identificar los sesgos estructurales de cada modelo y las limitaciones de rendimiento en idiomas o dominios infrarrepresentados. En Europa, donde la diversidad lingüística es la norma, un AI Engineer que elige modelos con corpus de entrenamiento multilingüe robusto toma decisiones más acertadas para proyectos reales.`,

  'l4': `El paradigma "más datos siempre" dominó hasta 2022. El giro llegó con Phi-1 de Microsoft en 2023: 1.3B parámetros entrenados con 7GB de datos sintéticos diseñados pedagógicamente superaron a modelos diez veces más grandes con datos masivos de internet. Hoy Mistral 7B, Phi-3 y Gemma son más capaces que GPT-3 (175B parámetros) usando 10-50 veces menos parámetros y con datos curados. En fine-tuning empresarial, 500-1.000 ejemplos anotados por expertos superan a 50.000 ejemplos sin curaduría.

---

El NHS británico intentó entrenar un detector de sepsis con 2 millones de registros de pacientes sin curar: 60% de falsos positivos en producción. Reentrenaron con 15.000 casos revisados por médicos especialistas: los falsos positivos cayeron al 8%. El Politecnico di Milano demostró el mismo efecto en detección de fraude bancario: 800 transacciones revisadas por expertos superaban a 400.000 transacciones sin etiquetación cuidadosa. Calidad sobre cantidad en ambos casos.

---

Para proyectos de IA empresarial en Europa, esta lección tiene consecuencias prácticas directas. Antes de escalar un dataset, valora si tiene sentido invertir en curaduría. Un AI Engineer que sabe diseñar pipelines de anotación de calidad —con criterios de etiquetado, inter-annotator agreement y control de calidad— aporta más valor que quien simplemente agrega volumen.`,

  'l5': `Data augmentation aumenta artificialmente el tamaño y diversidad de un dataset a partir de datos existentes. En visión computacional es estándar: rotación, volteo, cambios de brillo, recortes y ruido convierten una imagen en 20-50 variantes. En NLP, las técnicas principales son: back-translation (español → inglés → español produce paráfrasis naturales), parafraseo con LLMs (Claude reformula manteniendo la etiqueta semántica con control de registro y vocabulario), y datos sintéticos —usar GPT-4 para generar 900 variantes de 100 ejemplos reales—. El enriquecimiento añade información externa: datos meteorológicos, eventos locales o indicadores macroeconómicos.

---

Un hospital pediátrico de París tenía 400 imágenes etiquetadas de displasia de cadera —insuficientes para entrenar un detector confiable—. Con rotación, volteo, ajuste de contraste y ruido gaussiano ampliaron a 8.000 variantes. El modelo resultante alcanzó 91% de sensibilidad, comparable al diagnóstico de un radiólogo senior, con un dataset 20 veces menor de lo habitualmente necesario. La técnica se replicó en cinco hospitales europeos con patologías pediátricas raras.

---

Data augmentation es especialmente crítica en Europa en dominios con datos escasos: patologías raras, idiomas minoritarios, sectores con regulación estricta que limita compartir datos. Un AI Engineer que domina estas técnicas —especialmente síntesis con LLMs para NLP— convierte proyectos que parecen inviables por falta de datos en proyectos con resultados sólidos.`,

  'l6': `Un modelo de embedding convierte texto en un vector numérico donde textos similares quedan cerca. Las bases de datos vectoriales almacenan y buscan esos vectores eficientemente usando algoritmos ANN (Approximate Nearest Neighbor) como HNSW: encuentran los K vectores más similares en milisegundos entre millones de vectores. Pinecone es la opción DBaaS más fácil —gestionada, API simple—. Weaviate es open source con búsqueda híbrida (vectorial + texto) y desplegable en la infraestructura propia. pgvector extiende PostgreSQL con capacidades vectoriales: búsqueda semántica en la base de datos que ya tienes.

---

La Biblioteca Nacional de los Países Bajos indexó 3 millones de documentos históricos con Weaviate desplegado en sus propios servidores en Ámsterdam: las búsquedas semánticas permiten encontrar documentos del siglo XVII usando lenguaje moderno. Ningún dato sale de la infraestructura pública holandesa. Una plataforma de empleo alemana usa pgvector sobre Postgres para matching semántico entre ofertas y CVs: la conversión de candidatos aumentó un 28% respecto a búsqueda por palabras clave.

---

Las bases de datos vectoriales son la infraestructura de los sistemas RAG y búsqueda semántica empresarial. En Europa, donde los requisitos de residencia de datos son frecuentes, dominar las opciones de deployment on-premise —Weaviate, Qdrant, pgvector— frente a las opciones cloud como Pinecone es una ventaja técnica directa al proponer soluciones a clientes en sectores regulados.`,

  'l7': `RAG (Retrieval Augmented Generation) resuelve el problema central de los LLMs en producción: el conocimiento del modelo está congelado en su fecha de entrenamiento. El pipeline tiene dos fases. Fase Offline: dividir documentos en chunks de 300-500 tokens, generar un embedding por chunk, almacenarlos en una base vectorial con metadata. Fase Online: convertir la consulta en embedding → recuperar los 3-10 chunks más similares → insertarlos en el prompt del LLM como contexto → generar respuesta citando las fuentes. No requiere reentrenar el modelo y el conocimiento se actualiza añadiendo documentos.

---

La Unión Europea desplegó un asistente RAG sobre el corpus completo de la legislación europea —42.000 documentos en 24 idiomas— usando bge-m3 para embeddings y Claude Sonnet para generación. Funcionarios de la Comisión encuentran en segundos qué directiva aplica a cada caso, con cita exacta del artículo. Sin RAG, la misma búsqueda requería un jurista especializado y horas de revisión manual. El sistema redujo el tiempo de consulta legal interna en un 73%.

---

RAG es la arquitectura más desplegada en sistemas de IA empresarial en Europa precisamente porque permite usar datos internos sin reentrenamiento y con trazabilidad completa. Un AI Engineer que construye RAG desde cero —chunking, embeddings, retrieval, generación— y entiende sus limitaciones técnicas tiene el perfil más demandado en proyectos de knowledge management.`,

  'l8': `El GDPR (Reglamento General de Protección de Datos, UE, 2018) es el marco de referencia mundial para IA con datos personales. Sus principios clave: minimización de datos (solo los estrictamente necesarios), limitación de propósito (datos para X no se usan para Y sin nuevo consentimiento), exactitud (deben mantenerse actualizados) y derecho al olvido (incluido de modelos entrenados con esos datos). El EU AI Act, vigente desde 2026, añade obligaciones de transparencia y documentación para sistemas de IA de alto riesgo. Las multas llegan al 4% de la facturación global.

---

Clearview AI fue multada con 20 millones de euros por la CNIL francesa y 7,5 millones por la ICO británica por procesar datos biométricos sin base legal válida para entrenar su modelo de reconocimiento facial. Deepl, empresa alemana de traducción IA, diseñó su arquitectura desde cero con privacidad: los documentos subidos a la versión Pro no se usan para entrenamiento y se eliminan en 24 horas —Privacy by Design como ventaja competitiva frente a Google Translate—.

---

En Europa, el conocimiento de GDPR y AI Act no es opcional para un AI Engineer: es un requisito de entrada en proyectos de salud, banca, educación y administración pública. Quienes pueden diseñar arquitecturas que cumplen privacidad desde el inicio —no como parche posterior— acceden a los contratos más importantes y evitan las multas que han destruido proyectos con alta inversión técnica.`,

  'l9': `El ecosistema de datasets públicos evita partir de cero. Hugging Face Datasets tiene 200.000+ datasets organizados por tarea, modalidad e idioma; datasets.load_dataset('nombre') descarga y preprocesa en una línea. Kaggle ofrece 50.000+ datasets para casos empresariales: fraude (IEEE-CIS, 590.000 transacciones), salud (radiografías etiquetadas), retail (historial de compras). Common Crawl tiene subconjuntos como CC-News para análisis de noticias. Cinco filtros antes de usar cualquier dataset público: licencia, fecha, origen y sesgos, balance de clases, tamaño real vs útil.

---

El proyecto Open Data Commons for Language Technology de la Unión Europea recopila y publica bajo licencias abiertas datasets de texto en los 24 idiomas oficiales de la UE, cubriendo dominio legal, científico y administrativo. El Parlamento Europeo publicó en 2024 su corpus multilingüe de debates parlamentarios (1999-2024) bajo CC-BY: hoy es la base de los mejores modelos de traducción jurídica en Europa. En Hugging Face, datasets como EuroParl o ELRC-SHARE son fundamentales para proyectos europeos multilingüe.

---

Conocer el ecosistema de datasets públicos europeos y multilingüe es una ventaja práctica inmediata para proyectos en la UE. Un AI Engineer que identifica el dataset correcto para un prototipo antes de invertir en recopilación propia ahorra semanas de trabajo y puede demostrar viabilidad técnica con mucha menor inversión inicial.`,

  'l10': `Preparar datos empresariales para IA requiere un pipeline de 7 etapas. (1) Inventario: mapear qué datos existen, dónde y en qué formato. (2) Extracción: OCR con Azure Document Intelligence para PDFs, APIs de CRM, exportaciones de bases de datos. (3) Limpieza: eliminar duplicados, normalizar fechas y encoding, manejar valores faltantes con estrategia documentada. (4) Anonimización: NER con SpaCy para detectar PII, reemplazo con tokens no reversibles. (5) Estructuración: JSONL para fine-tuning, markdown en chunks para RAG, CSV para clasificación. (6) Anotación: expertos del dominio + inter-annotator agreement >80%. (7) Validación: muestra del 5% antes de entrenar.

---

Allianz UK preparó 120.000 partes de siniestro para fine-tuning de Claude: el pipeline completo tardó 14 semanas. El 60% del tiempo fue limpieza y anonimización. El modelo final redujo el tiempo de gestión de siniestros de 45 minutos a 8 minutos por caso. La clave fue la Etapa 6: anotadores expertos en seguros definieron criterios de cobertura aplicables con un 91% de acuerdo —sin esa consistencia, el modelo aprendía patrones contradictorios.

---

La regla real de los proyectos de IA es 60-80% preparación de datos, 20-40% modelado. Los proyectos que invierten al revés fracasan con regularidad. En Europa, el AI Act exige documentar los datos usados para entrenar sistemas de alto riesgo, convirtiendo un buen pipeline de preparación en un requisito regulatorio —no solo una buena práctica.`

};

// ═══════════════════════════════════════════════════════════════════════
// B6 — El mapa real de modelos en producción
// ═══════════════════════════════════════════════════════════════════════
const b6Contenido = {

  'l1': `Anthropic fue fundada en 2021 por ex-investigadores de OpenAI motivados por una pregunta central: ¿cómo construir IA poderosa que sea genuinamente segura? En 2026, la familia Claude tiene tres niveles: Haiku (rápido y económico para alto volumen), Sonnet (equilibrio capacidad-coste, el más usado en producción) y Opus (máxima capacidad de razonamiento). Las fortalezas diferenciadas de Claude son: ventana de 200K tokens, seguimiento de instrucciones complejas, calidad de escritura con menos "sabor a IA" y Constitutional AI que produce comportamiento predecible y auditable.

---

El Tribunal Europeo de Derechos Humanos usa Claude Sonnet para analizar sus 20.000+ resoluciones pendientes: la ventana de 200K tokens permite procesar expedientes completos en una llamada, y el Constitutional AI garantiza comportamiento consistente y auditable —un requisito no negociable para una institución judicial—. KPMG España desplegó Claude para análisis de contratos de auditoría: la tasa de detección de cláusulas de riesgo pasó del 67% (revisión manual) al 94%, con trazabilidad completa de cada flag.

---

En Europa, la capacidad de auditoría de los sistemas de IA es cada vez más un requisito regulatorio bajo el AI Act. Claude, con su enfoque de Constitutional AI y documentación de safety publicada, está posicionado como el modelo de referencia para sectores que deben justificar sus decisiones: legal, financiero, salud y administración pública.`,

  'l2': `OpenAI lanzó ChatGPT en noviembre de 2022 y cambió la percepción pública de la IA. En 2026, la familia GPT incluye: GPT-4o Mini para bajo coste y alto volumen; GPT-4o (omni: texto, imagen y audio en un modelo) para el balance entre capacidad y precio; y o1/o3 para razonamiento extendido en matemáticas y código —modelos con cadena de pensamiento interna—. La mayor ventaja competitiva de OpenAI no es el modelo sino el ecosistema: la API más documentada, la mayor comunidad de desarrolladores y la integración nativa con Microsoft 365.

---

Microsoft integró GPT-4o en todo el ecosistema de Office 365 Copilot: 400 millones de usuarios corporativos en Europa tienen acceso directo desde Word, Excel, Teams y SharePoint. Una empresa de logística alemana con toda su infraestructura en Azure activó Azure OpenAI Service sin migración adicional: el mismo equipo IT que gestiona Azure gestiona ahora el acceso a GPT-4o con SSO, roles de acceso y auditoría integrados en su herramienta existente.

---

Para empresas europeas en el ecosistema Microsoft, GPT-4o es frecuentemente la elección de menor fricción, no porque sea técnicamente superior en todas las tareas, sino porque elimina integraciones adicionales. Un AI Engineer que entiende esta lógica —ecosistema sobre especificación técnica pura— da recomendaciones más acertadas y evita proyectos de integración innecesariamente complejos.`,

  'l3': `Google inventó el Transformer —la arquitectura de todos los LLMs modernos— en el paper 'Attention is All You Need' de 2017. En 2026, Gemini incluye: Flash (el más económico del segmento premium, ultra-rápido), Pro (uso general, comparable a GPT-4o y Claude Sonnet) y Ultra (máxima capacidad en Gemini Advanced). Gemini fue diseñado como modelo nativo multimodal desde la arquitectura base —no texto al que se añadió visión—. Su diferenciador técnico clave: ventana de 1 millón de tokens en Gemini 1.5 Pro y acceso integrado a Google Search para información en tiempo real.

---

La Comisión Europea usa Gemini 1.5 Pro para analizar los 180.000 comentarios recibidos durante consultas públicas sobre regulaciones: la ventana de 1M tokens procesa la totalidad de respuestas en una sola llamada, identificando tendencias y contradicciones. Empresas que ya pagan Google Workspace Business en Europa obtienen créditos de Gemini incluidos en su suscripción —el coste marginal de adopción es cero, un argumento que cierra proyectos rápidamente.

---

Para consultores europeos, Google Gemini tiene un caso de uso particular: clientes con Google Workspace Enterprise frecuentemente tienen acceso incluido sin coste adicional. Identificar este escenario y activar Gemini como quick win —con cero presupuesto adicional— es una entrada de valor inmediata que construye confianza para proyectos más complejos.`,

  'l4': `En 2023, Meta publicó los pesos de LLaMA en acceso abierto: cualquier persona podía descargar el modelo, ejecutarlo y modificarlo. En 2026, Llama 4 incluye variantes de 8B parámetros (corre en una laptop con GPU) hasta 405B (requiere múltiples GPUs de servidor). El argumento económico del self-hosting: 500M tokens/mes cuestan ~1.500 $ con Claude Sonnet API. El mismo volumen en Llama desplegado en nube propia cuesta 200-400 $ en cómputo. Con volúmenes más altos, el ahorro es más dramático. La privacidad completa —datos que nunca salen de tu infraestructura— es el diferenciador no negociable para sectores regulados.

---

El Hospital Universitario de Hamburgo desplegó Llama 4 en su propio clúster de GPUs para procesar informes clínicos: los datos de pacientes nunca salen del servidor hospitalario, cumpliendo el DSGVO alemán y las directrices del Comité de Ética. El coste mensual de infraestructura es 3.200 € versus los 18.000 € estimados en Claude API para el mismo volumen. El Bundestag alemán usa Llama fine-tuneado en legislación parlamentaria desplegado en servidores de Berlín para análisis de propuestas de ley.

---

Open source con self-hosting es la única opción técnicamente válida para muchos sectores europeos. En salud, banca y administración pública, los datos simplemente no pueden salir de la infraestructura institucional. Un AI Engineer que sabe desplegar y mantener Llama en Kubernetes, aplicar LoRA para fine-tuning y gestionar actualizaciones de modelos tiene acceso a proyectos de alto valor que las opciones API no pueden resolver.`,

  'l5': `Mistral AI fue fundada en París en mayo de 2023 por ex-investigadores de Google DeepMind y Meta AI. En menos de 18 meses alcanzó una valoración de 6.000 millones de dólares, convirtiéndose en el único laboratorio de IA de frontera fuera de EE.UU. con relevancia global real. Su estrategia dual: modelos open source para construir comunidad (Mistral 7B, Mixtral 8×7B) y modelos propietarios premium por API para monetizar enterprise (Mistral Large). Mixtral 8×7B usa arquitectura Mixture of Experts: activa solo una fracción de parámetros por token, igualando a modelos tres veces más grandes en razonamiento.

---

BNP Paribas desplegó Mistral Large para análisis de documentos de cumplimiento regulatorio: todos los servidores de Mistral están en Europa, cumpliendo GDPR desde la arquitectura sin negociar cláusulas especiales. La Agence nationale de la sécurité des systèmes d'information (ANSSI) —la agencia de ciberseguridad francesa— certifica Mistral como solución para administraciones públicas francesas que deben usar IA soberana. Airbus usa Mistral para documentación técnica de aeronaves: el requisito de residencia de datos en la UE hace imposible usar proveedores estadounidenses sin contratos específicos.

---

Mistral es la respuesta europea a la dependencia de modelos estadounidenses. Para consultores que trabajan con grandes empresas europeas o administraciones públicas de la UE, conocer Mistral —su arquitectura, su modelo de negocio y sus certificaciones regulatorias— es una ventaja competitiva directa. Hay proyectos donde Mistral es la única opción políticamente viable, independientemente de la comparación técnica.`,

  'l6': `Los modelos de generación de imagen modernos son diffusion models: aprenden a "deshacer ruido", comenzando con ruido aleatorio y revelando gradualmente una imagen coherente guiados por un prompt de texto. DALL-E 3 integra con ChatGPT y sigue instrucciones de composición con alta fidelidad. Midjourney V7 produce la mayor calidad artística —composición, iluminación, coherencia visual— preferida por diseñadores. Flux.1 de Black Forest Labs (ex-investigadores de Stability AI) combina la calidad de Midjourney con API pública y versiones open source: el modelo de referencia técnica en 2026.

---

Zalando —el mayor e-commerce de moda de Europa— genera imágenes de producto en nuevas ambientaciones con Flux Pro: una misma chaqueta aparece en contextos de verano, ciudad e invierno sin sesión fotográfica adicional. El equipo de diseño de 12 personas ahora produce contenido equivalente al de un equipo de 60. IKEA Europa usa DALL-E 3 integrado en su pipeline de OpenAI para visualizaciones de interiores personalizadas: los clientes suben foto de su habitación y ven cómo quedaría el mueble antes de comprarlo.

---

Los modelos de imagen están creando una categoría de trabajo nueva en Europa: AI Visual Engineer. Empresas de e-commerce, agencias de publicidad y equipos de comunicación corporativa buscan perfiles que automaticen flujos de generación de imagen a escala. Quienes dominan Flux para automatización y Midjourney para calidad artística cubren el espectro completo de casos de uso.`,

  'l7': `Los benchmarks son conjuntos estandarizados de preguntas con respuestas conocidas para comparar modelos. MMLU (2021): 57 áreas de conocimiento en preguntas universitarias y profesionales de opción múltiple —mide amplitud de conocimiento factual; Claude Opus y GPT-4o alcanzan 86-90% en 2026—. HumanEval (OpenAI): 164 problemas de Python evaluados con tests automáticos —mide código funcional básico; Claude Opus y GPT-4o alcanzan ~87%—. HELM (Stanford): 42 escenarios que evalúan accuracy, calibración, robustez, equidad y toxicidad simultáneamente —la visión más holística de capacidades reales.

---

El Stanford Center for Research on Foundation Models detectó en 2024 que tres modelos líderes habían sido entrenados específicamente con datos similares a las preguntas de MMLU —benchmark contamination—. Sus scores subieron 4-7 puntos sin mejoría real en tareas del mundo real. El ejemplo más citado: un modelo con 91% en MMLU que fallaba el 40% de las preguntas equivalentes formuladas con diferente enunciado. Por eso HELM evalúa robustez: ¿el modelo funciona igual con pequeñas variaciones?

---

Para un AI Engineer en Europa, la capacidad de leer benchmarks con criterio es una habilidad de comunicación tanto como técnica: los clientes ven números de marketing y los confunden con garantías de rendimiento. Saber explicar qué miden y qué no miden los benchmarks —y proponer evaluaciones en los datos reales del cliente— construye credibilidad profesional.`,

  'l8': `El framework de seis dimensiones para comparar modelos convierte una decisión intuitiva en un proceso estructurado. (1) Calidad en el caso de uso específico: evaluar con 20-100 ejemplos reales del caso de uso, no benchmarks genéricos. (2) Coste total por operación de negocio: calcular coste por contrato analizado o consulta resuelta, no coste por token abstracto. (3) Latencia: time-to-first-token y tiempo de completado son métricas distintas para casos de uso distintos. (4) Ventana de contexto: limitación binaria —si el documento no cabe, el modelo no sirve—. (5) Privacidad y compliance: puede eliminar opciones superiores en todas las otras dimensiones. (6) SLA y confiabilidad: 99.9% de uptime significa 8,7 horas de downtime al año.

---

Un equipo de consultoría de Deloitte UK comparó Claude Sonnet, GPT-4o y Gemini Pro para revisar contratos de proveedores usando este framework. En calidad (eval set de 80 contratos reales): Claude ganó en precisión de cláusulas de riesgo. En coste: GPT-4o Mini resultó 8× más barato con calidad aceptable para contratos estándar. En ventana de contexto: Claude fue eliminado para contratos de 150 páginas porque Gemini 1.5 Pro era el único con 1M tokens. Resultado: arquitectura híbrida —contratos estándar con GPT-4o Mini, contratos complejos con Gemini 1.5 Pro.

---

Este framework no es solo una herramienta técnica: es una herramienta de comunicación con clientes. Presentar la selección de modelo con seis dimensiones explícitas, con datos de un eval set propio, diferencia a un AI Engineer riguroso de uno que recomienda "el modelo del momento". En Europa, esta rigurosidad es especialmente valorada en sectores regulados donde las decisiones deben ser justificables ante auditores.`,

  'l9': `El árbol de decisión de modelos convierte el framework de seis dimensiones en una guía práctica. Pregunta 1: ¿Los datos pueden salir de la infraestructura? Si NO → Llama u otro open source on-premise o Mistral con servidores en Europa. Descarta Claude API, GPT API, Gemini API. Pregunta 2: ¿El cliente tiene un ecosistema tech dominante? Azure/M365 → Azure OpenAI. Google Workspace → Gemini. AWS o ninguno → evalúa Claude o GPT-4o. Pregunta 3: ¿Cuál es la característica crítica? Documentos muy largos → Claude 200K o Gemini 1M. Razonamiento matemático → o1/o3. Tiempo real → Gemini con Search. Alto volumen bajo coste → Claude Haiku, GPT-4o Mini o Gemini Flash.

---

Una cadena de supermercados francesa evaluó modelos para clasificar reclamaciones de clientes —40.000 al mes—. Pregunta 1: datos de clientes franceses, no pueden salir de Francia → Mistral con servidores en París o Llama on-premise. Pregunta 2: infraestructura en OVHcloud (proveedor francés), sin ecosistema Microsoft ni Google. Pregunta 3: alto volumen, tarea estándar de clasificación, coste crítico → Mistral Small (0,2 $/M tokens en servidor francés). Resultado: decisión justificada en 20 minutos con criterios regulatorios, de infraestructura y de coste.

---

El árbol de decisión es la herramienta más práctica del repertorio del consultor de IA. En Europa, la dimensión regulatoria —residencia de datos, GDPR, AI Act— frecuentemente determina el modelo antes de que entre en juego ningún criterio técnico. Internalizar este árbol permite responder en tiempo real a la pregunta más frecuente de los clientes: ¿qué modelo deberíamos usar?`,

  'l10': `Seis tendencias estructurales están en movimiento en 2026. (1) Comoditización del razonamiento: las capacidades del frontier actual serán el estándar económico en 12-18 meses —la ventaja competitiva migra hacia datos propios e integración. (2) Agentes autónomos como modo principal: de LLMs reactivos (pregunta → respuesta) a agentes que ejecutan secuencias de acciones con mínima supervisión. (3) Consolidación del mercado generalista con fragmentación de modelos especializados verticales. (4) Infraestructura de IA como commodity en AWS Bedrock, Google Vertex y Azure. (5) Regulación como factor estructural. (6) Edge AI: modelos de 1-7B corriendo en dispositivos sin conexión.

---

El AI Act de la UE entró en vigor en 2026. En 2027, la fase de cumplimiento para aplicaciones de alto riesgo —crédito, contratación, educación, infraestructura crítica— obligará a documentar modelos, datos de entrenamiento y procesos de evaluación. Las empresas que no cumplan arriesgan multas de hasta 30 millones de euros o el 6% de facturación global. Esto convierte el conocimiento regulatorio en una ventaja competitiva directa: los proyectos de IA más lucrativos en Europa en 2027 serán los que naveguen correctamente el AI Act.

---

En Europa, 2027 será el año en que el AI Act pase de marco regulatorio a enforcement real. Los AI Engineers que combinen competencia técnica con conocimiento regulatorio —qué es un sistema de alto riesgo, qué documentación se requiere, cómo diseñar para cumplimiento— serán los perfiles más demandados y mejor remunerados del mercado europeo.`

};

// ═══════════════════════════════════════════════════════════════════════
// Aplicar transformaciones al JSON
// ═══════════════════════════════════════════════════════════════════════

const stats = { b4: {}, b5: {}, b6: {} };

function aplicarBloque(bloqueId, contenido, statsObj) {
  const bloque = data.bloques.find(b => b.id === bloqueId);
  if (!bloque) { console.error('Bloque no encontrado:', bloqueId); return; }

  Object.entries(contenido).forEach(([lecId, texto]) => {
    const fullId = `${bloqueId}-${lecId}`;
    const lec = bloque.lecciones.find(l => l.id === fullId);
    if (!lec) { console.error('Leccion no encontrada:', fullId); return; }

    const segmBefore = (lec.contenido.teoria.explicacion || '').split(SEP).length;
    lec.contenido.teoria.explicacion = texto;
    const segmAfter = texto.split(SEP).length;

    statsObj[lecId] = { antes: segmBefore, despues: segmAfter };
    console.log(`  ${fullId}: ${segmBefore} → ${segmAfter} segmentos`);
  });
}

console.log('\n=== B4 ===');
aplicarBloque('m1-b4', b4Contenido, stats.b4);

console.log('\n=== B5 ===');
aplicarBloque('m1-b5', b5Contenido, stats.b5);

console.log('\n=== B6 ===');
aplicarBloque('m1-b6', b6Contenido, stats.b6);

// Guardar
fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');
console.log('\n✓ Archivo guardado:', FILE);

// Tabla resumen
console.log('\n══════════════════════════════════════════════════════');
console.log('TABLA RESUMEN');
console.log('══════════════════════════════════════════════════════');
['b4', 'b5', 'b6'].forEach(b => {
  console.log(`\n${b.toUpperCase()}:`);
  Object.entries(stats[b]).forEach(([id, s]) => {
    const latam = s.latam ? '⚠ LATAM fix' : '';
    console.log(`  l${id.replace('l','')}: ${s.antes} seg → ${s.despues} seg ${latam}`);
  });
});
