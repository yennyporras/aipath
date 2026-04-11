'use strict';
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m4-completo.json', 'utf8'));
const b9 = data.bloques.find(b => b.id === 'b9');

const l3 = {
  id: 'm4-b9-l3',
  titulo: 'Diseñar el sistema de prompts',
  bloque: 9,
  tipo: 'leccion',
  duracion_min: 25,
  xp: 60,
  repeticion_espaciada: { repasar_dia_3: true, repasar_dia_7: true, repasar_dia_14: true, repasar_dia_30: true },
  contenido: {
    teoria: {
      explicacion: 'Diseñar un sistema de prompts profesional no es escribir un único prompt largo — es construir una arquitectura donde cada componente tiene una función específica, los datos fluyen de forma predecible de un paso al siguiente, y el comportamiento del sistema puede explicarse, replicarse y depurarse. Esta diferencia entre prompt y sistema de prompts es la línea que separa el uso amateur del uso profesional de la IA generativa en entornos de negocio europeos.\n\n---\n\nUna arquitectura de prompts encadenados tiene tres capas estructurales:\n\nCapa 1 — Extracción. El primer prompt del pipeline transforma el input crudo (documento, email, formulario, texto libre del usuario) en una estructura de datos intermedia parseable: JSON, XML, o una lista numerada. Esta capa no interpreta ni evalúa — solo extrae y estructura. La clave es que el output de esta capa sea determinista: dados los mismos inputs, la extracción debe producir siempre la misma estructura. Ejemplo de prompt de extracción: recibe un contrato en texto plano y extrae las siguientes entidades en XML: partes firmantes, objeto del contrato, duración, cláusulas de penalización, ley aplicable y tribunal competente.\n\nCapa 2 — Análisis. El segundo prompt recibe la estructura extraída en la capa anterior y aplica razonamiento específico del dominio. Aquí es donde aparecen las técnicas de evaluación, clasificación, o síntesis. El output de esta capa puede ser más variable — es donde el modelo ejerce juicio — pero debe producir un formato consistente que la capa siguiente pueda consumir. Ejemplo: recibe el XML de la capa 1 y evalúa cada cláusula de penalización contra los estándares de contratos comerciales belgas según el Código de Derecho Económico. Devuelve un JSON con campo evaluacion (conforme/no_conforme/revisar), campo riesgo (alto/medio/bajo) y campo justificacion (máximo 2 oraciones).\n\nCapa 3 — Síntesis. El tercer prompt recibe el output del análisis y genera el entregable final para el usuario: informe ejecutivo, resumen de riesgos, email de respuesta, o cualquier formato que el cliente necesite. Esta capa aplica restricciones de tono, longitud, y formato específicas del destinatario final. Ejemplo: recibe el JSON de análisis y genera un informe de riesgos en formato estándar del despacho — encabezado con fecha y ref., tabla de cláusulas evaluadas con semáforo de riesgo, y sección de recomendaciones en máximo 300 palabras.\n\n---\n\nEjemplo completo: sistema de análisis de contratos para Vandenberghe & Partners, despacho legal en Bruselas. El despacho procesa 40-60 contratos comerciales mensuales en inglés, francés y holandés para clientes corporativos de la zona euro. El pipeline tiene tres prompts encadenados:\n\nPrompt 1 — Extracción estructurada. System prompt: eres un asistente de extracción de datos legales. Tu función es extraer entidades específicas de contratos comerciales. No interpretes ni evalúes. Solo extrae en XML con las etiquetas definidas. El XML resultante incluye: idioma_documento, partes (nombre, tipo, jurisdicción), objeto_contrato, duracion, moneda, valor_total, clausulas_penalizacion (texto_original, tipo, porcentaje_o_monto), ley_aplicable, tribunal_competente.\n\nPrompt 2 — Análisis de riesgo. Recibe el XML anterior. System prompt: eres un abogado especialista en derecho comercial belga con 15 años de experiencia. Evalúa cada cláusula de penalización contra los estándares del Código de Derecho Económico belga y las guías de la Federación de Empresas de Bélgica (FEB). Para cada cláusula evalúa si el porcentaje es conforme con los Arts. 1226-1231 del Código Civil belga, si el mecanismo de activación está definido con suficiente precisión, y si existe reciprocidad o es unilateral. Devuelve JSON con campo nivel_riesgo_global y array clausulas con evaluacion individual.\n\nPrompt 3 — Generación del informe. Recibe el JSON de análisis. System prompt: eres el asistente de redacción de Vandenberghe & Partners. Genera un informe de análisis de riesgos contractuales en el formato estándar del despacho. Encabezado: fecha, referencia interna, partes. Cuerpo: tabla de cláusulas con semáforo (rojo/naranja/verde), columna de justificación máximo 30 palabras por cláusula. Cierre: sección Recomendaciones del Despacho en prosa formal, máximo 250 palabras, sin jerga técnica legal excesiva. Idioma de salida: el mismo idioma del contrato original.',
      analogia: 'Diseñar un sistema de prompts encadenados es como construir una línea de producción industrial: cada estación hace una transformación específica, recibe la pieza en un estado definido y la entrega en otro estado definido. Un prompt único intenta hacer todo en una estación — lo que es equivalente a pedir a un solo operario que diseñe, fabrique y entregue la pieza completa. Funciona para volúmenes bajos y problemas simples; falla de forma predecible cuando la escala o la complejidad aumentan.',
      ejemplo_malo: 'Dame un análisis completo de este contrato identificando todas las cláusulas problemáticas y generando un informe profesional en el formato correcto.',
      ejemplo_bueno: 'Pipeline de tres prompts con responsabilidades separadas: Prompt 1 extrae todas las entidades del contrato en XML con etiquetas específicas. Prompt 2 evalúa cada cláusula de penalización contra el Código de Derecho Económico belga y devuelve JSON con nivel de riesgo y justificación. Prompt 3 genera el informe de riesgos en el formato estándar del despacho en el idioma del contrato original. Cada prompt tiene inputs y outputs definidos que pueden verificarse de forma independiente.',
      por_que_importa: 'Los sistemas de prompts en producción fallan de dos formas principales: outputs inconsistentes cuando el volumen escala, y bugs imposibles de localizar cuando el sistema falla. La arquitectura encadenada resuelve ambos problemas: los outputs son consistentes porque cada capa tiene un formato de output especificado, y los bugs son localizables porque cada capa puede testarse de forma independiente. Un sistema que puede depurarse puede mantenerse — y un sistema que puede mantenerse tiene valor empresarial real.',
      tip_profesional: 'Al diseñar el pipeline, especifica los formatos de output antes de escribir el contenido de cada prompt. Empieza por el output final que necesita el cliente y trabaja hacia atrás: ¿qué datos necesita el prompt 3? Esos datos son el output del prompt 2. ¿Qué datos necesita el prompt 2? Esos son el output del prompt 1. El diseño backwards-from-output produce pipelines con menos acoplamiento y más robustez que el diseño forward-from-input.'
    },
    verificacion: [
      {
        pregunta: '¿Cuál es la función específica de la Capa 1 (Extracción) en una arquitectura de prompts encadenados y qué característica debe tener su output?',
        opciones: [
          'Generar el entregable final para el cliente con el tono y formato correctos para el destinatario',
          'Transformar el input crudo en una estructura de datos intermedia parseable — su output debe ser determinista: dados los mismos inputs, siempre produce la misma estructura',
          'Aplicar razonamiento del dominio específico para evaluar, clasificar o sintetizar la información extraída',
          'Verificar que el input cumple los requisitos mínimos de calidad antes de procesarlo en las capas siguientes'
        ],
        correcta: 1,
        explicacion_profunda: 'La Capa 1 tiene una responsabilidad única y acotada: transformar texto no estructurado en estructura de datos parseable. No interpreta ni evalúa — eso es responsabilidad de la Capa 2. El requisito de determinismo es fundamental para la robustez del sistema: si la extracción produce estructuras diferentes para el mismo input, las capas siguientes reciben inputs variables y sus outputs serán impredecibles. El determinismo en la extracción es la base de la reproducibilidad del sistema completo.',
        concepto_reforzado: 'Capa de extracción en arquitecturas de prompts encadenados'
      },
      {
        pregunta: '¿Por qué el pipeline del despacho Vandenberghe & Partners usa tres prompts separados en lugar de un único prompt que haga todo el trabajo?',
        opciones: [
          'Porque los modelos de IA tienen un límite de tokens que impide procesar contratos completos en un único prompt',
          'Porque tres prompts separados permiten verificar la extracción, el análisis y la síntesis de forma independiente — si el informe tiene un error, se puede localizar si el bug está en la extracción, el análisis o la generación sin reejecutar todo el pipeline',
          'Porque el despacho tiene tres abogados distintos que deben revisar cada etapa del proceso antes de la siguiente',
          'Porque los clientes del despacho exigen ver los pasos intermedios del análisis antes de recibir el informe final'
        ],
        correcta: 1,
        explicacion_profunda: 'La separación en capas tiene un beneficio principal en producción: la localizabilidad de los fallos. Si el informe contiene una evaluación incorrecta de una cláusula, sin arquitectura encadenada no se puede saber si el error fue de extracción (la cláusula fue mal extraída del texto original) o de análisis (fue bien extraída pero mal evaluada). Con el pipeline de tres capas, el output intermedio del Prompt 1 puede inspeccionarse directamente para ver si la extracción fue correcta. Esta capacidad de depuración es lo que hace a los sistemas de prompts mantenibles en producción.',
        concepto_reforzado: 'Ventajas de la arquitectura encadenada para depuración en producción'
      },
      {
        pregunta: '¿Cuál es la diferencia funcional entre la Capa 2 (Análisis) y la Capa 3 (Síntesis) en el pipeline de análisis de contratos?',
        opciones: [
          'La Capa 2 trabaja en inglés y la Capa 3 traduce el output al idioma del contrato original',
          'La Capa 2 aplica razonamiento del dominio legal y devuelve estructuras de datos evaluadas; la Capa 3 transforma esas estructuras en el entregable final con formato, tono y longitud específicos para el destinatario humano',
          'La Capa 2 procesa cláusulas positivas y la Capa 3 procesa cláusulas de riesgo del contrato',
          'La Capa 2 evalúa contratos en holandés y francés; la Capa 3 evalúa los contratos en inglés'
        ],
        correcta: 1,
        explicacion_profunda: 'La diferencia es el tipo de output que produce cada capa: la Capa 2 produce datos estructurados (JSON con campos nivel_riesgo, evaluacion, justificacion) que una máquina puede consumir; la Capa 3 produce texto para consumo humano con todas las restricciones de comunicación profesional (tono formal del despacho, longitud máxima, semáforo visual de riesgo). Esta separación permite que la misma Capa 2 pueda alimentar múltiples formatos de entrega — el mismo análisis puede generar un informe ejecutivo para el cliente y un resumen técnico interno para el equipo legal, sin duplicar el razonamiento jurídico.',
        concepto_reforzado: 'Separación entre análisis estructurado y síntesis para consumo humano'
      },
      {
        pregunta: '¿Qué estrategia de diseño recomienda la lección para construir un pipeline de prompts encadenados y por qué produce mejores resultados?',
        opciones: [
          'Forward-from-input: empezar por definir qué datos tiene disponibles en el input y diseñar las capas en orden desde la extracción hasta el entregable final',
          'Backwards-from-output: empezar por el entregable final que necesita el cliente y trabajar hacia atrás para determinar qué datos necesita cada capa — produce pipelines con menos acoplamiento y más robustez',
          'Middle-out: empezar por diseñar la capa de análisis del dominio y construir las capas de extracción y síntesis alrededor de ella',
          'Trial-and-error iterativo: diseñar el prompt único primero, identificar qué falla, y partir el prompt en capas según los fallos encontrados'
        ],
        correcta: 1,
        explicacion_profunda: 'El diseño backwards-from-output parte de la pregunta más importante: ¿exactamente qué necesita ver el cliente en el entregable final? La respuesta define el output de la Capa 3. Luego: ¿qué datos necesita la Capa 3 para generar ese entregable? La respuesta define el output de la Capa 2. Este enfoque evita el error más común del diseño forward: construir capas de extracción muy detalladas que incluyen datos que ninguna capa posterior consume, o capas de análisis que evalúan dimensiones que el informe final no puede representar.',
        concepto_reforzado: 'Diseño backwards-from-output en arquitecturas de prompts'
      },
      {
        pregunta: 'En el pipeline del despacho en Bruselas, ¿qué problema de arquitectura se genera si el Prompt 2 recibe el contrato original en texto plano directamente, en lugar del XML del Prompt 1?',
        opciones: [
          'El Prompt 2 tardaría más en procesar el texto plano que el XML estructurado, aumentando la latencia del sistema',
          'El Prompt 2 tendría que hacer simultáneamente la extracción de entidades y el análisis legal, mezclando dos responsabilidades en un mismo prompt — lo que hace el sistema más difícil de depurar y los outputs menos predecibles',
          'El texto plano del contrato podría exceder el límite de contexto del modelo sin la compresión que proporciona el XML',
          'Los abogados del despacho no podrían verificar la extracción de forma independiente antes de que comience el análisis'
        ],
        correcta: 1,
        explicacion_profunda: 'Cuando un prompt mezcla extracción y análisis, cualquier fallo en el output final puede tener dos causas: la entidad fue mal extraída del texto original, o fue bien extraída pero mal analizada. Sin poder inspeccionar el output intermedio, no es posible distinguir entre los dos tipos de fallo. El modelo puede producir outputs que parecen análisis correctos pero que están basados en extracciones parciales o incorrectas del texto original — un tipo de error difícil de detectar en revisiones superficiales del output final.',
        concepto_reforzado: 'Separación de responsabilidades para localizabilidad de fallos'
      }
    ],
    practica: {
      tipo: 'caso_real',
      contexto: 'Vandenberghe & Partners necesita ampliar el pipeline para procesar contratos trilingües (inglés, francés, holandés). El equipo te pide que diseñes el Prompt 1 (extracción) para un contrato de distribución comercial de 8 páginas entre una empresa belga y una española. El contrato incluye: partes firmantes, territorio de distribución exclusiva, productos incluidos, duración, objetivos mínimos de ventas, penalizaciones por incumplimiento, y cláusula de ley aplicable (derecho belga).',
      instruccion: 'Diseña el Prompt 1 de extracción siguiendo la estructura de la arquitectura encadenada. Incluye: (1) el system prompt con el rol y la instrucción de no interpretar, solo extraer; (2) las etiquetas XML con los campos específicos del contrato de distribución; (3) una instrucción explícita sobre el campo idioma_documento y su uso downstream.',
      input_malo: 'Lee este contrato de distribución y extrae toda la información importante en formato estructurado para que podamos analizarla después.',
      pista: 'El Prompt 1 debe especificar explícitamente qué extraer (lista de entidades concretas con sus etiquetas XML) y qué NO hacer (no evaluar, no interpretar). El campo idioma_documento debe capturarse primero para que el Prompt 3 lo use al generar el informe en el idioma correcto.',
      solucion: 'System prompt: Eres un asistente de extracción de datos legales. Tu única función es extraer entidades específicas de contratos comerciales y devolverlas en formato XML. No evalúes, no interpretes, no hagas recomendaciones. Si un campo no está presente en el documento, usa la etiqueta con valor "no_especificado". Extrae los campos siguientes: <idioma_documento>, <partes> con sub-etiquetas <nombre>, <tipo> (vendedor/distribuidor), <pais_registro>, <territorio_exclusivo> con sub-etiqueta <paises>, <productos_incluidos> con sub-etiquetas <categoria> y <marcas>, <duracion> con <fecha_inicio>, <fecha_fin> y <renovacion_automatica> (si/no), <objetivos_ventas> con <monto_anual>, <moneda> y <periodo>, <penalizaciones> con <tipo>, <monto_o_porcentaje> y <condicion_activacion>, <ley_aplicable>, <tribunal_competente>.',
      criterios_de_exito: [
        'El system prompt define claramente el rol de extracción y excluye explícitamente la interpretación y evaluación',
        'Las etiquetas XML cubren todos los campos relevantes del contrato de distribución con granularidad suficiente para que el Prompt 2 pueda evaluarlos sin volver al texto original',
        'El campo idioma_documento está presente y su instrucción indica que será usado por el Prompt 3 para generar el informe en el idioma del contrato original'
      ]
    },
    conexion: {
      siguiente_concepto: 'Iterar y medir resultados del sistema',
      por_que_importa_despues: 'El pipeline diseñado en esta lección es la versión 1.0 del sistema. La siguiente lección te enseña cómo saber si esa v1.0 es suficientemente buena para producción: qué métricas usar, cómo construir un benchmark con casos de prueba reales, y cómo cuantificar la mejora entre versiones para argumentar el valor del sistema ante el cliente.'
    }
  }
};

