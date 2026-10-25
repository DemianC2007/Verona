import { COURSES, WA_NUM } from '../data/content'

// Mención corta de los cursos: Magenta ahora vive de los arreglos y los cursos son ocasionales.
const wa = (msg) => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`

export default function Cursos() {
  return (
    <section id="cursos" className="py-20 lg:py-24 bg-pearl border-t border-charcoal/[0.07]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 className="font-serif text-3xl lg:text-4xl italic text-charcoal">También damos cursos</h2>
          <p className="mt-4 font-sans text-stone-500 text-base leading-relaxed max-w-md">
            De vez en cuando abrimos grupos para enseñar diseño floral, desde lo básico hasta arreglos para eventos.
            Si te interesa, escríbenos y te avisamos de la próxima fecha.
          </p>
          <a
            href={wa('Hola Magenta, me interesa saber cuándo abren el próximo curso.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-petal text-sm font-sans font-medium underline underline-offset-4 hover:text-petal-dark"
          >
            Avísame del próximo curso
          </a>
        </div>

        <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
          {COURSES.map((c) => (
            <li key={c.id} className="py-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div>
                <h3 className="font-serif text-lg text-charcoal">{c.title}</h3>
                <p className="font-sans text-sm text-stone-500">
                  {c.duration}{c.price && !/consultar/i.test(c.price) ? ` · ${c.price}` : ''}
                </p>
              </div>
              <div className="flex gap-5 text-sm font-sans">
                {c.brochure && (
                  <a href={c.brochure} target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-charcoal underline underline-offset-4">
                    Ver temario
                  </a>
                )}
                <a
                  href={wa(`Hola Magenta, me interesa el curso "${c.title}". ¿Cuándo hay fecha?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-petal hover:text-petal-dark underline underline-offset-4"
                >
                  Preguntar
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
