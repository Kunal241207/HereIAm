import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const bootLogs = [
  "kernel: boot sequence initiated",
  "vfs: mounting root filesystem",
  "net: establishing secure connection",
  "mem: allocating physical memory",
  "sys: resolving core dependencies",
  "gpu: compiling shader modules",
  "ui: constructing document object model",
  "ascii: decoding byte matrices",
  "auth: verifying handshake",
  "sys: warming up neural pathways",
  "core: all systems nominal",
  "root: starting session...",
]

function calcProgress(elapsed: number): number {
  const t = Math.min(elapsed / 2600, 1)
  if (t < 0.55) {
    const n = t / 0.55
    return n * (2 - n) * 70
  }
  if (t < 0.75) return 70
  const t2 = (t - 0.75) / 0.25
  return 70 + t2 * t2 * 30
}

const cornerBase = "absolute h-4 w-4 border-[#B7FF2A]"

function showHomeSection() {
  window.history.replaceState(null, "", window.location.pathname + window.location.search)
  requestAnimationFrame(() => {
    window.scrollTo(0, 0)
    window.dispatchEvent(new Event("scroll"))
  })
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    let elapsed = 0
    let finishTimer: ReturnType<typeof setTimeout> | undefined

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    window.scrollTo(0, 0)
    document.body.style.overflow = "hidden"

    const timer = setInterval(() => {
      elapsed += 16
      const p = calcProgress(elapsed)
      const logIndex = Math.min(Math.floor((p / 100) * bootLogs.length), bootLogs.length - 1)
      setLogs(bootLogs.slice(0, logIndex + 1))
      setProgress(p)

      if (p >= 100) {
        clearInterval(timer)
        finishTimer = setTimeout(() => {
          setLoading(false)
          document.body.style.overflow = previousOverflow
          showHomeSection()
        }, 800)
      }
    }, 16)

    return () => {
      clearInterval(timer)
      clearTimeout(finishTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const displayValue = Math.floor(progress)
  const isDone = displayValue === 100

  return (
    <AnimatePresence>
      {loading && (
        <motion.div key="terminal-loader" className="fixed inset-0 z-100 pointer-events-auto">

          <div className="absolute inset-0 flex">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 + i * 0.05 }}
                className={`flex-1 bg-[#0e0e0e] border-r border-[#1a1a1a]/30 last:border-none ${
                  i % 2 === 0 ? "origin-top" : "origin-bottom"
                }`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.4, ease: "easeInOut" } }}
            className="absolute inset-0 flex text-[#8E8E8E] font-mono overflow-hidden"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0) 50%, rgba(0,0,0,1) 50%)",
                backgroundSize: "100% 4px",
              }}
            />

            <div className="absolute inset-4 md:inset-8 border border-[#1a1a1a] flex flex-col justify-between p-6 md:p-12">

              <div className={`${cornerBase} -left-px -top-px border-l-[1.5px] border-t-[1.5px]`} />
              <div className={`${cornerBase} -right-px -top-px border-r-[1.5px] border-t-[1.5px]`} />
              <div className={`${cornerBase} -bottom-px -left-px border-l-[1.5px] border-b-[1.5px]`} />
              <div className={`${cornerBase} -bottom-px -right-px border-r-[1.5px] border-b-[1.5px]`} />

              <div className="flex justify-between items-start text-[10px] md:text-[11px] uppercase tracking-[0.25em]">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[#F4F1E8]">SYS.BOOT_SEQUENCE</span>
                  <span className="text-[#555]">ID: KUNAL-FOLIO</span>
                </div>
                <div className="flex flex-col gap-1.5 text-right">
                  <span className="text-[#555]">ENV: PRODUCTION</span>
                  <span className="flex items-center justify-end gap-2 text-[#F4F1E8]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B7FF2A] animate-pulse" />
                    ONLINE
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col-reverse md:flex-row justify-between items-end md:items-center py-12 md:py-0">

                <div className="flex flex-col gap-2 text-[10px] md:text-[11px] w-full md:w-1/2 uppercase tracking-[0.15em] h-45 justify-end overflow-hidden">
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-4 items-center"
                    >
                      <span className="text-[#555]">[{String(i).padStart(2, "0")}]</span>
                      <span className={i === logs.length - 1 ? "text-[#F4F1E8]" : "text-[#707070]"}>
                        {log}
                      </span>
                    </motion.div>
                  ))}
                  <div className="flex gap-4 items-center mt-2">
                    <span className="text-[#555] lowercase">root@kunal:~$</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="w-1 h-3 md:w-1.5 md:h-3.5 bg-[#B7FF2A]"
                    />
                  </div>
                </div>

                <div className="flex items-start self-end md:self-center">
                  <span
                    className="tiny text-[#F4F1E8] text-[140px] md:text-[240px] leading-[0.8] tracking-tighter transition-colors duration-500"
                  >
                    {displayValue.toString().padStart(3, "0")}
                  </span>
                  <span
                    className="tiny text-[#B7FF2A] text-[50px] md:text-[90px] leading-none ml-2"
                  >
                    %
                  </span>
                </div>

              </div>

              <div className="flex justify-between items-end text-[10px] md:text-[11px] uppercase tracking-[0.25em]">
                <div className="flex items-center gap-6">
                  <span className="text-[#555]">PROGRESS</span>
                  <div className="hidden md:flex tracking-[0.3em] text-[#B7FF2A]">
                    [
                    {Array.from({ length: 20 }).map((_, i) => (
                      <span key={i} className={progress >= (i + 1) * 5 ? "opacity-100" : "opacity-20"}>
                        #
                      </span>
                    ))}
                    ]
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-right">
                  <span className="text-[#555]">SYSTEM_STATUS</span>
                  <span className={isDone ? "text-[#B7FF2A]" : "text-[#F4F1E8]"}>
                    {isDone ? "READY" : "INITIALIZING"}
                  </span>
                </div>
              </div>

              <div className="absolute top-1/2 left-0 w-full h-px bg-[#1a1a1a]/50 -z-10 pointer-events-none" />
              <div className="absolute top-0 left-1/2 w-px h-full bg-[#1a1a1a]/50 -z-10 pointer-events-none" />

            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
