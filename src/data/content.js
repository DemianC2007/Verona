const B = import.meta.env.BASE_URL

export const IMAGES = {
  hero: `${B}images/hero.png`,
  esencia: `${B}images/arreglo-novial.jpeg`,
}

export const COURSES = [
  {
    id: 1,
    title: 'Floral Básico',
    subtitle: 'Taller Inicial',
    description:
      'Aprende los fundamentos del arte floral en 5 días de clase: diseño cromático, tipos de flores y follajes, cuidados, proveedores, herramientas y finanzas. Programa disponible sábados y jueves.',
    duration: '5 días de clase',
    price: '$5,800 MXN',
    image: `${B}images/basico-1.png`,
    tag: 'Red Conocer',
    badge: 'Facilidades de pago',
    syllabus: [
      { label: 'Clase 1', items: ['Diseño cromático', 'Tipos de flores y follajes', 'Cuidados de la flor', 'Proveedores y herramientas', 'Finanzas'] },
      { label: 'Clase 2', items: ['Ramo espiral técnica coreana', 'Ramo espiral clásica', 'Envolturas con papel coreano'] },
      { label: 'Clase 3', items: ['Arreglo en caja técnica 360', 'Visita a bodega de flores'] },
      { label: 'Clase 4', items: ['Canasta floral', 'Arreglo en jarrón'] },
      { label: 'Clase 5', items: ['Desarrollo de proyecto final'] },
    ],
    brochure: `${B}brochure-basico.pdf`,
  },
  {
    id: 2,
    title: 'Estructuras para Eventos',
    subtitle: 'Taller Intermedio',
    description:
      '¿Ya conoces las bases pero te da miedo crear arreglos de gran formato? Aprende la ingeniería y estructura interna detrás de los arreglos espectaculares para bodas y eventos. Dos días intensivos con material incluido.',
    duration: '2 días de taller',
    price: '$5,500 MXN',
    image: `${B}images/eventos-1.png`,
    tag: '10% Ex Alumnos',
    badge: 'Incluye material y refrigerio',
    syllabus: [
      { label: 'Módulos', items: ['Centro de mesa alto', 'Centro de mesa bajo', 'Mesa principal', 'Arco ceremonial', '2 técnicas de ramo', 'Cómo cotizar un evento'] },
    ],
    brochure: `${B}brochure-eventos.pdf`,
  },
  {
    id: 3,
    title: 'Arquitectura Floral',
    subtitle: 'Tendencias y Diseño Contemporáneo',
    description:
      'Rompe las reglas tradicionales. Domina la forma, la línea y el espacio. Fusiona geometría, nuevas tendencias y estructuras vanguardistas para transformar bodas y eventos en experiencias tridimensionales.',
    duration: 'Consultar fechas',
    price: 'Consultar precio',
    image: `${B}images/eventos-4.png`,
    tag: 'Nivel Avanzado',
    badge: null,
    syllabus: [],
    brochure: null,
    audience: 'Para floristas activos, diseñadores de espacios, wedding planners y mentes creativas que buscan vender diseño de autor de alto valor.',
  },
]

export const ARRANGEMENTS = [
  {
    id: 1,
    name: 'Bouquet Rojo Pasión',
    description: 'Ramo premium de rosas rojas, presentación elegante para regalos y ocasiones especiales.',
    price: '$520 MXN',
    image: `${B}images/arreglo-rosas.png`,
  },
  {
    id: 2,
    name: 'Bouquet Nupcial',
    description: 'Ramo de novia con claveles rosas, rosas blancas y eucalipto. Con listón y pétalos sueltos.',
    price: '$650 MXN',
    image: `${B}images/arreglo-novial.jpeg`,
  },
]

// Flores que se ven en cada foto del catálogo (para el buscador por flor).
// Para corregir una foto, cambia su lista; las flores del buscador salen de aquí solas.
const FLORES_ARREGLOS = [
  ['Rosas'],                                  // 01
  ['Lilis'],                                  // 02
  ['Crisantemos', 'Gerberas'],                // 03
  ['Rosas', 'Perritos'],                      // 04
  ['Rosas', 'Margaritas', 'Alstroemerias'],   // 05
  ['Lilis', 'Rosas'],                         // 06
  ['Gerberas', 'Rosas', 'Margaritas'],        // 07
  ['Rosas', 'Alstroemerias'],                 // 08
  ['Rosas', 'Alstroemerias'],                 // 09
  ['Girasoles', 'Rosas', 'Claveles'],         // 10
  ['Rosas'],                                  // 11
  ['Crisantemos', 'Rosas'],                   // 12
  ['Tulipanes'],                              // 13
  ['Rosas', 'Gerberas'],                      // 14
  ['Crisantemos', 'Rosas'],                   // 15
  ['Girasoles', 'Rosas'],                     // 16
]

