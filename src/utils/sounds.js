/**
 * Sistema de sonidos AIPath — Web Audio API
 * Sin archivos externos. Inicializado lazily tras interacción del usuario.
 * Política de autoplay: el AudioContext se crea en el primer evento de usuario.
 */

let ctx = null
let enabled = true

// Inicializa el contexto en el primer evento de usuario
function getCtx() {
  if (!enabled) return null
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)()
    } catch {
      return null
    }
  }
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }
  return ctx
}

// Habilitar/deshabilitar sonidos
export function setSoundsEnabled(val) {
  enabled = val
}

export function getSoundsEnabled() {
  return enabled
}

// ── Utilidades de síntesis ─────────────────────────────────────────────

function playTone(freq, duration, gainVal = 0.12, type = 'sine', startTime = 0) {
  const c = getCtx()
  if (!c) return

  const osc  = c.createOscillator()
  const gain = c.createGain()

  osc.connect(gain)
  gain.connect(c.destination)

  osc.type      = type
  osc.frequency.setValueAtTime(freq, c.currentTime + startTime)

  gain.gain.setValueAtTime(0, c.currentTime + startTime)
  gain.gain.linearRampToValueAtTime(gainVal, c.currentTime + startTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + startTime + duration)

  osc.start(c.currentTime + startTime)
  osc.stop(c.currentTime + startTime + duration + 0.05)
}

function playFreqSweep(freqStart, freqEnd, duration, gainVal = 0.1, type = 'sine') {
  const c = getCtx()
  if (!c) return

  const osc  = c.createOscillator()
  const gain = c.createGain()

  osc.connect(gain)
  gain.connect(c.destination)

  osc.type = type
  osc.frequency.setValueAtTime(freqStart, c.currentTime)
  osc.frequency.exponentialRampToValueAtTime(freqEnd, c.currentTime + duration)

  gain.gain.setValueAtTime(0, c.currentTime)
  gain.gain.linearRampToValueAtTime(gainVal, c.currentTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)

  osc.start(c.currentTime)
  osc.stop(c.currentTime + duration + 0.05)
}

// ── Sonidos ────────────────────────────────────────────────────────────

function soundClick() {
  // Tick suave: 800Hz, 80ms
  playTone(800, 0.08, 0.07, 'sine')
}

function soundCorrect() {
  // Acorde mayor ascendente Do-Mi-Sol
  playTone(523, 0.15, 0.12, 'sine', 0)
  playTone(659, 0.15, 0.10, 'sine', 0.14)
  playTone(784, 0.20, 0.10, 'sine', 0.28)
}

function soundIncorrect() {
  // Tono descendente disonante
  playFreqSweep(400, 220, 0.3, 0.10, 'sawtooth')
}

function soundLevelUp() {
  // Fanfarria corta: 5 notas ascendentes
  const notes = [523, 587, 659, 698, 784]
  notes.forEach((freq, i) => {
    playTone(freq, 0.18, 0.10, 'sine', i * 0.12)
  })
  // Eco del acorde final
  playTone(784, 0.4, 0.06, 'sine', notes.length * 0.12 + 0.05)
}

function soundXP() {
  // Ding metálico: 1200Hz, decay rápido
  playTone(1200, 0.2, 0.10, 'sine')
  playTone(1800, 0.15, 0.05, 'sine', 0.02)
}

function soundStreak() {
  // Fuego: dos tonos entrelazados
  playTone(300, 0.3, 0.08, 'sawtooth')
  playTone(360, 0.25, 0.05, 'sawtooth', 0.05)
}

function soundComplete() {
  // Victoria: acorde completo + eco
  playTone(523, 0.2, 0.12, 'sine', 0)
  playTone(659, 0.2, 0.10, 'sine', 0)
  playTone(784, 0.2, 0.10, 'sine', 0)
  playTone(1047, 0.4, 0.08, 'sine', 0.18)
  // Reverb simulado
  playTone(523, 0.5, 0.04, 'sine', 0.35)
  playTone(659, 0.5, 0.03, 'sine', 0.35)
}

function soundUnlock() {
  // Reveal: sweep 200→800Hz
  playFreqSweep(200, 800, 0.4, 0.10, 'sine')
  playTone(800, 0.2, 0.06, 'sine', 0.38)
}

// ── API pública ────────────────────────────────────────────────────────

const SOUNDS = {
  click:     soundClick,
  correct:   soundCorrect,
  incorrect: soundIncorrect,
  levelup:   soundLevelUp,
  xp:        soundXP,
  streak:    soundStreak,
  complete:  soundComplete,
  unlock:    soundUnlock,
}

export function playSound(type) {
  try {
    SOUNDS[type]?.()
  } catch {
    // Silencio ante cualquier error de Audio API
  }
}

// Activa el AudioContext en el primer toque/click
export function initAudio() {
  getCtx()
}
