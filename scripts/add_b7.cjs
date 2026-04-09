const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m4-completo.json', 'utf8'));

const b7 = {
  "id": "b7",
  "nombre": "Nivel Profesional",
  "descripcion": "Integra prompt engineering en productos reales: pipelines, testing sistemático, optimización de costos, agentes IA y consultoría empresarial.",
  "icon": "🚀",
  "lecciones": [
    {
      "id": "m4-b7-l1", "titulo": "Prompt Engineering para productos SaaS", "bloque": 7,
      "tipo": "leccion", "duracion_min": 25, "xp": 60,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "Integrar LLMs en un producto SaaS requiere pensar en dimensiones que un prompt de uso personal no necesita: latencia (los usuarios no esperan más de 3-5 segundos), costo por request (cada llamada a la API tiene costo directo), consistencia (el mismo input debe producir outputs comparables en calidad), y mantenibilidad (el sistema debe poder actualizarse sin romper todo). La arquitectura de prompts en un producto SaaS tiene tres capas: el system prompt base (define el comportamiento del producto, se actualiza raramente), los templates de prompt (estructuras reutilizables con variables, se actualizan por feature), y el contexto dinámico (datos del usuario/sesión que se inyectan en tiempo real). Un error común es tratar el prompt como 'el código de la feature': el prompt ES parte del código y debe versionarse, testearse y deployarse con el mismo rigor que el código de producción. Los equipos maduros tienen un 'prompt registry' donde todos los prompts del producto están versionados, con sus métricas de rendimiento asociadas, y un proceso de PR/review para cambios al prompt igual que para cambios al código.",
          "analogia": "Un prompt en producción es como una función en tu código: no la escribes en un post-it y la olvidas. La versionas en git, la testeas con unit tests, la revisas antes de deployar, y monitorizas su rendimiento en producción.",
          "ejemplo_malo": "Prompt hardcodeado directamente en el código: response = claude.message('Eres un asistente de ventas. Ayuda con: ' + user_message)",
          "ejemplo_bueno": "// prompts/sales-assistant.v2.txt\nSystem: Eres el asistente de ventas de {company_name}. Tu función: {assistant_role}. Contexto del cliente: {customer_tier}. Tono: {tone_config}.\n\n// Inyección en runtime\nconst prompt = loadPrompt('sales-assistant', version='v2')\nconst rendered = renderTemplate(prompt, { company_name, customer_tier, tone_config })\nconst response = await claude.message(rendered + '\\n\\nUsuario: ' + sanitize(user_message))",
          "tip_profesional": "Separa siempre el contenido del prompt (lo que dices) de la lógica de construcción del prompt (cómo lo ensamblas). Los prompts deben estar en archivos de texto o en una base de datos, nunca concatenados directamente en el código de negocio."
        },
        "verificacion": [
          {
            "pregunta": "¿Por qué los prompts en un producto SaaS deben versionarse igual que el código?",
            "opciones": ["No es necesario — los prompts son texto, no código real", "Porque los cambios al prompt modifican el comportamiento del producto tan significativamente como los cambios al código, y necesitan el mismo control, rollback capability y historial de cambios", "Solo si el producto tiene más de 10,000 usuarios", "Solo para cumplimiento legal"],
            "correcta": 1,
            "explicacion_profunda": "Un cambio en el system prompt puede alterar completamente el comportamiento de una feature — es funcionalmente equivalente a un cambio de código. Sin versionado: no puedes hacer rollback si el cambio rompe algo, no sabes qué estaba activo cuando ocurrió un incidente, y no puedes experimentar con confianza (A/B testing de prompts). Los equipos maduros de AI engineering tienen el mismo proceso de review para prompts que para código.",
            "concepto_reforzado": "Versionado de prompts en producción"
          },
          {
            "pregunta": "¿Qué son los 'templates de prompt' y por qué son importantes en un producto SaaS?",
            "opciones": ["Prompts de ejemplo que el equipo de marketing usa para la documentación", "Estructuras de prompt con variables que se completan dinámicamente en runtime con datos del usuario/sesión, permitiendo prompts personalizados sin escribir uno nuevo para cada caso", "Prompts generados automáticamente por el modelo", "Solo aplican a productos con más de 50 prompts distintos"],
            "correcta": 1,
            "explicacion_profunda": "Los templates son la base de escalabilidad de prompts en producción. En vez de prompt 'hardcodeado' para cada caso, defines una estructura reutilizable: 'Eres el asistente de {empresa}. El cliente es {tier} con {historial}. Ayúdalo con {tarea}.' Luego inyectas los valores reales en runtime. Esto permite personalización masiva con mantenimiento centralizado: cuando quieres cambiar el tono de todos los asistentes, editas el template, no 1000 prompts individuales.",
            "concepto_reforzado": "Templates de prompt como arquitectura escalable"
          },
          {
            "pregunta": "Un equipo lanza un cambio al system prompt de su chatbot de soporte. Al día siguiente, la tasa de escalaciones a agentes humanos subió 40%. ¿Qué proceso debió existir para detectar esto antes del deploy?",
            "opciones": ["No hay manera de detectarlo antes — solo se sabe después del deploy", "Un test suite de casos representativos ejecutado antes del deploy, con comparación de outputs del prompt nuevo vs. el anterior en esos casos", "Solo revisar el prompt manualmente para buscar errores obvios", "Hacer el deploy a un solo usuario de prueba primero"],
            "correcta": 1,
            "explicacion_profunda": "Un test suite pre-deploy para prompts debe incluir casos representativos de los inputs más comunes y los edge cases conocidos. Al ejecutar el prompt nuevo y el antiguo en paralelo sobre estos casos, puedes detectar regresiones antes de afectar a usuarios reales. La tasa de escalaciones es una métrica de negocio que debería tener un proxy en el test suite: casos donde la respuesta debería resolver sin escalación, y verificar que el prompt nuevo los maneja igual o mejor.",
            "concepto_reforzado": "Testing pre-deploy de cambios a prompts en producción"
          }
        ],
        "practica": {
          "tipo": "reescribir",
          "contexto": "Eres el lead engineer de una startup SaaS que construye un asistente de ventas para e-commerce. Actualmente tienen el prompt hardcodeado directamente en el código.",
          "instruccion": "Diseña la arquitectura de prompt correcta para este sistema, incluyendo la separación de capas y el template con variables.",
          "input_malo": "const response = await claude.send('Eres un asistente de ventas. Ayuda a este cliente: ' + customer_name + ' con su consulta: ' + user_message)",
          "pista": "Separa en tres capas: system prompt base (comportamiento del asistente), template con variables (datos del cliente), y contexto dinámico (mensaje del usuario sanitizado). Define las variables que necesitas inyectar.",
          "solucion": "// CAPA 1: system-prompt-base.txt (versionado en git)\nEres el asistente de ventas de {store_name}, especializado en {product_category}. Tu objetivo: ayudar al cliente a encontrar el producto correcto y completar su compra con confianza. Tono: {tone} — siempre empático y profesional.\n\n// CAPA 2: customer-context-template.txt\n<contexto_cliente>\n  Nombre: {customer_name}\n  Historial: {order_count} compras previas, cliente {customer_tier}\n  Carrito actual: {cart_items}\n  Página actual: {current_page}\n</contexto_cliente>\n\n// CAPA 3: Construcción en runtime (pseudo-código)\nconst basePrompt = await promptRegistry.get('sales-assistant', { version: 'latest' })\nconst systemPrompt = renderTemplate(basePrompt, { store_name, product_category, tone: config.tone })\nconst contextBlock = renderTemplate(customerContextTemplate, { customer_name: anonymize(customer.name), order_count, customer_tier, cart_items, current_page })\nconst fullPrompt = systemPrompt + '\\n\\n' + contextBlock\nconst response = await claude.message({ system: fullPrompt, user: sanitize(user_message) })",
          "criterios_de_exito": ["Separa system prompt base, template de cliente, y mensaje del usuario en capas distintas", "Todas las variables del cliente están contenidas en un bloque XML delimitado, no mezcladas con las instrucciones", "El input del usuario se sanitiza antes de incluirlo — prevención de injection"]
        },
        "conexion": {
          "siguiente_concepto": "Pipelines de prompts: secuenciación y orquestación",
          "por_que_importa_despues": "Un solo prompt resuelve tareas simples. Las tareas complejas del mundo real requieren pipelines: múltiples prompts en secuencia donde el output de uno es el input del siguiente."
        }
      }
    },
    {
      "id": "m4-b7-l2", "titulo": "Pipelines de prompts: secuenciación y orquestación", "bloque": 7,
      "tipo": "leccion", "duracion_min": 25, "xp": 65,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "Un pipeline de prompts es una secuencia de llamadas al LLM donde el output de cada step es el input del siguiente, permitiendo resolver tareas complejas que un solo prompt no puede manejar bien. Los patrones más comunes: pipeline secuencial simple (A→B→C, cada step transforma la información), pipeline con bifurcación condicional (el output de un step determina qué branch ejecutar), pipeline de agregación (múltiples prompts en paralelo cuyos outputs se combinan), y pipeline con verificación (un step verifica el output del anterior antes de continuar). Los principios de diseño de pipelines son: responsabilidad única por step (cada prompt hace una sola cosa bien), outputs estructurados entre steps (JSON o XML para que cada step pueda parsear el output del anterior de manera confiable), manejo de errores en cada step (qué pasa si un step produce output inválido), y logging granular (registrar el input y output de cada step para debugging). Un ejemplo clásico: procesar un documento legal requiere: Step 1 (extraer entidades clave), Step 2 (clasificar por tipo de cláusula), Step 3 (analizar riesgo por cláusula), Step 4 (generar resumen ejecutivo). Intentar hacer todo esto en un solo prompt produce resultados mediocres.",
          "analogia": "Un pipeline de prompts es como una línea de producción en una fábrica: cada estación hace una operación específica con alta calidad. Intentar que una sola estación haga todo el proceso produce piezas defectuosas.",
          "ejemplo_malo": "Prompt único: 'Analiza este contrato de 50 páginas, extrae todas las cláusulas relevantes, clasifícalas por tipo, evalúa el riesgo legal de cada una, identifica qué necesita negociación, y genera un resumen ejecutivo de 2 páginas para el CEO.'",
          "ejemplo_bueno": "Step 1 — Extracción: 'Del siguiente texto, extrae SOLO las cláusulas que mencionan: obligaciones, plazos, penalidades, y exclusiones. Devuelve JSON con array de cláusulas, cada una con: texto, página, tipo.' → Step 2 — Clasificación: 'Toma estas cláusulas extraídas y clasifica cada una en: ALTO_RIESGO / MEDIO_RIESGO / BAJO_RIESGO según criterios [X]. Devuelve el mismo JSON con campo risk_level añadido.' → Step 3 — Síntesis: 'Con las cláusulas de ALTO_RIESGO identificadas, genera el resumen ejecutivo para el CEO.'",
          "tip_profesional": "Siempre define outputs estructurados (JSON/XML) entre steps de un pipeline. Si el Step 1 devuelve texto libre, el Step 2 tendrá que 'adivinar' dónde está la información — esto introduce errores que se amplifican en cada step posterior."
        },
        "verificacion": [
          {
            "pregunta": "¿Por qué los pipelines de prompts producen mejores resultados que un único prompt complejo para tareas extensas?",
            "opciones": ["Porque usan menos tokens en total", "Porque cada step tiene una responsabilidad única y acotada, permitiendo al modelo enfocarse completamente en esa subtarea con el contexto relevante, sin la confusión de múltiples objetivos simultáneos", "Porque son más baratos de ejecutar", "Porque Anthropic optimizó Claude específicamente para pipelines"],
            "correcta": 1,
            "explicacion_profunda": "Un modelo de lenguaje tiene mejor rendimiento cuando la tarea está claramente definida y acotada. Un prompt con 8 objetivos diferentes genera outputs que intentan satisfacer todos mediocreménte. Dividir en 8 steps, cada uno con un objetivo claro, permite que el modelo aplique todo su 'razonamiento' a esa única subtarea. Además, los errors en un step pueden detectarse y corregirse antes de propagarse al siguiente.",
            "concepto_reforzado": "Principio de responsabilidad única en pipelines"
          },
          {
            "pregunta": "¿Por qué es crítico usar outputs estructurados (JSON/XML) entre steps de un pipeline?",
            "opciones": ["Por preferencia estética del desarrollador", "Para que cada step pueda parsear confiablemente el output del anterior sin ambigüedad, previniendo errores de interpretación que se amplifican a lo largo del pipeline", "Porque Claude no entiende texto libre", "Solo es necesario en pipelines de más de 5 steps"],
            "correcta": 1,
            "explicacion_profunda": "Cuando el Step 1 devuelve texto libre ('Las cláusulas de riesgo son: ...blah blah...'), el Step 2 debe extraer las cláusulas de ese texto, introduciendo una fuente adicional de error. Cuando el Step 1 devuelve JSON estructurado ({clauses: [{text, type, page}]}), el Step 2 puede acceder directamente a los datos sin ambigüedad. Cada punto de ambigüedad en un pipeline amplifica el error — un pipeline de 5 steps con 5 puntos de ambigüedad tiene 5 oportunidades de desviar el resultado.",
            "concepto_reforzado": "Outputs estructurados como interfaces entre steps"
          },
          {
            "pregunta": "¿Qué es un 'pipeline con verificación' y cuándo se usa?",
            "opciones": ["Un pipeline que requiere aprobación manual entre cada step", "Un diseño donde un step verifica la calidad/validez del output del step anterior antes de continuar, permitiendo detectar y corregir errores antes de que se propaguen", "Un pipeline que verifica que el usuario tiene permisos para ejecutarlo", "Solo se usa en pipelines de más de 10 steps"],
            "correcta": 1,
            "explicacion_profunda": "El paso de verificación es particularmente valioso cuando un step puede fallar silenciosamente (producir output que parece correcto pero no lo es). Ejemplo: después de un step de extracción de datos, un step de verificación puede revisar que todos los campos requeridos están presentes y tienen el formato correcto. Si la verificación falla, el pipeline puede reintentar el step anterior con instrucciones adicionales o escalar a revisión humana, en vez de propagar el error.",
            "concepto_reforzado": "Verificación dentro de pipelines para control de calidad"
          }
        ],
        "practica": {
          "tipo": "caso_real",
          "contexto": "Una firma de consultoría necesita procesar automáticamente propuestas comerciales de clientes (documentos de 10-30 páginas) para extraer: presupuesto disponible, fecha límite, requisitos técnicos clave, y criterios de evaluación. Actualmente un analista tarda 2 horas por propuesta.",
          "instruccion": "Diseña el pipeline de prompts de 3-4 steps para automatizar este proceso, definiendo el output estructurado de cada step.",
          "input_malo": "Prompt único: 'Analiza esta propuesta y extrae presupuesto, fecha límite, requisitos técnicos y criterios de evaluación, luego genera un resumen ejecutivo.'",
          "pista": "Step 1: Extracción de datos duros (presupuesto, fechas) en JSON. Step 2: Extracción de requisitos técnicos clasificados por prioridad. Step 3: Análisis de criterios de evaluación y factores diferenciadores. Step 4: Síntesis en template estándar de la firma.",
          "solucion": "PIPELINE — Análisis de Propuestas Comerciales\n\nSTEP 1 — Extracción de datos estructurados:\n'Del siguiente documento, extrae SOLO datos objetivos. Devuelve JSON: {presupuesto: {monto, moneda, tipo: fijo|rango|no_especificado}, fechas: {cierre_propuesta, inicio_proyecto, entrega_final}, empresa_cliente: {nombre, sector, tamaño_estimado}, contacto_principal: {nombre, cargo}}.  Si un campo no está explícito en el documento, usa null.'\n\nSTEP 2 — Requisitos técnicos:\n'Con este documento, extrae los requisitos técnicos y clasifícalos. Devuelve JSON: {requisitos_obligatorios: [{descripcion, seccion_fuente}], requisitos_deseables: [{descripcion, seccion_fuente}], restricciones_tecnologicas: [{descripcion}]}.'\n\nSTEP 3 — Criterios de evaluación:\n'Identifica los criterios con los que este cliente evaluará las propuestas. Devuelve JSON: {criterios: [{nombre, peso_explicito_o_inferido, evidencia_en_texto}], factores_diferenciadores: [{descripcion}]}.'\n\nSTEP 4 — Síntesis ejecutiva (usa outputs de Steps 1-3):\n'Con la siguiente información estructurada extraída de la propuesta [JSON de Steps 1-3], genera el resumen ejecutivo estándar de la firma con: (1) Oportunidad en 3 bullets, (2) Fit técnico alto/medio/bajo con justificación, (3) Factores clave para ganar, (4) Riesgos identificados, (5) Recomendación GO/NO-GO.'",
          "criterios_de_exito": ["Cada step tiene responsabilidad única y acotada", "Todos los outputs entre steps son JSON estructurado con campos definidos", "El Step final de síntesis usa los outputs estructurados de todos los steps anteriores como input"]
        },
        "conexion": {
          "siguiente_concepto": "Testing y evaluación sistemática de prompts",
          "por_que_importa_despues": "Tienes pipelines funcionando. Ahora necesitas saber cómo evaluarlos sistemáticamente: cómo medir si funcionan bien, cómo detectar regresiones, y cómo comparar versiones de prompts con datos reales."
        }
      }
    },
    {
      "id": "m4-b7-l3", "titulo": "Testing y evaluación sistemática de prompts", "bloque": 7,
      "tipo": "leccion", "duracion_min": 22, "xp": 60,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "Evaluar un prompt sistemáticamente requiere tres componentes: un dataset de evaluación (casos de prueba representativos), métricas claras (cómo defines 'bueno' para tu caso de uso), y un proceso de comparación (cómo decides si el prompt A es mejor que el prompt B). El dataset de evaluación debe incluir: casos representativos del uso típico (el 80%), edge cases conocidos (entradas inusuales pero válidas), casos adversariales (intentos de abuso), y casos de incertidumbre (preguntas fuera del alcance). Las métricas varían por caso de uso, pero se dividen en: métricas automáticas (exactitud en preguntas con respuesta correcta verificable, validez de JSON producido, tiempo de respuesta) y métricas que requieren evaluación humana (calidad de redacción, tono apropiado, utilidad percibida). El proceso de comparación estándar es el A/B testing de prompts: ejecutar el prompt A y el prompt B sobre el mismo dataset de evaluación, comparar las métricas, y solo deployar el cambio si las métricas mejoran (o al menos no empeoran en métricas críticas). Una trampa común es optimizar para la métrica que más fácil se mide en vez de la que más importa.",
          "analogia": "Evaluar un prompt es como evaluar a un candidato en una entrevista: no juzgas solo con una pregunta (una métrica), sino con un conjunto de preguntas representativas (dataset de evaluación) que cubren las competencias reales que necesitas para el rol.",
          "ejemplo_malo": "El prompt parece funcionar bien en los ejemplos que probamos. Subámoslo a producción.",
          "ejemplo_bueno": "Antes de deployar, ejecutamos el prompt nuevo en nuestros 200 casos de evaluación (100 típicos, 50 edge cases, 50 adversariales). Métricas comparadas vs. prompt actual: accuracy en Q&A verificables: 87% → 91% ✅, tasa de respuestas fuera de alcance correctamente rechazadas: 92% → 89% ⚠️, JSON válido producido: 98% → 99% ✅. La métrica de rechazo bajó, investigamos los 3 casos fallidos, ajustamos el prompt, y reejecutamos antes de deployar.",
          "tip_profesional": "Construye tu dataset de evaluación desde el día uno de producción, no cuando necesites evaluar. Guarda casos reales de producción (anonimizados) con sus outputs actuales — estos son tus mejores casos de evaluación porque reflejan el uso real."
        },
        "verificacion": [
          {
            "pregunta": "¿Qué debe incluir un dataset de evaluación completo para un prompt de producción?",
            "opciones": ["Solo los casos donde el prompt actual falla", "Casos representativos del uso típico, edge cases conocidos, casos adversariales (abuso), y casos de incertidumbre (fuera del alcance)", "Solo los primeros 50 casos de producción", "Solo los casos que el cliente reportó como problemáticos"],
            "correcta": 1,
            "explicacion_profunda": "Un dataset de evaluación que solo incluye casos fáciles o solo casos problemáticos no te da una imagen completa del rendimiento del prompt. Los casos representativos miden el rendimiento normal; los edge cases detectan fallos en situaciones inusuales pero válidas; los adversariales verifican la seguridad; y los de incertidumbre verifican que el sistema sabe cuándo no sabe. La proporción típica: 60% típicos, 20% edge cases, 10% adversariales, 10% incertidumbre.",
            "concepto_reforzado": "Composición de un dataset de evaluación balanceado"
          },
          {
            "pregunta": "¿Cuál es la trampa más común al definir métricas para evaluar prompts?",
            "opciones": ["Usar demasiadas métricas", "Optimizar para la métrica más fácil de medir automáticamente en vez de la que más importa para el negocio/usuario", "No usar métricas automáticas", "Solo usar métricas que mejoren con el nuevo prompt"],
            "correcta": 1,
            "explicacion_profunda": "Es común ver equipos que miden 'porcentaje de respuestas con JSON válido' porque es fácil de medir automáticamente, cuando la métrica que realmente importa es 'porcentaje de respuestas que el usuario encontró útiles' (más difícil de medir). Definir primero qué es 'éxito' para el usuario o el negocio, y luego construir métricas que lo aproximen, previene optimizar para lo fácil en vez de para lo importante.",
            "concepto_reforzado": "Definición de métricas alineadas con objetivos reales"
          },
          {
            "pregunta": "¿Cómo se hace correctamente un A/B test de prompts?",
            "opciones": ["Deployar el prompt nuevo y ver si las quejas aumentan o disminuyen", "Ejecutar el prompt A y el prompt B sobre el mismo dataset de evaluación, comparar las métricas relevantes, y decidir con datos cuál es mejor antes de deployar a usuarios reales", "Preguntar a 10 usuarios cuál respuesta les gustó más", "Solo comparar el costo en tokens de cada prompt"],
            "correcta": 1,
            "explicacion_profunda": "El A/B testing offline (en dataset de evaluación) es el primer paso: te da datos sobre regresiones potenciales sin afectar a usuarios reales. Si el prompt pasa el A/B offline, el siguiente step es el A/B online: deployar a un porcentaje pequeño de tráfico real y comparar métricas de usuario (satisfacción, conversiones, tasas de error). Solo después de pasar ambas etapas el cambio se deploya al 100%.",
            "concepto_reforzado": "Proceso correcto de A/B testing para prompts en producción"
          }
        ],
        "practica": {
          "tipo": "caso_real",
          "contexto": "Tienes un sistema de clasificación de emails de soporte en 5 categorías. Quieres mejorar el prompt actual pero necesitas asegurarte de que el nuevo no es peor.",
          "instruccion": "Diseña el plan de evaluación completo para comparar el prompt actual vs. el nuevo antes de deployar.",
          "input_malo": "Probamos el prompt nuevo con 5 emails y se ve bien. Lo subimos.",
          "pista": "Necesitas: dataset de evaluación con los 4 tipos de casos, métricas específicas para este sistema (accuracy de clasificación, tasa de respuestas 'no sé' apropiadas), y criterios de decisión para deploy.",
          "solucion": "PLAN DE EVALUACIÓN — Sistema Clasificación Emails\n\n1. DATASET DE EVALUACIÓN (200 casos totales):\n   - 120 emails representativos de uso típico (24 por categoría, balanceado)\n   - 40 edge cases: emails ambiguos que podrían ser 2+ categorías\n   - 20 adversariales: emails con lenguaje inusual, idiomas mezclados, sarcasmo\n   - 20 fuera de alcance: emails que no deben clasificarse como soporte (spam, solicitudes de trabajo)\n\n2. MÉTRICAS:\n   - Accuracy por categoría (objetivo: >90% en todas)\n   - Accuracy en edge cases (objetivo: >75%, razonamiento aceptable)\n   - Tasa de rechazo correcto en casos fuera de alcance (objetivo: >85%)\n   - Tasa de respuestas con formato JSON válido (objetivo: 100%)\n\n3. CRITERIOS DE DEPLOY:\n   - Verde: prompt nuevo mejora o iguala en todas las métricas → deploy\n   - Amarillo: mejora en algunas pero baja en otras → revisar casos que empeoraron, iterar\n   - Rojo: baja en accuracy de cualquier categoría o en rechazo fuera de alcance → no deployar\n\n4. PROCESO:\n   a) Ejecutar ambos prompts en el dataset de evaluación\n   b) Comparar métricas en tabla\n   c) Revisar manualmente los casos donde difieren\n   d) Decisión de deploy basada en criterios",
          "criterios_de_exito": ["Dataset de evaluación balanceado con los 4 tipos de casos", "Métricas específicas para este sistema con objetivos cuantitativos", "Criterios de decisión claros (verde/amarillo/rojo) que previenen subjetividad en la decisión de deploy"]
        },
        "conexion": {
          "siguiente_concepto": "Gestión y versionado de prompts a escala",
          "por_que_importa_despues": "Ya sabes cómo evaluar prompts. Ahora necesitas organizar y gestionar decenas o cientos de prompts en un producto: cómo versionarlos, documentarlos y mantenerlos sin perder el control."
        }
      }
    },
    {
      "id": "m4-b7-l4", "titulo": "Gestión y versionado de prompts a escala", "bloque": 7,
      "tipo": "leccion", "duracion_min": 20, "xp": 55,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "A medida que un producto de IA crece, el número de prompts se multiplica: prompts de sistema, templates de usuario, prompts de validación, prompts de síntesis. Sin un sistema de gestión, los equipos enfrentan los mismos problemas que el código sin control de versiones: nadie sabe qué versión está en producción, los cambios no tienen contexto (por qué se hizo este cambio), y el debugging se vuelve imposible. Las herramientas van desde básicas (archivos de texto en git con naming convention clara) hasta especializadas (bases de datos de prompts con UI, como LangSmith o Promptflow de Microsoft). Independientemente de la herramienta, los principios son: cada prompt tiene un ID único y versionado semántico (v1.0.0 → v1.0.1 para fixes, v1.1.0 para mejoras, v2.0.0 para cambios de comportamiento), cada versión tiene metadatos (fecha, autor, razón del cambio, métricas de rendimiento asociadas), la versión en producción está explícitamente marcada, y hay un proceso de rollback si la versión nueva falla. La documentación del prompt debe incluir: propósito del prompt, comportamiento esperado, casos conocidos donde falla, y el dataset de evaluación asociado.",
          "analogia": "Un prompt registry es como el inventario de una farmacia: cada medicamento (prompt) tiene un número de lote (versión), fecha de fabricación (fecha de cambio), instrucciones de uso (documentación), y está almacenado en el lugar correcto. Sin ese sistema, dispensar el medicamento equivocado es solo cuestión de tiempo.",
          "ejemplo_malo": "Prompts guardados como: prompt_final.txt, prompt_final_v2.txt, prompt_nuevo_usar_este.txt, prompt_ESTE_ES_EL_BUENO.txt",
          "ejemplo_bueno": "prompts/\n  customer-support/\n    classification.v1.2.0.txt  (en producción)\n    classification.v1.2.1.txt  (en testing)\n    classification.v1.1.0.txt  (deprecated)\n  CHANGELOG.md (razón de cada cambio + métricas antes/después)\n  README.md (qué hace cada prompt, casos de uso, variables esperadas)",
          "tip_profesional": "El CHANGELOG de prompts es más importante que el de código. Documenta: qué comportamiento tenía antes, qué comportamiento tiene ahora, por qué se hizo el cambio, y las métricas que lo justifican. Cuando algo se rompa en producción, este documento será tu primera línea de debugging."
        },
        "verificacion": [
          {
            "pregunta": "¿Qué información mínima debe tener la documentación de cada prompt en un producto de IA?",
            "opciones": ["Solo el texto del prompt", "Propósito del prompt, comportamiento esperado, variables de entrada requeridas, casos conocidos donde falla, y el dataset de evaluación asociado", "Solo la versión y fecha de creación", "Solo el nombre del desarrollador que lo escribió"],
            "correcta": 1,
            "explicacion_profunda": "La documentación del prompt sirve a tres audiencias: el desarrollador que lo usa (qué hace, qué variables necesita), el desarrollador que lo mantiene (comportamiento esperado, casos conocidos de fallo), y el sistema de auditoría (dataset de evaluación para verificar rendimiento). Sin esta información, cada desarrollador tiene que 'redescubrir' el comportamiento del prompt, introduciendo inconsistencias y errores.",
            "concepto_reforzado": "Documentación completa de prompts como práctica de ingeniería"
          },
          {
            "pregunta": "¿Qué evento justifica un cambio de versión MAYOR (v1.x.x → v2.0.0) en un prompt?",
            "opciones": ["Cualquier cambio al texto del prompt", "Un cambio que altera fundamentalmente el comportamiento del prompt, el formato de output, o el contexto esperado — rompiendo compatibilidad con los sistemas que usan la versión anterior", "Solo cuando el prompt cambia de idioma", "Cuando el prompt alcanza los 500 tokens"],
            "correcta": 1,
            "explicacion_profunda": "El versionado semántico para prompts sigue la misma lógica que para código: MAYOR (cambio de comportamiento, rompe compatibilidad), MENOR (nueva funcionalidad, compatible hacia atrás), PATCH (fix de bug, mismo comportamiento). Si tu sistema de clasificación v1 devolvía {category: 'X'} y ahora v2 devuelve {primary_category: 'X', confidence: 0.87}, eso es un cambio mayor — todos los consumidores del prompt necesitan actualizar su código para manejar el nuevo formato.",
            "concepto_reforzado": "Versionado semántico aplicado a prompts"
          },
          {
            "pregunta": "Un equipo tiene 40 prompts en producción y quiere implementar un sistema de gestión. ¿Cuál es el primer paso recomendado?",
            "opciones": ["Comprar inmediatamente una herramienta especializada de prompt management", "Hacer un inventario de todos los prompts actuales, su propósito, la versión en producción y dónde están almacenados actualmente", "Reescribir todos los prompts desde cero con la nueva estructura", "Contratar un prompt manager dedicado"],
            "correcta": 1,
            "explicacion_profunda": "Antes de implementar cualquier sistema, necesitas saber qué tienes. El inventario revela: duplicados (dos prompts que hacen casi lo mismo), prompts huérfanos (nadie sabe para qué sirven), y prompts críticos sin documentación. Con ese mapa, puedes implementar el sistema de gestión de forma incremental, empezando por los prompts más críticos, sin paralizar el desarrollo.",
            "concepto_reforzado": "Implementación incremental de gestión de prompts"
          }
        ],
        "practica": {
          "tipo": "caso_real",
          "contexto": "Tu empresa tiene 25 prompts usados en producción, guardados como archivos .txt sin naming convention, sin changelog y sin documentación. El CTO pide implementar un sistema de gestión en una semana.",
          "instruccion": "Diseña el sistema de gestión mínimo viable para estos 25 prompts que puedas implementar esta semana.",
          "input_malo": "Moverlos todos a una carpeta llamada 'prompts' y ya.",
          "pista": "El sistema mínimo viable necesita: estructura de carpetas por dominio, naming convention con versión, template de documentación, y proceso de actualización. No necesitas herramientas especializadas — git + markdown es suficiente para empezar.",
          "solucion": "SISTEMA MÍNIMO VIABLE — Prompt Registry\n\nESTRUCTURA:\nprompts/\n  [dominio]/\n    [nombre-del-prompt].v[MAJOR].[MINOR].[PATCH].txt\n    [nombre-del-prompt].README.md\n  REGISTRY.md  (tabla master: id, nombre, versión-prod, dominio, dueño)\n  CHANGELOG.md (historial de todos los cambios)\n\nTEMPLATE README POR PROMPT:\n# [Nombre del Prompt]\n**Versión en producción:** v1.2.0\n**Dueño:** [nombre]\n**Propósito:** [qué hace en 1 oración]\n**Variables de entrada:** [lista de {variables} con descripción]\n**Formato de output esperado:** [descripción o ejemplo]\n**Casos conocidos de fallo:** [lista]\n**Dataset de evaluación:** [ruta al archivo]\n\nPROCESO DE ACTUALIZACIÓN (1 semana):\nDía 1-2: Inventario — listar todos los 25 prompts, su propósito, dónde se usan\nDía 3: Crear estructura de carpetas y REGISTRY.md con todos los prompts\nDía 4-5: Escribir README para los 5 prompts más críticos\nDía 6-7: Documentar el proceso de actualización y enseñarlo al equipo",
          "criterios_de_exito": ["Estructura de carpetas clara con naming convention versionado", "Template de documentación que cubra propósito, variables, output esperado y casos de fallo", "REGISTRY.md centralizado que da visibilidad de qué versión está en producción para cada prompt"]
        },
        "conexion": {
          "siguiente_concepto": "Optimización de costos: eficiencia de tokens en producción",
          "por_que_importa_despues": "Con la gestión resuelta, el siguiente desafío en escala es el costo: cada token de input y output tiene un costo real. En producción, la diferencia entre un prompt eficiente y uno ineficiente puede ser miles de dólares al mes."
        }
      }
    },
    {
      "id": "m4-b7-l5", "titulo": "Optimización de costos: eficiencia de tokens en producción", "bloque": 7,
      "tipo": "leccion", "duracion_min": 20, "xp": 55,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "El costo de usar LLMs en producción es directamente proporcional al número de tokens procesados (input) y generados (output). Con Claude Sonnet 4.6, el costo es aproximadamente $3/MTok input y $15/MTok output. Si tu sistema procesa 100,000 requests al día con prompts de 500 tokens de input y 200 tokens de output: costo diario = (100K × 500 × $3/1M) + (100K × 200 × $15/1M) = $150 + $300 = $450/día = $13,500/mes. Reducir el input a 300 tokens y el output a 100 tokens = $60 + $150 = $210/día = $6,300/mes — un ahorro del 53%. Las técnicas de optimización incluyen: compresión del system prompt (eliminar redundancias, usar lenguaje denso y preciso), caché de prompts (Anthropic prompt caching puede reducir el costo de tokens repetidos en 90%), control del output (pedir respuestas concisas con longitud máxima), selección del modelo correcto (usar Claude Haiku 4.5 para tareas simples vs Sonnet para tareas complejas), y procesamiento por lotes cuando el tiempo no es crítico.",
          "analogia": "Optimizar el costo de tokens es como optimizar el consumo de gasolina en una flota de vehículos: pequeñas mejoras por viaje se multiplican por miles de viajes al día. Un conductor que reduce 10% el consumo por viaje ahorra 10% del presupuesto anual de gasolina.",
          "ejemplo_malo": "System prompt de 2000 tokens que incluye: repeticiones del mismo punto en 3 formulaciones diferentes, ejemplos innecesarios para la tarea, instrucciones de formato que el modelo ya sigue por defecto, y advertencias genéricas sobre ser 'útil y preciso'.",
          "ejemplo_bueno": "System prompt de 400 tokens que incluye: instrucción de rol en 1 oración, 3 reglas críticas específicas del caso de uso, formato de output en 3 líneas, y un solo ejemplo de alta densidad informativa. Resultado esperado: mismo comportamiento, 80% menos tokens de input.",
          "tip_profesional": "Usa el prompt caching de Anthropic para system prompts largos: si tu system prompt tiene 1000+ tokens y no cambia entre requests, el caching puede reducir el costo de esos tokens hasta en un 90%. Esta sola optimización puede representar el 50-70% del ahorro total de costos en producción."
        },
        "verificacion": [
          {
            "pregunta": "En producción con 50,000 requests diarios y un system prompt de 800 tokens que no cambia, ¿cuál es la optimización de costo más impactante?",
            "opciones": ["Reducir el prompt a 400 tokens", "Usar prompt caching de Anthropic para el system prompt estático, reduciendo el costo de esos 800 tokens en ~90% en la mayoría de los requests", "Cambiar a un modelo más barato para todos los requests", "Procesar todos los requests en una sola llamada batch"],
            "correcta": 1,
            "explicacion_profunda": "El prompt caching de Anthropic es la optimización de mayor impacto cuando tienes un system prompt largo que se repite en cada request. Con 50,000 requests diarios × 800 tokens × $3/MTok = $120/día sin caching. Con caching (90% reducción en tokens cached): $12/día para el system prompt. Adicionalmente, si puedes reducir el system prompt a 400 tokens, el ahorro adicional es otro 50% sobre los tokens no cacheados. El caching es la primera optimización a implementar.",
            "concepto_reforzado": "Prompt caching como técnica de optimización de costo"
          },
          {
            "pregunta": "¿Cuándo es apropiado usar Claude Haiku 4.5 en vez de Claude Sonnet 4.6 para reducir costos?",
            "opciones": ["Siempre — Haiku es siempre suficientemente bueno", "Para tareas de clasificación simple, extracción de datos estructurados, y resúmenes breves donde la tarea tiene respuesta objetivamente verificable y no requiere razonamiento complejo", "Solo en entornos de desarrollo, nunca en producción", "Cuando el presupuesto se acaba"],
            "correcta": 1,
            "explicacion_profunda": "La selección del modelo correcto es la decisión de costo-calidad más importante. Haiku es ~20x más barato que Opus y ~5x más barato que Sonnet. Para tareas simples y bien definidas (clasificar un email en 5 categorías, extraer un número de un texto, verificar si un JSON es válido), Haiku produce resultados equivalentes a Sonnet a una fracción del costo. La regla: usa el modelo más barato que cumpla tu SLA de calidad para cada tipo de tarea.",
            "concepto_reforzado": "Selección de modelo como optimización de costo"
          },
          {
            "pregunta": "Un sistema genera respuestas de 400-600 tokens pero solo necesita los primeros 50-100 tokens para la tarea. ¿Cómo optimizas el costo de output?",
            "opciones": ["No hay forma de controlar la longitud del output", "Incluir instrucción explícita de longitud máxima ('máximo 100 palabras', 'responde en máximo 3 bullets') y ajustar el parámetro max_tokens en la API", "Truncar el output en el backend después de recibirlo", "Solo usando modelos más pequeños"],
            "correcta": 1,
            "explicacion_profunda": "El costo de output es 5x mayor que el costo de input en Claude (por token). Controlar la longitud del output tiene impacto directo y significativo. Las dos herramientas: (1) instrucción de prompt ('responde en máximo X palabras/bullets/oraciones') — el modelo intenta cumplirla; (2) parámetro max_tokens en la API — trunca el output si supera ese límite. Combinadas, estas dos técnicas pueden reducir el costo de output en 50-80% sin pérdida de calidad útil.",
            "concepto_reforzado": "Control de longitud de output para optimización de costo"
          }
        ],
        "practica": {
          "tipo": "reescribir",
          "contexto": "Tu sistema de clasificación de soporte tiene este system prompt de 1200 tokens que está costando $4,200/mes. El CTO te pide reducir el costo a menos de $2,000/mes sin degradar la calidad.",
          "instruccion": "Reescribe este system prompt optimizando su longitud al mínimo necesario para mantener el mismo comportamiento.",
          "input_malo": "Eres un asistente de soporte al cliente muy útil y amable. Tu objetivo principal es ayudar a los clientes con sus problemas y preguntas de la mejor manera posible. Debes ser siempre respetuoso, amable, profesional y empático con los clientes que contactan nuestro servicio de soporte. Es muy importante que escuches bien al cliente y entiendas su problema antes de dar una solución. También es importante que seas claro y preciso en tus respuestas. Recuerda que los clientes pueden estar frustrados cuando contactan soporte, así que debes tener paciencia. Clasifica cada ticket en una de estas categorías: Facturación, Técnico, Cancelación, Información General, o Escalación. Si el ticket es sobre facturas, cargos, pagos o suscripciones, clasifícalo como Facturación. Si el ticket menciona que algo no funciona, hay un error, o el producto tiene un problema técnico, clasifícalo como Técnico. Si el cliente quiere cancelar su cuenta o suscripción o no está satisfecho con el servicio, clasifícalo como Cancelación. Si el cliente tiene preguntas generales sobre cómo usar el producto o quiere información sobre características, clasifícalo como Información General. Si el ticket menciona que ya intentó soluciones antes sin éxito, o es un problema urgente complejo, clasifícalo como Escalación. Devuelve siempre tu respuesta en formato JSON con el campo 'categoria' y el campo 'confianza' que es un número del 1 al 10.",
          "pista": "Elimina toda la verborrea sobre 'ser amable' (el modelo ya lo sabe), simplifica las descripciones de categorías a sus señales clave, y mantén solo el formato JSON requerido.",
          "solucion": "Clasifica tickets de soporte en una de estas categorías. Devuelve JSON: {\"categoria\": \"X\", \"confianza\": N}.\n\nCATEGORÍAS:\n- Facturación: facturas, cargos, pagos, suscripciones\n- Técnico: errores, no funciona, problema con el producto\n- Cancelación: quiere cancelar, insatisfecho con el servicio\n- Información General: cómo usar el producto, preguntas sobre características\n- Escalación: intentos previos fallidos, urgente, problema complejo\n\nUsa la categoría que mejor describe el problema principal del ticket.",
          "criterios_de_exito": ["El prompt optimizado tiene 80+ tokens menos que el original manteniendo la misma función", "Todas las señales de clasificación para cada categoría están preservadas", "El formato de output JSON requerido está especificado claramente"]
        },
        "conexion": {
          "siguiente_concepto": "Prompts para agentes IA y tool use",
          "por_que_importa_despues": "Con la optimización de costos dominada, el siguiente nivel profesional son los agentes: sistemas donde Claude puede usar herramientas, tomar decisiones secuenciales y actuar de manera autónoma en tareas complejas."
        }
      }
    },
    {
      "id": "m4-b7-l6", "titulo": "Prompts para agentes IA y tool use", "bloque": 7,
      "tipo": "leccion", "duracion_min": 25, "xp": 65,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "Un agente de IA es un sistema donde el LLM puede usar herramientas (funciones o APIs) para completar tareas: buscar en internet, ejecutar código, consultar bases de datos, enviar emails, o manipular archivos. El prompt engineering para agentes es fundamentalmente diferente al prompting conversacional porque el agente toma decisiones secuenciales, y cada decisión incorrecta se propaga y amplifica. Los principios clave para prompts de agentes: (1) Define claramente el objetivo final y los criterios de éxito — el agente necesita saber cuándo parar, no solo qué hacer. (2) Lista explícitamente las herramientas disponibles con su propósito exacto — el agente debe saber qué puede y qué no puede hacer. (3) Establece restricciones de reversibilidad — acciones que no se pueden deshacer (enviar email, hacer un pago) deben requerir confirmación explícita. (4) Define el protocolo de incertidumbre — qué debe hacer el agente cuando no está seguro: pausar y preguntar, intentar con la aproximación más conservadora, o escalar. (5) Principio de mínimo privilegio — el agente solo debe tener acceso a las herramientas que necesita para la tarea específica, no a todo lo disponible.",
          "analogia": "Configurar un agente de IA es como dar instrucciones a un empleado nuevo con acceso a sistemas críticos: necesitas ser muy explícito sobre qué puede hacer, qué no puede hacer sin aprobación, y qué debe hacer cuando se encuentra con algo inesperado.",
          "ejemplo_malo": "Eres un agente de IA. Tienes acceso a: email, base de datos de clientes, sistema de pagos, y calendario. Ayuda con lo que se necesite.",
          "ejemplo_bueno": "Eres el agente de gestión de suscripciones de TechCorp. OBJETIVO: procesar las solicitudes de cambio de plan de los clientes hasta completarlas o escalar si hay un problema.\n\nHERRAMIENTAS DISPONIBLES:\n- lookup_customer(email): consulta datos del cliente (solo lectura)\n- check_plan_availability(plan_id): verifica si un plan está disponible\n- update_subscription(customer_id, new_plan): ACCIÓN IRREVERSIBLE — cambia el plan del cliente\n\nREGLAS:\n1. Antes de ejecutar update_subscription, confirma con el cliente los detalles del cambio.\n2. Si el cliente no tiene suscripción activa, escala a soporte humano.\n3. Si hay discrepancia entre lo que pide el cliente y su historial, pausa y pregunta.\n4. Máximo 3 herramientas por solicitud — si necesitas más, escala.",
          "tip_profesional": "Para agentes que ejecutan acciones irreversibles (pagos, emails, cambios de estado), implementa siempre un paso de 'confirmación de intención' antes de ejecutar: el agente debe resumir qué va a hacer y esperar confirmación explícita del usuario o de un sistema de aprobación automático."
        },
        "verificacion": [
          {
            "pregunta": "¿Por qué los prompts para agentes IA requieren más rigor que los prompts conversacionales?",
            "opciones": ["Porque los agentes usan más tokens", "Porque el agente toma decisiones secuenciales donde cada error se propaga y amplifica — un error en el step 2 puede hacer que los steps 3, 4 y 5 sean completamente inútiles o dañinos", "Porque los agentes son más difíciles de programar técnicamente", "No requieren más rigor, son similares"],
            "correcta": 1,
            "explicacion_profunda": "En una conversación, un error del modelo produce una respuesta incorrecta que el usuario puede corregir en el siguiente mensaje. En un agente, un error de decisión en el step 2 puede llevar a ejecutar una acción incorrecta (enviar un email equivocado, modificar el registro incorrecto), que luego los siguientes steps agravan. El efecto compuesto del error hace que el diseño cuidadoso del prompt del agente sea crítico.",
            "concepto_reforzado": "Impacto de errores en sistemas agénticos"
          },
          {
            "pregunta": "¿Qué es el 'principio de mínimo privilegio' aplicado a agentes IA y por qué es importante?",
            "opciones": ["El agente debe usar el modelo más barato posible", "El agente solo debe tener acceso a las herramientas estrictamente necesarias para la tarea específica que debe completar, no a todo lo disponible", "El agente debe hacer el mínimo número de llamadas a herramientas", "El agente no debe usar herramientas externas"],
            "correcta": 1,
            "explicacion_profunda": "Si tu agente de análisis de ventas necesita solo leer datos (herramienta de consulta SQL), no debe tener acceso a la herramienta de escritura en la base de datos. Si el agente tiene un bug o es manipulado con prompt injection, el daño posible está limitado por las herramientas a las que tiene acceso. Un agente con acceso total puede causar daños totales; un agente con acceso mínimo solo puede causar daños limitados.",
            "concepto_reforzado": "Principio de mínimo privilegio en agentes IA"
          },
          {
            "pregunta": "Un agente de IA para procesamiento de pedidos recibe una instrucción inusual: 'Cancela todos los pedidos del cliente ID 5678 de los últimos 30 días.' ¿Cuál es la respuesta correcta del agente?",
            "opciones": ["Ejecutar la cancelación inmediatamente para ser eficiente", "Primero hacer lookup del cliente y los pedidos afectados, luego presentar un resumen de los pedidos que se cancelarían (número, monto total, fechas) y solicitar confirmación explícita antes de ejecutar cualquier cancelación", "Rechazar la solicitud porque es demasiado compleja", "Cancelar el primer pedido y preguntar si continuar"],
            "correcta": 1,
            "explicacion_profunda": "La cancelación de pedidos es una acción irreversible (o difícilmente reversible). Antes de ejecutar, el agente debe: (1) Recuperar la información de los pedidos afectados, (2) Presentar un resumen claro ('Vas a cancelar 7 pedidos por un total de $3,240. ¿Confirmas?'), (3) Esperar confirmación explícita. Este protocolo previene cancelaciones accidentales por errores de input o interpretaciones incorrectas de la solicitud.",
            "concepto_reforzado": "Protocolo de confirmación para acciones irreversibles en agentes"
          }
        ],
        "practica": {
          "tipo": "reescribir",
          "contexto": "Estás construyendo un agente de IA para gestionar el calendario y las reuniones del equipo de ventas de una empresa. El agente puede: leer calendarios, crear eventos, enviar invitaciones por email, y cancelar reuniones.",
          "instruccion": "Diseña el system prompt completo para este agente siguiendo los principios de seguridad para agentes.",
          "input_malo": "Eres un asistente de calendario. Ayuda al equipo de ventas a gestionar sus reuniones. Tienes acceso a sus calendarios y puedes crear, modificar y cancelar reuniones.",
          "pista": "Define: objetivo específico, herramientas con descripción de si son reversibles o no, reglas para acciones irreversibles, protocolo de incertidumbre, y qué hacer si hay conflictos de calendario.",
          "solucion": "Eres el asistente de calendario del equipo de ventas de [Empresa]. Tu función: gestionar reuniones y coordinar agendas.\n\nHERRAMIENTAS DISPONIBLES:\n- read_calendar(user_id, date_range): Lee calendario de un usuario (solo lectura, seguro)\n- find_availability(participants, duration): Encuentra slots disponibles para todos (solo lectura, seguro)\n- create_event(details, participants): REQUIERE CONFIRMACIÓN — crea reunión y envía invitaciones\n- cancel_event(event_id): REQUIERE CONFIRMACIÓN — cancela reunión existente\n\nREGLAS:\n1. Para create_event y cancel_event: siempre muestra un resumen antes de ejecutar ('Voy a crear una reunión el martes 15 a las 3pm con Ana y Pedro por 1 hora sobre Q2 Review. ¿Confirmas?') y espera respuesta afirmativa.\n2. Si hay conflicto de calendario, muestra las opciones disponibles y pide al usuario que elija — nunca decides solo cuál priorizar.\n3. Si el usuario pide cancelar múltiples reuniones, lista todas y confirma el conjunto antes de cancelar cualquiera.\n4. Si recibes instrucciones para acceder a calendarios de personas fuera del equipo de ventas, declina y explica que solo tienes acceso al equipo de ventas.",
          "criterios_de_exito": ["Herramientas claramente marcadas como reversibles o irreversibles con su protocolo correspondiente", "Regla explícita de confirmación antes de acciones de escritura (create, cancel)", "Protocolo para situaciones de incertidumbre o conflicto definido (no decide solo)"]
        },
        "conexion": {
          "siguiente_concepto": "Prompts multimodales: texto + imágenes + documentos",
          "por_que_importa_despues": "Has dominado los agentes con herramientas. El siguiente nivel es la multimodalidad: Claude puede procesar imágenes, documentos y texto simultáneamente, abriendo casos de uso que el texto solo no puede resolver."
        }
      }
    },
    {
      "id": "m4-b7-l7", "titulo": "Prompts multimodales: texto, imágenes y documentos", "bloque": 7,
      "tipo": "leccion", "duracion_min": 22, "xp": 60,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "Claude tiene capacidad multimodal nativa: puede procesar imágenes (capturas de pantalla, fotos, diagramas, gráficos), documentos (PDFs, textos largos), y texto simultáneamente en un solo prompt. El prompt engineering multimodal requiere entender cómo Claude procesa cada modalidad y cómo referirse a ellos en las instrucciones. Para imágenes: Claude puede describir contenido visual, leer texto en imágenes (OCR implícito), analizar gráficos y tablas, comparar múltiples imágenes, e identificar problemas en capturas de pantalla de código o interfaces. Las instrucciones deben ser específicas sobre qué extraer: 'describe la imagen' produce resultados genéricos; 'extrae todos los números de la tabla de la imagen y devuélvelos como JSON' produce resultados precisos y accionables. Para documentos largos: Claude puede procesar hasta 200K tokens de contexto en versiones recientes, permitiendo analizar contratos, informes o libros completos. La clave es indicar explícitamente qué parte del documento es relevante para la tarea y qué tipo de análisis se necesita. En prompts mixtos (imagen + texto + instrucción), el orden importa: primero el contexto (quién eres, cuál es tu tarea), luego los materiales (imagen/documento), luego la instrucción específica.",
          "analogia": "Claude procesando una imagen es como pedirle a un analista que revise un gráfico: puedes pedirle 'cuéntame sobre este gráfico' (resultado vago) o 'extrae los valores de cada barra, calcula el crecimiento promedio y dime si hay algún outlier' (resultado preciso y accionable).",
          "ejemplo_malo": "¿Qué ves en esta imagen? [imagen adjunta]",
          "ejemplo_bueno": "La siguiente imagen es una captura de pantalla de nuestro dashboard de ventas. Extrae: (1) el valor de ventas del mes actual, (2) el porcentaje de cambio vs. mes anterior, (3) las 3 regiones con mayor rendimiento con sus valores exactos, y (4) si hay alguna anomalía visual evidente en las barras del gráfico inferior. Devuelve en formato JSON. [imagen adjunta]",
          "tip_profesional": "Para análisis de documentos largos, usa la técnica de 'mapa antes de analizar': primero pide a Claude que liste las secciones más relevantes para tu tarea, luego pide el análisis detallado de esas secciones específicas. Esto mejora la precisión y reduce el riesgo de que el modelo pierda información crítica en documentos extensos."
        },
        "verificacion": [
          {
            "pregunta": "¿Cuál es el principio más importante al escribir instrucciones para prompts con imágenes?",
            "opciones": ["Siempre adjuntar la imagen al final del mensaje", "Ser específico sobre qué extraer de la imagen: datos concretos, elementos específicos, formato de output — en vez de instrucciones genéricas como 'describe la imagen'", "Incluir una descripción textual de la imagen además de adjuntarla", "Usar solo imágenes de alta resolución"],
            "correcta": 1,
            "explicacion_profunda": "'Describe la imagen' instruye al modelo a hacer todo lo que puede con la imagen, produciendo un output genérico. 'Extrae los 5 valores del gráfico de barras, calcula el total, e identifica el valor más alto y más bajo' produce un output directamente accionable. La especificidad de la instrucción determina la utilidad del output, especialmente cuando la imagen contiene múltiples tipos de información (texto, gráficos, tablas).",
            "concepto_reforzado": "Especificidad de instrucciones en prompts multimodales"
          },
          {
            "pregunta": "¿Cuál es la ventaja principal de la ventana de contexto de 200K tokens de Claude para análisis de documentos?",
            "opciones": ["Permite procesar respuestas más largas", "Permite incluir documentos completos (contratos, informes, código fuente) en el contexto del prompt, permitiendo análisis de documentos largos sin necesidad de fragmentarlos", "Hace que Claude sea más rápido en responder", "Solo afecta a documentos en inglés"],
            "correcta": 1,
            "explicacion_profunda": "200K tokens equivalen a aproximadamente 150,000 palabras o 500 páginas de texto. Esto permite incluir contratos completos, informes anuales, bases de código, o incluso libros enteros en el contexto de un solo prompt. El beneficio clave es la coherencia: el modelo tiene acceso a todo el documento simultáneamente, en vez de recibir fragmentos que pueden perder el contexto de secciones anteriores.",
            "concepto_reforzado": "Capacidad de contexto largo para análisis de documentos"
          },
          {
            "pregunta": "Un desarrollador quiere que Claude analice una captura de pantalla de un mensaje de error para diagnosticar el problema. ¿Cuál es la mejor instrucción?",
            "opciones": ["'¿Qué error muestra la pantalla?'", "'Analiza esta imagen de un error de programación. Identifica: (1) el tipo de error exacto (mensaje completo), (2) el archivo y línea donde ocurre, (3) las 3 causas más probables de este error específico, y (4) los pasos para diagnosticar y resolver cada causa. [captura adjunta]'", "'Describe la captura de pantalla adjunta.'", "'¿Puedes ayudarme con este error? [captura adjunta]'"],
            "correcta": 1,
            "explicacion_profunda": "La instrucción específica estructura el output del análisis: extrae el error exacto (evita que el modelo parafraseé y pierda detalles), identifica la ubicación (información crítica para debugging), proporciona causas probables (no solo describe el error), y da pasos de resolución (output accionable). La diferencia entre la respuesta a la pregunta vaga y la específica puede ser la diferencia entre 'hay un NullPointerException' y un diagnóstico completo con soluciones.",
            "concepto_reforzado": "Estructuración de instrucciones para análisis de imágenes técnicas"
          }
        ],
        "practica": {
          "tipo": "reescribir",
          "contexto": "Eres el prompt engineer de una plataforma de auditoría financiera que usa Claude para analizar estados financieros en PDF. Los analistas necesitan extraer KPIs específicos de documentos de 50-200 páginas.",
          "instruccion": "Diseña el prompt para que Claude procese un estado financiero en PDF y extraiga los KPIs requeridos de manera confiable.",
          "input_malo": "Analiza el estado financiero adjunto y dime cómo está la empresa.",
          "pista": "Define exactamente qué KPIs extraer, el formato de output (JSON para que sea procesable por código), instrucción de citar la fuente (página/sección) de cada dato, y comportamiento cuando un KPI no está disponible.",
          "solucion": "Eres un analista financiero especializado en auditoría de estados financieros. El siguiente documento es el estado financiero anual de una empresa.\n\nExtrae los siguientes KPIs financieros del documento. Para cada uno, cita la fuente (ej: 'Estado de Resultados, página 12'). Si un KPI no está disponible en el documento, escribe null con una nota explicativa.\n\nKPIs a extraer:\n- ingresos_totales: ventas/ingresos del período\n- utilidad_neta: beneficio neto después de impuestos\n- ebitda: si está declarado explícitamente o calcúlalo si tienes los componentes\n- margen_neto_pct: (utilidad_neta / ingresos_totales) × 100\n- deuda_total: suma de deuda a corto y largo plazo\n- efectivo_y_equivalentes: caja y activos líquidos\n- ratio_deuda_ebitda: deuda_total / ebitda\n\nDevuelve JSON: {\"kpis\": {\"ingresos_totales\": {\"valor\": X, \"moneda\": \"COP\", \"fuente\": \"página Y\"}, ...}, \"periodo\": \"AAAA\", \"advertencias\": [\"lista de limitaciones o datos no encontrados\"]}",
          "criterios_de_exito": ["KPIs definidos explícitamente con su nombre técnico y descripción", "Instrucción de citar fuente para cada dato — permite verificación y detecta alucinaciones", "Comportamiento definido para datos no disponibles (null + nota) en vez de silencio o inventar"]
        },
        "conexion": {
          "siguiente_concepto": "Consultoría y proyectos de IA: entrega profesional",
          "por_que_importa_despues": "Has dominado las técnicas avanzadas de prompt engineering profesional. La última lección de este bloque te enseña cómo monetizar todo esto: cómo estructurar, vender y entregar proyectos de IA como consultor o líder de producto."
        }
      }
    },
    {
      "id": "m4-b7-l8", "titulo": "Consultoría de IA: cómo vender y entregar proyectos", "bloque": 7,
      "tipo": "leccion", "duracion_min": 25, "xp": 70,
      "repeticion_espaciada": {"repasar_dia_3":true,"repasar_dia_7":true,"repasar_dia_14":true,"repasar_dia_30":true},
      "contenido": {
        "teoria": {
          "explicacion": "El mercado de consultoría de IA generativa está en explosión: empresas de todos los sectores quieren implementar LLMs pero no tienen el expertise interno. Un prompt engineer con experiencia real puede cobrar entre $80-$250/hora como freelancer o $8,000-$40,000 por proyecto según la complejidad. La clave para vender proyectos de IA es hablar el lenguaje del negocio, no el de la tecnología: el cliente no compra 'un sistema con Claude API y pipeline de 3 steps' — compra 'reducción del 70% en el tiempo de procesamiento de contratos' o 'clasificación automática de 10,000 tickets diarios con 92% de accuracy'. El proceso de entrega de un proyecto de IA tiene 5 fases: (1) Discovery (entender el problema de negocio, los datos disponibles, el caso de uso específico), (2) Prototipo rápido (prompt engineering inicial, validación con datos reales del cliente en 1-2 semanas), (3) Evaluación y refinamiento (construir el test suite, iterar el prompt hasta alcanzar las métricas objetivo), (4) Integración (conectar el sistema con la infraestructura del cliente), (5) Handoff y documentación (transferir el conocimiento al equipo interno del cliente). Los errores más comunes en proyectos de IA: prometer resultados sin haber validado con datos reales del cliente, no definir métricas de éxito antes de empezar, y no incluir el costo de mantenimiento en la propuesta.",
          "analogia": "Vender consultoría de IA es como vender cualquier consultoría de alto valor: el cliente no compra tu proceso de trabajo, compra el resultado para su negocio. Un abogado no vende 'horas de lectura de contratos' — vende 'protección de tu empresa'. Un consultor de IA no vende 'prompts y llamadas a API' — vende 'automatización de procesos que actualmente te cuestan X por mes'.",
          "ejemplo_malo": "Propuesta: 'Implementaré un sistema de clasificación de emails usando Claude API con pipeline de 3 steps, RAG con vectorstore Pinecone, y un frontend en React. Precio: $15,000.'",
          "ejemplo_bueno": "Propuesta: 'Su equipo de soporte actualmente clasifica manualmente 800 emails diarios, tardando 4 minutos por email (53 horas/día de trabajo). El sistema que implementaré clasificará automáticamente el 90%+ con >95% de accuracy, reduciendo el tiempo manual a menos de 6 horas/día. ROI proyectado: $42,000/mes en tiempo liberado de su equipo. Inversión: $15,000 + $800/mes de operación. Garantía de rendimiento: si la accuracy no supera el 90%, ajusto el sistema sin costo adicional.'",
          "tip_profesional": "Antes de proponer cualquier precio, haz el análisis de ROI del cliente. Cuánto cuesta el proceso actual (tiempo × personas × costo/hora), cuánto ahorraría el sistema, y en cuánto tiempo el cliente recupera la inversión. Si el ROI es claro y positivo, el precio se justifica solo."
        },
        "verificacion": [
          {
            "pregunta": "¿Por qué es un error prometer resultados específicos en una propuesta de IA sin haber validado con datos reales del cliente?",
            "opciones": ["No es un error — es normal prometer para conseguir el contrato", "Porque los LLMs tienen rendimiento variable que depende fuertemente de la calidad y características específicas de los datos del cliente — lo que funciona en datos de demostración puede no funcionar en los datos reales", "Porque las propuestas no deben incluir números", "Solo es un error si el cliente es muy exigente"],
            "correcta": 1,
            "explicacion_profunda": "El rendimiento de un sistema de IA depende críticamente de la calidad de los datos del cliente: su distribución, su idioma, su formato, sus edge cases específicos. Un sistema que clasifica emails con 95% de accuracy en el dataset del demo puede clasificar con 70% en los datos reales del cliente si esos datos tienen características diferentes. La práctica correcta: incluir en la propuesta un 'sprint de validación' de 1-2 semanas con datos reales antes de comprometerse con métricas específicas.",
            "concepto_reforzado": "Gestión de expectativas y validación con datos reales en proyectos de IA"
          },
          {
            "pregunta": "¿Cuál es el elemento más importante que se omite frecuentemente en propuestas de proyectos de IA?",
            "opciones": ["El costo del hardware", "El costo de mantenimiento continuo: actualizaciones del prompt cuando el comportamiento del modelo cambia con nuevas versiones, gestión de nuevos edge cases que aparecen en producción, y monitoreo de métricas", "La lista detallada de tecnologías que se usarán", "El CV del consultor"],
            "correcta": 1,
            "explicacion_profunda": "Un sistema de IA en producción requiere mantenimiento continuo: los modelos se actualizan y el comportamiento puede cambiar, nuevos tipos de datos aparecen que el prompt no maneja bien, y las métricas deben monitorearse. Si la propuesta solo incluye el desarrollo inicial, el cliente quedará atrapado dependiendo del consultor para fixes futuros a un costo no presupuestado. Las buenas propuestas incluyen el costo de mantenimiento mensual (típicamente 10-20% del costo de desarrollo por año) y un plan de transferencia de conocimiento al equipo interno.",
            "concepto_reforzado": "Costo total de propiedad en proyectos de IA"
          },
          {
            "pregunta": "¿Cuál de estas frases en una propuesta de consultoría de IA tiene más probabilidad de conseguir el contrato?",
            "opciones": ["'Implementaremos Claude API con RAG y un pipeline de 5 steps de procesamiento paralelo.'", "'Nuestro sistema reducirá el tiempo de análisis de sus 200 contratos mensuales de 3 horas/contrato a 15 minutos/contrato, liberando 570 horas de trabajo legal por mes — equivalente a 3.5 abogados junior.'", "'Usaremos las últimas técnicas de Prompt Engineering Professional.'", "'Le daremos acceso a un sistema de IA de última generación.'"],
            "correcta": 1,
            "explicacion_profunda": "El lenguaje de negocio con cifras concretas y ROI directo es lo que convierte a los tomadores de decisión. '570 horas liberadas = 3.5 abogados junior' es traducción directa a dinero y recursos. Los términos técnicos (RAG, pipeline, Claude API) son irrelevantes para un CEO o CFO — ellos aprueban proyectos basándose en el impacto en el negocio, no en la sofisticación técnica.",
            "concepto_reforzado": "Lenguaje de negocio vs. lenguaje técnico en propuestas de IA"
          }
        ],
        "practica": {
          "tipo": "caso_real",
          "contexto": "Una empresa de logística con 50 empleados te contacta. Actualmente procesan manualmente 300 facturas de proveedores al día — cada factura tarda 8 minutos en ser procesada (extraer datos, verificar, ingresar al sistema). Tienen 5 personas haciendo esto a $15/hora durante 8 horas.",
          "instruccion": "Escribe el análisis de ROI y los primeros 2 párrafos de la propuesta de consultoría para implementar automatización con IA.",
          "input_malo": "Les ofrezco implementar un sistema de procesamiento de facturas con IA que les va a ahorrar mucho tiempo y dinero.",
          "pista": "Calcula: costo actual del proceso manual (personas × horas × costo/hora), propón el sistema de IA con métricas esperadas, y calcula el ROI con el tiempo de recuperación de la inversión.",
          "solucion": "ANÁLISIS DE ROI:\nCosto actual: 5 personas × 8h/día × $15/hora = $600/día = $13,200/mes = $158,400/año\nTiempo en procesamiento: 300 facturas × 8 min = 2,400 min/día = 40 horas/día (5 FTE completos)\n\nCon automatización (objetivo: automatizar 85% de facturas estándar, 15% requiere revisión humana):\n- 255 facturas procesadas automáticamente (sin intervención)\n- 45 facturas para revisión humana (casos complejos) × 8 min = 6 horas/día = 0.75 FTE\n- Personal necesario: 1 persona de revisión (vs. 5 actuales)\n- Ahorro: 4 FTE × $15/hora × 8h × 22 días = $10,560/mes\n\nPROPUESTA (primeros 2 párrafos):\n\n'Actualmente, el procesamiento manual de sus 300 facturas diarias ocupa el 100% del tiempo de 5 personas a un costo de $13,200/mes. El sistema de automatización que propongo procesará automáticamente el 85% de las facturas estándar — las 255 que siguen patrones regulares — y marcará las 45 restantes para revisión humana eficiente, reduciendo su equipo requerido de 5 personas a 1.\n\nEl ROI es claro: inversión de implementación $8,000 + $600/mes de operación vs. ahorro de $10,560/mes. Tiempo de recuperación de la inversión: menos de 1 mes. En el primer año, el sistema generará un ahorro neto de $118,720 sobre su costo actual, equivalente al 75% del costo anual del proceso manual.'",
          "criterios_de_exito": ["El análisis de ROI está basado en cifras concretas del proceso actual del cliente", "La propuesta habla en lenguaje de negocio (FTE, costo mensual, tiempo de recuperación), no en lenguaje técnico", "El ROI está calculado correctamente y el tiempo de recuperación de la inversión está explícito"]
        },
        "conexion": {
          "siguiente_concepto": "Bloque 8 — Fronteras y futuro del Prompt Engineering",
          "por_que_importa_despues": "Has completado el nivel profesional. El último bloque te lleva a las fronteras actuales de la disciplina: Extended Context, Computer Use, meta-prompting, y el futuro de la IA generativa en 2026-2027."
        }
      }
    }
  ]
};

data.bloques.push(b7);
fs.writeFileSync('src/content/m4-completo.json', JSON.stringify(data, null, 2), 'utf8');
console.log('B7 agregado. Bloques totales:', data.bloques.length);
console.log('Lecciones B7:', b7.lecciones.length);
