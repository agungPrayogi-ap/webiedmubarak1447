"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import Background from "./components/Background";
import GreetingCard from "./components/GreetingCard";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#021a16] font-outfit selection:bg-amber-400 selection:text-emerald-950">

      {/* Background Layers */}
      <Background />

      {/* Mouse Glow Effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at ${glowX}px ${glowY}px, rgba(251, 191, 36, 0.08), transparent 80%)`
        }}
      />

      {/* Hero Section */}
      <div className="relative z-10 w-full max-w-5xl mx-auto pt-24 pb-32 px-6 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-amber-400/80 font-arabic text-5xl mb-6 block tracking-[0.2em] drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]"
          >
            عيد مبارك
          </motion.span>

          <h1 className="text-7xl md:text-9xl font-black text-white leading-[1.1] mb-8 tracking-tighter uppercase italic px-4">
            Minal <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_10px_30px_rgba(251,191,36,0.3)]">
              Aidzin
            </span>
          </h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 1, duration: 1.5 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
          />

          <p className="text-white/40 text-xs md:text-sm font-bold tracking-[0.8em] uppercase px-4">
            Mohon Maaf Lahir & Batin <span className="mx-4 text-white/10">|</span> 1447 Hijriah
          </p>
        </motion.div>

        {/* The Card Interaction */}
        <div className="w-full max-w-2xl transform hover:scale-[1.01] transition-transform duration-700">
          <GreetingCard />
        </div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 2, duration: 2 }}
          className="mt-40 flex items-center gap-6"
        >
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-400" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-400">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" />
          </svg>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-400" />
        </motion.div>

      </div>

      {/* Narrative Section (Personal Touch) */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 mb-40 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/30 font-light text-lg leading-relaxed italic"
        >
          "Karena setiap maaf adalah awal yang baru, dan setiap doa adalah bentuk cinta yang paling murni. Semoga hari ini membawa kedamaian bagi hatimu, seperti yang selalu aku semogakan."
        </motion.p>
      </div>

      <footer className="relative z-10 w-full py-20 text-center">
        <div className="w-10 h-10 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-400/20">
          <span className="text-amber-400 text-xs">A</span>
        </div>
        <p className="text-white/20 text-[9px] tracking-[0.6em] uppercase font-black">
          Crafted with Sincerity &bull; 2026
        </p>
      </footer>

    </main>
  );
}
