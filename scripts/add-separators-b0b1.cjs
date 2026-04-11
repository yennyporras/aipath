// Script: añade separadores --- a B0 y B1 para nueva paginación conceptual
// NO cambia ninguna palabra — solo inserta \n\n---\n\n entre segmentos
// y \n\n entre párrafos donde el texto era un bloque continuo.
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/m1/index.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Separador canónico
const SEP = '\n\n---\n\n';

// ─────────────────────────────────────────────────────────────────────
// B0
// ─────────────────────────────────────────────────────────────────────

const b0 = data.bloques.find(b => b.id === 'm1-b0');

// B0-L1: El momento histórico — 4 segmentos
// Seg1: apertura + convergencia   Seg2: timeline 2020→2026
// Seg3: diferencia estructural    Seg4: oportunidad LATAM
b0.lecciones.find(l => l.id === 'm1-b0-l1').contenido.teoria.explicacion =
`Vivimos el momento más importante en la historia de la tecnología. En 2026, la inteligencia artificial ha pasado de ser una promesa académica a transformar industrias completas en tiempo real.

Lo que hace diferente este momento no es solo la tecnología: es la convergencia de modelos de lenguaje con capacidad de razonamiento, costos que cayeron 99% en 5 años, y acceso democrático desde cualquier computadora con internet.${SEP}En 2020, GPT-3 demostró que los LLMs podían escribir código, razonar y crear contenido. En 2022, ChatGPT llevó esa capacidad a 100 millones de usuarios en 60 días, la adopción más rápida de cualquier tecnología en la historia. En 2024, Claude 3 Opus superó el 90% de las pruebas de razonamiento humano. En 2026, los modelos de agentes autónomos ejecutan tareas completas sin supervisión humana.${SEP}Para los profesionales en LATAM, este momento representa una ventana única: la curva de aprendizaje todavía es navegable, la demanda supera la oferta, y quienes dominen estas herramientas en los próximos 18 meses serán los referentes de la próxima década.

La diferencia entre este momento y los anteriores ciclos de hype en IA es estructural, no superficial. Anteriormente, la IA requería equipos de científicos de datos, infraestructura millonaria y meses de desarrollo para proyectos específicos. Hoy, un profesional con conocimiento básico de APIs puede construir en una tarde lo que habría costado $500,000 y 18 meses en 2018.${SEP}Esto democratiza el poder de transformación: ya no es solo para corporaciones multinacionales con presupuestos de I+D masivos. En Colombia y LATAM, esto significa que una empresa de 10 personas puede competir con las capacidades de análisis y automatización de una multinacional con 10,000 empleados.

La pregunta ya no es si tu empresa debería adoptar IA, sino qué tan rápido puedes construir la capacidad interna para hacerlo antes que tu competencia directa.`;

// B0-L2: Línea de tiempo 1950→2026 — 4 segmentos
// Seg1: 1956-1980 (McCarthy, ELIZA, primer invierno)
// Seg2: segunda ola y segundo invierno (1986-2012)
// Seg3: era moderna 2018-2026
// Seg4: lección del patrón histórico
b0.lecciones.find(l => l.id === 'm1-b0-l2').contenido.teoria.explicacion =
`La historia de la inteligencia artificial es una historia de inviernos y primaveras. El término 'Inteligencia Artificial' fue acuñado por John McCarthy en 1956 en la conferencia de Dartmouth.

Los primeros 20 años fueron de optimismo: ELIZA (1966) demostró conversación básica, los primeros sistemas expertos parecían resolver todo. Luego llegó el primer invierno (1974-1980): los computadores no tenían suficiente poder de cálculo.${SEP}Segunda ola: redes neuronales de Backpropagation (1986), sistemas expertos en empresas. Segundo invierno (1987-1993).

La revolución silenciosa: Deep Blue vence a Kasparov (1997), pero el verdadero cambio llegó con ImageNet (2012) donde AlexNet demostró que las redes neuronales profundas superaban a los métodos clásicos en visión.${SEP}GPT-1 (2018) mostró que el preentrenamiento masivo funcionaba. GPT-2 (2019) fue tan bueno que OpenAI tuvo miedo de publicarlo. GPT-3 (2020) con 175B parámetros cambió todo. RLHF + InstructGPT (2022) hizo que los modelos siguieran instrucciones. ChatGPT (noviembre 2022). GPT-4 y Claude 2 (2023). Claude 3 Opus supera exámenes médicos y legales (2024). Agentes autónomos en producción (2025-2026).

Cada hito no fue solo tecnológico: fue un cambio en lo que los humanos podíamos delegar a las máquinas.${SEP}Para entender hacia dónde vamos, el patrón histórico es claro: cada vez que una nueva tecnología reduce drásticamente el costo de una tarea cognitiva, los profesionales que se adaptan primero capturan el valor desproporcionado.

Los contadores que aprendieron Excel en 1985 no perdieron su trabajo — se convirtieron en analistas financieros más productivos y mejor pagados. Los diseñadores que aprendieron Photoshop en 1994 no fueron reemplazados — multiplicaron su producción. La IA de 2026 sigue exactamente ese patrón: quienes la dominen no serán reemplazados, sino que se convertirán en los profesionales de mayor demanda de la próxima década en cualquier industria.`;

