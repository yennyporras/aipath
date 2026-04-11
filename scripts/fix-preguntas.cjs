const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/content/m1/index.json','utf8'));

// ─── UTILIDAD ─────────────────────────────────────────────────────────────────
function q(pregunta, opciones, correcta, explicacion_profunda, concepto_reforzado) {
  return { pregunta, opciones, correcta, explicacion_profunda, concepto_reforzado };
}

// ─── B9 l1 — Sesgos en IA y cómo mitigarlos ─────────────────────────────────
const b9 = data.bloques.find(b => b.id === 'm1-b9');
const b9l1 = b9.lecciones[0];

// Expandir explicación de 202w a 300+w
b9l1.contenido.teoria.explicacion = `Los sesgos en los modelos de IA no son accidentales: son consecuencias directas de los datos y procesos con que se entrenan. Hay tres tipos principales de sesgo que todo AI Engineer debe reconocer y mitigar.\n\nSesgo de datos históricos: si los datos de entrenamiento reflejan inequidades pasadas, el modelo las perpetúa y amplifica. El caso más documentado es COMPAS, el sistema de predicción de reincidencia criminal en EEUU, que mostraba tasas de falsos positivos dos veces más altas para personas afroamericanas que para blancas, porque fue entrenado con datos judiciales históricos que reflejan discriminación sistémica. El riesgo añadido es el ciclo de retroalimentación: el modelo niega oportunidades a ciertos grupos, esa ausencia de datos positivos refuerza el patrón en el siguiente ciclo de entrenamiento, amplificando el sesgo original.\n\nSesgo de representación: si ciertos grupos están subrepresentados en los datos, el modelo tiene peor rendimiento para ellos. Los sistemas de reconocimiento facial muestran tasas de error del 35% para mujeres con piel oscura frente a menos del 1% para hombres con piel clara, según el estudio Gender Shades del MIT MediaLab (Joy Buolamwini, 2018). Este hallazgo precipitó revisiones en los productos de Amazon Rekognition, Microsoft Azure y IBM Watson.\n\nSesgo de etiquetado: cuando los anotadores humanos tienen sesgos inconscientes, estos se transfieren sistemáticamente al modelo. Es especialmente difícil de detectar porque los datos parecen correctamente etiquetados.\n\nEstrategias de mitigación en producción: auditar los datos de entrenamiento por representatividad antes de entrenar, medir el rendimiento del modelo desagregado por subgrupos demográficos relevantes, aplicar técnicas de fairness-aware ML (reweighting, resampling o post-processing de outputs), y mantener supervisión humana en decisiones de alto impacto. En Europa, el EU AI Act exige evaluaciones de sesgo documentadas para sistemas de alto riesgo como contratación, crédito y justicia.`;

// Añadir 2 preguntas nuevas (total 5)
b9l1.contenido.verificacion.push(
  q(
    "¿Qué es un ciclo de retroalimentación discriminatorio (feedback loop) en sistemas de IA y por qué es especialmente peligroso?",
    [
      "Cuando el modelo aprende patrones de discriminación histórica, niega oportunidades a ciertos grupos, esa ausencia de datos positivos refuerza el patrón en el siguiente ciclo de entrenamiento, amplificando el sesgo original",
      "Un error técnico en el que el modelo genera el mismo output para todas las entradas similares, reduciendo la variedad de respuestas",
      "El proceso por el que los usuarios reportan sesgos al proveedor del modelo, que los corrige en la siguiente versión",
      "Una técnica de regularización que evita el overfitting al devolver parte de la señal de error al principio del pipeline de entrenamiento"
    ],
    0,
    "El ciclo de retroalimentación discriminatorio es uno de los problemas más difíciles de la IA responsable porque es auto-perpetuante. Ejemplo concreto: un modelo de crédito entrenado con datos históricos niega préstamos a personas de ciertos barrios. Esas personas no acumulan historial crediticio positivo. En el siguiente ciclo de entrenamiento, la ausencia de datos positivos para ese grupo refuerza la predicción de riesgo alto. El modelo del próximo año es más discriminatorio que el del año anterior, aunque nadie haya introducido un sesgo nuevo. Este patrón se documentó en sistemas de justicia penal (COMPAS), sistemas de publicidad de empleo (algoritmos de Facebook que mostraban trabajos bien remunerados más a hombres) y sistemas de precios de seguros (que correlacionaban código postal con raza). La solución técnica requiere intervención explícita: monitoreo continuo de métricas de fairness post-deployment, no solo pre-deployment.",
    "Ciclos de retroalimentación discriminatorios en sistemas de IA"
  ),
  q(
    "¿Qué exige el EU AI Act a los sistemas de alto riesgo respecto a los sesgos, y en qué categorías se incluyen los sistemas más propensos a discriminación?",
    [
      "Solo requiere que el proveedor declare voluntariamente la intención de no discriminar en los términos de servicio del sistema",
      "Exige que el sistema use únicamente datos sintéticos para evitar sesgos históricos de datos reales",
      "Obliga a realizar evaluaciones de sesgo documentadas antes del despliegue; las categorías de alto riesgo incluyen contratación, crédito, justicia y educación",
      "Prohíbe el uso de sistemas de IA en cualquier decisión que involucre características demográficas como género o edad"
    ],
    2,
    "El EU AI Act (Reglamento UE 2024/1689) clasifica como alto riesgo varios tipos de sistemas especialmente propensos a producir discriminación: sistemas de contratación y selección de personal (Anexo III, punto 4), sistemas de scoring crediticio y seguros (Anexo III, punto 5), sistemas de educación y formación (Anexo III, punto 3), y sistemas en el ámbito de la justicia (Anexo III, punto 8). Para estos sistemas, el Art. 10 exige que los datos de entrenamiento, validación y prueba sean relevantes, representativos y estén lo más libres posible de errores y sesgos. El Art. 9 exige un sistema de gestión de riesgos que identifique y mitigue explícitamente riesgos de sesgo antes del despliegue. Esta documentación debe mantenerse actualizada y estar disponible para auditorías regulatorias. No se trata de una declaración de intenciones sino de evidencia técnica verificable.",
    "Obligaciones del EU AI Act respecto a sesgos en sistemas de alto riesgo"
  )
);

// ─── B0 l1-l6: añadir 2 preguntas a cada una ─────────────────────────────────
const b0 = data.bloques.find(b => b.id === 'm1-b0');

// B0-l1: El momento histórico
b0.lecciones[0].contenido.verificacion.push(
  q(
    "Según la lección, ¿cuál es el cambio estructural que diferencia la IA de 2026 de los anteriores ciclos de hype?",
    [
      "La IA de 2026 tiene más parámetros que los modelos anteriores, lo que garantiza resultados más precisos en todos los casos",
      "Los modelos de 2026 por primera vez superan el test de Turing, demostrando inteligencia genuina",
      "La convergencia de modelos con capacidad de razonamiento, costos que cayeron 99% en 5 años, y acceso democrático desde cualquier computadora con internet",
      "El gobierno de EEUU reguló por primera vez los modelos de IA, dando estabilidad al mercado"
    ],
    2,
    "La diferencia entre 2026 y anteriores momentos de hype en IA no es solo tecnológica sino estructural. Los inviernos de IA anteriores ocurrieron porque la tecnología prometía más de lo que podía entregar con la infraestructura disponible. En 2026 se produce la convergencia de tres factores simultáneos: primero, los modelos tienen capacidad real de razonamiento demostrada (Claude 3 Opus superó el 90% de las pruebas de razonamiento humano en 2024); segundo, los costos de acceso a IA cayeron un 99% en 5 años, haciendo viables aplicaciones que antes eran prohibitivamente caras; tercero, el acceso es democrático vía internet sin necesidad de infraestructura propia. Esta convergencia es la razón por la que profesionales sin doctorado en ML pueden construir en una tarde lo que costaba 500,000 USD y 18 meses en 2018.",
    "Factores estructurales que diferencian la IA de 2026 de anteriores ciclos de hype"
  ),
  q(
    "¿Por qué la democratización de la IA es especialmente significativa para profesionales y empresas que no son grandes corporaciones?",
    [
      "Porque el acceso gratuito a modelos eliminó completamente la brecha competitiva con las multinacionales",
      "Porque la IA en 2026 requiere menos conocimiento técnico que antes, eliminando la necesidad de formación especializada",
      "Porque la regulación europea obliga a las grandes corporaciones a compartir sus modelos con startups y pymes",
      "Porque un profesional con conocimiento básico de APIs puede construir hoy lo que antes requería equipos de científicos de datos, infraestructura millonaria y meses de desarrollo"
    ],
    3,
    "La democratización de la IA tiene consecuencias prácticas profundas en la estructura competitiva de los mercados. Anteriormente, la IA era patrimonio de corporaciones con presupuestos de I+D masivos: Google, Meta, Amazon tenían ventajas insalvables en datos, compute y talento. Con la disponibilidad de APIs de modelos de lenguaje de alta capacidad, ese diferencial se ha comprimido significativamente. Una startup con 3 personas puede acceder al mismo modelo base que usa Google internamente, pagar por inferencia en lugar de construir infraestructura, y concentrar su ventaja competitiva en el conocimiento de dominio y los datos propios del negocio. Para los profesionales individuales, esto significa que las habilidades de ingeniería de prompts, integración de APIs y comprensión del comportamiento de los modelos tienen valor de mercado inmediato sin necesidad de años de formación en matemáticas avanzadas de ML.",
    "Impacto de la democratización de la IA en la competitividad de profesionales y pymes"
  )
);

