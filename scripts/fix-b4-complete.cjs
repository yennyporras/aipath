/**
 * fix-b4-complete.cjs
 * Agrega bienvenida + recap a B4. Las lecciones l1-l10 ya están completas.
 */

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/content/m1/index.json', 'utf8'));
const b4 = data.bloques.find(b => b.id === 'm1-b4');

// ─── 1. BIENVENIDA l0 ─────────────────────────────────────────────────────────

const bienvenidaB4 = {
  id: 'm1-b4-l0',
  titulo: 'Bienvenida al Bloque 4: El ecosistema de modelos de IA en 2026',
  bloque: 4,
  tipo: 'bienvenida',
  duracion_min: 10,
  xp: 25,
  contenido: {
    teoria: {
      explicacion: `En enero de 2020 existían quizás una docena de modelos de IA relevantes. En 2026 hay literalmente miles, organizados en categorías que antes ni existían: modelos de texto, imagen, audio, video, código, embeddings, multimodales y razonamiento.

Esta proliferación crea un problema real para los profesionales: elegir el modelo correcto para cada tarea se ha convertido en una habilidad técnica valiosa. Usar GPT-4 para generar una imagen o Stable Diffusion para analizar un contrato no solo es ineficiente — en muchos casos produce resultados pobres porque el modelo no fue diseñado para esa tarea.

Este bloque te da el mapa completo del ecosistema de modelos de 2026. No es un ranking de cuál es "el mejor" — porque el mejor modelo depende completamente del caso de uso, el presupuesto, los requisitos de privacidad y la velocidad necesaria.

Aprenderás los modelos de lenguaje líderes (Claude, GPT, Gemini, LLaMA) y sus diferencias reales — no las de los benchmarks de marketing, sino las que importan para decisiones de producto. Los modelos de imagen (Stable Diffusion, DALL-E, Midjourney, Flux) y cuándo usar generación local vs API. Los modelos de audio y voz para transcripción y síntesis. Los modelos de video, que en 2026 están cambiando industrias enteras. Los modelos de código especializados. Los modelos de embeddings para búsqueda semántica. Los modelos multimodales que procesan simultáneamente texto, imagen y audio. Y los modelos de razonamiento que superan a los anteriores en problemas matemáticos y lógicos.

Terminarás el bloque con un framework concreto para elegir el modelo correcto para cualquier tarea que te presenten.`,
      analogia: null,
      ejemplo_malo: null,
      ejemplo_bueno: null,
      por_que_importa: 'Conocer el ecosistema de modelos te convierte en el profesional de referencia que sabe qué herramienta usar para cada problema. Esta habilidad tiene valor directo en proyectos, propuestas y decisiones de arquitectura.',
      tip_profesional: null
    },
    verificacion: [],
    practica: {
      tipo: 'reflexion',
      contexto: 'Antes de empezar el bloque, activa lo que ya sabes sobre el ecosistema de modelos.',
      instruccion: '¿Qué modelos de IA conoces y para qué sirve cada uno según tu comprensión actual? Lista al menos 3, con el caso de uso que asocias a cada uno. Al terminar el bloque compara tu lista con el mapa completo que habrás construido.',
      input_malo: null,
      pista: 'Piensa en modelos que ya usas o has escuchado: ChatGPT, Claude, DALL-E, Midjourney, GitHub Copilot, Whisper, ElevenLabs. ¿Qué hace cada uno?',
      solucion: 'Al terminar B4 tendrás el mapa completo: lenguaje (Claude, GPT, Gemini, LLaMA), imagen (DALL-E, Midjourney, Stable Diffusion, Flux), audio (Whisper para transcripción, ElevenLabs/Suno para síntesis), video (Sora, Runway, Kling), código (Copilot, Cursor, Devin), embeddings (text-embedding-3-large, Cohere), multimodales (Claude 3.5, GPT-4V) y razonamiento (o1, DeepSeek R1). Además, un framework claro para elegir entre propietarios y open source.',
      criterios_de_exito: [
        'Listaste al menos 3 modelos',
        'Asociaste un caso de uso a cada uno',
        'Guardaste la lista para compararla al terminar'
      ]
    },
    conexion: {
      siguiente_concepto: 'Modelos de lenguaje: GPT, Claude, Gemini, LLaMA comparados',
      por_que_importa_despues: 'La primera lección del bloque compara los modelos de lenguaje líderes con criterios concretos que puedes usar para elegir el correcto en tu próximo proyecto.'
    }
  }
};

// ─── 2. RECAP l11 ────────────────────────────────────────────────────────────

