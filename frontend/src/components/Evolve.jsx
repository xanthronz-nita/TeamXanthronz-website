import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Zap,
  ArrowRight,
  Car,
  Cpu,
  Settings,
  Users,
  Trophy,
  Lightbulb,
  Wrench,
  BatteryCharging,
  Gauge,
} from "lucide-react";

const GOOGLE_FORM_LINK = "https://forms.gle/your-google-form-link";

// Change this to true when recruitment opens
const RECRUITMENT_OPEN = false;

const departments = [
  {
    icon: Settings,
    title: "Mechanical",
    description:
      "Design, build and optimize the mechanical systems that bring the vehicle to life.",
  },
  {
    icon: BatteryCharging,
    title: "Electrical",
    description:
      "Work with batteries, motors, power systems and the electrical architecture of the vehicle.",
  },
  {
    icon: Cpu,
    title: "Electronics & Controls",
    description:
      "Explore sensors, control systems, embedded electronics and vehicle intelligence.",
  },
  {
    icon: Wrench,
    title: "Design & Fabrication",
    description:
      "Turn engineering concepts into physical components through CAD, manufacturing and fabrication.",
  },
  {
    icon: Users,
    title: "Management & Operations",
    description:
      "Coordinate people, resources, documentation, logistics and the team's journey.",
  },
  {
    icon: Lightbulb,
    title: "Media & Outreach",
    description:
      "Shape the team's identity through communication, content, media and outreach.",
  },
];

const journey = [
  {
    number: "01",
    title: "IDEATE",
    description:
      "Start with a problem, an idea and the curiosity to find a better solution.",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "Turn ideas into engineering concepts, models and systems ready to be built.",
  },
  {
    number: "03",
    title: "BUILD",
    description:
      "Bring designs to reality through fabrication, assembly and hands-on engineering.",
  },
  {
    number: "04",
    title: "TEST",
    description:
      "Push the machine, identify weaknesses, learn from failures and improve.",
  },
  {
    number: "05",
    title: "COMPETE",
    description:
      "Take everything you've built and put it to the test at the SAE India eBAJA competition.",
  },
];

