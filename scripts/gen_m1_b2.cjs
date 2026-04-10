const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/m1/index.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const b2 = data.bloques[2];

const nuevas = {
  "m1-b2-l3": {
    "titulo": "Matrices y operaciones clave para IA",
    "bloque": 2,
    "tipo": "leccion",
    "duracion_min": 22,
    "xp": 50,
    "contenido": {
      "teoria": {
        "explicacion": "Las matrices son la estructura de datos fundamental de la inteligencia artificial. Cada vez que un modelo procesa texto, imagen o audio, está realizando multiplicaciones de matrices. Entender esto no es opcional para quien quiera ir más allá de ser usuario de herramientas. Una matriz es simplemente una tabla de números organizada en filas y columnas. Una matriz de 768x1024 (como la que usa internamente BERT) contiene los pesos sinápticos que codifican el conocimiento del modelo. Las operaciones matriciales que más importan en IA son tres: multiplicación de matrices (cómo se propaga la información en una red neuronal), transposición (cambiar filas por columnas, esencial para calcular atención), y producto punto (medir similitud entre vectores). La multiplicación de matrices es la operación más costosa computacionalmente en IA. Cuando ves titulares sobre chips de Nvidia o TPUs de Google, hablan de hardware especializado para hacer millones de multiplicaciones de matrices por segundo. GPT-4 realiza aproximadamente 10^23 operaciones de punto flotante durante el entrenamiento. En la práctica profesional, el uso de matrices aparece de tres formas: en embeddings (cada palabra/token se representa como un vector de 768-4096 dimensiones), en attention (los mecanismos que permiten al modelo relacionar palabras distantes), y en fine-tuning (ajustar los pesos de una matriz para un caso de uso específico). La librería NumPy en Python hace estas operaciones en una línea. PyTorch y TensorFlow manejan matrices multidimensionales llamadas tensores, donde una imagen RGB es un tensor 3D (alto x ancho x 3 canales de color). Para los profesionales que no van a entrenar modelos sino a usarlos vía API, la importancia práctica de matrices está en entender por qué GPT-4 'entiende' el contexto de 128,000 tokens: es porque mantiene una matriz de atención que relaciona cada token con todos los demás. Eso tiene implicaciones directas en cómo debes estructurar tus prompts y qué información debe aparecer cerca de las instrucciones clave.",
        "analogia": "Una matriz es como una hoja de Excel: filas, columnas, números. La multiplicación de matrices es como combinar dos tablas de Excel para obtener insights compuestos. Solo que en IA lo hacemos con millones de filas simultáneamente.",
        "ejemplo_malo": "Ignorar matrices por completo y tratar los modelos como 'cajas negras mágicas' — limita tu capacidad de diagnosticar por qué un modelo falla.",
        "ejemplo_bueno": "Entender que el tamaño de la ventana de contexto (128K tokens en Claude) está directamente limitado por la memoria necesaria para la matriz de atención.",
        "por_que_importa": "Las matrices no son teoría abstracta: son la razón por la que el hardware de IA vale billones de dólares y por qué los modelos tienen limitaciones específicas.",
        "tip_profesional": "Cuando un modelo 'pierde el hilo' en conversaciones largas, es un problema de atención matricial. Solución práctica: resumir contexto previo en los primeros 2000 tokens del prompt."
      },
      "verificacion": [
        {
          "pregunta": "¿Por qué las multiplicaciones de matrices son tan importantes en hardware de IA como GPUs y TPUs?",
          "opciones": [
            "Porque las matrices almacenan los prompts del usuario",
            "Porque son la operación computacional más crítica en redes neuronales y requieren hardware especializado",
            "Porque permiten conectarse a internet más rápido",
            "Porque reducen el costo de las APIs"
          ],
          "correcta": 1,
          "explicacion_profunda": "Las GPUs de Nvidia y las TPUs de Google están diseñadas específicamente para realizar millones de multiplicaciones de matrices en paralelo. Esta es la operación fundamental en el forward pass y backpropagation de redes neuronales. Un chip H100 de Nvidia puede realizar 3,958 TFLOPS (billones de operaciones de punto flotante por segundo), casi todas multiplicaciones de matrices.",
          "concepto_reforzado": "Matrices como base computacional de IA"
        },
        {
          "pregunta": "¿Cómo se relaciona el tamaño de la ventana de contexto de un LLM con las matrices?",
          "opciones": [
            "No hay relación, el contexto depende solo del software",
            "La ventana de contexto es la cantidad de matrices que tiene el modelo",
            "La ventana de contexto está limitada por la memoria necesaria para la matriz de atención, que crece cuadráticamente con el número de tokens",
            "Las ventanas de contexto grandes usan matrices más pequeñas"
          ],
          "correcta": 2,
          "explicacion_profunda": "La atención en transformers requiere calcular una matriz de tamaño N×N donde N es el número de tokens. Con 128K tokens, eso es 128,000 × 128,000 = 16 billones de pares de atención. Esta es la principal limitación física de las ventanas de contexto largas y por qué requieren tanto hardware especializado.",
          "concepto_reforzado": "Atención matricial y ventanas de contexto"
        },
        {
          "pregunta": "¿Qué es un tensor en el contexto de PyTorch o TensorFlow?",
          "opciones": [
            "Un tipo de red neuronal",
            "Una matriz multidimensional (generalización de matrices a más de 2 dimensiones)",
            "Un archivo de configuración del modelo",
            "Una función de activación"
          ],
          "correcta": 1,
          "explicacion_profunda": "Un tensor es la generalización de matrices a múltiples dimensiones. Un número es un tensor 0D (escalar), un vector es 1D, una matriz es 2D. Una imagen RGB es un tensor 3D (alto × ancho × 3 canales). Un batch de imágenes es 4D. Los modelos de video trabajan con tensores 5D. PyTorch y TensorFlow están optimizados para operaciones sobre tensores.",
          "concepto_reforzado": "Tensores como generalización de matrices"
        },
        {
          "pregunta": "Si un modelo 'pierde el hilo' en una conversación muy larga, ¿cuál es la causa técnica más probable?",
          "opciones": [
            "El modelo se cansa como los humanos",
            "La API tiene un bug",
            "La atención matricial se diluye al haber demasiados tokens que relacionar, y la información antigua recibe menos peso",
            "El modelo actualiza sus pesos durante la conversación"
          ],
          "correcta": 2,
          "explicacion_profunda": "En conversaciones largas, la matriz de atención debe distribuir 'presupuesto de atención' entre todos los tokens. Con 100K tokens, cada token recibe en promedio 0.001% de la atención total. La información del principio de la conversación puede quedar prácticamente ignorada. La solución profesional es resumir contexto previo periódicamente o usar RAG para recuperar información relevante.",
          "concepto_reforzado": "Dilución de atención en contextos largos"
        },
        {
          "pregunta": "¿En qué formato interno representan los modelos las palabras antes de procesarlas?",
          "opciones": [
            "Como texto plano con codificación UTF-8",
            "Como matrices de atención",
            "Como vectores de alta dimensión (embeddings) de 768-4096 números",
            "Como archivos de audio convertidos a texto"
          ],
          "correcta": 2,
          "explicacion_profunda": "Internamente, cada token (palabra o subpalabra) se convierte primero en un vector de embedding de alta dimensión. GPT-3 usa 12,288 dimensiones, BERT base usa 768, Claude usa dimensiones similares a GPT-4. Estos vectores capturan semántica: palabras similares tienen vectores cercanos en el espacio matemático. Todas las operaciones de atención y razonamiento se hacen sobre estos vectores, nunca sobre texto directamente.",
          "concepto_reforzado": "Representación interna como vectores"
        }
      ],
      "practica": {
        "tipo": "caso_real",
        "contexto": "Eres el director de IT de una empresa manufacturera. El proveedor de IA te propone tres opciones: Modelo A con ventana de contexto de 8K tokens, Modelo B con 32K tokens, Modelo C con 128K tokens. El Modelo C cuesta 10x más que el A.",
        "instruccion": "Usando lo que sabes sobre matrices de atención y ventanas de contexto, diseña el criterio de decisión: ¿qué tipo de tareas justifican pagar 10x más por 128K tokens? ¿Para qué tareas el modelo A de 8K es suficiente?",
        "pista": "Piensa en qué tareas requieren 'ver' documentos completos vs. qué tareas se pueden dividir en partes.",
        "solucion": "MODELO A (8K): suficiente para clasificación de emails cortos, respuestas de FAQ, análisis de un documento de 5-6 páginas, chatbots de soporte. MODELO B (32K): análisis de contratos de 20-25 páginas, revisión de informes técnicos completos, comparación de 3-4 documentos simultáneamente. MODELO C (128K): análisis de expedientes legales completos (50-100 páginas), revisión de código de repositorios completos, análisis de bases de datos de clientes completas, síntesis de años de comunicaciones. El criterio: si tu tarea requiere que el modelo 'vea' todo el contexto simultáneamente para razonar, necesitas ventana grande. Si puedes dividir el problema en partes independientes, el modelo más barato es suficiente y más rentable.",
        "criterios_de_exito": [
          "Identifica al menos 2 casos de uso para cada tamaño de ventana",
          "Menciona el factor de divisibilidad de tareas como criterio clave",
          "Considera el costo-beneficio, no solo la capacidad técnica"
        ]
      },
      "conexion": {
        "siguiente": "Probabilidad y estadística esencial — la base para entender por qué los modelos son probabilísticos, no determinísticos.",
        "modulo_relacionado": "M3 — Redes Neuronales: aquí usarás matrices diariamente para entender architecturas"
      }
    }
  },
  "m1-b2-l4": {
    "titulo": "Probabilidad y estadística esencial para ML",
    "bloque": 2,
    "tipo": "leccion",
    "duracion_min": 24,
    "xp": 50,
    "contenido": {
      "teoria": {
        "explicacion": "Los modelos de machine learning no son sistemas determinísticos que dan siempre la misma respuesta. Son motores probabilísticos: asignan probabilidades a todas las respuestas posibles y seleccionan según esa distribución. Entender probabilidad básica no es teoría académica; es entender por qué tu modelo a veces se equivoca, por qué el parámetro 'temperatura' cambia la creatividad, y por qué necesitas datos suficientes para que un modelo sea confiable. El concepto más importante: probabilidad condicional P(B|A) — 'la probabilidad de B dado que A ocurrió'. En LLMs esto se expresa como P(siguiente_token | tokens_anteriores). Cada vez que el modelo genera una palabra, está calculando la distribución de probabilidad sobre todo su vocabulario (50,000+ tokens) y eligiendo según esa distribución. La temperatura controla cuánto 'aplana' o 'afila' esa distribución: temperatura 0 = siempre elige el máximo (determinístico, predecible), temperatura 1 = distribución natural del modelo (equilibrada), temperatura 2 = distribución más plana (más aleatorio, creativo pero menos coherente). La estadística descriptiva que necesitas: media (valor esperado de las predicciones), varianza (qué tan dispersas son las predicciones — alta varianza = modelo inconsistente), y distribuciones (normal para regresión, softmax para clasificación). El Teorema de Bayes es fundamental para entender cómo los modelos actualizan sus 'creencias': P(hipótesis|datos) ∝ P(datos|hipótesis) × P(hipótesis). En fine-tuning, esto se traduce a: dado este nuevo ejemplo de entrenamiento, cómo actualizo mis pesos para asignar mayor probabilidad a la respuesta correcta. Las métricas estadísticas más usadas en evaluación de modelos: precisión (de lo que predijo positivo, qué porcentaje era real), recall (de lo que era positivo, qué porcentaje encontré), F1-score (equilibrio entre ambas), y para LLMs: perplejidad (qué tan 'sorprendido' está el modelo por el texto — menor perplejidad = mejor modelo). En la práctica profesional, estas métricas determinan si un modelo de clasificación de contratos es confiable para producción o solo para prototipo. Un modelo con 95% de precisión pero 40% de recall en un caso de fraude financiero puede ser peligroso: clasifica bien los fraudes que detecta, pero se le escapa el 60% de los casos reales.",
        "analogia": "La temperatura en un LLM es como el nivel de creatividad de un humano: con temperatura 0 el modelo es un ejecutivo corporativo que siempre responde de forma predecible y correcta. Con temperatura 2 es un poeta bohemio que dice cosas interesantes pero a veces incoherentes.",
        "ejemplo_malo": "Usar temperatura 0.9 para un sistema que debe generar documentos legales — la alta aleatoriedad puede introducir errores sutiles pero críticos.",
        "ejemplo_bueno": "Usar temperatura 0-0.2 para tareas de extracción y análisis, temperatura 0.7-0.9 para generación creativa de contenido de marketing.",
        "por_que_importa": "La probabilidad explica los 'alucinaciones' de los LLMs: el modelo no miente, sino que asigna probabilidad a afirmaciones que parecen plausibles dado el entrenamiento, aunque sean falsas.",
        "tip_profesional": "Para reducir alucinaciones en sistemas críticos: baja temperatura + RAG (recuperar documentos reales como contexto) + instrucción explícita de decir 'no sé' cuando la confianza es baja."
      },
      "verificacion": [
        {
          "pregunta": "¿Qué sucede matemáticamente cuando bajas la temperatura de un LLM a 0?",
          "opciones": [
            "El modelo se vuelve más creativo",
            "La distribución de probabilidad se vuelve una función delta: siempre elige el token con máxima probabilidad",
            "El modelo deja de funcionar",
            "El modelo genera respuestas más largas"
          ],
          "correcta": 1,
          "explicacion_profunda": "Temperatura 0 convierte el muestreo probabilístico en selección determinística (greedy decoding): siempre se elige el token con mayor logit/probabilidad. Esto hace al modelo reproducible y predecible, pero también más 'plano' y menos creativo. Para sistemas de producción que necesitan consistencia (extracción de datos, clasificación), temperatura 0-0.2 es lo recomendado.",
          "concepto_reforzado": "Temperatura como control de la distribución de probabilidad"
        },
        {
          "pregunta": "Un sistema de detección de fraude tiene 99% precisión y 30% recall. ¿Cómo interpretas esto?",
          "opciones": [
            "El sistema es excelente, 99% es un número muy alto",
            "El sistema detecta bien los fraudes que marca, pero deja pasar el 70% de los fraudes reales",
            "El sistema tiene un bug",
            "El sistema necesita más datos de entrenamiento"
          ],
          "correcta": 1,
          "explicacion_profunda": "99% de precisión significa: de cada 100 alertas de fraude, 99 son reales. Excelente tasa de falsos positivos. Pero 30% de recall significa: de cada 100 fraudes reales que ocurren, el sistema solo detecta 30 y deja pasar 70. Para detección de fraude, el recall suele ser más crítico: el costo de un fraude no detectado supera enormemente el costo de investigar una alerta falsa. Este modelo tendría alto impacto negativo en producción.",
          "concepto_reforzado": "Trade-off precisión vs recall en contextos críticos"
        },
        {
          "pregunta": "¿Por qué los LLMs 'alucinan' información falsa con confianza?",
          "opciones": [
            "Porque tienen errores en el código",
            "Porque los modelos son inherentemente deshonestos",
            "Porque asignan alta probabilidad a afirmaciones plausibles según su entrenamiento, independientemente de si son verdaderas",
            "Porque no tienen acceso a internet"
          ],
          "correcta": 2,
          "explicacion_profunda": "Un LLM no 'sabe' qué es verdad y qué es mentira en el sentido humano. Genera tokens según su distribución aprendida de probabilidad condicional. Si durante el entrenamiento el modelo vio patrones como 'El Premio Nobel de Física 2024 fue ganado por...' seguido de nombres de físicos famosos, puede generar un nombre plausible aunque incorrecto. La solución es RAG (retrieval-augmented generation): forzar al modelo a anclar sus respuestas en documentos reales recuperados, no solo en su memoria paramétrica.",
          "concepto_reforzado": "Alucinaciones como consecuencia del razonamiento probabilístico"
        },
        {
          "pregunta": "¿Qué es la perplejidad (perplexity) como métrica de evaluación de LLMs?",
          "opciones": [
            "El porcentaje de preguntas que el modelo no puede responder",
            "Una medida de cuánto 'se sorprende' el modelo con el texto: menor perplejidad indica mejor predicción del lenguaje",
            "El número de errores gramaticales en la salida",
            "La velocidad de generación de tokens"
          ],
          "correcta": 1,
          "explicacion_profunda": "La perplejidad es la exponencial de la entropía cruzada promedio: mide cuántas opciones 'considera' el modelo en promedio al predecir cada token. Un modelo con perplejidad 10 considera en promedio 10 tokens igualmente probables para cada posición — menor es mejor. GPT-2 tenía perplejidad ~35 en WikiText. GPT-3 la redujo a ~20. Los modelos actuales están por debajo de 10 en textos comunes. Importante: perplejidad baja no implica respuestas correctas factualmente, solo que el modelo predice bien la estructura del lenguaje.",
          "concepto_reforzado": "Perplejidad como métrica de calidad de modelo de lenguaje"
        },
        {
          "pregunta": "¿Para qué tarea usarías temperatura 0.0 y para cuál 0.8?",
          "opciones": [
            "0.0 para poesía, 0.8 para clasificación",
            "0.0 para clasificar contratos como válidos/inválidos, 0.8 para generar ideas de campañas de marketing",
            "0.0 y 0.8 son equivalentes para tareas de negocio",
            "0.8 siempre da mejores resultados que 0.0"
          ],
          "correcta": 1,
          "explicacion_profunda": "Temperatura 0.0 es ideal para tareas determinísticas donde necesitas consistencia y exactitud: extracción de datos estructurados, clasificación, análisis legal, código. Temperatura 0.7-0.9 es mejor para generación creativa donde la variedad es deseable: brainstorming, copywriting, generación de nombres, ideación. Para sistemas en producción, siempre documenta la temperatura usada: un cambio de 0.0 a 0.5 puede hacer que resultados previamente consistentes se vuelvan variables.",
          "concepto_reforzado": "Temperatura óptima según tipo de tarea"
        }
      ],
      "practica": {
        "tipo": "caso_real",
        "contexto": "Tu empresa está evaluando dos modelos de IA para clasificar contratos como 'aprobado' o 'revisar manualmente'. Modelo X: 92% precisión, 85% recall. Modelo Y: 98% precisión, 60% recall. El costo de revisar manualmente un contrato es $50. El costo de aprobar un contrato defectuoso sin revisión es $5,000.",
        "instruccion": "Con base en precisión, recall y costos de negocio, ¿cuál modelo recomendarías y por qué? Calcula el impacto económico aproximado de cada error.",
        "pista": "El recall alto significa que se te escapan menos contratos problemáticos. El costo de un falso negativo (aprobar lo malo) es mucho mayor que un falso positivo (revisar lo bueno).",
        "solucion": "Recomendación: Modelo X (92% precisión, 85% recall). Razonamiento: El recall del Modelo Y es solo 60%, lo que significa que de cada 100 contratos defectuosos, 40 serían aprobados automáticamente causando $5,000 × 40 = $200,000 en daño potencial por cada 100 contratos malos. El Modelo X con 85% recall dejaría pasar 15 contratos malos: $5,000 × 15 = $75,000 en daño potencial — 62% menos riesgo. El costo adicional de revisiones manuales en el Modelo X (menor precisión = más falsos positivos que revisar) es marginal a $50/revisión comparado con los $5,000 por error real. Conclusión: en contextos de alto impacto asimétrico, priorizar recall sobre precisión.",
        "criterios_de_exito": [
          "Usa las métricas de precisión y recall correctamente en la argumentación",
          "Incorpora el análisis de costos de negocio, no solo métricas técnicas",
          "Identifica qué tipo de error es más costoso en este contexto"
        ]
      },
      "conexion": {
        "siguiente": "Funciones, derivadas y gradiente descendente — entender cómo los modelos aprenden y se optimizan.",
        "modulo_relacionado": "M5 — Machine Learning Clásico: aquí aplicarás estas métricas para evaluar modelos de ML"
      }
    }
  },
  "m1-b2-l5": {
    "titulo": "Funciones, derivadas y gradiente descendente sin dolor",
    "bloque": 2,
    "tipo": "leccion",
    "duracion_min": 25,
    "xp": 50,
    "contenido": {
      "teoria": {
        "explicacion": "El gradiente descendente es el algoritmo que hace posible que los modelos de IA aprendan. Sin él, no existiría ChatGPT, Claude, ni ningún modelo de deep learning moderno. La buena noticia: no necesitas calcular derivadas manualmente. Necesitas entender conceptualmente qué hacen para poder tomar decisiones inteligentes sobre entrenamiento y fine-tuning. Una función es una máquina que convierte un input en un output. La función de pérdida (loss function) mide qué tan equivocada está la predicción de tu modelo: si predijo probabilidad 0.1 para la respuesta correcta cuando debería ser 1.0, la pérdida es alta. El objetivo del entrenamiento es minimizar esta función de pérdida. Una derivada mide cómo cambia el output de una función cuando cambias el input. En IA, la pregunta es: si aumento ligeramente el peso W de esta neurona, ¿la pérdida aumenta o disminuye? La derivada responde eso: si es positiva, el peso está 'empujando en la dirección incorrecta'; si es negativa, está 'ayudando'. El gradiente es el vector de todas las derivadas parciales: indica la dirección de máximo crecimiento de la función de pérdida. Para minimizar la pérdida, nos movemos en la dirección opuesta al gradiente (descenso). La tasa de aprendizaje (learning rate) controla qué tan grandes son estos pasos: demasiado grande = el modelo salta sobre el mínimo y diverge; demasiado pequeño = el entrenamiento tarda semanas. El optimizador Adam (Adaptive Moment Estimation) es el estándar en 2026: ajusta automáticamente la tasa de aprendizaje para cada parámetro. Las implicaciones prácticas para profesionales: cuando haces fine-tuning, eliges cuántas épocas (pasadas completas por los datos) entrenar. Pocas épocas = underfitting (el modelo no aprende suficiente). Demasiadas = overfitting (el modelo memoriza los ejemplos de entrenamiento pero falla en ejemplos nuevos). El learning rate scheduler reduce automáticamente la tasa de aprendizaje a medida que avanza el entrenamiento, como un escultor que usa primero herramientas grandes y luego finas. Los frameworks modernos como PyTorch y las plataformas como Vertex AI de Google o Azure ML calculan todos los gradientes automáticamente usando autodiferenciación. Lo que tú controlas como ML engineer o prompt engineer avanzado son los hiperparámetros: learning rate inicial, batch size, número de épocas, arquitectura del optimizador.",
        "analogia": "Imagina que estás en una montaña con niebla buscando el valle más profundo. El gradiente te dice en qué dirección sube el terreno. Para encontrar el mínimo, das pasos en la dirección contraria. La tasa de aprendizaje es el tamaño de tus pasos: muy grandes y puedes caer de la montaña, muy pequeños y tardarás días en llegar.",
        "ejemplo_malo": "Usar learning rate 0.1 para fine-tuning de un LLM — es 100x demasiado alto, destruirá el conocimiento preentrenado del modelo (catastrophic forgetting).",
        "ejemplo_bueno": "Fine-tuning de LLM con learning rate 1e-5 a 5e-5, 3-5 épocas, verificando que la pérdida en validación siga bajando (no sube = no overfitting).",
        "por_que_importa": "El gradiente descendente es lo que diferencia a un modelo que aprende de uno que memoriza. Entenderlo te permite diagnosticar por qué tu fine-tuning falló y cómo corregirlo.",
        "tip_profesional": "Para fine-tuning de LLMs: siempre usa LoRA (Low-Rank Adaptation) en lugar de full fine-tuning — entrena solo 0.1% de los parámetros, 10x menos costoso, resultados similares o mejores en tareas específicas."
      },
      "verificacion": [
        {
          "pregunta": "¿Por qué el gradiente descendente da pasos en la dirección OPUESTA al gradiente?",
          "opciones": [
            "Por convención matemática histórica",
            "Porque el gradiente indica la dirección de máximo crecimiento, y queremos minimizar la pérdida, no maximizarla",
            "Porque así lo programaron los ingenieros de Google",
            "Para evitar que el modelo converja demasiado rápido"
          ],
          "correcta": 1,
          "explicacion_profunda": "El gradiente siempre apunta hacia donde la función crece más rápido. Si queremos minimizar la función de pérdida (hacer el error más pequeño), necesitamos movernos en la dirección contraria al gradiente — donde la función decrece. Esta es la intuición completa del descenso de gradiente: seguir la pendiente 'hacia abajo' en el paisaje de la función de pérdida.",
          "concepto_reforzado": "Dirección de optimización vs dirección del gradiente"
        },
        {
          "pregunta": "Un modelo de fine-tuning muestra pérdida de entrenamiento bajando pero pérdida de validación subiendo. ¿Qué está pasando?",
          "opciones": [
            "El modelo está aprendiendo correctamente",
            "El modelo está en overfitting: memorizando ejemplos de entrenamiento en lugar de generalizar",
            "El learning rate es demasiado bajo",
            "Se necesitan más datos de entrenamiento"
          ],
          "correcta": 1,
          "explicacion_profunda": "Cuando la pérdida de entrenamiento baja pero la de validación sube, el modelo está overfitting: memorizando los patrones exactos del conjunto de entrenamiento en lugar de aprender a generalizar. La solución es: reducir épocas de entrenamiento (early stopping cuando la validación empieza a subir), aumentar regularización (dropout, weight decay), o agregar más datos de entrenamiento diversos.",
          "concepto_reforzado": "Overfitting y cómo detectarlo con curvas de pérdida"
        },
        {
          "pregunta": "¿Por qué usar learning rate 1e-5 en fine-tuning de LLM en lugar de 0.01?",
          "opciones": [
            "Por limitaciones de hardware",
            "Para hacer el entrenamiento más lento intencionalmente",
            "Para preservar el conocimiento preentrenado: pasos grandes destruirían los pesos cuidadosamente optimizados en preentrenamiento (catastrophic forgetting)",
            "Porque 1e-5 da mejores métricas matemáticamente"
          ],
          "correcta": 2,
          "explicacion_profunda": "Un LLM preentrenado como GPT o Claude tiene pesos ajustados con billones de tokens de datos. Un learning rate alto (0.01) hace pasos tan grandes en el espacio de parámetros que 'pisotea' el conocimiento preentrenado — el modelo olvida lo que sabía (catastrophic forgetting) y solo recuerda los ejemplos de fine-tuning. Learning rates bajos (1e-5 a 5e-5) hacen ajustes delicados sobre el conocimiento existente, como afinar un instrumento en lugar de reconstruirlo.",
          "concepto_reforzado": "Catastrophic forgetting y learning rates en fine-tuning"
        },
        {
          "pregunta": "¿Qué hace LoRA (Low-Rank Adaptation) diferente del fine-tuning tradicional?",
          "opciones": [
            "LoRA entrena un modelo completamente nuevo desde cero",
            "LoRA congela los pesos originales y solo entrena matrices de adaptación de bajo rango, reduciendo parámetros entrenables en 100x",
            "LoRA usa un learning rate diferente",
            "LoRA solo funciona con imágenes"
          ],
          "correcta": 1,
          "explicacion_profunda": "LoRA (Low-Rank Adaptation) es la técnica dominante para fine-tuning eficiente de LLMs. En lugar de modificar los 70B+ parámetros de un modelo grande, LoRA congela todos los pesos originales y agrega pequeñas matrices de 'adaptación' (rango 8-64) a cada capa de atención. Esto reduce los parámetros entrenables de 70B a ~100M (0.14%), reduciendo costo de cómputo y memoria 100x. Los resultados son comparables o mejores que fine-tuning completo en tareas específicas.",
          "concepto_reforzado": "LoRA como fine-tuning eficiente"
        },
        {
          "pregunta": "¿Qué es una época (epoch) en el contexto de entrenamiento de modelos?",
          "opciones": [
            "El tiempo total que tarda el entrenamiento",
            "Una pasada completa por todo el conjunto de datos de entrenamiento",
            "El número de capas en la red neuronal",
            "La cantidad de tokens procesados por segundo"
          ],
          "correcta": 1,
          "explicacion_profunda": "Una época es una pasada completa por todos los ejemplos del conjunto de entrenamiento. Si tienes 10,000 ejemplos de fine-tuning y batch size de 32, una época implica 313 pasos de gradiente. El modelo ve cada ejemplo una vez por época. En fine-tuning de LLMs, típicamente se usan 3-5 épocas: suficientes para que el modelo aprenda el dominio específico sin memorizar los ejemplos.",
          "concepto_reforzado": "Épocas como unidad de entrenamiento"
        }
      ],
      "practica": {
        "tipo": "caso_real",
        "contexto": "Tu equipo está haciendo fine-tuning de un modelo para clasificar tickets de soporte técnico en 5 categorías. Después de 10 épocas de entrenamiento, la precisión en entrenamiento es 99% pero en el conjunto de prueba es solo 67%. Tu jefe sugiere 'entrenar más épocas para que el modelo aprenda mejor'.",
        "instruccion": "¿Tu jefe tiene razón? Explica qué está pasando técnicamente y da 3 recomendaciones específicas para mejorar el modelo.",
        "pista": "La brecha enorme entre entrenamiento (99%) y prueba (67%) es una señal diagnóstica clave.",
        "solucion": "El jefe está equivocado. El modelo ya está en overfitting severo: memoriza los ejemplos de entrenamiento (99%) pero no generaliza a datos nuevos (67%). Más épocas empeorarían el problema. Recomendaciones: 1) Reducir épocas a 3-5 y usar early stopping (detener cuando la validación deje de mejorar). 2) Usar regularización: dropout 0.1-0.3 en las capas finales. 3) Aumentar datos de entrenamiento con ejemplos diversos o usar data augmentation (parafrasear tickets existentes con un LLM para crear variaciones). 4) Si los datos son limitados, considerar un modelo más pequeño que no tenga tanta capacidad de memorización.",
        "criterios_de_exito": [
          "Identifica correctamente el overfitting como causa del problema",
          "Contradice la sugerencia del jefe con argumento técnico claro",
          "Da al menos 2 soluciones concretas y actionables"
        ]
      },
      "conexion": {
        "siguiente": "Embeddings: cómo los números representan significado — la base de la búsqueda semántica y los sistemas RAG.",
        "modulo_relacionado": "M6 — Deep Learning: aquí implementarás gradiente descendente en código real"
      }
    }
  },
  "m1-b2-l6": {
    "titulo": "Embeddings: cómo los números representan significado",
    "bloque": 2,
    "tipo": "leccion",
    "duracion_min": 22,
    "xp": 50,
    "contenido": {
      "teoria": {
        "explicacion": "Los embeddings son la tecnología más práctica y transformadora que puedes dominar en 2026 sin necesidad de entrenar modelos desde cero. Un embedding es una representación numérica densa de texto (o imágenes, audio, código) en un espacio vectorial de alta dimensión. La magia: en ese espacio, el significado se convierte en geometría. Palabras con significado similar quedan cerca en el espacio vectorial. La frase 'el cliente está frustrado' y 'el usuario está molesto' tendrán vectores similares aunque no compartan palabras. Esta propiedad hace posible la búsqueda semántica: en lugar de buscar coincidencias exactas de palabras (como Google en 1998), buscas por significado. Los embeddings se crean con modelos especializados. Para texto en español, los modelos más usados en 2026 son: text-embedding-3-large de OpenAI (3072 dimensiones, $0.13/1M tokens), text-embedding-004 de Google (768 dimensiones, gratis en cuota baja), y multilingual-e5-large (código abierto, 1024 dimensiones). El caso de uso más transformador: RAG (Retrieval-Augmented Generation). El flujo es: (1) convierte todos tus documentos en embeddings y almacénalos en una base de datos vectorial como Pinecone, Weaviate o pgvector. (2) Cuando llega una pregunta del usuario, convierte la pregunta en embedding. (3) Busca los documentos cuyos embeddings son más similares (similitud coseno). (4) Envía esos documentos al LLM como contexto. (5) El LLM responde basándose en tus documentos reales, no en su memoria paramétrica. Este patrón elimina el 80% de las alucinaciones y permite que el modelo tenga acceso a información actualizada o privada. Las bases de datos vectoriales más usadas: Pinecone (administrada, cara), Qdrant (open source, excelente), ChromaDB (para prototipado, Python nativo), pgvector (extensión de PostgreSQL, ideal para empresas que ya usan Postgres). Para una empresa en LATAM con documentación interna, facturas, contratos o manuales, RAG + embeddings es probablemente la implementación de IA de mayor ROI posible: permite que el equipo haga preguntas en lenguaje natural y obtenga respuestas precisas de la documentación interna en segundos.",
        "analogia": "Los embeddings son como asignar coordenadas GPS a cada concepto en un mapa del significado. 'Perro' y 'cachorro' están a 100m de distancia. 'Perro' y 'automóvil' están a 50km. Puedes hacer operaciones: vector('rey') - vector('hombre') + vector('mujer') ≈ vector('reina').",
        "ejemplo_malo": "Hacer búsqueda de documentos con CTRL+F o palabras clave exactas — pierde el 70% de los documentos relevantes que usan sinónimos o expresan la idea de forma diferente.",
        "ejemplo_bueno": "Implementar búsqueda semántica con embeddings: la pregunta '¿cuál es la política de cancelación?' encuentra documentos que dicen 'procedimiento de rescisión' o 'cómo dar de baja el servicio' aunque no tengan las palabras exactas.",
        "por_que_importa": "Los embeddings son la base técnica de los sistemas RAG, que son la implementación de IA empresarial de mayor ROI en 2026 — sin necesidad de entrenar modelos costosos.",
        "tip_profesional": "Para proyectos en LATAM con documentos en español: usa multilingual-e5-large (open source, gratuito) para prototipar. Para producción con alta escala, text-embedding-3-large de OpenAI supera a casi todos en benchmark de español."
      },
      "verificacion": [
        {
          "pregunta": "¿Por qué los embeddings permiten búsqueda semántica mientras las búsquedas de palabras clave no?",
          "opciones": [
            "Porque los embeddings son más rápidos computacionalmente",
            "Porque los embeddings representan significado como geometría: conceptos similares quedan cerca en el espacio vectorial, independientemente de las palabras usadas",
            "Porque los embeddings comprimen el texto para que ocupe menos espacio",
            "Porque los embeddings solo funcionan en inglés"
          ],
          "correcta": 1,
          "explicacion_profunda": "Las búsquedas por palabras clave requieren coincidencia léxica exacta o sinónimos predefinidos. Los embeddings codifican el significado semántico: dos frases con el mismo significado pero palabras diferentes tendrán vectores próximos en el espacio de alta dimensión. Esto permite recuperar documentos relevantes aunque no contengan las palabras exactas de la consulta — fundamental para sistemas de FAQ, búsqueda de contratos, o recuperación de conocimiento corporativo.",
          "concepto_reforzado": "Embeddings como representación semántica vs léxica"
        },
        {
          "pregunta": "¿Cuál es el patrón RAG y por qué reduce las alucinaciones?",
          "opciones": [
            "RAG entrena el modelo con más datos para que sepa más",
            "RAG provee al LLM documentos reales recuperados como contexto, anclando sus respuestas en información verificada en lugar de su memoria paramétrica",
            "RAG es una técnica para acelerar el modelo",
            "RAG elimina la necesidad de prompts"
          ],
          "correcta": 1,
          "explicacion_profunda": "RAG (Retrieval-Augmented Generation) tiene dos fases: recuperación (buscar documentos relevantes usando similitud de embeddings) y generación (usar esos documentos como contexto del LLM). Al darle al modelo los hechos reales en el contexto, el modelo no necesita 'inventar' respuestas desde su memoria. Si la información no está en los documentos recuperados, el modelo puede decir 'no encontré información sobre esto' en lugar de alucinar. El 80% de las alucinaciones en sistemas empresariales se eliminan con RAG bien implementado.",
          "concepto_reforzado": "RAG como solución a alucinaciones en contextos empresariales"
        },
        {
          "pregunta": "¿Para qué sirve ChromaDB vs Pinecone como base de datos vectorial?",
          "opciones": [
            "Son equivalentes y se pueden intercambiar libremente",
            "ChromaDB es ideal para prototipado y desarrollo local (Python nativo, gratis, fácil); Pinecone es una solución administrada para producción de alta escala (pago, managed)",
            "ChromaDB solo funciona con imágenes",
            "Pinecone es open source y ChromaDB es de pago"
          ],
          "correcta": 1,
          "explicacion_profunda": "ChromaDB es una base de datos vectorial open source que corre localmente en Python con una línea de código — perfecta para prototipos y proyectos pequeños. Pinecone es un servicio administrado en la nube optimizado para alta escala y producción (millones de vectores, latencia baja garantizada), pero tiene costo. Para LATAM: prototipa con ChromaDB, evalúa si Qdrant (open source, deployable) cubre tus necesidades antes de pagar Pinecone. pgvector es excelente si ya usas PostgreSQL.",
          "concepto_reforzado": "Trade-offs en elección de base de datos vectorial"
        },
        {
          "pregunta": "Una empresa tiene 10,000 documentos de soporte técnico. ¿Cuál es el primer paso para implementar RAG?",
          "opciones": [
            "Entrenar un modelo desde cero con los documentos",
            "Convertir todos los documentos en embeddings y almacenarlos en una base de datos vectorial",
            "Subir los documentos a ChatGPT directamente",
            "Crear un fine-tuning con los documentos"
          ],
          "correcta": 1,
          "explicacion_profunda": "El pipeline RAG comienza con la indexación: (1) chunking — dividir documentos en fragmentos de 200-500 palabras con overlap, (2) embedding — convertir cada chunk en vector usando un modelo de embeddings, (3) almacenamiento — guardar vectores + metadata en base de datos vectorial. Solo después de esta fase puedes hacer búsqueda semántica en tiempo real cuando lleguen preguntas. Este proceso de indexación se hace una vez (y se actualiza cuando hay documentos nuevos).",
          "concepto_reforzado": "Pipeline de indexación en RAG"
        },
        {
          "pregunta": "¿Qué significa que el embedding de 'rey' - 'hombre' + 'mujer' ≈ 'reina'?",
          "opciones": [
            "Que los modelos pueden hacer aritmética con palabras",
            "Que los embeddings codifican relaciones semánticas como estructuras geométricas: el concepto de 'realeza femenina' está codificado como dirección en el espacio vectorial",
            "Que los embeddings mezclan palabras aleatoriamente",
            "Que los LLMs conocen todos los idiomas"
          ],
          "correcta": 1,
          "explicacion_profunda": "Esta famosa operación de Word2Vec demuestra que los embeddings capturan relaciones semánticas como geometría vectorial. La dirección 'rey → hombre' representa el concepto de 'masculinidad en contexto real'. Aplicar la dirección opuesta y añadir 'mujer' lleva al concepto de 'realeza femenina'. Estas propiedades emergen del entrenamiento en billones de textos — no fueron programadas explícitamente. Las implicaciones prácticas incluyen corrección automática de sesgos, traducción conceptual, y clustering semántico de documentos.",
          "concepto_reforzado": "Aritmética vectorial como manipulación semántica"
        }
      ],
      "practica": {
        "tipo": "caso_real",
        "contexto": "Una empresa de seguros tiene 50,000 pólizas en PDF, cada una de 10-30 páginas. Los agentes de servicio al cliente tardan 20 minutos en promedio buscando cláusulas específicas cuando un cliente llama. Quieren reducir eso a menos de 2 minutos usando IA.",
        "instruccion": "Diseña la arquitectura de un sistema RAG para este caso. Incluye: cómo dividirías los documentos (chunking strategy), qué modelo de embeddings usarías, qué base de datos vectorial elegirías para una empresa de tamaño mediano, y cómo sería el flujo de una consulta.",
        "pista": "Las pólizas de seguro tienen secciones bien definidas (cobertura, exclusiones, beneficiarios). Esto informa tu estrategia de chunking.",
        "solucion": "Arquitectura: CHUNKING: Dividir cada póliza por secciones semánticas (cobertura, exclusiones, condiciones, beneficiarios) + chunks de 400 palabras con overlap de 50 palabras. Agregar metadata a cada chunk: número de póliza, cliente, tipo de seguro, sección. EMBEDDINGS: multilingual-e5-large (open source, gratis, excelente en español). Para producción: text-embedding-3-large de OpenAI. VECTOR DB: pgvector si ya tienen PostgreSQL (opción más económica y familiar para el equipo IT). Si no: Qdrant en servidor propio. FLUJO DE CONSULTA: Agente escribe pregunta → embedding de la pregunta → búsqueda top-5 chunks similares filtrando por número de póliza del cliente → LLM recibe los 5 chunks + número de póliza + pregunta → responde con cita exacta de la cláusula. RESULTADO ESPERADO: de 20 min a <1 min por consulta, con fuentes citadas.",
        "criterios_de_exito": [
          "Define una estrategia de chunking coherente con el tipo de documento",
          "Justifica la elección de base de datos vectorial con criterios de costos y contexto empresarial",
          "Describe el flujo completo de consulta, no solo el índice"
        ]
      },
      "conexion": {
        "siguiente": "Similitud coseno y búsqueda semántica — la matemática detrás de cómo RAG encuentra los documentos correctos.",
        "modulo_relacionado": "M8 — RAG y Bases de Datos Vectoriales: aquí implementarás sistemas RAG completos"
      }
    }
  },
  "m1-b2-l7": {
    "titulo": "Similitud coseno y búsqueda semántica",
    "bloque": 2,
    "tipo": "leccion",
    "duracion_min": 20,
    "xp": 50,
    "contenido": {
      "teoria": {
        "explicacion": "La similitud coseno es la métrica que hace posible la búsqueda semántica en sistemas RAG. Es el corazón matemático de cómo una base de datos vectorial encuentra los documentos más relevantes para una consulta. El concepto es elegante: en lugar de medir la distancia euclidiana entre dos vectores (que depende de su magnitud/longitud), medimos el ángulo entre ellos. El coseno del ángulo entre dos vectores es 1 si apuntan en la misma dirección (máxima similitud), 0 si son perpendiculares (sin relación), y -1 si apuntan en direcciones opuestas (antónimos semánticos). La fórmula es: cos(θ) = (A · B) / (||A|| × ||B||) — el producto punto dividido por el producto de las magnitudes. Por qué preferimos coseno sobre distancia euclidiana: dos documentos, uno de 1 página y otro de 10 páginas, sobre el mismo tema tendrán vectores de magnitudes muy diferentes pero ángulos similares. La distancia euclidiana los trataría como muy diferentes; la similitud coseno los trataría (correctamente) como similares. Las bases de datos vectoriales modernas optimizan la búsqueda de similitud coseno con estructuras de índice especializadas. HNSW (Hierarchical Navigable Small World) es el algoritmo más común: permite búsqueda aproximada de los K vecinos más cercanos en tiempo logarítmico incluso con millones de vectores. Sin HNSW, comparar una consulta con 1 millón de documentos requeriría 1 millón de cálculos de similitud. Con HNSW, el sistema explora solo ~100-1000 candidatos para encontrar los mejores 10. En la práctica profesional, cuando configuras una base de datos vectorial como Qdrant o Pinecone, eliges el número de vecinos a retornar (top-K), el umbral de similitud mínima (filtrar resultados poco relevantes), y si aplicas filtros adicionales por metadata (por ejemplo, solo buscar en documentos de un cliente específico). Un parámetro crítico: threshold de similitud. Si retornas todos los resultados sin filtrar por similitud mínima, el sistema puede recuperar documentos irrelevantes cuando no hay nada relevante en la base de datos. Un threshold de 0.7-0.8 (escala 0-1) es un punto de partida razonable para español.",
        "analogia": "La similitud coseno es como comparar la dirección en que apuntan dos brújulas, no la distancia entre ellas. Dos brújulas que apuntan al norte son 'similares' aunque una esté en Bogotá y otra en Buenos Aires.",
        "ejemplo_malo": "Retornar siempre los top-5 resultados sin umbral de similitud — si el usuario pregunta algo que no está en los documentos, el sistema devolverá los 5 'menos malos' aunque sean irrelevantes.",
        "ejemplo_bueno": "Umbral de similitud 0.75: si ningún documento supera ese threshold, responder 'No encontré información específica sobre esto en los documentos disponibles' en lugar de alucinar.",
        "por_que_importa": "Entender similitud coseno te permite configurar inteligentemente tus sistemas RAG y diagnosticar cuando la búsqueda semántica falla o retorna resultados irrelevantes.",
        "tip_profesional": "Para sistemas en producción: implementa siempre un umbral de confianza. Si el mejor resultado tiene similitud < 0.65, el LLM debe responder que no tiene información suficiente en lugar de intentar generar una respuesta con contexto irrelevante."
      },
      "verificacion": [
        {
          "pregunta": "¿Por qué la similitud coseno es preferida sobre la distancia euclidiana para comparar embeddings de texto?",
          "opciones": [
            "Porque es más rápida de calcular",
            "Porque mide el ángulo entre vectores (orientación semántica) sin importar la magnitud, permitiendo comparar documentos de diferente longitud correctamente",
            "Porque solo funciona con texto en inglés",
            "Porque la distancia euclidiana no funciona con vectores de alta dimensión"
          ],
          "correcta": 1,
          "explicacion_profunda": "La distancia euclidiana es sensible a la magnitud del vector. Un documento de 10 páginas sobre 'contratos de seguro' tendrá un vector de mayor magnitud que uno de 1 página sobre el mismo tema, resultando en distancias grandes aunque el contenido semántico sea similar. La similitud coseno normaliza por magnitud, midiendo solo el ángulo: si dos vectores apuntan en la misma dirección semántica, su similitud coseno será alta independientemente de la longitud del documento.",
          "concepto_reforzado": "Ventajas de similitud coseno sobre distancia euclidiana"
        },
        {
          "pregunta": "¿Qué valor de similitud coseno indica que dos vectores son completamente similares (máxima relevancia)?",
          "opciones": ["0", "0.5", "1", "-1"],
          "correcta": 2,
          "explicacion_profunda": "La similitud coseno va de -1 a 1: 1 indica vectores idénticos en dirección (máxima similitud semántica), 0 indica vectores ortogonales (sin relación semántica), y -1 indica vectores opuestos (máxima disimilitud). En embeddings de texto, valores por encima de 0.85 suelen indicar documentos muy similares, 0.7-0.85 indica relación temática, por debajo de 0.5 suele ser irrelevante. Los valores negativos son raros en embeddings modernos que usan funciones de activación que producen valores positivos.",
          "concepto_reforzado": "Interpretación de valores de similitud coseno"
        },
        {
          "pregunta": "¿Qué es HNSW y por qué es importante en bases de datos vectoriales de producción?",
          "opciones": [
            "Un modelo de embeddings alternativo",
            "Un algoritmo de índice que permite búsqueda aproximada de vecinos más cercanos en tiempo logarítmico, escalando a millones de vectores",
            "Una métrica de evaluación de RAG",
            "Un tipo de base de datos relacional"
          ],
          "correcta": 1,
          "explicacion_profunda": "Sin índices como HNSW, una búsqueda en 1 millón de vectores requeriría calcular 1 millón de similitudes coseno (fuerza bruta). HNSW construye un grafo jerárquico navegable que permite encontrar los K vecinos más cercanos examinando solo ~500-2000 candidatos, logrando latencias de <10ms incluso con millones de documentos. Pinecone, Qdrant, y Weaviate usan HNSW internamente. Es la razón por la que RAG puede responder en tiempo real.",
          "concepto_reforzado": "HNSW como base de la escalabilidad en búsqueda vectorial"
        },
        {
          "pregunta": "Tu sistema RAG retorna documentos irrelevantes cuando el usuario hace preguntas sobre temas no cubiertos en la base de conocimiento. ¿Cuál es la solución correcta?",
          "opciones": [
            "Agregar más documentos a la base vectorial",
            "Cambiar el modelo de embeddings",
            "Implementar un umbral de similitud mínima: si el mejor resultado tiene similitud <0.7, responder que no hay información disponible",
            "Aumentar el top-K de resultados retornados"
          ],
          "correcta": 2,
          "explicacion_profunda": "Cuando un usuario pregunta algo que no está en la base de conocimiento, el sistema siempre retornará algún resultado (el 'menos malo'), aunque sea irrelevante. Sin umbral de similitud, el LLM puede alucinar a partir de contexto irrelevante. La solución es implementar un threshold: si la similitud del mejor resultado es menor que un valor mínimo (0.65-0.75 según el dominio), el sistema responde explícitamente que no tiene información. Esto convierte una alucinación potencial en una respuesta honesta.",
          "concepto_reforzado": "Threshold de similitud como guardia contra alucinaciones"
        },
        {
          "pregunta": "En un sistema RAG para documentos legales en español, ¿qué configuración de similitud coseno es más prudente para retornar resultados?",
          "opciones": [
            "Threshold 0.3 — retornar cualquier resultado para no dejar preguntas sin respuesta",
            "Threshold 0.95 — solo retornar si hay coincidencia casi exacta",
            "Threshold 0.70-0.80 — balance entre relevancia y cobertura, con instrucción al LLM de citar fuentes",
            "Sin threshold — siempre retornar top-3 sin importar similitud"
          ],
          "correcta": 2,
          "explicacion_profunda": "Para documentos legales, la precisión es crítica: mejor decir 'no encontré información' que citar una cláusula equivocada. Un threshold 0.70-0.80 es apropiado para español en dominio legal: elimina la mayoría de los falsos positivos mientras cubre el vocabulario técnico legal con sus variaciones. Además, en documentos legales siempre debes instruir al LLM a citar el número de artículo/cláusula específica, permitiendo al usuario verificar la fuente.",
          "concepto_reforzado": "Configuración de RAG según criticidad del dominio"
        }
      ],
      "practica": {
        "tipo": "caso_real",
        "contexto": "Estás auditando un sistema RAG de una empresa de consultoría que quiere responder preguntas de sus empleados sobre políticas internas. El sistema devuelve respuestas con frecuencia aunque las políticas no cubran el tema. Los empleados se quejan de recibir respuestas inventadas sobre temas de vacaciones y beneficios.",
        "instruccion": "Diagnostica el problema técnico y propón 3 cambios específicos en la configuración del sistema RAG para eliminar las alucinaciones, sin reemplazar el sistema completo.",
        "pista": "El problema no es el LLM — es cómo se configuró el pipeline de recuperación y cómo se le da contexto al modelo.",
        "solucion": "DIAGNÓSTICO: El sistema tiene umbral de similitud 0 o muy bajo, retornando documentos irrelevantes como contexto, que el LLM usa para 'inventar' respuestas. CAMBIO 1: Implementar threshold de similitud mínima 0.72. Si ningún chunk supera ese valor, el sistema responde: 'No encontré esta política en los documentos disponibles. Por favor contacta a RRHH directamente.' CAMBIO 2: Agregar instrucción explícita al prompt del LLM: 'Solo responde con información que encuentres textualmente en los documentos proporcionados. Si no encuentras la respuesta, di exactamente: No tengo información sobre esto en los documentos actuales.' CAMBIO 3: Implementar logging de las preguntas sin respuesta para identificar gaps en la base de conocimiento y agregar esas políticas faltantes. El resultado: el sistema deja de alucinar y los gaps de conocimiento se vuelven visibles y solucionables.",
        "criterios_de_exito": [
          "Identifica el umbral de similitud como causa raíz del problema",
          "Propone cambio en el prompt del LLM para reforzar honestidad",
          "Incluye una medida de feedback loop para mejorar el sistema con el tiempo"
        ]
      },
      "conexion": {
        "siguiente": "Softmax, sigmoid y funciones de activación — cómo las redes neuronales convierten números en probabilidades.",
        "modulo_relacionado": "M8 — RAG Avanzado: configuración, evaluación y optimización de sistemas RAG en producción"
      }
    }
  },
  "m1-b2-l8": {
    "titulo": "Softmax, sigmoid y funciones de activación",
    "bloque": 2,
    "tipo": "leccion",
    "duracion_min": 20,
    "xp": 50,
    "contenido": {
      "teoria": {
        "explicacion": "Las funciones de activación son las que dan a las redes neuronales su capacidad de aprender patrones no lineales. Sin ellas, una red neuronal de 100 capas sería equivalente matemáticamente a una red de 1 capa: solo haría transformaciones lineales. Las funciones de activación introducen no-linealidad, permitiendo que la red modele relaciones complejas en los datos. ReLU (Rectified Linear Unit) es la función de activación más usada en capas ocultas de redes profundas: f(x) = max(0, x). Si la entrada es positiva, pasa igual; si es negativa, se vuelve 0. Simple, rápida de computar, y evita el problema del vanishing gradient que afectaba a sigmoid en redes profundas. Sus variantes: Leaky ReLU (permite gradientes pequeños para valores negativos) y GELU (usada en transformers, curva suave). Sigmoid comprime cualquier número real al rango (0,1): f(x) = 1/(1 + e^(-x)). Es perfecta para probabilidades binarias: ¿este email es spam? ¿este contrato tiene cláusula de arbitraje? Su output naturalmente interpretable como probabilidad la hace ideal para la capa final de clasificadores binarios. Softmax es la generalización de sigmoid para múltiples clases: convierte un vector de números reales en distribución de probabilidad que suma 1. Si tienes 5 categorías de soporte técnico, softmax toma los 5 scores del modelo y los convierte en probabilidades: [0.65, 0.20, 0.08, 0.05, 0.02] — la clase 1 tiene 65% de probabilidad. LLMs usan softmax en su capa final: sobre un vocabulario de 50,000+ tokens, softmax convierte todos los logits (scores) en distribución de probabilidad. El token con mayor probabilidad es la predicción más probable (greedy decoding), pero también puedes muestrear según la distribución (temperatura > 0). Tanh (tangente hiperbólica) comprime al rango (-1, 1). Se usa en LSTMs y en casos donde necesitas outputs negativos. La importancia práctica: cuando integras un modelo vía API, los logprobs (log-probabilidades) que devuelven algunos endpoints de OpenAI o Anthropic son directamente los outputs después de softmax. Puedes usar estos logprobs para medir la confianza del modelo en su respuesta: si el token 'Sí' tiene logprob de -0.01 (probabilidad ≈ 99%), el modelo está muy seguro. Si es -2.3 (probabilidad ≈ 10%), hay incertidumbre alta.",
        "analogia": "Sigmoid es como una palanca de luz con dimmer: convierte cualquier nivel de 'activación eléctrica' en un valor entre 0% y 100% de brillantez. Softmax es como un consejo de votación donde cada opción recibe votos y el total siempre suma 100%.",
        "ejemplo_malo": "Usar sigmoid en la capa final de un clasificador de 10 categorías — sigmoid da probabilidades independientes que no suman 1, generando predicciones incoherentes.",
        "ejemplo_bueno": "Usar softmax para clasificación multi-clase y sigmoid para clasificación binaria o multi-etiqueta (donde un documento puede pertenecer a múltiples categorías simultáneamente).",
        "por_que_importa": "Las funciones de activación determinan qué tipo de patrones puede aprender una red y cómo interpretar sus outputs. Softmax es literal: cuando un LLM genera texto, está aplicando softmax sobre 50K tokens en cada paso.",
        "tip_profesional": "Cuando uses los logprobs de la API de OpenAI para medir confianza: un logprob > -0.1 (probabilidad > 90%) indica alta confianza. Logprob < -1.0 (probabilidad < 37%) indica incertidumbre — considera pedir al modelo que reformule o exprese su nivel de confianza explícitamente."
      },
      "verificacion": [
        {
          "pregunta": "¿Por qué una red neuronal sin funciones de activación no puede aprender patrones complejos?",
          "opciones": [
            "Porque las redes sin activación son más lentas",
            "Porque sin funciones de activación, múltiples capas lineales son equivalentes matemáticamente a una sola capa lineal",
            "Porque las funciones de activación proveen los datos de entrenamiento",
            "Porque sin activación, la red no puede conectarse a internet"
          ],
          "correcta": 1,
          "explicacion_profunda": "La composición de transformaciones lineales es lineal: Capa2(Capa1(x)) = W2·(W1·x) = (W2·W1)·x, que es simplemente una nueva transformación lineal. No importa cuántas capas lineales apiles: el resultado es siempre equivalente a una sola capa lineal. Las funciones de activación no lineales (ReLU, sigmoid, tanh) rompen esta equivalencia, permitiendo que la red aprenda superficies de decisión arbitrariamente complejas — los patrones de lenguaje, visión, y audio que hacen útiles a los modelos modernos.",
          "concepto_reforzado": "No-linealidad como capacidad de representación"
        },
        {
          "pregunta": "¿Cuándo deberías usar sigmoid vs softmax en la capa final de un clasificador?",
          "opciones": [
            "Sigmoid para multi-clase, softmax para binaria",
            "Sigmoid para clasificación binaria o multi-etiqueta; softmax para clasificación multi-clase mutuamente excluyente",
            "Softmax siempre es mejor que sigmoid",
            "La elección no importa si el modelo es suficientemente grande"
          ],
          "correcta": 1,
          "explicacion_profunda": "Sigmoid produce probabilidades independientes para cada clase (cada una entre 0-1, no necesariamente suman 1): ideal cuando un documento puede pertenecer a múltiples categorías simultáneamente (multi-etiqueta). Softmax produce una distribución de probabilidad que suma exactamente 1: ideal cuando las clases son mutuamente excluyentes (un ticket de soporte es de 'hardware' OR 'software' OR 'red', no de múltiples simultáneamente). Usar softmax para multi-etiqueta forzaría que etiquetar fuertemente una clase reduzca artificialmente las demás.",
          "concepto_reforzado": "Sigmoid vs Softmax según tipo de tarea de clasificación"
        },
        {
          "pregunta": "En un LLM, ¿qué representa un logprob de -0.05 vs -2.3 para el siguiente token?",
          "opciones": [
            "Son equivalentes en confianza",
            "-0.05 indica alta confianza (probabilidad ≈ 95%), -2.3 indica incertidumbre alta (probabilidad ≈ 10%)",
            "-2.3 es mejor porque el modelo está siendo más preciso",
            "Los logprobs no se relacionan con confianza"
          ],
          "correcta": 1,
          "explicacion_profunda": "Logprob es el logaritmo natural de la probabilidad. Logprob -0.05 = e^(-0.05) ≈ 95% de probabilidad para ese token — el modelo está muy seguro. Logprob -2.3 = e^(-2.3) ≈ 10% — el modelo considera múltiples opciones plausibles, indicando incertidumbre. Para sistemas de producción que requieren alta confianza (extracción de datos críticos), puedes filtrar respuestas donde algún token clave tenga logprob < -1.0 y pedirle al modelo que intente de nuevo.",
          "concepto_reforzado": "Logprobs como medida de confianza en generación de tokens"
        },
        {
          "pregunta": "¿Por qué ReLU reemplazó a sigmoid y tanh como función de activación estándar en redes profundas?",
          "opciones": [
            "ReLU es más bonita matemáticamente",
            "ReLU evita el problema de vanishing gradient que hacía ineficiente el entrenamiento de redes profundas con sigmoid/tanh",
            "ReLU produce outputs más grandes",
            "ReLU solo funciona en redes de más de 10 capas"
          ],
          "correcta": 1,
          "explicacion_profunda": "Sigmoid y tanh comprimen todos los inputs a un rango pequeño (-1 a 1 o 0 a 1). Sus derivadas son casi 0 para valores grandes o pequeños — el 'vanishing gradient': al propagar gradientes hacia atrás en redes profundas, se multiplican derivadas casi-cero repetidamente, haciendo que los gradientes en las capas iniciales sean minúsculos e imposibles de actualizar. ReLU tiene derivada 1 para valores positivos, manteniendo gradientes saludables incluso en redes de 100+ capas. Esto fue fundamental para el éxito de las redes residuales (ResNet) y los transformers.",
          "concepto_reforzado": "Vanishing gradient y por qué ReLU lo resuelve"
        },
        {
          "pregunta": "Un LLM genera 'El capital de Francia es Berlín' con alta confianza (logprob -0.02). ¿Qué indica esto sobre las alucinaciones?",
          "opciones": [
            "Alta confianza implica que la respuesta es correcta",
            "Las alucinaciones pueden ocurrir con alta confianza: el modelo asigna alta probabilidad a respuestas que son plausibles según su entrenamiento aunque sean incorrectas",
            "El modelo tiene un bug en su función de activación",
            "El logprob bajo indica que el modelo sabe que se equivoca"
          ],
          "correcta": 1,
          "explicacion_profunda": "Este es uno de los aspectos más problemáticos de los LLMs: pueden alucinar con alta confianza. La probabilidad softmax refleja qué tan 'típica' es la secuencia según el entrenamiento, no su veracidad factual. Si el modelo vio muchas veces 'capital de [país europeo] es [ciudad europea]', puede generar con alta probabilidad una capital incorrecta que suena plausible. La solución no es confiar en logprobs para verificar hechos, sino usar RAG con documentos verificados.",
          "concepto_reforzado": "Límites de los logprobs como indicador de veracidad factual"
        }
      ],
      "practica": {
        "tipo": "caso_real",
        "contexto": "Estás configurando un sistema de clasificación automática de emails de soporte técnico en 6 categorías: Hardware, Software, Red, Facturación, Instalación, Otros. Un email puede pertenecer a máximas 2 categorías simultáneamente (por ejemplo: 'problema de instalación de software' → Instalación + Software).",
        "instruccion": "¿Deberías usar sigmoid o softmax en la capa final del clasificador? ¿Por qué? ¿Cómo interpretarías los outputs del modelo para asignar etiquetas?",
        "pista": "La clave está en si las categorías son mutuamente excluyentes o si un email puede tener múltiples categorías verdaderas simultáneamente.",
        "solucion": "Usar SIGMOID (no softmax). Razón: un email puede pertenecer a múltiples categorías simultáneamente. Softmax forzaría que las probabilidades sumen 1, haciendo que asignar alta probabilidad a 'Software' reduzca artificialmente la de 'Instalación', aunque ambas sean correctas. Sigmoid produce probabilidades independientes para cada clase. INTERPRETACIÓN DE OUTPUTS: el modelo produce 6 valores entre 0 y 1. Definir threshold por clase (ej: 0.5 por defecto). Cualquier clase que supere su threshold se asigna como etiqueta. Para el ejemplo: [Hardware: 0.1, Software: 0.8, Red: 0.05, Facturación: 0.02, Instalación: 0.75, Otros: 0.1] → etiquetar como Software + Instalación. Si ninguna clase supera 0.4, etiquetar como 'Otros' para revisión manual.",
        "criterios_de_exito": [
          "Identifica correctamente que se necesita sigmoid por ser clasificación multi-etiqueta",
          "Explica por qué softmax sería incorrecto en este caso",
          "Describe cómo convertir las probabilidades en etiquetas asignadas"
        ]
      },
      "conexion": {
        "siguiente": "Loss functions: cómo sabe el modelo que se equivocó — la medida que guía todo el aprendizaje.",
        "modulo_relacionado": "M6 — Deep Learning: implementarás clasificadores con estas funciones de activación"
      }
    }
  },
  "m1-b2-l9": {
    "titulo": "Loss functions: cómo sabe el modelo que se equivocó",
    "bloque": 2,
    "tipo": "leccion",
    "duracion_min": 22,
    "xp": 50,
    "contenido": {
      "teoria": {
        "explicacion": "La función de pérdida (loss function) es el 'maestro' del modelo: es la medida matemática que le dice qué tan equivocada está su predicción en comparación con la respuesta correcta. Sin una loss function bien definida, el gradiente descendente no tiene hacia dónde apuntar. La elección de la loss function correcta es tan importante como la arquitectura del modelo — una loss mal elegida puede hacer que el modelo optimice la métrica incorrecta y falle en producción. Cross-Entropy Loss (o log loss) es la función de pérdida más usada en clasificación y en LLMs. Para clasificación binaria: L = -[y·log(p) + (1-y)·log(1-p)], donde y es la etiqueta correcta (0 o 1) y p es la probabilidad predicha. Si el modelo predice 0.95 de probabilidad para la clase correcta, la pérdida es baja (-log(0.95) ≈ 0.05). Si predice 0.05 para la clase correcta, la pérdida es alta (-log(0.05) ≈ 3.0). En LLMs, la cross-entropy se calcula sobre el token correcto en el vocabulario: si el siguiente token debería ser 'cliente' y el modelo le asignó probabilidad 0.001, la pérdida es alta y los pesos se actualizan para asignarle más probabilidad en el futuro. MSE (Mean Squared Error) es la pérdida estándar para regresión: el promedio del cuadrado de las diferencias entre predicciones y valores reales. Si predices precio de 100,000 pesos cuando el real es 150,000, el error cuadrado es (50,000)^2. MSE penaliza más los errores grandes (por el cuadrado), lo que puede ser deseable (pocos errores grandes son peores que muchos errores pequeños) o problemático (sensible a outliers). Focal Loss fue diseñada para datos desbalanceados: si el 99% de los emails son 'normales' y 1% son 'fraude', un clasificador puede lograr 99% de precisión siempre diciendo 'normal'. Focal Loss da más peso a los ejemplos difíciles (los pocos casos de fraude) para que el modelo aprenda a detectarlos. Contrastive Loss y Triplet Loss se usan para embeddings: en lugar de clasificar, estas losses enseñan al modelo que ejemplos similares deben tener vectores cercanos y ejemplos disímiles deben tener vectores lejanos. Los modelos de embeddings que generan los vectores para RAG fueron entrenados con estas losses. En fine-tuning de LLMs, la cross-entropy es universal. Pero en Reinforcement Learning from Human Feedback (RLHF, cómo se alinean Claude y ChatGPT), se añade una reward function que el modelo optimiza según preferencias humanas — técnicamente es una loss de RL sobre la diferencia entre respuestas preferidas y no preferidas.",
        "analogia": "La loss function es como el sistema de calificación de un examen: no solo dice si aprobaste o no, sino exactamente cuánto te equivocaste en cada pregunta. El estudiante (modelo) usa ese feedback detallado para saber exactamente qué estudiar más.",
        "ejemplo_malo": "Usar MSE para clasificación binaria — MSE asume outputs continuos y no tiene la propiedad de penalizar fuertemente las predicciones muy incorrectas que cross-entropy sí tiene.",
        "ejemplo_bueno": "Usar Focal Loss cuando tus datos de entrenamiento tienen desbalance severo de clases (ej: 0.1% fraude vs 99.9% normal) — evita que el modelo aprenda a ignorar siempre la clase minoritaria.",
        "por_que_importa": "La loss function define qué significa 'equivocarse' para tu modelo. Si eliges la loss incorrecta, puedes construir un modelo con 99% de precisión que falla completamente en el objetivo real del negocio.",
        "tip_profesional": "Para sistemas de detección de anomalías con clases desbalanceadas: siempre evalúa si Focal Loss o class weights mejoran el recall de la clase minoritaria. Un modelo con 99% de accuracy puede tener 0% de recall en fraude — completamente inútil para el negocio."
      },
      "verificacion": [
        {
          "pregunta": "Un modelo de clasificación de spam tiene 98% accuracy pero el equipo descubrió que clasifica todos los emails como 'no spam'. ¿Cuál es el problema a nivel de loss function?",
          "opciones": [
            "El modelo está bien entrenado, el 98% es excelente",
            "El modelo optimizó accuracy con cross-entropy en datos desbalanceados: como solo el 2% son spam, decir siempre 'no spam' minimiza la pérdida aunque sea inútil",
            "El learning rate fue demasiado alto",
            "Se necesita más capacidad de modelo"
          ],
          "correcta": 1,
          "explicacion_profunda": "Con solo 2% de spam, decir siempre 'no spam' logra 98% de accuracy — esto se llama accuracy paradox. Si el modelo usó cross-entropy estándar sin class weights, aprende rápidamente que la estrategia de menor pérdida es predecir siempre la clase mayoritaria. La solución: usar class_weight='balanced' en sklearn, Focal Loss, o sobremuestrear la clase minoritaria (SMOTE). Siempre evalúa modelos de clases desbalanceadas con F1-score, precisión y recall de la clase minoritaria, nunca solo accuracy.",
          "concepto_reforzado": "Accuracy paradox y pérdidas para datos desbalanceados"
        },
        {
          "pregunta": "¿Por qué cross-entropy es mejor que MSE para clasificación?",
          "opciones": [
            "Cross-entropy es más simple de calcular",
            "Cross-entropy penaliza exponencialmente las predicciones muy incorrectas (alta pérdida cuando la clase correcta tiene probabilidad baja), generando gradientes más fuertes que MSE para corregir errores grandes",
            "MSE no funciona matemáticamente para clasificación",
            "Cross-entropy produce gradientes más pequeños y estables"
          ],
          "correcta": 1,
          "explicacion_profunda": "MSE para clasificación: si la clase correcta tiene probabilidad 0.01, el error cuadrado es (1-0.01)^2 ≈ 0.98 — moderado. Con cross-entropy: -log(0.01) ≈ 4.6 — mucho mayor. Cuando el modelo está muy equivocado, cross-entropy genera gradientes fuertes que permiten corrección rápida. Además, cross-entropy es la medida de información teórica correcta para comparar distribuciones de probabilidad, que es exactamente lo que hace un clasificador.",
          "concepto_reforzado": "Cross-entropy como loss natural para clasificación probabilística"
        },
        {
          "pregunta": "¿Cómo se relaciona RLHF con las loss functions en el entrenamiento de LLMs como Claude?",
          "opciones": [
            "RLHF reemplaza completamente el preentrenamiento con cross-entropy",
            "RLHF añade una fase donde el modelo optimiza una reward function basada en preferencias humanas, en lugar de solo cross-entropy sobre texto — esto alinea el modelo con valores y utilidad humana",
            "RLHF es solo para modelos de imágenes",
            "RLHF es otro nombre para el fine-tuning estándar"
          ],
          "correcta": 1,
          "explicacion_profunda": "RLHF (Reinforcement Learning from Human Feedback) tiene tres fases: (1) preentrenamiento con cross-entropy sobre billones de tokens, (2) supervised fine-tuning con ejemplos de respuestas de calidad, (3) RLHF: humanos comparan pares de respuestas, se entrena un reward model para predecir preferencias humanas, y finalmente el LLM es optimizado con PPO (algoritmo de RL) para maximizar el reward. Esta es la técnica que hace que Claude, ChatGPT y Gemini sean útiles, honestos y seguros en lugar de solo coherentes textualmente.",
          "concepto_reforzado": "RLHF como loss de alineación con preferencias humanas"
        },
        {
          "pregunta": "¿Cuándo usarías Contrastive Loss en lugar de Cross-Entropy?",
          "opciones": [
            "Cuando tienes más de 100 clases de clasificación",
            "Cuando entrenas un modelo de embeddings que debe aprender que ejemplos similares tengan vectores cercanos y disímiles tengan vectores lejanos",
            "Cuando el dataset es muy pequeño",
            "Cuando los datos están desbalanceados"
          ],
          "correcta": 1,
          "explicacion_profunda": "Contrastive Loss y Triplet Loss son fundamentales para entrenar modelos de embeddings como los que usas en RAG. En lugar de clasificar en categorías, estas losses enseñan relaciones de similitud: 'este par de preguntas similares debe tener embeddings cercanos; esta pregunta y esta respuesta irrelevante deben tener embeddings lejanos'. Los modelos como text-embedding-3-large de OpenAI fueron entrenados con variantes de contrastive learning sobre billones de pares de texto.",
          "concepto_reforzado": "Contrastive learning para embeddings"
        },
        {
          "pregunta": "Al hacer fine-tuning de un LLM en documentos de tu empresa, ¿qué loss function calcula el framework automáticamente en cada paso?",
          "opciones": [
            "MSE entre los embeddings del modelo base y el fine-tuneado",
            "Cross-entropy entre la distribución de probabilidad predicha por el modelo y el token correcto en cada posición del texto",
            "Contrastive loss entre documentos similares y disímiles",
            "Binary cross-entropy para decidir si el token es relevante"
          ],
          "correcta": 1,
          "explicacion_profunda": "Durante el fine-tuning de LLMs, el objetivo de entrenamiento es el mismo que el preentrenamiento: predecir el siguiente token. Para cada posición en el texto de entrenamiento, el modelo genera una distribución softmax sobre el vocabulario, y la cross-entropy se calcula contra el token real. Si el texto de training es 'El cliente tiene un problema de facturación', en cada posición el modelo debe predecir el siguiente token con alta probabilidad. Los frameworks (transformers de HuggingFace, Axolotl, LLaMA-Factory) calculan y propagan esta loss automáticamente.",
          "concepto_reforzado": "Cross-entropy como objective universal en preentrenamiento y fine-tuning de LLMs"
        }
      ],
      "practica": {
        "tipo": "caso_real",
        "contexto": "Estás construyendo un sistema para detectar contratos con cláusulas de riesgo alto en una empresa de consultoría. El dataset tiene 5,000 contratos: 4,850 sin riesgo (97%) y 150 con riesgo (3%). Tu modelo actual tiene 97.2% de accuracy pero el equipo legal dice que 'no detecta nada útil'.",
        "instruccion": "Explica por qué el modelo falla a pesar del 97.2% de accuracy y diseña una estrategia de entrenamiento con la loss function correcta para que el modelo realmente detecte contratos de riesgo.",
        "pista": "¿Qué pasa con el recall de la clase minoritaria (contratos de riesgo)? ¿Por qué el 97.2% es una métrica engañosa aquí?",
        "solucion": "El modelo probablemente clasifica todo como 'sin riesgo' (accuracy paradox): con 97% de la clase mayoritaria, esta estrategia trivial logra 97% de accuracy pero 0% de recall en contratos de riesgo — completamente inútil para el negocio. ESTRATEGIA CORRECTA: (1) Cambiar la loss a cross-entropy con class_weight: {sin_riesgo: 1, con_riesgo: 32} (ratio inverso de frecuencias: 4850/150 ≈ 32). Esto hace que cada contrato de riesgo 'cuente 32 veces más' en la loss, forzando al modelo a aprenderlos. (2) Alternativamente, usar Focal Loss con gamma=2 que automáticamente da más peso a ejemplos difíciles. (3) Evaluar con F1-score de la clase minoritaria y recall de contratos de riesgo, no accuracy. META: recall > 85% en contratos de riesgo aunque aumente los falsos positivos — el costo de perder un contrato riesgoso supera el costo de revisar uno que resultó OK.",
        "criterios_de_exito": [
          "Identifica el accuracy paradox como causa del problema",
          "Propone class weights o Focal Loss como solución concreta",
          "Cambia la métrica de evaluación de accuracy a recall/F1 de la clase minoritaria"
        ]
      },
      "conexion": {
        "siguiente": "Backpropagation: cómo aprende una red neuronal — el algoritmo que conecta las loss functions con la actualización de pesos.",
        "modulo_relacionado": "M6 — Deep Learning: implementarás loss functions personalizadas en PyTorch"
      }
    }
  },
  "m1-b2-l10": {
    "titulo": "Backpropagation: cómo aprende una red neuronal",
    "bloque": 2,
    "tipo": "leccion",
    "duracion_min": 25,
    "xp": 50,
    "contenido": {
      "teoria": {
        "explicacion": "Backpropagation es el algoritmo que hace posible que las redes neuronales aprendan de sus errores. Es la implementación matemática de una idea intuitiva: si el modelo se equivocó, ¿qué pesos fueron 'responsables' del error y en qué dirección deben cambiar? Backpropagation responde eso calculando el gradiente de la función de pérdida respecto a cada parámetro del modelo usando la regla de la cadena del cálculo diferencial. El proceso tiene dos fases: Forward pass (propagación hacia adelante): los datos de entrada fluyen a través de todas las capas de la red, aplicando pesos y funciones de activación en cada capa, hasta generar una predicción. Se calcula la pérdida comparando la predicción con el target correcto. Backward pass (propagación hacia atrás, backpropagation): comenzando desde la capa final, se calcula el gradiente de la pérdida respecto a los pesos de esa capa. Luego, usando la regla de la cadena, se propagan esos gradientes hacia atrás capa por capa hasta llegar a la primera capa. Cada peso recibe un gradiente que indica cuánto y en qué dirección debe cambiar para reducir la pérdida. Finalmente, el optimizador (Adam, SGD) aplica esos gradientes para actualizar los pesos. La regla de la cadena es el núcleo matemático: dL/dW1 = (dL/dA3) × (dA3/dA2) × (dA2/dA1) × (dA1/dW1), donde cada término es el gradiente de una capa. Se multiplican en cadena desde la salida hasta la entrada. La autodiferenciación (autograd) es lo que hace posible backpropagation a escala: PyTorch y JAX construyen automáticamente el grafo computacional durante el forward pass y calculan todos los gradientes en el backward pass. En GPT-4, con 1.8 billones de parámetros, calcular todos los gradientes manualmente sería imposible — autograd lo hace en microsegundos. Para profesionales en roles de MLOps o Fine-tuning: backpropagation es la razón por la que necesitas tanto más VRAM para entrenamiento que para inferencia. Durante la inferencia, solo ejecutas el forward pass. Durante el entrenamiento, debes almacenar todas las activaciones intermedias del forward pass para usarlas en el backward pass — típicamente 3-4x más memoria. LoRA reduce esto almacenando gradientes solo para las matrices de bajo rango que entrena. Gradient checkpointing es otra técnica: recalcula activaciones en el backward pass en lugar de almacenarlas todas, reduciendo memoria al costo de más cómputo.",
        "analogia": "Backpropagation es como un sistema de retroalimentación en una empresa: el resultado final (pérdida) se analiza, y la 'culpa' se distribuye hacia atrás a través de todos los departamentos (capas) según su contribución al error. Cada departamento recibe feedback exacto sobre cómo ajustar su comportamiento.",
        "ejemplo_malo": "Intentar debuggear un modelo fallido solo mirando el output final — backpropagation nos dice qué capas/pesos específicos están causando el error.",
        "ejemplo_bueno": "Usar gradient checkpointing para entrenar modelos grandes en GPU con VRAM limitada (24GB): reduce el uso de memoria 4x al costo de ~30% más tiempo de entrenamiento.",
        "por_que_importa": "Backpropagation es el algoritmo que hizo posible el deep learning moderno. Entenderlo te permite diagnosticar problemas de entrenamiento, optimizar el uso de memoria, y decidir qué técnicas de fine-tuning son factibles con tu hardware.",
        "tip_profesional": "Para fine-tuning de LLMs en GPU con VRAM limitada (<40GB): usa siempre gradient checkpointing + LoRA + mixed precision (bf16). Esta combinación reduce la memoria de entrenamiento de 160GB (full fine-tuning de 70B) a <20GB."
      },
      "verificacion": [
        {
          "pregunta": "¿Por qué el entrenamiento de un modelo requiere 3-4x más VRAM que la inferencia?",
          "opciones": [
            "Porque el entrenamiento usa modelos más grandes",
            "Porque durante el backward pass se deben almacenar todas las activaciones intermedias del forward pass para calcular los gradientes",
            "Porque la API de entrenamiento es menos eficiente",
            "Porque se necesitan múltiples copias del modelo"
          ],
          "correcta": 1,
          "explicacion_profunda": "Durante inferencia, solo se ejecuta el forward pass: los datos fluyen hacia adelante y se libera la memoria de cada capa antes de pasar a la siguiente. Durante entrenamiento, todas las activaciones de cada capa del forward pass deben mantenerse en memoria hasta que el backward pass las use para calcular gradientes. Para GPT-3 con 175B parámetros: inferencia requiere ~350GB VRAM (2 bytes por parámetro en FP16), entrenamiento requiere ~1.2TB (parámetros + activaciones + gradientes + estados del optimizador).",
          "concepto_reforzado": "Overhead de memoria en entrenamiento vs inferencia"
        },
        {
          "pregunta": "¿Qué hace gradient checkpointing para reducir el uso de VRAM durante el entrenamiento?",
          "opciones": [
            "Reduce el tamaño del modelo",
            "Usa un optimizador más eficiente",
            "En lugar de almacenar todas las activaciones del forward pass, recalcula las activaciones necesarias durante el backward pass, intercambiando memoria por cómputo",
            "Congela algunas capas del modelo para no calcular sus gradientes"
          ],
          "correcta": 2,
          "explicacion_profunda": "Gradient checkpointing (también llamado activation checkpointing) solo almacena activaciones en ciertos 'checkpoints' del forward pass en lugar de todas. Durante el backward pass, cuando necesita activaciones que no guardó, las recalcula ejecutando de nuevo la parte del forward pass desde el checkpoint anterior. Esto reduce el uso de memoria ~4x al costo de ~30% más tiempo de cómputo — un trade-off muy favorable cuando la VRAM es el cuello de botella.",
          "concepto_reforzado": "Gradient checkpointing como trade-off memoria/cómputo"
        },
        {
          "pregunta": "¿Qué es la regla de la cadena y por qué es el núcleo de backpropagation?",
          "opciones": [
            "Una regla de negocio para entrenar modelos",
            "El teorema de cálculo que permite calcular el gradiente de una función compuesta: dL/dW = (dL/dSalida) × (dSalida/dEntrada) × ... — la derivada fluye hacia atrás por todas las capas",
            "Un algoritmo de optimización alternativo al gradiente descendente",
            "La regla que determina qué capas se congelan durante fine-tuning"
          ],
          "correcta": 1,
          "explicacion_profunda": "La regla de la cadena del cálculo dice: si f(g(x)), entonces df/dx = (df/dg) × (dg/dx). En una red neuronal con 100 capas, el gradiente de la pérdida respecto al peso de la primera capa se calcula multiplicando 100 derivadas de capas sucesivas. Esto es lo que PyTorch's autograd implementa eficientemente construyendo un grafo computacional y aplicando la regla de la cadena hacia atrás. Sin esta regla, no existiría el deep learning.",
          "concepto_reforzado": "Regla de la cadena como base matemática de backpropagation"
        },
        {
          "pregunta": "¿Cómo reduce LoRA el costo de memoria de backpropagation comparado con full fine-tuning?",
          "opciones": [
            "LoRA usa un batch size más pequeño",
            "LoRA solo calcula gradientes para sus matrices de bajo rango (0.1-1% de parámetros), congelando los pesos originales y no necesitando almacenar sus activaciones ni gradientes",
            "LoRA usa gradient checkpointing automáticamente",
            "LoRA hace forward pass sin backward pass"
          ],
          "correcta": 1,
          "explicacion_profunda": "En full fine-tuning de un modelo de 70B parámetros, backpropagation calcula y almacena gradientes para los 70B parámetros — requiere ~560GB solo para gradientes. LoRA congela los pesos originales (no necesitan gradientes) y solo entrena matrices de adaptación de ~70M parámetros. Backpropagation solo debe calcular gradientes para esos 70M parámetros, reduciendo el overhead de memoria 1000x. Los pesos congelados no necesitan almacenar activaciones para el backward pass.",
          "concepto_reforzado": "LoRA como reducción del scope de backpropagation"
        },
        {
          "pregunta": "¿Qué es autograd (autodiferenciación) y por qué es crítico para los frameworks modernos de deep learning?",
          "opciones": [
            "Un tipo de optimizador más rápido que Adam",
            "Un sistema que construye automáticamente el grafo computacional durante el forward pass y calcula todos los gradientes durante el backward pass sin código manual",
            "Una técnica para acelerar la inferencia",
            "Un método para reducir el tamaño del modelo"
          ],
          "correcta": 1,
          "explicacion_profunda": "Antes de autograd, los investigadores calculaban derivadas manualmente para cada arquitectura — un proceso propenso a errores y que limitaba la experimentación. PyTorch's autograd construye un grafo de operaciones durante el forward pass, registrando qué operación se hizo a qué tensor. En el backward pass, recorre el grafo al revés aplicando la regla de la cadena automáticamente. Esto permite que cualquier arquitectura que se pueda expresar con operaciones diferenciales sea automáticamente entrenable — fundamental para la explosión de creatividad arquitectónica de los últimos años.",
          "concepto_reforzado": "Autograd como habilitador de la innovación en arquitecturas de deep learning"
        }
      ],
      "practica": {
        "tipo": "caso_real",
        "contexto": "Tu empresa quiere hacer fine-tuning de Llama-3-70B para responder consultas legales en español. El servidor disponible tiene una GPU A100 con 80GB VRAM. Un ingeniero estima que el fine-tuning completo (full fine-tuning) requeriría ~800GB VRAM. El presupuesto no permite rentar más GPUs.",
        "instruccion": "Diseña una estrategia de fine-tuning que haga factible el entrenamiento en 80GB VRAM. Menciona específicamente qué técnicas de optimización de memoria usarías, en qué orden de impacto, y qué trade-offs aceptas.",
        "pista": "Hay tres técnicas principales para reducir memoria de entrenamiento que has visto en esta lección y las anteriores. Combinarlas multiplicativamente puede reducir 800GB a menos de 80GB.",
        "solucion": "ESTRATEGIA (por orden de impacto en reducción de memoria): 1) LoRA (rank=16, alpha=32): congela los 70B parámetros originales, solo entrena ~100M parámetros de adaptación. Reducción: de 800GB a ~160GB (solo activaciones + pequeños gradientes LoRA + estados Adam de matrices pequeñas). 2) Gradient Checkpointing: recomputa activaciones intermedias durante backward pass. Reducción adicional ~4x: de 160GB a ~40GB. 3) Mixed Precision BF16: pesos y activaciones en 16 bits en lugar de 32 bits. Reducción ~2x: de 40GB a ~20GB. RESULTADO FINAL: ~20GB VRAM requerido — factible en A100 80GB con margen. TRADE-OFFS ACEPTADOS: LoRA puede tener performance ligeramente inferior a full fine-tuning en tareas muy específicas. Gradient checkpointing añade ~30% de tiempo de entrenamiento. BF16 puede tener precisión numérica ligeramente menor (aceptable en práctica). CONFIGURACIÓN ADICIONAL: batch size 1-4 con gradient accumulation de 16 pasos para simular batch size efectivo de 64 sin aumentar memoria.",
        "criterios_de_exito": [
          "Menciona las tres técnicas: LoRA, gradient checkpointing, y mixed precision",
          "Explica el impacto en reducción de memoria de cada técnica",
          "Identifica los trade-offs aceptados (tiempo extra, precisión ligeramente menor)"
        ]
      },
      "conexion": {
        "siguiente": "Bloque 3 — LLMs: Arquitectura y Funcionamiento. Cómo los transformers usan todo lo que aprendiste en este bloque.",
        "modulo_relacionado": "M6 — Deep Learning: implementarás backpropagation en PyTorch y entrenarás tu primera red neuronal"
      }
    }
  }
};

// Apply new lecciones to B2
nuevas["m1-b2-l3"] && Object.assign(b2.lecciones[2], nuevas["m1-b2-l3"]);
nuevas["m1-b2-l4"] && Object.assign(b2.lecciones[3], nuevas["m1-b2-l4"]);
nuevas["m1-b2-l5"] && Object.assign(b2.lecciones[4], nuevas["m1-b2-l5"]);
nuevas["m1-b2-l6"] && Object.assign(b2.lecciones[5], nuevas["m1-b2-l6"]);
nuevas["m1-b2-l7"] && Object.assign(b2.lecciones[6], nuevas["m1-b2-l7"]);
nuevas["m1-b2-l8"] && Object.assign(b2.lecciones[7], nuevas["m1-b2-l8"]);
nuevas["m1-b2-l9"] && Object.assign(b2.lecciones[8], nuevas["m1-b2-l9"]);
nuevas["m1-b2-l10"] && Object.assign(b2.lecciones[9], nuevas["m1-b2-l10"]);

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('B2 completado: 10/10 lecciones con contenido real');