const recapB4 = {
  id: 'm1-b4-l11',
  titulo: 'Recapitulación B4: El mapa de modelos que siempre consultarás',
  bloque: 4,
  tipo: 'recapitulacion',
  duracion_min: 15,
  xp: 75,
  contenido: {
    teoria: {
      explicacion: `Completaste el mapa completo del ecosistema de modelos de IA en 2026. Este es uno de los bloques más dinámicos del módulo — los modelos evolucionan rápidamente, pero el framework que aprendiste para evaluarlos permanecerá útil.

Aprendiste que los modelos de lenguaje (Claude, GPT-4, Gemini, LLaMA) se diferencian no solo en benchmark scores sino en contexto máximo, velocidad de inferencia, costo por token, capacidades multimodales, opción de despliegue local y política de privacidad. Elegir el correcto requiere evaluar estos factores contra los requisitos del proyecto.

Los modelos de imagen tienen diferentes fortalezas: Midjourney para calidad artística, DALL-E para coherencia con texto, Stable Diffusion/Flux para control técnico y uso local. Los modelos de audio incluyen Whisper (transcripción estado del arte, open source) y ElevenLabs/Suno para síntesis de voz y música. Los modelos de video — Sora, Runway, Kling — están transformando producción audiovisual con implicaciones enormes para marketing y entretenimiento.

Los modelos de código (Copilot, Cursor, Devin) aceleran dramáticamente el desarrollo de software, con diferencias importantes en integración IDE, soporte de lenguajes y capacidad de agencia. Los embeddings (text-embedding-3-large, Cohere) son la base de RAG, búsqueda semántica y sistemas de recomendación. Los modelos multimodales como Claude 3.5 y GPT-4V unifican texto, imagen y código en una sola capacidad.

Los modelos de razonamiento (o1, DeepSeek R1) aplican "pensamiento extendido" para problemas matemáticos y lógicos complejos, superando significativamente a los modelos base en estas tareas al costo de mayor latencia y precio por token.

El framework final: define tu tarea, tus requisitos (privacidad, latencia, costo, calidad), y mapéalos al modelo correcto. Ningún modelo es "el mejor" en abstracto.`,
      analogia: null,
      ejemplo_malo: null,
      ejemplo_bueno: null,
      por_que_importa: 'El mapa de modelos es una de las habilidades más valoradas de un AI Engineer o consultor de IA. Saber recomendar el modelo correcto para cada situación — con justificación técnica y de negocio — es un diferenciador profesional real.',
      tip_profesional: 'El ecosistema cambia cada 3-6 meses. Sigue LMSYS Chatbot Arena para rankings actualizados de modelos de lenguaje, Hugging Face para open source, y los blogs oficiales de Anthropic, OpenAI y Google DeepMind para lanzamientos. Dedica 30 minutos semanales a mantenerte al día.'
    },
    verificacion: [
      {
        pregunta: '¿Cuál es el criterio más importante para elegir entre un modelo propietario (Claude, GPT) y uno open source (LLaMA, Mistral)?',
        opciones: [
          'Los modelos propietarios siempre son mejores en calidad',
          'Los open source siempre son más baratos en producción',
          'Los requisitos específicos del proyecto: privacidad de datos, capacidad de despliegue local, control sobre el modelo y costos a escala',
          'El tamaño del modelo en parámetros'
        ],
        correcta: 2,
        explicacion_profunda: 'No hay una respuesta universal. Los modelos propietarios ofrecen generalmente mejor rendimiento out-of-the-box, SLAs y soporte, pero los datos salen de la empresa. Los open source permiten despliegue local (datos nunca salen), fine-tuning completo y costos de inferencia mucho menores a escala. Para datos médicos, legales o financieros sensibles, el despliegue local de un modelo open source puede ser la única opción. Para una startup sin infraestructura, una API propietaria puede ser más práctica. El criterio correcto es: evalúa privacidad, control, calidad requerida y costo a la escala proyectada.',
        concepto_reforzado: 'Framework de decisión: propietario vs open source'
      },
      {
        pregunta: '¿En qué tipos de tareas los modelos de razonamiento (o1, DeepSeek R1) superan significativamente a los modelos base como Claude Sonnet o GPT-4?',
        opciones: [
          'En generación de texto creativo y narrativas largas',
          'En velocidad de respuesta para conversaciones simples',
          'En problemas matemáticos, lógicos, de código complejo y razonamiento multi-paso',
          'En generación de imágenes y audio'
        ],
        correcta: 2,
        explicacion_profunda: 'Los modelos de razonamiento como o1 aplican una fase de "thinking" extendido antes de responder — esencialmente resuelven el problema paso a paso internamente antes de dar una respuesta. Esto los hace superiores en matemáticas (olimpiadas, cálculo), programación compleja (debugging, algoritmos), razonamiento lógico y problemas multi-paso que requieren mantener muchas restricciones simultáneamente. Sin embargo, son significativamente más lentos y caros por token que los modelos base, lo que los hace inadecuados para tareas simples o de alta frecuencia.',
        concepto_reforzado: 'Cuándo usar modelos de razonamiento vs modelos base'
      },
      {
        pregunta: '¿Qué es Whisper y qué lo hace especialmente valioso en el ecosistema de modelos de audio?',
        opciones: [
          'Un modelo de síntesis de voz propietario de OpenAI con voces premium',
          'Un modelo open source de transcripción de audio multilingüe con rendimiento de nivel estado del arte, disponible para despliegue local',
          'Un modelo de generación de música similar a Suno pero gratuito',
          'Una API de conversión texto-a-voz de Google'
        ],
        correcta: 1,
        explicacion_profunda: 'Whisper es el modelo de transcripción de voz de OpenAI, publicado como open source. Su valor principal es triple: (1) Calidad de estado del arte en transcripción multilingüe (99 idiomas), (2) Open source — puede desplegarse localmente sin enviar audio a servidores externos, fundamental para datos sensibles como reuniones de negocio o consultas médicas, (3) Gratuito para usar localmente. Es el modelo de transcripción de referencia para aplicaciones que procesan voz en producción y necesitan control sobre los datos.',
        concepto_reforzado: 'Whisper: valor del open source en modelos de audio'
      }
    ],
    practica: {
      tipo: 'caso_real',
      contexto: 'Eres AI Engineer en una agencia de marketing digital. El director de estrategia te pide un stack de modelos de IA para automatizar tres tareas: (1) generar variantes de copy para anuncios en múltiples idiomas, (2) crear imágenes de producto para redes sociales, y (3) transcribir y resumir entrevistas con clientes en español e inglés.',
      instruccion: 'Para cada una de las tres tareas, elige el modelo (o combinación de modelos) más adecuado y justifica tu elección con al menos 2 criterios técnicos específicos. Ten en cuenta que los datos de clientes son confidenciales.',
      input_malo: 'Usaría ChatGPT para todo porque es el más conocido y fácil de usar.',
      pista: 'Para el copy multilingüe: ¿qué LLM tiene mejor soporte multilingüe y contexto largo? Para imágenes de producto: ¿qué modelo da más control sobre el estilo y la consistencia? Para transcripción confidencial de entrevistas: el requisito de privacidad es clave — ¿qué modelo permite despliegue local?',
      solucion: '(1) Copy multilingüe: Claude 3.5 Sonnet o GPT-4o — ambos tienen excelente soporte multilingüe, contexto largo para consistencia de tono, y se puede usar la API con datos de producción (revisar política de privacidad de Anthropic/OpenAI para datos de clientes). (2) Imágenes de producto: Stable Diffusion o Flux para control máximo sobre estilo y posibilidad de fine-tuning con imágenes de la marca, o DALL-E 3 vía API para rapidez sin infraestructura propia. (3) Transcripción confidencial: Whisper desplegado localmente — las entrevistas de clientes son datos confidenciales que no deben enviarse a servidores externos. Despliegue local elimina el riesgo de privacidad y el costo por uso.',
      criterios_de_exito: [
        'Elegiste un modelo específico para cada tarea (no genérico)',
        'Justificaste con criterios técnicos, no solo popularidad',
        'Identificaste el requisito de privacidad para las entrevistas de clientes',
        'Mencionaste Whisper local para la transcripción confidencial',
        'La propuesta es implementable sin cambios de arquitectura mayores'
      ]
    },
    conexion: {
      siguiente_concepto: 'Cómo se entrena un modelo: datos, cómputo y escala',
      por_que_importa_despues: 'El Bloque 5 explica cómo se construyen los modelos que acabas de mapear: qué datos se usan, cuánto cómputo requieren, y cómo las decisiones de entrenamiento afectan las capacidades y limitaciones del modelo final.'
    }
  }
};

// ─── 3. INSERTAR EN EL BLOQUE ────────────────────────────────────────────────

b4.lecciones.unshift(bienvenidaB4);
b4.lecciones.push(recapB4);

// ─── 4. GUARDAR ──────────────────────────────────────────────────────────────

fs.writeFileSync('src/content/m1/index.json', JSON.stringify(data, null, 2));
console.log('✓ B4 completado: bienvenida + recap agregadas');
console.log('  Total lecciones B4:', b4.lecciones.length);
