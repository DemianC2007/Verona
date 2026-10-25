import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Academia from './components/Academia'
import Estudio from './components/Estudio'
import Eventos from './components/Eventos'
import Catalogo from './components/Catalogo'
import Esencia from './components/Esencia'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import WaFloat from './components/WaFloat'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Academia />
        <Estudio />
        <Eventos />
        <Catalogo />
        <Esencia />
        <Newsletter />
      </main>
      <Footer />
      <WaFloat />
    </>
  )
}
