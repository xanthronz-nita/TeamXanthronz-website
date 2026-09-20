import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Flag,
  GraduationCap,
  ArrowDown,
  Sparkles,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

const ADVISORS = [
  {
    name: "Dr. Bhogendro Meitei",
    department: "Department of Mechanical Engineering",
    designation: "Faculty Advisor",
    image: "/images/bhogendro_meitei.jpeg",
  },
  {
    name: "Dr. Vikram Das",
    department: "Department of Electrical Engineering",
    designation: "Faculty Advisor",
    image: "/images/vikram_das.jpeg",
  },
];

export default function AboutUs() {
  return (
    <section className="relative min-h-screen bg-[#040d06]/0 text-gray-200 overflow-hidden">

      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-20 opacity-55"
        src="/videos/215761_medium.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Tint */}
      <div className="fixed inset-0 -z-10 bg-[#040d06]/10" />

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#00FF88]/5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">

        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <motion.div
          {...fadeUp()}
          className="flex justify-center mb-4"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-xs font-bold tracking-[0.2em]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
            ABOUT US
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          The Story Behind{" "}
          <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
            Team Xanthronz
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.14)}
          className="text-center text-gray-400 text-sm sm:text-base mb-14 sm:mb-20 max-w-2xl mx-auto"
        >
          Driven by passion, powered by innovation, and built for the race.
        </motion.p>


        {/* ========================================================= */}
        {/* HISTORY + MISSION */}
        {/* ========================================================= */}

        <div className="relative mb-20 sm:mb-28">

          {/* Central Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-[#00FF88]/0 via-[#00FF88]/40 to-[#00CCFF]/0 -translate-x-1/2" />

          {/* HISTORY */}
          <motion.div
            {...fadeUp(0.1)}
            className="relative md:grid md:grid-cols-2 md:gap-16 items-center mb-12 md:mb-20"
          >

            {/* Text */}
            <div className="md:text-right">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-[#00FF88] text-xs font-bold tracking-[0.2em]">
                  OUR JOURNEY
                </span>
              </div>

              <h2
                className="text-2xl sm:text-3xl font-black text-white mb-5"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                From an Idea
                <br />
                <span className="text-[#00FF88]">to the Track</span>
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl md:ml-auto">
                Team Xanthronz is a student-driven engineering team from
                <span className="text-white font-semibold">
                  {" "}NIT Agartala
                </span>
                , brought together by a shared passion for innovation,
                motorsport, and engineering.
              </p>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl md:ml-auto mt-4">
                What started as an idea grew into a dedicated team of
                engineers, designers, and innovators. Through countless
                hours in the workshop, endless design iterations, testing,
                failures, and improvements, we continue to transform ideas
                into a machine capable of taking on the challenge of
                SAE E-BAJA.
              </p>
            </div>

            {/* Timeline Node */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 rounded-full bg-[#040d06] border border-[#00FF88]/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.15)]">
                <BookOpen
                  size={20}
                  className="text-[#00FF88]"
                />
              </div>
            </div>

            {/* Visual Panel */}
            <div className="mt-7 md:mt-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF88]/20 to-[#00CCFF]/20 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500" />

                <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 overflow-hidden">

                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF88]/5 blur-3xl rounded-full" />

                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-[#00FF88]/8 text-[#00FF88]">
                      <BookOpen size={25} />
                    </div>

                    <div>
                      <p
                        className="text-white font-bold text-sm"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        OUR HISTORY
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Engineering • Innovation • Racing
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Students with a shared vision",
                      "Engineering ideas turned into designs",
                      "Design, fabrication & testing",
                      "Preparation for SAE E-BAJA competitions",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-3"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[#00FF88]/30 flex items-center justify-center text-[10px] text-[#00FF88]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-gray-300 text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </motion.div>


          {/* MISSION */}
          <motion.div
            {...fadeUp(0.2)}
            className="relative md:grid md:grid-cols-2 md:gap-16 items-center"
          >

            {/* Visual Panel */}
            <div className="order-2 md:order-1 mt-7 md:mt-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00CCFF]/20 to-[#00FF88]/20 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500" />

                <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 overflow-hidden">

                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00CCFF]/5 blur-3xl rounded-full" />

                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-[#00FF88]/8 text-[#00FF88]">
                      <Flag size={25} />
                    </div>

                    <div>
                      <p
                        className="text-white font-bold text-sm"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        OUR MISSION
                      </p>

                      <p className="text-gray-500 text-xs mt-1">
                        Learn • Build • Compete • Inspire
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      To create an environment where students can transform
                      classroom knowledge into real engineering solutions.
                    </p>

                    <div className="h-px bg-gradient-to-r from-[#00FF88]/30 to-transparent my-5" />

                    <p className="text-gray-400 text-sm leading-relaxed">
                      We aim to develop technically skilled professionals
                      through hands-on experience in design, simulation,
                      fabrication, electronics, testing, teamwork, and
                      competition.
                    </p>
                  </div>

                </div>
              </div>
            </div>


            {/* Text */}
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-[#00FF88] text-xs font-bold tracking-[0.2em]">
                  WHY WE EXIST
                </span>
              </div>

              <h2
                className="text-2xl sm:text-3xl font-black text-white mb-5"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Engineering Beyond
                <br />
                <span className="text-[#00FF88]">the Classroom</span>
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                We believe engineering is not limited to textbooks and
                examinations. It is about solving problems, building
                something tangible, learning from failure, and continuously
                improving.
              </p>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-4">
                Through Team Xanthronz, students get the opportunity to
                experience the complete engineering cycle — from an initial
                concept to a competition-ready electric ATV.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  "Innovation",
                  "Teamwork",
                  "Problem Solving",
                  "Leadership",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-[#00FF88]/15 bg-[#00FF88]/5 text-[#00FF88] text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline Node */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 rounded-full bg-[#040d06] border border-[#00CCFF]/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,204,255,0.15)]">
                <Flag
                  size={20}
                  className="text-[#00FF88]"
                />
              </div>
            </div>

          </motion.div>

        </div>


        {/* ========================================================= */}
        {/* FACULTY ADVISORS */}
        {/* ========================================================= */}

        <motion.div
          {...fadeUp(0.1)}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[#00FF88] text-xs font-bold tracking-[0.2em]">
              GUIDANCE & MENTORSHIP
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl font-black text-white mb-3"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Faculty{" "}
            <span className="text-[#00FF88]">
              Advisors
            </span>
          </h2>

          <div className="w-16 h-[2px] bg-gradient-to-r from-[#00FF88] to-[#00CCFF] mx-auto rounded-full" />

          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-5">
            Guiding the team with experience, knowledge, and mentorship
            throughout our engineering journey.
          </p>
        </motion.div>


        {/* Advisor Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">

          {ADVISORS.map((advisor, index) => (
            <motion.article
              key={advisor.name}
              {...fadeUp(0.15 + index * 0.1)}
              whileHover={{ y: -7 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-lg hover:border-[#00FF88]/25 transition-colors duration-500"
            >

              {/* Top Gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00FF88] to-[#00CCFF]" />

              <div className="p-6 sm:p-8">

                {/* Profile */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                  {/* Image */}
                  <div className="relative shrink-0">

                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#00FF88]/30 to-[#00CCFF]/20 blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-[#00FF88]/20 bg-black/30">

                      <img
                        src={advisor.image}
                        alt={advisor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                    </div>

                  </div>


                  {/* Details */}
                  <div className="text-center sm:text-left flex-1">

                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00FF88]/5 border border-[#00FF88]/15 mb-3">

                      <GraduationCap
                        size={12}
                        className="text-[#00FF88]"
                      />

                      <span className="text-[#00FF88] text-[10px] font-bold tracking-wider">
                        FACULTY ADVISOR
                      </span>

                    </div>

                    <h3
                      className="text-white text-lg sm:text-xl font-bold mb-2"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                      }}
                    >
                      {advisor.name}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {advisor.department}
                    </p>

                    <div className="w-12 h-px bg-gradient-to-r from-[#00FF88] to-transparent my-4 mx-auto sm:mx-0" />

                    <p className="text-gray-500 text-xs">
                      {advisor.designation}
                    </p>

                  </div>

                </div>

              </div>

              {/* Bottom Decorative Element */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#00FF88]/5 blur-2xl rounded-full pointer-events-none" />

              <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles
                  size={16}
                  className="text-[#00FF88]"
                />
              </div>

            </motion.article>
          ))}

        </div>


        {/* ========================================================= */}
        {/* END QUOTE */}
        {/* ========================================================= */}

        <motion.div
          {...fadeUp(0.25)}
          className="text-center mt-16 sm:mt-20"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#00FF88]/50 to-transparent mx-auto mb-5" />

          <p
            className="text-gray-500 text-xs tracking-[0.18em]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            DRIVEN BY PASSION • POWERED BY INNOVATION
          </p>
        </motion.div>

      </div>
    </section>
  );
}