export default function Evolve() {
  return (
    <section className="relative min-h-screen bg-[#040d06]/0 text-white overflow-hidden">
      {/* Background */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-20 opacity-55"
        src="/videos/215761_medium.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="fixed inset-0 -z-10 bg-[#040d06]/10" />

      <div className="pointer-events-none fixed top-0 left-0 w-[600px] h-[400px] bg-[#00FF88]/4 blur-[130px] rounded-full" />

      <div className="pointer-events-none fixed bottom-0 right-0 w-[500px] h-[400px] bg-[#00CCFF]/3 blur-[130px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
        {/* ========================================================= */}
        {/* HERO */}
        {/* ========================================================= */}

        <div className="text-center mb-14 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-[11px] font-bold tracking-[0.2em] mb-5"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <Zap size={11} />
            TEAM XANTHRONZ
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-4xl sm:text-5xl md:text-[55px] font-black leading-tight mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            EVOLVE{" "}
            <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
              2.0
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="text-sm sm:text-base font-bold tracking-[0.3em] text-[#00FF88] mb-5"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            SPARK TO SPEED
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Where curiosity meets engineering, ideas become machines, and
            machines are built to race.
          </motion.p>
        </div>

        {/* ========================================================= */}
        {/* UPCOMING EVENT */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-20 sm:mb-28"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#00FF88]/20 via-[#00CCFF]/10 to-[#00FF88]/20 opacity-60" />

          <div className="relative bg-[#040d06]/85 backdrop-blur-md border border-white/8 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[11px] font-bold tracking-[0.2em] text-[#00CCFF] uppercase"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Upcoming Event
                  </span>
                </div>

                <h2
                  className="text-[27px] sm:text-[33px] font-black mb-3"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  EVOLVE 2.0
                </h2>

                <p className="text-base text-gray-400 leading-relaxed max-w-xl">
                  The official induction experience of Team Xanthronz for the
                  2026–27 session. Discover the team, explore our work and get
                  your first look into the world of electric vehicle
                  engineering and motorsport.
                </p>
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Calendar size={15} className="text-[#00FF88]" />
                  September 21st, 2026
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Clock size={15} className="text-[#00FF88]" />
                  04:30 PM
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <MapPin size={15} className="text-[#00FF88]" />
                  Visvesvaraya Auditorium
                </div>
              </div>
            </div>

            <div className="mt-7 pt-6 border-t border-white/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-gray-500">
                Interested in becoming part of Team Xanthronz?
              </p>

              {RECRUITMENT_OPEN ? (
                <a
                  href={GOOGLE_FORM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/25 text-[#00FF88] text-sm font-bold hover:bg-[#00FF88]/15 hover:border-[#00FF88]/40 transition-all duration-300"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Apply for Recruitment
                  <ArrowRight size={14} />
                </a>
              ) : (
                <div
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-gray-400 text-sm font-bold"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Recruitment Starts Soon
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* ABOUT XANTHRONZ */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 sm:mb-28"
        >
          <div className="text-center mb-10">
            <span
              className="text-[11px] font-bold tracking-[0.2em] text-[#00CCFF]"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              WHO WE ARE
            </span>

            <h2
              className="text-[27px] sm:text-[33px] font-black mt-3 mb-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              BUILT TO{" "}
              <span className="text-[#00FF88]">ENGINEER.</span>
              <br />
              BUILT TO COMPETE.
            </h2>

            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Team Xanthronz is a student engineering team driven by the
              challenge of designing, building and competing with electric
              off-road vehicles at the SAE India eBAJA competition.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: Car, label: "Electric Mobility" },
              { icon: Settings, label: "Engineering" },
              { icon: Gauge, label: "Performance" },
              { icon: Trophy, label: "Competition" },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white/[0.03] border border-white/8 rounded-xl p-4 sm:p-5 text-center hover:border-[#00FF88]/20 transition-all duration-300"
                >
                  <Icon
                    size={22}
                    className="text-[#00FF88] mx-auto mb-3"
                  />

                  <p className="text-sm text-gray-400 font-bold">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* WHY EVOLVE */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 sm:mb-28"
        >
          <div className="mb-10">
            <span
              className="text-[11px] font-bold tracking-[0.2em] text-[#00CCFF]"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              THE EXPERIENCE
            </span>

            <h2
              className="text-[27px] sm:text-[33px] font-black mt-3"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              WHY <span className="text-[#00FF88]">EVOLVE?</span>
            </h2>

            <p className="text-base text-gray-400 mt-3 max-w-xl leading-relaxed">
              Xanthronz is more than a club. It is an opportunity to learn,
              build, collaborate and experience engineering beyond the
              classroom.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Lightbulb,
                title: "Learn by Building",
                description:
                  "Turn theoretical knowledge into practical engineering experience through real projects.",
              },
              {
                icon: Wrench,
                title: "Get Hands-On",
                description:
                  "Work with real components, tools, systems and engineering problems.",
              },
              {
                icon: Users,
                title: "Build Together",
                description:
                  "Collaborate with students from different disciplines and learn how engineering teams work.",
              },
              {
                icon: Trophy,
                title: "Experience Competition",
                description:
                  "Work toward building a vehicle capable of competing at the SAE India eBAJA.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group bg-white/[0.03] border border-white/8 rounded-2xl p-5 sm:p-6 hover:border-[#00FF88]/20 transition-all duration-300"
                >
                  <Icon
                    size={23}
                    className="text-[#00FF88] mb-4"
                  />

                  <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-[#00FF88] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* DEPARTMENTS */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 sm:mb-28"
        >
          <div className="text-center mb-10">
            <span
              className="text-[11px] font-bold tracking-[0.2em] text-[#00CCFF]"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              FIND YOUR DOMAIN
            </span>

            <h2
              className="text-[27px] sm:text-[33px] font-black mt-3 mb-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              EXPLORE THE{" "}
              <span className="text-[#00FF88]">TEAM</span>
            </h2>

            <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Different disciplines. One machine. Find the area where your
              curiosity can turn into contribution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="group bg-white/[0.03] border border-white/8 rounded-xl p-5 hover:border-[#00FF88]/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00FF88]/5 border border-[#00FF88]/15 flex items-center justify-center mb-4">
                    <Icon
                      size={19}
                      className="text-[#00FF88]"
                    />
                  </div>

                  <h3 className="text-base font-bold mb-2 group-hover:text-[#00FF88] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* JOURNEY */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 sm:mb-28"
        >
          <div className="text-center mb-10">
            <span
              className="text-[11px] font-bold tracking-[0.2em] text-[#00CCFF]"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              THE XANTHRONZ JOURNEY
            </span>

            <h2
              className="text-[27px] sm:text-[33px] font-black mt-3"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              FROM IDEA TO{" "}
              <span className="text-[#00FF88]">RACE DAY</span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute top-8 left-[8%] right-[8%] h-px bg-gradient-to-r from-[#00FF88]/10 via-[#00FF88]/30 to-[#00FF88]/10" />

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 sm:gap-3">
              {journey.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative text-center"
                >
                  <div
                    className="relative z-10 w-16 h-16 mx-auto rounded-full bg-[#040d06] border border-[#00FF88]/25 flex items-center justify-center text-[#00FF88] text-sm font-black mb-4"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {item.number}
                  </div>

                  <h3
                    className="text-sm font-black mb-2"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed px-2">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* FINAL CTA */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-[#00FF88]/15 bg-[#00FF88]/[0.03] p-8 sm:p-12 text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#00FF88]/5 blur-[80px]" />

          <div className="relative">
            <Zap
              size={24}
              className="text-[#00FF88] mx-auto mb-5"
            />

            <h2
              className="text-[27px] sm:text-[33px] font-black mb-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              YOUR JOURNEY{" "}
              <span className="text-[#00FF88]">STARTS HERE.</span>
            </h2>

            <p className="text-base text-gray-400 max-w-xl mx-auto leading-relaxed mb-7">
              The next idea hasn't been built yet. The next machine hasn't
              been tested yet. Maybe you're the one who helps build it.
            </p>

            {RECRUITMENT_OPEN ? (
              <a
                href={GOOGLE_FORM_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-sm font-bold hover:bg-[#00FF88]/15 hover:border-[#00FF88]/50 hover:gap-3 transition-all duration-300"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Join Team Xanthronz
                <ArrowRight size={14} />
              </a>
            ) : (
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-gray-400 text-sm font-bold"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Recruitment Starts Soon
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}