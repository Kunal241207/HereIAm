import About from "./components/About"
import Hero from "./components/Hero/Hero"
import LoadingScreen from "./components/LoadingScreen"
import Navbar from "./components/Navbar"
import Work from "./components/Work"
import Skill from "./components/Skill"
import Coding from "./components/coding/Coding"
import Footer from "./components/Footer"

function App() {
  return (
    <div>
      <LoadingScreen/>
      <Navbar/>
      <Hero/>
      <About/>
      <Skill/>
      <Work/>
      <Coding/>
      <Footer/>
    </div>
  )
}

export default App