const l4 = {
  id: 'm4-b9-l4',
  titulo: 'Iterar y medir resultados',
  bloque: 9,
  tipo: 'leccion',
  duracion_min: 25,
  xp: 60,
  repeticion_espaciada: { repasar_dia_3: true, repasar_dia_7: true, repasar_dia_14: true, repasar_dia_30: true },
  contenido: {
    teoria: {
      explicacion: 'La iteración sin métricas es una ilusión de progreso. Es posible modificar un prompt veinte veces y no saber si la versión 20 es mejor que la versión 1 — o incluso si es mejor que no tener ningún prompt. El prompt engineering profesional requiere un ciclo de mejora basado en datos: definir qué significa bueno antes de iterar, medir el estado actual con precisión, hacer una modificación específica por iteración, y volver a medir. Sin este ciclo, no hay ingeniería — hay intuición.\n\n---\n\nLas métricas de evaluación de prompts en entornos de negocio europeos se organizan en cuatro categorías:\n\nMétricas de corrección. Miden si el output del prompt es factualmente correcto respecto a una fuente de verdad. Para sistemas de extracción: precision (porcentaje de entidades extraídas que son correctas) y recall (porcentaje de entidades presentes en el documento que fueron extraídas). Para sistemas de clasificación: accuracy (porcentaje de clasificaciones correctas sobre el total). Para sistemas de generación de texto: evaluación por panel humano experto o por modelo evaluador con criterios predefinidos. Estas métricas requieren un ground truth — un conjunto de casos donde la respuesta correcta está predefinida por un experto de dominio.\n\nMétricas de consistencia. Miden si el prompt produce el mismo output para el mismo input. Importante porque los modelos tienen temperatura — el mismo input puede producir outputs diferentes entre ejecuciones. Métrica práctica: ejecutar el mismo caso 5 veces y calcular el porcentaje de acuerdo entre runs. Un sistema que produce la misma categoría en 5 de 5 runs tiene consistency 100%; uno que produce 3 categorías distintas para el mismo documento tiene consistency crítica para uso en producción.\n\nMétricas de eficiencia operacional. Miden el impacto del sistema en los procesos de negocio del cliente. Incluyen: tiempo de procesamiento por documento, reducción de tiempo humano en la tarea, tasa de escalado a revisión humana (qué porcentaje de outputs el sistema marca como inciertos y envía a revisión manual), y coste por procesamiento en términos de tokens y tiempo de API. Estas son las métricas que el cliente entiende y valora — son el puente entre la calidad técnica del prompt y el ROI del proyecto.\n\nMétricas de robustez. Miden el comportamiento del sistema ante inputs fuera de los casos típicos: documentos con formato inusual, idiomas mezclados, entidades ambiguas, inputs adversariales. Un sistema de producción que funciona bien solo con los 30 casos de prueba perfectos del benchmark y falla con el 20% de los documentos reales no tiene valor en producción.\n\n---\n\nEjemplo completo: Van der Berg & Associés, firma contable con 45 profesionales en Ámsterdam, Rotterdam y Delft. El equipo de auditoría procesa 120 informes financieros mensuales. La tarea: sistema de extracción de indicadores de riesgo financiero para el proceso de revisión preliminar de auditoría. Benchmark antes/después:\n\nSistema manual (baseline): cada auditor junior dedica en promedio 47 minutos por informe para identificar manualmente los indicadores de riesgo estándar según los criterios de la firma. La variabilidad entre auditores es alta — el mismo informe puede producir listas de indicadores que difieren en 25-35% entre un auditor y otro.\n\nSistema v1.0 (prompt básico): accuracy 71%, consistency entre runs 78%, tiempo de procesamiento 3.2 minutos por informe. El sistema fallaba en informes con notas al pie extensas y en documentos con tablas de datos multi-columna.\n\nIteración 1 — instrucciones de layout: se añadió instrucción explícita de buscar indicadores en notas al pie y tablas separadamente del cuerpo del informe. Resultado: accuracy 84%, consistency 89%, tiempo 3.4 minutos.\n\nIteración 2 — few-shot con edge cases: se añadieron 4 ejemplos específicamente de informes con indicadores en tablas multi-columna. Resultado: accuracy 91%, consistency 94%, tiempo 3.8 minutos.\n\nIteración 3 — cadena de verificación: se añadió instrucción de auto-verificación pidiendo al modelo confirmar que revisó las notas al pie específicamente. Resultado: accuracy 93%, consistency 96%, tiempo 4.1 minutos.\n\nResultado final del cliente: reducción de 47 a 4.1 minutos promedio por informe — reducción del 91% en tiempo de revisión preliminar. La variabilidad entre auditores desaparece porque el sistema produce outputs consistentes. El equipo puede procesar 120 informes con 2 horas de trabajo humano total en lugar de 94 horas. El ROI del sistema se pagó en la primera semana de uso.',
      analogia: 'Iterar prompts sin métricas es como ajustar la receta de un restaurante michelin probando solo con el propio cocinero. Puede que mejore algo — o puede que el cocinero simplemente se haya acostumbrado al sabor. Las métricas son los clientes externos: te dicen si realmente mejoró o solo te acostumbraste a un resultado mediocre. El benchmark es el panel de cata con criterios predefinidos — sin él, no hay mejora objetiva.',
      ejemplo_malo: 'Después de modificar el prompt 5 veces, el sistema se ve mejor. Los outputs parecen más completos y profesionales que antes.',
      ejemplo_bueno: 'Baseline: accuracy 71%, consistency 78%, 47 min/informe humano. Tras 3 iteraciones con modificaciones específicas y medición en cada iteración: accuracy 93%, consistency 96%, 4.1 min/informe sistema. Reducción 91% en tiempo de revisión preliminar. Cada iteración modificó un solo aspecto del prompt y midió el impacto antes de la siguiente modificación.',
      por_que_importa: 'En el mercado europeo, los consultores de IA que pueden presentar benchmarks con números reales frente a los que solo describen mejoras cualitativas tienen una ventaja de credibilidad decisiva. Un cliente corporativo holandés o alemán que aprueba un presupuesto para un sistema de IA necesita un ROI cuantificado — no una descripción de que el sistema funciona bien. Las métricas convierten el trabajo de prompt engineering en un argumento financiero defendible ante dirección y compliance.',
      tip_profesional: 'Construye el benchmark antes de escribir el primer prompt. El error más común es construir el sistema primero y definir el benchmark después — lo que inevitablemente lleva a un benchmark sesgado hacia lo que el sistema ya hace bien. Un benchmark honesto incluye casos fáciles, casos moderados, y casos difíciles (edge cases conocidos del dominio) en proporciones representativas del volumen real de documentos que el sistema procesará en producción.'
    },
    verificacion: [
      {
        pregunta: '¿Por qué la lección afirma que la iteración sin métricas es una ilusión de progreso en prompt engineering profesional?',
        opciones: [
          'Porque los clientes europeos no aprueban proyectos de IA sin que el consultor presente un framework de evaluación formal con terminología de auditoría',
          'Porque sin métricas no es posible saber si la versión 20 de un prompt es mejor que la versión 1 — la percepción de mejora del desarrollador puede ser sesgo de adaptación, no mejora real medible',
          'Porque los modelos de IA cambian sus capacidades con cada actualización y las métricas permiten detectar regresiones automáticamente',
          'Porque las métricas son el único lenguaje que los modelos de IA entienden para mejorar su comportamiento en respuesta a feedback'
        ],
        correcta: 1,
        explicacion_profunda: 'El sesgo de adaptación es real y documentado: después de trabajar con un sistema durante horas, el desarrollador comienza a percibir sus outputs como correctos aunque no lo sean — o a evaluar subjetivamente que la v20 es mejor que la v1 porque invirtió tiempo en ella. Las métricas son la única protección contra este sesgo: si accuracy bajó de 84% a 79% en la iteración 3, el número dice la verdad independientemente de lo mucho que le guste al desarrollador el nuevo formato del output.',
        concepto_reforzado: 'Necesidad de métricas objetivas en iteración de prompts'
      },
      {
        pregunta: '¿Cuál es la diferencia entre precision y recall en métricas de corrección para sistemas de extracción, y por qué ambas son necesarias?',
        opciones: [
          'Precision mide la velocidad de extracción y recall mide la calidad del formato XML del output',
          'Precision mide qué porcentaje de entidades extraídas son correctas; recall mide qué porcentaje de entidades presentes en el documento fueron extraídas — un sistema puede tener precision alta extrayendo pocas entidades muy seguras, pero recall bajo por omitir la mayoría de entidades presentes',
          'Precision es la métrica para sistemas de clasificación y recall es la métrica para sistemas de extracción de texto libre',
          'Precision mide el rendimiento en el dataset de training y recall mide el rendimiento en el dataset de producción real'
        ],
        correcta: 1,
        explicacion_profunda: 'La tensión entre precision y recall es fundamental en sistemas de extracción de información. Un sistema que solo extrae entidades cuando está muy seguro puede tener precision 95% (casi todo lo que extrae es correcto) pero recall 40% (omite el 60% de las entidades presentes en el documento). Dependiendo del caso de uso, esta puede ser una postura correcta (en contextos médicos donde un falso positivo es peligroso) o incorrecta (en contextos legales donde omitir una cláusula de penalización es un fallo grave). El diseñador debe decidir cuál de las dos priorizar según el riesgo del caso de uso.',
        concepto_reforzado: 'Trade-off entre precision y recall en sistemas de extracción'
      },
      {
        pregunta: '¿Por qué en el ejemplo de Van der Berg & Associés cada iteración modificó un solo aspecto del prompt antes de medir?',
        opciones: [
          'Porque los contratos de consultoría con clientes corporativos holandeses requieren que cada cambio esté documentado de forma individual con su impacto específico para cumplir con los estándares de auditoría',
          'Porque modificar múltiples aspectos simultáneamente impide saber cuál de las modificaciones causó la mejora o el deterioro observado en las métricas — el aislamiento de variables es el principio de cualquier experimento científico',
          'Porque los modelos de IA tienen un límite en la cantidad de instrucciones nuevas que pueden procesar eficazmente en una sola actualización del prompt',
          'Porque la firma contable tenía un proceso de revisión de cambios que exigía aprobar cada modificación individualmente antes de implementar la siguiente'
        ],
        correcta: 1,
        explicacion_profunda: 'La regla de una variable por iteración viene de la metodología científica experimental: si cambias dos cosas al mismo tiempo y el resultado mejora, no sabes si mejoró por el cambio A, por el cambio B, o por la interacción de ambos. Si en la iteración siguiente la métrica baja, tampoco sabes cuál deshacer. El aislamiento de variables convierte la iteración en un proceso de aprendizaje acumulativo: cada iteración produce conocimiento específico sobre qué tipo de modificación tiene qué tipo de impacto en este sistema concreto.',
        concepto_reforzado: 'Principio de una variable por iteración en prompt engineering'
      },
      {
        pregunta: '¿Por qué el benchmark debe construirse antes de escribir el primer prompt del sistema?',
        opciones: [
          'Un conjunto de 10-15 casos aleatorios del dataset, construido después de la primera versión del prompt para tener una referencia de comparación inicial',
          'Un conjunto representativo de casos fáciles, moderados y edge cases difíciles en proporciones del volumen real de producción, construido antes de escribir cualquier prompt para evitar el sesgo de crear un benchmark orientado a lo que el sistema ya sabe hacer bien',
          'Los casos de prueba perfectos que el cliente proporciona durante la fase de requisitos, usados como referencia fija durante todas las iteraciones del proyecto',
          'Un benchmark generado automáticamente por el modelo de IA con casos sintéticos representativos del dominio, para garantizar cobertura estadística suficiente'
        ],
        correcta: 1,
        explicacion_profunda: 'El sesgo de benchmarking post-hoc es uno de los problemas más comunes en proyectos de prompt engineering: si el benchmark se construye después de ver el sistema funcionar, el diseñador inevitablemente selecciona casos que el sistema ya maneja bien. Los edge cases quedan subrepresentados. El benchmark resultante es optimista y no predice el rendimiento real en producción. Construir el benchmark antes elimina este sesgo y además obliga al diseñador a pensar en los casos difíciles antes de empezar — lo que a menudo revela problemas de diseño que hubieran aparecido mucho más tarde.',
        concepto_reforzado: 'Construcción del benchmark antes del desarrollo para evitar sesgo'
      },
      {
        pregunta: '¿Por qué la reducción del 91% en tiempo de revisión de Van der Berg & Associés es el argumento más importante para el cliente, más que la accuracy del 93%?',
        opciones: [
          'Porque los clientes corporativos holandeses tienen menor formación técnica en IA y no comprenden qué significa accuracy del 93%',
          'Porque la reducción de tiempo es una métrica de eficiencia operacional que el cliente entiende directamente en términos de coste y ROI — habla en el idioma del negocio, no en el idioma técnico del prompt engineering',
          'Porque la accuracy del 93% no es suficientemente alta para ser presentable ante auditores externos y es mejor no mencionarla',
          'Porque las métricas de eficiencia operacional son las únicas reguladas por las normas de contabilidad europeas NIIF y las que la firma puede reportar oficialmente'
        ],
        correcta: 1,
        explicacion_profunda: 'La accuracy del 93% es un número técnico que requiere contexto para ser interpretado: ¿93% de qué? ¿Comparado con qué baseline? ¿Es suficiente para el caso de uso? La reducción de 47 a 4.1 minutos por informe necesita cero contexto técnico para ser comprendida: el equipo ahorra 42.9 minutos × 120 informes = 5.148 minutos (85.8 horas) de trabajo mensualmente. Ese número tiene precio de mercado y puede compararse directamente con el coste del sistema. Las métricas de eficiencia operacional traducen la calidad técnica a valor de negocio comprensible sin explicación adicional.',
        concepto_reforzado: 'Traducción de métricas técnicas a valor de negocio para clientes'
      }
    ],
    practica: {
      tipo: 'caso_real',
      contexto: 'Trabajas como consultor de IA para Van der Berg & Associés. El socio director te pide un plan de evaluación para el sistema de extracción de indicadores de riesgo financiero antes de aprobarlo para uso en producción. Tienes acceso a 80 informes financieros históricos procesados por los auditores de la firma. La firma procesa informes en holandés (70%), inglés (25%) y alemán (5%).',
      instruccion: 'Diseña el benchmark de evaluación para este sistema. Define: (1) la composición del conjunto de evaluación (cuántos casos, qué tipos); (2) las tres métricas principales que incluirías en el informe al socio director y por qué; (3) el criterio de éxito mínimo que el sistema debe alcanzar para ser aprobado para producción.',
      input_malo: 'Probaré el sistema con 10 informes al azar y si los resultados se ven bien lo presentaré al socio como listo para producción.',
      pista: 'El conjunto de evaluación debe ser representativo del volumen real (distribución de idiomas, tipos de informes) e incluir casos difíciles. Las métricas al socio deben incluir al menos una de eficiencia operacional que hable en términos de tiempo o coste. El criterio de éxito debe ser específico y acordado antes de comenzar las pruebas.',
      solucion: 'Benchmark de 50 informes: 35 en holandés, 12 en inglés, 3 en alemán (proporcional al volumen real). Composición: 20 casos estándar claros, 20 casos moderados con notas al pie extensas o tablas complejas, 10 edge cases (idiomas mezclados, formatos inusuales, indicadores en secciones inesperadas). Métricas al socio director: (1) Accuracy de extracción ≥ 90% — ground truth validado por auditor senior para cada uno de los 50 casos; (2) Consistency ≥ 95% en 5 runs del mismo documento — muestra de 10 informes; (3) Tiempo de procesamiento ≤ 5 minutos por informe vs. baseline de 47 minutos. Criterio de aprobación para producción: los tres criterios deben cumplirse simultáneamente — si alguno falla, la versión no está lista para producción independientemente del valor de los otros dos.',
      criterios_de_exito: [
        'El conjunto de evaluación incluye la distribución de idiomas proporcional al volumen real y la categorización explícita entre casos estándar, moderados y edge cases',
        'Las métricas incluyen al menos una de eficiencia operacional que compare con el baseline manual de 47 minutos por informe',
        'El criterio de aprobación para producción es específico, numérico y requiere que los tres criterios se cumplan simultáneamente'
      ]
    },
    conexion: {
      siguiente_concepto: 'Documentar el sistema como profesional',
      por_que_importa_despues: 'Tienes un sistema que funciona y los números que lo prueban. La siguiente lección cierra el proyecto de portafolio con la pieza que más diferencia a los profesionales europeos: la documentación que permite a cualquier otro profesional usar, mantener y mejorar el sistema sin depender de ti para explicarle cómo funciona.'
    }
  }
};

