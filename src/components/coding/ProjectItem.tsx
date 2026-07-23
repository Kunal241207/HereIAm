import { motion, AnimatePresence } from "motion/react"
import { ChevronDown, GitPullRequest } from "lucide-react"
import { FaGithub } from "react-icons/fa"

export function ProjectItem({ item, isExpanded, onClick }: { item: any, isExpanded: boolean, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col py-6 lg:py-8 border-b border-[#262626] hover:border-[#B7FF2A] transition-colors duration-500 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#B7FF2A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4 md:gap-6">
          <FaGithub size={20} className="text-[#444] group-hover:text-[#B7FF2A] transition-colors duration-500 shrink-0" />
          <h4 className="text-xl md:text-3xl font-bold text-[#F4F1E8] group-hover:text-[#B7FF2A] group-hover:translate-x-1 transition-all duration-500 tracking-tight">
            {item.repo}
          </h4>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between md:justify-end gap-4 md:gap-10 flex-1 md:max-w-xl">
          <p className="text-[#888] text-sm md:text-base group-hover:text-[#ccc] transition-colors duration-500 flex-1">{item.desc}</p>
          <div className="w-10 h-10 rounded-full border border-[#333] bg-[#171717] flex items-center justify-center group-hover:bg-[#B7FF2A] group-hover:border-[#B7FF2A] transition-all duration-500 shrink-0">
            <ChevronDown size={18} className={`text-[#666] group-hover:text-[#111] transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2 pl-6 md:pl-10 flex flex-col gap-3 border-t border-[#262626] mt-6">
              {item.prs.map((pr: any, i: number) => (
                <a
                  key={i}
                  href={pr.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 group/pr hover:text-[#B7FF2A] text-[#888] transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  <GitPullRequest size={14} className="opacity-50 group-hover/pr:opacity-100 transition-opacity shrink-0" />
                  <span className="text-sm font-mono">{pr.title}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