// B0-L3: Inviernos de IA — 4 segmentos
// Seg1: qué fueron los inviernos realmente
// Seg2: tres ventajas estructurales hoy
// Seg3: por qué no habrá tercer invierno
// Seg4: cómo comunicarlo a stakeholders escépticos
b0.lecciones.find(l => l.id === 'm1-b0-l3').contenido.teoria.explicacion =
`Los dos inviernos de IA (1974-1980 y 1987-1993) no fueron fracasos de la idea — fueron fracasos de infraestructura y datos.

El primer invierno llegó cuando los computadores de la época simplemente no tenían el poder de cálculo necesario. Los investigadores sabían QUÉ querían hacer pero no PODÍAN hacerlo. El segundo invierno fue más interesante: los sistemas expertos funcionaban en laboratorio pero eran frágiles en el mundo real. Requerían que expertos humanos codificaran cada regla manualmente — no escalaban.${SEP}Hoy tenemos tres ventajas que hacen imposible otro invierno a corto plazo.

Primero: datos. Common Crawl tiene 250 terabytes de texto de internet. En 1990 no existían datos de entrenamiento a escala.

Segundo: cómputo. Los GPUs de NVIDIA para IA son millones de veces más rápidos que los CPUs de 1990.

Tercero: el paradigma cambió. En lugar de programar reglas (sistemas expertos), ahora aprendemos patrones de datos masivos.${SEP}Este cambio paradigmático — de reglas explícitas a aprendizaje estadístico — es por qué no habrá un tercer invierno mientras tengamos más datos y más cómputo.

El punto más importante para comunicar a stakeholders escépticos es este: los inviernos de IA anteriores ocurrieron porque la tecnología prometía más de lo que podía entregar con la infraestructura disponible.${SEP}Hoy la situación es inversa — la tecnología está entregando resultados prácticos medibles, y la infraestructura (internet de alta velocidad, cloud computing, smartphones) ya está desplegada globalmente.

El riesgo de un nuevo invierno no viene de limitaciones técnicas sino de regulación o de una pérdida de confianza masiva — ambos escenarios son posibles pero no probables en el corto plazo dado el ritmo actual de adopción empresarial real con ROI documentado.`;

// B0-L4: Impacto económico — 4 segmentos
// Seg1: impacto es medible ahora + números macro
// Seg2: números por industria (legal, salud, código, marketing)
// Seg3: LATAM específicamente (BID + estimados)
// Seg4: efecto de arbitraje LATAM
b0.lecciones.find(l => l.id === 'm1-b0-l4').contenido.teoria.explicacion =
`El impacto económico de la IA no es una proyección futura: es una realidad medible hoy.

Goldman Sachs estimó en 2023 que la IA podría automatizar el 25% de las tareas laborales globales, equivalente a 7 trillones de dólares en productividad. McKinsey calcula que entre 2024 y 2030, las empresas que adopten IA generativa verán un aumento de productividad del 40% en trabajadores del conocimiento.${SEP}Los números más reveladores están por industria.

En servicios legales: las firmas que usan IA para revisión de contratos reducen el tiempo un 80% — lo que tomaba 4 horas toma 45 minutos. En salud: los sistemas de diagnóstico asistido por IA reducen errores diagnósticos un 30% en radiología. En código: GitHub Copilot aumenta la velocidad de desarrollo 55% según estudios propios. En marketing: la generación de contenido con IA reduce costos de producción 60-70%.${SEP}En LATAM específicamente: el BID estima que la IA podría añadir $1 trillion al PIB regional antes de 2030, con los mayores beneficios en Colombia, Brasil y México donde el costo laboral relativo hace el ROI de automatización especialmente atractivo.${SEP}Lo que hace este análisis especialmente relevante para LATAM es el efecto de arbitraje. Las herramientas de IA tienen precios denominados en dólares pero los costos laborales que reemplazan están en pesos, reales o soles.

Esto crea una ecuación donde el ROI de implementar IA es proporcionalmente mayor que en economías desarrolladas. Un sistema de atención al cliente con IA que cuesta $200/mes puede reemplazar trabajo que en Colombia cuesta $800/mes, pero el mismo sistema en Estados Unidos reemplaza trabajo que cuesta $4,000/mes. El ROI existe en ambos casos, pero el punto de equilibrio se alcanza mucho más rápido en LATAM.`;

// B0-L5: IA en LATAM — 3 segmentos (es la más corta: 227w)
// Seg1: oportunidad general + framing leapfrog
// Seg2: sectores específicos (agtech, salud, educación, fintech)
// Seg3: la oportunidad real para profesionales
b0.lecciones.find(l => l.id === 'm1-b0-l5').contenido.teoria.explicacion =
`LATAM es la región con la mayor oportunidad de capturar valor de IA en los próximos 5 años. No porque tengamos más recursos tecnológicos, sino porque la brecha entre lo que es posible hoy con IA y lo que las empresas latinoamericanas hacen actualmente es enorme.

En Colombia, más del 60% de las pymes todavía manejan sus operaciones con Excel y procesos manuales. Eso significa que hay espacio para saltar directamente a soluciones de IA sin pasar por décadas de transformación digital gradual — el equivalente latinoamericano del 'leapfrog' que hicimos con móviles.${SEP}Oportunidades específicas por sector:

Agtech — Colombia tiene 24 millones de hectáreas cultivables pero menos del 5% de los agricultores usa análisis de datos para decisiones. La IA puede democratizar el acceso a agronomía de precisión.

Salud — El 40% de las consultas médicas en ciudades intermedias son diagnósticos que un LLM podría pre-clasificar con alta precisión, reduciendo tiempos de espera.

Educación — 8 millones de estudiantes en Colombia acceden a educación de calidad desigual. Los tutores adaptativos con IA pueden nivelar el campo de juego.

Fintech — El 35% de los colombianos todavía no tiene cuenta bancaria. La IA reduce el costo del scoring crediticio alternativo 90%, habilitando microcréditos rentables.${SEP}Para los profesionales de LATAM, la mayor oportunidad no es solo usar IA sino ser quienes implementen estas soluciones para los mercados locales.

Cada uno de estos sectores necesita profesionales que entiendan tanto la tecnología como el contexto local: los idiomas regionales, los sistemas regulatorios, las dinámicas de mercado. Ese conocimiento combinado es una ventaja competitiva que ningún proveedor global puede replicar fácilmente.`;