// B0-l2: Línea de tiempo IA
b0.lecciones[1].contenido.verificacion.push(
  q(
    "¿Por qué la victoria de Deep Blue sobre Kasparov en 1997 no marcó el inicio del aprendizaje profundo moderno, aunque fue un hito de IA?",
    [
      "Porque Kasparov demostró después que la partida estaba amañada y los resultados fueron invalidados",
      "Porque Deep Blue usaba búsqueda exhaustiva y reglas programadas manualmente, no aprendizaje de datos; fue IA sin machine learning moderno",
      "Porque el hardware de 1997 no tenía suficiente potencia para generalizar el algoritmo de Deep Blue a otros juegos",
      "Porque IBM no publicó el código de Deep Blue, impidiendo que la comunidad científica validara o extendiera el trabajo"
    ],
    1,
    "Deep Blue fue un hito histórico en IA porque demostró que una máquina podía superar al mejor jugador de ajedrez del mundo. Sin embargo, su arquitectura era radicalmente diferente al aprendizaje profundo moderno. Deep Blue funcionaba mediante búsqueda de árbol de juego (evaluando millones de posiciones por segundo usando minimax con poda alfa-beta) combinada con tablas de aperturas y finales programadas manualmente por expertos en ajedrez. No aprendía de datos: sus evaluaciones de posición fueron codificadas a mano por grandmasters. El verdadero inicio del aprendizaje profundo moderno fue AlexNet en ImageNet (2012), cuando una red neuronal entrenada en datos reales superó por primera vez a los métodos clásicos de visión computacional diseñados por humanos. Deep Blue demostró que las máquinas podían superar a los humanos en tareas complejas; AlexNet demostró que podían aprender a hacerlo sin que humanos programaran las reglas.",
    "Diferencia entre IA simbólica (Deep Blue) y aprendizaje profundo moderno"
  ),
  q(
    "El texto menciona que 'cada vez que una nueva tecnología reduce drásticamente el costo de una tarea cognitiva, los profesionales que se adaptan primero capturan el valor desproporcionado'. ¿Cuál de los siguientes ejemplos históricos ilustra mejor este principio?",
    [
      "Los contadores que aprendieron Excel en 1985 no perdieron su trabajo sino que se convirtieron en analistas financieros más productivos",
      "Los operadores de telégrafo que aprendieron a usar el teléfono en 1900 pudieron mantener sus puestos de trabajo sin cambiar de rol",
      "Los tipógrafos que adoptaron las impresoras láser en los años 80 reemplazaron completamente a los diseñadores gráficos tradicionales",
      "Los programadores que aprendieron COBOL en los años 60 dominaron el mercado de software hasta los años 2000"
    ],
    0,
    "El patrón histórico que describe la lección es consistente en múltiples transiciones tecnológicas: la tecnología que automatiza una tarea cognitiva no elimina a los profesionales que la dominaban, sino que redefine su rol hacia mayor abstracción y estrategia. Los contadores de 1985 que aprendieron Excel no se volvieron obsoletos; se transformaron en analistas financieros capaces de procesar cien veces más datos con el mismo tiempo. Pudieron ofrecer análisis más profundos, escenarios más complejos y recomendaciones más fundamentadas. Los que rechazaron la tecnología sí fueron desplazados, no por Excel sino por los colegas que lo adoptaron. El mismo patrón aplica a diseñadores con Photoshop, abogados con herramientas de búsqueda legal, y ahora a profesionales de cualquier dominio con IA generativa. La lección no es 'aprende IA para no ser reemplazado' sino 'aprende IA para multiplicar el valor que produces con tu conocimiento de dominio'.",
    "Patrón histórico de adaptación profesional a tecnologías que automatizan tareas cognitivas"
  )
);

// B0-l3: Inviernos de IA
b0.lecciones[2].contenido.verificacion.push(
  q(
    "¿Cuáles son los tres factores específicos que, según la lección, hacen imposible un nuevo invierno de IA a corto plazo?",
    [
      "Mayor inversión de capital riesgo, más talento en universidades, y regulación gubernamental más favorable que en los años 80",
      "Datos masivos disponibles (Common Crawl 250TB), cómputo exponencialmente más potente (GPUs), y el cambio paradigmático de reglas explícitas a aprendizaje estadístico",
      "La colaboración entre Google, Microsoft y Anthropic, el interés de los gobiernos en IA nacional, y la adopción de ChatGPT por el público general",
      "El aumento de la velocidad de internet, la reducción del coste del almacenamiento en la nube, y la mejora en interfaces de usuario que facilitan el acceso no técnico"
    ],
    1,
    "La lección identifica tres ventajas estructurales que no existían en los anteriores inviernos de IA. Primera, datos a escala: Common Crawl genera 250 terabytes de texto mensualmente. En 1990 los investigadores querían entrenar modelos pero no existían conjuntos de datos de ese tamaño. Segunda, cómputo adecuado: los GPUs de NVIDIA actuales son millones de veces más rápidos que los CPUs de 1990, haciendo computacionalmente viable lo que antes era imposible. Tercera, el cambio de paradigma: en lugar de que expertos programen reglas explícitas (sistemas expertos que fallaban ante situaciones no previstas), los modelos modernos aprenden patrones estadísticos de datos masivos, lo que les permite generalizar a situaciones nuevas. Este tercer factor es el más fundamental: mientras haya más datos y más cómputo disponibles, los modelos seguirán mejorando sin necesitar que los humanos codifiquen más reglas.",
    "Tres factores estructurales que previenen un nuevo invierno de IA"
  ),
  q(
    "¿Por qué los sistemas expertos de los años 80 funcionaban bien en laboratorio pero fallaban en el mundo real?",
    [
      "Los sistemas expertos requerían codificación manual de cada regla por expertos humanos y no escalaban: no podían manejar situaciones no previstas por esos expertos",
      "Los sistemas expertos usaban hardware demasiado costoso para uso empresarial, limitando su adopción a instituciones académicas con grandes presupuestos",
      "Los sistemas expertos solo funcionaban en inglés y no podían adaptarse a otros idiomas, limitando su aplicabilidad en mercados internacionales",
      "Los sistemas expertos dependían de conexión a internet para acceder a bases de conocimiento remotas, lo cual no era viable en los años 80"
    ],
    0,
    "Los sistemas expertos de los años 80 representaron el segundo ciclo de optimismo en IA. Funcionaban construyendo bases de conocimiento con reglas lógicas (si X entonces Y) programadas manualmente por expertos en el dominio. En laboratorio, para problemas acotados y bien definidos, producían resultados impresionantes: diagnóstico médico en oncología, configuración de equipos industriales, análisis de estructuras geológicas. El problema era la fragilidad: el mundo real está lleno de casos edge, situaciones ambiguas y contextos que los expertos no previeron. Cada nuevo caso no cubierto requería volver a programar más reglas. El mantenimiento del sistema se volvía exponencialmente más costoso a medida que crecía en alcance. Los sistemas expertos no podían aprender ni adaptarse: eran perfectamente rígidos. El contraste con el aprendizaje estadístico moderno es total: un LLM puede manejar millones de casos edge simplemente porque los vio en los datos de entrenamiento, sin que nadie programara una regla para cada uno.",
    "Por qué los sistemas expertos de los 80 no escalaban al mundo real"
  )
);

