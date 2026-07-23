import { useEffect, useState, useRef } from "react"
import ReactGlobe from "react-globe.gl"

export default function ContactGlobe() {
  const globeRef = useRef<any>(null)
  const [size, setSize] = useState({ width: 600, height: 600 })
  const [isGlobeReady, setIsGlobeReady] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth - 48, 450)
      setSize({ width, height: width })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const onGlobeReady = () => {
    const controls = globeRef.current?.controls()
    if (controls) { 
      controls.autoRotate = true 
      controls.autoRotateSpeed = 3
      controls.enableZoom = false 
    }
    setIsGlobeReady(true)
  }

  return (
    <div className={`w-full h-full flex items-center justify-center transition-opacity duration-1000 grayscale contrast-125 brightness-[1.5] ${isGlobeReady ? 'opacity-70' : 'opacity-0'}`}>
      <ReactGlobe
        ref={globeRef}
        width={size.width}
        height={size.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#888888"
        atmosphereAltitude={0.05}
        onGlobeReady={onGlobeReady}
        animateIn={true}
        showGraticules={true}
      />
    </div>
  )
}