// B0-L6: Tu lugar — 4 segmentos
// Seg1: la pregunta + ventanas 1 y 2 (cerradas)
// Seg2: ventana 3 (donde estamos) + ventana 4
// Seg3: el perfil T
// Seg4: patrón de primera victoria
b0.lecciones.find(l => l.id === 'm1-b0-l6').contenido.teoria.explicacion =
`La pregunta que más escucho de profesionales en LATAM es: '¿No es demasiado tarde para aprender IA?' La respuesta corta es no. La respuesta larga requiere entender las diferentes ventanas de oportunidad.

La primera ventana fue para los investigadores (2015-2020): construir los modelos desde cero. Esa sí se cerró — necesitas doctorado en ML y acceso a clusters de GPUs. La segunda ventana fue para los ingenieros (2020-2023): construir las primeras aplicaciones sobre los modelos. Esa está cerrando.${SEP}La tercera ventana, donde estamos ahora (2024-2027), es para los profesionales de dominio que entienden sus industrias Y pueden usar IA: el abogado que automatiza revisión de contratos, el médico que construye sistemas de diagnóstico asistido, el contador que automatiza análisis financiero, el marketer que construye pipelines de contenido. Esta es la ventana más grande y la más larga.

La cuarta ventana (2027+) será para las empresas que adopten IA — cuando sea tan común como el email.${SEP}Tu posición ideal es el perfil T: profundidad en UNA industria o función + amplitud suficiente en IA para implementar soluciones.

No necesitas ser el mejor en IA — necesitas ser el mejor en IA EN TU CAMPO.${SEP}La clave para navegar la adopción de IA en tu organización no es esperar a tener toda la infraestructura perfecta — es identificar el primer caso de uso donde el ROI es obvio y ejecutar.

Las empresas que lideran en adopción de IA no empezaron con grandes transformaciones digitales; empezaron con un problema pequeño y doloroso que la IA resolvía claramente. Luego escalaron desde ese primer éxito. Este patrón de 'victoria rápida → escalar' es consistente en todos los sectores y tamaños de empresa, desde startups hasta corporaciones.`;

// B0-L7: Mitos y realidades — 3 segmentos (ya tiene párrafos con \n\n)
// Seg1: intro + Mito 1 + Mito 2
// Seg2: Mito 3 + Mito 4
// Seg3: Mito 5 + Mito 6 + conclusión
b0.lecciones.find(l => l.id === 'm1-b0-l7').contenido.teoria.explicacion =
`En 2026 conviven dos narrativas sobre la inteligencia artificial igualmente dañinas: el pánico catastrófico y el entusiasmo acrítico. Ninguna te ayuda a tomar decisiones profesionales correctas. Lo que necesitas es un mapa de la realidad basado en evidencia. Empecemos por los mitos más peligrosos.

Mito 1: "La IA va a reemplazar todos los empleos en 5 años." Realidad: La IA automatiza tareas específicas, no roles completos. Un abogado que hace revisión de contratos verá automatizado el 70% de esa tarea específica, pero el juicio, la negociación y la estrategia legal siguen siendo humanas. McKinsey (2024) estima que el 60% de los empleos tienen al menos 30% de tareas automatizables — pero eso no significa que esos empleos desaparecerán, sino que se transformarán.

Mito 2: "La IA entiende lo que dice." Realidad: Los LLMs no comprenden, predicen. Generan texto estadísticamente coherente basado en patrones aprendidos. La diferencia importa: un LLM puede darte una respuesta médica convincente que sea completamente incorrecta porque "suena" correcta dado el contexto. Siempre verifica afirmaciones críticas con fuentes primarias.${SEP}Mito 3: "ChatGPT y Claude son lo mismo." Realidad: Hay diferencias técnicas y filosóficas fundamentales. Claude fue entrenado con Constitutional AI (proceso de alineación diferente a RLHF estándar), tiene ventana de contexto más grande, y está diseñado específicamente para tareas de trabajo del conocimiento prolongado. GPT-4o tiene integraciones nativas con más herramientas. Gemini tiene ventajas en contexto largo y Google Search. Elegir el modelo correcto para cada tarea puede hacer una diferencia del 40% en calidad de resultados.

Mito 4: "Necesitas saber programar para usar IA productivamente." Realidad: Para el 80% de los casos de uso profesionales, programar no es necesario. Las APIs de Claude, ChatGPT y Gemini están diseñadas para ser usadas a través de interfaces no-código. Lo que sí necesitas es saber diseñar prompts efectivos, entender las capacidades y limitaciones de cada modelo, y saber cuándo el output necesita verificación humana.${SEP}Mito 5: "La IA siempre mejora con el tiempo sin supervisión." Realidad: Los modelos son estáticos después del entrenamiento. Claude Sonnet 4.5 tiene un corte de conocimiento de agosto 2025 y no aprende de tus conversaciones. Las mejoras vienen de nuevas versiones de modelos, no de uso continuado.

Mito 6: "La IA es objetiva porque es matemática." Realidad: Los modelos heredan los sesgos de sus datos de entrenamiento. Si los datos históricos muestran que ciertos grupos acceden menos a crédito, el modelo reproducirá ese patrón. La IA es tan sesgada como los humanos que produjeron los datos, a veces más, porque escala ese sesgo.

Entender estos mitos no es pesimismo — es la base para usar IA de manera efectiva y responsable.`;