// B0-l4: Impacto económico
b0.lecciones[3].contenido.verificacion.push(
  q(
    "¿Qué estima McKinsey sobre el impacto de la IA generativa en la productividad de los trabajadores del conocimiento?",
    [
      "Un aumento de productividad del 40% entre 2024 y 2030 para empresas que adopten IA generativa",
      "Un aumento de productividad del 15% para todos los trabajadores, independientemente del sector o nivel de adopción",
      "Una reducción del 25% en plantilla en todos los sectores que adopten IA generativa antes de 2030",
      "Un aumento del PIB global del 7% derivado exclusivamente de la automatización de tareas rutinarias"
    ],
    0,
    "El informe de McKinsey Global Institute sobre IA generativa (2023, actualizado 2024) calcula que las empresas que adopten IA generativa en su flujo de trabajo verán un incremento de productividad del 40% en trabajadores del conocimiento entre 2024 y 2030. Esta cifra no implica que el 40% de los trabajadores sean reemplazados, sino que cada trabajador puede producir un 40% más con el mismo tiempo, o completar el mismo trabajo en significativamente menos tiempo. Los sectores con mayor impacto proyectado son: software y tecnología (hasta 45-50% de productividad aumentada), servicios financieros (35-40%), servicios profesionales como legal y consultoría (30-40%), y marketing y ventas (30-35%). Para empresas, esto implica que la adopción de IA generativa en workflows existentes es una de las inversiones con mayor ROI disponibles en 2026, por delante de contratar personal adicional para el mismo incremento de output.",
    "Proyección McKinsey de impacto de IA generativa en productividad"
  ),
  q(
    "¿Qué es el 'efecto de arbitraje' mencionado en relación al impacto económico de la IA, y por qué crea un ROI proporcionalmente mayor en economías emergentes?",
    [
      "El arbitraje regulatorio por el que empresas mueven operaciones a países con menor regulación de IA para reducir costos de cumplimiento",
      "El arbitraje cambiario que permite a empresas europeas comprar servicios de IA más baratos en mercados emergentes al pagar en divisas fuertes",
      "Las herramientas de IA tienen precios en moneda fuerte (USD/EUR) pero los costos laborales que reemplazan están en monedas locales más débiles, haciendo el punto de equilibrio mucho más rápido en economías emergentes",
      "La posibilidad de usar modelos de IA entrenados en mercados desarrollados para competir directamente con empresas de esos mercados sin pagar aranceles tecnológicos"
    ],
    2,
    "El efecto de arbitraje descrito en la lección es un fenómeno económico concreto: las herramientas de IA (APIs, plataformas, licencias) tienen precios denominados en USD o EUR porque se desarrollan principalmente en EEUU y Europa. Pero el trabajo que automatizan está remunerado en costos locales. En el ejemplo de la lección: un sistema de atención al cliente con IA que cuesta 200 USD al mes puede reemplazar trabajo que en una economía emergente cuesta 800 USD al mes, pero el mismo sistema en EEUU reemplaza trabajo que cuesta 4,000 USD al mes. El ROI existe en ambos casos, pero el punto de equilibrio se alcanza mucho más rápido cuando el costo del trabajo reemplazado es bajo en términos de dólares. Esto crea una paradoja: las economías con menores salarios tienen mayor ROI de adopción de IA, no menor, lo que puede acelerar la transformación digital en mercados emergentes más rápido de lo que ocurrió en economías desarrolladas.",
    "Efecto de arbitraje en el ROI de adopción de IA en economías emergentes"
  )
);

// B0-l5: IA en LATAM
b0.lecciones[4].contenido.verificacion.push(
  q(
    "¿Qué es el concepto de 'leapfrog' aplicado a LATAM y la adopción de IA, y cuál es el ejemplo tecnológico previo que se menciona?",
    [
      "La capacidad de LATAM de saltar etapas de desarrollo tecnológico, como ocurrió con los móviles: la región adoptó smartphones directamente sin pasar por décadas de telefonía fija masiva",
      "El proceso por el que startups latinoamericanas crecen más rápido que las europeas al tener menores costos operativos y regulaciones más flexibles",
      "La tendencia de los gobiernos latinoamericanos a adoptar regulaciones de IA europeas directamente sin adaptarlas al contexto local",
      "El salto generacional en educación que permite a jóvenes en LATAM aprender IA sin haber pasado por programación tradicional"
    ],
    0,
    "El leapfrogging tecnológico es el fenómeno por el que economías emergentes adoptan tecnologías de última generación sin pasar por las etapas intermedias que recorrieron las economías desarrolladas. El ejemplo más citado es la telefonía móvil en África y Asia: países con infraestructura de telefonía fija escasa adoptaron smartphones y banca móvil directamente, saltando décadas de inversión en cables de cobre e infraestructura bancaria física. En LATAM, el leapfrog anterior más relevante fue precisamente la adopción masiva de smartphones: muchos latinoamericanos tuvieron su primer acceso a internet a través del móvil, no del ordenador de escritorio. La lección aplica esto a la IA: empresas latinoamericanas con procesos manuales (más del 60% de pymes colombianas operando con Excel) pueden saltar directamente a flujos de trabajo con IA sin necesidad de pasar por décadas de transformación digital gradual, adoptando soluciones de IA que sus contrapartes europeas tardaron 10 años en desarrollar.",
    "Concepto de leapfrog tecnológico aplicado a adopción de IA en LATAM"
  ),
  q(
    "De las oportunidades sectoriales específicas mencionadas en la lección para LATAM, ¿cuál tiene el argumento más claro de democratización de acceso?",
    [
      "Agtech, porque Colombia tiene superficie cultivable infrautilizada que solo necesita inversión de capital",
      "Fintech, porque el 35% de los colombianos sin cuenta bancaria puede acceder a microcrédito cuando la IA reduce el costo del scoring crediticio alternativo en un 90%",
      "Industria manufacturera, porque los robots con IA pueden reemplazar trabajo manual repetitivo a menor costo que en Europa",
      "Turismo, porque los asistentes de IA pueden atender a turistas en múltiples idiomas sin necesidad de contratar guías adicionales"
    ],
    1,
    "De los sectores mencionados en la lección, el caso de Fintech tiene el argumento más directo de democratización de acceso a servicios. El 35% de los colombianos sin acceso a cuenta bancaria no está excluido por falta de voluntad sino por la ecuación económica del sistema financiero: el costo de evaluar el riesgo crediticio de personas sin historial bancario formal supera el margen potencial de microcréditos pequeños. Cuando la IA reduce ese costo de scoring alternativo en un 90% (usando datos alternativos como patrones de uso del móvil, historial de pagos de servicios, o comportamiento en plataformas digitales), la ecuación cambia: los microcréditos a poblaciones no bancarizadas se vuelven económicamente viables para las instituciones financieras. Esto no es solo un caso de uso de IA: es un mecanismo de inclusión financiera con impacto social medible. El argumento de Agtech (democratizar agronomía de precisión) y Educación (tutores adaptativos) son igualmente válidos, pero el de Fintech tiene el número más concreto de impacto potencial.",
    "Oportunidad de inclusión financiera a través de IA en LATAM"
  )
);

// B0-l6: Tu lugar en este momento histórico
b0.lecciones[5].contenido.verificacion.push(
  q(
    "Según el marco de 'ventanas de oportunidad' descrito en la lección, ¿cuál es la característica definitoria de la tercera ventana (2024-2027) en la que estamos ahora?",
    [
      "Es la ventana para los investigadores que quieren crear nuevos modelos base desde cero con algoritmos innovadores",
      "Es la ventana para los ingenieros que construyeron las primeras aplicaciones antes de que el mercado se saturara de competidores",
      "Es la ventana más técnica: requiere dominar matemáticas de ML y acceso a clusters de GPUs para ser competitivo",
      "Es la ventana para los profesionales de dominio que entienden sus industrias Y pueden usar IA: el abogado que automatiza contratos, el médico que construye diagnóstico asistido"
    ],
    3,
    "La lección describe cuatro ventanas de oportunidad secuenciales en IA. La primera (2015-2020) fue para investigadores académicos con doctorados en ML que construyeron los modelos base, una ventana ya cerrada. La segunda (2020-2023) fue para ingenieros que construyeron las primeras aplicaciones comerciales sobre esos modelos, una ventana que está cerrando. La tercera ventana (2024-2027), donde estamos ahora, es la más grande y la más larga según la lección, y está abierta para los profesionales de dominio: personas que tienen conocimiento profundo de una industria o función (derecho, medicina, finanzas, educación, marketing) y adquieren suficiente competencia en IA para implementar soluciones en ese dominio. Esta combinación, conocimiento de dominio más capacidad de implementación con IA, es escasa y altamente valorada porque los ingenieros de IA no tienen el conocimiento de dominio y los expertos del dominio no tienen las habilidades de IA. La cuarta ventana (2027+) será para las empresas que adopten masivamente, cuando la IA sea tan común como el email.",
    "Caracterización de la tercera ventana de oportunidad en IA (2024-2027)"
  ),
  q(
    "¿Cuál es el patrón de adopción de IA que consistentemente produce los mejores resultados en empresas de cualquier tamaño, según la lección?",
    [
      "Iniciar con una transformación digital completa de todos los procesos antes de introducir IA, para asegurar una base tecnológica sólida",
      "Contratar primero un equipo dedicado de Data Scientists para construir la infraestructura interna antes de cualquier despliegue",
      "Identificar el primer caso de uso con ROI obvio, ejecutarlo, lograr una victoria rápida, y escalar desde ese primer éxito",
      "Esperar a que los competidores adopten IA primero para aprender de sus errores y evitar invertir en tecnología inmadura"
    ],
    2,
    "La lección describe un patrón concreto de adopción exitosa de IA que se repite en startups y corporaciones de todos los sectores: comenzar pequeño, demostrar valor rápido, y escalar. El error más común en la adopción de IA en empresas es intentar comenzar con una transformación completa: auditar todos los procesos, construir infraestructura de datos perfecta, contratar equipos especializados, y solo entonces desplegar. Este proceso tarda típicamente 12-24 meses y genera frustración antes de ningún resultado visible. El patrón victorioso es diferente: identificar el problema más doloroso y visible de la organización donde la IA puede dar resultados en 4-8 semanas, ejecutarlo con los recursos disponibles, medir el ROI, y usar ese caso de éxito como evidencia y momentum para la segunda iniciativa. Las empresas líderes en adopción de IA, independientemente de su tamaño, siguieron este patrón. La velocidad de la primera victoria importa más que la perfección de la solución inicial.",
    "Patrón de victoria rápida y escala en adopción exitosa de IA empresarial"
  )
);

