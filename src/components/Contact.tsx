import { useEffect, useState, lazy, Suspense } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Mail, ArrowUpRight } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"

const LazyContactGlobe = lazy(() => import("./ui/ContactGlobe"))

interface ContactProps {
  isOpen: boolean
  onClose: () => void
}

const socials = [
  { id: 'email', icon: Mail, title: 'EMAIL', value: '2007guptakunal@gmail.com', href: 'mailto:2007guptakunal@gmail.com' },
  { id: 'linkedin', icon: FaLinkedin, title: 'LINKEDIN', value: 'Kunal Gupta', href: 'https://www.linkedin.com/in/kunal-gupta-2285b4378/' },
  { id: 'github', icon: FaGithub, title: 'GITHUB', value: 'Kunal241207', href: 'https://github.com/Kunal241207' }
]

export default function Contact({ isOpen, onClose }: ContactProps) {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "LET'S CONNECT"

  useEffect(() => {
    if (!isOpen) return setDisplayedText("")
    
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [isOpen])

  const renderText = () => {
    const lets = displayedText.slice(0, 5)
    const connect = displayedText.slice(6)

    return (
      <>
        <span className="text-[#999d91]">{lets}</span>
        {displayedText.length > 5 && <span>&nbsp;</span>}
        <span className="text-[#e4e9d8]">{connect}</span>
      </>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-250 -translate-x-1/2 -translate-y-1/2 group perspective-1000"
          >
            <div className="absolute inset-0 bg-white/2 backdrop-blur-xl border border-white/10 rounded-2xl -rotate-2 scale-[1.02] transition-transform duration-700 ease-out group-hover:rotate-[-4deg] group-hover:-translate-x-2" />

            <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-2xl p-6 md:p-12 shadow-2xl overflow-hidden transition-transform duration-700 ease-out group-hover:rotate-1 group-hover:translate-x-1">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
              
              <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-all duration-300 hover:rotate-90 hover:scale-110 z-10">
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
                <div className="flex flex-col">
                  <div className="font-mono text-[#B7FF2A] text-sm mb-4">06.</div>
                  <h2 className="font-mono text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight flex items-center min-h-12 md:min-h-15">
                    {renderText()}
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-0.75 h-10 md:h-12 bg-[#B7FF2A] ml-2"
                    />
                  </h2>
                  <div className="w-8 h-1 bg-[#383e32] mb-8" />
                  
                  <p className="font-mono text-[#888] text-sm leading-relaxed mb-12 max-w-sm">
                    Have a project in mind or just want to say hi? I'd love to hear from you.
                  </p>

                  <div className="flex flex-col gap-6 font-mono border-t border-white/10 pt-6">
                    {socials.map((s) => (
                      <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="group/link flex items-center justify-between border-b border-white/5 pb-6 hover:border-white/30 transition-colors">
                        <div className="flex items-center gap-6">
                          <s.icon className="text-white/40 group-hover/link:text-white transition-colors" size={24} />
                          <div>
                            <div className="text-white/60 text-xs font-bold mb-1 tracking-widest">{s.title}</div>
                            <div className="text-white/60 text-sm group-hover/link:text-white transition-colors">{s.value}</div>
                          </div>
                        </div>
                        <ArrowUpRight className="text-white/30 group-hover/link:text-white transition-colors" size={20} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center min-h-75 md:min-h-100">
                  <Suspense fallback={<div className="font-mono text-white/40 text-sm animate-pulse">Spinning up 3D environment...</div>}>
                    <LazyContactGlobe />
                  </Suspense>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
