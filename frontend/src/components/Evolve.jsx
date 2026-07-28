import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Zap, ArrowRight } from "lucide-react";

const evolveItems = [
  {
    id: 1,
    title: "AI Bootcamp 2026",
    date: "March 12, 2026",
    venue: "Main Auditorium",
    description: "A hands-on bootcamp covering AI, ML, and real-world projects tailored for engineering students.",
    tag: "Workshop",
  },
  {
    id: 2,
    title: "EV Engineering Masterclass",
    date: "May 8, 2026",
    venue: "Innovation Lab, NIT Agartala",
    description: "Deep dive into electric vehicle design, battery management systems, and powertrain optimization.",
    tag: "Masterclass",
  },
];

export default function Evolve() {
  return (
    <section className="relative min-h-screen bg-[#040d06]/0 text-white overflow-hidden">
      <video className="fixed inset-0 w-full h-full object-cover -z-20 opacity-55" src="/videos/215761_medium.mp4" autoPlay muted loop playsInline />
      <div className="fixed inset-0 -z-10 bg-[#040d06]/10" />
      <div className="pointer-events-none absolute top-0 left-0 w-[600px] h-[400px] bg-[#00FF88]/4 blur-[130px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <Zap size={10} /> EVOLVE
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Learn.{" "}
            <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
              Grow.
            </span>{" "}
            Evolve.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
            className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
            🚀 Explore our journey through events & innovations designed to push boundaries
          </motion.p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5 sm:gap-7">
          {evolveItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-white/[0.03] border border-white/8 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-8 items-start hover:border-[#00FF88]/20 transition-all duration-400"
            >
              {/* Number */}
              <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#00FF88]/8 border border-[#00FF88]/20 flex items-center justify-center text-[#00FF88] font-black text-xl"
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                0{i + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#00CCFF] uppercase"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-[#00FF88] transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={13} className="text-[#00FF88]" /> {item.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={13} className="text-[#00FF88]" /> {item.venue}
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{item.description}</p>
                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00FF88] hover:gap-3 transition-all duration-200"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Learn More <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}