// ─── B5: añadir 2 preguntas a cada lección ────────────────────────────────────
const b5 = data.bloques.find(b => b.id === 'm1-b5');

// B5-l1: Por qué los datos importan más que el modelo
b5.lecciones[0].contenido.verificacion.push(
  q(
    "¿Qué son los 'datos propios' (proprietary data) y por qué se describen como el 'moat' competitivo de las empresas que usan IA?",
    [
      "Los datos propios son los datasets de entrenamiento comprados a proveedores especializados, que son costosos y difíciles de replicar por competidores con menos capital",
      "Los datos propios son los modelos base entrenados internamente, que las grandes empresas desarrollan para no depender de proveedores externos",
      "Los datos propios son los registros históricos exclusivos de la empresa (conversaciones con clientes, procesos internos, decisiones pasadas) que ningún competidor puede replicar y que diferencian la IA contextualizada de la genérica",
      "Los datos propios son las métricas de rendimiento del modelo que cada empresa calibra internamente para su caso de uso específico"
    ],
    2,
    "El concepto de 'data moat' es uno de los más importantes en estrategia de IA empresarial. Cuando dos competidores usan el mismo modelo base (por ejemplo, ambos acceden a Claude vía API), lo que diferencia sus aplicaciones no es el modelo sino los datos con los que lo contextualizan. Una empresa de servicios legales que acumula 10 años de contratos revisados, con anotaciones de los abogados sobre cláusulas problemáticas y resoluciones de casos, tiene un dataset que ningún competidor puede replicar simplemente contratando a Anthropic. Ese dataset, combinado con el modelo base, produce un asistente legal que entiende el contexto específico de esa firma. La lección de Peter Norvig ('no tenemos mejores algoritmos, tenemos más datos') aplica aquí con una dimensión estratégica: no se trata solo de tener más datos sino de tener datos únicos e irreplicables que son el resultado de años de operación. Esta es la razón por la que las empresas con mayor tracción histórica tienen una ventaja estructural en IA, no solo las que más invierten en modelos.",
    "Data moat: datos propios como ventaja competitiva sostenible en IA empresarial"
  ),
  q(
    "Si tienes que elegir entre un modelo de IA más potente con datos de mala calidad y un modelo más simple con datos excelentes, ¿qué recomienda el principio descrito en la lección y por qué?",
    [
      "Siempre el modelo más potente, porque tiene mayor capacidad para corregir datos de mala calidad mediante sus mecanismos internos de atención",
      "Siempre el modelo más simple con datos excelentes, porque los modelos simples son más fáciles de auditar para cumplimiento regulatorio",
      "Primero invertir en mejorar los datos; modelos más simples con datos excelentes frecuentemente superan a modelos complejos con datos mediocres",
      "El modelo más potente con datos mediocres, porque el fine-tuning posterior con datos de alta calidad compensará las deficiencias iniciales"
    ],
    2,
    "El principio 'garbage in, garbage out' tiene una consecuencia práctica directa para las decisiones de arquitectura de proyectos de IA: la inversión en calidad de datos tiene mayor retorno que la inversión en modelos más complejos cuando los datos son el cuello de botella. Múltiples estudios prácticos (incluyendo el trabajo del equipo de Phi de Microsoft en 2023) han demostrado que modelos relativamente pequeños entrenados o fine-tuned con datos de alta calidad superan a modelos mucho más grandes entrenados con datos ruidosos o de baja calidad en tareas específicas. La razón es conceptualmente clara: un modelo complejo simplemente aprende mejor los patrones incorrectos de los datos malos, generalizando errores con más sofisticación. Un modelo simple con datos limpios aprende patrones correctos que generaliza bien. Para proyectos empresariales con presupuesto limitado, esto implica una priorización: antes de pagar por el modelo más costoso, invertir en curation de datos, limpieza y etiquetado de calidad puede producir mejores resultados a menor coste.",
    "Principio de calidad de datos sobre complejidad del modelo en proyectos de IA"
  )
);

// B5-l2: Datasets famosos
b5.lecciones[1].contenido.verificacion.push(
  q(
    "¿Qué es Common Crawl y por qué es la base de prácticamente todos los LLMs modernos?",
    [
      "Common Crawl es la base de datos de patentes tecnológicas que los modelos usan para aprender sobre invenciones recientes",
      "Common Crawl es un proyecto de pago de Google que rastrea el internet y vende acceso a los datos a empresas de IA para preentrenamiento",
      "Common Crawl es un proyecto sin fines de lucro que rastrea el internet mensualmente generando 250TB de texto, siendo la fuente de preentrenamiento de GPT-3, LLaMA, Mistral y la mayoría de LLMs",
      "Common Crawl es la colección de libros digitalizados por Google Books que proporciona contexto literario y científico a los modelos de lenguaje"
    ],
    2,
    "Common Crawl es una organización sin fines de lucro que desde 2008 rastrea el internet de forma continua y publica los datos resultantes como dataset público y gratuito. Mensualmente genera aproximadamente 250 terabytes de contenido web en decenas de idiomas, acumulando petabytes de datos a lo largo de los años. GPT-3 (OpenAI), LLaMA (Meta), Mistral y prácticamente todos los modelos open source usaron Common Crawl como componente principal de su preentrenamiento. El valor de Common Crawl es su escala y diversidad: contiene texto de prácticamente todos los dominios, idiomas y estilos de escritura presentes en la web. Sin embargo, tiene limitaciones importantes: la calidad es heterogénea (incluye spam, contenido de baja calidad, información incorrecta), está sesgado hacia el inglés, y requiere pipelines de filtrado y limpieza significativos antes de usarse para entrenamiento. Proyectos como C4 (Colossal Clean Crawled Corpus) y The Pile son versiones procesadas y filtradas de Common Crawl diseñadas específicamente para preentrenamiento de LLMs.",
    "Common Crawl: fuente principal de preentrenamiento de LLMs modernos"
  ),
  q(
    "¿Qué lección práctica enseña el hecho de que un clasificador de MNIST con '99% de accuracy' sea insuficiente para producción real?",
    [
      "Que los datasets de benchmarking académico no son representativos de condiciones de producción reales, y que el accuracy en benchmark no predice rendimiento real",
      "Que los modelos de visión computacional nunca pueden superar el 99% de accuracy, lo que hace inviable su uso en producción",
      "Que MNIST es un dataset desactualizado que debe reemplazarse con datasets más modernos para cualquier evaluación de modelos",
      "Que las métricas de clasificación son inherentemente superiores a las métricas de regresión para evaluar modelos de producción"
    ],
    0,
    "El caso de MNIST ilustra un principio fundamental en ML de producción: el overfitting al benchmark. MNIST contiene dígitos escritos en condiciones controladas, limpios, centrados, con iluminación uniforme. El mundo real tiene dígitos escritos con bolígrafo de tinta baja, inclinados, en formularios escaneados con mala calidad, mezclados con manchas, etc. Un modelo con 99% de accuracy en MNIST puede tener 70% de accuracy en dígitos manuscritos de formularios fiscales reales. Esta brecha entre benchmark y producción es sistémica en ML, no específica de MNIST. El ImageNet-trained model que falla con imágenes de smartphones, el modelo de NLP con 95% en el benchmark de GLUE que falla con el español de Chile, el detector de fraude con alto AUC en el dataset de entrenamiento que falla con patrones de fraude nuevos. La lección práctica es siempre evaluar en datos representativos del contexto de despliegue real, no solo en el benchmark estándar del campo, y definir métricas de éxito basadas en el caso de uso específico.",
    "Brecha entre accuracy en benchmark y rendimiento en producción real"
  )
);

