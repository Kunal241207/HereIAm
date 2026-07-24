import { FaGithub, FaLinkedin } from "react-icons/fa"
import { FlipBoard } from "./ui/FlipBoard"
import { Terminal } from "./ui/Terminal"

const stats = [
  { value: "50+",   label: "Open Source PRs" },
  { value: "1+",    label: "Years of Exp" },
  { value: "India", label: "Based In", highlight: true },
]

export default function About() {
  return (
    <section id="about" className="relative min-h-screen bg-[#0f0f0f] py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="relative z-10 max-w-350 mx-auto">

        <div className="flex items-center gap-6 mb-20 md:mb-32" data-gsap="fade-up">
          <h2 className="flex">
            {"ABOUT ME".split("").map((char, i) => (
              <FlipBoard key={i} char={char} delay={0.1 + i * 0.1} isHighlight={char === "M" || char === "E"} />
            ))}
          </h2>
          <div className="flex-1 h-px bg-[#262626]" />
          <div className="flex items-center gap-4 border border-[#333] rounded-full px-5 py-2.5 bg-[#171717]">
            <a href="https://github.com/Kunal241207" target="_blank" rel="noreferrer" className="text-[#888]">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/kunal-gupta-2285b4378/" target="_blank" rel="noreferrer" className="text-[#888]">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          <div className="lg:col-span-7 flex flex-col gap-10" data-gsap="fade-right">
            <h3 className="text-[32px] md:text-[44px] leading-[1.1] font-light text-[#F4F1E8] tracking-tight">
              I'm <span className="font-bold">Kunal Gupta</span>, <br />
            </h3>
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#8E8E8E] font-light">
              I enjoy building software that <span className="high-lighted">solves real problems</span> and feels intuitive to use. What keeps me here is the process of figuring things out and building them better.
              <br/><br/>
              I care about clean architecture, <span className="high-lighted">thoughtful user experiences</span>, and <span className="high-lighted">keeping things simple</span> where they can be. I don't believe bigger stacks always make better software—they just make bigger stacks.
              <br/><br/>
              Every project teaches me something new, and that's reason enough to start the next one.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-[#262626] pt-10" data-gsap="fade-up" data-gsap-delay="0.2">
              {stats.map(({ value, label, highlight }) => (
                <div key={label} className="flex flex-col gap-3">
                  <span className={` text-[42px] leading-none font-bold ${highlight ? "text-[#bfeb67] tiny" : "text-[#F4F1E8]"}`}>
                    {value}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#555]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 h-104 lg:h-124" data-gsap="fade-left" data-gsap-delay="0.2">
            <Terminal/>
          </div>

        </div>
      </div>
    </section>
  )
}