// B0-L8: Cómo aprender IA — 4 segmentos (ya tiene párrafos)
// Seg1: correcto vs incorrecto + vida útil del conocimiento
// Seg2: Framework Capas 1 y 2
// Seg3: Capa 3 + Proyecto Ancla
// Seg4: Regla 20/80 + velocidad realista
b0.lecciones.find(l => l.id === 'm1-b0-l8').contenido.teoria.explicacion =
`Hay una forma correcta y una incorrecta de aprender IA en 2026. La incorrecta: consumir pasivamente cursos en video, coleccionar certificados, y esperar a "entender todo" antes de construir algo. La correcta: aprender en espiral, con proyectos reales desde el día uno.

El campo de la IA se mueve tan rápido que la información que aprendes tiene una vida útil promedio de 18-24 meses para conocimiento técnico específico (qué modelo usar, qué framework está de moda) y de 5-10 años para principios fundamentales (cómo funcionan los transformers, qué son los embeddings, cómo evaluar un modelo). Tu estrategia de aprendizaje debe reflejar esta diferencia.${SEP}El Framework de Aprendizaje en Capas para IA:

Capa 1 — Fundamentos inmutables (prioridad máxima, vida útil 10+ años): Cómo funcionan las redes neuronales a nivel conceptual. Qué son los embeddings y por qué importan. Qué es la atención y cómo permite a los transformers funcionar. Cómo se entrena un modelo (gradiente descendente conceptual). Cómo se evalúa un modelo. Por qué los LLMs alucinan. Estas ideas no van a cambiar aunque Claude 10 salga mañana.

Capa 2 — Habilidades prácticas de alto impacto (vida útil 3-5 años): Prompt engineering avanzado. Cómo diseñar sistemas con LLMs (RAG, agentes). Cómo usar APIs de IA de forma efectiva. Cómo evaluar outputs de IA para tu caso de uso específico. Cómo calcular ROI de implementaciones de IA.${SEP}Capa 3 — Herramientas y frameworks actuales (vida útil 1-2 años): Qué modelos usar hoy para qué tareas. Qué frameworks (LangChain, LlamaIndex) están vigentes. Qué plataformas (Cursor, Claude Code) son las más productivas. Esta capa la actualizas leyendo newsletters semanalmente, no con cursos.

El Principio del Proyecto Ancla: Desde el día uno de aprendizaje, necesitas un proyecto real que te importe. No un ejercicio académico — algo que resolverías para tu trabajo, negocio o vida. Este proyecto es tu ancla: cada nuevo concepto que aprendes, lo intentas aplicar inmediatamente. El ciclo es: concepto → intento → fracaso → diagnóstico → ajuste → éxito parcial → siguiente concepto.${SEP}La Regla del 20/80 Invertido: En IA, el 20% del conocimiento técnico te da el 80% de la capacidad práctica. Ese 20% clave: entender LLMs (cómo funcionan, cuándo fallan), prompt engineering (técnico, no básico), APIs y evaluación. El 80% restante (matemáticas profundas de optimización, teoría de grafos de transformers, etc.) es para quien quiere investigar o hacer fine-tuning propio.

Velocidad de aprendizaje realista: Un developer web con dedicación de 10 horas semanales puede estar construyendo aplicaciones funcionales con IA en 3 meses. En 6 meses, puede hacer consultoría. En 12 meses, puede ser referente en su comunidad. En 24 meses, puede estar en el top 5% de practitioners en LATAM. Este no es hype — es el ritmo real que se observa en quienes aprenden con proyecto ancla.`;

// ─────────────────────────────────────────────────────────────────────
// B1
// ─────────────────────────────────────────────────────────────────────

const b1 = data.bloques.find(b => b.id === 'm1-b1');

// B1-L1: IA vs ML vs DL — 4 segmentos
// Seg1: el malentendido + definiciones IA/ML/DL
// Seg2: todos los LLMs son DL pero no todo DL es LLM
// Seg3: por qué importa en la práctica (datos/costo)
// Seg4: ejemplo europeo (Mastercard) + habilidad real del AI Engineer
b1.lecciones.find(l => l.id === 'm1-b1-l1').contenido.teoria.explicacion =
`La confusión entre IA, Machine Learning y Deep Learning es el malentendido más común en el campo. Son capas concéntricas, no sinónimos, y mezclarlos lleva a expectativas equivocadas sobre costos, datos necesarios y capacidades reales.

IA (Inteligencia Artificial) es el campo más amplio: cualquier técnica que hace que una máquina resuelva problemas que normalmente requieren inteligencia humana. Incluye desde un árbol de decisión de tres nodos hasta GPT-4. Machine Learning es un subconjunto de IA específicamente centrado en sistemas que APRENDEN de datos en lugar de seguir reglas programadas a mano. Deep Learning es un subconjunto de ML: redes neuronales con muchas capas ocultas. 'Deep' se refiere a la profundidad de capas, no a ninguna complejidad filosófica.${SEP}Todos los grandes modelos de lenguaje — GPT-4, Claude, Gemini, Llama — son Deep Learning. Pero no todo Deep Learning es un LLM: las redes convolucionales que detectan tumores en radiografías en hospitales europeos también son Deep Learning, sin ser modelos de lenguaje.${SEP}En la práctica empresarial la distinción importa porque determina qué datos necesitas, cuántos y cuánto cuesta.

Un modelo de ML clásico (gradient boosting, random forest) puede funcionar con 1.000 ejemplos etiquetados y entrenarse en minutos en un portátil. Un modelo de Deep Learning necesita típicamente 100.000 ejemplos o más y horas de GPU. Un LLM se preentrenó en trillones de tokens durante semanas en miles de GPUs, y tú lo consumes vía API por fracciones de céntimo por llamada, sin reentrenarlo.${SEP}El sistema antifraude de Mastercard en Europa usa ML supervisado clásico para clasificar transacciones en milisegundos: rápido, interpretable y auditable bajo GDPR. Su asistente de atención al cliente usa un LLM.

La habilidad real del AI Engineer no es dominar todas las técnicas, sino saber cuándo usar cada una.`;

// B1-L2: IA Generativa — 4 segmentos
// Seg1: qué es + diferencia con discriminativa
// Seg2: LLMs como generativos + habilidades emergentes
// Seg3: mercado 2026 + Europa (Mistral)
// Seg4: por qué el crecimiento es estructural
b1.lecciones.find(l => l.id === 'm1-b1-l2').contenido.teoria.explicacion =
`La IA Generativa es una categoría específica de IA que puede crear nuevo contenido — texto, imágenes, código, audio, video — que no existía antes.

Un modelo discriminativo te dice 'este email ES spam con 90% de probabilidad'. Un modelo generativo escribe un email completo desde cero. La diferencia no es solo técnica: es un cambio de paradigma en el rol de la IA. La discriminativa automatiza decisiones. La generativa amplifica la creatividad y el trabajo del conocimiento, colaborando activamente con el profesional.${SEP}Los LLMs (Large Language Models) como Claude, GPT-4o y Gemini son el principal tipo de IA generativa en texto. Se llaman 'generativos' porque su tarea central durante el preentrenamiento fue predecir y generar el siguiente token a partir del contexto previo.

Esa capacidad, entrenada a escala de cientos de miles de millones de parámetros sobre datos de internet, libros y código, generó por emergencia habilidades de razonamiento, análisis y escritura que nadie programó explícitamente. Nadie le enseñó a Claude a resolver ecuaciones: esa capacidad emergió del escala.${SEP}En 2026 la IA generativa es el segmento de mayor crecimiento en tecnología: el mercado global pasó de 40.000 millones de dólares en 2023 a un estimado de 280.000 millones en 2026.

Europa contribuye activamente: Mistral AI (Francia, fundada en 2023) es el laboratorio europeo de referencia, con modelos open-weights competitivos con GPT-4 y especialmente valorados por empresas que necesitan cumplir el EU AI Act sin depender de proveedores estadounidenses para datos sensibles.${SEP}La razón del crecimiento explosivo es estructural: es la primera IA que colabora directamente con trabajadores del conocimiento en su propio idioma natural, sin necesidad de datasets propios, sin equipos de ingeniería especializados, el mismo día que se contrata.

Un abogado, un médico o un educador pueden integrarla en su flujo de trabajo inmediatamente.`;

