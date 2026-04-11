// Script: agrega el Boss Battle final a M1 como campo top-level en index.json
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/m1/index.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const bossBattle = {
  "id": "m1-boss-battle",
  "titulo": "Boss Battle: Demuestra que dominas la IA",
  "tipo": "boss_battle",
  "bloque": null,
  "duracion_min": 45,
  "xp": 500,
  "introduccion": "Llegaste hasta aquí. Once bloques, más de 130 lecciones, cientos de conceptos que dejaron de ser abstractos para convertirse en herramientas reales. Ahora viene la prueba que importa.\n\nEsto no es un examen académico. Es un simulacro del tipo de razonamiento que necesitas para trabajar con IA en Europa en 2026: decisiones bajo incertidumbre, trade-offs sin respuesta perfecta, escenarios donde el contexto cambia todo. Veinte preguntas que cruzan todos los bloques de M1.\n\nNo se trata de recordar definiciones. Se trata de demostrar que entiendes por qué las cosas funcionan como funcionan — y que puedes aplicar ese entendimiento a situaciones que nunca habías visto antes.\n\nSi superas este Boss Battle, tienes la base técnica, regulatoria y estratégica para construir, evaluar y defender sistemas de IA en cualquier contexto profesional europeo. Eso vale más que cualquier certificado.\n\nRespira. Confía en lo que construiste. Y enfrenta el reto.",
  "preguntas": [
    {
      "id": "bb-q01",
      "bloque_origen": "B0",
      "cruce_bloques": false,
      "pregunta": "Un policy maker del Ministerio de Economía alemán argumenta: 'Ya invertimos en IA en los 80 con los sistemas expertos y en los 2000 con el machine learning clásico. Siempre prometió más de lo que entregó. ¿Por qué esta vez es diferente?' ¿Qué respuesta técnica es la más precisa y completa?",
      "opciones": [
        "Porque los modelos actuales tienen más capas de redes neuronales y por eso son más inteligentes",
        "Porque las regulaciones europeas como el EU AI Act ahora garantizan que los sistemas funcionen correctamente antes de desplegarse",
        "Porque la convergencia de tres factores simultáneos — escala de cómputo multiplicada por mil, arquitectura Transformer que permite pre-entrenamiento masivo eficiente, y disponibilidad de datos de internet a escala sin precedente — creó un cambio cualitativo en capacidades, no solo cuantitativo",
        "Porque los grandes laboratorios de IA como OpenAI y Anthropic tienen equipos más grandes y mejor financiados que en épocas anteriores"
      ],
      "correcta": 2,
      "explicacion_profunda": "Los 'inviernos de IA' anteriores no ocurrieron por falta de ambición sino por la ausencia simultánea de tres ingredientes que ahora coexisten. En los años 80, los sistemas expertos requerían codificación manual de reglas — no escalaban. En los 2000, el ML clásico tenía los algoritmos pero no el cómputo ni los datos. La transformación de 2017-2026 fue diferente: la arquitectura Transformer (Vaswani et al., 2017) permitió pre-entrenamiento paralelo masivo sobre texto crudo sin etiquetas — resolviendo el cuello de botella de datos etiquetados. Simultáneamente, las GPUs pasaron de millones a miles de millones de operaciones por segundo mientras su costo caía. Y la explosión de internet produjo el corpus de texto más grande de la historia humana. Ninguno de estos tres factores solo era suficiente; la convergencia simultánea produjo el cambio cualitativo. La regulación (EU AI Act) es relevante pero no explica el avance técnico — regula lo que ya funciona, no produce los avances.",
      "concepto_reforzado": "Convergencia de compute + arquitectura + datos como causa del salto cualitativo de la IA moderna"
    },
    {
      "id": "bb-q02",
      "bloque_origen": "B0",
      "cruce_bloques": false,
      "pregunta": "Una consultora de Barcelona está asesorando a tres empresas simultáneamente sobre adopción de IA: (A) fabricante de automóviles, (B) despacho de abogados, (C) cadena de supermercados. ¿Qué criterio técnico-económico debería usar para priorizar en cuál empresa tiene más impacto inmediato la IA?",
      "opciones": [
        "Priorizar la que tiene mayor presupuesto de tecnología, porque la adopción de IA requiere inversión significativa",
        "Priorizar la empresa A (automoción) porque la industria manufacturera tiene más datos históricos disponibles",
        "Priorizar la empresa C (supermercados) porque el sector retail tiene implementaciones de IA más maduras y probadas globalmente",
        "Priorizar la que combina mayor volumen de decisiones repetitivas con datos estructurados ya existentes y menor riesgo regulatorio en su sector específico — que requiere análisis caso por caso pero probablemente favorece a la cadena de supermercados para optimización de inventario y precios"
      ],
      "correcta": 0,
      "explicacion_profunda": "Este es un error clásico de framing: la pregunta no tiene respuesta correcta sin más información, pero de las opciones dadas, la que aplica el criterio correcto de selección es la D. El impacto de IA es máximo donde hay: (1) alto volumen de decisiones similares repetitivas que actualmente requieren juicio humano; (2) datos estructurados que ya existen y son accesibles; (3) costo de error tolerable y supervisión humana factible. Los supermercados cumplen los tres criterios en forecasting de demanda e inventario. El despacho de abogados tiene datos valiosos pero no estructurados y el error en consejo legal tiene implicaciones legales severas (alto riesgo regulatorio). La automoción tiene datos masivos pero las aplicaciones de mayor impacto (conducción autónoma, seguridad) tienen el mayor escrutinio regulatorio europeo bajo el EU AI Act. El presupuesto tecnológico es un enabler, no un predictor de impacto.",
      "concepto_reforzado": "Criterios de priorización para adopción de IA: volumen de decisiones repetitivas + datos estructurados + riesgo regulatorio"
    },
    {
      "id": "bb-q03",
      "bloque_origen": "B1",
      "cruce_bloques": false,
      "pregunta": "Una startup finlandesa está construyendo un asistente de IA para médicos de familia que ayuda a triaje inicial de síntomas. El CTO propone construir su propio modelo desde cero especializado en medicina. El lead engineer propone usar un Foundation Model existente con fine-tuning. ¿Qué argumento técnico es decisivo para preferir el Foundation Model?",
      "opciones": [
        "Los Foundation Models son siempre más baratos de implementar que entrenar desde cero",
        "Un Foundation Model pre-entrenado sobre texto médico masivo ya tiene representaciones latentes de conceptos médicos, farmacológicos y de anatomía construidas durante el pre-entrenamiento — fine-tuning preserva ese conocimiento y solo ajusta el comportamiento de salida para la tarea específica, lo que requiere órdenes de magnitud menos datos y cómputo que entrenar desde cero con capacidades comparables",
        "Los Foundation Models nunca cometen errores médicos graves porque fueron evaluados por especialistas antes de ser publicados",
        "Construir desde cero viola las regulaciones del EU AI Act para sistemas médicos"
      ],
      "correcta": 1,
      "explicacion_profunda": "El argumento técnico central es la transferencia de conocimiento acumulada en el pre-entrenamiento. Un LLM pre-entrenado sobre PubMed, libros médicos y millones de historiales clínicos anonimizados ha construido representaciones internas que capturan relaciones entre síntomas, diagnósticos, medicamentos y contraindicaciones. Fine-tuning sobre este modelo requiere solo miles de ejemplos clínicos específicos para el caso de uso — triaje finlandés, terminología local, flujo de trabajo de atención primaria. Entrenar desde cero para alcanzar capacidades equivalentes requeriría cientos de millones de ejemplos y presupuestos de decenas de millones de euros que ninguna startup puede justificar. El error común es pensar que fine-tuning solo cambia el 'estilo' del modelo — en realidad, el conocimiento médico profundo está en los pesos del modelo base y es precisamente lo que se hereda y aprovecha. La segunda opción es falsa: los Foundation Models pueden cometer errores graves y requieren evaluación rigurosa para uso médico.",
      "concepto_reforzado": "Foundation Models: por qué el pre-entrenamiento masivo produce representaciones transferibles que hacen el fine-tuning viable"
    },
    {
      "id": "bb-q04",
      "bloque_origen": "B1",
      "cruce_bloques": false,
      "pregunta": "Un banco holandés necesita construir dos sistemas: (X) detectar si una transacción es fraudulenta (sí/no con probabilidad), y (Y) generar textos de respuesta personalizados para quejas de clientes. ¿Cuál es la diferencia técnica fundamental en el tipo de modelo apropiado para cada caso?",
      "opciones": [
        "Para X se necesita un modelo más grande que para Y porque la detección de fraude es más compleja",
        "Para X se necesita un modelo discriminativo que aprenda a distinguir patrones de fraude vs legítimo en el espacio de características de la transacción; para Y se necesita un modelo generativo que aprenda la distribución de texto de respuestas apropiadas y pueda muestrear nuevas respuestas coherentes",
        "Para X es preferible reglas hardcoded y para Y cualquier LLM sirve sin fine-tuning",
        "No hay diferencia técnica relevante: ambos sistemas pueden resolverse con el mismo tipo de modelo transformer moderno"
      ],
      "correcta": 1,
      "explicacion_profunda": "La distinción discriminativo/generativo es fundamental y tiene consecuencias prácticas concretas. Un modelo discriminativo para fraude aprende P(fraude | características_transacción): la probabilidad de que una transacción sea fraudulenta dados sus atributos (monto, ubicación, hora, historial del usuario). No necesita 'entender' ni generar texto — solo necesita trazar una frontera de decisión en el espacio de características. Esto se optimiza con XGBoost, redes neuronales de clasificación o transformers entrenados para clasificación binaria. Un modelo generativo para respuestas de atención al cliente aprende P(texto_respuesta | queja_cliente): la distribución de textos apropiados dado el contexto de la queja. Necesita generar texto coherente, empático y factualmente correcto — lo que requiere un LLM con capacidad generativa. Combinar ambos tipos en el mismo sistema es posible: el detector de fraude puede generar señales que alimentan al LLM para que adapte la respuesta ('esta transacción fue bloqueada por medida preventiva y el cliente necesita explicación técnica tranquilizadora').",
      "concepto_reforzado": "Modelos discriminativos vs generativos: cuándo usar cada arquitectura según la naturaleza de la tarea"
    },
    {
      "id": "bb-q05",
      "bloque_origen": "B2",
      "cruce_bloques": false,
      "pregunta": "Un despacho de abogados en París tiene 50,000 contratos en PDF de los últimos 15 años. Quiere implementar búsqueda semántica para que los abogados puedan consultar 'cláusulas de penalización por incumplimiento en contratos de distribución exclusiva con proveedores asiáticos'. El equipo propone usar búsqueda por palabras clave (BM25). ¿Por qué los embeddings y similitud coseno son técnicamente superiores para este caso?",
      "opciones": [
        "Porque los embeddings procesan documentos más rápido que BM25 al ejecutarse en GPU",
        "Porque la similitud coseno mide la distancia angular entre vectores en espacio de alta dimensión, capturando similitud semántica entre la consulta y los contratos aunque no compartan palabras — 'penalización por incumplimiento' puede recuperar contratos que usan 'indemnización por mora', 'cláusula de daños y perjuicios' o 'remedy clause' en versiones bilingües, algo que BM25 completamente falla",
        "Porque los embeddings de texto legal son más precisos que los embeddings generales y el despacho puede entrenarlos en sus contratos",
        "Porque BM25 no puede indexar PDFs mientras que los embeddings sí pueden procesar directamente archivos binarios"
      ],
      "correcta": 1,
      "explicacion_profunda": "La limitación fundamental de BM25 es léxica: encuentra documentos que contienen las palabras exactas de la consulta o variaciones morfológicas. En lenguaje legal, el mismo concepto puede expresarse con vocabulario radicalmente diferente según el país de origen del contrato, el año de redacción, el idioma original y el abogado que lo redactó. Los embeddings de texto capturan significado semántico en un espacio vectorial de alta dimensión: términos con significado similar en contexto se representan con vectores cercanos angularmente. La similitud coseno entre el vector de la consulta y los vectores de los fragmentos de contratos identifica pasajes semánticamente relevantes independientemente del vocabulario exacto. En la práctica, el sistema óptimo para este caso combina BM25 (para recuperación inicial por palabras clave exactas de términos legales técnicos) con re-ranking por similitud coseno (para ordenar los resultados por relevancia semántica) — una arquitectura conocida como hybrid search que combina precisión léxica y semántica.",
      "concepto_reforzado": "Embeddings y similitud coseno: captura de significado semántico más allá de coincidencia léxica"
    },
    {
      "id": "bb-q06",
      "bloque_origen": "B2",
      "cruce_bloques": false,
      "pregunta": "Un equipo de ML en Estocolmo entrena un clasificador de sentimiento para reseñas de productos suecos. Después de 50 épocas, el loss en training set es 0.08 (excelente) pero el loss en validation set es 2.4 (pésimo). El equipo debate qué hacer. ¿Cuál es el diagnóstico correcto y la intervención más efectiva?",
      "opciones": [
        "El modelo necesita más épocas de entrenamiento para que el loss de validation converja al de training",
        "El modelo tiene underfitting: la arquitectura es demasiado simple para capturar los patrones del problema",
        "El modelo tiene overfitting severo: memorizó los datos de entrenamiento sin aprender patrones generalizables — las intervenciones prioritarias son regularización (dropout, L2), reducción de la capacidad del modelo o aumento del dataset de entrenamiento",
        "El dataset de validación está mal construido: la diferencia entre train y validation loss indica un bug en el pipeline de datos"
      ],
      "correcta": 2,
      "explicacion_profunda": "La brecha masiva entre training loss (0.08) y validation loss (2.4) es el patrón definitorio del overfitting: el modelo aprendió los datos de entrenamiento casi perfectamente pero ese aprendizaje no generaliza a datos nuevos. Esto ocurre cuando el modelo tiene demasiada capacidad relativa al tamaño del dataset, cuando el dataset de entrenamiento es pequeño o poco representativo, o cuando el entrenamiento se prolonga demasiado sin regularización. Las intervenciones en orden de efectividad típica: (1) Dropout: desactivar aleatoriamente neuronas durante el entrenamiento fuerza al modelo a aprender representaciones redundantes que generalizan mejor; (2) L2 regularización (weight decay): penaliza pesos grandes que indican memorización; (3) Early stopping: detener el entrenamiento en el punto donde el validation loss es mínimo antes de que empiece a subir; (4) Data augmentation: si el dataset es pequeño, generar variantes de los ejemplos de entrenamiento (para texto sueco: paráfrasis, cambio de léxico regional); (5) Reducir arquitectura del modelo. Entrenar más épocas es la peor intervención posible — empeoraría el overfitting.",
      "concepto_reforzado": "Overfitting: diagnóstico por brecha train/validation loss e intervenciones técnicas ordenadas por efectividad"
    },
    {
      "id": "bb-q07",
      "bloque_origen": "B3",
      "cruce_bloques": false,
      "pregunta": "Un sistema de IA para análisis de contratos legales largos (200+ páginas) empieza a perder coherencia en las respuestas cuando los contratos superan 100,000 tokens. El equipo debate si es un problema de 'memoria' del modelo. ¿Cuál es la explicación técnica correcta y la solución arquitectónica más apropiada?",
      "opciones": [
        "Los LLMs no tienen memoria real — el problema es que el servidor se queda sin RAM al procesar documentos tan largos",
        "El mecanismo de atención en los Transformers tiene complejidad cuadrática O(n²) respecto a la longitud del contexto, y aunque técnicamente el modelo puede procesar 100K tokens, la atención se 'diluye' entre demasiados tokens y el modelo pierde la capacidad de mantener coherencia entre secciones distantes del documento; la solución apropiada es chunking con RAG sobre fragmentos del documento",
        "El modelo necesita ser reentrenado específicamente con contratos legales largos para desarrollar memoria de largo alcance",
        "La ventana de contexto de 100K tokens es insuficiente — se debe esperar a modelos con contextos de 1 millón de tokens para resolver el problema"
      ],
      "correcta": 1,
      "explicacion_profunda": "La ventana de contexto de un Transformer tiene dos limitaciones relacionadas pero distintas. Primero, la complejidad computacional de la atención es O(n²) en el número de tokens: doblar la longitud cuadruplica el cómputo. Segundo, y más importante para este problema, existe el fenómeno de 'lost in the middle': estudios empíricos (Liu et al., 2023) demuestran que los LLMs atienden bien al principio y al final del contexto pero degradan significativamente su rendimiento en información ubicada en el centro de contextos muy largos. En un contrato de 200 páginas, cláusulas críticas en las páginas 80-120 pueden ser efectivamente ignoradas. La solución arquitectónica correcta es RAG: dividir el contrato en chunks semánticamente coherentes (por sección o cláusula), indexarlos en una base vectorial, y recuperar solo los fragmentos relevantes para cada consulta específica. Esto asegura que la información pertinente siempre esté en la zona atendida del contexto. Alternativamente, para contratos donde la coherencia global importa, modelos especializados con atención sparse (Longformer, BigBird) o el nuevo paradigm de 'contextual retrieval' de Anthropic ofrecen mejores trade-offs.",
      "concepto_reforzado": "Ventana de contexto y 'lost in the middle': limitaciones reales de la atención en documentos largos y soluciones arquitectónicas"
    },
    {
      "id": "bb-q08",
      "bloque_origen": "B3+B7",
      "cruce_bloques": true,
      "pregunta": "[CRUCE B3+B7] Un sistema de IA para diagnóstico radiológico en un hospital universitario de Viena genera informes automáticos. Después de 3 meses en producción, los radiólogos reportan que el sistema cita 'hallazgos comparativos con estudios previos del paciente' que a veces no existen. ¿Cuál es el diagnóstico técnico correcto y qué framework de evaluación sistemática implementarías?",
      "opciones": [
        "El modelo tiene un bug de software — las citas de estudios previos son un error de programación en el sistema de recuperación de historiales",
        "El modelo está hallucinating: genera texto plausible sobre estudios previos basándose en patrones estadísticos del entrenamiento en vez de en los datos reales del paciente; el framework de evaluación debe medir tasa de alucinaciones factuales usando ground truth del historial real, con revisión humana de 100% de informes en 30 días y automated fact-checking contra la base de datos del hospital",
        "Los radiólogos están confundiendo la incertidumbre estadística del modelo con alucinaciones — es una limitación conocida que deben aceptar",
        "El problema es que el modelo no tiene suficiente temperatura en los parámetros de generación — reducir la temperatura a 0 eliminaría las alucinaciones"
      ],
      "correcta": 1,
      "explicacion_profunda": "Este caso cruza dos bloques críticos. Desde B3 (arquitectura de LLMs): las alucinaciones ocurren porque los LLMs generan texto maximizando la probabilidad del siguiente token dado el contexto — cuando el contexto no contiene la información necesaria (estudios previos que no existen), el modelo puede generar texto plausible basado en patrones estadísticos del entrenamiento médico en vez de en el dato real. Reducir temperatura a 0 hace la generación más determinística pero no elimina alucinaciones sobre hechos — solo las hace más consistentes. Desde B7 (evaluación): para un sistema médico de alto riesgo, el framework de evaluación debe incluir: (1) Hallucination rate: porcentaje de afirmaciones factuales en los informes que no se pueden verificar contra el historial real del paciente; (2) Severity classification: no todas las alucinaciones tienen el mismo impacto clínico — citar un estudio previo inexistente es diferente a afirmar una patología inexistente; (3) Ground truth comparison: cada informe debe poder auditarse contra los datos reales del PACS (sistema de archivo de imágenes médicas); (4) Revisión 100% humana inmediata: en sistemas médicos de alto riesgo bajo el EU AI Act, la IA es asistente, no decisora independiente. La tasa de alucinaciones debe medirse antes del despliegue, no tres meses después.",
      "concepto_reforzado": "Alucinaciones en LLMs: origen técnico en la generación probabilística + framework de evaluación factual sistemática para aplicaciones críticas"
    },
    {
      "id": "bb-q09",
      "bloque_origen": "B4",
      "cruce_bloques": false,
      "pregunta": "Un hospital belga evalúa dos opciones para su sistema de IA de triaje de urgencias: (A) Claude 3.5 Sonnet vía API de Anthropic — datos procesados en servidores de EEUU con DPA firmado, o (B) Mistral 7B desplegado on-premise en servidores del hospital en Bruselas. La directora médica y el DPO tienen posiciones opuestas. ¿Qué análisis técnico-regulatorio es correcto?",
      "opciones": [
        "La opción A es claramente superior porque Claude tiene mayor capacidad médica según los benchmarks de razonamiento clínico",
        "La opción B es siempre preferible para datos médicos porque los servidores propios son la única forma de cumplir el GDPR",
        "El análisis correcto depende de múltiples factores: A requiere transferencia a terceros con datos biométricos (categoría especial GDPR), DPA riguroso y Schrems II compliance; B elimina la transferencia pero requiere infraestructura, mantenimiento y que Mistral 7B tenga capacidad médica suficiente para el caso de uso — la decisión óptima depende del volumen de consultas, del nivel de complejidad médica requerida y de la capacidad técnica del equipo",
        "Ambas opciones son equivalentes técnica y legalmente si se firma un DPA con cualquier proveedor"
      ],
      "correcta": 2,
      "explicacion_profunda": "Este es un trade-off técnico-regulatorio real sin respuesta absoluta. La opción A (API externa) ofrece capacidad médica superior en modelos grandes, pero implica transferencia internacional de datos de salud — categoría especial bajo GDPR Art. 9 con restricciones adicionales. La transferencia a EEUU requiere mecanismos específicos post-Schrems II (Standard Contractual Clauses actualizadas, evaluación de impacto de transferencia). El DPA debe garantizar explícitamente no uso de datos para entrenamiento. La opción B (on-premise) elimina el riesgo de transferencia internacional y da control total sobre los datos, pero Mistral 7B puede ser insuficiente para triaje complejo (diagnóstico diferencial de múltiples síntomas con alta stakes). La solución híbrida que muchos hospitales europeos están adoptando: B para triaje inicial simple (protocolo estandarizado, baja complejidad) con escalado a A solo para casos que lo requieren, con anonimización cuando sea técnicamente posible antes del envío. El EU AI Act clasifica sistemas de triaje médico como potencialmente de alto riesgo, añadiendo obligaciones de documentación y supervisión humana independientemente de la opción elegida.",
      "concepto_reforzado": "Open source vs propietario en contexto médico europeo: trade-offs entre capacidad técnica, compliance GDPR y soberanía de datos"
    },
    {
      "id": "bb-q10",
      "bloque_origen": "B4",
      "cruce_bloques": false,
      "pregunta": "Un equipo de ingeniería de software en Dublín tiene que implementar un sistema que: (1) interpreta facturas en PDF con formatos irregulares, (2) extrae campos estructurados, (3) detecta anomalías que podrían indicar fraude y (4) redacta un párrafo explicando al contable por qué una factura fue marcada. ¿Qué arquitectura de modelos y razonamiento aplica correctamente a cada subtarea?",
      "opciones": [
        "Un solo modelo de razonamiento como o1 puede resolver las cuatro tareas secuencialmente sin necesidad de arquitectura especializada",
        "La subtarea 1 y 2 requieren modelo multimodal (visión + texto) para procesar PDFs; la subtarea 3 es mejor con un modelo discriminativo especializado en patrones de fraude entrenado con datos históricos de la empresa; la subtarea 4 requiere modelo generativo con capacidad de explicación; combinarlos en pipeline es técnicamente superior a una solución monolítica",
        "Todas las subtareas deben resolverse con modelos separados entrenados desde cero para maximizar precisión",
        "Los modelos de razonamiento como DeepSeek R1 son la mejor opción para todo porque razonan paso a paso y el fraude requiere razonamiento complejo"
      ],
      "correcta": 1,
      "explicacion_profunda": "Este es un caso de diseño de sistema multi-modelo donde la especialización supera a la solución monolítica. Subtarea 1-2 (extracción de PDFs con formatos irregulares): requiere modelo multimodal con visión para interpretar la estructura visual del documento — no solo el texto extraído por OCR. Modelos como Claude 3.5 Sonnet o GPT-4o con visión pueden interpretar posiciones relativas de campos, tablas y logotipos. Subtarea 3 (detección de anomalías de fraude): los patrones de fraude financiero son específicos al contexto empresarial, los clientes habituales y los importes típicos. Un modelo discriminativo entrenado con datos históricos de la empresa específica superará a un LLM genérico para esta tarea, además de ser más eficiente en inferencia. Subtarea 4 (explicación al contable): requiere generación de lenguaje natural coherente y explicativa — exactamente para lo que los LLMs están optimizados. Los modelos de razonamiento (o1, DeepSeek R1) son valiosos para problemas que requieren cadenas de razonamiento largas y verificables (matemáticas, código complejo, lógica), pero añaden latencia y costo innecesarios para las subtareas 1-3.",
      "concepto_reforzado": "Arquitectura multi-modelo: cuándo especializar por subtarea es técnicamente superior a solución monolítica"
    },
    {
      "id": "bb-q11",
      "bloque_origen": "B5",
      "cruce_bloques": false,
      "pregunta": "Una aseguradora en Zurich tiene 500,000 pólizas con condiciones que se actualizan trimestralmente por cambios regulatorios. Sus agentes usan un chatbot de IA para responder consultas de clientes. El equipo debate: ¿fine-tuning del LLM base cada trimestre o RAG con base vectorial actualizada? ¿Cuál es el análisis técnico correcto?",
      "opciones": [
        "Fine-tuning es siempre superior porque modifica los pesos del modelo directamente con los datos más recientes",
        "RAG es claramente superior para este caso: actualizar una base vectorial con las nuevas pólizas toma horas vs semanas de ciclo de fine-tuning, el costo es órdenes de magnitud menor, y la información específica de cada póliza puede recuperarse con precisión —  fine-tuning además no garantiza que el modelo 'recuerde' datos específicos de pólizas individuales sin riesgo de forgetting catastrófico",
        "Ambas opciones son equivalentes en este caso — la decisión debe basarse únicamente en el presupuesto disponible",
        "Ni RAG ni fine-tuning resuelven el problema — se necesita re-entrenar el modelo completo desde cero con cada actualización regulatoria"
      ],
      "correcta": 1,
      "explicacion_profunda": "Este es exactamente el caso de uso donde RAG supera consistentemente a fine-tuning. El análisis técnico tiene varias dimensiones. Velocidad de actualización: añadir nuevas pólizas a una base vectorial (indexar PDFs, generar embeddings, insertar en pgvector o Pinecone) toma horas. Un ciclo de fine-tuning requiere: preparar el dataset de entrenamiento, ejecutar el entrenamiento (horas o días en GPU), evaluar el modelo actualizado, desplegarlo. Con actualizaciones trimestrales obligatorias esto se vuelve operativamente insostenible. Precisión para datos específicos: RAG puede recuperar la póliza exacta de un cliente con una búsqueda vectorial sobre su número de contrato o nombre — la precisión es directamente verificable. Fine-tuning no garantiza que el modelo 'aprenda' datos de pólizas específicas: la información concreta de contratos individuales es exactamente el tipo de datos que los LLMs tienden a olvidar o confundir (forgetting catastrófico, confusión entre pólizas similares). Costo: embedding y búsqueda vectorial es una fracción del costo de fine-tuning recurrente. El caso de uso de fine-tuning es diferente: ajustar el tono, el vocabulario específico de la aseguradora, o el formato de respuesta — no para mantener datos actualizados.",
      "concepto_reforzado": "RAG vs fine-tuning: cuándo la actualización frecuente de conocimiento hace RAG técnicamente y económicamente superior"
    },
    {
      "id": "bb-q12",
      "bloque_origen": "B5+B9",
      "cruce_bloques": true,
      "pregunta": "[CRUCE B5+B9] Una empresa de telecomunicaciones en Portugal quiere entrenar un modelo de IA que predice la probabilidad de que un cliente abandone la compañía (churn) usando datos de uso, facturación e interacciones con servicio al cliente. El equipo de datos quiere usar los últimos 3 años de datos históricos completos. El DPO (Data Protection Officer) bloquea el proyecto. ¿Cuál es el fundamento legal correcto del DPO y qué arquitectura de datos permite el proyecto dentro del GDPR?",
      "opciones": [
        "El DPO está siendo excesivamente cauteloso — los datos de clientes propios siempre pueden usarse para analítica interna sin restricciones adicionales",
        "El DPO tiene razón: los datos de uso y comportamiento de clientes recopilados para facturación y servicio no pueden reutilizarse automáticamente para entrenar modelos de predicción de comportamiento futuro sin nueva base legal; la arquitectura correcta es anonimización técnicamente robusta (k-anonimidad + differential privacy) o nueva base legal por interés legítimo documentado con DPIA, limitando el uso a modelos agregados que no puedan reidentificar individuos",
        "Basta con firmar un contrato interno entre el equipo de datos y el DPO para autorizar el uso",
        "El GDPR permite siempre el uso de datos propios para mejorar los servicios de la empresa bajo la base legal de 'interés legítimo' sin análisis adicional"
      ],
      "correcta": 1,
      "explicacion_profunda": "Este caso cruza técnica de datos (B5) con regulación (B9). El fundamento del DPO es correcto y se basa en el principio de limitación de finalidad del GDPR (Art. 5.1.b): los datos recopilados para una finalidad específica (facturación, gestión del servicio) no pueden reutilizarse automáticamente para una finalidad diferente (predicción de comportamiento futuro para retención comercial) sin análisis de compatibilidad o nueva base legal. El interés legítimo como base legal es posible pero requiere un test de balanceo documentado (¿el interés de la empresa en retener clientes supera los derechos de privacidad del cliente?) y, para proyectos de alto impacto, una DPIA (Data Protection Impact Assessment). Las arquitecturas de datos técnicamente compatibles con el GDPR incluyen: (1) Anonimización robusta — k-anonimidad garantiza que cada individuo sea indistinguible de al menos k-1 otros; differential privacy añade ruido matemático controlado para impedir reidentificación. Si el dataset es verdaderamente anónimo, el GDPR no aplica. (2) Federated learning — el modelo aprende sobre los datos sin que salgan del sistema de producción, reduciendo el riesgo de exposición. (3) Datos agregados — modelos de cohortes en vez de predicción individual.",
      "concepto_reforzado": "Principio de limitación de finalidad GDPR: reutilización de datos de entrenamiento y arquitecturas de anonimización que cumplen la regulación"
    },
    {
      "id": "bb-q13",
      "bloque_origen": "B6",
      "cruce_bloques": false,
      "pregunta": "El CTO de una empresa de software en Praga presenta a la junta directiva un análisis de selección de LLM basado íntegramente en el MMLU leaderboard de Hugging Face. El modelo elegido ocupa el puesto #3. La CIO rechaza el análisis. ¿Cuál es el argumento técnico más sólido de la CIO?",
      "opciones": [
        "Los leaderboards de Hugging Face solo evalúan modelos open source y el modelo en posición 3 probablemente sea propietario y no esté disponible para su empresa",
        "MMLU mide razonamiento académico general en inglés en condiciones de laboratorio estáticas; su posición en ese ranking no predice rendimiento en las tareas específicas de la empresa (en checo, con datos propios, en contexto de uso real), y existe el riesgo documentado de data contamination donde los modelos top han sido optimizados para estos benchmarks específicos durante el entrenamiento",
        "El leaderboard está desactualizado — los modelos se actualizan tan rápido que cualquier ranking tiene más de 3 meses de antigüedad es irrelevante",
        "La posición #3 es claramente inferior a la #1 y el análisis debería haber seleccionado el modelo número uno directamente"
      ],
      "correcta": 1,
      "explicacion_profunda": "La crítica técnica de la CIO ataca dos problemas fundamentales en el uso de MMLU para decisiones de procurement. Primero, la validez externa: MMLU (Massive Multitask Language Understanding) evalúa conocimiento académico en 57 disciplinas en inglés con formato de preguntas de opción múltiple. Una empresa de software en Praga necesita un modelo que funcione en checo, que entienda el dominio específico del software que desarrollan, y que rinda bien en las tareas concretas de su pipeline (generación de código, documentación técnica, respuestas a tickets de soporte en checo). La correlación entre posición en MMLU y rendimiento en estas tareas específicas puede ser baja o incluso negativa. Segundo, data contamination: múltiples estudios (Jacovi et al., 2023; Golchin & Surdeanu, 2023) documentan que los mejores modelos en benchmarks públicos han visto en su entrenamiento los pares pregunta-respuesta de esos benchmarks, inflando artificialmente su posición. La evaluación correcta es: seleccionar 3-5 candidatos basándose en benchmarks como punto de partida, luego ejecutar evaluación propia con 200-500 ejemplos reales de las tareas específicas de la empresa en el idioma y contexto de uso real.",
      "concepto_reforzado": "Limitaciones de benchmarks públicos: data contamination, validez externa y por qué la evaluación propia es irreemplazable"
    },
    {
      "id": "bb-q14",
      "bloque_origen": "B6",
      "cruce_bloques": false,
      "pregunta": "Un Ministerio de Justicia francés evalúa implementar un asistente de IA para que los jueces accedan a jurisprudencia relevante. El equipo técnico presenta cuatro opciones: Claude 3.5 Sonnet (Anthropic/EEUU), GPT-4o (OpenAI/EEUU), Gemini 1.5 Pro (Google/EEUU) y Mistral Large (Mistral/Francia). El secretario general de informática argumenta fuertemente por Mistral. ¿Qué argumentos técnicos y regulatorios apoyan esa posición?",
      "opciones": [
        "Mistral Large es superior técnicamente a todos los demás modelos en tareas de razonamiento legal en francés según los benchmarks disponibles",
        "Mistral es la única opción que cumple el GDPR automáticamente por ser una empresa europea",
        "Mistral ofrece ventajas concretas para este caso: la empresa es francesa y puede negociar acuerdos de datos soberanos con garantías de que los datos procesados no salen del territorio europeo, sus modelos pueden desplegarse on-premise en infraestructura del Ministerio eliminando dependencia tecnológica de terceros países, y el EU AI Act tiene provisiones específicas sobre datos judiciales que hacen la soberanía tecnológica especialmente relevante — aunque la calidad técnica específica en razonamiento legal en francés debe verificarse con evaluación propia",
        "La selección de Mistral es políticamente motivada y técnicamente no tiene fundamento"
      ],
      "correcta": 2,
      "explicacion_profunda": "El caso del Ministerio de Justicia francés ilustra perfectamente cómo el contexto europeo cambia las variables de decisión respecto al análisis puramente técnico-económico. Los argumentos del secretario de informática tienen fundamento en tres dimensiones. Soberanía de datos: los datos judiciales franceses incluyen información sensible sobre casos en curso, partes procesales y estrategias legales del Estado. Procesarlos en servidores de empresas americanas sujetas a CLOUD Act (que permite al gobierno de EEUU acceder a datos en servidores de empresas americanas globalmente) es un riesgo de seguridad nacional documentado que ha llevado a múltiples administraciones europeas a adoptar políticas de cloud soberano. Despliegue on-premise: Mistral publica sus pesos bajo licencias que permiten despliegue local — los modelos de OpenAI, Anthropic y Google son únicamente accesibles vía API, lo que implica dependencia permanente de su infraestructura. Regulatorio: el EU AI Act classifica sistemas de IA usados en la administración de justicia como de alto riesgo con requisitos estrictos de auditabilidad que son más fáciles de satisfacer con infraestructura controlada. El caveat del análisis es correcto: la calidad técnica específica en razonamiento legal en francés debe verificarse — Mistral Large tiene excelente desempeño en francés pero la evaluación propia con casos reales de jurisprudencia es indispensable.",
      "concepto_reforzado": "Soberanía tecnológica y modelos europeos: argumentos técnicos y regulatorios para decisiones de procurement en administración pública"
    },
    {
      "id": "bb-q15",
      "bloque_origen": "B7",
      "cruce_bloques": false,
      "pregunta": "Un sistema de IA detecta cáncer de mama en mamografías para el sistema sanitario de los Países Bajos. Los oncólogos evalúan dos modelos candidatos: Modelo X tiene 94% de accuracy, 96% de precision y 88% de recall. Modelo Y tiene 91% de accuracy, 82% de precision y 97% de recall. Ante igualdad de costo computacional, ¿cuál deberían seleccionar y por qué?",
      "opciones": [
        "Modelo X porque tiene mayor accuracy y precision, lo que indica mejor rendimiento general",
        "Modelo Y porque tiene mayor recall — en diagnóstico de cáncer, el costo de un falso negativo (no detectar un cáncer real) es radicalmente mayor que el costo de un falso positivo (derivar a biopsia un tejido benigno); el 97% de recall de Y significa que solo el 3% de los cánceres reales se pierden vs el 12% con X",
        "Ninguno — la diferencia entre los modelos es pequeña y no justifica una decisión sin más datos",
        "Modelo X porque una precision del 82% en Y significa que el 18% de las alarmas son falsas, lo que sobrecarga el sistema de biopsias"
      ],
      "correcta": 1,
      "explicacion_profunda": "Este es el caso paradigmático donde la elección de la métrica correcta es una decisión médica y ética, no solo técnica. El análisis del costo asimétrico de errores es central: un falso negativo en cáncer de mama significa que una paciente con tumor maligno es enviada a casa con un resultado 'limpio' — el cáncer progresa sin tratamiento hasta que se detecta en estadio más avanzado, donde la supervivencia a 5 años cae del 99% (estadio I) al 28% (estadio IV). Un falso positivo significa que una paciente sin cáncer es derivada a biopsia — un procedimiento invasivo pero con mortalidad prácticamente nula y con resultado definitivo negativo que tranquiliza a la paciente. La asimetría de consecuencias es enorme: el costo humano de 12 falsos negativos (X) vs 3 (Y) por cada 100 casos reales de cáncer no tiene comparación con el costo de las biopsias adicionales innecesarias que genera Y. La precision más baja de Y (82% vs 96%) sí tiene un costo operativo real — más biopsias, mayor carga para el sistema — pero este costo se puede manejar con supervisión radiológica adicional de los casos positivos, mientras que los falsos negativos del Modelo X no tienen remedio hasta la revisión anual. En el sistema sanitario europeo con recursos para biopsias adicionales, Modelo Y es la elección correcta.",
      "concepto_reforzado": "Precision vs Recall en diagnóstico médico: costo asimétrico de errores y por qué maximizar recall es la decisión correcta en detección de cáncer"
    },
    {
      "id": "bb-q16",
      "bloque_origen": "B7",
      "cruce_bloques": false,
      "pregunta": "Un modelo de IA para predicción de demanda energética en la red eléctrica española fue validado con excelente rendimiento antes del lanzamiento (MAPE 4.2%). Seis meses después del despliegue, el error ha subido a MAPE 11.8% sin cambios en el modelo. El equipo de MLOps investiga la causa. ¿Cuál es el diagnóstico más probable y la intervención correcta?",
      "opciones": [
        "El modelo tiene un bug introducido en un deploy reciente que corrompió los pesos del modelo",
        "Los usuarios están usando el sistema incorrectamente — se necesita más formación sobre cómo interpretar las predicciones",
        "Data drift o concept drift: la distribución de los datos de entrada en producción ha cambiado respecto a los datos de entrenamiento (por ejemplo, nuevas plantas de energía renovable que cambian los patrones de consumo, cambios en hábitos post-pandemia, o variaciones climáticas inusuales) — la intervención correcta es monitoreo de distribución de features, reentrenamiento con datos recientes y evaluación continua con ventana deslizante",
        "El MAPE de 4.2% inicial era demasiado optimista y el 11.8% es el rendimiento real del modelo"
      ],
      "correcta": 2,
      "explicacion_profunda": "La degradación de rendimiento sin cambios en el modelo es el patrón definitorio de data drift o concept drift en producción. Data drift: las distribuciones de los inputs al modelo han cambiado — la temperatura media de los últimos meses, los patrones de consumo industrial post-verano, o la penetración de vehículos eléctricos que carga por las noches son diferentes a los patrones del dataset de entrenamiento. El modelo fue entrenado para aprender relaciones en un contexto que ya no es el contexto actual. Concept drift: la relación entre los inputs y el output ha cambiado — por ejemplo, si España instaló 5GW adicionales de solar fotovoltaica en los 6 meses, la relación entre irradiación solar y demanda neta de red cambió estructuralmente. La intervención correcta tiene tres componentes: (1) Diagnóstico: monitorear distribuciones de features en tiempo real (media, varianza, percentiles) y detectar shift estadísticamente significativo con pruebas como PSI (Population Stability Index) o Jensen-Shannon divergence; (2) Reentrenamiento: incorporar datos recientes en el pipeline de entrenamiento con mayor peso en observaciones recientes (ventana temporal deslizante); (3) Evaluación continua: comparar predicciones del modelo contra actuals en producción con métricas automatizadas que disparen alertas cuando el error supere umbrales definidos.",
      "concepto_reforzado": "Data drift y concept drift: degradación de modelos en producción, diagnóstico mediante monitoreo de distribuciones y estrategias de reentrenamiento"
    },
    {
      "id": "bb-q17",
      "bloque_origen": "B8",
      "cruce_bloques": false,
      "pregunta": "Un startup de telemedicina en Oslo debe diseñar su infraestructura de IA. Su sistema analiza síntomas, historial médico y resultados de análisis de pacientes noruegos para sugerir posibles diagnósticos a los médicos. El CTO propone: modelo Claude 3.5 Sonnet vía API para el razonamiento médico, procesamiento en AWS us-east-1 (Virginia, EEUU) por ser más barato. La CTO de compliance bloquea esta arquitectura. ¿Cuál es el fundamento técnico-regulatorio correcto para el bloqueo?",
      "opciones": [
        "AWS us-east-1 tiene mayor latencia desde Oslo que las regiones europeas, lo que afectaría la experiencia del médico",
        "El procesamiento de datos de salud de ciudadanos noruegos en servidores de EEUU viola el Reglamento General de Protección de Datos (GDPR, aplicable en Noruega por ser parte del EEE) y posiblemente la Ley de Datos de Salud Noruega — los datos de salud son categoría especial que requiere garantías adicionales para transferencias internacionales y un DPA específico; la arquitectura correcta es AWS eu-north-1 (Estocolmo) con DPA firmado y garantías contractuales de no uso para entrenamiento",
        "AWS no puede usarse para datos médicos en ningún país europeo independientemente de la región seleccionada",
        "El único problema es el costo: us-east-1 puede usarse si el startup firma un contrato de seguro de responsabilidad civil por brechas de datos"
      ],
      "correcta": 1,
      "explicacion_profunda": "Este caso combina infraestructura (B8) con regulación de datos. Noruega no es miembro de la UE pero es parte del Espacio Económico Europeo (EEE) y ha adoptado el GDPR en su legislación nacional. Los datos de salud son categoría especial bajo GDPR Art. 9 — tienen el nivel más alto de protección. Procesar estos datos en servidores en EEUU (sujetos al CLOUD Act que permite al gobierno americano acceder a datos de empresas americanas en cualquier localización) requiere análisis específico bajo el marco post-Schrems II: Standard Contractual Clauses actualizadas más un Transfer Impact Assessment que evalúe si el marco legal americano ofrece protección equivalente al GDPR. Para datos médicos, este TIA típicamente concluye que las garantías son insuficientes sin medidas técnicas adicionales. La solución técnica correcta: AWS eu-north-1 (Estocolmo) o eu-west-1 (Irlanda) garantiza que los datos procesan en territorio EEE. Para la API de Claude, Anthropic ofrece opciones enterprise con procesamiento en territorio europeo y DPA que garantiza no uso de datos para entrenamiento — esto debe verificarse y documentarse. La latencia es un argumento válido pero secundario al compliance.",
      "concepto_reforzado": "Localización de datos médicos en Europa: GDPR categoría especial, transferencias internacionales y requisitos de infraestructura en EEE"
    },
    {
      "id": "bb-q18",
      "bloque_origen": "B8+B9",
      "cruce_bloques": true,
      "pregunta": "[CRUCE B8+B9] Una empresa de seguros en Varsovia procesa 800,000 solicitudes de seguro anuales. Quiere implementar un sistema de IA que evalúa el riesgo y sugiere la prima a cobrar. El equipo técnico calcula que procesar en API externa costaría $40,000/año y desplegar Mistral 7B propio costaría $180,000/año (servidor + mantenimiento). El director financiero quiere la API. El equipo legal bloquea. ¿Cuál es el análisis correcto que integra tanto el factor económico como el regulatorio?",
      "opciones": [
        "El director financiero tiene razón — el ahorro de $140,000 anuales justifica cualquier riesgo regulatorio adicional",
        "El equipo legal tiene razón pero el razonamiento puramente económico ignora factores críticos: el sistema de evaluación de riesgo de seguros es de alto riesgo bajo el EU AI Act, lo que impone obligaciones de auditabilidad y explicabilidad que son significativamente más fáciles de cumplir con infraestructura propia; el costo real de la solución propia debe incluir compliance pero el costo de la API debe incluir los costos ocultos de due diligence regulatorio, DPA enterprise y el riesgo de multas por incumplimiento del EU AI Act que pueden superar €20M",
        "La diferencia de costo es irrelevante — la decisión debe basarse exclusivamente en qué opción cumple el EU AI Act",
        "Ambas opciones son igualmente válidas bajo el EU AI Act si el proveedor de API firma los documentos correctos"
      ],
      "correcta": 1,
      "explicacion_profunda": "Este caso cruza decisiones de infraestructura (B8) con marco regulatorio (B9) en un análisis de costo real que va más allá del cálculo superficial. El análisis económico correcto debe incorporar los costos totales de compliance. La opción API ($40,000/año) tiene costos ocultos adicionales: DPA enterprise con el proveedor (típicamente requiere plan business/enterprise con costo adicional), Transfer Impact Assessment si el proveedor es americano, auditoría externa del sistema de IA (obligatoria para sistemas de seguros de alto riesgo), y el costo esperado del riesgo regulatorio (probabilidad de auditoría × multa potencial). Las multas del EU AI Act para sistemas de alto riesgo en incumplimiento llegan a €15-30M o 3-6% de facturación global. La opción on-premise ($180,000/año) da control total sobre auditabilidad, logs de decisiones, y facilita cumplir las obligaciones de explicabilidad del EU AI Act (el cliente tiene derecho a saber por qué se le cobró determinada prima). El análisis correcto compara: $40,000 + costos de compliance API vs $180,000 + costos de compliance propios. La diferencia real puede ser mucho menor que $140,000 y el perfil de riesgo regulatorio puede justificar la inversión adicional en infraestructura propia para un sistema de seguros de alto riesgo.",
      "concepto_reforzado": "Análisis de costo total de ownership incluyendo compliance regulatorio: por qué el costo de infraestructura y el costo de regulación deben evaluarse juntos"
    },
    {
      "id": "bb-q19",
      "bloque_origen": "B9",
      "cruce_bloques": false,
      "pregunta": "Una empresa de software de RRHH en Ámsterdam vende a clientes corporativos un sistema que: analiza CVs, puntúa candidatos, genera recomendaciones de selección y puede emitir decisiones de rechazo automático para el 60% de los candidatos. ¿Cómo clasifica exactamente el EU AI Act este sistema y qué obligaciones concretas impone antes del despliegue?",
      "opciones": [
        "El sistema es de riesgo limitado — solo requiere un aviso de que los candidatos están siendo evaluados por IA",
        "El sistema es de riesgo inaceptable y está prohibido por el EU AI Act porque toma decisiones de empleo de forma automática",
        "El sistema es de alto riesgo bajo el EU AI Act (Anexo III, categoría 4: sistemas de IA usados para contratación y selección de personal); antes del despliegue debe completar: evaluación de conformidad, registro en la base de datos europea de IA, documentación técnica del dataset y metodología, sistema de gestión de calidad, mecanismo de supervisión humana efectiva, logs auditables y evaluación de sesgos por grupos protegidos",
        "El EU AI Act no aplica a este sistema porque es software vendido B2B a empresas, no directamente a consumidores individuales"
      ],
      "correcta": 2,
      "explicacion_profunda": "El EU AI Act clasifica sistemas de IA según el riesgo de daño que pueden causar. El Anexo III enumera explícitamente los sistemas de alto riesgo, e incluye en la categoría 4 los 'sistemas de IA usados para contratación o selección de personas, para toma de decisiones relativas a la promoción y finalización de relaciones laborales, para asignar tareas y para monitorear y evaluar el rendimiento y la conducta de las personas'. El sistema descrito cumple todos estos criterios. Las obligaciones de alto riesgo antes del despliegue son estrictas: (1) Evaluación de conformidad: verificar que el sistema cumple todos los requisitos técnicos del EU AI Act, realizable mediante autoevaluación con documentación completa o mediante organismo notificado externo; (2) Registro: el sistema debe registrarse en la base de datos europea antes de comercializarse; (3) Documentación técnica: descripción del sistema, datos de entrenamiento y validación, métricas de rendimiento por subgrupos demográficos; (4) Sistema de gestión de calidad: procesos de monitoreo continuo; (5) Supervisión humana: el sistema no puede emitir decisiones de rechazo automático sin posibilidad de revisión humana efectiva — el 60% de rechazos automáticos es problemático y requiere mecanismo de impugnación; (6) Logs auditables: cada decisión debe registrarse para auditoría posterior.",
      "concepto_reforzado": "EU AI Act clasificación de alto riesgo para sistemas de RRHH: obligaciones específicas antes del despliegue y supervisión humana requerida"
    },
    {
      "id": "bb-q20",
      "bloque_origen": "B9",
      "cruce_bloques": false,
      "pregunta": "Un banco español diseña un sistema de scoring crediticio que debe ser 'justo'. El equipo de ética de IA presenta tres métricas de fairness alternativas: (A) Demographic parity: igual tasa de aprobación de créditos para todos los grupos demográficos. (B) Equalized odds: igual tasa de verdaderos positivos y falsos positivos entre grupos. (C) Individual fairness: personas con perfiles financieros similares deben recibir puntuaciones similares independientemente de su grupo demográfico. Históricamente, diferentes regiones tienen diferentes tasas de impago real. ¿Qué decisión técnica y ética es correcta?",
      "opciones": [
        "El banco debe implementar las tres métricas simultáneamente para garantizar la máxima equidad posible",
        "Demographic parity es la única métrica legalmente aceptable porque el GDPR prohíbe usar datos demográficos en decisiones crediticias",
        "Las tres métricas son matemáticamente incompatibles cuando las tasas base de impago difieren entre grupos — la decisión de cuál priorizar es una elección ética explícita con consecuencias redistributivas concretas, no una solución técnica neutral; en el contexto del marco europeo de protección contra discriminación, equalized odds suele ser la métrica regulatoriamente más defensible porque garantiza que el sistema falla por igual para todos los grupos",
        "Individual fairness es siempre superior porque no requiere categorizar por grupos demográficos"
      ],
      "correcta": 2,
      "explicacion_profunda": "Este es el problema de la imposibilidad de fairness (Chouldechova, 2017) aplicado a decisiones crediticias europeas. La demostración matemática es directa: si las tasas reales de impago entre regiones son diferentes (supongamos 8% en Madrid vs 15% en otra región por razones económicas históricas), entonces: Demographic parity requiere aprobar igual porcentaje en ambas regiones — el modelo tendría que aprobar más solicitantes de la región de mayor impago que su perfil financiero individual justificaría, lo que aumenta pérdidas. Equalized odds requiere que, entre quienes sí pagarán el crédito, el banco apruebe igual porcentaje de ambas regiones, y entre quienes no pagarán, rechace igual porcentaje. Con tasas base diferentes, esto es matemáticamente incompatible con demographic parity. Individual fairness evalúa a cada persona por sus méritos financieros individuales sin referencia al grupo — pero puede reproducir desigualdades históricas estructurales si los inputs contienen proxies de grupo. El marco regulatorio europeo (Directiva de Igualdad de Trato, Art. 21 Carta de Derechos Fundamentales de la UE) prohíbe discriminación por origen territorial o etnia. Equalized odds es el criterio que mejor refleja este principio: garantiza que dos personas con el mismo perfil real de riesgo, independientemente de dónde vivan, sean tratadas equivalentemente por el modelo. La clave es reconocer que esta elección tiene consecuencias redistributivas reales y debe documentarse como decisión explícita del banco, no como output neutral de un algoritmo.",
      "concepto_reforzado": "Imposibilidad de fairness con tasas base diferentes: por qué la elección de métrica es una decisión ética documentable, no una solución técnica"
    }
  ],
  "recompensa": {
    "mensaje_victoria": "Lo lograste. Veinte preguntas que cubrieron cada rincón de M1 — y las superaste.\n\nAhora entiendes cómo funciona la IA por dentro y por fuera: la arquitectura de los Transformers, los datos que los alimentan, las métricas que los miden, la infraestructura que los sostiene y el marco regulatorio que los gobierna en Europa. No como definiciones memorizadas. Como herramientas que sabes cuándo y cómo usar.\n\nEso es exactamente lo que necesitas para trabajar con IA en 2026.\n\nM1 completado. Eres Fundamentos de IA.",
    "xp_bonus": 500,
    "badge": "M1 Master",
    "badge_descripcion": "Completó el Boss Battle de Fundamentos de IA con dominio de los 11 bloques del módulo"
  }
};

