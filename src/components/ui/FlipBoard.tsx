import { motion, AnimatePresence, useInView } from "motion/react"
import { useEffect, useRef, useState } from "react"

const Characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export const FlipBoard = ({ char, delay, isHighlight }: { char: string, delay: number, isHighlight?: boolean }) => {
  const [displayed, setDisplayed] = useState("")
  const ref = useRef(null)
  const inView = useInView(ref, { margin: "-100px" })

  useEffect(() => {
    if (!inView) { setDisplayed(""); return }

    let flips = 0
    const max = 10 + Math.random() * 8
    let interval: ReturnType<typeof setInterval>

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (++flips >= max) { clearInterval(interval); setDisplayed(char) }
        else setDisplayed(Characters[Math.floor(Math.random() * Characters.length)])
      }, 60)
    }, delay * 1000)

    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [inView, char, delay])

  if (char === " ") return <div className="w-3 md:w-6"/>

  return (
    <div
      ref={ref}
      className="relative mx-px md:mx-0.5 flex items-center justify-center bg-[#111] rounded-sm w-9 h-13 md:w-15 md:h-21 shadow-[0_4px_10px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.05)] border border-[#222]"
      style={{ perspective: "800px" }}
    >
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black -translate-y-1/2 z-20">
        <div className="w-0.75 h-1.5 bg-[#333] absolute -left-px -top-0.5 rounded-[1px]" />
        <div className="w-0.75 h-1.5 bg-[#333] absolute -right-px -top-0.5 rounded-[1px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          {displayed && (
            <motion.span
              key={displayed}
              initial={{ rotateX: -90, opacity: 0, y: -5 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              exit={{ rotateX: 90, opacity: 0, y: 5 }}
              transition={{ duration: 0.12 }}
              className={`tiny absolute z-10 text-[32px] md:text-[56px] font-medium leading-none ${isHighlight ? "text-[#B7FF2A]" : "text-[#F4F1E8]"}`}
            >
              {displayed}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}