// B5-l3: Cómo se recopilan datos de entrenamiento
b5.lecciones[2].contenido.verificacion.push(
  q(
    "¿Por qué los modelos de lenguaje grandes generalmente tienen mejor rendimiento en inglés que en otros idiomas, incluso cuando han sido entrenados en datos multilingüe?",
    [
      "Porque el inglés tiene una gramática más simple y regular que otros idiomas, facilitando el aprendizaje del modelo",
      "Porque el inglés fue el primer idioma en el que se entrenaron modelos, y ese conocimiento no puede transferirse a otros idiomas",
      "Porque el inglés representa la mayor proporción de datos en Common Crawl y otras fuentes de preentrenamiento, con más textos, más diversidad y más pares de pregunta-respuesta de alta calidad",
      "Porque los equipos de investigación que diseñan los modelos son principalmente angloparlantes y optimizan las arquitecturas para el inglés"
    ],
    2,
    "El rendimiento diferencial de los LLMs por idioma es directamente proporcional a la representación de ese idioma en los datos de preentrenamiento. Common Crawl, que es la base de la mayoría de los LLMs, refleja la distribución del contenido de internet: aproximadamente el 45-50% en inglés, con descensos pronunciados para cada otro idioma. Esto tiene consecuencias concretas: el modelo ha visto miles de millones de ejemplos de razonamiento complejo, código, argumentación legal y análisis científico en inglés. En español, ha visto quizás el 5-8% de esa cantidad, y en idiomas menos representados digitalmente la proporción es aún menor. Las capacidades emergentes de los modelos (razonamiento encadenado, seguir instrucciones complejas, calibración de incertidumbre) emergen en inglés a ciertos niveles de escala pero requieren más parámetros y más datos para emerger en otros idiomas. Para aplicaciones en español, francés, alemán u otros idiomas, esto implica evaluar el modelo específicamente en el idioma objetivo, considerar modelos con mayor entrenamiento multilingüe (como algunos modelos de Mistral o Meta) y a veces preferir un modelo más pequeño pero mejor calibrado en el idioma específico.",
    "Desigualdad de rendimiento por idioma en LLMs y su origen en los datos de preentrenamiento"
  ),
  q(
    "¿Qué es RLHF (Reinforcement Learning from Human Feedback) y por qué fue la innovación que transformó los modelos base en asistentes útiles?",
    [
      "RLHF es una técnica para reducir el tamaño de los modelos mediante retroalimentación humana sobre qué partes del modelo son menos importantes",
      "RLHF es el proceso de entrenar un modelo de recompensa con preferencias humanas entre pares de respuestas, y usar ese modelo para guiar al LLM hacia respuestas que los humanos prefieren",
      "RLHF es un método de evaluación en el que humanos puntúan el modelo en tareas específicas para determinar su nivel de capacidad antes del despliegue",
      "RLHF es la técnica que permite a los modelos aprender continuamente de las interacciones con usuarios en producción sin necesidad de reentrenamiento"
    ],
    1,
    "Los modelos base de lenguaje preentrenados en Common Crawl y texto de internet aprenden a predecir el siguiente token, lo que los hace competentes completando texto pero no necesariamente útiles como asistentes. Un modelo base puede completar 'Las instrucciones para hacer una bomba son...' de forma técnicamente coherente porque ese tipo de texto existe en los datos de entrenamiento. RLHF (Reinforcement Learning from Human Feedback), desarrollado por OpenAI y aplicado en InstructGPT (2022) y luego en ChatGPT, transforma esto. El proceso tiene tres etapas: primero, recopilar demostraciones de respuestas de alta calidad de anotadores humanos para fine-tuning supervisado. Segundo, recopilar comparaciones humanas entre pares de respuestas para entrenar un modelo de recompensa que aprende qué respuestas prefieren los humanos. Tercero, usar ese modelo de recompensa como señal de reward en reinforcement learning para optimizar el LLM hacia respuestas más preferidas. El resultado es un modelo que sigue instrucciones, evita daños, es más honesto sobre sus limitaciones y produce respuestas genuinamente útiles, en lugar de simplemente completar texto de forma estadísticamente plausible.",
    "RLHF: transformación de modelos base en asistentes útiles mediante preferencias humanas"
  )
);

// B5-l4: Calidad vs cantidad
b5.lecciones[3].contenido.verificacion.push(
  q(
    "¿Cómo cambió el debate sobre calidad vs cantidad en datasets entre 2022 y 2023, y qué modelo fue el punto de inflexión?",
    [
      "El debate no cambió: la cantidad siempre ha sido el factor dominante y los modelos más grandes siguen siendo superiores",
      "El paper de Chinchilla (2022) demostró que los modelos estaban subentrenados, y Phi-1 (2023) de Microsoft mostró que 1.3B parámetros con datos de alta calidad superaban a modelos 10x más grandes con datos genéricos",
      "Los modelos más pequeños siempre fueron superiores pero la industria ignoró esa evidencia por intereses comerciales de las grandes empresas de hardware",
      "El cambio ocurrió cuando se descubrió que Common Crawl contenía datos duplicados, invalidando resultados previos de modelos grandes"
    ],
    1,
    "Hasta 2022, la intuición dominante era que más datos y más parámetros siempre producían mejores modelos. GPT-3 con 175B parámetros entrenado en 500GB había establecido ese paradigma. El paper de Chinchilla de DeepMind (2022) fue la primera señal de quiebre: demostró que los modelos de la época estaban subentrenados, que para un presupuesto computacional dado era mejor entrenar un modelo más pequeño en más datos que un modelo grande en datos insuficientes. Pero fue Phi-1 de Microsoft Research (2023) el punto de inflexión más dramático en el argumento de calidad: un modelo de solo 1.3 mil millones de parámetros, entrenado en datos de código cuidadosamente curados y generados sintéticamente para maximizar calidad pedagógica, superó a modelos de 10-100 veces más parámetros entrenados en datos de código sin curar. El paper de Phi-1 argumentó que los datos de alta calidad eran el factor limitante, no el tamaño del modelo. Esto inició una línea de investigación sobre 'textbooks are all you need': datos que enseñan conceptos de forma clara, progresiva y sin ruido, producen modelos con mejor comprensión que datos masivos de baja calidad.",
    "Phi-1 y el punto de inflexión hacia datos de calidad sobre cantidad en 2023"
  ),
  q(
    "¿Qué es el 'catastrophic forgetting' y cuál es su implicación práctica para proyectos de fine-tuning empresarial?",
    [
      "El catastrophic forgetting es cuando el modelo olvida el idioma del usuario original después de un fine-tuning en otro idioma",
      "El catastrophic forgetting es cuando el modelo, al ser fine-tuneado en datos específicos del dominio, degrada su rendimiento en tareas generales que sabía hacer antes del fine-tuning",
      "El catastrophic forgetting es cuando el modelo olvida los datos de entrenamiento después de varias semanas en producción por limitaciones de memoria de los servidores",
      "El catastrophic forgetting ocurre cuando el batch size es demasiado grande durante el fine-tuning, haciendo que el modelo memorice en lugar de generalizar"
    ],
    1,
    "El catastrophic forgetting es uno de los problemas más importantes del aprendizaje continuo en redes neuronales. Cuando entrenas (fine-tuneas) un modelo en un dataset específico, el proceso de optimización actualiza los pesos para minimizar el error en ese nuevo dataset. Si el fine-tuning es demasiado agresivo o los nuevos datos son muy diferentes a los originales, los pesos que codificaban el conocimiento previo del modelo se sobreescriben. Un LLM fine-tuneado agresivamente en conversaciones de soporte técnico de una empresa puede perder su capacidad de razonamiento matemático, su comprensión de código, o su habilidad para responder en múltiples idiomas, porque esas capacidades dependían de pesos que fueron alterados. Las técnicas para mitigar este problema incluyen: usar learning rates muy bajos durante el fine-tuning (para cambiar los pesos gradualmente), técnicas como LoRA o QLoRA que fine-tunean solo un subconjunto pequeño de parámetros añadidos, y evaluar el modelo en el conjunto de capacidades generales antes y después del fine-tuning para detectar degradación.",
    "Catastrophic forgetting: degradación de capacidades generales durante fine-tuning"
  )
);

