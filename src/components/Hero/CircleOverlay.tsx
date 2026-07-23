import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

export default function CircleOverlay() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800
  
  const scale = useTransform(scrollY, [0, windowHeight], [1, 2.2])
  const opacity = useTransform(scrollY, [0, windowHeight], [1, 0])
  const rotation = useTransform(scrollY, [0, windowHeight], [0, 180])

  return (
    <div ref={wrapperRef} className="pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
      <motion.div style={{ scale, opacity, rotate: rotation }} className="relative h-162.5 w-162.5">
        <div className="absolute inset-4.5">
          {Array.from({ length: 80 }).map((_, i) => {
            const angle = (i / 80) * Math.PI * 2
            const radius = 307
            const large = i % 8 === 0
            const size = large ? 4 : 3

            return (
              <span
                key={i}
                className="absolute rounded-full bg-[#6A6A6A]"
                style={{
                  width: size,
                  height: size,
                  opacity: large ? 0.75 : 0.35,
                  left: `calc(50% + ${Math.cos(angle) * radius}px - ${size / 2}px)`,
                  top: `calc(50% + ${Math.sin(angle) * radius}px - ${size / 2}px)`,
                }}
              />
            )
          })}
        </div>

        <div className="absolute inset-22.5 rounded-full border border-[#181818]" />
      </motion.div>
    </div>
  )
}
