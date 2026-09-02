import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { Layout, Server, Database, Wrench } from "lucide-react"
import { FlipBoard } from "./ui/FlipBoard"
import { TopMarquee, BottomMarquee } from "./ui/Marquee"

const categories = [
  {
    icon: Layout,
    title: "Frontend",
    skills: ["React", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
    tilt: "md:-rotate-[10deg] md:-translate-y-6",
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Express.js", "Python", "Go", "REST APIs"],
    tilt: "md:-rotate-[4deg] md:translate-y-12",
  },
  {
    icon: Database,
    title: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis"],
    tilt: "md:rotate-[3deg] md:-translate-y-10",
  },
  {
    icon: Wrench,
    title: "DevOps & Others",
    skills: ["Docker", "Git & GitHub", "CI/CD"],
    tilt: "md:-rotate-[12deg] md:translate-y-8",
  },
]

function Card({ icon: Icon, title, skills, tilt, index }: typeof categories[0] & { index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex relative z-10 hover:z-50"
    >
      <div 
        className={`flex flex-col w-full md:w-65 min-h-90 rounded-[20px] border-2 border-[#222] border-t-[#aff3285a] bg-linear-to-b from-[#181818] to-[#0a0a0a] p-6 lg:p-8 shadow-2xl transition-all duration-500 ease-out hover:border-[#444] hover:shadow-[0_0_40px_-10px_rgba(183,255,42,0.15)] md:hover:rotate-0 md:hover:-translate-y-4 cursor-default ${tilt}`}
      >
        <Icon className="text-[#B7FF2A] mb-4" size={24} />
        <h3 className="text-[22px] font-bold text-white tracking-wide mb-3">{title}</h3>
        <div className="w-6 h-0.5 bg-[#B7FF2A] mb-6" />
        <div className="flex flex-col gap-3">
          {skills.map(skill => (
            <span key={skill} className="text-[#a0a0a0] text-[16px] tracking-tight">{skill}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skill() {
  return (
    <section id="skills" className="relative min-h-screen bg-[#0f0f0f] py-32 overflow-hidden px-6 md:px-16 lg:px-24">

      <div className="relative z-10 max-w-350 mx-auto" data-gsap="fade-up">
        <div className="flex items-center gap-6 mb-24">
          <h2 className="flex">
            {"SKILL .EXE".split("").map((char, i) => (
              <FlipBoard key={i} char={char} delay={0.1 + i * 0.1} isHighlight={i > 5} />
            ))}
          </h2>
          <div className="flex-1 h-px bg-[#262626]" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-12" data-gsap="fade-up" data-gsap-delay="0.1">
        <TopMarquee />

        <div className="relative w-full max-w-300 mx-auto px-6">

          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-175 pointer-events-none -z-10 hidden md:block"
            viewBox="0 0 1200 700"
            fill="none"
          >
            <path
              d="M 0,384 C 100,384 130,384 162,384 C 300,384 350,464 454,464 C 600,464 620,336 746,336 C 850,336 900,448 1038,448 C 1120,448 1200,448 1200,448"
              stroke="#B7FF2A"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            {[
              [162, 384], [454, 464], [746, 336], [1038, 448]
            ].map(([cx, cy]) => (
              <g key={`${cx}-${cy}`} transform={`translate(${cx}, ${cy})`}>
                <circle cx="0" cy="0" r="5" fill="#111" stroke="#B7FF2A" strokeWidth="2" />
                <circle cx="0" cy="0" r="12" stroke="#B7FF2A" strokeOpacity="0.3" strokeWidth="1" fill="none" />
              </g>
            ))}
          </svg>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 lg:gap-8 py-8 md:py-16">
            {categories.map((cat, i) => (
              <Card key={cat.title} {...cat} index={i} />
            ))}
          </div>
        </div>

        <BottomMarquee />
      </div>

    </section>
  )
}
