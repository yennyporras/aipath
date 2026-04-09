# AIPath - Academia Gamificada de IA

## Proyecto
AIPath es una academia gamificada de Inteligencia Artificial construida con React + Vite + Tailwind CSS. Deployada en Vercel, repositorio público en GitHub.

## Propietaria
Paola — desarrolladora web con stack WordPress/PHP/JS. Objetivo: ser referente en IA en 6 meses.

## Stack por fases
- **Fase 1 (actual):** React + Vite + Tailwind CSS (frontend)
- **Fase 2:** Node.js + Express (backend)
- **Fase 3:** Supabase (base de datos y autenticación)

## Módulo inicial
M4 — Prompt Engineering. Es el primer módulo que se construye.

## Reglas de diseño
- Dark mode siempre
- 7 preguntas por lección
- "Herramienta del Día" es una sección separada, no parte de las lecciones

## Integraciones
- Claude API se integra en Fase 2 (backend con Node.js + Express)
- Presupuesto: $0 — usar solo recursos gratuitos

## Instrucciones para Claude
- Responder siempre en español
- Usar modelo claude-sonnet-4-6
- Ser directo y conciso
- NO dar código completo sin que Paola intente primero — guiar, no resolver
- Priorizar que Paola aprenda y entienda cada paso

## Estado al cerrar sesión — 9 Abril 2026

### Lo que está deployado en producción
URL: aipath-beta.vercel.app
Repo: github.com/yennyporras/aipath
Último commit: 95d4862 — Luxury Tech Academy UI

### Archivos clave del proyecto
- src/App.jsx — orquesta toda la app
- src/components/Header.jsx — logo Estratek + racha
- src/components/IntroScreen.jsx — navegación por bloques
- src/components/BlockLessons.jsx — lista de lecciones por bloque
- src/components/QuizCard.jsx — quiz con feedback
- src/components/ResultsScreen.jsx — celebración + badge
- src/components/XPBar.jsx — barra de XP animada
- src/content/m4-completo.json — 58 lecciones (bloques 0-5)
- public/manifest.json — PWA config
- public/sw.js — service worker offline
- public/etk-logo-white.png — logo Estratek
- src/index.css — CSS variables sistema de diseño completo

### Diseño actual — Luxury Tech Academy
Tipografía: Syne (títulos) + DM Sans (cuerpo)
Estética: oscura, refinada, premium — inspirada en Stripe/Linear
Fondo: #080810 + radial gradient sutil + noise grain SVG
Colores CSS variables: --color-bg, --color-surface, --color-border, --color-accent-blue #3B82F6, --color-accent-green #10B981
Cards: glassmorphism 120px fija, grid 2col desktop
Animaciones: staggered reveal, XP counter 0→total 1.5s, badge scale 0.5→1 con glow, 15 partículas refinadas

### Contenido M4 generado
Bloques 0-5 completos: 58 lecciones
Bloques 6-8 pendientes: 37 lecciones
Estructura: teoria + verificacion + practica + conexion

### Pendiente sesión F2
1. Completar bloques 6-8 + proyecto final + certificación M4
2. Supabase: tablas usuarios, empresas, progreso, batallas
3. Auth: email + Google OAuth
4. Migrar localStorage a Supabase
5. Panel de admin Estratek con métricas del equipo
6. Rankings semanales con podio
7. Sistema de batallas asíncronas → luego en vivo
8. Evaluación diagnóstica con 4 rutas personalizadas
9. React Router navegación entre pantallas
10. Curso Intraemprendimiento Estratek (3 bloques)

### Cómo retomar
1. Abrir Claude Code en carpeta del proyecto
2. Escribir: "Lee el CLAUDE.md y retomamos sesión F2"
3. Usar /clear al inicio para limpiar contexto
4. npm run dev para ver la app local
