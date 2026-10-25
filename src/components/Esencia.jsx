import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { IMAGES } from '../data/content'

const PILLARS = [
  ['Flores frescas', 'Seleccionadas cada mañana del mercado'],
  ['Talleres íntimos', 'Máximo 6 estudiantes por sesión'],
  ['Diseño de autor', 'Cada pieza es única, sin repetición'],
  ['Entrega a domicilio', 'Con cuidado, a tiempo y con amor'],
]

export default function Esencia() {
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const textInView = useInView(textRef, { once: true, margin: '-80px' })
  const imageInView = useInView(imageRef, { once: true, margin: '-80px' })

  return (
    <section id="esencia" className="bg-pearl-dark overflow-hidden">
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:min-h-[640px]">
        {/* Image */}
        <motion.div
          ref={imageRef}
          className="relative h-72 sm:h-96 lg:h-auto overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          animate={imageInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={IMAGES.esencia}
            alt="Nuestra filosofía floral — pétalos y arte"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle warm overlay */}
          <div className="absolute inset-0 bg-petal/5 mix-blend-multiply pointer-events-none" />

          {/* Decorative petal accents (CSS shapes) */}
          <div className="absolute top-12 right-12 w-3 h-8 rounded-full bg-white/20 rotate-[30deg] blur-sm" />
          <div className="absolute bottom-20 right-24 w-2 h-5 rounded-full bg-white/15 rotate-[-20deg] blur-sm" />
          <div className="absolute top-1/2 right-8 w-2 h-6 rounded-full bg-white/10 rotate-[50deg] blur-sm" />
        </motion.div>

        {/* Text */}
        <div
          ref={textRef}
          className="flex flex-col justify-center px-8 lg:px-14 xl:px-20 py-16 lg:py-24"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={textInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-block text-[10px] font-sans font-semibold tracking-[0.38em] text-petal uppercase mb-4"
          >
            Sobre Nosotros
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl lg:text-5xl italic text-charcoal mb-1"
          >
            Nuestra Esencia
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={textInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="h-px w-14 bg-petal origin-left mb-7"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-sans text-stone-500 text-base leading-relaxed mb-4"
          >
            En Magenta creemos que cada flor tiene una historia que contar. Nuestro trabajo no es solo
            arreglar flores: es capturar un momento, traducir una emoción y entregarla de forma
            tangible, efímera y hermosa.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="font-sans text-stone-500 text-base leading-relaxed mb-10"
          >
            Desde nuestra Academia formamos a la próxima generación de diseñadores florales con la
            misma pasión y rigor con la que construimos cada pieza de nuestro Estudio.
          </motion.p>

          {/* Pillars grid */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.78 }}
            className="grid grid-cols-2 gap-x-6 gap-y-6 pt-8 border-t border-charcoal/10"
          >
            {PILLARS.map(([title, desc]) => (
              <div key={title}>
                <div className="font-serif text-sm font-medium text-charcoal mb-1">{title}</div>
                <div className="text-[12px] font-sans text-stone-400 leading-snug">{desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
