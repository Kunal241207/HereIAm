import { useEffect, useRef, useState } from "react"
import { Terminal as TerminalIcon } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { FlipBoard } from "./ui/FlipBoard"

const commands: Record<string, string> = {
  help:   "Available Commands: hello, about, skills, exp, clear, whoami, sudo",
  hello:  "こんにちは!",
  about:  "a full-stack dev & AI/ML engineer heavily into competitive programming and open source.",
  skills: "Languages: Python, JavaScript, C++\nStack: React, Node.js, MongoDB\nAI/ML: Coming Soon",
  exp:    "1+ Years building apps and exploring AI/ML.",
  whoami: "A developer building intelligent systems. Welcome to my digital workspace.",
  sudo: "Permission denied.\nHint: Try bringing an offer letter."
}

const stats = [
  { value: "50+",   label: "Open Source PRs" },
  { value: "1+",    label: "Years of Exp" },
  { value: "India", label: "Based In", highlight: true },
]

type Line = { text: string, isCommand: boolean }

export default function About() {
  const [history, setHistory] = useState<Line[]>([
    { text: "kunal-os v1.0.0", isCommand: false },
    { text: "Type 'help' for available commands.", isCommand: false },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const runCommand = () => {
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    if (cmd === "clear") { setHistory([]); setInput(""); return }

    setHistory(prev => [
      ...prev,
      { text: `> ${input}`, isCommand: true },
      { text: commands[cmd] ?? `Command not found: ${cmd}. Type 'help'`, isCommand: false },
    ])
    setInput("")
  }

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [history])

  return (
    <section id="about" className="relative min-h-screen bg-[#0f0f0f] py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="relative z-10 max-w-350 mx-auto">

        <div className="flex items-center gap-6 mb-20 md:mb-32">
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

          <div className="lg:col-span-7 flex flex-col gap-10">
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-[#262626] pt-10">
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

          <div className="lg:col-span-5 h-104 lg:h-124">
            <div className="relative border border-[#333333] bg-[#171717]/90 backdrop-blur-xl overflow-hidden flex flex-col h-full rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05)]">

              <div className="flex items-center px-4 py-3 bg-[#1e1e1e] border-b border-[#333333] relative">
                <div className="flex gap-2.5 absolute left-4">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_rgba(255,95,86,0.3)]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.3)]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.3)]" />
                </div>
                <div className="w-full text-center text-[11px] uppercase tracking-[0.2em] text-[#888] font-mono flex items-center justify-center gap-2">
                  <TerminalIcon size={13} className="text-[#B7FF2A]" /> kunal_os
                </div>
              </div>

              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{ backgroundImage: "linear-gradient(rgba(183,255,42,0) 50%, rgba(183,255,42,0.03) 50%)", backgroundSize: "100% 4px" }}
              />

              <div
                ref={scrollRef}
                className="flex-1 p-5 md:p-6 font-mono text-[13.5px] md:text-[14.5px] overflow-y-auto flex flex-col gap-3 relative z-20 scrollbar-hide"
                onClick={() => inputRef.current?.focus()}
              >
                {history.map((line, i) => (
                  <div key={i} className={line.isCommand ? "text-[#F4F1E8] font-semibold" : "text-[#A1A1AA] whitespace-pre-line leading-[1.7]"}>
                    {line.text}
                  </div>
                ))}

                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[#B7FF2A] shrink-0 tracking-wider">guest@kunal ~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && runCommand()}
                    className="flex-1 bg-transparent border-none outline-none text-[#F4F1E8] font-mono p-0 m-0 w-full focus:ring-0 caret-[#B7FF2A]"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>


              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
