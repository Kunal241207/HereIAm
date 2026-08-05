import { Activity, Clock, Plane } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="relative bg-[#0f0f0f] pt-16 overflow-visible border-t border-white/5">
      <div className="absolute -top-18 left-0 w-full h-24 pointer-events-none z-50 overflow-visible">
        <div className="absolute animate-fly flex items-center opacity-80">
          <div className="w-48 md:w-96 h-[1.5px] bg-linear-to-r from-transparent via-white/20 to-white/50 mr-1" />
          <Plane size={48} strokeWidth={1.5} className="text-white transform rotate-45" fill="currentColor" />
        </div>
      </div>

      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none overflow-hidden rounded-t-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }}
      />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-62.5 bg-linear-to-b from-white/2 to-transparent pointer-events-none rounded-t-none" />

      <div className="relative z-10 w-full mx-auto flex flex-col min-h-[35vh] justify-between">
        
        <div className="px-6 md:px-16 lg:px-24 flex flex-col md:flex-row gap-12 md:gap-24 mb-16 w-full" data-gsap="fade-up">
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-gray-500">
              <Activity size={16} />
              <h3 className="uppercase tracking-widest text-xs">System Status</h3>
            </div>
            <p className="text-gray-400 text-sm">All Systems Nominal</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <h3 className="uppercase tracking-widest text-xs">Local Time</h3>
            </div>
            <p className="text-gray-400 text-sm font-mono">
              {time.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute:'2-digit', second:'2-digit', hour12: true })} IST
            </p>
          </div>
          
        </div>

        <div className="w-full flex justify-center items-end mt-auto px-4 md:px-8 pb-4 pointer-events-none overflow-hidden" data-gsap="fade-up" data-gsap-delay="0.15">
          <h1 className="text-[13.5vw] leading-[0.75] font-bold text-center w-full text-[#151515] select-none tracking-tighter">
            KUNAL GUPTA
          </h1>
        </div>
        
      </div>
    </footer>
  )
}
