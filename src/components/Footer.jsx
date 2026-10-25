const NAV = [
  { label: 'Academia', href: '#academia' },
  { label: 'Estudio', href: '#estudio' },
  { label: 'Nuestra Esencia', href: '#esencia' },
  { label: 'Contacto', href: '#contacto' },
]

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/verona_academia_floral/' },
]

export default function Footer() {
  return (
    <footer id="contacto" className="bg-pearl border-t border-charcoal/[0.07] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src={`${import.meta.env.BASE_URL}images/magenta-logo.png`}
                alt="Magenta Diseño Floral y Eventos"
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="font-sans text-stone-500 text-sm leading-relaxed max-w-[220px]">
              Academia de arte floral y estudio de diseño. Creamos belleza, enseñamos pasión.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[10px] font-semibold tracking-[0.3em] text-charcoal uppercase mb-5">
              Navegación
            </h4>
            <ul className="space-y-3">
              {NAV.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-stone-500 hover:text-charcoal transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[10px] font-semibold tracking-[0.3em] text-charcoal uppercase mb-5">
              Encuéntranos
            </h4>
            <div className="space-y-2 mb-6">
              <p><a href="mailto:magenta.jrz@gmail.com" className="font-sans text-sm text-stone-500 hover:text-charcoal">magenta.jrz@gmail.com</a></p>
              <p><a href="https://wa.me/526564442305" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-stone-500 hover:text-charcoal">WhatsApp +52 656 444 2305</a></p>
              <p className="font-sans text-sm text-stone-500">Ciudad Juárez, Chihuahua</p>
            </div>
            <div className="flex gap-5">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="font-sans text-[10px] font-semibold text-stone-400 hover:text-petal tracking-[0.25em] uppercase transition-colors duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-charcoal/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-stone-400">
            © {new Date().getFullYear()} Magenta Diseño Floral y Eventos. Todos los derechos reservados.
          </p>
          <p className="font-sans text-xs text-stone-300">
            Sitio web por{' '}
            <a
              href="https://calleros.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-petal transition-colors duration-200"
            >
              calleros.me
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
