import { motion } from 'framer-motion'
import { IMAGES, WA_NUM } from '../data/content'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
})

const STATS = [
  ['150+', 'Estudiantes'],
  ['5', 'Años de pasión'],
  ['500+', 'Arreglos creados'],
]

export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col-reverse lg:flex-row pt-20 overflow-hidden"
    >
      {/* Text column */}
      <div className="flex-none lg:w-[45%] flex flex-col justify-center px-8 lg:pl-16 xl:pl-24 lg:pr-12 py-16 lg:py-0">
        <motion.span
          {...fadeUp(0.25)}
          className="inline-block text-[10px] font-sans font-semibold tracking-[0.38em] text-petal uppercase mb-5"
        >
          Academia · Estudio
        </motion.span>

        <motion.h1
          {...fadeUp(0.4)}
          className="font-serif text-5xl lg:text-6xl xl:text-[4.25rem] font-medium leading-[1.08] text-charcoal mb-6"
        >
          Aprende el Arte,
          <br />
          <em className="italic text-charcoal/75">Regala Emoción</em>
        </motion.h1>

        <motion.p {...fadeUp(0.55)} className="font-sans text-stone-500 text-base leading-relaxed max-w-sm mb-10">
          En Magenta unimos dos mundos: la <strong className="font-medium text-charcoal">Academia</strong> donde
          transmitimos el arte floral, y el{' '}
          <strong className="font-medium text-charcoal">Estudio</strong> donde cada arreglo nace desde la
          pasión y la técnica.
        </motion.p>

        <motion.div {...fadeUp(0.68)} className="flex flex-col sm:flex-row gap-3 mb-14">
          <a
            href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent('Hola Magenta! Me gustaría más información sobre sus cursos y arreglos.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-petal text-white font-sans text-sm font-medium tracking-wide hover:bg-petal-dark transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.105 1.523 5.827L0 24l6.341-1.507A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.727.886.9-3.628-.234-.372A9.818 9.818 0 1112 21.818z"/>
            </svg>
            Escríbenos
          </a>
          <a
            href="#academia"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-charcoal/20 text-charcoal font-sans text-sm font-medium tracking-wide hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-200"
          >
            Ver Cursos
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.82)}
          className="flex gap-8 pt-8 border-t border-charcoal/10"
        >
          {STATS.map(([num, label]) => (
            <div key={label}>
              <div className="font-serif text-3xl font-medium text-charcoal">{num}</div>
              <div className="text-[11px] font-sans text-stone-400 tracking-wide mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Image column */}
      <motion.div
        className="flex-none lg:flex-1 relative h-64 sm:h-80 lg:h-auto overflow-hidden"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={IMAGES.hero}
          alt="Florista de Magenta sosteniendo un arreglo de autor"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle left-fade to blend with the white text column on desktop */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-pearl to-transparent pointer-events-none" />

        {/* Floating badge */}
        <motion.div
          className="absolute bottom-8 left-8 lg:left-auto lg:right-8 bg-pearl/95 backdrop-blur-sm px-5 py-3 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-serif text-sm text-charcoal italic">Arte floral de autor</div>
          <div className="text-[10px] font-sans text-stone-400 tracking-widest uppercase mt-0.5">
            Magenta
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