const FLORES_RAMOS = [
  ['Gerberas', 'Rosas'],                      // 01
  ['Lilis'],                                  // 02
  ['Gerberas', 'Rosas', 'Anturios'],          // 03
  ['Girasoles', 'Gerberas'],                  // 04
  ['Girasoles', 'Gerberas'],                  // 05
  ['Rosas'],                                  // 06
  ['Rosas'],                                  // 07
  ['Rosas', 'Nube'],                          // 08
  ['Rosas', 'Perritos', 'Alstroemerias'],     // 09
  ['Rosas'],                                  // 10
  ['Rosas', 'Nube'],                          // 11
  ['Rosas', 'Alstroemerias'],                 // 12
  ['Girasoles', 'Gerberas', 'Rosas'],         // 13
  ['Gerberas', 'Lilis'],                      // 14
  ['Girasoles', 'Margaritas'],                // 15
  ['Gerberas'],                               // 16
  ['Lilis', 'Gerberas', 'Rosas'],             // 17
  ['Rosas', 'Alstroemerias'],                 // 18
  ['Gerberas', 'Nube'],                       // 19
]

const catalogo = (tipo, flores) => flores.map((f, i) => {
  const id = `${tipo}_${String(i + 1).padStart(2, '0')}`
  return { id, tipo, flores: f, image: `${B}images/${id}.jpg` }
})

export const CATALOG_ARREGLOS = catalogo('arreglo', FLORES_ARREGLOS)
export const CATALOG_RAMOS = catalogo('ramo', FLORES_RAMOS)

export const EVENTOS_GALLERY = [
  { id: 1,  image: `${B}images/evento_n01.jpg`, alt: 'Mesa de banquete estilo boho al atardecer en la playa' },
  { id: 2,  image: `${B}images/evento_n03.jpg`, alt: 'Decoración de mesa larga con camino fucsia en terraza frente al mar' },
  { id: 3,  image: `${B}images/evento_n14.jpg`, alt: 'Altar ceremonial iluminado con flores naranjas y rojas en la playa' },
  { id: 4,  image: `${B}images/evento_n26.jpg`, alt: 'Arco circular boho con pampas grass junto a alberca' },
  { id: 5,  image: `${B}images/evento_n22.jpg`, alt: 'Montaje de cena nocturna con cenefas de macramé y vegetación' },
  { id: 6,  image: `${B}images/evento_n08.jpg`, alt: 'Runner floral multicolor con rosas amarillas y rosas en jardín' },
  { id: 7,  image: `${B}images/evento_n04.jpg`, alt: 'Mesa larga con floreros de vidrio y rosas rosas en rooftop' },
  { id: 8,  image: `${B}images/evento_n10.jpg`, alt: 'Backdrop boho con flores tropicales naranjas, rojas y verdes' },
  { id: 9,  image: `${B}images/evento_n18.jpg`, alt: 'Primer beso de bodas bajo arco floral con rosas rosas' },
  { id: 10, image: `${B}images/evento_n19.jpg`, alt: 'Mesa de honor de bodas con arreglo verde y blanco' },
  { id: 11, image: `${B}images/evento_n17.jpg`, alt: 'Runner de girasoles y flores amarillas para cena corporativa' },
  { id: 12, image: `${B}images/evento_n06.jpg`, alt: 'Runner floral con rosas y jarras de vidrio en mesa exterior' },
  { id: 13, image: `${B}images/evento_n11.jpg`, alt: 'Instalación Bride to Be con tela drapeada y detalles florales' },
  { id: 14, image: `${B}images/evento_n02.jpg`, alt: 'Centros de mesa con rosas frescas en jarras de vidrio, vista al mar' },
  { id: 15, image: `${B}images/evento_n05.jpg`, alt: 'Ramo nupcial boho con pampas grass y flores blancas' },
  { id: 16, image: `${B}images/evento_n13.jpg`, alt: 'Ramo nupcial con anturios rosados, rosas rojas y limonium' },
  { id: 17, image: `${B}images/evento_n23.jpg`, alt: 'Mesa de cena íntima con flores verdes y blancas, cubiertos dorados' },
  { id: 18, image: `${B}images/evento_n15.jpg`, alt: 'Novia con ramo de anturios blancos y azul rey' },
  { id: 19, image: `${B}images/evento_n12.jpg`, alt: 'Centro de mesa tropical con frutas exóticas y flores silvestres' },
  { id: 20, image: `${B}images/evento_n21.jpg`, alt: 'Boutonnière clásico de rosas blancas' },
  { id: 21, image: `${B}images/evento_n16.jpg`, alt: 'Boutonnière de anturio azul sobre traje negro' },
  { id: 22, image: `${B}images/evento_n07.jpg`, alt: 'Mesa de jardín decorada con flores para evento al aire libre' },
  { id: 23, image: `${B}images/evento_n09.jpg`, alt: 'Equipo Magenta en montaje de evento decorativo' },
  { id: 24, image: `${B}images/evento_n24.jpg`, alt: 'Decoración floral para evento especial' },
  { id: 25, image: `${B}images/evento_n25.jpg`, alt: 'Decoración floral para evento especial' },
  { id: 26, image: `${B}images/evento_n27.jpg`, alt: 'Decoración floral para evento especial' },
  { id: 27, image: `${B}images/evento_n28.jpg`, alt: 'Decoración floral para evento especial' },
  { id: 28, image: `${B}images/evento_n29.jpg`, alt: 'Decoración floral para evento especial' },
  { id: 29, image: `${B}images/evento_n30.jpg`, alt: 'Decoración floral para evento especial' },
  { id: 30, image: `${B}images/evento_n20.jpg`, alt: 'Montaje floral para evento de lujo' },
]

export const WA_NUM = '526564442305'
