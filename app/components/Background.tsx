"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Background() {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; duration: number }[]>([]);
  const [orbs, setOrbs] = useState<{ x: number; y: number; size: number; duration: number; delay: number }[]>([]);
  const { scrollY } = useScroll();

  // Create smooth parallax values
  const skyY = useSpring(useTransform(scrollY, [0, 1000], [0, 150]), { stiffness: 50, damping: 20 });
  const mosqueY = useSpring(useTransform(scrollY, [0, 1000], [0, 300]), { stiffness: 50, damping: 20 });
  const contentY = useSpring(useTransform(scrollY, [0, 1000], [0, -100]), { stiffness: 50, damping: 20 });

  useEffect(() => {
    // Generate static stars once
    const newStars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 80, // Keep stars mostly in the upper sky
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 4 + 2,
    }));
    setStars(newStars);

    // Generate floating glowing orbs
    const newOrbs = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 150 + 50,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * -20,
    }));
    setOrbs(newOrbs);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Deep Sky Gradient */}
      <motion.div 
        style={{ y: skyY }}
        className="absolute inset-0 bg-gradient-to-b from-[#021a16] via-[#052c22] to-[#010c0a]"
      />

      {/* Atmospheric Glowing Orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-emerald-400/5 blur-[80px]"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Stars Container */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              boxShadow: "0 0 4px 1px rgba(255,255,255,0.2)",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Mosque Landscape (High Quality) */}
      <motion.div 
        style={{ y: mosqueY }}
        className="absolute bottom-0 w-full h-full flex justify-center items-end"
      >
        <div 
          className="absolute bottom-[-5%] w-full h-[70%] bg-cover bg-bottom opacity-20 contrast-125 saturate-50 mix-blend-screen"
          style={{ backgroundImage: 'url("/mosque_bg.png")' }}
        />
        {/* Soft fog overlay */}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#021a16] via-[#021a16]/40 to-transparent" />
      </motion.div>

      {/* Floating Lanterns (Enhanced) */}
      <div className="absolute inset-x-0 top-0 flex justify-around p-10 opacity-60">
        {[2, 5, 8].map((id) => (
          <motion.div
            key={id}
            animate={{
              rotate: [-4, 4, -4],
              y: [0, 10, 0],
              x: [0, id % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{
              duration: 5 + id,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-10 h-16 bg-amber-400 rounded-b-lg shadow-[0_0_30px_rgba(255,191,0,0.4)] border-t-[3px] border-amber-900 group"
          >
            <div className="absolute -top-16 left-1/2 -ml-[1px] w-[2px] h-16 bg-gradient-to-b from-transparent to-white/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-10 bg-white/60 blur-md rounded-full" />
            <div className="absolute inset-1 border border-amber-600/20 rounded-b-sm" />
          </motion.div>
        ))}
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
