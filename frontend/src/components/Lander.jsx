import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["DESIGN", "PROTOTYPE", "RACE"];

function RotatingWords() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % WORDS.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className="relative inline-flex justify-center items-center overflow-hidden align-middle mx-1"
      style={{ height: "1.15em", minWidth: "11ch" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ y: "-110%", opacity: 0 }}
          animate={{ y: "-10%", opacity: 1 }}
          exit={{ y: "110%", opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="absolute font-black text-[#00CCFF]"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const STATS = [
  { num: "AIR 1", label: "Among IITs & NITs" },
  { num: "2021", label: "Est. NIT Agartala" },
  { num: "95+", label: "Teams Competed" },
  { num: "1st", label: "E-ATV NE India" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Lander() {
  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen w-full overflow-hidden text-white px-4 sm:px-6">

      {/* Glows - properly contained */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[700px] h-[700px] rounded-full bg-[#00FF88]/5 blur-[160px]" />
        </div>
        <div className="absolute top-1/4 right-1/2 transform translate-x-1/2 w-[350px] h-[350px] rounded-full bg-[#00CCFF]/4 blur-[120px]" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center gap-5 sm:gap-7 max-w-5xl w-full mx-auto py-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/25 bg-[#00FF88]/5 text-[#00FF88] text-[10px] sm:text-xs font-bold tracking-[0.25em]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88] animate-pulse" />
            SAE E-BAJA &nbsp;·&nbsp; NIT AGARTALA &nbsp;·&nbsp; SINCE 2021
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span className="block bg-gradient-to-r from-[#00FF88] via-[#00DD77] to-[#00FFCC] bg-clip-text text-transparent pb-1">
            DESIGNING,
          </span>
          <span className="block bg-gradient-to-r from-[#55FF00] via-[#00FF88] to-[#00CC44] bg-clip-text text-transparent pb-1">
            BUILDING
          </span>
          <span className="block bg-gradient-to-r from-[#00FFAA] via-[#00DDFF] to-[#00CCFF] bg-clip-text text-transparent">
            &amp; RACING EVs
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base md:text-lg text-gray-300 font-medium leading-relaxed max-w-lg"
        >
          We <RotatingWords /> edge-cutting electric vehicles with passion and innovation.
        </motion.p>

        {/* Team name */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-1">
          <span
            className="text-[9px] sm:text-[10px] font-bold tracking-[0.4em] text-[#00FF88]/50 uppercase"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Powered by eBaja
          </span>
          <h2
            className="font-extrabold bg-gradient-to-r from-[#00eeff] via-[#55bbff] to-[#00FFCC] bg-clip-text text-transparent"
            style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(2.2rem, 8vw, 4.5rem)", lineHeight: 1 }}
          >
            TEAM XANTHRONZ
          </h2>
        </motion.div>

        {/* Logo */}
        <motion.div variants={fadeUp}>
          <motion.img
            className="h-32 sm:h-44 md:h-56 object-contain drop-shadow-[0_0_40px_rgba(0,255,136,0.18)]"
            src="/logos/TEAM_logo.png"
            alt="Team Xanthronz"
            animate={{ y: [-6, 6, -6], rotate: [-0.8, 0.8, -0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto"
        >
          <motion.button
            onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black font-black text-xs tracking-[0.2em] shadow-[0_0_28px_rgba(0,255,136,0.3)] hover:shadow-[0_0_44px_rgba(0,255,136,0.5)] transition-shadow duration-300"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            EXPLORE
          </motion.button>
          <motion.a
            href="/about"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full border border-[#00FF88]/30 text-[#00FF88] font-bold text-xs tracking-[0.2em] hover:bg-[#00FF88]/8 hover:border-[#00FF88]/55 transition-all duration-300 text-center"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            OUR STORY
          </motion.a>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={fadeUp}
          className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8 mt-1"
        >
          {STATS.map(({ num, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 py-4 px-2 bg-[#040d06] hover:bg-white/[0.03] transition-colors duration-300 group"
            >
              <span
                className="text-lg sm:text-2xl font-black text-[#00FF88] group-hover:scale-110 transition-transform duration-300 origin-bottom"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {num}
              </span>
              <span className="text-[9px] text-gray-500 tracking-[0.12em] uppercase text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}