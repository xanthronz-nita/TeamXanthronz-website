import React from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Wrench, Globe, BookOpen, Flag } from "lucide-react";

const DRIVES = [
  { icon: Wrench, title: "Engineering Excellence", text: "Designing and building high-performance electric ATVs with precision and relentless innovation." },
  { icon: Users, title: "Teamwork", text: "A culture built on collaboration, trust, and shared ambition toward national recognition." },
  { icon: Globe, title: "Global Stage", text: "Representing our institution at national and international SAE E-BAJA competitions." },
  { icon: Trophy, title: "Relentless Growth", text: "Continuously pushing limits and learning beyond the classroom, season after season." },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

export default function AboutUs() {
  return (
    <section className="relative min-h-screen bg-[#040d06]/0 text-gray-200 overflow-hidden">

      {/* Background video + tint */}
      <video className="fixed inset-0 w-full h-full object-cover -z-20 opacity-55" src="/videos/215761_medium.mp4" autoPlay muted loop playsInline />
      <div className="fixed inset-0 -z-10 bg-[#040d06]/10" />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#00FF88]/5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">

        {/* Section label */}
        <motion.div {...fadeUp()} className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-xs font-bold tracking-[0.2em]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
            ABOUT US
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.08)} className="text-center text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          About{" "}
          <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
            Team Xanthronz
          </span>
        </motion.h1>
        <motion.p {...fadeUp(0.14)} className="text-center text-gray-400 text-sm sm:text-base mb-10 sm:mb-16 max-w-xl mx-auto">
          "Driven by passion, powered by Team Xanthronz"
        </motion.p>

        {/* Story & Mission */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-7 mb-16 sm:mb-24">
          {[
            {
              icon: BookOpen,
              title: "The Story",
              accent: "left",
              text: (
                <>
                  We are <span className="text-[#00FF88] font-semibold">Team Xanthronz</span> — a passionate group of engineers, innovators, and dreamers from NIT Agartala. From sleepless nights in the workshop to the adrenaline rush on the race track, our journey stands as a testament to teamwork, resilience, and an uncompromising pursuit of excellence.
                </>
              ),
            },
            {
              icon: Flag,
              title: "Our Mission",
              accent: "right",
              text: "We are more than just a racing team — we are a family of innovators driven by passion, collaboration, and creativity. Our mission is to provide a platform where students can apply engineering concepts to real-world challenges, develop critical problem-solving skills, and evolve into industry-ready professionals.",
            },
          ].map((item, i) => (
            <motion.article
              key={item.title}
              {...fadeUp(0.1 + i * 0.1)}
              className="relative bg-white/[0.03] border border-white/8 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg overflow-hidden group hover:border-[#00FF88]/20 transition-colors duration-500"
            >
              {/* Accent bar */}
              <div className={`absolute ${item.accent === "left" ? "left-0" : "right-0"} top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00FF88] to-[#00CCFF]`} />

              <div className="flex items-start gap-4">
                <div className="shrink-0 p-3 bg-[#00FF88]/8 rounded-xl text-[#00FF88] group-hover:bg-[#00FF88]/15 transition-colors duration-300">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="text-[#00FF88] font-bold text-lg mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* What Drives Us */}
        <motion.div {...fadeUp(0.1)} className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            What Drives{" "}
            <span className="text-[#00FF88]">Us</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#00FF88] to-[#00CCFF] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DRIVES.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp(0.05 * i)}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group bg-white/[0.03] border border-white/8 backdrop-blur-md rounded-2xl p-6 text-center hover:border-[#00FF88]/25 hover:bg-[#00FF88]/5 transition-all duration-400 shadow-md"
            >
              <div className="inline-flex p-3 rounded-xl bg-[#00FF88]/8 text-[#00FF88] mb-4 group-hover:bg-[#00FF88]/15 transition-colors duration-300">
                <item.icon size={24} />
              </div>
              <h3 className="text-white font-bold text-sm mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}