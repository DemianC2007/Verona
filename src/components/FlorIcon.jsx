// Dibujos sencillos de cada flor del catálogo, hechos con SVG para el buscador por flor.
// Cada uno usa el color con el que la gente reconoce esa flor. viewBox 0 0 48 48.

const TALLO = '#5E7B4C'
const HOJA = '#7E9E62'
const LINEA = '#2C2018'

// Pétalos repetidos alrededor de un centro
function Corona({ n, cx = 24, cy = 22, r, rx, ry, fill, stroke = LINEA, giro = 0 }) {
  return Array.from({ length: n }, (_, i) => (
    <ellipse
      key={i}
      cx={cx}
      cy={cy - r}
      rx={rx}
      ry={ry}
      fill={fill}
      stroke={stroke}
      strokeWidth="0.8"
      transform={`rotate(${giro + (360 / n) * i} ${cx} ${cy})`}
    />
  ))
}

const Tallo = ({ y = 30, hoja = true }) => (
  <g>
    <path d={`M24 ${y} V46`} stroke={TALLO} strokeWidth="1.8" strokeLinecap="round" />
    {hoja && <path d="M24 40 C 18 38 15 34 15 34 C 20 33 23 36 24 40 Z" fill={HOJA} stroke={TALLO} strokeWidth="0.8" />}
  </g>
)

