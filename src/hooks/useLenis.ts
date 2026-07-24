import { useEffect } from "react"
import Lenis from "lenis"
import { animate, inView } from "motion"

type Effect = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade"

const initials: Record<Effect, object> = {
  "fade-up":    { opacity: 0, y: 48, filter: "blur(4px)" },
  "fade-down":  { opacity: 0, y: -48, filter: "blur(4px)" },
  "fade-left":  { opacity: 0, x: -56, filter: "blur(4px)" },
  "fade-right": { opacity: 0, x: 56, filter: "blur(4px)" },
  "fade":       { opacity: 0, filter: "blur(4px)" },
}

const finals = { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }

function setupInView() {
  document.querySelectorAll<HTMLElement>("[data-gsap]").forEach((el) => {
    const effect = (el.getAttribute("data-gsap") || "fade-up") as Effect
    const delay  = parseFloat(el.getAttribute("data-gsap-delay") || "0")

    animate(el, initials[effect] ?? initials["fade-up"], { duration: 0 })

    inView(el, () => {
      animate(el, finals, {
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      })
    }, { margin: "0px 0px -60px 0px" })
  })
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
    })

    // Progress bar
    const bar = document.createElement("div")
    Object.assign(bar.style, {
      position: "fixed",
      top: "0",
      left: "0",
      height: "2px",
      width: "0%",
      background: "linear-gradient(90deg, #B7FF2A, #d4ff80)",
      zIndex: "9999",
      pointerEvents: "none",
      boxShadow: "0 0 8px rgba(183,255,42,0.5)",
    })
    document.body.appendChild(bar)

    lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      bar.style.width = limit > 0 ? `${(scroll / limit) * 100}%` : "0%"
    })

    let raf: number
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    setupInView()

    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute("href")
      if (!id || id.length < 2) return
      const target = document.querySelector(id) as HTMLElement | null
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -32, duration: 1.8, easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)) })
    }

    document.addEventListener("click", onAnchorClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("click", onAnchorClick)
      bar.remove()
      lenis.destroy()
    }
  }, [])
}
