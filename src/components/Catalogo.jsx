import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CATALOG_ARREGLOS, CATALOG_RAMOS, WA_NUM } from '../data/content'

const TABS = [
  { key: 'all', label: 'Todos' },
  { key: 'arreglo', label: 'Arreglos en caja / jarrón' },
  { key: 'ramo', label: 'Ramos' },
]

const ALL = [...CATALOG_ARREGLOS, ...CATALOG_RAMOS]

const PROD_BASE = 'https://veronafloreria.online'

function CatalogCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const label = item.tipo === 'arreglo' ? 'arreglo' : 'ramo'
  const imageUrl = `${PROD_BASE}/images/${item.id}.jpg`
  const waMsg = encodeURIComponent(
    `Hola Verona, me interesa este ${label} del catálogo:\n${imageUrl}\n\n¿Me puede dar más información y precio?`
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 8) * 0.055, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden bg-pearl"
      style={{ aspectRatio: '1 / 1' }}
    >
      <img
        src={item.image}
        alt={item.tipo === 'arreglo' ? 'Arreglo floral' : 'Ramo floral'}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-charcoal/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href={`https://wa.me/${WA_NUM}?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-pearl text-charcoal text-[12px] font-sans font-medium tracking-wide hover:bg-petal hover:text-white transition-colors duration-200"
        >
          Pedir por WhatsApp
        </a>
      </div>
    </motion.div>
  )
}

export default function Catalogo() {
  const [tab, setTab] = useState('all')
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  const items = tab === 'all' ? ALL : tab === 'arreglo' ? CATALOG_ARREGLOS : CATALOG_RAMOS
  const waMsg = encodeURIComponent('Hola Verona, me gustaría hacer un pedido del catálogo.')

  return (
    <section id="catalogo" className="py-24 lg:py-32 bg-pearl-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
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
            Arreglos en caja y jarrón, ramos frescos y bouquets de autor. Haz tu pedido directo por WhatsApp.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2 text-[12px] font-sans font-medium tracking-wide transition-all duration-200 ${
                tab === t.key
                  ? 'bg-petal text-white'
                  : 'bg-transparent text-stone-500 border border-charcoal/15 hover:border-petal/60 hover:text-charcoal'
              }`}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Photo grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 lg:gap-3"
          >
            {items.map((item, i) => (
              <CatalogCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

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
    </section>
  )
}
