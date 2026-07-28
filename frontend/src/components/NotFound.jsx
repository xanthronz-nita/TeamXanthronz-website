import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-screen bg-[#040d06] flex items-center justify-center px-4 overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-[#00FF88]/4 blur-[140px]" />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-6"
        >
          <span
            className="text-[9rem] sm:text-[12rem] font-black leading-none bg-gradient-to-b from-[#00FF88]/20 to-transparent bg-clip-text text-transparent select-none"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            404
          </span>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-xs font-bold tracking-[0.2em] mb-6"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <Zap size={12} /> SIGNAL LOST
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-2xl sm:text-3xl font-black text-white mb-4"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-gray-400 text-sm sm:text-base mb-10 leading-relaxed"
        >
          Looks like this track doesn't exist. Head back to base and get back in the race.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/home"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black font-black text-sm tracking-widest hover:opacity-90 shadow-[0_0_24px_rgba(0,255,136,0.25)] transition-all duration-300"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <ArrowLeft size={15} /> Back to Home
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#00FF88]/30 text-[#00FF88] font-bold text-sm tracking-widest hover:bg-[#00FF88]/10 transition-all duration-300"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            About Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}