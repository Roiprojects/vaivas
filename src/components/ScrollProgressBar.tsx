"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-transparent">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}
