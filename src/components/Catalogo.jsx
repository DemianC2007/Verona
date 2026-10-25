import { useState, useRef, useMemo, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CATALOG_ARREGLOS, CATALOG_RAMOS, WA_NUM } from '../data/content'
import PedidoForm from './PedidoForm'

const TABS = [
  { key: 'all', label: 'Todos' },
  { key: 'arreglo', label: 'Arreglos' },
  { key: 'ramo', label: 'Ramos' },
]

const ALL = [...CATALOG_ARREGLOS, ...CATALOG_RAMOS]

const PROD_BASE = 'https://veronafloreria.online'

// Flores del buscador, de la más común a la menos común
const FLORES = (() => {
  const n = {}
  ALL.forEach((it) => it.flores.forEach((f) => { n[f] = (n[f] || 0) + 1 }))
  return Object.keys(n).sort((a, b) => n[b] - n[a] || a.localeCompare(b))
})()

function CatalogCard({ item, index, onPedir }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const label = item.tipo === 'arreglo' ? 'arreglo' : 'ramo'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 8) * 0.055, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden bg-pearl"
      style={{ aspectRatio: '1 / 1' }}
    >
      <button
        type="button"
        onClick={() => onPedir(item)}
        className="block w-full h-full text-left"
        aria-label={`Pedir este ${label}: ${item.flores.join(', ')}`}
      >
        <img
          src={item.image}
          alt={`${item.tipo === 'arreglo' ? 'Arreglo' : 'Ramo'} con ${item.flores.join(', ').toLowerCase()}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent px-3 pt-8 pb-2.5 flex items-end justify-between gap-2">
          <span className="font-sans text-[11px] text-white/90 leading-tight">{item.flores.join(' · ')}</span>
          <span className="flex-none px-3 py-1.5 bg-pearl text-charcoal text-[11px] font-sans font-medium group-hover:bg-petal group-hover:text-white transition-colors duration-200">
            Pedir
          </span>
        </span>
      </button>
    </motion.div>
  )
}

export default function Catalogo() {
  const [tab, setTab] = useState('all')
  const [flor, setFlor] = useState('')
  const [pedido, setPedido] = useState(null)
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  const porTipo = tab === 'all' ? ALL : tab === 'arreglo' ? CATALOG_ARREGLOS : CATALOG_RAMOS
  const items = useMemo(() => (flor ? porTipo.filter((it) => it.flores.includes(flor)) : porTipo), [porTipo, flor])
  const waMsg = encodeURIComponent('Hola Magenta, me gustaría hacer un pedido del catálogo.')

  const pedir = useCallback((item) => {
    const etiqueta = item.tipo === 'arreglo' ? 'arreglo' : 'ramo'
    setPedido({
      etiqueta, seccion: 'catalogo', imagen: item.image, imagenUrl: `${PROD_BASE}/images/${item.id}.jpg`,
      detalle: `${PROD_BASE}/images/${item.id}.jpg (${item.flores.join(', ').toLowerCase()})`,
    })
  }, [])
  const cerrar = useCallback(() => setPedido(null), [])

  return (
    <section id="catalogo" className="pt-16 pb-24 lg:pt-24 lg:pb-32 bg-pearl-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-8 lg:mb-10">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-[10px] font-sans font-semibold tracking-[0.38em] text-petal uppercase mb-4"
          >
            Nuestros diseños
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl lg:text-[3.5rem] italic text-charcoal"
          >
            Catálogo
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-5 h-px w-16 bg-petal origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 font-sans text-stone-500 text-base leading-relaxed max-w-xl"
          >
            Arreglos en caja y jarrón, ramos y bouquets. Filtra por la flor que buscas y toca el que te guste para pedirlo.
          </motion.p>
        </div>

        {/* Filtros: se quedan pegados arriba mientras recorren las fotos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="sticky top-24 z-30 bg-pearl-dark -mx-6 px-6 lg:-mx-12 lg:px-12 pt-3 pb-3 mb-6 border-b border-charcoal/10"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <div role="group" aria-label="Tipo" className="flex border border-charcoal/15">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  aria-pressed={tab === t.key}
                  className={`px-3 sm:px-5 py-2 text-[12px] font-sans font-medium transition-colors duration-200 ${
                    tab === t.key ? 'bg-petal text-white' : 'text-stone-600 hover:text-charcoal'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <span className="font-sans text-[12px] text-stone-500 flex-none">{items.length} {items.length === 1 ? 'diseño' : 'diseños'}</span>
          </div>
          <div role="group" aria-label="Buscar por flor" className="flex gap-2 overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-wrap" style={{ scrollbarWidth: 'none' }}>
            <span id="buscar-flor" className="flex-none self-center font-sans text-[12px] text-stone-500 pr-1">Flor:</span>
            {['', ...FLORES].map((f) => (
              <button
                key={f || 'todas'}
                onClick={() => setFlor(f)}
                aria-pressed={flor === f}
                className={`flex-none px-3.5 py-1.5 text-[12px] font-sans transition-colors duration-200 border ${
                  flor === f
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'bg-pearl text-charcoal border-charcoal/15 hover:border-petal/60'
                }`}
              >
                {f || 'Todas'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Photo grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab + flor}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 lg:gap-3"
          >
            {items.map((item, i) => (
              <CatalogCard key={item.id} item={item} index={i} onPedir={pedir} />
            ))}
          </motion.div>
        </AnimatePresence>
        {!items.length && (
          <p className="font-sans text-stone-500 text-sm py-10 text-center">
            No tenemos fotos de {tab === 'arreglo' ? 'arreglos' : 'ramos'} con {flor.toLowerCase()} todavía, pero te lo podemos hacer.{' '}
            <a href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent(`Hola Magenta, me gustaría un ${tab === 'arreglo' ? 'arreglo' : 'ramo'} con ${flor.toLowerCase()}.`)}`}
              target="_blank" rel="noopener noreferrer" className="text-petal underline underline-offset-2">Pídelo por WhatsApp</a>
          </p>
        )}


        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <a
            href={`https://wa.me/${WA_NUM}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 border border-charcoal/20 text-charcoal text-[13px] font-sans font-medium tracking-wide hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.105 1.523 5.827L0 24l6.341-1.507A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.727.886.9-3.628-.234-.372A9.818 9.818 0 1112 21.818z" />
            </svg>
            Hacer Pedido por WhatsApp
          </a>
        </motion.div>
      </div>
      <PedidoForm pedido={pedido} onClose={cerrar} />
    </section>
  )
}
