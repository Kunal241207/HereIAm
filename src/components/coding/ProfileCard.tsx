import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

export function ProfileCard({ profile, index }: { profile: any, index: number }) {
  const Icon = profile.icon

  return (
    <div className="h-full relative z-0 hover:z-10 w-full max-w-70 mx-auto perspective-1000">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <div className={`group relative flex flex-col h-100 p-7 bg-[#111] border border-[#222] shadow-2xl transition-all duration-700 hover:border-[#333] ${profile.tilt}`}>
          
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)] -rotate-2 z-20 group-hover:bg-white/10 transition-all duration-500" />
          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(183,255,42,0.15), transparent 70%)" }} />

          <div className="relative z-10 flex justify-end items-start mb-8">
            <div className="w-10 h-10 rounded-full border border-[#222] bg-[#161616] flex items-center justify-center group-hover:bg-[#B7FF2A] group-hover:border-[#B7FF2A] transition-all duration-500 overflow-hidden relative">
              <ArrowUpRight size={16} className="text-[#555] group-hover:text-[#111] transition-colors duration-500 absolute group-hover:translate-x-6 group-hover:-translate-y-6 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
              <ArrowUpRight size={16} className="text-[#111] absolute -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
            </div>
          </div>

          <div className="relative z-10 flex flex-col flex-1">
            <div className="mb-6 transform group-hover:-translate-y-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative h-10 origin-bottom-left">
              <Icon size={40} className="text-[#444] group-hover:opacity-0 transition-all duration-500 absolute top-0 left-0" />
              <Icon size={40} style={{ color: profile.color || "#ffffff" }} className="opacity-0 group-hover:opacity-100 transition-all duration-500 absolute top-0 left-0" />
            </div>
            
            <h4 className="text-xl md:text-2xl font-semibold text-[#888] group-hover:text-white tracking-tight transform group-hover:translate-x-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              {profile.platform}
            </h4>

            <div className="mt-auto">
              <div className="mb-1 transform transition-all duration-500 group-hover:-translate-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#777] group-hover:text-[#aaa] transition-colors duration-500">
                  {profile.statLabel}
                </span>
              </div>
              
              <div className="mb-8 transform transition-all duration-500 delay-75 group-hover:-translate-y-1">
                <span className="text-3xl md:text-4xl font-serif font-light text-[#cccccccc] group-hover:text-white transition-colors duration-500">
                  {profile.stat}
                </span>
              </div>

              <a
                href={profile.url}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative flex items-center gap-3 font-mono text-[10px] text-[#555] hover:text-white transition-colors duration-300 border-t border-[#222] group-hover:border-[#B7FF2A]/30 pt-5 overflow-hidden"
              >
                <div className="w-6 h-px bg-[#444] group-hover/btn:bg-[#ff2a2a] group-hover/btn:w-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
                <span className="uppercase tracking-wider transform transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/btn:translate-x-1">
                  View_Profile()
                </span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
