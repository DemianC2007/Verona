import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Academia', href: '#academia' },
  { label: 'Estudio', href: '#estudio' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nuestra Esencia', href: '#esencia' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-pearl ${
          scrolled ? 'shadow-[0_1px_0_0_rgba(44,32,24,0.08)]' : ''
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.jpg`}
              alt="Verona Floral Studio"
              className="h-16 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13px] font-sans font-medium text-stone-500 hover:text-charcoal transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-5">
            <a
              href="#academia"
              className="hidden lg:inline-flex items-center px-6 py-2.5 bg-petal text-white text-[13px] font-sans font-medium tracking-wide hover:bg-petal-dark transition-colors duration-200"
            >
              Reserva tu Curso
            </a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 flex flex-col gap-[5px]"
              aria-label="Abrir menú"
            >
              <span
                className={`block w-6 h-[1.5px] bg-charcoal transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-charcoal transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-charcoal transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-pearl-dark flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col items-center gap-8 mb-10">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-4xl italic text-charcoal hover:text-petal transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="#academia"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="px-10 py-3.5 bg-petal text-white text-sm font-sans font-medium tracking-wide hover:bg-petal-dark transition-colors duration-200"
            >
              Reserva tu Curso
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