// B5-l5: Data augmentation
b5.lecciones[4].contenido.verificacion.push(
  q(
    "¿Cuáles son las técnicas estándar de data augmentation en visión computacional y cuánto puede multiplicar el tamaño efectivo del dataset?",
    [
      "Solo se permite rotación 90° y volteo horizontal; otras transformaciones distorsionan las características que el modelo debe aprender",
      "Rotación, volteo, cambios de brillo/contraste, recortes aleatorios, zoom y ruido gaussiano; una sola imagen puede generar decenas de variaciones útiles para entrenamiento",
      "Data augmentation en visión solo funciona para imágenes médicas; para otros dominios introduce demasiado ruido artificial",
      "Las técnicas de augmentation solo son aplicables antes del preentrenamiento, no durante el fine-tuning de modelos especializados"
    ],
    1,
    "Data augmentation en visión computacional es una práctica estándar desde AlexNet (2012). Las técnicas incluyen: rotaciones (cualquier ángulo, no solo 90°), volteo horizontal o vertical (según si es invariante al contexto; una radiografía de tórax no debería voltearse verticalmente pero sí horizontalmente), ajustes de brillo, contraste, saturación y tono, recortes aleatorios (crop), zoom in/out, traslaciones, ruido gaussiano añadido, y transformaciones más avanzadas como CutMix (mezclar partes de dos imágenes) o RandAugment. El impacto en el tamaño efectivo del dataset puede ser dramático: una biblioteca de 1,000 imágenes con augmentation agresiva puede entrenar un modelo como si tuviera 50,000-100,000 imágenes, porque cada epoch de entrenamiento ve versiones ligeramente diferentes de cada imagen, forzando al modelo a aprender características invariantes a esas transformaciones en lugar de memorizar los ejemplos exactos. Para texto, las técnicas equivalentes (back-translation, paraphrase generation, swap de sinónimos) tienen impacto menor porque el texto tiene menos redundancia visual, pero siguen siendo útiles cuando los datos de entrenamiento son escasos.",
    "Técnicas de data augmentation en visión computacional y su impacto en tamaño efectivo del dataset"
  ),
  q(
    "¿Cuál es el riesgo principal de usar datos sintéticos generados por LLMs para entrenar otros modelos de IA?",
    [
      "Los datos sintéticos siempre tienen peor calidad que los datos reales y reducen el rendimiento del modelo en todos los casos",
      "Los datos sintéticos generados por LLMs pueden amplificar los sesgos del modelo generador si no se revisan, y el modelo entrenado puede 'colapsar' al aprender solo los patrones del generador en lugar de la diversidad real del dominio",
      "Los datos sintéticos generados por LLMs no pueden usarse para fine-tuning por restricciones legales de los términos de servicio de todos los proveedores",
      "Los LLMs solo pueden generar datos sintéticos en inglés, limitando su utilidad para proyectos en otros idiomas"
    ],
    1,
    "Los datos sintéticos generados por LLMs son una herramienta poderosa para escalar datasets cuando los datos reales son escasos, pero tienen un riesgo específico conocido como 'model collapse' o colapso del modelo. Cuando un modelo es entrenado en datos generados por otro modelo, aprende los patrones del generador, incluyendo sus sesgos, sus puntos ciegos y sus preferencias de formato. Si ese modelo entrenado se usa luego para generar más datos sintéticos, los sesgos se amplifican en cada generación. El resultado es un modelo que produce output cada vez más homogéneo y alejado de la distribución real del dominio. Un estudio de 2023 (Shumailov et al., 'The Curse of Recursion') demostró empíricamente este colapso en modelos entrenados iterativamente en sus propios outputs. La mitigación requiere: mezclar datos sintéticos con datos reales en proporción controlada (nunca 100% sintéticos), revisar los datos sintéticos antes del entrenamiento para filtrar anomalías y sesgos evidentes, y evaluar el modelo resultante en distribuciones de datos reales que el generador no vio.",
    "Riesgo de model collapse en entrenamiento con datos sintéticos generados por LLMs"
  )
);

// B5-l6: Bases de datos vectoriales
b5.lecciones[5].contenido.verificacion.push(
  q(
    "¿Qué es la similitud coseno y por qué es la métrica de distancia más usada en búsqueda semántica con embeddings?",
    [
      "La similitud coseno mide el ángulo entre dos vectores de embeddings: un valor cercano a 1 indica alta similitud semántica, independientemente de la magnitud de los vectores",
      "La similitud coseno es la suma de los productos de los componentes de dos vectores, y se usa porque es computacionalmente más rápida que otras métricas",
      "La similitud coseno mide la distancia euclidiana entre dos puntos en el espacio vectorial, siendo 0 para vectores idénticos y 1 para vectores completamente diferentes",
      "La similitud coseno es específica de OpenAI y solo funciona con embeddings del modelo text-embedding-ada-002"
    ],
    0,
    "La similitud coseno calcula el coseno del ángulo entre dos vectores en el espacio de embeddings. Si dos vectores apuntan en exactamente la misma dirección (ángulo de 0°), su similitud coseno es 1.0, indicando máxima similitud semántica. Si apuntan en direcciones opuestas (180°), la similitud es -1.0. Si son perpendiculares (90°), la similitud es 0. La razón por la que se prefiere la similitud coseno sobre la distancia euclidiana en búsqueda semántica es que es invariante a la magnitud: dos textos con el mismo significado pero diferente longitud tendrán embeddings de diferente magnitud (el texto largo tendrá un vector más grande) pero apuntarán en la misma dirección, dando similitud coseno alta. La distancia euclidiana penalizaría esa diferencia de magnitud falsamente. Para la búsqueda de documentos similares, lo que importa es la dirección semántica, no el tamaño del vector. La mayoría de las bases de datos vectoriales modernas (Pinecone, Weaviate, pgvector) implementan búsqueda de vecinos más cercanos aproximada (ANN) usando similitud coseno como métrica por defecto.",
    "Similitud coseno como métrica fundamental en búsqueda semántica con embeddings"
  ),
  q(
    "¿Cuándo es más apropiado usar pgvector (extensión de PostgreSQL) en lugar de una base de datos vectorial dedicada como Pinecone?",
    [
      "Siempre: pgvector es la solución más eficiente para todos los casos de uso y las bases de datos vectoriales dedicadas son innecesariamente costosas",
      "Cuando ya tienes una infraestructura PostgreSQL, el volumen de vectores es moderado (menos de algunos millones) y quieres evitar la complejidad operativa de gestionar un servicio adicional",
      "Solo cuando el sistema procesa texto en español, ya que Pinecone tiene problemas conocidos con idiomas que no sean inglés",
      "Cuando el presupuesto de infraestructura es superior a 10,000 EUR mensuales, que es el umbral a partir del cual pgvector es económicamente viable"
    ],
    1,
    "La elección entre pgvector y una base de datos vectorial dedicada como Pinecone es una decisión de arquitectura con trade-offs claros. pgvector es una extensión de PostgreSQL que añade tipos de datos vectoriales e índices (IVFFlat, HNSW) para búsqueda semántica. Sus ventajas son: zero overhead operativo si ya usas PostgreSQL (un servicio menos que gestionar), joins directos con datos relacionales (puedes filtrar por metadatos SQL en la misma query que busca por similitud vectorial), y menor coste para volúmenes moderados. Sus limitaciones son: rendimiento de búsqueda más lento que soluciones dedicadas a partir de decenas de millones de vectores, y menos opciones de configuración de índices para casos de uso avanzados. Pinecone y Weaviate brillan cuando el volumen es masivo (cientos de millones de vectores), la latencia de búsqueda es crítica (sub-10ms), o se necesitan capacidades avanzadas de filtrado vectorial. Para la mayoría de proyectos empresariales en etapa inicial con PostgreSQL existente (como el stack de Supabase con pgvector mencionado en la lección), pgvector es la elección pragmática correcta: evita sobre-ingeniería prematura y permite escalar a soluciones dedicadas cuando el volumen lo justifique.",
    "Criterios para elegir entre pgvector y bases de datos vectoriales dedicadas"
  )
);