const l5 = {
  id: 'm4-b9-l5',
  titulo: 'Documentar como profesional',
  bloque: 9,
  tipo: 'leccion',
  duracion_min: 22,
  xp: 60,
  repeticion_espaciada: { repasar_dia_3: true, repasar_dia_7: true, repasar_dia_14: true, repasar_dia_30: true },
  contenido: {
    teoria: {
      explicacion: 'La documentación de un sistema de prompts no es un añadido estético al proyecto — es la condición que determina si el proyecto tiene valor más allá de la presencia de quien lo construyó. Un sistema sin documentación es un sistema que solo puede usar y mantener su creador original. En el mercado europeo de consultoría de IA, donde los proyectos cambian de manos, los equipos rotan, y los clientes corporativos tienen procesos de compliance que exigen trazabilidad, un sistema sin documentación adecuada no pasa la fase de entrega.\n\n---\n\nEl README de prompts profesional tiene seis secciones obligatorias:\n\nSección 1 — Descripción del sistema. Una o dos oraciones que describen qué hace el sistema, para qué tipo de input fue diseñado, y qué tipo de output produce. Sin jerga técnica. El lector objetivo es un profesional de negocio del sector, no un desarrollador de IA. Ejemplo: Este sistema analiza contratos de distribución comercial en inglés, francés y holandés, extrae las cláusulas de riesgo y genera un informe ejecutivo en el idioma del contrato original siguiendo el formato estándar de Vandenberghe & Partners.\n\nSección 2 — Requisitos y casos de uso. Describe el tipo exacto de input para el que el sistema fue diseñado y evaluado. Incluye restricciones de formato, idioma, longitud, y tipo de documento. Luego lista los casos de uso validados (con qué tipos de documentos se probó y funcionó) y los casos de uso no validados (para qué tipos de documentos no se ha probado o se sabe que el rendimiento es inferior). Esta sección evita que el sistema se use fuera del scope para el que fue evaluado.\n\nSección 3 — Arquitectura del sistema. Diagrama o descripción paso a paso del pipeline: qué hace cada prompt, qué recibe como input, qué produce como output, y cómo se encadenan. Si hay prompts paralelos, se indica. Si hay lógica condicional, se documenta aquí.\n\nSección 4 — Métricas de rendimiento. Los resultados del benchmark: accuracy, consistency, tiempo de procesamiento, y métricas de eficiencia operacional. Se especifica en qué conjunto de evaluación se obtuvieron, de qué fecha son los resultados, y con qué versión del modelo se midieron. Esta sección es la garantía de calidad del sistema — permite al equipo detectar si futuras actualizaciones del modelo degradan el rendimiento.\n\nSección 5 — Limitaciones conocidas. Una lista honesta de lo que el sistema no hace bien. Tipos de documentos donde el rendimiento es inferior al threshold mínimo, condiciones que producen outputs incorrectos o inconsistentes, y escenarios donde el sistema debe escalar a revisión humana. Esta sección es la más difícil de escribir y la más importante — demuestra rigor profesional y protege al cliente de usar el sistema en contextos inadecuados.\n\nSección 6 — Versioning y changelog. Número de versión en formato semántico (MAYOR.MENOR.PARCHE), fecha de cada versión, y descripción del cambio realizado. El primer deploy es v1.0.0. Una mejora que aumenta accuracy es v1.1.0. Un rediseño completo de la arquitectura del pipeline es v2.0.0.\n\n---\n\nEjemplo completo: Heikkinen & Co, startup finlandesa de fintech en Helsinki con 18 empleados. El equipo de producto encarga un sistema de generación de resúmenes ejecutivos de informes de análisis de inversión para clientes de alto patrimonio en inglés y finés.\n\nTítulo: Sistema de Resúmenes Ejecutivos — Informes de Inversión v1.2.0. Última actualización: Marzo 2026. Descripción: Sistema de tres prompts encadenados que transforma informes de análisis de inversión (PDF o texto plano, inglés o finés) en resúmenes ejecutivos de 250-300 palabras siguiendo las guías de comunicación de Heikkinen & Co para clientes de alto patrimonio.\n\nCasos de uso validados: Informes de renta variable europeos de 4-25 páginas en inglés; informes de renta variable nórdica en finés; informes mixtos con secciones en inglés y finés. Casos de uso no validados: Informes de derivados financieros complejos; informes de más de 40 páginas (rendimiento degradado — se recomienda summarization manual previo); informes con tablas de datos cuantitativos extensos sin análisis textual acompañante.\n\nMétricas de rendimiento (evaluación Febrero 2026, 45 informes, modelo claude-sonnet-4-6): Fidelidad del resumen al informe original 94% (evaluación por panel de 3 analistas senior); Adherencia al tono Heikkinen & Co 91% (rúbrica de 8 criterios); Tiempo de procesamiento promedio 2.3 minutos por informe; Reducción de tiempo: de 35 minutos a 2.3 minutos por informe (reducción 93%).\n\nLimitaciones conocidas: El sistema no procesa informes con estructura de lista sin prosa narrativa. El Prompt 2 puede producir evaluación de riesgo conservadora en informes de mercados emergentes fuera de Europa — requiere revisión humana. El sistema no valida la exactitud de los datos financieros citados en el resumen — un analista debe verificar cifras antes del envío al cliente.\n\nVersiones: v1.0.0 (Enero 2026) — Deploy inicial, solo inglés. v1.1.0 (Febrero 2026) — Añadido soporte finés, mejora few-shot con 4 nuevos ejemplos. v1.2.0 (Marzo 2026) — Añadida sección de limitaciones al output del sistema, mejora de consistency de 87% a 94%.',
      analogia: 'Documentar un sistema de prompts es como redactar el manual de mantenimiento de un ascensor: no lo escribe quien lo usa cada día ni quien lo diseñó para demostrar que sabe cómo funciona. Lo escribe para que cualquier técnico que llegue en tres años pueda entender qué hace, cómo ajustarlo cuando cambia el edificio, y qué condiciones indican que necesita revisión. Sin ese manual, el ascensor solo puede mantenerlo el técnico original. Con ese manual, el edificio puede contratar a cualquier técnico competente.',
      ejemplo_malo: 'El sistema analiza contratos y genera informes. Funciona bien con la mayoría de documentos. Usar con cuidado en casos complicados.',
      ejemplo_bueno: 'README v1.2.0 con: descripción del sistema en 2 oraciones sin jerga, tabla de casos de uso validados y no validados con restricciones específicas (idiomas, longitud, tipo de documento), diagrama del pipeline de 3 prompts con inputs y outputs definidos, métricas del benchmark de Febrero 2026 (accuracy 94%, consistency 91%, tiempo 2.3 min), lista de 3 limitaciones conocidas con condiciones específicas de activación, changelog semántico desde v1.0.0.',
      por_que_importa: 'En el mercado de consultoría europeo, la documentación es el artefacto que convierte un proyecto puntual en un activo empresarial. Un cliente que puede mantener, mejorar y traspasar el sistema a un nuevo proveedor sin depender del consultor original tiene más incentivo para invertir en el proyecto — y para contratar al mismo consultor en futuros proyectos. La documentación profesional no reduce el valor del consultor: lo aumenta al demostrar que puede entregar sistemas mantenibles, no solo demos que funcionan en la presentación.',
      tip_profesional: 'La sección de limitaciones conocidas es la que más frecuentemente se omite y la más valiosa para el cliente. Un cliente que descubre una limitación después de que el sistema está en producción pierde confianza en el consultor y en el sistema. Un cliente que recibe las limitaciones documentadas antes del deploy puede diseñar procesos de validación humana para los casos límite — y valora al consultor que fue honesto sobre los bordes del sistema.'
    },
    verificacion: [
      {
        pregunta: '¿Por qué la lección afirma que un sistema sin documentación no pasa la fase de entrega en el mercado europeo de consultoría de IA?',
        opciones: [
          'Porque la Unión Europea exige documentación técnica completa para todos los sistemas de IA bajo el AI Act europeo, con multas para proveedores no conformes',
          'Porque en el mercado europeo los proyectos cambian de manos, los equipos rotan, y los clientes corporativos tienen procesos de compliance que exigen trazabilidad — un sistema que solo puede usar su creador original no tiene valor de activo empresarial transferible',
          'Porque los clientes corporativos europeos tienen departamentos de IT que requieren documentación en formato ISO antes de integrar cualquier herramienta en su infraestructura',
          'Porque sin documentación el sistema no puede obtener la certificación de calidad necesaria para ser listado en los marketplaces de herramientas de IA de la Comisión Europea'
        ],
        correcta: 1,
        explicacion_profunda: 'El valor de un sistema en un contexto empresarial no es su funcionamiento técnico en el momento de la demo — es su utilidad a lo largo del tiempo, a través de cambios de equipo, actualizaciones del modelo, y expansiones del scope. Un sistema sin documentación es un sistema cuyo mantenimiento depende de la memoria de su creador. Cuando el creador no está disponible, el sistema se vuelve opaco y no mantenible. La documentación es la que convierte el sistema de una dependencia en un activo.',
        concepto_reforzado: 'Valor empresarial de la documentación como activo transferible'
      },
      {
        pregunta: '¿Cuál es la función específica de la sección de Casos de uso no validados en el README de prompts profesional?',
        opciones: [
          'Demostrar honestidad intelectual del consultor para construir confianza a largo plazo con el cliente',
          'Evitar que el sistema se use fuera del scope para el que fue evaluado — protege al cliente de casos donde el rendimiento real puede ser significativamente inferior al documentado en el benchmark',
          'Proporcionar un roadmap de mejoras futuras al equipo de producto que heredará el sistema',
          'Cumplir con los requisitos de transparencia del GDPR para sistemas de IA que procesan datos de clientes en la Unión Europea'
        ],
        correcta: 1,
        explicacion_profunda: 'La sección de casos de uso no validados es una protección contractual y operacional: cuando el cliente usa el sistema para un tipo de documento no listado como validado y obtiene resultados de baja calidad, no puede argumentar que el sistema falló de forma inesperada — el consultor documentó el scope explícitamente. Más importante aún: un equipo que conoce los límites del sistema puede diseñar flujos de validación humana para los casos límite antes de que esos casos lleguen a clientes o a procesos críticos.',
        concepto_reforzado: 'Protección del scope mediante documentación de casos no validados'
      },
      {
        pregunta: '¿Cómo se aplica el versioning semántico al sistema de Heikkinen & Co en el ejemplo de la lección?',
        opciones: [
          'v1.0.0 deploy inicial en inglés, v1.1.0 añadido finés más mejora few-shot, v1.2.0 añadida sección limitaciones más mejora consistency — el primer número cambia solo con rediseños completos de arquitectura',
          'v1.0.0 sistema sin testear, v1.1.0 sistema testeado internamente, v1.2.0 sistema aprobado por el cliente para uso en producción con clientes reales',
          'v1.0.0 sin optimizar, v1.1.0 optimizado para velocidad, v1.2.0 optimizado para accuracy — cada número representa un eje de optimización diferente',
          'El versioning se aplica al modelo de IA subyacente — cuando Anthropic actualiza claude-sonnet, la versión del sistema sube automáticamente'
        ],
        correcta: 0,
        explicacion_profunda: 'El versioning semántico en sistemas de prompts sigue la misma lógica que en software: el número MAYOR cambia cuando hay un rediseño incompatible de la arquitectura del pipeline — alguien que tenía integrado el sistema v1.x.x necesitaría adaptar su integración para usar v2.0.0. El número MENOR cambia cuando se añade funcionalidad compatible hacia atrás (nuevo idioma, nuevas categorías). El número PARCHE cambia cuando se corrige un bug en la lógica de un prompt sin cambiar el scope ni la arquitectura. El changelog documenta exactamente qué cambió en cada versión.',
        concepto_reforzado: 'Aplicación del versioning semántico a sistemas de prompts'
      },
      {
        pregunta: '¿Por qué la sección de métricas del README debe especificar la fecha de evaluación y la versión del modelo usado?',
        opciones: [
          'Porque los contratos de consultoría en el mercado europeo requieren que todos los benchmarks incluyan metadatos de auditoría con fecha y herramientas utilizadas',
          'Porque las métricas son una garantía de calidad en un momento específico con un modelo específico — si el modelo se actualiza, el equipo puede re-ejecutar el benchmark y detectar si la actualización degradó el rendimiento del sistema',
          'Porque la fecha de evaluación permite al cliente calcular si el sistema necesita una nueva evaluación según las políticas de renovación anuales de herramientas de IA de la firma',
          'Porque los proveedores de modelos de IA requieren que sus clientes corporativos documenten los benchmarks para detectar casos de uso inadecuados del modelo'
        ],
        correcta: 1,
        explicacion_profunda: 'Los modelos de IA se actualizan con frecuencia, y las actualizaciones pueden mejorar o degradar el rendimiento en tareas específicas. Si las métricas del README dicen accuracy 94% evaluado en Febrero 2026 con claude-sonnet-4-6, el equipo puede re-ejecutar el mismo benchmark con la misma configuración seis meses después para verificar que el rendimiento se mantiene. Sin la fecha y la versión del modelo, el benchmark es un número sin referencia temporal — no permite detectar regresiones causadas por actualizaciones del modelo.',
        concepto_reforzado: 'Métricas como garantía de calidad con contexto temporal y de modelo'
      },
      {
        pregunta: '¿Por qué la lección argumenta que la sección de limitaciones conocidas aumenta el valor del consultor en lugar de reducirlo?',
        opciones: [
          'Porque en el mercado finlandés y escandinavo la honestidad directa es un valor cultural que los clientes premian explícitamente en las evaluaciones de proveedores',
          'Porque un cliente que descubre las limitaciones después del deploy pierde confianza en el consultor y en el sistema — las limitaciones documentadas antes del deploy permiten diseñar validaciones humanas y demuestran que el consultor entregó un sistema con rigor, no una demo optimizada',
          'Porque las limitaciones documentadas protegen legalmente al consultor de reclamaciones por daños si el sistema produce errores en producción',
          'Porque los clientes corporativos europeos valoran la modestia intelectual como señal de que el consultor no sobrevendió el sistema durante el proceso de venta'
        ],
        correcta: 1,
        explicacion_profunda: 'El argumento es de gestión de expectativas y confianza a largo plazo: un consultor que entrega limitaciones documentadas demuestra que el sistema fue evaluado con rigor real (incluyendo los casos donde falla), que el consultor conoce el sistema profundamente (solo alguien que lo probó exhaustivamente conoce los bordes donde falla), y que el cliente puede confiar en el benchmark positivo (si el consultor fue honesto sobre las limitaciones, las métricas de rendimiento también son honestas). El consultor que omite las limitaciones puede parecer más impresionante en la presentación pero genera una deuda de confianza que eventualmente aparece en producción.',
        concepto_reforzado: 'Limitaciones documentadas como señal de rigor y confianza profesional'
      }
    ],
    practica: {
      tipo: 'caso_real',
      contexto: 'El equipo de producto de Heikkinen & Co te pide que redactes la sección de Limitaciones Conocidas del README del sistema de resúmenes ejecutivos. El sistema procesa informes de inversión en inglés y finés. Durante el benchmark de 45 informes encontraste los siguientes problemas: (1) Informes con estructura de lista sin prosa narrativa producen resúmenes con frases incompletas en el 30% de los casos. (2) Informes de mercados emergentes fuera de Europa producen evaluaciones de riesgo más conservadoras — el equipo de analistas estima un sesgo de 15-20% hacia categorías de riesgo superiores. (3) El sistema no verifica la exactitud numérica de las cifras financieras que incluye en el resumen.',
      instruccion: 'Escribe la sección completa de Limitaciones Conocidas para el README del sistema. Para cada limitación incluye: (1) descripción específica del problema; (2) condición de activación (cuándo aparece); (3) comportamiento esperado del sistema cuando la limitación se activa; (4) recomendación de mitigación para el equipo operacional.',
      input_malo: 'El sistema tiene algunas limitaciones con tipos inusuales de informes y con datos numéricos. Usar con precaución en casos especiales.',
      pista: 'Cada limitación debe ser lo suficientemente específica como para que el equipo operacional sepa exactamente cuándo activar la revisión humana. Evita lenguaje vago — especifica el tipo de documento, el porcentaje de fallos observado, y la acción concreta de mitigación.',
      solucion: 'Limitaciones Conocidas:\n\n1. Informes de estructura de lista sin narrativa. Descripción: informes con bullets o tablas sin secciones de texto analítico continuo producen resúmenes con frases incompletas o sin conectores lógicos. Condición de activación: informes donde más del 40% del contenido son listas o tablas sin prosa acompañante. Comportamiento: el resumen se genera pero pierde coherencia narrativa — requiere edición manual. Mitigación: verificar antes de procesar que existe un mínimo de prosa analítica. Si el informe es predominantemente tabular, enviar a resumen manual.\n\n2. Sesgo conservador en mercados emergentes. Descripción: para informes de mercados fuera de Europa (Asia, Latinoamérica, África subsahariana), el sistema asigna categorías de riesgo 15-20% superiores a la evaluación humana de referencia. Condición de activación: informes que mencionan exposición mayor al 30% en mercados fuera de la zona OCDE europea. Comportamiento: el resumen es completo y coherente pero la evaluación de riesgo puede estar sesgada hacia categorías superiores. Mitigación: todos los informes con exposición significativa fuera de Europa requieren revisión del párrafo de evaluación de riesgo por un analista senior antes del envío al cliente.\n\n3. Sin verificación de exactitud numérica. Descripción: el sistema puede incluir cifras financieras del informe original sin verificar su exactitud aritmética ni su correspondencia con la fuente. Condición de activación: siempre — aplica a todos los informes procesados. Comportamiento: las cifras en el resumen corresponden al texto del informe de input pero pueden contener errores del original o errores de transcripción. Mitigación: proceso obligatorio de verificación humana de todas las cifras específicas (rentabilidades, valoraciones, márgenes) antes del envío al cliente.',
      criterios_de_exito: [
        'Cada limitación incluye los cuatro elementos: descripción específica del problema, condición de activación concreta, comportamiento esperado del sistema, y recomendación de mitigación accionable',
        'Las condiciones de activación son lo suficientemente específicas para que el equipo operacional pueda evaluarlas antes de procesar un informe',
        'La tercera limitación (verificación numérica) aplica a todos los informes y la mitigación lo refleja explícitamente con proceso obligatorio'
      ]
    },
    conexion: {
      siguiente_concepto: 'Presentar y entregar tu proyecto de portafolio',
      por_que_importa_despues: 'Tienes el sistema diseñado, iterado con métricas reales, y documentado de forma profesional. La siguiente lección te prepara para la entrega del proyecto: cómo estructurar la presentación ante el cliente, qué incluir en el entregable final de portafolio, y cómo defender tus decisiones de diseño ante preguntas técnicas o de negocio.'
    }
  }
};

b9.lecciones.push(l3, l4, l5);
fs.writeFileSync('src/content/m4-completo.json', JSON.stringify(data, null, 2), 'utf8');
console.log('OK — l3, l4, l5 añadidas a B9. Total lecciones B9:', b9.lecciones.length);
