import { motion } from "motion/react"

export function AnimatedLogo() {
  return (
    <motion.a 
      href="#about" 
      className="relative inline-block cursor-pointer"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <h1 className="relative z-10 select-none text-[52px] leading-none text-[#F4F1E8] flex tiny">
        <span className="text-[#B7FF2A]">.</span>K
      </h1>
      
      <motion.h1
        className="absolute top-0 left-0 z-0 select-none text-[52px] leading-none flex tiny text-[#FF5F56]"
        variants={{
          rest: { opacity: 0, x: 0, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
          hover: { 
            opacity: [0, 1, 1, 0, 1, 0],
            x: [-3, 4, -2, 3, -1, 0],
            y: [1, -2, 1, -1, 1, 0],
            clipPath: [
              "inset(0% 0% 0% 0%)",
              "inset(20% 0% 60% 0%)",
              "inset(60% 0% 10% 0%)",
              "inset(10% 0% 50% 0%)",
              "inset(80% 0% 5% 0%)",
              "inset(0% 0% 0% 0%)"
            ],
            transition: { duration: 0.4, ease: "linear" }
          }
        }}
        aria-hidden="true"
      >
        <span className="text-[#FF5F56]">.</span>K
      </motion.h1>

      <motion.h1
        className="absolute top-0 left-0 z-0 select-none text-[52px] leading-none flex tiny text-[#00FFFF]"
        variants={{
          rest: { opacity: 0, x: 0, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
          hover: { 
            opacity: [0, 1, 1, 0, 1, 0],
            x: [3, -4, 2, -2, 3, 0],
            y: [-1, 2, -1, 2, -1, 0],
            clipPath: [
              "inset(0% 0% 0% 0%)",
              "inset(60% 0% 10% 0%)",
              "inset(10% 0% 70% 0%)",
              "inset(40% 0% 30% 0%)",
              "inset(5% 0% 80% 0%)",
              "inset(0% 0% 0% 0%)"
            ],
            transition: { duration: 0.4, ease: "linear" }
          }
        }}
        aria-hidden="true"
      >
        <span className="text-[#00FFFF]">.</span>K
      </motion.h1>
    </motion.a>
  )
}