// B1-L3: Supervisado/no supervisado/refuerzo — 4 segmentos
// Seg1: intro + aprendizaje supervisado (NHS UK)
// Seg2: aprendizaje no supervisado (bancos europeos)
// Seg3: aprendizaje por refuerzo (AlphaGo + RLHF)
// Seg4: distribución práctica empresarial
b1.lecciones.find(l => l.id === 'm1-b1-l3').contenido.teoria.explicacion =
`Los tres paradigmas de aprendizaje en ML definen cómo un modelo extrae conocimiento de los datos. Elegir el correcto es la primera decisión técnica de cualquier proyecto de IA y determina los costos, el tiempo de desarrollo y la viabilidad del sistema.

Aprendizaje supervisado: el modelo aprende de ejemplos etiquetados. Tienes 10.000 emails marcados como 'spam' o 'no spam' y el modelo aprende a clasificar los nuevos. Es el paradigma dominante en aplicaciones empresariales porque los resultados son predecibles, medibles y auditables. El NHS en Reino Unido usa modelos supervisados para detectar retinopatía diabética en imágenes de fondo de ojo, con precisión comparable a la de especialistas humanos y a una fracción del costo.${SEP}Aprendizaje no supervisado: el modelo encuentra patrones en datos SIN etiquetas previas. Tienes 100.000 transacciones bancarias sin clasificar y el modelo descubre por cuenta propia que existen cinco perfiles de comportamiento distintos. Es útil para exploración cuando no sabes exactamente qué buscar.

Los bancos europeos lo usan extensamente para segmentación de clientes y detección de anomalías en tiempo real, donde etiquetar cada fraude a priori es imposible.${SEP}Aprendizaje por refuerzo: el modelo aprende por prueba y error, recibiendo señales de recompensa por acciones correctas y penalizaciones por las incorrectas. AlphaGo de DeepMind (Londres) aprendió a jugar Go a nivel sobrehumano jugando millones de partidas contra sí mismo.

También es la base del RLHF (Reinforcement Learning from Human Feedback), el componente que hace que los LLMs respondan de manera útil y segura en lugar de simplemente predecir el siguiente token más probable.${SEP}En la práctica empresarial actual: el 70% de los casos de uso son supervisados (datos históricos con resultados conocidos), el 20% no supervisados (segmentación, detección de anomalías) y el 10% refuerzo (sistemas de recomendación, optimización de procesos).

Los LLMs modernos combinan los tres paradigmas en su ciclo completo de entrenamiento.`;

// B1-L4: Foundation Models — 4 segmentos
// Seg1: el cambio profundo + antes de 2020
// Seg2: la inversión del paradigma + democratización
// Seg3: Europa responde (Mistral)
// Seg4: tres propiedades técnicas + rol del AI Engineer
b1.lecciones.find(l => l.id === 'm1-b1-l4').contenido.teoria.explicacion =
`Los Foundation Models son el cambio más profundo en la historia de la IA desde la invención del backpropagation en los 80. No es hipérbole: cambiaron el modelo económico de toda la industria en menos de tres años.

Antes de 2020, cada aplicación de IA requería un modelo entrenado desde cero para su tarea específica: un modelo para clasificar emails, otro para traducir, otro para resumir. Costo típico por proyecto: entre 500.000 y varios millones de dólares, más equipos especializados y meses de desarrollo. Solo las grandes corporaciones con recursos de investigación podían construir IA avanzada.${SEP}Los Foundation Models invierten este paradigma radicalmente: un único modelo masivo, preentrenado en cientos de miles de millones de parámetros sobre datos generales de texto, código e imágenes, puede adaptarse a miles de tareas distintas con mínima personalización adicional.

GPT-4, Claude 3.5, Llama 3 y Gemini 1.5 son Foundation Models. Su impacto económico es directo: el costo marginal de usar uno para una nueva tarea es casi cero comparado con entrenar un modelo específico.${SEP}Esto democratizó el acceso a IA avanzada a nivel global. Una startup en Helsinki, Berlín o Bogotá puede usar el mismo nivel de capacidad que usa Google internamente, vía API, por fracciones de céntimo por llamada.

Europa respondió con sus propios Foundation Models: Mistral AI (París, 2023) levantó 385 millones de euros en 18 meses. Sus modelos open-weights son la opción preferida de empresas que necesitan soberanía de datos y cumplimiento del EU AI Act sin depender de infraestructura extranjera.${SEP}Los Foundation Models tienen tres propiedades que los definen técnicamente: emergencia (capacidades no programadas aparecen al aumentar la escala de parámetros y datos), generalización (funcionan razonablemente bien en dominios no presentes en el entrenamiento) y adaptabilidad (se ajustan con fine-tuning supervisado o con prompts sin reentrenarse desde cero).

El AI Engineer de 2026 no entrena Foundation Models — los evalúa, orquesta y adapta.`;

