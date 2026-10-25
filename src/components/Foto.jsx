import { useEffect, useRef, useState } from 'react'

// Foto con su propio "cargando": muestra un recuadro que late mientras baja la imagen y la
// revela con una animación corta en cuanto está lista. Empieza a bajar ~600 px antes de
// asomarse en pantalla, así al hacer scroll rápido ya está o casi.
export default function Foto({ src, alt, className = '', imgClassName = '', style, ratio }) {
  const box = useRef(null)
  const img = useRef(null)
  const [cerca, setCerca] = useState(false)
  const [lista, setLista] = useState(false)

  useEffect(() => {
    const el = box.current
    if (!el || !('IntersectionObserver' in window)) { setCerca(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCerca(true); io.disconnect() }
    }, { rootMargin: '600px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Si ya estaba en caché, onLoad puede llegar antes de que React escuche
  useEffect(() => {
    if (cerca && img.current?.complete && img.current.naturalWidth) setLista(true)
  }, [cerca])

  return (
    <div
      ref={box}
      className={`relative overflow-hidden bg-charcoal/[0.06] ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      {!lista && <div className="absolute inset-0 animate-pulse bg-charcoal/[0.05]" aria-hidden="true" />}
      {cerca && (
        <img
          ref={img}
          src={src}
          alt={alt}
          decoding="async"
          onLoad={() => setLista(true)}
          onError={() => setLista(true)}
          className={`w-full h-full object-cover transition-[opacity,transform] duration-700 ease-out ${
            lista ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
          } ${imgClassName}`}
        />
      )}
    </div>
  )
}
