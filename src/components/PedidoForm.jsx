import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WA_NUM } from '../data/content'

// Formulario que sale al pedir un ramo o arreglo: día, hora y quién recibe.
// Al enviarlo se guarda en el panel (y llega por correo) y abre WhatsApp con el pedido ya escrito.
const PEDIDOS_URL = 'https://analytics.veronafloreria.online/api/pedido'
const hoy = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const fechaLarga = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })

const horaBonita = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return new Date(2000, 0, 1, h, m).toLocaleTimeString('es-MX', { hour: 'numeric', minute: '2-digit' })
}

export default function PedidoForm({ pedido, onClose }) {
  const [dia, setDia] = useState('')
  const [hora, setHora] = useState('')
  const [recibe, setRecibe] = useState('')
  const [notas, setNotas] = useState('')
  const firstRef = useRef(null)

  useEffect(() => {
    if (!pedido) return
    setDia(''); setHora(''); setRecibe(''); setNotas('')
    const t = setTimeout(() => firstRef.current?.focus(), 250)
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [pedido, onClose])

  const enviar = (e) => {
    e.preventDefault()
    const texto = [
      `Hola Magenta, quiero pedir este ${pedido.etiqueta}:`,
      pedido.detalle,
      '',
      `Día de entrega: ${fechaLarga(dia)}`,
      `Hora de entrega: ${horaBonita(hora)}`,
      `Persona que recibe: ${recibe.trim()}`,
      ...(notas.trim() ? [`Notas: ${notas.trim()}`] : []),
      '',
      '¿Me confirman disponibilidad y precio?',
    ].join('\n')
    window.dispatchEvent(new CustomEvent('ca:event', {
      detail: { name: 'clic_whatsapp', seccion: pedido.seccion, texto: 'Formulario de pedido', mensaje: `Pedido de ${pedido.etiqueta}` },
    }))
    try {
      fetch(PEDIDOS_URL, {
        method: 'POST', keepalive: true, headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ tipo: pedido.etiqueta, seccion: pedido.seccion, detalle: pedido.detalle, imagen: pedido.imagenUrl,
          dia, hora, recibe: recibe.trim(), notas: notas.trim() }),
      }).catch(() => {})
    } catch (x) { /* sin conexión: WhatsApp sigue funcionando */ }
    const url = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(texto)}`
    // Con 'noopener' window.open siempre regresa null; se corta el opener a mano
    const w = window.open(url, '_blank')
    if (w) w.opener = null
    else window.location.href = url
    onClose()
  }

  const campo = 'w-full bg-white border border-charcoal/15 px-4 py-3 text-[16px] font-sans text-charcoal focus:outline-none focus:border-petal'
  const etiqueta = 'block text-[13px] font-sans font-medium text-charcoal mb-1.5'

  return (
    <AnimatePresence>
      {pedido && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-charcoal/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pedido-titulo"
            className="w-full sm:max-w-md bg-pearl max-h-[92vh] overflow-y-auto"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-4 p-5 border-b border-charcoal/10">
              <img src={pedido.imagen} alt="" className="w-20 h-20 object-cover flex-none" />
              <div className="flex-1 min-w-0">
                <h3 id="pedido-titulo" className="font-serif text-xl text-charcoal">Pedir este {pedido.etiqueta}</h3>
                <p className="font-sans text-sm text-stone-500 mt-1">
                  Dinos cuándo y para quién. Te confirmamos precio y disponibilidad por WhatsApp.
                </p>
              </div>
              <button onClick={onClose} aria-label="Cerrar" className="self-start text-stone-400 hover:text-charcoal text-2xl leading-none px-1">
                ×
              </button>
            </div>

            <form onSubmit={enviar} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="pedido-dia" className={etiqueta}>Día de entrega</label>
                  <input ref={firstRef} id="pedido-dia" type="date" required min={hoy()} value={dia}
                    onChange={(e) => setDia(e.target.value)} className={campo} />
                </div>
                <div>
                  <label htmlFor="pedido-hora" className={etiqueta}>Hora de entrega</label>
                  <input id="pedido-hora" type="time" required value={hora}
                    onChange={(e) => setHora(e.target.value)} className={campo} />
                </div>
              </div>
              <div>
                <label htmlFor="pedido-recibe" className={etiqueta}>Persona que recibe</label>
                <input id="pedido-recibe" type="text" required maxLength={80} autoComplete="off" placeholder="Nombre de quien recibe"
                  value={recibe} onChange={(e) => setRecibe(e.target.value)} className={campo} />
              </div>
              <div>
                <label htmlFor="pedido-notas" className={etiqueta}>
                  Notas de la entrega <span className="font-normal text-stone-400">(opcional)</span>
                </label>
                <textarea id="pedido-notas" rows={3} maxLength={600}
                  placeholder="Dirección, mensaje para la tarjeta, colores que prefieres…"
                  value={notas} onChange={(e) => setNotas(e.target.value)} className={`${campo} resize-none`} />
              </div>
              <button type="submit"
                className="w-full h-12 bg-petal text-white text-[15px] font-sans font-medium tracking-wide hover:bg-petal-dark transition-colors duration-200">
                Enviar pedido por WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
