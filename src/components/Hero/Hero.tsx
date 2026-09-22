import HeroHands from "./HeroHands"
import CircleOverlay from "./CircleOverlay"

export default function Hero() {
  return (
    <section id="home" className="relative h-screen overflow-hidden bg-[#0f0f0f]">
      <HeroHands />
      <CircleOverlay />

      <div className="absolute left-1/2 top-[48%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
        <p className="mb-3 text-[16px] font-light tracking-[0.06em] text-[#8E8E8E]">
          Hey, my name is
        </p>

        <div className="mb-4 flex items-center gap-4">
          <span className="mt-13.25 h-3 w-3 bg-[#B7FF2A]" />

          <h1
            className="select-none text-[72px] leading-none text-[#F4F1E8] md:text-[104px] tiny"
          >
            KUNAL
          </h1>
        </div>

        <p className="mb-8 text-[#F4F1E8] md:text-[20px] tiny italic">
          AI × FULL-STACK × SYSTEMS
        </p>

        <a href="#about" className="group flex flex-col items-center">
          <div className="flex items-center gap-4 font-light uppercase tracking-[0.12em] text-[#B7FF2A] transition-colors duration-300 group-hover:text-white">
            <span className="text-[15px]">Explore More</span>

            <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1">
              ➟
            </span>
          </div>
          <span className="text-[9px] leading-none tracking-[0.72em] text-[#B7FF2A] transition-colors duration-300 group-hover:text-white">
            ...................
          </span>
        </a>
      </div>
    </section>
  )
}
