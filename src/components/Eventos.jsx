import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EVENTOS_GALLERY, WA_NUM } from '../data/content'
import Foto from './Foto'

function GalleryItem({ item }) {
  return (
    <div className="break-inside-avoid mb-4 lg:mb-6 group">
      <Foto src={item.image} alt={item.alt} ratio={item.ratio}
        imgClassName="group-hover:scale-[1.03] transition-transform duration-700" />
    </div>
  )
}

export default function Eventos() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })
  const waMsg = encodeURIComponent('Hola Magenta! Me gustaría cotizar decoración floral para un evento. ¿Tienen disponibilidad?')

  return (
    <section id="eventos" className="py-24 lg:py-32 bg-pearl-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-20 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-[10px] font-sans font-semibold tracking-[0.38em] text-petal uppercase mb-4"
          >
            Bodas · Ceremonias · Celebraciones
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl lg:text-[3.5rem] italic text-charcoal"
          >
            Eventos
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
            Transformamos espacios en experiencias florales únicas. Bodas, quince años, corporativos
            y cada celebración que merece ser recordada.
          </motion.p>
        </div>

        {/* Masonry gallery */}
        <div className="columns-2 md:columns-3 gap-4 lg:gap-6">
          {EVENTOS_GALLERY.map((item, i) => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="font-sans text-stone-500 text-sm mb-6">
            ¿Tienes un evento próximo? Cotiza con nosotros sin compromiso.
          </p>
          <a
            href={`https://wa.me/${WA_NUM}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-petal text-white text-[13px] font-sans font-medium tracking-wide hover:bg-petal-dark transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.105 1.523 5.827L0 24l6.341-1.507A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.727.886.9-3.628-.234-.372A9.818 9.818 0 1112 21.818z" />
            </svg>
            Cotizar mi evento
          </a>
        </motion.div>

      </div>
    </section>
  )
}
