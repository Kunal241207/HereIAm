import { useState } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { FlipBoard } from "./ui/FlipBoard"
import { motion, AnimatePresence } from "motion/react"
import melodiqImg from "../assets/projects/melodiq.webp";
import oishiiImg from "../assets/projects/oishii.webp";
import photoTuneImg from "../assets/projects/phototune.webp";
import guessImg from "../assets/projects/guessmyno.webp";

const projects = [
  {
    title: "MELODIQ",
    description: "A modern music explorer powered by iTunes API, featuring fast search, smart filtering, curated collections, and a responsive listening experience.",
    tech: ["JavaScript", "iTunes API"],
    link: "https://kunal241207.github.io/Melodiq/", github: "https://github.com/Kunal241207/Melodiq", color: "#B7FF2A",
    image: melodiqImg,
  },
  {
    title: "OISHII",
    description: "A Japanese-inspired restaurant landing page featuring elegant animations, bold typography, and a premium visual experience.",
    tech: ["React", "GSAP"],
    link: "https://oishii-green.vercel.app/", github: "https://github.com/Kunal241207/Oishii", color: "#FF5F56",
    image: oishiiImg,
  },
  {
    title: "GUESS MY NUMBER",
    description: "A cinematic number guessing game featuring a custom dial-pad interface, voice narration, and a story-inspired presentation. Also includes a standalone CLI implementation.",
    tech: ["JavaScript", "HTML", "CSS", "Python"],
    link: "https://kunal241207.github.io/Guess_My_Number/", github: "https://github.com/Kunal241207/Guess_My_Number", color: "#27C93F",
    image: guessImg,
  },
  {
    title: "PHOTOTUNE",
    description: "A browser-based photo editor featuring real-time image adjustments, built-in presets, cropping, and export support.",
    tech: ["JavaScript"],
    link: "https://kunal241207.github.io/PhotoTune/", github: "https://github.com/Kunal241207/PhotoTune", color: "#FFBD2E",
    image: photoTuneImg,
  },
]

const total = projects.length
const at = (i: number) => projects[((i % total) + total) % total]

export default function Work() {
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => ((i - 1) + total) % total)
  const next = () => setActive(i => (i + 1) % total)

  return (
    <section id="work" className="relative min-h-screen bg-[#0f0f0f] flex flex-col pt-24 pb-24 md:pt-32 md:pb-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto">

        <div className="flex items-center justify-between mb-12 md:mb-16" data-gsap="fade-up">
          <h2 className="flex">
            {"MY WORKS".split("").map((char, i) => (
              <FlipBoard key={i} char={char} delay={0.1 + i * 0.1} isHighlight={i < 2} />
            ))}
          </h2>
          <div className="flex-1 h-px bg-[#262626] mx-6"/>

          <div className="flex items-center gap-4">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-[#2A2A2A] bg-[#0A0A0A] flex items-center justify-center text-[#F4F1E8] hover:border-[#B7FF2A] hover:text-[#B7FF2A] transition-all cursor-pointer">
              <ChevronLeft size={18} />
            </button>
            <span className="tiny text-[18px] w-16 text-center">
              <span className="text-[#F4F1E8]">{active + 1}</span>
              <span className="text-[#444]"> / {total}</span>
            </span>
            <button onClick={next} className="w-10 h-10 rounded-full border border-[#2A2A2A] bg-[#0A0A0A] flex items-center justify-center text-[#F4F1E8] hover:border-[#B7FF2A] hover:text-[#B7FF2A] transition-all cursor-pointer">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-end gap-4 md:gap-6" data-gsap="fade-up" data-gsap-delay="0.1">

          <motion.div className="flex-1" animate={{ opacity: 0.35 }} onClick={prev}>
            <AnimatePresence mode="wait">
              <motion.div key={`l-${active}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <Card project={at(active - 1)} active={false} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="flex-[1.6] z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              >
                <Card project={projects[active]} active />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div className="flex-1" animate={{ opacity: 0.35 }} onClick={next}>
            <AnimatePresence mode="wait">
              <motion.div key={`r-${active}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <Card project={at(active + 1)} active={false} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function Card({ project, active }: { project: typeof projects[0], active: boolean }) {
  return (
    <div className={`rounded-2xl overflow-hidden border transition-all duration-500 bg-[#0A0A0A] ${active ? "border-[#333] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]" : "border-[#1a1a1a]"}`}>

      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a]">
        <span className="relative w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: project.color }}>
          {active && <span className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: project.color }} />}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#555]">{project.title}</span>
      </div>

      <div className={`relative overflow-hidden transition-all duration-500 ${active ? "h-52 md:h-68" : "h-36 md:h-52"}`}>
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-80 hover:grayscale-10 transition-[filter] duration-400 ease-in-out brightness-80 contrast-90" />
        ) : (
          <>
            <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "linear-gradient(45deg,#111 25%,transparent 25%,transparent 75%,#111 75%),linear-gradient(45deg,#111 25%,transparent 25%,transparent 75%,#111 75%)", backgroundSize: "20px 20px", backgroundPosition: "0 0,10px 10px" }} />
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 60% 40%, ${project.color}18, transparent 65%)` }} />
          </>
        )}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-[#0A0A0A] to-transparent" />
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="tiny text-[16px] md:text-[22px] text-[#F4F1E8] leading-none">{project.title}</h3>
          {active && (
            <div className="flex items-center gap-3 shrink-0">
              <a href={project.github} className="text-[#555] hover:text-[#F4F1E8] transition-colors">
                <FaGithub size={16} />
              </a>
              <a href={project.link} className="hover:brightness-125 transition-all" style={{ color: project.color }}>
                <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </div>
        <p className={`text-[#666] text-[13px] md:text-[14px] leading-[1.6] font-light ${active ? "line-clamp-3" : "line-clamp-2"}`}>
          {project.description}
        </p>
        {active && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tech.map(t => (
              <span key={t} className="px-2 py-0.5 text-[10px] font-mono tracking-wider text-[#666] border border-[#222] rounded-full bg-[#111]">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
