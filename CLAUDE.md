# AIPath - Academia Gamificada de IA

## Proyecto
AIPath es una academia gamificada de Inteligencia Artificial construida con React + Vite + Tailwind CSS. Deployada en Vercel, repositorio público en GitHub.

## Propietaria
Paola — desarrolladora web con stack WordPress/PHP/JS. Objetivo: ser referente en IA en 6 meses.

## Stack por fases
- **Fase 1 (actual):** React + Vite + Tailwind CSS (frontend)
- **Fase 2:** Node.js + Express (backend)
- **Fase 3:** Supabase (base de datos y autenticación)

## Instrucciones para Claude
- Responder siempre en español
- Usar modelo claude-sonnet-4-6
- Ser directo y conciso
- NO dar código completo sin que Paola intente primero — guiar, no resolver
- Priorizar que Paola aprenda y entienda cada paso

## Integraciones futuras
- Claude API se integra en Fase 2 (backend con Node.js + Express)
- Presupuesto: $0 — usar solo recursos gratuitos

---

## Estado al cerrar sesión — 10 Abril 2026

### Producción
- URL: aipath-beta.vercel.app
- Repo: github.com/yennyporras/aipath
- Último commit: b0275bc

### Diseño actual — Estratek Brand
- Tipografía: Syne (títulos) + DM Sans (cuerpo)
- Estética: oscura, refinada, premium — Stripe/Linear
- Fondo: #080810 + radial gradient turquesa sutil + noise grain SVG
- Color primario: #00D4AA (turquesa Estratek) — `--color-accent-blue`
- Color secundario: #00B894 — `--color-accent-green`
- Botones: fondo turquesa + texto negro bold
- Cards: glassmorphism, grid 1col mobile → 2col tablet → 3col desktop
- Layout desktop: sidebar fijo 256px + contenido centrado max-800px

### Archivos clave
```
src/App.jsx                          — orquesta toda la app, pantallas y handlers
src/components/Header.jsx            — logo Estratek + racha + botón install desktop
src/components/IntroScreen.jsx       — grid de bloques + proyecto + certificación
src/components/BlockLessons.jsx      — lista de lecciones por bloque
src/components/QuizCard.jsx          — quiz con feedback por opción
src/components/TeoriaScreen.jsx      — teoría antes del quiz
src/components/PracticaScreen.jsx    — práctica con solución ocultable
src/components/ResultsScreen.jsx     — resultados + badge
src/components/XPBar.jsx             — barra de XP animada
src/components/LoginScreen.jsx       — login con 4 usuarios demo
src/components/ProyectoScreen.jsx    — proyecto final 5 fases
src/components/CertificacionScreen.jsx — examen 60 preguntas
src/components/InstallBanner.jsx     — banner PWA móvil + botón desktop
src/hooks/usePWAInstall.js           — hook PWA (beforeinstallprompt)
src/content/m4-completo.json         — M4 completo: 82 lecciones + cert + proyecto
src/content/academy-index.json       — índice global M1-M10 (para lazy loading futuro)
src/content/m1/index.json            — M1: 61 lecciones (estructura generada)
src/index.css                        — design tokens + animaciones + responsive
public/manifest.json                 — PWA completo: 8 iconos, shortcuts
public/sw.js                         — service worker offline
public/etk-logo-white.png            — logo Estratek
public/icon-{72,96,128,144,152,192,384,512}.png — iconos PWA
```

### Usuarios demo (LoginScreen)
| Email | Password | Rol |
|---|---|---|
| demo@estratek.com.co | demo1234 | estudiante |
| admin@estratek.com.co | admin1234 | admin |
| paola@estratek.com.co | paola1234 | admin |
| equipo@estratek.com.co | estratek2026 | estudiante |

### Contenido M4 — COMPLETO
- 9 bloques (B0-B8), 82 lecciones totales
- Cada lección: teoria + verificacion (3-7 preguntas) + practica + conexion
- Proyecto final: 5 fases con entregables y criterios
- Certificación final: 60 preguntas, 75% mínimo, 1000 XP

### Flujo de lección
`intro (bloques) → lessons (lecciones del bloque) → teoria → quiz → practica → results`

### Progreso almacenado en localStorage
- Key: `aipath_progreso_v2`
- Campos: xpTotal, rachaDiaria, badges[], leccionesCompletadas[], ultimaSesion, fasesProyecto[], certificacionAprobada

### Bugs conocidos (pendientes)
1. `isMobile` en App.jsx no es reactivo al resize de ventana (línea 159)
2. `getSession()` llamado 3 veces en Sidebar en cada render
3. CSS: `html: overflow:hidden` en desktop puede causar scroll doble en algunos navegadores

### Pendiente sesión F3
1. **Lazy loading**: conectar academy-index.json a la UI — pantalla de módulos M1-M10
2. **Herramienta del Día**: sección separada con 10 herramientas, badge por herramienta
3. **Contenido M2-M10**: generar con scripts (misma estrategia que M1)
4. **Supabase**: tablas usuarios, progreso, empresas
5. **Auth real**: email + Google OAuth — reemplazar localStorage
6. **React Router**: navegación con URLs propias por pantalla
7. **Panel admin Estratek**: métricas del equipo
8. **Rankings semanales** con podio
9. **Sistema de batallas** asíncronas
10. **Evaluación diagnóstica** con 4 rutas personalizadas
11. **Intraemprendimiento Estratek**: 3 bloques adicionales

### Cómo retomar
1. Abrir Claude Code en `C:\Users\ypaol\aipath`
2. Escribir: "Lee el CLAUDE.md y retomamos sesión F3"
3. `npm run dev` para ver la app local
4. Login con paola@estratek.com.co / paola1234
