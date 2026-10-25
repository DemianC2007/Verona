import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ARRANGEMENTS, WA_NUM } from '../data/content'
import PedidoForm from './PedidoForm'

function ProductCard({ product, index, onPedir }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      {/* Image */}
      <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Hover overlay with CTA */}
        <motion.div className="absolute inset-0 bg-charcoal/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={() => onPedir(product)}
            className="px-6 py-2.5 bg-pearl text-charcoal text-[13px] font-sans font-medium tracking-wide hover:bg-petal hover:text-white transition-colors duration-200"
          >
            Pedir
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-serif text-lg text-charcoal mb-1">{product.name}</h3>
        <p className="font-sans text-stone-500 text-sm leading-relaxed mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-serif text-xl text-charcoal">{product.price}</span>
          <button
            type="button"
            onClick={() => onPedir(product)}
            className="text-petal text-sm font-sans font-medium hover:underline underline-offset-2"
          >
            Ordenar
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Estudio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const catalogMsg = encodeURIComponent('Hola Magenta, me gustaría conocer más arreglos disponibles.')
  const [pedido, setPedido] = useState(null)
  const cerrar = useCallback(() => setPedido(null), [])
  const pedir = useCallback((p) => setPedido({
    etiqueta: 'arreglo', seccion: 'estudio', imagen: p.image, imagenUrl: `https://veronafloreria.online${p.image}`, detalle: `"${p.name}" (${p.price})`,
  }), [])

  return (
    <section id="estudio" className="py-24 lg:py-32 bg-pearl">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="mb-16 lg:mb-20 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-[10px] font-sans font-semibold tracking-[0.38em] text-petal uppercase mb-4"
          >
            Arreglos de autor
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl lg:text-[3.5rem] italic text-charcoal"
          >
            Estudio de Diseño
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
            className="mt-5 font-sans text-stone-500 text-base leading-relaxed"
          >
            Cada pieza es única. Diseñamos arreglos con identidad propia, usando flores de temporada y
            materiales cuidadosamente seleccionados.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {ARRANGEMENTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onPedir={pedir} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <a
            href={`https://wa.me/${WA_NUM}?text=${catalogMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 border border-charcoal/20 text-charcoal text-[13px] font-sans font-medium tracking-wide hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.105 1.523 5.827L0 24l6.341-1.507A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.727.886.9-3.628-.234-.372A9.818 9.818 0 1112 21.818z" />
            </svg>
            Ver Catálogo Completo
          </a>
        </motion.div>
      </div>
      <PedidoForm pedido={pedido} onClose={cerrar} />
    </section>
  )
}