// B1-L5: ANI/AGI/ASI — 4 segmentos
// Seg1: la distinción importa + ANI definición
// Seg2: ANI ejemplo concreto (Claude vs negociación)
// Seg3: AGI debate + ASI
// Seg4: implicaciones prácticas para AI Engineer 2026
b1.lecciones.find(l => l.id === 'm1-b1-l5').contenido.teoria.explicacion =
`La distinción entre IA Estrecha (ANI), IA General (AGI) y Superinteligencia (ASI) no es solo filosófica — define el horizonte de lo que las herramientas de hoy pueden y no pueden hacer, y por qué los debates sobre "riesgo existencial de IA" y "IA que ya está aquí" no se contradicen.

IA Estrecha (Artificial Narrow Intelligence) es lo que existe hoy y es todo lo que existe hoy. Un modelo de ANI es extraordinariamente bueno en un dominio específico o conjunto limitado de dominios, pero carece de las capacidades de transferencia y adaptación que los humanos consideran "inteligencia general". GPT-4, Claude Sonnet, Gemini Ultra — todos son ANI. Son mejores que cualquier humano en generar texto, resumir documentos y escribir código en lenguajes específicos, pero si les pides hacer algo físico en el mundo real sin herramientas adicionales, no pueden.${SEP}Un ejemplo revelador: Claude puede escribir código perfecto para calcular la ruta más corta entre dos ciudades usando algoritmos de grafos, pero no puede mirarte a los ojos durante una negociación y detectar que estás nervioso.

Un humano promedio puede hacer ambas cosas (probablemente peor en la programación, mucho mejor en la negociación). Son contexto-dependientes: necesitan que les des información que "fuera de la pantalla" asumirías implícita. Eso es ANI.${SEP}IA General (Artificial General Intelligence) es el nivel donde un sistema IA puede aprender a hacer cualquier tarea cognitiva que un humano pueda hacer, con la misma flexibilidad y transferencia de conocimiento entre dominios. Esto no existe todavía.

El debate en la comunidad investigadora está en si GPT-5 o Claude 4 estarán "cerca" de AGI o si hay saltos cualitativos que aún no sabemos cómo lograr. La mayoría de investigadores serios piensan que AGI está entre 5 y 20 años. Superinteligencia (ASI) es un sistema IA que supera a los humanos en virtualmente todas las dimensiones cognitivas. ASI no existe, no está cerca, y hay desacuerdo genuino sobre si es inevitable, posible, o un escenario de ciencia ficción.${SEP}Para tu trabajo como AI Engineer en 2026: todo lo que construirás usa ANI. Entender sus limitaciones (falta de memoria persistente sin implementación explícita, falta de acceso al mundo físico, alucinaciones, dependencia del contexto) te permite diseñar sistemas más robustos.

No esperes AGI para empezar — la ANI actual ya es suficientemente poderosa para resolver el 80% de los problemas de negocio de cualquier empresa.`;

// B1-L6: IA simbólica vs conexionista — 4 segmentos
// Seg1: dos enfoques filosóficos + IA simbólica
// Seg2: IA conexionista
// Seg3: síntesis neuro-simbólica actual
// Seg4: implicaciones prácticas para AI Engineer
b1.lecciones.find(l => l.id === 'm1-b1-l6').contenido.teoria.explicacion =
`La historia de la IA es fundamentalmente la historia de dos enfoques filosóficos opuestos sobre qué es la inteligencia y cómo replicarla. Entender esta división te ayuda a entender por qué los LLMs modernos son revolucionarios, pero también por qué tienen limitaciones específicas que los sistemas simbólicos no tienen.

IA Simbólica (también llamada GOFAI — Good Old-Fashioned AI): La idea es que la inteligencia se puede representar completamente como manipulación de símbolos con reglas explícitas. Los sistemas expertos de los años 80 eran IA simbólica: un experto médico pasaba meses codificando reglas del tipo "SI el paciente tiene fiebre > 38.5° Y tos seca ENTONCES considerar influenza".

Sus ventajas: son interpretables (puedes trazar exactamente qué regla llevó a qué conclusión), son verificables formalmente, y son correctos dentro de su dominio de reglas. Sus desventajas: necesitan que humanos expertos codifiquen explícitamente todo el conocimiento, no escalan a dominios complejos y ambiguos.${SEP}IA Conexionista: La idea es que la inteligencia emerge de redes de nodos simples (neuronas artificiales) que aprenden patrones de datos sin que nadie les programe las reglas explícitamente. Las redes neuronales, el deep learning, y los LLMs son IA conexionista.

En lugar de que un experto codifique "esto es un gato", la red neuronal ve millones de imágenes de gatos y aprende a reconocer los patrones visuales que constituyen un gato.

Sus ventajas: aprende de datos masivos sin intervención humana por cada regla, generaliza a variaciones no vistas, puede manejar dominios donde las reglas son difíciles de articular. Sus desventajas: es una caja negra, puede alucinaciones, necesita enormes cantidades de datos.${SEP}La síntesis actual — Sistemas Neuro-Simbólicos: El campo está evolucionando hacia sistemas que combinan ambos enfoques. Anthropic usa Constitutional AI que incorpora principios explícitos (simbólicos) para guiar el entrenamiento del modelo conexionista. Los sistemas de RAG (Retrieval Augmented Generation) combinan recuperación simbólica (búsqueda en base de datos estructurada) con generación conexionista (LLM).${SEP}Para ti como AI Engineer: cuando construyas sistemas con LLMs, probablemente necesites añadir capas simbólicas para compensar las limitaciones conexionistas.

¿Necesitas que el sistema siempre siga ciertas reglas de negocio? Añade validación simbólica. ¿Necesitas explicabilidad? Añade logging de razonamiento. ¿El LLM alucina en un dominio específico? Añade una base de conocimiento estructurada con RAG.`;

