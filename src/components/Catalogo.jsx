import { useState, useRef, useMemo, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CATALOG_ARREGLOS, CATALOG_RAMOS, CATALOG_FUNEBRES, WA_NUM } from '../data/content'
import PedidoForm from './PedidoForm'
import FlorIcon from './FlorIcon'
import Foto from './Foto'

const TABS = [
  { key: 'all', label: 'Todos' },
  { key: 'arreglo', label: 'Arreglos en caja / jarrón' },
  { key: 'ramo', label: 'Ramos' },
  { key: 'funebre', label: 'Servicios fúnebres' },
]

const ALL = [...CATALOG_ARREGLOS, ...CATALOG_RAMOS, ...CATALOG_FUNEBRES]
const POR_TIPO = { all: ALL, arreglo: CATALOG_ARREGLOS, ramo: CATALOG_RAMOS, funebre: CATALOG_FUNEBRES }
// Cómo se nombra cada tipo en textos y mensajes
const NOMBRE = { arreglo: 'arreglo', ramo: 'ramo', funebre: 'arreglo fúnebre' }
const PLURAL = { arreglo: 'arreglos', ramo: 'ramos', funebre: 'arreglos fúnebres', all: 'arreglos' }

const PROD_BASE = 'https://magentaflores.store'

// Flores del buscador, de la más común a la menos común
const FLORES = (() => {
  const n = {}
  ALL.forEach((it) => it.flores.forEach((f) => { n[f] = (n[f] || 0) + 1 }))
  return Object.keys(n).sort((a, b) => n[b] - n[a] || a.localeCompare(b)).map((f) => ({ flor: f, fotos: n[f] }))
})()

// Otras formas en que la gente escribe cada flor (para el buscador)
const OTROS_NOMBRES = {
  Rosas: ['rosa', 'roses', 'rose'],
  Gerberas: ['gerbera', 'gerberas'],
  Girasoles: ['girasol', 'sunflower'],
  Lilis: ['lili', 'lily', 'lilium', 'lirio', 'azucena'],
  Tulipanes: ['tulipan', 'tulip'],
  Margaritas: ['margarita', 'daisy'],
  Alstroemerias: ['alstroemeria', 'astromelia', 'alstromelia', 'astromeria'],
  Crisantemos: ['crisantemo', 'pompon', 'pompón'],
  Claveles: ['clavel', 'carnation'],
  Nube: ['nube', 'gypsophila', 'gipsofila', 'aliento de bebe', 'paniculata', 'baby breath'],
  Perritos: ['perrito', 'snapdragon', 'boca de dragon', 'antirrhinum'],
  Anturios: ['anturio', 'anthurium'],
}
const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
const coincide = (flor, q) => {
  if (!q) return true
  return [flor, ...(OTROS_NOMBRES[flor] || [])].some((n) => {
    const x = norm(n)
    return x.includes(q) || q.includes(x)
  })
}