// B5-l7: RAG
b5.lecciones[6].contenido.verificacion.push(
  q(
    "¿Qué es el 'chunking' en un pipeline RAG y por qué la estrategia de chunking tiene un impacto crítico en la calidad de las respuestas?",
    [
      "El chunking es el proceso de comprimir vectores de embeddings para reducir el uso de memoria en la base de datos vectorial",
      "El chunking es la división del documento fuente en fragmentos antes de generar embeddings; si los chunks son demasiado grandes pierden precisión en la búsqueda, y si son demasiado pequeños pierden contexto semántico",
      "El chunking es la técnica de paralelizar las llamadas a la API de embeddings para reducir la latencia del pipeline de indexación",
      "El chunking es el nombre del proceso de eliminar duplicados en el dataset antes de la indexación vectorial"
    ],
    1,
    "El chunking es una de las decisiones más importantes y menos discutidas del diseño de sistemas RAG. El proceso divide el documento fuente (un contrato, un manual técnico, una base de conocimiento) en fragmentos que se convierten en embeddings individuales. El tamaño del chunk crea un trade-off directo: chunks muy grandes (ej: páginas enteras) producen embeddings que promedian el significado de mucho texto, haciendo la búsqueda menos precisa (el embedding de una página sobre un tema mezcla demasiados conceptos). Chunks muy pequeños (ej: oraciones individuales) pueden perder el contexto necesario para responder preguntas: la respuesta a 'cuál es el proceso de devolución' puede estar distribuida en 5 oraciones separadas que un chunk de oración individual no captura. La estrategia estándar en 2026 usa chunks de 256-512 tokens con solapamiento (overlap) de 50-100 tokens entre chunks consecutivos, para que las ideas que se extienden entre dos chunks sean capturadas por ambos. Estrategias más avanzadas incluyen chunking semántico (dividir por párrafos o secciones lógicas) y el patrón parent-child (indexar chunks pequeños pero recuperar el chunk padre más grande al hacer la búsqueda).",
    "Estrategia de chunking en RAG: trade-off entre precisión de búsqueda y contexto semántico"
  ),
  q(
    "¿Cuál es la diferencia fundamental entre usar RAG y hacer fine-tuning para incorporar conocimiento específico a un LLM, y cuándo es preferible cada uno?",
    [
      "RAG es siempre superior al fine-tuning para cualquier tipo de conocimiento específico, porque no requiere reentrenamiento del modelo",
      "Fine-tuning es siempre superior a RAG porque el conocimiento queda integrado en los pesos del modelo y no requiere una base de datos adicional",
      "RAG es preferible para conocimiento actualizable (documentos que cambian), acceso a datos extensos y trazabilidad de fuentes; fine-tuning es preferible para estilo, tono, comportamiento y conocimiento que raramente cambia",
      "RAG y fine-tuning son técnicamente equivalentes y la elección depende exclusivamente del presupuesto disponible"
    ],
    2,
    "RAG y fine-tuning resuelven problemas diferentes y frecuentemente se usan juntos. RAG conecta el modelo con una base de conocimiento externa en tiempo de inferencia: el modelo recibe la pregunta, recupera documentos relevantes, y genera la respuesta con ese contexto. Sus ventajas son la actualización inmediata (cambias el documento en la base de datos y el modelo responde con el conocimiento actualizado en la próxima query, sin reentrenar), la trazabilidad (puedes citar exactamente qué fragmento usó para responder), y la escalabilidad (puedes indexar millones de documentos). Fine-tuning modifica los pesos del modelo con ejemplos de entrenamiento. Sus ventajas son la internalización de comportamientos y estilos (seguir un formato específico, usar vocabulario de la empresa, tener una personalidad consistente), la capacidad de cambiar cómo razona el modelo (no solo qué sabe), y no requerir latencia adicional de búsqueda en inferencia. El patrón más robusto en producción empresarial es fine-tuning para comportamiento más RAG para conocimiento: fine-tuneas el modelo para que responda en el estilo y formato de tu empresa, y RAG para que tenga acceso a los documentos actualizados.",
    "RAG vs fine-tuning: diferencias fundamentales y criterios de elección"
  )
);

// B5-l8: Privacidad, GDPR y datos sensibles
b5.lecciones[7].contenido.verificacion.push(
  q(
    "¿Cuáles son las bases legales que el GDPR reconoce para procesar datos personales en sistemas de IA, y cuál es la más problemática en contextos empresariales?",
    [
      "El GDPR solo reconoce el consentimiento explícito como base legal para cualquier procesamiento de datos personales, incluyendo el entrenamiento de modelos de IA",
      "El GDPR reconoce 6 bases legales (consentimiento, contrato, obligación legal, interés vital, tarea pública, interés legítimo); para IA empresarial el consentimiento es problemático porque las personas raramente consintieron que sus datos se usaran para entrenar modelos",
      "El GDPR no aplica al entrenamiento de modelos de IA porque los modelos entrenados no almacenan datos personales directamente en ningún campo",
      "El GDPR solo aplica a datos de ciudadanos europeos cuando son procesados dentro del territorio de la UE, no cuando los datos se transfieren a EEUU para entrenamiento"
    ],
    1,
    "El GDPR (Art. 6) establece seis bases legales para el procesamiento de datos personales: consentimiento explícito, necesidad para un contrato, cumplimiento de obligación legal, protección de intereses vitales, ejercicio de poder público, e interés legítimo. Para sistemas de IA empresarial, el consentimiento crea la mayor complejidad práctica: cuando una empresa entrena un modelo de IA con datos de clientes, emails de empleados o registros históricos de transacciones, esas personas raramente consintieron explícitamente ese uso específico cuando proporcionaron sus datos originalmente. La base del interés legítimo (Art. 6.1.f) permite el procesamiento cuando hay un interés legítimo del responsable que no sea anulado por los derechos del interesado, pero requiere un balance test documentado. La base del contrato funciona si el entrenamiento es necesario para ejecutar el contrato con el usuario. Para datos de empleados, el consentimiento es especialmente problemático porque la relación laboral crea un desequilibrio de poder que puede invalidar el consentimiento libre. Las empresas deben identificar la base legal antes de empezar cualquier proyecto de IA con datos personales.",
    "Bases legales GDPR para procesamiento de datos en IA y problemática del consentimiento"
  ),
  q(
    "¿Qué es la 'differential privacy' y cuándo es relevante implementarla en proyectos de IA?",
    [
      "Es una técnica de cifrado que protege los datos de los usuarios durante la transmisión entre el cliente y el servidor del modelo de IA",
      "Es una técnica matemática que añade ruido calibrado a los datos de entrenamiento o al proceso de entrenamiento, garantizando que sea imposible inferir si un individuo específico estuvo en el dataset de entrenamiento",
      "Es el proceso de anonimizar datos eliminando campos identificadores como nombre, DNI y dirección antes de entrenarlos en un modelo",
      "Es el método por el que los usuarios pueden solicitar que sus datos sean excluidos del siguiente ciclo de reentrenamiento del modelo"
    ],
    1,
    "La differential privacy (DP) es una garantía matemática formal sobre la privacidad, introducida por Cynthia Dwork en 2006. La intuición es: el output de un análisis estadístico o un proceso de entrenamiento ML debe ser prácticamente indistinguible independientemente de si cualquier individuo específico está o no en el dataset. En la práctica se implementa añadiendo ruido gaussiano o laplaciano calibrado durante el entrenamiento (Differentially Private SGD, DP-SGD): el ruido enmascara la contribución de cualquier ejemplo individual a los gradientes. Apple y Google usan DP en los datos que recopilan de dispositivos para mejorar sus modelos. La relevancia para proyectos de IA es específica: DP es importante cuando el modelo podría memorizar datos sensibles de entrenamiento y reproducirlos en sus respuestas, lo que es un riesgo real en LLMs que han memorizado texto que contiene información personal. También es relevante cuando se necesita demostrar formalmente (no solo argumentar) que el modelo no puede ser usado para inferir información sobre individuos del dataset. El costo es reducción de accuracy: más privacidad (epsilon más pequeño) requiere más ruido, que degrada el modelo. Para la mayoría de proyectos empresariales, anonimización robusta más políticas de acceso es suficiente; DP se justifica en casos de alta sensibilidad como salud o finanzas.",
    "Differential privacy: garantía matemática de privacidad en entrenamiento de modelos"
  )
);

