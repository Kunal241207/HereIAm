import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { LEFT_HAND_ART, RIGHT_HAND_ART } from "./ascii"

const denseChars = ["#", "%", "&", "@", "8", "B"]
const mediumChars = ["(", "/", "*", "|", "x", "+", "=", "?"]
const lightChars = [",", ".", "-", "_", "~", ";", "`"]

function getNoise(x: number, y: number, t: number) {
  const v =
    Math.sin(x * 0.15 + t) +
    Math.sin(y * 0.15 - t * 0.8) +
    Math.sin((x + y) * 0.1 + t * 1.2)
  return (v + 3) / 6
}

function getCharGroup(char: string) {
  if (mediumChars.includes(char)) return mediumChars
  if (lightChars.includes(char)) return lightChars
  return denseChars
}

function stableSwap(char: string, x: number, y: number) {
  const group = getCharGroup(char)
  if (!group.includes(char)) return char
  const hash = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453)
  const fraction = hash - Math.floor(hash)
  return group[Math.floor(fraction * group.length)]
}

function Hand({ art, className }: { art: readonly string[], className: string }) {
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    let rafId: number
    let lastUpdate = 0
    const rows = art.map(line => line.split(""))

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdate > 50) {
        lastUpdate = timestamp
        const t = timestamp * 0.001
        let output = ""

        for (let y = 0; y < rows.length; y++) {
          for (let x = 0; x < rows[y].length; x++) {
            const char = rows[y][x]
            if (char === " ") { output += " "; continue }

            if (Math.random() < 0.002) {
              output += ["*", "+", ".", "x", "✦"][Math.floor(Math.random() * 5)]
              continue
            }

            const noise = getNoise(x, y, t)
            output += noise < 0.55 ? char : stableSwap(char, x, y)
          }
          if (y < rows.length - 1) output += "\n"
        }

        if (preRef.current) preRef.current.textContent = output
      }
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [art])

  return (
    <pre ref={preRef} className={`ascii-hand ${className}`}>
      {art.join("\n")}
    </pre>
  )
}

const floatLeft = {
  x: [0, 18, 26, 18, 0] as number[],
  y: [0, -2, -5, -2, 0] as number[],
  rotate: [-1, -0.5, 0, -0.5, -1] as number[],
}

const floatRight = {
  x: [0, -18, -26, -18, 0] as number[],
  y: [0, 2, 5, 2, 0] as number[],
  rotate: [1, 0.5, 0, 0.5, 1] as number[],
}

const floatTransition = {
  duration: 8,
  repeat: Infinity,
  ease: "easeInOut" as const,
}

export default function HeroHands() {
  const { scrollY } = useScroll()
  const leftHandX = useTransform(scrollY, [0, 600], [0, -300])
  const rightHandX = useTransform(scrollY, [0, 600], [0, 300])
  const handY = useTransform(scrollY, [0, 600], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      <motion.div className="absolute left-[-7%] top-[28%] origin-left" style={{ x: leftHandX, y: handY, opacity }}>
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 3.5 }}
        >
          <motion.div animate={floatLeft} transition={floatTransition}>
            <Hand art={LEFT_HAND_ART} className="" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="absolute right-[-7%] top-[42%] origin-right" style={{ x: rightHandX, y: handY, opacity }}>
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 3.5 }}
        >
          <motion.div animate={floatRight} transition={floatTransition}>
            <Hand art={RIGHT_HAND_ART} className="" />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0f0f0f_100%)]" />

    </div>
  )
}
