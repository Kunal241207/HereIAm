import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { FlipBoard } from "../ui/FlipBoard"
import { ossContributions, cpProfiles } from "./data"
import { ProfileCard } from "./ProfileCard"
import { ProjectItem } from "./ProjectItem"

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-6 mb-8 md:mb-10">
      <motion.div
        className="h-0.5 flex-1"
        style={{ backgroundImage: "linear-gradient(to right, #333 50%, transparent 50%)", backgroundSize: "12px 2px", backgroundRepeat: "repeat-x" }}
        animate={{ backgroundPositionX: ["0px", "-12px"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 0.5 }}
      />
      <h3 className="text-sm font-mono text-[#B7FF2A] uppercase tracking-widest font-bold">{text}</h3>
    </div>
  )
}

export default function Coding() {
  const [showAll, setShowAll]   = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const visibleOSS = showAll ? ossContributions : ossContributions.slice(0, 3)

  return (
    <section id="coding" className="relative min-h-screen bg-[#0f0f0f] py-32 overflow-hidden px-6 md:px-16 lg:px-24">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, #F4F1E8 1px, transparent 1px), linear-gradient(to bottom, #F4F1E8 1px, transparent 1px)", backgroundSize: "2.5rem 2.5rem" }} />
      <div className="absolute inset-0 bg-linear-to-b from-[#0f0f0f] via-transparent to-[#0f0f0f] pointer-events-none" />

      <div className="relative z-10 max-w-350 mx-auto w-full">

        <div className="mb-16 md:mb-20 flex items-center gap-6" data-gsap="fade-up">
          <h2 className="flex">
            {"CODING".split("").map((char, i) => (
              <FlipBoard key={i} char={char} delay={0.1 + i * 0.1} isHighlight={i > 2} />
            ))}
          </h2>
          <div className="flex-1 h-px bg-linear-to-r from-[#262626] to-transparent" />
        </div>

        <div className="mb-20 md:mb-28">
          <SectionLabel text="Open Source" />

          <div className="flex flex-col border-t border-[#262626]">
            <AnimatePresence initial={false}>
              {visibleOSS.map(item => (
                <ProjectItem 
                  key={item.repo}
                  item={item} 
                  isExpanded={expanded === item.repo} 
                  onClick={() => setExpanded(expanded === item.repo ? null : item.repo)} 
                />
              ))}
            </AnimatePresence>
          </div>

          {ossContributions.length > 3 && (
            <div className="mt-12 flex justify-center">
              <button onClick={() => setShowAll(!showAll)} className="group relative inline-flex cursor-pointer">
                <div className="absolute inset-0 bg-[#FF3333] translate-x-1 translate-y-1 transition-transform duration-200 " />
                <div className="relative bg-[#F4F1E8] border-2 border-[#111] px-8 py-3.5 flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
                  <span className="font-black text-[#111] text-sm uppercase tracking-widest">{showAll ? "Show Less" : "Show More"}</span>
                  <ChevronDown size={18} className={`text-[#111] transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
                </div>
              </button>
            </div>
          )}
        </div>

        <div>
          <SectionLabel text="Programming" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4 md:pt-12 pb-10 max-w-4xl mx-auto">
            {cpProfiles.map((profile, i) => (
              <ProfileCard key={profile.platform} profile={profile} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
