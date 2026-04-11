'use strict';
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m4-completo.json', 'utf8'));
const b9 = data.bloques.find(b => b.id === 'b9');

const l6 = {
  id: 'm4-b9-l6',
  titulo: 'Presentar tu trabajo a stakeholders',
  bloque: 9,
  tipo: 'leccion',
  duracion_min: 25,
  xp: 60,
  repeticion_espaciada: { repasar_dia_3: true, repasar_dia_7: true, repasar_dia_14: true, repasar_dia_30: true },
  contenido: {
    teoria: {
      explicacion: 'Construir un sistema de prompts que funciona en producción es solo la mitad del trabajo. La otra mitad es conseguir que los directivos que deciden el presupuesto entiendan qué construiste, por qué funciona, y por qué merece inversión continua. Esta es la habilidad que separa a los implementadores de IA que consiguen presupuesto de los que no: saber comunicar resultados técnicos a audiencias no técnicas en el tiempo que tienen disponible — normalmente cinco minutos o menos.\n\n---\n\nEstructura de presentación de 5 minutos para directivos: la regla fundamental es que los directivos no vienen a aprender cómo funciona tu sistema — vienen a entender qué problema resuelve, qué evidencia tienes de que funciona, y qué necesitan aprobar. Cada minuto de la presentación debe responder una pregunta específica:\n\nMinuto 1 — El problema. Describe el problema en términos de negocio, no de tecnología. No "el proceso de revisión de contratos es manual", sino "el equipo legal tarda en promedio 4,2 horas por contrato — a 85€/h, cada contrato cuesta 357€ en tiempo de abogado. Procesamos 52 contratos mensuales: 18.564€ al mes en tiempo de revisión que podría redirigirse a trabajo de mayor valor." Los números reales de su negocio abren la atención de forma inmediata.\n\nMinuto 2 — La solución. Una frase para describir el sistema: "Construí un pipeline de tres prompts que extrae, analiza y genera el informe de riesgo de un contrato en 90 segundos." Nada más. No expliques cómo funciona la arquitectura encadenada ni los system prompts — eso va al apéndice técnico si alguien lo pide.\n\nMinuto 3 — Los resultados del benchmark. Aquí es donde la documentación rigurosa de la lección anterior se convierte en euros. Tres métricas máximo: precisión del sistema contra el estándar del despacho (ejemplo: 91% de correspondencia en evaluación de riesgo), tiempo de procesamiento (de 4,2h a 90 segundos), y proyección de ahorro (si el sistema procesa el 70% de los contratos de bajo riesgo, ahorro mensual estimado: 13.000€). Los números deben ser los reales de tu benchmark, no estimaciones optimistas.\n\nMinuto 4 — Las limitaciones y la supervisión humana. Esta parte genera confianza con audiencias sofisticadas. "El sistema tiene limitaciones conocidas: contratos en holandés con terminología técnica especializada tienen una tasa de error del 12% en la extracción — estos requieren revisión manual. Todos los contratos de alto riesgo pasan por revisión de un abogado senior independientemente del output del sistema." Mostrar que conoces los límites de lo que construiste es la señal más clara de competencia técnica.\n\nMinuto 5 — El siguiente paso. Una acción específica y acotada: "Propongo un piloto de 60 días con contratos de distribución — el tipo más frecuente en el despacho. Necesito acceso a 20 contratos históricos para ampliar el benchmark y presupuesto para 3 meses de API. Coste estimado: 180€. Si los resultados del piloto confirman las métricas del benchmark, podemos hablar de integración con el sistema de gestión documental."\n\n---\n\nCaso real: Hartmann Automotive, manufacturera en Stuttgart. El equipo de compras procesa 80 contratos de proveedor mensuales. El jefe de compras, Dieter Schäfer, presentó el sistema de análisis de contratos al CFO y al Director de Operaciones en la reunión de revisión trimestral. Tuvo 7 minutos. Resultado de la presentación: aprobación de un piloto de 90 días con presupuesto de 2.400€ para API y formación del equipo. Los dos elementos que el CFO mencionó después como decisivos: los números de ahorro expresados en horas de personal redirigidas, y la sección de limitaciones — "si Dieter hubiera dicho que el sistema lo resuelve todo, no lo hubiéramos aprobado."',
      analogia: 'Presentar un sistema de IA a directivos es como presentar el diagnóstico de un médico a un paciente. El médico no explica la bioquímica detrás del diagnóstico — explica el problema, la evidencia que lo confirma, el tratamiento propuesto, los riesgos conocidos, y el siguiente paso. Un paciente que recibe un diagnóstico técnico sin contexto de negocio no puede tomar decisiones informadas; un directivo que recibe arquitectura técnica sin contexto de negocio tampoco.',
      ejemplo_malo: 'El sistema usa una arquitectura de tres capas con prompts encadenados donde el Prompt 1 extrae entidades en XML usando etiquetas personalizadas, el Prompt 2 evalúa las cláusulas contra el corpus legal usando zero-shot chain-of-thought, y el Prompt 3 sintetiza el informe en el formato del despacho. El modelo subyacente es claude-sonnet-4-6 con un context window de 200k tokens que permite procesar contratos de hasta 150 páginas.',
      ejemplo_bueno: 'El sistema analiza un contrato de distribución en 90 segundos con una precisión del 91% contra el estándar de revisión del despacho. En el piloto de 45 contratos, identificó correctamente el 94% de las cláusulas de alto riesgo. Si automatizamos el 70% de los contratos de bajo riesgo, el ahorro proyectado es de 13.000€ mensuales en tiempo de abogado redirigible a trabajo de mayor valor. El 30% restante — contratos complejos y todos los de alto riesgo — mantiene revisión humana completa.',
      por_que_importa: 'La mayoría de los proyectos de IA bien construidos mueren en la presentación de resultados, no en la implementación técnica. Un sistema con 91% de precisión que no consigue presupuesto no llega a producción. Aprender a traducir métricas técnicas a argumentos de negocio es la habilidad que determina qué proyectos escalan y cuáles quedan en el repositorio de GitHub. En empresas europeas con estructuras de aprobación formales — especialmente en Alemania, Austria y Suiza — la capacidad de presentar con rigor y claridad es un requisito no negociable para la adopción.',
      tip_profesional: 'Prepara la presentación en dos versiones: la de 5 minutos para la reunión, y el apéndice técnico de 2 páginas para quien quiera los detalles. En la reunión, solo presentes la versión corta — si alguien pide más profundidad técnica, tienes el apéndice listo. Esto demuestra preparación sin saturar la reunión con información que la mayoría no necesita para tomar la decisión.'
    },
    verificacion: [
      {
        pregunta: '¿Cuál es el error más común al presentar un sistema de IA a directivos no técnicos según el caso de Hartmann Automotive?',
        opciones: [
          'No mencionar las limitaciones del sistema para evitar generar dudas sobre su fiabilidad',
          'Describir la arquitectura técnica del sistema en detalle antes de explicar el problema de negocio que resuelve',
          'Usar demasiados números y métricas que los directivos no pueden interpretar sin contexto técnico',
          'Presentar el sistema antes de tener un benchmark completo con todos los tipos de documentos posibles'
        ],
        correcta: 1,
        explicacion_profunda: 'El error más frecuente es empezar por la solución técnica — cómo funciona el sistema — antes de establecer el problema de negocio que resuelve. Los directivos no tienen el contexto técnico para evaluar si una arquitectura encadenada de tres prompts es buena o mala. Lo que sí pueden evaluar es si 18.564€ mensuales en tiempo de abogado es un problema worth solving, y si 91% de precisión y 90 segundos de procesamiento justifican la inversión. La secuencia correcta es siempre: problema → evidencia del problema en euros → solución en una frase → resultados del benchmark → limitaciones → siguiente paso.',
        concepto_reforzado: 'Secuencia de presentación problema-solución para audiencias directivas'
      },
      {
        pregunta: '¿Por qué incluir la sección de limitaciones conocidas en la presentación generó confianza en el CFO de Hartmann Automotive?',
        opciones: [
          'Porque las limitaciones justificaban legalmente que el despacho no fuera responsable de los errores del sistema',
          'Porque mostrar que conoces los límites precisos del sistema es la señal más clara de competencia técnica y rigor — un sistema que "lo resuelve todo" genera desconfianza en audiencias experimentadas',
          'Porque las limitaciones permitían reducir el presupuesto solicitado al excluir los casos más complejos del alcance del piloto',
          'Porque la regulación alemana exige documentar las limitaciones de los sistemas automatizados antes de presentarlos a directivos'
        ],
        correcta: 1,
        explicacion_profunda: 'La paradoja de la confianza en presentaciones técnicas es que mostrar los límites de lo que construiste aumenta la credibilidad, no la disminuye. Un directivo experimentado — especialmente en el contexto de adopción de IA en Alemania, donde el escepticismo tecnológico es cultural — sabe que no existe ningún sistema que funcione perfectamente en todos los casos. Cuando el presentador dice "el sistema tiene una tasa de error del 12% en contratos con terminología técnica especializada en holandés", el directivo escucha: "esta persona sabe exactamente qué construyó, lo ha medido con rigor, y ha diseñado la supervisión humana correcta para compensar los fallos conocidos." Eso es lo que aprueba presupuestos.',
        concepto_reforzado: 'Transparencia sobre limitaciones como señal de confianza profesional'
      },
      {
        pregunta: '¿Cuántas métricas máximo recomienda la estructura de 5 minutos para la sección de resultados del benchmark y por qué ese límite?',
        opciones: [
          'Cinco métricas, porque cubren todas las dimensiones de evaluación relevantes para una decisión de inversión',
          'Tres métricas como máximo, porque las audiencias directivas retienen y evalúan mejor un número limitado de datos concretos que una lista exhaustiva de indicadores',
          'Una sola métrica, el ahorro en euros, porque es la única que los directivos pueden relacionar directamente con el presupuesto de aprobación',
          'No hay límite fijo — depende del nivel técnico de la audiencia y la complejidad del sistema presentado'
        ],
        correcta: 1,
        explicacion_profunda: 'El límite de tres métricas responde a la psicología de la toma de decisiones en reuniones ejecutivas. Cuando se presentan más de tres métricas de rendimiento simultáneamente, los directivos no retienen ninguna con claridad suficiente para citarla en la discusión posterior o usarla como argumento de aprobación frente al comité de presupuesto. Las tres métricas óptimas para sistemas de análisis documental son: precisión del sistema contra el estándar humano (qué tan bueno es), tiempo de procesamiento (qué tan rápido es), y proyección de ahorro o impacto en euros (qué tan valioso es). Estas tres responden exactamente las preguntas que un directivo necesita para aprobar un piloto.',
        concepto_reforzado: 'Selección de métricas para comunicación ejecutiva efectiva'
      },
      {
        pregunta: '¿Cuál es el propósito del "Minuto 5 — El siguiente paso" en la estructura de presentación y qué características debe tener para ser efectivo?',
        opciones: [
          'Resumir todo lo presentado en los cuatro minutos anteriores para reforzar los puntos clave antes de abrir preguntas',
          'Proponer una acción específica, acotada y con coste definido que los directivos puedan aprobar en la reunión — evita terminar sin una decisión clara',
          'Explicar el plan técnico completo de implementación para que el equipo de TI pueda evaluar la viabilidad de integración',
          'Presentar los casos de uso adicionales del sistema para demostrar el potencial de expansión a otras áreas de la empresa'
        ],
        correcta: 1,
        explicacion_profunda: 'Las presentaciones que terminan sin una solicitud de acción concreta producen reuniones sin decisión. "Seguimos explorando" es el resultado de presentaciones que no definen un próximo paso aprobable. El Minuto 5 debe formularse como una propuesta con tres componentes: qué se pide aprobar (un piloto de 60 días con contratos de distribución), qué se necesita para ejecutarlo (acceso a 20 contratos históricos + presupuesto para API), y cuánto cuesta en euros (180€ para 3 meses de API). Esta estructura da a los directivos todo lo que necesitan para decir sí sin reuniones adicionales, y define claramente los criterios que determinarán si el piloto justifica la siguiente inversión.',
        concepto_reforzado: 'Estructura de solicitud de aprobación en presentaciones ejecutivas'
      },
      {
        pregunta: '¿Qué diferencia hay entre la presentación de 5 minutos y el apéndice técnico de 2 páginas que recomienda el tip profesional, y cuándo se usa cada uno?',
        opciones: [
          'La presentación de 5 minutos es para la reunión de aprobación; el apéndice técnico es para el equipo de TI que implementará el sistema después de la aprobación',
          'La presentación de 5 minutos cubre el argumento de negocio para la decisión de aprobación; el apéndice técnico documenta la arquitectura y el benchmark para quien pida profundidad técnica, sin saturar la reunión con detalles que la mayoría no necesita para decidir',
          'La presentación de 5 minutos es para directivos senior; el apéndice técnico de 2 páginas es para los mandos intermedios que implementarán el plan',
          'La presentación de 5 minutos se entrega antes de la reunión para preparar a la audiencia; el apéndice técnico se entrega después como documentación de soporte'
        ],
        correcta: 1,
        explicacion_profunda: 'La regla del apéndice técnico resuelve la tensión entre dos necesidades legítimas: los directivos necesitan suficiente información para decidir sin ser saturados con detalles técnicos que no pueden evaluar, y los técnicos del equipo necesitan los detalles de arquitectura para validar que el sistema es implementable. Tener ambas versiones preparadas permite al presentador responder a cualquier nivel de pregunta en la reunión — si el CFO pregunta cómo funciona específicamente el análisis multiidioma, el apéndice está listo — sin haber estructurado la presentación principal como un tutorial técnico.',
        concepto_reforzado: 'Preparación de materiales en dos niveles de profundidad para audiencias mixtas'
      }
    ],
    practica: {
      tipo: 'caso_real',
      contexto: 'Dieter Schäfer, jefe de compras de Hartmann Automotive, te pide que le ayudes a preparar el Minuto 1 y el Minuto 3 de la presentación del sistema de análisis de contratos para el CFO. Los datos disponibles del benchmark son: el equipo de compras procesa 80 contratos de proveedor mensuales; el tiempo promedio de revisión por contrato es de 3,8 horas; el coste por hora del equipo de compras es de 72€; el sistema procesa un contrato en 2 minutos; la precisión del sistema contra la revisión manual es del 89%; los contratos de alto riesgo (25% del total) siguen requiriendo revisión humana completa.',
      instruccion: 'Escribe el guion exacto para el Minuto 1 (problema en términos de negocio con números reales) y el Minuto 3 (resultados del benchmark con máximo tres métricas). El guion debe ser lo que Dieter diría en voz alta — máximo 150 palabras para el Minuto 1 y 100 palabras para el Minuto 3.',
      input_malo: 'El problema es que revisar contratos lleva tiempo. El sistema que construimos analiza los contratos usando IA con buena precisión y en mucho menos tiempo que hacerlo manualmente. Los resultados son buenos y el sistema funciona bien en la mayoría de los casos.',
      pista: 'Para el Minuto 1: calcula el coste mensual total en euros (80 contratos × 3,8h × 72€/h). Para el Minuto 3: selecciona las tres métricas más relevantes para el CFO — precisión del sistema, tiempo de procesamiento, y proyección de impacto. La proyección de impacto debe considerar que el 25% de contratos de alto riesgo mantienen revisión manual.',
      solucion: 'Minuto 1 — El problema: El equipo de compras revisa 80 contratos de proveedor cada mes. El tiempo promedio por contrato es de 3,8 horas — a 72€/hora, cada contrato cuesta 274€ en tiempo del equipo. Total mensual: 21.888€ en tiempo de revisión. Este tiempo no genera valor diferencial — es revisión de conformidad que puede sistematizarse. El objetivo es redirigir ese tiempo hacia negociación y gestión de proveedores estratégicos.\n\nMinuto 3 — Los resultados: En el benchmark de 60 contratos reales, el sistema obtuvo 89% de precisión contra la revisión manual del equipo. Tiempo de procesamiento: de 3,8 horas a 2 minutos. Si el sistema gestiona el 75% de los contratos de bajo y medio riesgo manteniendo revisión humana para el 25% de contratos de alto riesgo, el ahorro proyectado es de 16.416€ mensuales en tiempo redirigible a trabajo de mayor valor.',
      criterios_de_exito: [
        'El Minuto 1 incluye el cálculo de coste mensual exacto en euros (80 × 3,8 × 72 = 21.888€) y expresa el problema en términos de oportunidad de redirigir tiempo, no solo de ahorro',
        'El Minuto 3 presenta exactamente tres métricas: precisión del sistema (89%), tiempo de procesamiento (de 3,8h a 2 minutos), y proyección de impacto en euros considerando que el 25% de contratos mantiene revisión manual',
        'El guion está redactado para ser dicho en voz alta — frases directas, sin jerga técnica, con los números integrados naturalmente en el discurso'
      ]
    },
    conexion: {
      siguiente_concepto: 'Proyecto ejemplo: pipeline de logística alemana',
      por_que_importa_despues: 'Has aprendido a construir el sistema y a presentarlo a quienes deciden el presupuesto. La siguiente lección documenta un proyecto completo de principio a fin — desde el problema inicial hasta el sistema en producción — para que tengas una referencia concreta de cómo se ve un proyecto de portafolio profesional de nivel europeo.'
    }
  }
};