// Agregar como campo top-level en el index.json
data.boss_battle = bossBattle;

// Guardar
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

// Verificación
console.log('✓ Boss Battle M1 insertado correctamente');
console.log('  ID:', bossBattle.id);
console.log('  Preguntas:', bossBattle.preguntas.length);
console.log('  XP recompensa:', bossBattle.recompensa.xp_bonus);
console.log('  Badge:', bossBattle.recompensa.badge);

// Verificar distribución de correctas
const dist = {0:0, 1:0, 2:0, 3:0};
bossBattle.preguntas.forEach(q => dist[q.correcta]++);
console.log('  Distribución de correctas:', dist);

// Verificar preguntas cross-bloque
const cross = bossBattle.preguntas.filter(q => q.cruce_bloques);
console.log('  Preguntas cross-bloque:', cross.length, cross.map(q => q.bloque_origen).join(', '));

// Verificar palabras en explicaciones
const minWords = Math.min(...bossBattle.preguntas.map(q => q.explicacion_profunda.split(/\s+/).length));
const maxWords = Math.max(...bossBattle.preguntas.map(q => q.explicacion_profunda.split(/\s+/).length));
console.log('  Palabras por explicación: min=' + minWords + ' max=' + maxWords);

// Verificar introducción
const introWords = bossBattle.introduccion.split(/\s+/).length;
console.log('  Palabras introducción:', introWords);
console.log('  Palabras mensaje victoria:', bossBattle.recompensa.mensaje_victoria.split(/\s+/).length);
