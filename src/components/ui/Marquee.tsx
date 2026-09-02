import { useRef, useEffect } from "react"
import type { IconType } from "react-icons"
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiMongodb, SiExpress,
  SiNodedotjs, SiTailwindcss, SiSass, SiPython, SiCplusplus, SiGo, SiSupabase,
  SiGit, SiFramer, SiFigma, SiDocker, SiVercel, SiVite, SiPostgresql,
} from "react-icons/si"

const topIcons: IconType[] = [
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiMongodb, SiExpress, SiNodedotjs, SiTailwindcss, SiSass,
]

const bottomIcons: IconType[] = [
  SiPython, SiCplusplus, SiGo, SiSupabase, SiGit, SiFramer, SiFigma, SiDocker, SiVercel, SiVite, SiPostgresql,
]

function MarqueeRow({ icons, reverse }: { icons: IconType[], reverse?: boolean }) {
  const rowRef      = useRef<HTMLDivElement>(null)
  const wantSpeed   = useRef(1.2)
  const speed       = useRef(1.2)
  const offset      = useRef(0)

  useEffect(() => {
    let rafId: number
    let lastTime = performance.now()

    const animate = (now: number) => {
      if (document.hidden) { rafId = requestAnimationFrame(animate); return }
      const dt = Math.min(now - lastTime, 50)
      lastTime = now

      speed.current += (wantSpeed.current - speed.current) * 0.05
      offset.current += speed.current * (reverse ? -1 : 1) * (dt / 16)

      if (rowRef.current) {
        const loopWidth = rowRef.current.scrollWidth / 4

        if (offset.current >= loopWidth) offset.current -= loopWidth
        else if (offset.current < 0) offset.current += loopWidth

        rowRef.current.style.transform = `translate3d(${-offset.current}px, 0, 0)`
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [reverse])

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div
        ref={rowRef}
        className="flex w-max"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex shrink-0 px-4 items-center">
            {icons.map((Icon, j) => (
              <div
                key={j}
                className="mx-8 shrink-0 cursor-pointer group flex items-center justify-center"
                onMouseEnter={() => { wantSpeed.current = 0 }}
                onMouseLeave={() => { wantSpeed.current = 1.2 }}
              >
                <Icon size={56} className="text-[#444] transition-colors duration-500 group-hover:text-[#B7FF2A]" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-52 bg-linear-to-r from-[#0f0f0f] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-52 bg-linear-to-l from-[#0f0f0f] to-transparent pointer-events-none z-10" />
    </div>
  )
}

export const TopMarquee = () => <MarqueeRow icons={topIcons} />
export const BottomMarquee = () => <MarqueeRow icons={bottomIcons} reverse />
