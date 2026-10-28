import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WA_NUM } from '../data/content'

// Formulario que sale al pedir un ramo o arreglo. Todo es opcional y aproximado (Demian, 2026-10-25):
// Angel termina de calificar el pedido por WhatsApp. Al enviarlo se guarda en el panel (y llega por correo) y abre WhatsApp con el pedido ya escrito.
const PEDIDOS_URL = 'https://analytics.magentaflores.store/api/pedido'
const hoy = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const fechaLarga = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })

const DIAS = ['Hoy', 'Mañana', 'Esta semana', 'Otra fecha']
const HORAS = ['En la mañana', 'Al mediodía', 'En la tarde', 'En la noche']

function Opciones({ opciones, valor, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {opciones.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={valor === o}
          onClick={() => onChange(valor === o ? '' : o)}
          className={`px-3.5 py-2 text-[13px] font-sans border transition-colors duration-150 ${
            valor === o ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-charcoal border-charcoal/15 hover:border-petal/60'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export default function PedidoForm({ pedido, onClose }) {
  const [dia, setDia] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [recibe, setRecibe] = useState('')
  const [notas, setNotas] = useState('')

  useEffect(() => {
    if (!pedido) return
    setDia(''); setFecha(''); setHora(''); setRecibe(''); setNotas('')
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [pedido, onClose])

  const enviar = (e) => {
    e.preventDefault()
    const cuando = dia === 'Otra fecha' ? (fecha ? fechaLarga(fecha) : '') : dia
    const datos = [
      cuando && `Para: ${cuando}`,
      hora && `Hora aproximada: ${hora.toLowerCase()}`,
      recibe.trim() && `Lo recibe: ${recibe.trim()}`,
      notas.trim() && `Notas: ${notas.trim()}`,
    ].filter(Boolean)
    const texto = [
      `Hola Magenta, me interesa este ${pedido.etiqueta}:`,
      pedido.detalle,
      ...(datos.length ? ['', ...datos] : []),
      '',
      '¿Me dan precio y disponibilidad?',
    ].join('\n')
    window.dispatchEvent(new CustomEvent('ca:event', {
      detail: { name: 'clic_whatsapp', seccion: pedido.seccion, texto: 'Formulario de pedido', mensaje: `Pedido de ${pedido.etiqueta}` },
    }))
    try {
      fetch(PEDIDOS_URL, {
        method: 'POST', keepalive: true, headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ tipo: pedido.etiqueta, seccion: pedido.seccion, detalle: pedido.detalle, imagen: pedido.imagenUrl,
          dia: cuando, hora, recibe: recibe.trim(), notas: notas.trim() }),
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
                  Si ya sabes cuándo lo quieres, márcalo. Si no, solo toca continuar y lo vemos por WhatsApp.
                </p>
              </div>
              <button onClick={onClose} aria-label="Cerrar" className="self-start text-stone-400 hover:text-charcoal text-2xl leading-none px-1">
                ×
              </button>
            </div>

            <form onSubmit={enviar} className="p-5 space-y-5">
              <div>
                <p className={etiqueta}>¿Para cuándo?</p>
                <Opciones label="¿Para cuándo?" opciones={DIAS} valor={dia} onChange={setDia} />
                {dia === 'Otra fecha' && (
                  <input type="date" min={hoy()} value={fecha} aria-label="Fecha de entrega"
                    onChange={(e) => setFecha(e.target.value)} className={`${campo} mt-2`} />
                )}
              </div>
              <div>
                <p className={etiqueta}>¿A qué hora, más o menos?</p>
                <Opciones label="Hora aproximada" opciones={HORAS} valor={hora} onChange={setHora} />
              </div>
              <div>
                <label htmlFor="pedido-recibe" className={etiqueta}>¿Quién lo recibe?</label>
                <input id="pedido-recibe" type="text" maxLength={80} autoComplete="off" placeholder="Nombre (si ya lo sabes)"
                  value={recibe} onChange={(e) => setRecibe(e.target.value)} className={campo} />
              </div>
              <div>
                <label htmlFor="pedido-notas" className={etiqueta}>Notas</label>
                <textarea id="pedido-notas" rows={2} maxLength={600}
                  placeholder="Colores, mensaje para la tarjeta, zona de entrega…"
                  value={notas} onChange={(e) => setNotas(e.target.value)} className={`${campo} resize-none`} />
              </div>
              <button type="submit"
                className="w-full h-12 bg-petal text-white text-[15px] font-sans font-medium tracking-wide hover:bg-petal-dark transition-colors duration-200">
                Continuar en WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