// B1-L7: Modelos discriminativos vs generativos — 4 segmentos
// Seg1: intro + modelos discriminativos
// Seg2: modelos generativos
// Seg3: por qué importa la distinción en la práctica
// Seg4: LLMs usados de forma discriminativa + era GenAI
b1.lecciones.find(l => l.id === 'm1-b1-l7').contenido.teoria.explicacion =
`Cuando la gente dice "IA generativa" están usando una distinción técnica importante que define dos familias completamente diferentes de modelos de IA, con propósitos, arquitecturas y casos de uso distintos.

Modelos Discriminativos: Aprenden a distinguir entre categorías. Dado un input, responden: ¿A qué categoría pertenece esto? El clásico ejemplo es un clasificador de spam. Técnicamente, aprenden P(categoría | input) — la probabilidad de que un input pertenezca a cada categoría. Modelos discriminativos comunes: clasificadores de sentimiento, detección de objetos en imágenes, clasificación de documentos, detección de fraude, diagnóstico médico binario. La pregunta que responden es SIEMPRE una variación de "¿qué es esto?" o "¿a qué grupo pertenece?"${SEP}Modelos Generativos: Aprenden la distribución completa de los datos. No solo saben distinguir categorías — saben generar nuevos ejemplos que "pertenecen" a esa distribución. Técnicamente, aprenden P(input) — la probabilidad de que cualquier punto de datos sea parte de la distribución aprendida.

Esto les permite generar texto nuevo, imágenes nuevas, audio nuevo. GPT-4, Claude, Stable Diffusion, DALL-E, Midjourney — todos son modelos generativos. La pregunta que responden es "¿cómo sería un nuevo ejemplo de esto?"${SEP}Por qué la distinción importa en la práctica: Si quieres clasificar si un email es phishing o legítimo, un modelo discriminativo entrenado específicamente para esa tarea será más eficiente y preciso que pedirle a Claude que clasifique.

Si quieres generar borradores de respuesta a emails de clientes, un modelo generativo como Claude es la herramienta correcta.${SEP}Los LLMs modernos son generativos por naturaleza: predicen la distribución de probabilidad sobre el siguiente token. Pero pueden usarse de forma discriminativa. Si le preguntas a Claude "¿Este email es spam? Responde solo Sí o No", estás forzando al modelo generativo a comportarse como discriminativo. Funciona, pero generalmente hay clasificadores especializados que son más precisos y económicos para esa tarea específica.

El término "IA generativa" se popularizó en 2022-2023 para referirse específicamente a los modelos que generan contenido nuevo de alta calidad. Cuando escuchas "herramientas de GenAI", piensan en modelos que crean, no que clasifican.`;

// B1-L8: Multimodalidad — 4 segmentos
// Seg1: qué es + camino hacia ella (2021-2023)
// Seg2: por qué es diferente a conectar sistemas
// Seg3: casos de uso concretos
// Seg4: lo que viene + limitaciones actuales
b1.lecciones.find(l => l.id === 'm1-b1-l8').contenido.teoria.explicacion =
`La multimodalidad es el desarrollo más transformador de los últimos 2 años en IA práctica. Un modelo multimodal puede entender y generar múltiples tipos de información — texto, imágenes, audio, video, código — de forma integrada, no como sistemas separados conectados.

El camino hacia la multimodalidad: Hasta 2021, los mejores modelos de IA eran uni-modales. GPT-3 solo procesaba texto. DALL-E 1 solo generaba imágenes. Whisper (2022) transcribía audio. El salto llegó con GPT-4V (2023), Claude 3 (2024) y Gemini (2023): modelos que podían recibir texto e imágenes simultáneamente y razonar sobre ambos de forma integrada. GPT-4o (2024) y Gemini 1.5 Ultra pueden procesar texto, imágenes, audio y video en tiempo real.${SEP}Por qué la multimodalidad es diferente a "conectar sistemas separados": Si conectas OCR + LLM + sistema de imágenes, cada pieza ve una representación diferente del mismo dato y pierde contexto al pasar entre sistemas.

Un modelo multimodal nativo tiene representaciones internas que integran toda la información desde el principio. Puede razonar: "esta gráfica muestra una tendencia que contradice lo que dice el texto en el párrafo anterior" — algo que un sistema conectado no puede hacer sin pipes complejos y pérdida de información.${SEP}Casos de uso concretos que cambian procesos reales:

Análisis de documentos médicos: Un modelo multimodal puede leer simultáneamente el texto del historial clínico y la imagen del scan, y razonar sobre ambos. Revisión de contratos con tablas: Entender texto legal y las tablas numéricas embebidas como un todo coherente. Debugging de interfaces: Tomar un screenshot del error en producción y el mensaje de error juntos. Análisis de videos de reuniones: Transcribir, entender el contexto visual, identificar quién habla cuándo.${SEP}Lo que viene: Modelos nativamente multimodales de audio y video en tiempo real (ya en beta en 2024-2025). La convergencia es hacia un único sistema que pueda manejar cualquier tipo de input y output de forma fluida. Esto no es ciencia ficción — es la dirección clara de todos los grandes laboratorios.

Limitaciones actuales importantes: Los modelos multimodales actuales siguen siendo mejores con texto que con imagen o audio. El razonamiento espacial en imágenes complejas todavía comete errores. El video a escala (> 30 minutos) todavía tiene limitaciones de contexto.`;