function CatalogCard({ item, index, onPedir }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '300px 0px' })
  const label = NOMBRE[item.tipo]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden bg-pearl"
      style={{ aspectRatio: '1 / 1' }}
    >
      <button
        type="button"
        onClick={() => onPedir(item)}
        className="block w-full h-full text-left"
        aria-label={`Pedir este ${label}: ${item.flores.join(', ')}`}
      >
        <Foto
          src={item.image}
          alt={`${label[0].toUpperCase() + label.slice(1)} con ${item.flores.join(', ').toLowerCase()}`}
          className="w-full h-full"
          imgClassName="group-hover:scale-[1.06]"
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
  const [busca, setBusca] = useState('')
  const pickerRef = useRef(null)
  const gridRef = useRef(null)
  const q = norm(busca)
  const visibles = FLORES.filter((f) => coincide(f.flor, q))
  const elegir = (f) => {
    setFlor(f)
    setBusca('')
    if (f) requestAnimationFrame(() => {
      const y = gridRef.current.getBoundingClientRect().top + window.scrollY - 190
      window.scrollTo({ top: y, behavior: 'smooth' })
    })
  }
  const verPicker = () => {
    const y = pickerRef.current.getBoundingClientRect().top + window.scrollY - 110
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
  const [pedido, setPedido] = useState(null)
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  const porTipo = POR_TIPO[tab]
  const items = useMemo(() => (flor ? porTipo.filter((it) => it.flores.includes(flor)) : porTipo), [porTipo, flor])
  const waMsg = encodeURIComponent('Hola Magenta, me gustaría hacer un pedido del catálogo.')

  const pedir = useCallback((item) => {
    const etiqueta = NOMBRE[item.tipo]
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
            Arreglos en caja y jarrón, ramos, bouquets y coronas para servicios fúnebres. Filtra por la flor que buscas y toca el que te guste para pedirlo.
          </motion.p>
        </div>

        {/* ¿Qué flor buscas? Dibujo de cada flor + buscador */}
        <div ref={pickerRef} className="mb-10 bg-pearl border border-charcoal/10 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h3 className="font-serif text-2xl text-charcoal">¿Qué flor buscas?</h3>
            <label className="relative sm:w-80">
              <span className="sr-only">Buscar una flor</span>
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && visibles[0]) { e.preventDefault(); elegir(visibles[0].flor) } }}
                placeholder="Escribe una flor: rosa, girasol…"
                className="w-full bg-white border border-charcoal/15 pl-10 pr-3 py-2.5 text-[16px] font-sans text-charcoal focus:outline-none focus:border-petal"
              />
            </label>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {!q && (
              <button
                onClick={() => elegir('')}
                aria-pressed={!flor}
                className={`flex flex-col items-center gap-1 py-3 px-1 border transition-colors duration-150 ${
                  !flor ? 'border-petal bg-petal-light' : 'border-charcoal/10 bg-white hover:border-petal/50'
                }`}
              >
                <span className="flex -space-x-5">
                  <FlorIcon flor="Rosas" size={48} /><FlorIcon flor="Girasoles" size={48} /><FlorIcon flor="Lilis" size={48} />
                </span>
                <span className="font-sans text-[13px] font-medium text-charcoal">Todas</span>
                <span className="font-sans text-[11px] text-stone-500">{ALL.length} fotos</span>
              </button>
            )}
            {visibles.map(({ flor: f, fotos }) => (
              <button
                key={f}
                onClick={() => elegir(flor === f ? '' : f)}
                aria-pressed={flor === f}
                className={`group/flor flex flex-col items-center gap-1 py-3 px-1 border transition-colors duration-150 ${
                  flor === f ? 'border-petal bg-petal-light' : 'border-charcoal/10 bg-white hover:border-petal/50'
                }`}
              >
                <FlorIcon flor={f} size={60} className="transition-transform duration-300 group-hover/flor:-rotate-6 group-hover/flor:scale-110" />
                <span className="font-sans text-[13px] font-medium text-charcoal">{f}</span>
                <span className="font-sans text-[11px] text-stone-500">{fotos} {fotos === 1 ? 'foto' : 'fotos'}</span>
              </button>
            ))}
            <a
              href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent(busca.trim()
                ? `Hola Magenta, busco un arreglo con ${busca.trim()}. ¿Me lo pueden hacer?`
                : 'Hola Magenta, busco un arreglo con una flor que no vi en el catálogo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 py-3 px-2 border border-dashed border-petal/60 bg-white hover:bg-petal-light text-center transition-colors duration-150"
            >
              <span className="w-[60px] h-[60px] flex items-center justify-center font-serif text-4xl text-petal" aria-hidden="true">?</span>
              <span className="font-sans text-[13px] font-medium text-charcoal leading-tight">No está la que yo quiero</span>
              <span className="font-sans text-[11px] text-stone-500">Pídela por WhatsApp</span>
            </a>
          </div>
          {q && !visibles.length && (
            <p className="font-sans text-sm text-stone-500 mt-4">
              No tenemos fotos con "{busca.trim()}". Toca "No está la que yo quiero" y te la armamos por WhatsApp.
            </p>
          )}
        </div>

        {/* Barra fija mientras recorren las fotos: tipo, flor elegida y cuántas hay */}
        <div className="sticky top-24 z-30 bg-pearl-dark -mx-6 px-6 lg:-mx-12 lg:px-12 py-3 mb-6 border-b border-charcoal/10 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div role="group" aria-label="Tipo" className="flex max-w-full overflow-x-auto border border-charcoal/15" style={{ scrollbarWidth: 'none' }}>
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                aria-pressed={tab === t.key}
                className={`flex-none whitespace-nowrap px-3 sm:px-5 py-2 text-[12px] font-sans font-medium transition-colors duration-200 ${
                  tab === t.key ? 'bg-petal text-white' : 'text-stone-600 hover:text-charcoal'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {flor ? (
            <button onClick={() => setFlor('')} className="flex items-center gap-1.5 pl-1 pr-3 py-1 bg-white border border-petal text-[12px] font-sans text-charcoal" aria-label={`Quitar filtro ${flor}`}>
              <FlorIcon flor={flor} size={26} /> {flor} <span className="text-stone-400 text-base leading-none ml-1">×</span>
            </button>
          ) : (
            <button onClick={verPicker} className="flex items-center gap-1.5 text-[12px] font-sans text-petal underline underline-offset-4">
              Elegir flor
            </button>
          )}
          <span className="ml-auto font-sans text-[12px] text-stone-500">{items.length} {items.length === 1 ? 'diseño' : 'diseños'}</span>
        </div>

        {/* Photo grid */}
        <div ref={gridRef} />
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
            No tenemos fotos de {PLURAL[tab]} con {flor.toLowerCase()} todavía, pero te lo podemos hacer.{' '}
            <a href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent(`Hola Magenta, me gustaría un ${tab === 'all' ? 'arreglo' : NOMBRE[tab]} con ${flor.toLowerCase()}.`)}`}
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