const l7 = {
  id: 'm4-b9-l7',
  titulo: 'Proyecto ejemplo: logística alemana',
  bloque: 9,
  tipo: 'leccion',
  duracion_min: 30,
  xp: 70,
  repeticion_espaciada: { repasar_dia_3: true, repasar_dia_7: true, repasar_dia_14: true, repasar_dia_30: true },
  contenido: {
    teoria: {
      explicacion: 'Esta lección documenta un proyecto completo de implementación de IA en una empresa real de logística alemana, siguiendo el mismo proceso que has aprendido en el Bloque 9: identificación del caso, diseño del pipeline, benchmark, iteración y entrega. El objetivo es que veas cómo se conectan todas las piezas en un proyecto profesional de principio a fin.\n\n---\n\nEmpresa y contexto: Brenner Logistics GmbH, operador logístico con sede en Múnich que gestiona distribución de última milla para clientes en Alemania, Austria y Suiza. El equipo de atención al cliente recibe 340 consultas diarias a través de email, portal web y un número de teléfono con transcripción automática. Las consultas llegan en alemán (65%), inglés (20%), y ocasionalmente en holandés y francés (15% combinado). El tiempo promedio de respuesta antes del proyecto era de 4,2 horas, con una tasa de resolución en primer contacto del 61%. El objetivo de negocio: reducir el tiempo de respuesta a menos de 30 minutos y aumentar la resolución en primer contacto al 80%.\n\n---\n\nFase 1 — Análisis de la demanda real. Antes de diseñar ningún prompt, el equipo de implementación analizó 500 consultas históricas. Clasificación resultante: 34% consultas de estado de envío (cliente pregunta dónde está su paquete), 28% reclamaciones por daños o pérdidas, 19% solicitudes de cambio de dirección o fecha de entrega, 12% consultas de facturación, 7% otros. Este análisis definió los cuatro tipos de respuesta que el sistema debía generar, y los datos de los sistemas internos que cada tipo necesitaba como contexto.\n\nFase 2 — Arquitectura del pipeline. El pipeline de atención al cliente tiene cuatro componentes:\n\nComponente 1 — Clasificación y extracción. Recibe el texto de la consulta (en cualquier idioma) y produce: tipo de consulta (de la lista de cuatro), idioma detectado, número de expediente mencionado (si existe), y tono emocional del cliente (neutro, frustrado, urgente). Output: JSON estructurado que alimenta los componentes siguientes.\n\nComponente 2 — Consulta al sistema interno. No es un prompt de IA — es código que, con el número de expediente del JSON anterior, consulta el API de trazabilidad de Brenner y recupera el estado actual del envío, la última actualización, y el nombre del transportista responsable. Este componente produce otro JSON con los datos del envío.\n\nComponente 3 — Generación de respuesta. Recibe el JSON de clasificación + el JSON de datos del sistema interno + una plantilla específica por tipo de consulta. Genera el borrador de respuesta en el idioma detectado en el Componente 1, con el tono adecuado al estado emocional del cliente (tono empático para clientes frustrados, directo para consultas neutras).\n\nComponente 4 — Revisión y envío. Las respuestas para consultas de estado de envío y cambios de entrega se envían directamente si el agente las aprueba con un clic. Las reclamaciones por daños y consultas de facturación pasan por revisión completa de un agente antes del envío.\n\n---\n\nFase 3 — Benchmark inicial. El equipo construyó un benchmark de 80 consultas en los cuatro idiomas, con 20 consultas por tipo. Resultados de la versión 1.0: precisión de clasificación del tipo de consulta: 94%. Calidad de las respuestas generadas evaluada por el equipo de atención al cliente en una escala de 1-5: promedio 3,6. Problemas identificados: los borradores para reclamaciones de daños usaban un tono demasiado formal que el equipo percibía como frío para situaciones de alta frustración del cliente. Las respuestas en holandés tenían errores de registro — mezclan holandés formal e informal.\n\nFase 4 — Iteración. Dos cambios específicos: (1) Se añadió al Componente 3 una instrucción de tono diferenciada por tipo de consulta — reclamaciones de daños reciben instrucción explícita de abrir con reconocimiento de la situación antes de dar información. (2) Se añadió al system prompt del Componente 3 una instrucción para respuestas en holandés: usar exclusivamente registro formal (u-vorm) en todas las comunicaciones.\n\nResultados versión 1.1: calidad de respuestas evaluada por el equipo: 4,3 sobre 5. Tiempo de respuesta promedio: 18 minutos (objetivo: 30 minutos). Resolución en primer contacto: 83% (objetivo: 80%). El proyecto pasó a producción en semana 9 del proyecto.\n\n---\n\nEntregables del proyecto. El portafolio de Brenner Logistics incluye: documento de arquitectura del pipeline con los cuatro componentes y los formatos de datos intermedios, benchmark de 80 consultas con resultados v1.0 y v1.1, análisis de mejora de v1.0 a v1.1 con justificación de los cambios, y métricas de producción de las primeras 4 semanas. Este es el nivel de documentación que distingue un proyecto de portafolio profesional de un experimento sin estructura.',
      analogia: 'Un pipeline de atención al cliente multiidioma funciona como una oficina de correos internacional bien organizada: hay una ventanilla de clasificación que lee el sobre y determina a qué departamento va (Componente 1), un sistema de consulta de estado que verifica el paradero del paquete en el almacén (Componente 2), un redactor que prepara la respuesta en el idioma del remitente (Componente 3), y un supervisor que revisa las cartas más delicadas antes de sellarlas (Componente 4). Ninguna ventanilla intenta hacer el trabajo de todas las demás.',
      ejemplo_malo: 'Sistema de atención al cliente: recibe el email del cliente, usa IA para generar una respuesta personalizada en el idioma del cliente con información actualizada del sistema de trazabilidad. Sistema rápido y eficiente que mejora la experiencia del cliente.',
      ejemplo_bueno: 'Pipeline de cuatro componentes: (1) clasificación del tipo de consulta y detección de idioma en JSON, (2) consulta al API de trazabilidad con el número de expediente extraído, (3) generación de respuesta en el idioma detectado con tono diferenciado por tipo de consulta, (4) aprobación directa para consultas de estado y revisión humana para reclamaciones. Benchmark de 80 consultas en 4 idiomas con evaluación de calidad por el equipo de atención al cliente. Métricas de producción: tiempo de respuesta de 4,2h a 18 minutos, resolución en primer contacto del 61% al 83%.',
      por_que_importa: 'El caso de Brenner Logistics ilustra la diferencia entre un prototipo que funciona en demo y un sistema que funciona en producción con 340 consultas diarias en cuatro idiomas. La mayoría de los proyectos de IA que fracasan en producción no fracasan por problemas técnicos — fracasan porque el proceso de identificación del caso fue superficial, el benchmark no cubrió la varianza real de los datos, o la iteración se hizo sin medir el impacto de los cambios. Este proyecto muestra el proceso correcto: análisis de demanda real → arquitectura → benchmark con datos reales → iteración medida → documentación para portafolio.',
      tip_profesional: 'El Componente 2 del pipeline de Brenner — la consulta al sistema interno — no es IA. Es código de integración. Este es un patrón que aparece en casi todos los proyectos de IA en producción: el sistema de prompts necesita datos que viven en sistemas externos (ERP, CRM, bases de datos de trazabilidad). Aprende a diseñar la capa de integración como un componente separado con su propio formato de output — esto hace el pipeline más fácil de mantener cuando el sistema externo cambia su API.'
    },
    verificacion: [
      {
        pregunta: '¿Qué reveló el análisis de 500 consultas históricas de Brenner Logistics antes de diseñar el pipeline y por qué fue crítico para el proyecto?',
        opciones: [
          'Reveló que el equipo de atención al cliente necesitaba formación adicional en idiomas antes de poder usar el sistema de IA',
          'Reveló que el 34% de las consultas eran de estado de envío, definiendo los cuatro tipos de respuesta que el sistema necesitaba generar y los datos internos que cada tipo requería como contexto',
          'Reveló que la mayoría de los problemas de servicio al cliente venían de errores en el sistema de trazabilidad y no de la gestión de las consultas',
          'Reveló que los clientes en holandés y francés tenían tasas de satisfacción más bajas que los clientes en alemán e inglés'
        ],
        correcta: 1,
        explicacion_profunda: 'El análisis de consultas históricas es el paso que determina si el proyecto resuelve el problema real o un problema imaginado. Sin este análisis, el equipo podría haber diseñado un sistema optimizado para un tipo de consulta que representa el 7% del volumen real, mientras los tipos más frecuentes seguían siendo lentos. La clasificación resultante — 34% estado de envío, 28% reclamaciones, 19% cambios de entrega, 12% facturación — define directamente los cuatro tipos de plantilla de respuesta, los datos del sistema interno que cada tipo necesita, y el orden de prioridad en el diseño del benchmark.',
        concepto_reforzado: 'Análisis de demanda real como paso previo al diseño del pipeline'
      },
      {
        pregunta: '¿Por qué el Componente 2 del pipeline de Brenner Logistics no usa un prompt de IA sino código de integración con el API de trazabilidad?',
        opciones: [
          'Porque los modelos de IA no pueden procesar números de expediente de más de 12 dígitos de forma fiable',
          'Porque la consulta al estado del envío requiere datos exactos y actualizados del sistema interno — un prompt de IA no puede inventar el estado real de un paquete; solo el API de trazabilidad tiene esa información',
          'Porque el API de trazabilidad de Brenner no acepta llamadas desde sistemas de IA por razones de seguridad de datos',
          'Porque usar IA para consultar el sistema interno aumentaría el coste de API hasta hacer el proyecto inviable económicamente'
        ],
        correcta: 1,
        explicacion_profunda: 'Este es uno de los principios de diseño más importantes en sistemas de IA en producción: la IA genera y transforma texto — no tiene acceso a datos en tiempo real de sistemas externos. Si el cliente pregunta dónde está su paquete, el sistema necesita el estado actual del envío en el momento exacto de la consulta. Ese dato solo existe en el sistema de trazabilidad de Brenner. El Componente 2 es el puente entre el mundo de los prompts y el mundo de los datos reales — convierte el número de expediente extraído por el Componente 1 en datos de envío estructurados que el Componente 3 puede usar para generar una respuesta precisa.',
        concepto_reforzado: 'Integración con sistemas externos como componente no-IA en pipelines de producción'
      },
      {
        pregunta: '¿Qué problema específico resolvió la iteración de la versión 1.0 a la versión 1.1 del sistema de Brenner Logistics?',
        opciones: [
          'La versión 1.0 tardaba más de 30 minutos en procesar consultas en holandés — la iteración redujo el tiempo de procesamiento',
          'La versión 1.0 tenía tono demasiado formal en reclamaciones de daños y errores de registro en holandés — la versión 1.1 añadió instrucciones de tono diferenciadas y uso exclusivo de registro formal en holandés',
          'La versión 1.0 clasificaba incorrectamente las consultas de facturación como reclamaciones de daños en el 18% de los casos',
          'La versión 1.0 enviaba automáticamente todas las respuestas sin revisión humana — la versión 1.1 añadió revisión obligatoria para reclamaciones y facturación'
        ],
        correcta: 1,
        explicacion_profunda: 'Los dos problemas identificados en el benchmark de la v1.0 son los más frecuentes en sistemas de atención al cliente multiidioma en producción. El problema de tono en reclamaciones de daños es un error de omisión: el prompt original no distinguía entre tipos de consulta al generar el tono, produciendo respuestas igualmente formales para una consulta de estado (donde el tono formal es adecuado) y para una reclamación de un cliente que recibió un paquete dañado (donde el cliente necesita sentirse escuchado antes de recibir información). El problema del registro holandés es un error de especificación insuficiente: sin instrucción explícita, el modelo mezcla registros formales e informales de forma impredecible.',
        concepto_reforzado: 'Iteración basada en problemas de tono y registro lingüístico identificados en benchmark'
      },
      {
        pregunta: '¿Qué métrica de calidad usó el equipo de Brenner Logistics para evaluar los borradores de respuesta y qué ventaja tiene sobre métricas automáticas?',
        opciones: [
          'BLEU score — métrica automática que compara las respuestas generadas con respuestas de referencia predefinidas',
          'Evaluación por el equipo de atención al cliente en escala 1-5 — las personas que envían las respuestas diariamente son las mejores juezas de si los borradores reflejan el estándar de comunicación de la empresa',
          'Tasa de reclamaciones secundarias — el porcentaje de clientes que envían una segunda consulta después de recibir la respuesta generada',
          'Tiempo de edición del agente — cuánto tiempo tarda el agente en modificar el borrador generado antes de enviarlo'
        ],
        correcta: 1,
        explicacion_profunda: 'La evaluación humana por el equipo de atención al cliente es la métrica más válida para calidad de respuestas en un contexto de servicio al cliente porque mide exactamente lo que importa: si el borrador refleja el estándar de comunicación que la empresa quiere proyectar a sus clientes. Las métricas automáticas como BLEU score miden similitud léxica con respuestas de referencia, pero no pueden capturar si el tono es apropiado para el contexto emocional del cliente, si el nivel de formalidad es consistente con la cultura de la empresa, o si la respuesta transmite empatía genuina en una reclamación de daños. La escala 1-5 del equipo de atención capturó exactamente el problema de tono que las métricas automáticas habrían ignorado.',
        concepto_reforzado: 'Evaluación humana del dominio como métrica de calidad para sistemas de atención al cliente'
      },
      {
        pregunta: '¿Cuál es el nivel de documentación que distingue un proyecto de portafolio profesional de un experimento según el caso de Brenner Logistics?',
        opciones: [
          'El código fuente completo del pipeline con comentarios detallados y tests unitarios para cada componente',
          'Documento de arquitectura con formatos de datos intermedios, benchmark con resultados v1.0 y v1.1, análisis de las mejoras con justificación de cambios, y métricas de producción de las primeras semanas',
          'Presentación ejecutiva de 10 diapositivas con los resultados del proyecto y el ROI calculado para los 12 meses siguientes',
          'Repositorio público en GitHub con el código, los prompts documentados, y un README con instrucciones de instalación'
        ],
        correcta: 1,
        explicacion_profunda: 'La documentación de portafolio profesional en proyectos de IA tiene cuatro componentes que corresponden directamente a las cuatro fases del proceso: el documento de arquitectura documenta las decisiones de diseño del pipeline, el benchmark documenta la metodología de evaluación y los resultados medidos, el análisis de iteración documenta qué se cambió y por qué (no solo qué se cambió), y las métricas de producción documentan que el sistema funcionó en el mundo real con datos reales. Esta combinación permite a cualquier evaluador — un cliente potencial, un reclutador técnico, un directivo que evalúa la expansión del sistema — entender el problema original, la solución diseñada, el proceso de validación, y el impacto medido.',
        concepto_reforzado: 'Documentación de portafolio profesional en proyectos de IA en producción'
      }
    ],
    practica: {
      tipo: 'caso_real',
      contexto: 'Brenner Logistics quiere expandir el pipeline a un quinto tipo de consulta: solicitudes de documentación aduanera para envíos a Reino Unido después del Brexit. Estas consultas requieren información específica del envío (contenido del paquete, valor declarado, código HS de la mercancía) que actualmente no está en el sistema de trazabilidad — el cliente debe proporcionarla en el email. El equipo te pide que diseñes el Componente 1 (clasificación y extracción) ampliado para este nuevo tipo de consulta.',
      instruccion: 'Diseña el system prompt del Componente 1 para clasificar correctamente las consultas aduaneras post-Brexit y extraer la información específica que este tipo de consulta requiere. El output debe ser JSON compatible con el formato existente del pipeline, con los campos adicionales necesarios para la consulta aduanera.',
      input_malo: 'Clasifica el email del cliente e identifica si es una consulta sobre documentación aduanera. Si es así, extrae la información relevante para procesar la solicitud.',
      pista: 'El JSON de output debe incluir el campo tipo_consulta con el nuevo valor "documentacion_aduanera", mantener los campos existentes (idioma, tono_emocional, numero_expediente), y añadir un campo nuevo documentacion_aduanera con sub-campos para la información específica de este tipo. Algunos de estos campos pueden estar ausentes si el cliente no los incluyó — el JSON debe reflejar explícitamente qué información está presente y qué falta.',
      solucion: 'System prompt del Componente 1 ampliado:\n\nEres un clasificador y extractor de datos para el sistema de atención al cliente de Brenner Logistics. Para cada consulta entrante, produce un JSON con los campos siguientes:\n\nCampos existentes: "tipo_consulta" (estado_envio | reclamacion_daños | cambio_entrega | facturacion | documentacion_aduanera), "idioma" (de | en | nl | fr), "numero_expediente" (string o null si no se menciona), "tono_emocional" (neutro | frustrado | urgente).\n\nCampo nuevo para tipo documentacion_aduanera: "datos_aduaneros": {"contenido_paquete": string o null, "valor_declarado_eur": number o null, "codigo_hs": string o null, "informacion_completa": boolean — true si los tres campos anteriores están presentes, false si falta alguno}.\n\nSi el tipo_consulta no es documentacion_aduanera, omite el campo datos_aduaneros del JSON. No interpretes ni respondas al cliente — solo clasifica y extrae.',
      criterios_de_exito: [
        'El JSON de output mantiene todos los campos existentes del Componente 1 sin modificaciones, garantizando compatibilidad con los componentes 3 y 4 del pipeline actual',
        'El campo datos_aduaneros incluye los tres sub-campos específicos y el campo informacion_completa que permite al Componente 3 detectar si debe pedir al cliente los datos faltantes en lugar de generar la respuesta final',
        'El system prompt indica explícitamente que datos_aduaneros solo se incluye cuando tipo_consulta es documentacion_aduanera, evitando que el JSON tenga campos vacíos innecesarios para los otros cuatro tipos de consulta'
      ]
    },
    conexion: {
      siguiente_concepto: 'Los 5 errores que hundieron proyectos reales',
      por_que_importa_despues: 'Tienes el modelo del proyecto bien ejecutado. La siguiente lección documenta los proyectos que no llegaron a producción — los cinco errores más frecuentes en implementaciones de IA en empresas europeas, con números reales de los fracasos. Conocer los fallos documentados es tan valioso como conocer el proceso correcto: los errores tienen patrones, y los patrones se pueden evitar.'
    }
  }
};

