const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m4-completo.json', 'utf8'));

const b8 = {
  "id": "b8",
  "nombre": "Fronteras y Futuro",
  "descripcion": "Las capacidades más avanzadas de Claude y hacia dónde va la IA generativa: Extended Context, Computer Use, meta-prompting y tu carrera profesional.",
  "icon": "🌐",
  "lecciones": [
    {
      "id": "m4-b8-l1", "titulo": "Extended Context: trabajar con 200K tokens", "bloque": 8,
      "tipo": "leccion", "duracion_min": 22, "xp": 60,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "Claude puede procesar hasta 200,000 tokens de contexto en una sola llamada — equivalente a aproximadamente 150,000 palabras o 500 páginas de texto. Esta capacidad abre casos de uso que son imposibles con ventanas de contexto más pequeñas: análisis de contratos completos, revisión de bases de código enteras, procesamiento de informes anuales de 300 páginas, o conversaciones ultra-largas con memoria completa. Sin embargo, trabajar con contextos largos requiere técnicas específicas. El problema del 'lost in the middle': investigación de Anthropic y otros laboratorios demostró que los LLMs tienden a recordar mejor el inicio y el final de un contexto largo, y pueden 'perder' información crítica en el medio. La mitigación es estructural: coloca la información más importante al inicio del contexto (instrucciones, datos críticos) y al final (la pregunta o tarea). Para documentos largos, agrega un 'mapa' al inicio que orienta al modelo sobre dónde encontrar qué. El costo también escala: 200K tokens de input a $3/MTok = $0.60 por llamada — manejable para casos de uso de alto valor, pero no para consultas de bajo valor que se podrían responder con 2K tokens.",
          "analogia": "La ventana de contexto de 200K tokens es como darle a un analista el archivo completo en vez de solo los fragmentos que crees que son relevantes. El riesgo es que, con tanto material, puede perder de vista lo que es más importante. La solución: un índice al inicio que le dice exactamente dónde buscar cada tipo de información.",
          "ejemplo_malo": "Aquí está el contrato completo de 150 páginas [texto completo]. ¿Hay algún problema legal?",
          "ejemplo_bueno": "Eres un abogado corporativo revisando el siguiente contrato. MAPA DEL DOCUMENTO: Cláusulas de obligaciones (pgs 1-20), Penalidades y rescisión (pgs 21-35), Propiedad intelectual (pgs 36-50), Confidencialidad (pgs 51-65), Ley aplicable y jurisdicción (pgs 66-70).\n\nTAREA ESPECÍFICA: Identifica exclusivamente las cláusulas de alto riesgo en las secciones de Penalidades y Propiedad Intelectual. Para cada riesgo: cita el texto exacto, explica el riesgo, y propone una redacción alternativa más favorable.\n\n[contrato completo]",
          "tip_profesional": "Para contextos largos, usa la técnica 'instrucción sandwich': coloca las instrucciones críticas tanto al inicio del prompt (antes del documento) como al final (después del documento). El modelo las verá con alta atención en ambas posiciones, compensando el efecto 'lost in the middle'."
        },
        "verificacion": [
          {
            "pregunta": "¿Qué es el efecto 'lost in the middle' en contextos largos y cómo se mitiga?",
            "opciones": ["El modelo se pierde y no puede responder con contextos largos", "Los LLMs tienden a prestar más atención al inicio y al final del contexto, pudiendo 'perder' información crítica en el medio — se mitiga colocando la información más importante al inicio y/o al final", "Es un bug de Claude que Anthropic está corrigiendo", "Solo afecta a documentos en idiomas distintos al inglés"],
            "correcta": 1,
            "explicacion_profunda": "Investigación empírica muestra que el rendimiento de los LLMs en tareas de recuperación de información degrada cuando la información relevante está en el medio de un contexto largo. Las mitigaciones: (1) colocar instrucciones y información crítica al inicio y al final, (2) agregar un 'mapa' del documento al inicio que orienta al modelo, (3) para tareas de búsqueda, usar RAG en vez de pasar el documento completo cuando el contexto es muy largo.",
            "concepto_reforzado": "Lost in the middle y estrategias de mitigación"
          },
          {
            "pregunta": "¿Cuándo tiene sentido económico usar la ventana de 200K tokens vs. fragmentar el documento?",
            "opciones": ["Siempre — más contexto siempre produce mejores resultados", "Cuando la tarea requiere coherencia global del documento (ej: identificar contradicciones entre cláusulas de distintas secciones) o cuando fragmentar perdería el contexto necesario para responder correctamente", "Nunca — los documentos siempre deben fragmentarse para ahorrar costo", "Solo para documentos en inglés"],
            "correcta": 1,
            "explicacion_profunda": "El análisis de un contrato para encontrar contradicciones entre la cláusula 5 y la cláusula 87 requiere que el modelo tenga ambas cláusulas en contexto simultáneamente — fragmentar el documento haría imposible detectar esa contradicción. Para tareas donde la respuesta requiere síntesis o coherencia de todo el documento, el contexto largo es necesario. Para tareas donde la respuesta se puede obtener de un fragmento (ej: '¿qué dice la cláusula 15?'), fragmentar es más económico.",
            "concepto_reforzado": "Criterios para usar contexto largo vs. fragmentación"
          },
          {
            "pregunta": "¿Cuál es el costo aproximado de una llamada a Claude Sonnet 4.6 con 200K tokens de input?",
            "opciones": ["$0.006", "$0.60", "$6.00", "$60.00"],
            "correcta": 1,
            "explicacion_profunda": "Claude Sonnet 4.6 cuesta aproximadamente $3 por millón de tokens de input. 200K tokens = 0.2M tokens × $3 = $0.60 por llamada. Para casos de uso de alto valor (análisis de un contrato de $10M, revisión de código crítico de producción), $0.60 es trivial. Para consultas de bajo valor o alto volumen, es necesario evaluar si realmente se necesita el contexto completo o si una versión más económica es suficiente.",
            "concepto_reforzado": "Análisis de costo para contexto largo"
          }
        ],
        "practica": {
          "tipo": "caso_real",
          "contexto": "Eres el CTO de una firma de abogados. Tienen 500 contratos de clientes de los últimos 5 años en PDFs. Quieren usar Claude para hacer auditoría rápida de riesgos en contratos específicos cuando un cliente llama.",
          "instruccion": "Diseña el prompt para la consulta de auditoría rápida de un contrato usando la ventana de contexto largo.",
          "input_malo": "Analiza este contrato y dime si hay problemas.",
          "pista": "Incluye: mapa del documento, rol del analista, tarea específica con criterios de riesgo definidos, y formato de output estructurado para que el abogado pueda actuar rápidamente.",
          "solucion": "System: Eres un abogado corporativo senior especializado en contratos comerciales colombianos. Tu tarea es hacer una auditoría rápida de riesgo del siguiente contrato para informar al abogado de cabecera antes de una llamada con el cliente.\n\nMETA DEL ANÁLISIS: Identificar riesgos de alto impacto que requieren atención inmediata — no es un análisis exhaustivo.\n\nCRITERIOS DE RIESGO ALTO:\n- Penalidades desproporcionadas (>20% del valor del contrato)\n- Cláusulas de exclusividad sin límite temporal\n- Cesión de derechos de propiedad intelectual sin compensación\n- Jurisdicción fuera de Colombia sin justificación\n- Obligaciones unilaterales sin reciprocidad\n\nFORMATO DE OUTPUT:\n## RESUMEN EJECUTIVO (3 bullets máx)\n## RIESGOS ALTOS IDENTIFICADOS\n[Para cada uno: Cláusula #, texto exacto, riesgo específico, impacto estimado]\n## RIESGOS MEDIOS (lista breve)\n## RECOMENDACIÓN: [FIRMAR CON MODIFICACIONES / NEGOCIAR / NO FIRMAR]\n\n[contrato completo]",
          "criterios_de_exito": ["Criterios de riesgo definidos explícitamente para guiar el análisis", "Formato de output estructurado con resumen ejecutivo para uso rápido en llamada con cliente", "La instrucción de 'auditoría rápida de alto impacto' previene que el modelo genere un análisis de 50 páginas cuando se necesita información accionable en 5 minutos"]
        },
        "conexion": {
          "siguiente_concepto": "Computer Use: Claude que controla interfaces",
          "por_que_importa_despues": "Has dominado el análisis de documentos largos. El siguiente nivel de capacidad es Computer Use: Claude puede ver y controlar una computadora real, ejecutando tareas que requieren navegar interfaces, rellenar formularios y operar software."
        }
      }
    },
    {
      "id": "m4-b8-l2", "titulo": "Computer Use: Claude que controla interfaces", "bloque": 8,
      "tipo": "leccion", "duracion_min": 25, "xp": 65,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "Computer Use es una capacidad de Claude que le permite ver la pantalla de una computadora (a través de capturas de pantalla) y ejecutar acciones: mover el cursor, hacer clicks, escribir en campos de texto, y navegar por interfaces. Esto transforma a Claude de un asistente que aconseja ('aquí están los pasos para hacer X') a un agente que actúa ('voy a hacer X por ti'). Los casos de uso actuales incluyen: automatización de tareas repetitivas en software sin API (ej: copiar datos de una aplicación legacy a otra), testing automatizado de interfaces de usuario, y procesos de negocio que involucran múltiples aplicaciones. El prompt engineering para Computer Use tiene requisitos específicos: el objetivo debe estar definido con precisión (qué resultado final define 'éxito'), las condiciones de parada deben ser explícitas (cuándo debe detenerse y preguntar vs. continuar), y las acciones de alto riesgo (eliminar archivos, enviar emails, hacer pagos) deben requerir confirmación explícita. Computer Use está actualmente en fase beta y tiene limitaciones: velocidad (mucho más lenta que una API directa), confiabilidad (puede confundirse con interfaces complejas), y costo (múltiples llamadas a la API por tarea). La recomendación actual: úsala para tareas donde no hay API disponible y la automatización tiene ROI suficiente para justificar las limitaciones.",
          "analogia": "Computer Use es como contratar a alguien para que opere una computadora por ti: puede hacer lo que haría un humano, pero necesitas darle instrucciones muy claras sobre qué hacer, qué no tocar, y cuándo detenerse a preguntarte.",
          "ejemplo_malo": "Usa Computer Use para gestionar mi bandeja de entrada de emails.",
          "ejemplo_bueno": "Tarea: Exportar el reporte de ventas mensual del sistema CRM legacy (no tiene API).\nOBJETIVO: Descargar el archivo CSV del reporte de ventas de Marzo 2026 del sistema CRM.\nPASOSESPERADOS: (1) Navegar a Reports > Sales > Monthly, (2) Seleccionar Marzo 2026, (3) Hacer click en Export CSV, (4) Verificar que el archivo se descargó en la carpeta Downloads.\nCONDICIONES DE PAUSA: Detente y pregúntame si: el sistema pide autenticación adicional, el reporte no está disponible para esa fecha, o hay un error inesperado.\nACCIONES PROHIBIDAS: No modifiques ningún dato en el CRM. Solo operaciones de lectura/exportación.",
          "tip_profesional": "Para Computer Use, define siempre un 'estado de éxito' verificable: cómo sabe el agente que completó la tarea correctamente. Para la exportación de un reporte, el estado de éxito es verificable ('el archivo .csv aparece en Downloads con fecha de hoy'). Para tareas ambiguas, el agente no sabrá cuándo terminar."
        },
        "verificacion": [
          {
            "pregunta": "¿Para qué tipo de tareas es más adecuado usar Computer Use actualmente (beta)?",
            "opciones": ["Para todas las tareas de automatización — es más flexible que las APIs", "Para tareas donde no existe una API disponible y la automatización a través de la interfaz gráfica es la única opción viable, con ROI suficiente para justificar las limitaciones actuales de velocidad y costo", "Para reemplazar completamente a los RPA (Robotic Process Automation) tradicionales", "Solo para tareas de testing de software"],
            "correcta": 1,
            "explicacion_profunda": "Computer Use tiene limitaciones reales en su fase beta: es más lento que una API directa (múltiples llamadas de screenshot + acción), más costoso, y menos confiable en interfaces complejas. Úsalo cuando: no hay API disponible (software legacy), la tarea involucra múltiples aplicaciones sin integración, o el ROI de automatización justifica las limitaciones. Para software con API directa, siempre prefiere la API.",
            "concepto_reforzado": "Casos de uso apropiados para Computer Use"
          },
          {
            "pregunta": "¿Qué elemento es más crítico incluir en un prompt de Computer Use para tareas que implican modificar datos?",
            "opciones": ["La velocidad objetivo de la tarea", "Condiciones de pausa explícitas: cuándo el agente debe detenerse y pedir confirmación humana antes de ejecutar acciones que modifican o eliminan datos", "El navegador web a usar", "El sistema operativo donde se ejecuta"],
            "correcta": 1,
            "explicacion_profunda": "En Computer Use, un agente que modifica datos sin confirmación puede causar daños difícilmente reversibles: eliminar registros, sobrescribir datos correctos, enviar comunicaciones no autorizadas. Las condiciones de pausa son el mecanismo de seguridad más crítico. Ejemplos: 'Detente antes de eliminar cualquier archivo y muéstrame qué vas a eliminar', 'No envíes ningún email sin mostrarme el borrador primero', 'Si el sistema pide confirmación de cualquier tipo, pausa y pregúntame.'",
            "concepto_reforzado": "Condiciones de pausa como mecanismo de seguridad en Computer Use"
          },
          {
            "pregunta": "Un desarrollador quiere usar Computer Use para hacer testing automático de su aplicación web. ¿Cuál es la ventaja principal vs. herramientas de testing tradicionales como Selenium?",
            "opciones": ["Computer Use es siempre más rápido que Selenium", "Computer Use puede interpretar la interfaz visualmente como un usuario humano, detectando problemas de UX (texto confuso, botones poco claros, flujos contraintuitivos) que las herramientas basadas en selectores CSS no detectan", "Computer Use no requiere código para configurar los tests", "Computer Use es gratuito mientras que Selenium tiene costo de licencia"],
            "correcta": 1,
            "explicacion_profunda": "Selenium y herramientas similares verifican que los elementos HTML existen y funcionan técnicamente. Computer Use puede hacer lo que un usuario real haría: 'no entendí qué hace este botón', 'este texto es confuso', 'no sé cómo llegar desde la pantalla A a la pantalla B'. Esta capacidad de evaluación semántica de la UX es el diferenciador principal de Computer Use para testing vs. herramientas tradicionales.",
            "concepto_reforzado": "Computer Use para testing de UX vs. testing técnico"
          }
        ],
        "practica": {
          "tipo": "caso_real",
          "contexto": "Tienes un sistema de gestión de inventario legacy (sin API) que requiere exportar manualmente datos de stock cada lunes. El proceso toma 45 minutos porque involucra navegar 8 pantallas diferentes y copiar datos a un Excel.",
          "instruccion": "Diseña el prompt completo para un agente de Computer Use que automatice este proceso.",
          "input_malo": "Automatiza la exportación del inventario.",
          "pista": "Define: objetivo con estado de éxito verificable, pasos esperados con detalle suficiente, condiciones de pausa específicas, acciones prohibidas, y cómo verificar que el resultado es correcto antes de terminar.",
          "solucion": "TAREA: Exportar datos de inventario semanal del sistema legacy.\n\nOBJETIVO: Generar el archivo 'inventario_[fecha].xlsx' con los datos de stock de todas las categorías activas.\n\nESTADO DE ÉXITO: El archivo aparece en la carpeta C:/Reportes/Inventario con la fecha de hoy y contiene las 8 hojas correspondientes a las 8 categorías de productos.\n\nPASOS ESPERADOS:\n1. Abrir Sistema Legacy (ícono en el escritorio)\n2. Navegar a Reportes > Inventario > Vista Completa\n3. Seleccionar: Todas las categorías, Fecha: semana actual\n4. Para cada una de las 8 categorías: exportar a Excel (botón 'Exportar')\n5. Combinar los 8 archivos en un solo Excel con una hoja por categoría\n6. Guardar como 'inventario_[YYYY-MM-DD].xlsx' en C:/Reportes/Inventario\n\nCONDICIONES DE PAUSA:\n- Si el sistema pide login: pausa y notifícame\n- Si alguna categoría muestra error o está vacía: pausa y notifícame antes de continuar\n- Si el número de filas de cualquier categoría es 0 o >50% diferente a la semana pasada: pausa y verifica\n\nACCIONES PROHIBIDAS:\n- No modifiques ningún dato en el sistema\n- No elimines archivos existentes en C:/Reportes\n- No hagas click en botones de 'Editar', 'Eliminar' o 'Actualizar datos'",
          "criterios_de_exito": ["Estado de éxito verificable y específico (nombre del archivo, ubicación, contenido esperado)", "Condiciones de pausa cubren los errores más probables y protegen contra datos incorrectos", "Acciones prohibidas definidas explícitamente con el nivel de detalle necesario para un agente que controla una interfaz real"]
        },
        "conexion": {
          "siguiente_concepto": "Meta-prompting: prompts que diseñan prompts",
          "por_que_importa_despues": "Computer Use te da control sobre interfaces. Meta-prompting te da control sobre el proceso de creación de prompts: Claude puede ayudarte a diseñar, mejorar y optimizar los propios prompts que usas."
        }
      }
    },
    {
      "id": "m4-b8-l3", "titulo": "Meta-prompting: prompts que diseñan prompts", "bloque": 8,
      "tipo": "leccion", "duracion_min": 20, "xp": 60,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "Meta-prompting es usar Claude para diseñar, mejorar y optimizar los propios prompts que luego usarás con Claude. Esta capacidad crea un loop de mejora: describes el problema de negocio y el comportamiento deseado, y Claude genera un prompt optimizado para ese caso. Las aplicaciones más valiosas: (1) generación de primeros borradores de prompts complejos a partir de una descripción del caso de uso, (2) análisis y mejora de prompts existentes ('¿por qué este prompt produce resultados inconsistentes?'), (3) traducción de requisitos de negocio a instrucciones técnicas de prompt, y (4) generación de casos de prueba para un prompt ('dame 20 inputs de prueba que cubran edge cases para este sistema'). El meta-prompting tiene sus propias reglas: sé muy específico sobre el contexto de uso (quiénes son los usuarios, cuál es el caso de uso exacto, qué formato de output se necesita, qué comportamientos son críticos), incluye ejemplos de inputs representativos, y pide al modelo que explique las decisiones de diseño del prompt que genera. La limitación: el prompt generado por meta-prompting es un punto de partida sólido, no una solución final — siempre necesita validación con datos reales.",
          "analogia": "El meta-prompting es como tener un arquitecto que diseña planos para ti. Puedes describir lo que necesitas ('quiero una casa con 3 habitaciones, patio, y adaptada para trabajo desde casa') y el arquitecto traduce esos requisitos en planos técnicos. Tú todavía necesitas revisar los planos y hacer ajustes, pero empiezas con un diseño profesional en vez de una hoja en blanco.",
          "ejemplo_malo": "Escríbeme un buen prompt para clasificar emails.",
          "ejemplo_bueno": "Necesito diseñar un prompt para un sistema de clasificación de emails de soporte al cliente para una fintech colombiana de pagos digitales. Contexto: 500 emails diarios, en español con términos técnicos financieros, de usuarios entre 18-65 años con variado nivel técnico. Categorías necesarias: Fallo de transacción, Problema de cuenta, Consulta de producto, Fraude/Seguridad, Feedback. Formato de output requerido: JSON con categoría y nivel de urgencia (1-3). Comportamiento crítico: los emails de Fraude/Seguridad deben tener urgencia 3 siempre.\n\nGenera el system prompt optimizado para este caso, y explica las decisiones de diseño más importantes que tomaste.",
          "tip_profesional": "Después de que Claude genere un prompt via meta-prompting, pídele también que genere 10-15 casos de prueba representativos para ese prompt, incluyendo edge cases. Esto te da instantáneamente un test suite básico para validar el prompt."
        },
        "verificacion": [
          {
            "pregunta": "¿Cuál es la información más crítica que debes proveer para que el meta-prompting genere un prompt de calidad?",
            "opciones": ["El nombre del modelo que vas a usar", "El contexto completo del caso de uso: quiénes son los usuarios, cuál es el objetivo exacto, qué formato de output se necesita, qué comportamientos son críticos e innegociables, y ejemplos de inputs representativos", "Solo el nombre de la tarea que quieres automatizar", "La cantidad de tokens que estás dispuesto a usar"],
            "correcta": 1,
            "explicacion_profunda": "El meta-prompting produce prompts de calidad proporcional a la calidad del briefing que le das. 'Escríbeme un prompt de clasificación' produce un prompt genérico. 'Escríbeme un prompt para clasificar emails en estas 5 categorías, con estos ejemplos de cada categoría, para usuarios con este perfil, con este formato de output, y con esta regla crítica' produce un prompt específico y bien diseñado. El principio es el mismo que para cualquier briefing profesional: basura entra, basura sale.",
            "concepto_reforzado": "Calidad del briefing como determinante de la calidad del meta-prompt"
          },
          {
            "pregunta": "¿Por qué el prompt generado por meta-prompting siempre necesita validación con datos reales?",
            "opciones": ["Porque Claude siempre genera prompts incorrectos", "Porque el meta-prompting genera un diseño teóricamente sólido basado en la descripción del caso, pero el rendimiento real depende de las características específicas de los datos del cliente que solo se revelan con pruebas", "Porque los prompts generados automáticamente están desactualizados", "No necesita validación si el briefing fue detallado"],
            "correcta": 1,
            "explicacion_profunda": "El meta-prompting trabaja con la descripción del problema, no con los datos reales. Puede diseñar un prompt perfecto para 'clasificar emails de soporte' basado en tu descripción, pero si tus emails reales tienen características que no mencionaste (mezcla de idiomas, jerga específica del sector, formatos inusuales), el prompt puede fallar de formas inesperadas. La validación con datos reales siempre es el step final.",
            "concepto_reforzado": "Limitaciones del meta-prompting y necesidad de validación"
          },
          {
            "pregunta": "¿Cuál es el uso más eficiente del meta-prompting para un prompt engineer experimentado?",
            "opciones": ["Reemplazar completamente el trabajo manual de prompt engineering", "Como punto de partida acelerado: generar el borrador inicial y los casos de prueba en minutos, luego iterar con las técnicas avanzadas aprendidas en el módulo", "Solo para prompts simples de menos de 200 tokens", "Solo cuando se trabaja bajo presión de tiempo"],
            "correcta": 1,
            "explicacion_profunda": "El meta-prompting es un acelerador, no un reemplazo. Un prompt engineer experimentado usa meta-prompting para saltar la página en blanco: en 5 minutos tiene un borrador sólido con decisiones de diseño justificadas y casos de prueba. Luego aplica su expertise para refinar, añadir técnicas avanzadas (ET, XML, few-shot) y validar con datos reales. La combinación meta-prompting + expertise humano es mucho más eficiente que cada uno solo.",
            "concepto_reforzado": "Meta-prompting como acelerador del workflow de prompt engineering"
          }
        ],
        "practica": {
          "tipo": "caso_real",
          "contexto": "Eres el prompt engineer de una plataforma de e-learning. Necesitas crear un sistema que evalúe las respuestas de texto libre de los estudiantes en ejercicios de escritura y les dé feedback constructivo.",
          "instruccion": "Escribe el meta-prompt que usarías para pedirle a Claude que diseñe el prompt de evaluación para ti. Incluye todo el contexto necesario.",
          "input_malo": "Diseña un prompt para evaluar respuestas de estudiantes.",
          "pista": "Tu meta-prompt debe incluir: contexto del caso de uso, quiénes son los usuarios (estudiantes y su nivel), qué evalúa el sistema, el formato de feedback esperado, comportamientos críticos del evaluador, y qué ejemplos incluir.",
          "solucion": "Meta-prompt (lo que le dices a Claude para que diseñe el prompt):\n\n'Necesito diseñar un prompt para un sistema de evaluación automática de ejercicios de escritura en una plataforma de e-learning de Marketing Digital para profesionales latinoamericanos (Colombia, México, Argentina). Nivel de los estudiantes: intermedio, con conocimiento de marketing pero habilidades de escritura variables.\n\nCONTEXTO DEL EJERCICIO: Los estudiantes escriben propuestas de email marketing de 150-300 palabras para un caso de negocio específico. El ejercicio tiene criterios de evaluación predefinidos.\n\nCRITERIOS DE EVALUACIÓN (los debes incluir en el prompt):\n1. Línea de asunto: ¿genera curiosidad o urgencia?\n2. Personalización: ¿habla al dolor específico del cliente?\n3. CTA: ¿tiene un llamado a la acción claro y único?\n4. Longitud: ¿es apropiada para email marketing (no más de 250 palabras)?\n5. Tono: ¿profesional pero cercano?\n\nFORMATO DE FEEDBACK ESPERADO: Constructivo y motivador (estudiante puede sentirse frustrado con feedback duro). Para cada criterio: calificación CUMPLE/MEJORA/NO CUMPLE + explicación de 1-2 oraciones + sugerencia específica de mejora. Al final: puntuación total y mensaje de aliento.\n\nCOMPORTAMIENTO CRÍTICO: Nunca comparar negativamente con otros estudiantes. Si la propuesta es completamente incorrecta, destacar lo que sí funciona antes de señalar lo que no.\n\nEjemplos de respuestas estudiante que recibirá el prompt: [respuesta buena de ejemplo] y [respuesta que necesita mejora de ejemplo].\n\nGenera el prompt optimizado y explica las decisiones de diseño más importantes. Después genera 10 casos de prueba representativos incluyendo casos edge.'",
          "criterios_de_exito": ["El meta-prompt incluye contexto completo del caso de uso, los criterios de evaluación específicos y el formato de feedback esperado", "Especifica el tono y comportamientos críticos del evaluador (constructivo, no comparativo)", "Solicita explícitamente casos de prueba, creando el test suite del prompt al mismo tiempo"]
        },
        "conexion": {
          "siguiente_concepto": "IA colaborativa: flujos humano+IA de alto rendimiento",
          "por_que_importa_despues": "Has aprendido a usar Claude para mejorar tus propios prompts. El siguiente nivel es entender cómo los equipos de alto rendimiento integran IA y humanos en flujos de trabajo que potencian las fortalezas de ambos."
        }
      }
    },
    {
      "id": "m4-b8-l4", "titulo": "IA colaborativa: flujos humano+IA de alto rendimiento", "bloque": 8,
      "tipo": "leccion", "duracion_min": 22, "xp": 60,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "La IA colaborativa no es sobre reemplazar humanos con IA, sino sobre diseñar flujos de trabajo donde los humanos y la IA hacen lo que cada uno hace mejor. Los humanos son superiores en: juicio contextual complejo, decisiones con consecuencias éticas, relaciones interpersonales, creatividad estratégica, y gestión de situaciones no previstas. La IA es superior en: velocidad de procesamiento, consistencia a escala, síntesis de grandes volúmenes de información, generación de opciones, y tareas repetitivas de alta precisión. Los flujos de trabajo de alto rendimiento asignan cada tarea al agente más idóneo. Los patrones más efectivos: (1) IA como primer borrador + humano como editor (escribir → refinar), (2) IA como investigador + humano como estratega (recopilar opciones → decidir), (3) IA como detector de patrones + humano como intérprete (analizar datos → dar significado de negocio), (4) IA como ejecutor de tareas repetitivas + humano como gestor de excepciones (procesar 95% automáticamente → humano maneja el 5% complejo). El error más común es el 'checklist washing': usar IA para generar outputs y luego el humano los aprueba sin realmente revisarlos, perdiendo el valor del juicio humano y asumiendo todos los riesgos de los errores del modelo.",
          "analogia": "Un equipo humano+IA bien diseñado es como un cirujano con el mejor instrumental quirúrgico del mundo: el instrumento amplifica la capacidad del cirujano, pero el juicio, la habilidad y la responsabilidad siempre son del humano. El error sería creer que el instrumento puede operar solo.",
          "ejemplo_malo": "Flujo: Claude genera el análisis → gerente lo aprueba en 30 segundos sin leer → se envía al cliente. [checklist washing]",
          "ejemplo_bueno": "Flujo: Claude genera el borrador del análisis + lista de supuestos usados + las 3 áreas de mayor incertidumbre → gerente revisa específicamente los supuestos y las áreas de incertidumbre (5 minutos de revisión focalizada en vez de revisar todo) → gerente valida o corrige → se envía al cliente con mayor confianza.",
          "tip_profesional": "Diseña el output de Claude para facilitar la revisión humana, no solo para ser el output final. Pide explícitamente que incluya: los supuestos clave que hizo, las áreas de incertidumbre, y las preguntas que el humano debería verificar. Esto convierte la revisión humana de un bottleneck a un control de calidad eficiente."
        },
        "verificacion": [
          {
            "pregunta": "¿Qué es el 'checklist washing' en flujos humano+IA y por qué es problemático?",
            "opciones": ["Cuando la IA procesa formularios de verificación", "Cuando un humano aprueba formalmente el output de la IA sin realmente revisarlo, creando la ilusión de supervisión humana sin el beneficio real del juicio humano", "Cuando la IA limpia datos de un checklist", "Es una práctica recomendada de control de calidad"],
            "correcta": 1,
            "explicacion_profunda": "El checklist washing es uno de los riesgos más graves de los sistemas humano+IA: el humano firma la aprobación (asumiendo responsabilidad legal y ética) sin realmente ejercer el juicio que justifica esa aprobación. Los errores del modelo pasan sin detección. La solución es diseñar el flujo para que la revisión humana sea específica y focalizada (revisar los supuestos, las incertidumbres, las decisiones de alto impacto) en vez de revisar todo superficialmente.",
            "concepto_reforzado": "Checklist washing y diseño de revisión humana efectiva"
          },
          {
            "pregunta": "¿En qué tipo de tareas el humano siempre debe mantener el rol de decisor final, incluso cuando la IA tiene muy alto rendimiento?",
            "opciones": ["En todas las tareas sin excepción", "En decisiones con consecuencias éticas significativas, impacto directo en personas, o donde el contexto relacional y político es crítico — áreas donde el juicio humano aporta valor que la IA no puede replicar confiablemente", "Solo en tareas legales y médicas", "Solo cuando la IA tiene menos del 90% de accuracy"],
            "correcta": 1,
            "explicacion_profunda": "Un sistema de IA puede clasificar correctamente el 95% de los casos de despido en una empresa. Pero la decisión de despedir a una persona específica involucra contexto humano, consecuencias para una familia real, y responsabilidad moral que el juicio humano debe asumir. Alta accuracy de la IA no equivale a idoneidad para tomar la decisión. La IA informa y acelera; el humano decide y es responsable.",
            "concepto_reforzado": "Criterios para mantener el juicio humano como decisor final"
          },
          {
            "pregunta": "¿Cuál es el patrón de colaboración más eficiente para análisis de mercado donde se necesita procesar 500 artículos y generar una estrategia?",
            "opciones": ["El humano lee los 500 artículos y luego usa la IA para escribir el reporte", "IA procesa los 500 artículos, identifica los patrones y temas clave, y sintetiza los hallazgos más relevantes → el humano revisa la síntesis, aplica su conocimiento del mercado y contexto estratégico de la empresa, y toma las decisiones estratégicas", "La IA hace todo el análisis y estrategia sin intervención humana", "El humano selecciona los 10 artículos más relevantes y la IA los analiza"],
            "correcta": 1,
            "explicacion_profunda": "Este patrón 'IA como investigador + humano como estratega' aprovecha las fortalezas de cada uno: la IA puede procesar 500 artículos en minutos con alta consistencia (imposible para un humano en tiempo razonable); el humano aporta el conocimiento de la empresa, el contexto competitivo, las relaciones con clientes, y el juicio estratégico que la IA no tiene. La síntesis de la IA le ahorra semanas de trabajo al analista; el juicio del analista hace que la estrategia sea realmente valiosa.",
            "concepto_reforzado": "Patrón IA-investigador + humano-estratega"
          }
        ],
        "practica": {
          "tipo": "caso_real",
          "contexto": "Eres el director de una agencia de contenido. Tu equipo de 5 personas produce 200 artículos de blog al mes para clientes. El proceso actual: briefing del cliente → investigación (3h) → borrador (4h) → revisión interna (1h) → entrega. Total: 8h por artículo.",
          "instruccion": "Rediseña el flujo de producción de contenido para integrar IA de manera que reduzca el tiempo sin eliminar el juicio humano donde agrega valor real.",
          "input_malo": "Usa IA para escribir todos los artículos y el humano solo los revisa.",
          "pista": "Identifica qué partes del proceso son mecanizables (investigación, primer borrador, SEO básico) y qué partes requieren juicio humano real (estrategia editorial, voz de la marca del cliente, ángulos creativos únicos). Diseña el flujo con tiempos estimados.",
          "solucion": "FLUJO REDISEÑADO: Producción de Contenido con IA Colaborativa\n\nSTEP 1 — Briefing estratégico (humano, 30 min → sin cambio)\nEl escritor entiende el cliente, la audiencia, los objetivos del artículo.\n\nSTEP 2 — Investigación IA (IA, 5 min → antes: humano 3h)\nPrompt: 'Investiga los últimos 6 meses de contenido sobre [tema] e identifica: 3 ángulos no cubiertos por la competencia, las 5 fuentes más citadas, y las preguntas frecuentes sin respuesta completa. Lista con fuentes.'\nRevisión humana (15 min): validar ángulos, seleccionar el más adecuado para el cliente.\n\nSTEP 3 — Borrador IA con voz del cliente (IA, 3 min → antes: humano 4h)\nPrompt: 'Escribe el artículo con el ángulo [X], en la voz de [perfil del cliente], con estos ejemplos de su estilo [muestras], para esta audiencia [perfil]. Longitud: 1200 palabras. Incluye: hook de apertura, 3 secciones principales con datos, CTA final.'\nRevisión humana (45 min): ajustar voz, añadir anécdotas del cliente, refinar CTA.\n\nSTEP 4 — SEO y optimización IA (IA, 2 min → antes: humano 30 min)\nPrompt: 'Optimiza este artículo para SEO: sugiere 5 variaciones del title tag, 3 opciones de meta description, y 5 términos semánticos a incluir naturalmente en el texto.'\n\nTOTAL NUEVO: ~1h 35min por artículo (vs. 8h) — liberando 6h 25min por artículo para trabajo estratégico.",
          "criterios_de_exito": ["El juicio humano se mantiene en las decisiones de mayor valor: ángulo estratégico, voz de la marca, revisión de calidad", "La IA asume las tareas de alto volumen y baja singularidad: investigación, primer borrador, SEO técnico", "El flujo define tiempos específicos por step, haciendo el ahorro concreto y medible"]
        },
        "conexion": {
          "siguiente_concepto": "Tendencias 2026-2027 en IA generativa",
          "por_que_importa_despues": "Has aprendido a colaborar con IA como profesional. Ahora necesitas saber hacia dónde va la disciplina para posicionarte en la frontera, no detrás de ella."
        }
      }
    },
    {
      "id": "m4-b8-l5", "titulo": "Tendencias 2026-2027 en IA generativa", "bloque": 8,
      "tipo": "leccion", "duracion_min": 20, "xp": 60,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "El panorama de la IA generativa evoluciona a una velocidad sin precedentes. Las tendencias con mayor impacto para 2026-2027 para un prompt engineer profesional: (1) Agentes autónomos de larga duración: los modelos actuales son principalmente de un turno o conversación. Los próximos modelos gestionarán proyectos de días o semanas de duración con memoria persistente, delegación de subtareas y auto-corrección. (2) Multimodalidad expandida: los modelos procesarán video en tiempo real, audio, y datos de sensores IoT además de texto e imágenes. Los casos de uso de manufactura, salud y retail cambiarán radicalmente. (3) Modelos especializados de bajo costo: junto a los grandes modelos generalistas, habrá un ecosistema de modelos pequeños y especializados (un modelo que solo hace análisis financiero, otro que solo hace código Python) con rendimiento superior en su dominio a un costo 100x menor. (4) Razonamiento verificable: modelos con capacidad de mostrar cada paso de su razonamiento de forma verificable (similar a Extended Thinking pero con mayor transparencia y confiabilidad) serán el estándar para aplicaciones críticas. (5) Regulación creciente: la Unión Europea lidera con el AI Act, y Colombia, México y Brasil están desarrollando marcos regulatorios. Los prompt engineers necesitarán entender compliance además de técnica.",
          "analogia": "Seguir las tendencias de IA es como seguir las tendencias de internet en 2000: quien entendió la evolución de web → mobile → apps → cloud antes que el mercado masivo construyó las carreras y empresas más exitosas de las siguientes dos décadas.",
          "ejemplo_malo": "Solo aprender las técnicas actuales y asumir que el campo se estabilizará.",
          "ejemplo_bueno": "Mantenerse actualizado a través de: papers de Anthropic y OpenAI (aparecen en arXiv), el blog de Anthropic (anthropic.com/research), implementar experimentos con cada nueva capacidad cuando se lanza (Extended Thinking cuando salió, Computer Use cuando salió), y documentar los casos de uso donde cada nueva capacidad cambia el diseño de un sistema.",
          "tip_profesional": "Cada 3 meses, reserva un día para explorar las últimas capacidades de Claude que no has usado. No para estudiarlas teóricamente, sino para construir un prototipo rápido con un caso de uso real de tu trabajo. Los prompt engineers que más valor generan son los que convierten nuevas capacidades en valor de negocio antes que el mercado las adopte masivamente."
        },
        "verificacion": [
          {
            "pregunta": "¿Por qué la tendencia de 'agentes autónomos de larga duración' cambia fundamentalmente el prompt engineering?",
            "opciones": ["Solo cambia la longitud de los prompts", "Requiere diseñar prompts que guíen decisiones secuenciales sobre períodos largos, con gestión de memoria persistente, manejo de incertidumbre acumulada, y protocolos de escalación para cuando el agente encuentra situaciones no previstas — mucho más complejo que prompts de un solo turno", "Solo afecta a casos de uso empresariales grandes", "No cambia el prompt engineering fundamentalmente"],
            "correcta": 1,
            "explicacion_profunda": "Un agente que trabaja en un proyecto durante 3 días debe manejar: memoria de decisiones pasadas (qué ya intentó y por qué falló), cambios en el contexto durante la tarea, incertidumbre que se acumula con cada decisión, y situaciones completamente no previstas en las instrucciones originales. Diseñar para esto requiere un nivel de especificidad y robustez del prompt radicalmente diferente a diseñar una respuesta conversacional.",
            "concepto_reforzado": "Impacto de agentes de larga duración en el diseño de prompts"
          },
          {
            "pregunta": "¿Cómo afectará el AI Act europeo a los prompt engineers que trabajan para empresas con operaciones en Europa?",
            "opciones": ["No los afectará — la regulación es solo para los fabricantes de modelos", "Deberán documentar el diseño y las decisiones de los sistemas de IA que construyen, especialmente para aplicaciones de alto riesgo (RRHH, crédito, salud, servicios críticos), y garantizar que los sistemas pueden ser auditados y explicados a reguladores", "Solo afecta a sistemas que usan más de 100K tokens", "Solo aplicará a partir de 2030"],
            "correcta": 1,
            "explicacion_profunda": "El AI Act clasifica los sistemas de IA por nivel de riesgo. Para sistemas de alto riesgo (usados en decisiones de empleo, crédito, educación, servicios esenciales), requiere: documentación del diseño del sistema, registro en la UE, pruebas de robustez, y explicabilidad de las decisiones. Un prompt engineer que diseña un sistema de scoring de candidatos para una empresa con operaciones en Europa necesita cumplir estos requisitos o arriesgar sanciones significativas para el cliente.",
            "concepto_reforzado": "Marco regulatorio europeo y sus implicaciones para prompt engineers"
          },
          {
            "pregunta": "¿Cuál es la recomendación más práctica para mantenerse actualizado en el campo de la IA generativa?",
            "opciones": ["Seguir a influencers de IA en redes sociales", "Leer todos los papers académicos de IA publicados cada mes", "Implementar experimentos prácticos con cada nueva capacidad cuando se lanza, construyendo prototipos rápidos con casos de uso reales de tu trabajo", "Hacer un curso completo de IA cada año"],
            "correcta": 2,
            "explicacion_profunda": "La diferencia entre 'saber que existe' y 'saber cómo usar en producción' solo se cierra con práctica. Extended Thinking, Computer Use, multimodalidad — cada capacidad tiene sutilezas de implementación que solo se descubren construyendo algo real. Los prompt engineers más valiosos son los que tienen experiencia práctica con las capacidades más recientes, no solo conocimiento teórico de su existencia.",
            "concepto_reforzado": "Aprendizaje práctico continuo como estrategia profesional"
          }
        ],
        "practica": {
          "tipo": "caso_real",
          "contexto": "Eres el director de innovación de una empresa de seguros de salud en Colombia. El CEO te pide que identifiques las 3 oportunidades de mayor impacto que las tendencias de IA 2026-2027 representan para la empresa en los próximos 18 meses.",
          "instruccion": "Diseña el prompt que usarías para que Claude te ayude a hacer este análisis estratégico.",
          "input_malo": "¿Qué oportunidades de IA hay para aseguradoras de salud?",
          "pista": "El prompt debe proveer contexto específico de la empresa (tamaño, operaciones, procesos críticos), pedir análisis de tendencias específicas aplicadas a seguros de salud en Colombia, y solicitar formato ejecutivo con priorización por impacto y viabilidad.",
          "solucion": "System: Eres un consultor estratégico especializado en transformación digital del sector asegurador latinoamericano.\n\nContexto de la empresa:\n- Aseguradora de salud con 280,000 afiliados en Colombia\n- Procesos intensivos en datos: suscripción de pólizas, gestión de reclamaciones, atención al afiliado, red de prestadores\n- Equipo de tecnología: 45 personas, capacidad limitada de desarrollo interno\n- Presupuesto de innovación: moderado (no para proyectos de más de $200K USD)\n\nTendencias de IA 2026-2027 a analizar:\n1. Agentes autónomos de larga duración\n2. Multimodalidad expandida (análisis de imágenes médicas, documentos clínicos)\n3. Modelos especializados de bajo costo para dominio específico\n4. Razonamiento verificable para decisiones críticas\n5. Marco regulatorio creciente (Superintendencia de Salud + regulación IA)\n\nPara cada tendencia, evalúa:\n- Aplicación específica más relevante para nuestra operación\n- Impacto estimado (bajo/medio/alto) con justificación\n- Viabilidad con nuestras capacidades actuales (baja/media/alta)\n- Riesgos regulatorios en Colombia\n\nOutputformat: Tabla de priorización + top 3 oportunidades con plan de exploración de 90 días para cada una.",
          "criterios_de_exito": ["El prompt provee contexto específico de la empresa que permite análisis relevante, no genérico", "Solicita evaluación de viabilidad y riesgos regulatorios — críticos para Colombia específicamente", "El formato de output (tabla + plan 90 días) produce resultados directamente accionables para el CEO"]
        },
        "conexion": {
          "siguiente_concepto": "Tu carrera como Prompt Engineer profesional",
          "por_que_importa_despues": "Conoces las tendencias. Ahora define tu posicionamiento: cómo construir una carrera o negocio alrededor del prompt engineering en el mercado latinoamericano en los próximos 2 años."
        }
      }
    },
    {
      "id": "m4-b8-l6", "titulo": "Tu carrera como Prompt Engineer profesional", "bloque": 8,
      "tipo": "leccion", "duracion_min": 22, "xp": 65,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "El mercado laboral para prompt engineers y roles relacionados con IA generativa en Latinoamérica está en expansión exponencial. Las rutas profesionales principales: (1) Prompt Engineer en empresas tech (salario: $40,000-$120,000 USD/año), responsable de diseñar, optimizar y mantener los sistemas de IA del producto; (2) AI Product Manager: combina conocimiento de producto con comprensión profunda de capacidades y limitaciones de LLMs ($60,000-$150,000 USD/año); (3) Consultor/Freelancer: proyectos de $8,000-$50,000 USD más retainer mensual, alta demanda en empresas que quieren implementar IA pero no tienen expertise interno; (4) Emprendedor: construir productos o herramientas verticales basadas en LLMs ($0 a escala ilimitada). Para construir credibilidad en el mercado latinoamericano: el portfolio es más valioso que las certificaciones (muestra proyectos reales con métricas de impacto), la especialización en una industria vertical (legal, salud, fintech, educación) multiplica tu valor vs. ser generalista, y publicar casos de estudio (en LinkedIn, Medium o tu propio blog) en español posiciona como referente en un mercado con poco contenido de calidad en el idioma. Las certificaciones relevantes incluyen: Anthropic Certification (cuando esté disponible), cursos verificados de plataformas como DeepLearning.AI, y certificaciones de cloud (AWS AI Practitioner, Google Cloud AI) que muestran capacidad de implementación end-to-end.",
          "analogia": "Construir una carrera en prompt engineering hoy es similar a construir una carrera en desarrollo web en 2005: el mercado es enorme y la competencia es baja todavía, especialmente en español. Los que se posicionen ahora tendrán una ventaja de 3-5 años sobre los que entren después.",
          "ejemplo_malo": "Portfolio: 'Tengo experiencia usando ChatGPT y Claude para distintas tareas.'",
          "ejemplo_bueno": "Portfolio: 'Diseñé el sistema de clasificación de emails de soporte para Fintech X que procesa 500 emails/día con 94% de accuracy, reduciendo el tiempo de clasificación de 3h a 20min diarios. Construí el pipeline de análisis de contratos para Firma Legal Y que redujo el tiempo de revisión de 3h a 15min por contrato. Implementé el chatbot de onboarding de empleados para Empresa Z que redujo las preguntas repetitivas al equipo de RRHH en un 70%.'",
          "tip_profesional": "Construye tu portfolio con proyectos reales, no demos. El primer proyecto puede ser pro-bono para una ONG, startup amiga, o incluso para tu propia empresa actual. Lo que importa son las métricas reales: cuánto tiempo ahorró, cuánto mejoró la accuracy, cuánto costo redujo. Un proyecto real con métricas supera a diez demos perfectos."
        },
        "verificacion": [
          {
            "pregunta": "¿Por qué la especialización en una industria vertical es más valiosa que ser un prompt engineer generalista?",
            "opciones": ["Porque hay menos competencia en nichos verticales", "Porque combinar expertise en prompt engineering con conocimiento profundo de una industria (legal, salud, fintech) permite resolver problemas específicos del dominio que un generalista no puede — los clientes pagan premium por soluciones que entienden su negocio específicamente", "Porque los generalistas no pueden cobrar tarifas altas", "Solo aplica si quieres ser consultor, no si trabajas en empresa"],
            "correcta": 1,
            "explicacion_profunda": "Un cliente de una aseguradora no busca 'alguien bueno con prompts' — busca alguien que entienda el proceso de suscripción, las regulaciones de la Superintendencia de Salud, el lenguaje de reclamaciones, y los casos edge de su industria. Un prompt engineer que combine habilidades técnicas con ese conocimiento de dominio puede cobrar 2-3x más que un generalista y tiene mucho menos competencia directa.",
            "concepto_reforzado": "Ventaja competitiva de la especialización vertical"
          },
          {
            "pregunta": "¿Qué debe incluir un caso de estudio en el portfolio de un prompt engineer para tener máximo impacto?",
            "opciones": ["El código completo del sistema implementado", "El problema de negocio específico, el diseño de la solución con los prompts clave, las métricas de impacto concretas (tiempo ahorrado, accuracy, costo reducido), y las lecciones aprendidas", "Solo los prompts usados sin contexto adicional", "Testimonios del cliente sin métricas"],
            "correcta": 1,
            "explicacion_profunda": "Un caso de estudio de portfolio debe responder las preguntas que un potencial cliente o empleador tiene: ¿Qué problema resolviste? ¿Cómo lo resolviste? ¿Cómo sabes que funcionó? ¿Qué aprendiste? Las métricas concretas ('redujo el tiempo de 3h a 20min') son lo más poderoso porque hablan el lenguaje del negocio. El código puede estar en GitHub como complemento, pero las métricas son el argumento de venta.",
            "concepto_reforzado": "Estructura efectiva de un caso de estudio en portfolio"
          },
          {
            "pregunta": "Para alguien que está comenzando su carrera en prompt engineering, ¿cuál es la estrategia más efectiva para construir su primer portfolio?",
            "opciones": ["Esperar a tener un trabajo formal en una empresa tech", "Hacer proyectos pro-bono para ONG o empresas locales pequeñas para obtener proyectos reales con métricas reales, aunque el pago sea mínimo o nulo inicialmente", "Solo crear proyectos de demostración sin clientes reales", "Obtener primero todas las certificaciones disponibles"],
            "correcta": 1,
            "explicacion_profunda": "Un proyecto pro-bono real supera a diez demos perfectos porque: (1) tiene datos reales del cliente (no datos inventados), (2) tiene problemas reales que requieren soluciones reales, (3) produce métricas de impacto reales ('redujo el tiempo de X a Y'), y (4) el cliente puede dar un testimonio. Una ONG que necesita automatizar el procesamiento de sus 300 solicitudes mensuales es el proyecto de portfolio perfecto para un principiante — resuelve un problema real y genera métricas reales.",
            "concepto_reforzado": "Estrategia de portfolio para principiantes"
          }
        ],
        "practica": {
          "tipo": "caso_real",
          "contexto": "Acabas de completar el curso M4 de Prompt Engineering Profesional en Estratek IA Academy. Quieres construir tu presencia profesional como prompt engineer en el mercado colombiano.",
          "instruccion": "Diseña tu plan de acción para los próximos 90 días para posicionarte como prompt engineer profesional.",
          "input_malo": "Voy a estudiar más y cuando sepa suficiente voy a buscar trabajo.",
          "pista": "Incluye: semanas 1-4 (primer proyecto real), semanas 5-8 (primer caso de estudio publicado), semanas 9-12 (primeros contactos con potenciales clientes). Sé específico con acciones concretas.",
          "solucion": "PLAN 90 DÍAS — Prompt Engineer Profesional (Colombia)\n\nSEMANAS 1-4: Primer proyecto real\n- Identifica 3 empresas/ONG en tu red que tengan procesos manuales repetitivos (clasificación, resumen, extracción de datos)\n- Propón un proyecto pro-bono de automatización específica (ej: 'te automatizo la clasificación de solicitudes entrantes, gratis a cambio de un testimonio con métricas')\n- Implementa el sistema, mide antes y después, documenta el proceso\n- Entregables: sistema funcionando + reporte de métricas\n\nSEMANAS 5-8: Primer caso de estudio y presencia online\n- Escribe el caso de estudio en LinkedIn (problema → solución → métricas → lecciones)\n- Conecta con 20 profesionales de IA en Colombia y Latinoamérica\n- Identifica 2-3 industrias verticales con alta demanda de IA donde tienes conocimiento previo\n- Perfil de LinkedIn actualizado: 'Prompt Engineer | IA Aplicada para [industria vertical]'\n\nSEMANAS 9-12: Primeros contactos calificados\n- Identifica 10 empresas en tu vertical objetivo que podrían beneficiarse de IA\n- Prepara propuesta de valor específica para cada una (basada en el ROI de tu caso de estudio)\n- Solicita 3-5 reuniones de exploración (no ventas, sino diagnóstico)\n- Objetivo: 1 proyecto pagado o segundo proyecto pro-bono de mayor escala",
          "criterios_de_exito": ["El plan incluye acciones específicas y concretas con entregables por semana, no solo intenciones generales", "La estrategia de portfolio empieza con proyectos reales (aunque pro-bono) antes de buscar clientes pagados", "La especialización vertical está integrada desde la semana 5 — posicionamiento específico, no genérico"]
        },
        "conexion": {
          "siguiente_concepto": "Lección final: el prompt engineer del futuro",
          "por_que_importa_despues": "Has construido tu hoja de ruta profesional. La lección final sintetiza todo lo aprendido en los 8 bloques y te proyecta hacia los próximos pasos de tu desarrollo como profesional de IA."
        }
      }
    },
    {
      "id": "m4-b8-l7", "titulo": "Streaming y experiencias conversacionales avanzadas", "bloque": 8,
      "tipo": "leccion", "duracion_min": 18, "xp": 55,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "El streaming permite que la respuesta de Claude aparezca progresivamente (token por token) en vez de esperar a que la respuesta completa esté lista. Para respuestas largas (500+ tokens), la diferencia en experiencia de usuario es dramática: sin streaming, el usuario espera 15-30 segundos viendo una pantalla en blanco; con streaming, empieza a leer la respuesta en 0.5 segundos. Esta diferencia de percepción puede ser la diferencia entre un producto que se siente 'inteligente y responsivo' y uno que se siente 'lento'. El prompt engineering para experiencias conversacionales con streaming tiene implicaciones de diseño: el orden de la información en la respuesta importa más que nunca (lo más importante debe llegar primero para que el usuario vea valor inmediato), las respuestas largas se benefician de estructura visual (headers, bullets) que el usuario puede escanear mientras el texto sigue llegando, y los indicadores de progreso ('pensando...', 'analizando el documento...') reducen la ansiedad durante el tiempo de generación. Las experiencias conversacionales multi-turno requieren gestión del contexto acumulado: cada mensaje añade tokens al contexto, y en conversaciones largas el costo y la latencia crecen. Las estrategias incluyen: resumen periódico de la conversación (comprimir el historial de mensajes anteriores), ventana deslizante de contexto (mantener solo los últimos N mensajes), y extractión de puntos clave (guardar solo la información factual relevante de cada turno).",
          "analogia": "El streaming en un chat de IA es como una conversación en tiempo real vs. recibir una carta: la carta puede tener el mismo contenido, pero la conversación en tiempo real se siente más natural y mantiene el engagement del usuario.",
          "ejemplo_malo": "Prompt para chat: 'Responde la pregunta del usuario de forma completa y detallada con toda la información relevante que tengas.' [sin considerar streaming ni gestión de contexto]",
          "ejemplo_bueno": "Prompt para chat con streaming: 'Responde de forma concisa primero (2-3 oraciones con el punto más importante), luego expande los detalles si son necesarios. Estructura tus respuestas con headers cuando sean largas para facilitar el escaneo. Si el usuario tiene una pregunta de seguimiento, retoma solo el contexto más relevante de la conversación anterior.'",
          "tip_profesional": "Para productos conversacionales con usuarios reales, implementa un sistema de 'resumen de contexto' que se activa automáticamente cuando la conversación supera los 8,000 tokens. Claude puede resumir los puntos clave de la conversación hasta ese punto, reduciendo el contexto a 1,000-2,000 tokens sin perder la continuidad esencial."
        },
        "verificacion": [
          {
            "pregunta": "¿Por qué el streaming mejora la experiencia percibida aunque el tiempo total de generación sea el mismo?",
            "opciones": ["Porque el streaming usa menos tokens", "Porque el primer token llega en ~0.5 segundos vs. esperar 15-30 segundos por la respuesta completa — el usuario empieza a leer y procesar información inmediatamente, haciendo la espera imperceptible y el sistema más responsivo", "Porque el streaming siempre produce respuestas más cortas", "No mejora la experiencia — es solo una preferencia técnica"],
            "correcta": 1,
            "explicacion_profunda": "La psicología del tiempo de espera es clara: 10 segundos de pantalla en blanco se sienten como una eternidad; 10 segundos leyendo texto que sigue llegando se pasan sin notar. Los estudios de UX muestran que el tiempo de respuesta percibido (cuándo el usuario empieza a ver contenido) es más importante que el tiempo de respuesta real (cuándo está toda la respuesta). El streaming optimiza el tiempo percibido.",
            "concepto_reforzado": "Streaming y psicología del tiempo de respuesta percibido"
          },
          {
            "pregunta": "¿Qué problema crea no gestionar el contexto acumulado en conversaciones largas?",
            "opciones": ["El usuario puede confundirse con el historial", "El costo y la latencia crecen con cada turno de la conversación, y en conversaciones muy largas se puede alcanzar el límite de la ventana de contexto, perdiendo los mensajes más antiguos sin que el usuario lo sepa", "Claude se vuelve menos inteligente con el tiempo", "Solo afecta a conversaciones de más de 100 turnos"],
            "correcta": 1,
            "explicacion_profunda": "Cada mensaje en una conversación se añade al contexto que se envía en la siguiente llamada a la API. En una conversación de 50 turnos con mensajes de 200 tokens promedio, el contexto acumulado puede superar los 10,000 tokens — multiplicando el costo por turno a medida que la conversación avanza. Eventualmente, si la conversación supera la ventana de contexto, se pierden los mensajes más antiguos. La gestión activa del contexto (resumen, ventana deslizante) mantiene el costo controlado y la conversación coherente.",
            "concepto_reforzado": "Gestión de contexto en conversaciones multi-turno"
          },
          {
            "pregunta": "¿Cuál es la estrategia más efectiva para reducir el contexto acumulado en una conversación larga sin perder continuidad?",
            "opciones": ["Empezar una conversación nueva cada 10 mensajes", "Usar Claude para generar un resumen de los puntos clave de la conversación hasta ese momento, reemplazando el historial completo por el resumen más compacto", "Eliminar los mensajes del usuario y solo mantener las respuestas de Claude", "Solo reducir la longitud de las respuestas futuras"],
            "correcta": 1,
            "explicacion_profunda": "El resumen de contexto preserva la información factual crítica ('el usuario quiere hacer X, ya discutimos Y y decidimos Z') en un formato compacto, reemplazando 5,000 tokens de historial de conversación por 500 tokens de resumen. El usuario no percibe el cambio porque la continuidad temática se mantiene. Esta técnica puede reducir el costo de conversaciones largas en 70-80% sin degradar la experiencia.",
            "concepto_reforzado": "Resumen de contexto para gestión de conversaciones largas"
          }
        ],
        "practica": {
          "tipo": "reescribir",
          "contexto": "Estás construyendo un asistente conversacional para empleados de una empresa de 200 personas. El asistente responde preguntas de RRHH, IT y operaciones. Las conversaciones típicas tienen 5-15 turnos.",
          "instruccion": "Diseña el system prompt que optimice la experiencia conversacional con streaming y gestione el contexto eficientemente.",
          "input_malo": "Eres un asistente de empresa. Responde las preguntas de los empleados.",
          "pista": "Diseña para streaming (información más importante primero), gestión del contexto (instrucción de resumir cuando sea necesario), y conversación eficiente (respuestas concisas con expansión opcional).",
          "solucion": "System: Eres el asistente interno de [Empresa]. Ayudas con: RRHH (vacaciones, beneficios, políticas), IT (soporte técnico, accesos, software), y Operaciones (procesos, proveedores, reportes).\n\nFORMATO DE RESPUESTA:\n- Responde primero con la información más importante en 1-2 oraciones\n- Si el tema requiere detalle, añade secciones con headers\n- Para respuestas largas usa bullets, no párrafos\n- Mantén respuestas bajo 300 palabras salvo que el usuario pida más detalle\n\nGESTIÓN DE CONVERSACIÓN:\n- Si el usuario cambia de tema, confirma brevemente el cambio ('Claro, cambiamos a IT')\n- Si llevas más de 8 turnos en la misma conversación, al inicio de tu próxima respuesta añade: '[Resumen: hemos hablado de X y decidido Y]' en 2 líneas máx\n- Si no tienes la información para responder, di exactamente qué departamento puede ayudar\n\nTONO: Directo y amigable. No uses jerga corporativa. Trata al empleado como a un colega inteligente que necesita información rápida, no como si fuera a olvidar lo que le dices.",
          "criterios_de_exito": ["Formato de respuesta optimizado para streaming: información más importante primero, estructura escaneable", "Instrucción de resumen de contexto automático para conversaciones largas", "Límite de longitud de respuesta definido con condición de expansión — controla el costo de output"]
        },
        "conexion": {
          "siguiente_concepto": "Lección magistral final: el prompt engineer del futuro",
          "por_que_importa_despues": "Con streaming y experiencias conversacionales dominados, tienes todas las herramientas del toolkit profesional. La lección final integra todo el módulo M4 en una visión de largo plazo."
        }
      }
    },
    {
      "id": "m4-b8-l8", "titulo": "Lección magistral: el prompt engineer del futuro", "bloque": 8,
      "tipo": "leccion", "duracion_min": 25, "xp": 80,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "Has completado 94 lecciones de Prompt Engineering Profesional. Esta lección final no añade nuevas técnicas — integra todo lo aprendido en una visión coherente del profesional que puedes convertirte. El prompt engineer del futuro no es solo alguien que sabe escribir instrucciones para modelos de IA. Es un traductor entre el problema de negocio y la solución tecnológica, un diseñador de sistemas que funcionan en el mundo real con datos reales y usuarios reales, un guardián de la calidad y la seguridad en sistemas que afectan a personas reales, y un perpetuo estudiante en una disciplina que evoluciona cada trimestre. Las 9 técnicas que dominaste (zero-shot, few-shot, chain-of-thought, role prompting, XML tags, prompt chaining, RAG, extended thinking, meta-prompting) son tu caja de herramientas actual. En 18 meses, habrá nuevas técnicas. Pero el principio fundamental no cambiará: comunicar con precisión y claridad qué quieres, por qué lo quieres, para quién es, y cómo verificarás que está bien hecho. Este principio es tan antiguo como la comunicación profesional humana — los LLMs solo lo volvieron más medible y más inmediatamente verificable. El mercado latinoamericano de IA está en sus primeros años de adopción empresarial real. Tienes 2-3 años de ventana donde el expertise que has desarrollado en este módulo es genuinamente escaso y genuinamente valioso. La pregunta no es si habrá oportunidades — habrá. La pregunta es si estarás posicionado para capitalizarlas cuando lleguen.",
          "analogia": "Completar este módulo es como obtener el cinturón negro de un arte marcial: no significa que terminaste de aprender, sino que tienes los fundamentos suficientemente sólidos para empezar a aprender las cosas verdaderamente avanzadas — que solo se aprenden en el dojo real, con problemas reales.",
          "ejemplo_malo": "Terminar el curso y esperar a que lleguen las oportunidades.",
          "ejemplo_bueno": "Terminar el curso y en los próximos 7 días: (1) identificar un problema real en tu trabajo o entorno que se pueda resolver con prompt engineering, (2) construir un prototipo aunque sea imperfecto, (3) medir el resultado, (4) documentarlo como primer caso de estudio. La acción en los primeros 7 días determina si el aprendizaje se convierte en expertise real o en conocimiento inerte.",
          "tip_profesional": "El mayor obstáculo para los prompt engineers principiantes no es la falta de conocimiento técnico — es la parálisis del perfeccionismo ('todavía no sé suficiente'). El prompt engineering se aprende prompting, no estudiando prompting. El primer prompt imperfecto que resuelve un problema real vale más que cien prompts perfectos en ejercicios de práctica."
        },
        "verificacion": [
          {
            "pregunta": "¿Cuál es la habilidad fundamental del prompt engineer que no cambiará con la evolución de los modelos?",
            "opciones": ["Conocer todas las últimas técnicas de prompting", "La capacidad de comunicar con precisión y claridad qué se quiere, por qué, para quién es, y cómo verificar que está bien hecho — trasladado al contexto de diseñar instrucciones para sistemas de IA", "La habilidad de programar en Python", "Conocer en detalle la arquitectura técnica de los modelos transformer"],
            "correcta": 1,
            "explicacion_profunda": "Las técnicas específicas (zero-shot, few-shot, CoT) evolucionarán y serán reemplazadas. Los modelos se actualizarán. Las plataformas cambiarán. Pero la habilidad de especificar con precisión un problema, definir criterios de éxito verificables, y comunicar expectativas sin ambigüedad es una habilidad fundamental de pensamiento y comunicación profesional que no se vuelve obsoleta — se vuelve más valiosa con cada nueva herramienta que aparece.",
            "concepto_reforzado": "Habilidad fundamental vs. técnicas específicas en prompt engineering"
          },
          {
            "pregunta": "¿Por qué los primeros 2-3 años de adopción masiva de IA en empresas latinoamericanas representan una ventana de oportunidad especial?",
            "opciones": ["Porque después la IA dejará de ser útil para empresas", "Porque el expertise es genuinamente escaso en el mercado: la demanda de profesionales que puedan implementar y operar sistemas de IA efectivos supera ampliamente la oferta, creando condiciones de mercado favorables para quienes se especialicen ahora", "Porque los costos de los modelos bajarán significativamente después", "Solo aplica para desarrolladores con experiencia en machine learning"],
            "correcta": 1,
            "explicacion_profunda": "La ventana de oportunidad existe cuando la demanda supera a la oferta. En el mercado latinoamericano de IA empresarial en 2026, hay cientos de empresas que quieren implementar IA para cada profesional con expertise real en implementación. A medida que más profesionales se capaciten y entren al mercado, la ventana se cerrará — no desaparecerá, pero la ventaja competitiva de ser early disminuirá. Los que entren ahora construirán reputación, portfolio y red de contactos que los posicionarán para las oportunidades más grandes que vendrán después.",
            "concepto_reforzado": "Ventana de oportunidad del mercado latinoamericano de IA"
          },
          {
            "pregunta": "¿Cuál es la acción más importante a tomar en los próximos 7 días para convertir este aprendizaje en expertise real?",
            "opciones": ["Revisar todas las lecciones del módulo nuevamente para reforzar el conocimiento", "Identificar un problema real en tu trabajo o entorno, construir un prototipo aunque sea imperfecto, medir el resultado, y documentarlo — el primer proyecto real es lo que convierte el conocimiento en expertise", "Buscar más cursos para seguir aprendiendo antes de empezar a aplicar", "Compartir el certificado en LinkedIn"],
            "correcta": 1,
            "explicacion_profunda": "El conocimiento sin aplicación no genera expertise. El expertise se construye en el ciclo de: problema real → intento → fallo o éxito → aprendizaje → iteración. Este ciclo solo empieza cuando tomas el primer proyecto real. La calidad del primer proyecto no importa — lo que importa es que sea real (datos reales, usuario real, problema real) y que midas el resultado para aprender de él. El mejor momento para empezar era hace 6 meses. El segundo mejor momento es ahora.",
            "concepto_reforzado": "Acción inmediata como catalizador del aprendizaje real"
          }
        ],
        "practica": {
          "tipo": "caso_real",
          "contexto": "Es el último ejercicio del módulo M4. Has completado 94 lecciones y dominado 9 técnicas de prompt engineering profesional.",
          "instruccion": "Diseña tu primer proyecto real de prompt engineering para implementar en los próximos 7 días. Debe ser algo que puedas hacer con tus recursos actuales, que resuelva un problema real (aunque pequeño), y que puedas medir.",
          "input_malo": "Voy a pensar en qué proyecto hacer cuando tenga más tiempo.",
          "pista": "El proyecto no necesita ser grande. Puede ser: automatizar la clasificación de emails de tu trabajo, crear un asistente que resuma documentos que recibes regularmente, o diseñar un sistema que ayude con una tarea repetitiva específica. Lo importante: problema real, datos reales, métricas antes y después.",
          "solucion": "Mi primer proyecto de prompt engineering (plantilla para completar):\n\nPROBLEMA: [Describe un proceso repetitivo específico en tu trabajo/empresa que actualmente toma tiempo manual]\nEjemplo: 'Todos los lunes proceso manualmente 30 solicitudes de cotización por email, clasificando por urgencia y tipo de producto. Tarda 90 minutos.'\n\nMÉTRICA ACTUAL (ANTES): [Tiempo actual, errores conocidos, costo estimado]\nEjemplo: '90 minutos semanales, ~10% de clasificaciones incorrectas por fatiga'\n\nSISTEMA A CONSTRUIR: [Describe el sistema en 1-2 oraciones]\nEjemplo: 'Prompt que clasifica automáticamente las solicitudes en 4 tipos + urgencia 1-3, devuelve JSON para ingresar al sistema'\n\nMÉTRICA DE ÉXITO (DESPUÉS): [Cómo sabrás que funcionó]\nEjemplo: '>90% de accuracy en clasificación, reducción a <15 min de revisión'\n\nCOMPROMISO: Implementaré este proyecto antes del [fecha = hoy + 7 días] y publicaré los resultados (aunque sean imperfectos) en LinkedIn con el hashtag #EstrategiaIA",
          "criterios_de_exito": ["El proyecto está definido con problema específico, no genérico ('automatizar emails' vs. 'explorar IA')", "Tiene métricas antes/después definidas que permiten evaluar el éxito objetivamente", "Tiene una fecha de compromiso — el elemento más importante para pasar del plan a la acción"]
        },
        "conexion": {
          "siguiente_concepto": "Proyecto Final M4 y Certificación",
          "por_que_importa_despues": "Has completado las 95 lecciones del módulo. El siguiente paso es el Proyecto Final integrador y la Certificación que valida todo lo aprendido."
        }
      }
    }
  ]
};

data.bloques.push(b8);
fs.writeFileSync('src/content/m4-completo.json', JSON.stringify(data, null, 2), 'utf8');
console.log('B8 agregado. Bloques totales:', data.bloques.length);
console.log('Lecciones B8:', b8.lecciones.length);
const total = data.bloques.reduce((s, b) => s + b.lecciones.length, 0);
console.log('Total lecciones:', total);