// B1-L9: Agentes autónomos — 4 segmentos
// Seg1: LLMs reactivos → agentes + 5 componentes
// Seg2: diferencia LLM vs agente con ejemplo concreto
// Seg3: frameworks actuales (Computer Use, LangChain, CrewAI, Claude Code)
// Seg4: casos de uso reales 2026 + riesgos y principios
b1.lecciones.find(l => l.id === 'm1-b1-l9').contenido.teoria.explicacion =
`Hasta 2024, los LLMs eran fundamentalmente reactivos: respondían a preguntas. Los agentes autónomos representan el salto hacia sistemas que pueden planificar, tomar acciones en el mundo real, y completar objetivos de múltiples pasos sin supervisión humana en cada paso.

¿Qué es un agente de IA? Un agente es un sistema de IA que tiene: (1) Percepción — puede recibir inputs del entorno, (2) Razonamiento — puede planificar una secuencia de pasos para lograr un objetivo, (3) Acción — puede ejecutar herramientas o tomar acciones con efectos reales, (4) Memoria — puede mantener contexto a través de múltiples pasos, y (5) Evaluación — puede verificar si sus acciones lograron el objetivo.${SEP}La diferencia entre LLM y agente: Pedirle a Claude "escribe un email de seguimiento para este cliente" es usar un LLM como herramienta.

Darle a Claude "gestiona el seguimiento de todos los leads de esta semana: revisa el CRM, identifica quién necesita seguimiento, escribe emails personalizados, y programa los envíos" — eso es un agente. El agente usa herramientas (acceso al CRM, acceso al servicio de email, calendario) y completa el objetivo en múltiples pasos.${SEP}Frameworks de agentes actuales:

Claude Computer Use (2024): Claude puede controlar directamente un navegador y computadora — navegar sitios web, hacer clic, llenar formularios, tomar screenshots y razonar sobre lo que ve. LangChain Agents: Framework para construir agentes que pueden usar herramientas definidas por el desarrollador. AutoGen (Microsoft): Sistemas multi-agente donde múltiples LLMs colaboran. CrewAI: Especializado en agentes con roles definidos que trabajan en equipo. Claude Code (2025): Agente especializado en desarrollo de software que puede editar archivos, correr tests y resolver bugs de forma autónoma.${SEP}Casos de uso reales en 2026: Investigación de mercado autónoma, marketing automatizado, desarrollo de software (el agente lee requisitos, escribe código, corre tests, corrige errores), soporte al cliente de nivel 1.

Riesgos y cómo mitigarlos: Un agente que puede tomar acciones reales puede cometer errores reales. Principios de diseño seguro: Human-in-the-loop para acciones de alto impacto (no automatices borrar datos o hacer pagos sin aprobación), scope limitado (dale al agente solo las herramientas que necesita), logging completo de todas las acciones, y rollback capability cuando sea posible.`;

// B1-L10: Ecosistema completo — 4 segmentos
// Seg1: intro 5 capas + Capa 1 hardware + Capa 2 Foundation Models
// Seg2: Capa 3 frameworks + Capa 4 IDEs
// Seg3: Capa 5 aplicaciones + jugadores estratégicos clave
// Seg4: para AI Engineers en LATAM
b1.lecciones.find(l => l.id === 'm1-b1-l10').contenido.teoria.explicacion =
`Para tomar decisiones inteligentes sobre qué aprender, qué herramientas usar y dónde posicionarte profesionalmente, necesitas una visión del ecosistema completo de IA en 2026. Este mapa tiene 5 capas que van desde la infraestructura física hasta las aplicaciones que los usuarios finales usan.

Capa 1 — Hardware e Infraestructura Compute: NVIDIA domina con sus GPUs (H100, H200, Blackwell). AWS, Google Cloud, y Azure son los principales proveedores de cómputo en la nube para IA. Esta capa es donde se gasta el dinero más grande — entrenar un modelo de frontera cuesta cientos de millones de dólares.

Capa 2 — Modelos Fundacionales: Los laboratorios que entrenan los modelos base. Anthropic (Claude), OpenAI (GPT-4o, o1), Google (Gemini), Meta (LLaMA), Mistral, y una docena de laboratorios más pequeños. Para el 99% de los AI Engineers, el trabajo comienza en esta capa, no por debajo.${SEP}Capa 3 — Frameworks y Plataformas: Las herramientas que permiten construir aplicaciones sobre los modelos fundacionales. LangChain y LlamaIndex para orquestación de LLMs. Hugging Face como hub de modelos open source. Pinecone, Weaviate y pgvector para bases de datos vectoriales. Weights & Biases para experiment tracking. Esta capa está en constante cambio — los frameworks populares de 2023 pueden quedar obsoletos en 2024.

Capa 4 — IDEs y Herramientas de Desarrollo Aumentado con IA: Cursor, Windsurf, GitHub Copilot (para desarrollo de software). Perplexity (búsqueda con IA). Esta capa está transformando el trabajo de los developers: un developer con Cursor + Claude Code es 2-4x más productivo que sin ellas.${SEP}Capa 5 — Aplicaciones y Verticales: Las herramientas de usuario final para industrias específicas. Jasper (marketing), Harvey (legal), Nabla (salud), Klarna (finanzas). En LATAM, la oportunidad está en construir estas aplicaciones verticales para mercados locales donde los grandes jugadores globales no están adaptados.

Los jugadores estratégicos clave: Anthropic (referente en seguridad y APIs enterprise), OpenAI (marca más reconocida, integración Microsoft 365), Google (Gemini en todos sus productos), Meta (LLaMA open source — permite correr modelos localmente sin API, crítico para casos de privacidad), Mistral (la alternativa europea, modelos eficientes, open source).${SEP}Para AI Engineers en LATAM: Las mejores oportunidades están en la Capa 5 (aplicaciones verticales), usando las Capas 2 y 3 como infraestructura. No necesitas competir con los grandes laboratorios — construyes sobre su trabajo para resolver problemas específicos de tu mercado.

Cada una de las 5 capas tiene diferentes barreras de entrada y diferentes perfiles profesionales. Conocer el mapa completo te permite elegir conscientemente dónde quieres aportar valor, en lugar de aprender sin dirección.`;

// ─────────────────────────────────────────────────────────────────────
// Guardar y verificar
// ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

// Verificación
let errores = 0;
[b0, b1].forEach(bloque => {
  bloque.lecciones.filter(l => l.tipo === 'leccion').forEach(l => {
    const expl = l.contenido?.teoria?.explicacion || '';
    const segs = expl.split(/\n\n---\n\n/);
    const words = expl.split(/\s+/).length;
    const ok = segs.length >= 3 && words >= 250;
    if (!ok) { console.error('ERROR:', l.id, '— segs:', segs.length, 'words:', words); errores++; }
    else console.log('✓', l.id, '— segs:', segs.length, 'words:', words);
  });
});

if (errores === 0) {
  console.log('\n✓ Todos los segmentos verificados correctamente.');
} else {
  console.error('\n✗', errores, 'lecciones con problemas.');
}