// B5-l9: Datasets públicos
b5.lecciones[8].contenido.verificacion.push(
  q(
    "¿Cuál es la diferencia principal entre Hugging Face y Kaggle como plataformas de datasets, y para qué tipo de proyecto es más apropiada cada una?",
    [
      "Hugging Face es solo para modelos de lenguaje y Kaggle es solo para datos de visión computacional; no se solapan en casos de uso",
      "Hugging Face está orientada a datasets de ML/NLP con integración nativa en pipelines de entrenamiento; Kaggle está orientada a competiciones con datos ya listos para uso directo y scripts de EDA de la comunidad",
      "Kaggle es gratuita y Hugging Face requiere suscripción de pago para acceder a más de 1,000 datasets",
      "Hugging Face solo tiene datasets en inglés; Kaggle tiene la mayor colección de datasets en español y otros idiomas"
    ],
    1,
    "Hugging Face y Kaggle son complementarias y tienen fortalezas diferentes. Hugging Face Datasets (datasets.huggingface.co) tiene más de 200,000 datasets integrados con la librería datasets de Python, que permite cargar datos directamente en pipelines de entrenamiento con streaming (sin descargar todo el dataset), fácil splitting train/validation/test, y conversión automática a formatos de PyTorch o TensorFlow. Es la referencia para datasets de NLP, benchmarks académicos y datos de entrenamiento de modelos. Kaggle (kaggle.com/datasets) es fundamentalmente una plataforma de competición donde los datasets vienen acompañados de notebooks de análisis exploratorio (EDA) de la comunidad, discusiones sobre características relevantes, y contexto sobre el problema de negocio que los datos representan. Para un problema de ML aplicado donde quieres aprender de cómo otros han abordado datos similares, Kaggle es más valioso. Para integración directa en un pipeline de entrenamiento con datos ya estructurados, Hugging Face es más eficiente. El criterio de evaluación de licencias aplica en ambas plataformas: siempre verificar si el dataset permite uso comercial antes de usarlo en un producto.",
    "Diferencias entre Hugging Face Datasets y Kaggle para proyectos de ML"
  ),
  q(
    "¿Por qué revisar la licencia de un dataset público es crítico antes de usarlo en un producto comercial?",
    [
      "Las licencias de datasets son solo relevantes para investigación académica; los productos comerciales tienen protección legal automática bajo el marco de fair use",
      "Muchos datasets populares tienen licencias que prohíben el uso comercial o requieren atribución, y usar datos con licencia incompatible puede generar obligaciones legales sobre el modelo entrenado o el producto resultante",
      "Las licencias de datasets solo aplican a la empresa que los creó; terceras partes que descarguen y usen los datos están exentas de responsabilidades",
      "Solo los datasets médicos y financieros tienen licencias restrictivas; los datasets de texto e imágenes son invariablemente de dominio público"
    ],
    1,
    "Las licencias de datasets tienen implicaciones legales concretas para los modelos entrenados y los productos resultantes. Los tipos de licencia más comunes incluyen: CC0 (dominio público, sin restricciones), CC-BY (atribución requerida), CC-BY-SA (atribución más licencia compartida, los derivados deben tener la misma licencia, lo que puede afectar al modelo entrenado), CC-BY-NC (no comercial, prohíbe uso en productos que generen ingresos), y licencias propietarias con restricciones específicas. La complejidad aumenta porque la licencia del dataset puede crear obligaciones sobre el modelo entrenado con él. El debate legal sobre si un modelo de ML es un 'derivado' del dataset con el que fue entrenado sigue sin resolverse completamente en los tribunales, pero múltiples litigios activos en EEUU y Europa en 2025-2026 abordan exactamente esta cuestión. Para proyectos comerciales, la práctica recomendada es: verificar la licencia antes de cualquier uso, documentar qué datasets se usaron con sus licencias, preferir datasets con licencias permisivas (CC0, CC-BY, licencias de uso libre explícito), y consultar con el equipo legal antes de usar datasets con licencias NC o SA en productos que generarán ingresos.",
    "Implicaciones legales de las licencias de datasets para productos comerciales de IA"
  )
);

// B5-l10: Preparar tus propios datos
b5.lecciones[9].contenido.verificacion.push(
  q(
    "¿Qué es el inter-annotator agreement (IAA) y qué valor de Cohen's Kappa se considera aceptable para un proyecto de etiquetado de datos?",
    [
      "IAA mide cuántos anotadores completaron el trabajo a tiempo; un valor superior al 80% indica que el proyecto está dentro del calendario",
      "IAA mide el nivel de acuerdo entre anotadores independientes al etiquetar los mismos ejemplos; un kappa superior a 0.7 indica acuerdo sustancial y sugiere que las instrucciones son claras y la tarea es consistentemente interpretable",
      "IAA es la tasa de precisión de los anotadores externos frente a los anotadores internos; se considera aceptable cuando supera el accuracy del modelo de referencia",
      "IAA es el índice de actividad de los anotadores en la plataforma de etiquetado, usado para facturar servicios de anotación por horas"
    ],
    1,
    "El inter-annotator agreement (IAA) es la métrica que mide cuánto acuerdan diferentes anotadores al etiquetar los mismos ejemplos de forma independiente. Es la primera señal diagnóstica de la calidad de un proceso de etiquetado. Si el IAA es bajo, indica que las instrucciones de etiquetado son ambiguas, que la tarea es inherentemente subjetiva, o que los anotadores tienen diferentes niveles de comprensión del dominio. El estadístico más usado es Cohen's Kappa (κ), que corrige el acuerdo esperado por azar. Los umbrales estándar son: κ < 0.2 (acuerdo pobre, revisar instrucciones urgentemente), 0.2-0.4 (acuerdo débil), 0.4-0.6 (acuerdo moderado), 0.6-0.8 (acuerdo sustancial, aceptable para la mayoría de proyectos), κ > 0.8 (acuerdo casi perfecto). Para proyectos de clasificación de sentimiento o clasificación de intención en chatbots, un kappa de 0.7+ es el objetivo mínimo antes de escalar el etiquetado. Si el IAA está por debajo de 0.6, lo correcto es refinar las instrucciones, añadir ejemplos de casos edge, y volver a etiquetar una muestra antes de etiquetar el dataset completo, no ignorarlo y esperar que el modelo promedio el ruido.",
    "Inter-annotator agreement y Cohen's Kappa en calidad de etiquetado de datos"
  ),
  q(
    "¿Cuál es el formato estándar de datos para fine-tuning de modelos de conversación (chat fine-tuning) en 2026, y por qué es importante seguirlo exactamente?",
    [
      "El formato CSV con columnas 'pregunta' y 'respuesta' es el estándar universal para todos los tipos de fine-tuning en todos los proveedores",
      "El formato JSONL con estructura de mensajes en roles (system, user, assistant) es el estándar de facto para chat fine-tuning, y desviarse de él causa errores de entrenamiento o degradación de rendimiento",
      "El formato XML con etiquetas semánticas es el preferido por las empresas europeas para cumplir con los estándares de documentación del EU AI Act",
      "No existe un formato estándar; cada proveedor usa su propio formato propietario incompatible con los demás"
    ],
    1,
    "Para fine-tuning de modelos de conversación en 2026, el formato JSONL (JSON Lines, un objeto JSON por línea) con estructura de roles de mensajes se ha convertido en el estándar de facto. Cada ejemplo de entrenamiento es un objeto JSON con una clave 'messages' que contiene una lista de turnos con campos 'role' ('system', 'user', 'assistant') y 'content'. Este formato fue popularizado por OpenAI para fine-tuning de GPT-3.5 y GPT-4, y fue adoptado posteriormente por la mayoría de proveedores incluyendo la API de fine-tuning de Anthropic y los frameworks open source (Axolotl, LLaMA-Factory). Seguir este formato exactamente importa por dos razones. Primera, técnica: los scripts de fine-tuning cargan el dataset esperando esa estructura; errores de formato no siempre producen mensajes de error claros sino training runs silenciosamente incorrectos que producen modelos degradados. Segunda, transferibilidad: si usas el formato estándar, puedes migrar entre proveedores o frameworks sin reformatear el dataset. Herramientas como lm-format-enforcer y datasets de Hugging Face tienen conversores para diferentes variantes del formato de mensajes.",
    "Formato JSONL de roles para chat fine-tuning y su importancia en la práctica"
  )
);

// ─── GUARDAR Y VERIFICAR ──────────────────────────────────────────────────────
fs.writeFileSync('./src/content/m1/index.json', JSON.stringify(data, null, 2));

console.log('\n=== QA FINAL ===');
const b9check = data.bloques.find(b=>b.id==='m1-b9');
b9check.lecciones.slice(0,1).forEach(l=>{
  const w = l.contenido.teoria.explicacion.split(' ').length;
  const q2 = l.contenido.verificacion.length;
  console.log(l.id, w+'w', q2+'q', w>=300&&q2===5?'OK':'FALLO');
});

const b0check = data.bloques.find(b=>b.id==='m1-b0');
b0check.lecciones.slice(0,6).forEach(l=>{
  const w = l.contenido.teoria.explicacion.split(' ').length;
  const q2 = l.contenido.verificacion.length;
  console.log(l.id, w+'w', q2+'q', q2===5?'OK':'FALLO');
});

const b5check = data.bloques.find(b=>b.id==='m1-b5');
b5check.lecciones.forEach(l=>{
  const w = l.contenido.teoria.explicacion.split(' ').length;
  const q2 = l.contenido.verificacion.length;
  console.log(l.id, w+'w', q2+'q', q2===5?'OK':'FALLO');
});
