import { useEffect, useState } from "react"
import { AnimatedLogo } from "./ui/AnimateLogo"
import Contact from "./Contact"

const links = [
  { id: "home",    num: "01.", label: "HOME" },
  { id: "about",   num: "02.", label: "ABOUT" },
  { id: "skills",  num: "03.", label: "SKILLS" },
  { id: "work",    num: "04.", label: "WORK" },
  { id: "coding",  num: "05.", label: "CODING" },
]

const reversedLinks = [...links].reverse()

export default function Navbar() {
  const [active, setActive] = useState("home")
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      for (const { id } of reversedLinks) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          setActive(id)
          return
        }
      }
      setActive("home")
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:h-28 md:px-16">
    
        <div className="flex-1 flex justify-start">
          <AnimatedLogo />
        </div>

        <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-8 lg:gap-14">
            {links.map(({ id, num, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="group relative flex items-center gap-3 text-[15px] uppercase tracking-[0.08em] h-6"
                >
                  <span className={active === id ? "text-[#B7FF2A]" : "text-[#707070] transition-colors duration-300 group-hover:text-[#B7FF2A]"}>
                    {num}
                  </span>
                  <span className="relative flex flex-col justify-center h-full overflow-hidden">
                    <span className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-[-150%] ${active === id ? "text-[#F4F1E8]" : "text-[#B6B6B6]"}`}>
                      {label}
                    </span>
                    <span className="absolute inset-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[150%] group-hover:translate-y-0 text-white font-bold">
                      {label}
                    </span>
                  </span>
                  {active === id && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-[#B7FF2A]" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden md:inline-flex group relative items-center justify-center overflow-hidden rounded-sm border border-white/20 bg-white/4 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f4f1e8] transition-all duration-500 hover:border-white hover:bg-white/10"
          >
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-sm" />
            
            <span className="relative z-10 flex overflow-hidden mix-blend-difference whitespace-nowrap">
               <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-[-150%]">
                 Let's Connect
               </span>
               <span className="absolute inset-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[150%] group-hover:translate-y-0">
                 Let's Connect
               </span>
            </span>
          </button>
        </div>

      </div>

      <Contact isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  )
}
