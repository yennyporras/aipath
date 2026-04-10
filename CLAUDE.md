# AIPath — Academia Gamificada de IA

## Proyecto
AIPath es una academia gamificada de IA construida con React + Vite + Tailwind CSS.
Deploy: Vercel. Repo: github.com/yennyporras/aipath

## Propietaria
Paola — desarrolladora web (WordPress/PHP/JS).
Meta: ser referente 360° en IA (AI Engineer + Consultant + Educator).

## Stack definitivo (no cambiar)
- Frontend: React + Vite + Tailwind CSS
- Hosting: Vercel (gratuito, mantener)
- BD actual: localStorage
- BD futura (F2): Supabase PostgreSQL + pgvector
- Auth futura (F2): Supabase Auth + Google OAuth
- Notificaciones: Web Push API + VAPID keys (sin Firebase)
- IA: Claude API claude-sonnet-4-6
- NO usar Node.js + Express — decisión cancelada

## Dos instancias del mismo repo
1. AIPath (aipath-beta.vercel.app) — herramienta personal de Paola
   - Identidad visual propia, NO colores Estratek
   - Dark mode obligatorio, mobile-first
2. Estratek IA Academy — misma URL por ahora, separar en F3
   - Logo: public/etk-logo-white.png
   - Color: #00D4AA, fondo: #080810

## Pensum AIPath — 17 módulos en 3 fases

### Fase 1 — Funcional (prioridad máxima)
M1: Fundamentos de IA — 110 lecciones (EN DESARROLLO)
M4: Prompt Engineering — 95 lecciones (PILOTO COMPLETO: 82 lecciones)
M5: Claude Dominio Completo — 96 lecciones (pendiente)
M7: Python para IA — 90 lecciones (pendiente)
M8: Construir con APIs — 90 lecciones (pendiente)
M16: Inglés para IA — 70 lecciones (transversal)

### Fase 2 — Sólida
M2: Machine Learning Clásico — 90 lecciones
M3: Deep Learning y PyTorch — 90 lecciones
M10: Ecosistema y Frameworks — 90 lecciones
M11: Agentes Autónomos — 90 lecciones
M12: IA en Producción y MLOps — 85 lecciones
M15: Estrategia, Negocio y Carrera — 80 lecciones

### Fase 3 — Referente Mundial
M6: Modelos Multimodales — 90 lecciones
M9: LLMs Arquitectura Profunda — 80 lecciones
M13: Datos y Data Engineering — 80 lecciones
M14: Seguridad, IA Safety e Investigación — 70 lecciones
M17: Emprendimiento con IA — 60 lecciones (transversal)

Total: ~1,400 lecciones · ~700h de contenido

## Ruta de aprendizaje
M1 → M4 → M5 → M7 → M8 → M2 → M3 → M10 → M11 → M12 → M15 → M6 → M9 → M13 → M14
M16 y M17 son transversales desde el inicio

## Estructura de cada lección (obligatoria)
```json
{
  "id": "m1-b0-l1",
  "titulo": "...",
  "bloque": 0,
  "tipo": "leccion",
  "duracion_min": 20,
  "xp": 50,
  "contenido": {
    "teoria": {
      "explicacion": "mínimo 250 palabras reales",
      "analogia": "...",
      "ejemplo_malo": "...",
      "ejemplo_bueno": "...",
      "por_que_importa": "...",
      "tip_profesional": "..."
    },
    "verificacion": [
      {
        "pregunta": "...",
        "opciones": ["...","...","...","..."],
        "correcta": 0,
        "explicacion_profunda": "mínimo 80 palabras",
        "concepto_reforzado": "..."
      }
    ],
    "practica": {
      "tipo": "caso_real",
      "contexto": "...",
      "instruccion": "...",
      "input_malo": "...",
      "pista": "...",
      "solucion": "...",
      "criterios_de_exito": ["...","...","..."]
    },
    "conexion": {
      "siguiente_concepto": "...",
      "por_que_importa_despues": "..."
    }
  }
}
```

## Flujo de lección (no cambiar)
Login → Academy (grid 17 módulos) → bloques → lecciones → 
teoría → quiz → práctica → resultados → siguiente lección
Compartir en redes: SOLO al completar el curso completo

## Archivos clave
- src/App.jsx — orquesta toda la app
- src/components/LoginScreen.jsx — auth hardcodeada
- src/components/IntroScreen.jsx — navegación bloques
- src/components/TeoriaScreen.jsx — teoría antes del quiz
- src/components/QuizCard.jsx — preguntas con feedback
- src/components/PracticaScreen.jsx — ejercicio práctico
- src/components/ResultsScreen.jsx — resultados por lección
- src/components/Header.jsx — logo + racha + XP
- src/components/AcademyScreen.jsx — grid de módulos
- src/content/m4-completo.json — 82 lecciones M4
- src/content/m1/ — M1 en desarrollo (61 lecciones, B0 completo)
- src/content/academy-index.json — índice global de módulos
- public/manifest.json — PWA config
- public/sw.js — service worker offline

## Usuarios demo
- paola@estratek.com.co / paola1234 (admin)
- demo@estratek.com.co / demo1234
- admin@estratek.com.co / admin1234
- equipo@estratek.com.co / estratek2026

## Progreso en localStorage
Key: aipath_progreso_v2
Campos: xpTotal, rachaDiaria, badges[], leccionesCompletadas[], 
ultimaSesion, fasesProyecto[], certificacionAprobada

## Bugs conocidos
1. isMobile en App.jsx no es reactivo al resize (línea 159)
2. getSession() llamado 3 veces en Sidebar en cada render
3. CSS: html overflow:hidden puede causar scroll doble en desktop

## Estado al 10 Abril 2026
- M4: completo (82 lecciones + proyecto + certificación)
- M1: B0 completo (6 lecciones reales), B1-B7 con placeholders
- Academy grid: M1 y M4 navegables, M2-M10 como "Próximamente"
- PWA: instalable Android, iOS, Windows, Mac
- Último commit: e1eeaa4

## Pendiente Fase 1 (en orden)
1. Completar M1: generar contenido real B1-B11 (nueva estructura)
2. Nueva identidad visual AIPath (no Estratek)
3. Generar M5 completo
4. Generar M7 completo
5. Generar M8 completo
6. Push notifications Web Push API + VAPID
7. Sistema evaluación semanal con Claude API
8. Evaluación diagnóstica (20 preguntas → 4 rutas)

## Pendiente Fase 2 (Supabase + auth real)
- Supabase: tablas usuarios, progreso, ranking
- Auth real: email + Google OAuth
- React Router
- Panel admin con métricas
- Rankings semanales
- Sistema de batallas

## Reglas para Claude Code
- Responder siempre en español
- Modelo: claude-sonnet-4-6
- No dar código completo sin que Paola intente primero
- Dark mode siempre
- Mobile-first pero responsive completo
- Comentarios en español
- No usar Node.js + Express (decisión cancelada)
- Aprobar con opción 2 en permisos
- Al terminar cada tarea: commit descriptivo en español

## Cómo retomar sesión
1. Abrir Claude Code en C:\Users\ypaol\aipath
2. Leer este CLAUDE.md completo
3. npm run dev para ver la app local
4. Login: paola@estratek.com.co / paola1234