const FLORES = {
  Rosas: () => (
    <g>
      <Tallo y={32} />
      <path d="M13 21 C 13 12 20 8 24 8 C 30 8 35 13 35 20 C 35 28 30 32 24 32 C 18 32 13 28 13 21 Z" fill="#C8243B" stroke={LINEA} strokeWidth="0.9" />
      <path d="M24 13 C 29 13 31 17 30 20 C 29 24 24 25 21 23 C 18 21 19 17 22 16 C 25 15 27 17 26 19 C 25 21 22 20 23 18"
        fill="none" stroke="#7E1022" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M14 22 C 17 27 21 29 24 29 C 28 29 32 27 34 22" fill="none" stroke="#7E1022" strokeWidth="1" />
    </g>
  ),
  Gerberas: () => (
    <g>
      <Tallo y={32} />
      <Corona n={18} r={8.5} rx={1.9} ry={5.2} fill="#F07F5B" />
      <circle cx="24" cy="22" r="4.6" fill="#6B3A1E" stroke={LINEA} strokeWidth="0.8" />
      <circle cx="24" cy="22" r="2" fill="#3E2312" />
    </g>
  ),
  Girasoles: () => (
    <g>
      <Tallo y={33} />
      <Corona n={16} r={9.5} rx={2.4} ry={5} fill="#F2C12E" />
      <circle cx="24" cy="22" r="6.2" fill="#6B4320" stroke={LINEA} strokeWidth="0.8" />
      {[[-2, -2], [2, -2], [0, 1], [-3, 2], [3, 2], [0, -4], [-4, -1], [4, -1]].map(([x, y], i) => (
        <circle key={i} cx={24 + x} cy={22 + y} r="0.8" fill="#3B2410" />
      ))}
    </g>
  ),
  Lilis: () => (
    <g>
      <Tallo y={34} />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d="M24 22 C 21 16 22 9 24 5 C 26 9 27 16 24 22 Z" fill="#F4A3C0" stroke={LINEA} strokeWidth="0.8"
          transform={`rotate(${i * 60} 24 22)`} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d="M24 21 V12" stroke="#C2457A" strokeWidth="0.7" transform={`rotate(${i * 60} 24 22)`} />
      ))}
      {[[-3, -6], [0, -7], [3, -6]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M24 22 L${24 + x} ${22 + y}`} stroke="#6B8A3E" strokeWidth="0.7" />
          <ellipse cx={24 + x} cy={22 + y} rx="0.9" ry="1.6" fill="#B5531F" />
        </g>
      ))}
    </g>
  ),
  Tulipanes: () => (
    <g>
      <Tallo y={30} />
      <path d="M15 14 C 15 24 18 30 24 30 C 30 30 33 24 33 14 C 30 17 28 18 27 18 C 26 13 25 10 24 8 C 23 10 22 13 21 18 C 20 18 18 17 15 14 Z"
        fill="#E8572A" stroke={LINEA} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M21 18 C 21 24 22 28 24 30 M27 18 C 27 24 26 28 24 30" fill="none" stroke="#A8361A" strokeWidth="0.8" />
    </g>
  ),
  Margaritas: () => (
    <g>
      <Tallo y={32} />
      <Corona n={14} r={8.5} rx={2.6} ry={5.2} fill="#FFFFFF" />
      <circle cx="24" cy="22" r="4.2" fill="#F2C12E" stroke={LINEA} strokeWidth="0.8" />
    </g>
  ),
  Alstroemerias: () => (
    <g>
      <Tallo y={32} />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d="M24 22 C 19 18 19 11 24 9 C 29 11 29 18 24 22 Z"
          fill={i % 2 ? '#F6B48F' : '#F39A73'} stroke={LINEA} strokeWidth="0.8" transform={`rotate(${i * 60} 24 22)`} />
      ))}
      {[0, 120, 240].map((g) => (
        <g key={g} transform={`rotate(${g} 24 22)`}>
          <path d="M23 13 l0.6 2 M25 13.5 l-0.4 2 M24 15.5 v1.6" stroke="#6B2E1E" strokeWidth="0.7" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="24" cy="22" r="1.6" fill="#F2C12E" />
    </g>
  ),
  Crisantemos: () => (
    <g>
      <Tallo y={33} />
      <Corona n={20} r={9} rx={1.5} ry={4} fill="#C77DBA" />
      <Corona n={16} r={6} rx={1.4} ry={3.4} fill="#D79ACB" giro={11} />
      <Corona n={10} r={3.2} rx={1.2} ry={2.4} fill="#E6B8DC" giro={5} />
      <circle cx="24" cy="22" r="1.6" fill="#F0D4EA" stroke={LINEA} strokeWidth="0.6" />
    </g>
  ),
  Claveles: () => (
    <g>
      <Tallo y={34} />
      <path d="M19 26 C 19 31 21 34 24 34 C 27 34 29 31 29 26 Z" fill={HOJA} stroke={TALLO} strokeWidth="0.8" />
      <path d="M11 20 l2 -4 l2 3 l2 -6 l2 4 l2 -7 l3 5 l3 -5 l2 7 l2 -4 l2 6 l2 -3 l2 4 C 37 25 31 27 24 27 C 17 27 11 25 11 20 Z"
        fill="#F27BA0" stroke={LINEA} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M15 22 l2 -3 l2 2 l3 -4 l2 3 l3 -4 l2 3 l3 -2 l2 3" fill="none" stroke="#C4436E" strokeWidth="0.8" />
    </g>
  ),
  Nube: () => (
    <g>
      <path d="M24 46 V28 M24 34 L15 22 M24 32 L33 20 M24 30 L22 14 M19 27 L12 30 M29 26 L37 28 M17 25 L18 15 M31 23 L29 12"
        stroke={TALLO} strokeWidth="1" strokeLinecap="round" fill="none" />
      {[[15, 21], [12, 18], [17, 17], [33, 19], [36, 16], [30, 16], [22, 13], [25, 10], [19, 10], [11, 29], [9, 26],
        [37, 27], [40, 24], [18, 14], [16, 11], [29, 11], [32, 9], [26, 15], [14, 25], [34, 23]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 ? 2 : 2.4} fill="#FFFFFF" stroke="#9A8F86" strokeWidth="0.6" />
      ))}
    </g>
  ),
  Perritos: () => (
    <g>
      <path d="M24 46 V6" stroke={TALLO} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 42 C 19 40 17 37 17 37 C 21 36 23 38 24 42 Z" fill={HOJA} stroke={TALLO} strokeWidth="0.8" />
      {[[30, 0], [24, 1], [18, 0], [12, 1], [7, 0]].map(([y, lado], i) => (
        <g key={i} transform={`translate(${lado ? 3 : -3} 0)`}>
          <path d={`M24 ${y + 2} C 19 ${y + 3} 18 ${y - 3} 21 ${y - 4} C 23 ${y - 6} 27 ${y - 6} 28 ${y - 3} C 30 ${y} 28 ${y + 3} 24 ${y + 2} Z`}
            fill={i % 2 ? '#F2A0C4' : '#E77BAC'} stroke={LINEA} strokeWidth="0.8" />
          <path d={`M21 ${y} C 23 ${y + 1} 25 ${y + 1} 27 ${y - 1}`} fill="none" stroke="#B3467B" strokeWidth="0.7" />
        </g>
      ))}
    </g>
  ),
  Calas: () => (
    <g>
      <path d="M24 46 C 24 38 23 32 22 26" stroke={TALLO} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M22 27 C 14 25 11 16 14 8 C 17 12 22 12 28 9 C 32 7 36 8 37 6 C 37 14 33 22 22 27 Z"
        fill="#F5D33B" stroke={LINEA} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M22 27 C 21 20 24 14 30 10" fill="none" stroke="#C9A417" strokeWidth="0.8" />
      <path d="M23 24 C 24 19 26 15 28 13" stroke="#E08A1E" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </g>
  ),
  Anturios: () => (
    <g>
      <Tallo y={34} hoja={false} />
      <path d="M24 34 C 16 30 9 23 11 15 C 13 9 20 9 24 14 C 28 9 35 9 37 15 C 39 23 32 30 24 34 Z"
        fill="#D7263D" stroke={LINEA} strokeWidth="0.9" />
      <path d="M24 14 V30 M24 20 C 19 18 15 19 13 21 M24 20 C 29 18 33 19 35 21" fill="none" stroke="#A01628" strokeWidth="0.7" />
      <path d="M24 22 C 25 17 28 12 31 9" stroke="#F2D06B" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    </g>
  ),
}

export const FLORES_CON_DIBUJO = Object.keys(FLORES)

export default function FlorIcon({ flor, size = 48, className = '' }) {
  const Dibujo = FLORES[flor]
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      {Dibujo ? <Dibujo /> : (
        <g>
          <Tallo y={30} />
          <Corona n={8} r={7} rx={3} ry={5} fill="#F4A3C0" />
          <circle cx="24" cy="22" r="3" fill="#F2C12E" />
        </g>
      )}
    </svg>
  )
}

// Dibujos de cada tipo de arreglo (mismo estilo que las flores), para el selector del catálogo
const Flor = ({ x, y, r = 3.4, fill }) => (
  <g>
    <Corona n={6} cx={x} cy={y} r={r * 0.75} rx={r * 0.55} ry={r * 0.8} fill={fill} stroke={LINEA} />
    <circle cx={x} cy={y} r={r * 0.4} fill="#F2C12E" />
  </g>
)

const TIPOS = {
  all: () => (
    <g>
      <path d="M10 40 h28" stroke={LINEA} strokeWidth="0.8" />
      <Flor x={14} y={30} fill="#F4A3C0" /><Flor x={24} y={24} r={4} fill="#C8243B" /><Flor x={34} y={30} fill="#F2C12E" />
      <path d="M14 33 V40 M24 28 V40 M34 33 V40" stroke={TALLO} strokeWidth="1.4" />
    </g>
  ),
  arreglo: () => (
    <g>
      <path d="M13 28 h22 l-3 16 h-16 Z" fill="#F7E6EC" stroke={LINEA} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M13 31 h22" stroke="#AD1A5B" strokeWidth="1.2" />
      <path d="M16 28 C 14 22 15 18 18 16 M32 28 C 34 22 33 18 30 16" stroke={TALLO} strokeWidth="1.2" fill="none" />
      <Flor x={17} y={22} fill="#F4A3C0" /><Flor x={24} y={16} r={4} fill="#C8243B" /><Flor x={31} y={22} fill="#F2C12E" />
      <Flor x={21} y={26} r={3} fill="#FFFFFF" /><Flor x={28} y={26} r={3} fill="#F4A3C0" />
    </g>
  ),
  ramo: () => (
    <g>
      <path d="M12 18 L24 44 L36 18 Z" fill="#F4EEDC" stroke={LINEA} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M17 18 L24 40 M31 18 L24 40" stroke="#D6C9A6" strokeWidth="0.8" />
      <Flor x={17} y={16} fill="#F27BA0" /><Flor x={24} y={11} r={4} fill="#C8243B" /><Flor x={31} y={16} fill="#F2C12E" />
      <Flor x={21} y={20} r={3} fill="#FFFFFF" /><Flor x={28} y={20} r={3} fill="#F4A3C0" />
      <path d="M21 34 h6" stroke="#AD1A5B" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  novia: () => (
    <g>
      <path d="M22 26 L23 44 M26 26 L25 44 M24 26 V44" stroke={TALLO} strokeWidth="1.2" />
      <Flor x={18} y={20} fill="#FFFFFF" /><Flor x={24} y={15} r={4} fill="#FFFFFF" /><Flor x={30} y={20} fill="#FFFFFF" />
      <Flor x={21} y={25} r={3} fill="#F7E6EC" /><Flor x={27} y={25} r={3} fill="#FFFFFF" />
      <path d="M24 32 C 18 28 15 32 18 35 C 20 37 23 34 24 32 Z M24 32 C 30 28 33 32 30 35 C 28 37 25 34 24 32 Z"
        fill="#FFFFFF" stroke={LINEA} strokeWidth="0.8" />
      <path d="M23 33 L19 42 M25 33 L29 42" stroke="#C9B8A8" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  ),
  funebre: () => (
    <g>
      <path d="M16 46 L22 32 M32 46 L26 32 M24 34 V46" stroke="#8A6A4A" strokeWidth="1.3" strokeLinecap="round" />
      <ellipse cx="24" cy="20" rx="13" ry="15" fill={HOJA} stroke={TALLO} strokeWidth="0.9" />
      <Flor x={24} y={10} fill="#FFFFFF" /><Flor x={17} y={16} fill="#F2C12E" /><Flor x={31} y={16} fill="#FFFFFF" />
      <Flor x={18} y={27} fill="#FFFFFF" /><Flor x={30} y={27} fill="#F2C12E" /><Flor x={24} y={30} r={3} fill="#FFFFFF" />
      <path d="M11 21 C 18 24 30 24 37 19 L37 23 C 30 28 18 28 11 25 Z" fill="#FFFFFF" stroke={LINEA} strokeWidth="0.7" />
    </g>
  ),
}

export function TipoIcon({ tipo, size = 48, className = '' }) {
  const Dibujo = TIPOS[tipo] || TIPOS.all
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <Dibujo />
    </svg>
  )
}