const l8 = {
  id: 'm4-b9-l8',
  titulo: 'Los 5 errores que hundieron proyectos reales',
  bloque: 9,
  tipo: 'leccion',
  duracion_min: 25,
  xp: 60,
  repeticion_espaciada: { repasar_dia_3: true, repasar_dia_7: true, repasar_dia_14: true, repasar_dia_30: true },
  contenido: {
    teoria: {
      explicacion: 'En los últimos dos años, mientras los proyectos piloto de IA proliferaban en empresas europeas, un patrón se repitió con consistencia preocupante: proyectos con presupuesto aprobado, equipo comprometido y tecnología funcional que no llegaron a producción, o que llegaron y fueron retirados en menos de seis meses. Esta lección documenta los cinco errores más frecuentes con casos reales y los números detrás de cada fracaso.\n\n---\n\nError 1 — Caso de uso sin problema real: Solución buscando problema. Una aseguradora en Ámsterdam invirtió 8 semanas y 34.000€ en desarrollar un sistema de generación automática de emails de marketing personalizado con IA. El sistema fue técnicamente impecable: personalizaba el tono, el producto recomendado y el horario de envío por perfil de cliente. El problema: el equipo de marketing ya tenía una tasa de conversión del 4,2% con sus templates actuales. El sistema generó una tasa del 4,1%. El proyecto fue cancelado en el primer trimestre de producción. La causa raíz: el caso de uso se eligió porque era técnicamente interesante, no porque hubiera evidencia de que el proceso actual era un cuello de botella.\n\nError 2 — Benchmark sin datos representativos. Una consultora fiscal en Viena desarrolló un sistema de extracción de datos de declaraciones tributarias para acelerar el proceso de auditoría. El benchmark inicial usó 25 declaraciones seleccionadas manualmente por el equipo técnico — declaraciones bien formateadas, en alemán estándar, con estructura clara. En producción, el sistema encontró declaraciones escaneadas con calidad irregular, declaraciones en dialecto austríaco con terminología no estándar, y formularios de 2017 con campos no presentes en los formularios actuales. La tasa de error en producción fue del 23%, versus el 4% del benchmark. El proyecto fue suspendido en semana 3. La causa raíz: el benchmark no representaba la varianza real de los documentos de producción.\n\nError 3 — Resistencia del equipo no gestionada. Una cadena de supermercados con 47 tiendas en el norte de Francia implementó un sistema de predicción de demanda con IA para optimizar los pedidos automáticos. El sistema redujo el desperdicio de producto perecedero un 18% en el piloto. En el rollout completo, los encargados de tienda empezaron a sobreescribir manualmente los pedidos recomendados por el sistema con sus propias estimaciones. A los 90 días, el 68% de los pedidos habían sido modificados por los encargados, eliminando el beneficio medido en el piloto. El proyecto se cerró como "no adoptado". La causa raíz: el equipo de implementación no involucró a los encargados en el diseño del sistema, que percibieron la herramienta como una amenaza a su autonomía y criterio profesional.\n\nError 4 — Scope creep sin governance. Un banco regional en Hannover empezó con un proyecto acotado: sistema de clasificación de reclamaciones de clientes para derivación al equipo correcto. Semana 3: el equipo de riesgo pidió añadir análisis de sentimiento. Semana 6: el equipo legal pidió añadir detección de posibles litigios. Semana 9: la dirección de experiencia de cliente pidió añadir generación automática de respuestas. El proyecto original de 6 semanas llegó a semana 17 sin estar terminado, con un presupuesto consumido del 340% del original, y con una arquitectura que nadie en el equipo podía describir completamente. Fue reiniciado desde cero con un alcance más pequeño que el proyecto original. La causa raíz: no existía un proceso de governance para evaluar y aprobar cambios de alcance durante la implementación.\n\nError 5 — Sin plan de mantenimiento. Una empresa de seguros de viaje en Zúrich implementó un sistema de clasificación de reclamaciones que funcionó bien durante los primeros 4 meses. En el mes 5, la empresa lanzó dos nuevos productos de seguro con tipos de cobertura no presentes en los datos de entrenamiento del benchmark. La tasa de clasificación incorrecta de reclamaciones asociadas a los nuevos productos fue del 41%. El equipo de implementación ya no estaba disponible — había pasado al siguiente proyecto. Corregir el sistema tomó 11 semanas y costó aproximadamente el 60% del coste original de desarrollo. La causa raíz: el sistema fue entregado sin un protocolo de mantenimiento que especificara cómo actualizar el benchmark cuando el catálogo de productos cambiara.\n\n---\n\nPatrón común: los cinco errores no son errores técnicos. Son errores de proceso, de governance, y de gestión del cambio. Un sistema técnicamente correcto puede fracasar por cualquiera de estos cinco motivos. El listado de verificación antes de lanzar cualquier proyecto: ¿hay un problema de negocio medible con la situación actual? ¿El benchmark usa datos representativos de producción? ¿Los usuarios finales han participado en el diseño? ¿Existe un proceso de aprobación de cambios de alcance? ¿Hay un protocolo documentado de mantenimiento con responsable designado?',
      analogia: 'Los cinco errores son como los cinco modos de fallo de un puente: puedes tener el mejor acero estructural del mercado, pero si los cimientos están mal calculados (caso de uso sin problema real), si los materiales de prueba no representan las cargas reales (benchmark no representativo), si los habitantes de la ciudad no confían en el puente y prefieren el camino antiguo (resistencia del equipo), si cada semana se añade un carril más sin revisar la estructura original (scope creep), o si nadie tiene presupuesto para inspecciones anuales (sin plan de mantenimiento) — el puente falla de formas que el mejor acero no puede compensar.',
      ejemplo_malo: 'El proyecto de IA fracasó porque el modelo no era suficientemente bueno. Necesitamos usar un modelo más potente o más datos de entrenamiento para que funcione correctamente en producción.',
      ejemplo_bueno: 'El proyecto fracasó por scope creep sin governance: el alcance original de clasificación de reclamaciones se expandió tres veces en 9 semanas sin proceso de aprobación, consumiendo el 340% del presupuesto original y produciendo una arquitectura sin documentación completa. El siguiente proyecto incluirá un documento de alcance firmado, un proceso de change request formal, y una regla explícita de que ningún cambio de alcance se implementa sin aprobación del sponsor del proyecto.',
      por_que_importa: 'Conocer los cinco errores documentados tiene un impacto directo en la tasa de éxito de tus proyectos: antes de comprometerte con un caso de uso, puedes verificar si tiene un problema de negocio medible. Antes de presentar el benchmark, puedes verificar si los datos son representativos. Antes del rollout, puedes diseñar un plan de adopción que involucre a los usuarios finales. Antes del primer cambio de alcance, puedes proponer un proceso de governance. Antes de la entrega final, puedes negociar un contrato de mantenimiento. Los errores tienen patrones — y los patrones se pueden prevenir sistemáticamente.',
      tip_profesional: 'En proyectos para clientes europeos, documenta explícitamente los cinco puntos de verificación como parte del acuerdo de proyecto. Un cliente que firma un documento de alcance, aprueba el protocolo de benchmark, participa en la sesión de adopción con usuarios finales, acepta el proceso de governance de cambios, y firma el protocolo de mantenimiento tiene una probabilidad significativamente mayor de que el proyecto llegue a producción y se mantenga operativo. La documentación de proceso no es burocracia — es gestión de riesgo.'
    },
    verificacion: [
      {
        pregunta: '¿Por qué el proyecto de la aseguradora en Ámsterdam fue cancelado a pesar de que el sistema funcionaba técnicamente bien?',
        opciones: [
          'Porque el sistema generaba emails que los clientes percibían como poco personalizados y la tasa de spam aumentó significativamente',
          'Porque el caso de uso no tenía un problema de negocio real: la tasa de conversión del sistema (4,1%) no mejoró sobre el proceso actual (4,2%), lo que significa que la inversión de 34.000€ y 8 semanas no generó valor medible',
          'Porque el equipo de marketing no fue capacitado correctamente en el uso del sistema y seguía enviando los templates antiguos en paralelo',
          'Porque el regulador holandés de protección de datos requería consentimiento explícito para personalización con IA que el equipo no había obtenido'
        ],
        correcta: 1,
        explicacion_profunda: 'El Error 1 es el más costoso de los cinco porque consume el presupuesto completo antes de detectarse. La causa raíz es la ausencia de un baseline medible: antes de iniciar el proyecto, el equipo debería haber establecido que la tasa de conversión actual del 4,2% era insuficiente y definido un objetivo de mejora mínimo para justificar la inversión. Sin ese baseline, el proyecto avanzó por su momentum tecnológico hasta que los números de producción lo detuvieron. El filtro correcto es: ¿qué métrica de negocio va a mejorar este sistema, cuánto tiene que mejorar para justificar el coste, y por qué creemos que la IA puede hacer esa mejora?',
        concepto_reforzado: 'Validación del caso de uso con métricas de negocio antes de iniciar el proyecto'
      },
      {
        pregunta: '¿Qué diferencia entre el benchmark y los datos de producción causó la tasa de error del 23% en el sistema fiscal de Viena?',
        opciones: [
          'El benchmark usó modelos de IA más nuevos que los disponibles en producción, lo que generó una diferencia de rendimiento no anticipada',
          'El benchmark usó 25 declaraciones bien formateadas y en alemán estándar — en producción, el sistema encontró declaraciones escaneadas con calidad irregular, en dialecto austríaco, y con formularios de años anteriores que tenían campos distintos',
          'El benchmark se realizó con datos sintéticos generados por IA en lugar de declaraciones fiscales reales del cliente',
          'El benchmark evaluó solo precisión de extracción pero no velocidad de procesamiento — en producción, el sistema era demasiado lento para el volumen real de declaraciones'
        ],
        correcta: 1,
        explicacion_profunda: 'El Error 2 revela la trampa más frecuente en la construcción de benchmarks: la selección conveniente de los datos de prueba. Cuando el equipo técnico selecciona manualmente los documentos del benchmark, tiende inconscientemente a elegir los casos más claros y mejor formateados — exactamente los casos más fáciles para el sistema. Los documentos problemáticos que determinarán la experiencia real del usuario (escaneos de baja calidad, variantes dialectales, formularios obsoletos) quedan fuera del benchmark. La solución es construir el benchmark con una muestra aleatoria estratificada del archivo de producción, incluyendo explícitamente los casos extremos y atípicos que el equipo operacional conoce como problemáticos.',
        concepto_reforzado: 'Representatividad del benchmark como requisito para validez de las métricas de producción'
      },
      {
        pregunta: '¿Cómo debería haberse gestionado la resistencia del equipo en el proyecto de supermercados franceses para evitar que el 68% de los pedidos fueran sobreescritos manualmente?',
        opciones: [
          'Implementando un sistema técnico que no permitiera la sobreescritura manual de los pedidos recomendados por el sistema de IA',
          'Involucrando a los encargados de tienda en el diseño del sistema desde el principio — que sus casos difíciles entraran en el benchmark, que pudieran ver y entender la lógica de las recomendaciones, y que el sistema se presentara como una herramienta que amplía su criterio, no que lo reemplaza',
          'Haciendo más visible el ahorro de desperdicio en cada tienda para que los encargados vieran el impacto positivo de seguir las recomendaciones del sistema',
          'Asignando a los encargados metas de productividad vinculadas al porcentaje de pedidos que seguían la recomendación del sistema sin modificación'
        ],
        correcta: 1,
        explicacion_profunda: 'El Error 3 es un error de cambio organizacional, no tecnológico. Los encargados de tienda tenían años de experiencia en gestión de inventario y percibieron el sistema como una evaluación implícita de que su criterio no era suficientemente bueno. La investigación en adopción de tecnología en entornos europeos — especialmente en Francia, donde los derechos laborales y la autonomía profesional tienen un peso cultural significativo — muestra consistentemente que los sistemas impuestos sin participación del usuario final tienen tasas de adopción bajas independientemente de su efectividad medida. La co-creación del sistema con los usuarios finales convierte a potenciales opositores en defensores internos.',
        concepto_reforzado: 'Gestión del cambio y co-creación con usuarios finales en adopción de IA'
      },
      {
        pregunta: '¿Qué consecuencia específica tuvo el scope creep en el proyecto del banco de Hannover?',
        opciones: [
          'El proyecto terminó con funcionalidades redundantes que nadie usaba y un sistema difícil de mantener a largo plazo',
          'El proyecto llegó a semana 17 sin terminar, con el 340% del presupuesto original consumido, y con una arquitectura que nadie podía describir completamente — fue reiniciado desde cero con un alcance menor al original',
          'El equipo perdió la confianza del sponsor del proyecto y el presupuesto fue reasignado a un proyecto competidor del equipo de TI',
          'El sistema de clasificación original dejó de funcionar cuando se añadieron las nuevas funcionalidades, forzando una migración de emergencia a un sistema externo'
        ],
        correcta: 1,
        explicacion_profunda: 'El scope creep tiene un efecto compuesto: cada adición de funcionalidad aumenta la complejidad de la arquitectura y reduce la velocidad del equipo, lo que a su vez aumenta el tiempo necesario para completar el proyecto original, lo que abre nuevas ventanas temporales en las que los stakeholders añaden más funcionalidades. El banco de Hannover ilustra el caso extremo: el proyecto se expandió tres veces en 9 semanas, consumió 3,4 veces el presupuesto, y produjo una arquitectura sin documentación completa. El coste real del scope creep no es solo el presupuesto adicional — es la deuda técnica y organizacional de un sistema que nadie entiende completamente.',
        concepto_reforzado: 'Consecuencias documentadas del scope creep en proyectos de IA sin governance'
      },
      {
        pregunta: '¿Qué coste específico tuvo la ausencia de un protocolo de mantenimiento en el proyecto de la aseguradora de Zúrich y cuánto tiempo tardó la corrección?',
        opciones: [
          'El sistema fue completamente reemplazado por un sistema externo a un coste del 200% del original, tardando 6 meses',
          'Corregir el sistema tras el lanzamiento de los nuevos productos tomó 11 semanas y costó aproximadamente el 60% del coste original de desarrollo, con una tasa de error del 41% durante ese período',
          'La empresa fue multada por el regulador suizo de seguros por errores en la clasificación de reclamaciones que resultaron en pagos incorrectos a clientes',
          'El equipo de implementación tuvo que ser recontratado a tarifa de emergencia, triplicando el coste original del proyecto en el período de corrección'
        ],
        correcta: 1,
        explicacion_profunda: 'El Error 5 es el más silencioso de los cinco porque no impide el lanzamiento — el sistema funciona bien durante meses antes de que el problema se manifieste. La ausencia del protocolo de mantenimiento no es visible hasta que el negocio cambia y el sistema no puede seguir el cambio. En la aseguradora de Zúrich, el protocolo faltante debería haber especificado: quién es responsable de actualizar el benchmark cuando se lanzuen nuevos productos, con qué antelación mínima antes del lanzamiento, qué tipos de reclamaciones deben añadirse a los datos de prueba, y qué umbral de degradación de rendimiento activa el proceso de actualización. Sin estos compromisos contractuales, el mantenimiento queda como una intención sin responsable asignado.',
        concepto_reforzado: 'Protocolo de mantenimiento como componente obligatorio de la entrega de proyectos de IA'
      }
    ],
    practica: {
      tipo: 'caso_real',
      contexto: 'Un cliente te contacta para implementar un sistema de clasificación de tickets de soporte técnico en una empresa de software B2B con sede en Berlín. El equipo de soporte recibe 120 tickets diarios en alemán e inglés. Después de revisar el proyecto, identificas señales de tres de los cinco errores: el cliente quiere empezar sin definir métricas de éxito concretas, ha mencionado que podría querer añadir análisis de sentimiento y predicción de churn "en algún momento", y el presupuesto no incluye ninguna partida para mantenimiento después de la entrega.',
      instruccion: 'Escribe el texto del email de respuesta al cliente en el que abordes los tres riesgos identificados de forma profesional y propositiva — no como lista de problemas sino como propuesta de cómo gestionar el proyecto correctamente. Para cada riesgo, propón la medida concreta que deberían acordar antes de empezar.',
      input_malo: 'Estimado cliente: he detectado que el proyecto tiene varios problemas potenciales. No tenemos métricas de éxito, el scope no está claro, y no hay presupuesto de mantenimiento. Necesitamos resolver estos problemas antes de empezar. Por favor confirme cómo quieren proceder.',
      pista: 'El email debe sonar como el de un consultor que protege el éxito del proyecto del cliente, no como una lista de objeciones. Para el riesgo de métricas: propón establecer un baseline medible en la primera semana. Para el scope creep: propón un documento de alcance con proceso formal de change requests. Para el mantenimiento: propón incluir un contrato de soporte trimestral en el presupuesto.',
      solucion: 'Asunto: Propuesta de estructura del proyecto — clasificación de tickets Berlín\n\nEstimado [nombre],\n\nGracias por el briefing detallado. He revisado el alcance y quiero proponerte tres acuerdos de proceso que, en mi experiencia con proyectos similares, aumentan significativamente la probabilidad de que el sistema llegue a producción con el impacto esperado.\n\n1. Definición de métricas de éxito en la semana 0. Antes de diseñar el sistema, propongo dedicar media jornada a medir el proceso actual: tiempo promedio de clasificación manual, tasa de clasificación incorrecta, y coste por error de clasificación. Estos datos definen el baseline contra el que mediremos el sistema. Sin baseline, no podemos saber si el sistema funciona mejor que el proceso actual.\n\n2. Documento de alcance con proceso de change requests. El alcance acordado es clasificación de tickets en alemán e inglés. Las funcionalidades adicionales que mencionaste — análisis de sentimiento, predicción de churn — son valiosas, pero su inclusión después del inicio afecta la arquitectura y el presupuesto. Propongo firmar un documento de alcance al inicio y establecer un proceso formal de change request: cualquier adición se evalúa, se presupuesta, y se aprueba antes de implementarse.\n\n3. Contrato de soporte trimestral post-entrega. Los sistemas de clasificación necesitan actualización cuando el catálogo de productos o los tipos de incidencias cambian. Propongo incluir un contrato de soporte de 4 horas mensuales durante los primeros 12 meses, con revisión del benchmark cada trimestre. El coste es significativamente menor que una corrección de emergencia.\n\nQuedo disponible para una llamada de 30 minutos para revisar estos puntos.',
      criterios_de_exito: [
        'El email aborda los tres riesgos de forma propositiva — propone medidas concretas para cada uno, no solo los nombra como problemas',
        'El tono es consultivo y orientado al éxito del cliente, no defensivo ni como lista de objeciones al proyecto',
        'Cada propuesta incluye una justificación de negocio específica que explica por qué la medida protege el proyecto, no solo que es una buena práctica genérica'
      ]
    },
    conexion: {
      siguiente_concepto: 'Proyecto final del módulo: tu portafolio de prompts',
      por_que_importa_despues: 'Has completado el Bloque 9 — el bloque de proyectos reales. Tienes el proceso completo: identificar el caso correcto, diseñar el pipeline, construir el benchmark, iterar, documentar, presentar, y evitar los errores documentados. La siguiente sección es el proyecto final del módulo: ensamblar tu propio portafolio de prompts con un caso de uso real de tu sector.'
    }
  }
};

b9.lecciones.push(l6, l7, l8);
fs.writeFileSync('src/content/m4-completo.json', JSON.stringify(data, null, 2), 'utf8');
console.log('OK — l6, l7, l8 añadidas a B9. Total lecciones B9:', b9.lecciones.length);
