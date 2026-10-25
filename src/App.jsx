import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Catalogo from './components/Catalogo'
import Eventos from './components/Eventos'
import Esencia from './components/Esencia'
import Cursos from './components/Cursos'
import Footer from './components/Footer'
import WaFloat from './components/WaFloat'

// Magenta: los arreglos son lo principal; los cursos solo se mencionan al final.
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Catalogo />
        <Eventos />
        <Esencia />
        <Cursos />
      </main>
      <Footer />
      <WaFloat />
    </>
  )
}
