import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Trophy,
  Medal,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance.js";
import { getErrorMessage } from "../utils/errorHandler.js";

// Accent color cycles through these based on index
const ACCENT_COLORS = [
  "#00FF88",
  "#00CCFF",
  "#00FF88",
  "#00CCFF",
  "#FFD700",
  "#00FF88",
];

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // Fetch first 6 achievements
        const res = await api.get("/achievements?page=1");
        setAchievements(res.data.data.achievements);
      } catch (err) {
        console.error("Failed to fetch achievements:", getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const current = achievements[active];

  const go = (dir) => {
    setActive((p) =>
      Math.max(0, Math.min(achievements.length - 1, p + dir))
    );
  };

  // ─────────────────────────────────────────────
  // Loading
  // ─────────────────────────────────────────────

  if (isLoading) {
    return (
      <section className="relative w-full max-w-full overflow-hidden bg-[#040d06]/30 py-14 sm:py-20 lg:py-24 flex items-center justify-center min-h-[320px] sm:min-h-[400px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.05),transparent_55%)]" />

        <div className="relative flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#00FF88]/15 border-t-[#00FF88] animate-spin" />
            <div className="absolute inset-1 rounded-full border border-[#00CCFF]/10" />
          </div>

          <span
            className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] text-gray-600 uppercase text-center"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Loading Milestones
          </span>
        </div>
      </section>
    );
  }

  // ─────────────────────────────────────────────
  // Empty
  // ─────────────────────────────────────────────

  if (!achievements.length) {
    return (
      <section className="relative w-full max-w-full overflow-hidden bg-[#040d06]/30 py-14 sm:py-20 lg:py-24 flex items-center justify-center min-h-[320px] sm:min-h-[400px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.04),transparent_55%)]" />

        <div className="relative text-center px-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-5 rounded-2xl border border-white/8 bg-white/[0.025] flex items-center justify-center">
            <Trophy size={20} className="text-gray-600" />
          </div>

          <p
            className="text-gray-500 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-widest uppercase"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            No achievements yet
          </p>
        </div>
      </section>
    );
  }

  const accentColor = ACCENT_COLORS[active % ACCENT_COLORS.length];

  return (
    <section
      id="explore"
      className="relative w-full max-w-full bg-[#040d06]/30 py-12 xs:py-14 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* ─────────────────────────────────────────
          Background
      ───────────────────────────────────────── */}

      <div className="pointer-events-none absolute -top-40 -left-40 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#00FF88]/[0.025] blur-[100px] sm:blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-[#00CCFF]/[0.025] blur-[110px] sm:blur-[150px]" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF88]/25 to-transparent" />

      {/* Technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] sm:opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,136,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─────────────────────────────────────────
          Main Container
      ───────────────────────────────────────── */}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-10">
        {/* ─────────────────────────────────────────
            Header
        ───────────────────────────────────────── */}

        <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between mb-8 sm:mb-10 lg:mb-14 min-w-0">
          <div className="min-w-0 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-3"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-lg border border-[#00FF88]/20 bg-[#00FF88]/5 shrink-0">
                <Trophy size={13} className="text-[#00FF88]" />
              </div>

              <span
                className="text-[8px] xs:text-[9px] font-bold tracking-[0.2em] xs:tracking-[0.3em] text-[#00FF88] truncate"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                MILESTONES / 0{achievements.length}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-[22px] xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.12] break-words"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Achievements as a{" "}
              <span className="bg-gradient-to-r from-[#00FF88] via-[#00FFB0] to-[#00CCFF] bg-clip-text text-transparent">
                Team
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-3 max-w-xl text-[11px] xs:text-xs sm:text-sm text-gray-500 leading-relaxed"
            >
              Milestones built through engineering, competition, teamwork and
              relentless iteration.
            </motion.p>
          </div>

          <Link
            to="/achievements"
            className="group self-start inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-[#00FF88]/20 bg-[#00FF88]/[0.025] text-[#00FF88] text-[9px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] hover:bg-[#00FF88]/[0.07] hover:border-[#00FF88]/45 transition-all duration-300 shrink-0"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span>SEE ALL</span>
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ─────────────────────────────────────────
            Main Layout
        ───────────────────────────────────────── */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch min-w-0">
          {/* ═══════════════════════════════════════
              Achievement Showcase
          ═══════════════════════════════════════ */}

          <div className="lg:col-span-8 min-w-0 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.985 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative w-full min-w-0 min-h-[470px] xs:min-h-[490px] sm:min-h-[500px] lg:min-h-[540px] rounded-2xl sm:rounded-[1.5rem] overflow-hidden border border-white/10 bg-[#07100a] shadow-2xl"
              >
                {/* Background image */}
                {current.imageUrl && (
                  <motion.img
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={current.imageUrl}
                    alt={current.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.18] sm:opacity-[0.22]"
                  />
                )}

                {/* Image overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#040d06]/25 via-[#040d06]/65 to-[#040d06]" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#040d06] via-transparent to-[#040d06]/40" />

                {/* Accent glow */}
                <div
                  className="absolute -top-32 -right-32 w-[280px] sm:w-[350px] h-[280px] sm:h-[350px] rounded-full blur-[90px] sm:blur-[120px] opacity-20"
                  style={{ backgroundColor: accentColor }}
                />

                {/* Left accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] sm:w-[3px]"
                  style={{
                    background: `linear-gradient(to bottom, ${accentColor}, transparent 75%)`,
                  }}
                />

                {/* Top technical line */}
                <div
                  className="absolute top-0 left-5 sm:left-8 right-5 sm:right-8 h-px opacity-50"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                  }}
                />

                {/* Corner brackets */}
                <div
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 w-7 sm:w-10 h-7 sm:h-10 border-t border-r opacity-30"
                  style={{ borderColor: accentColor }}
                />

                <div
                  className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 w-7 sm:w-10 h-7 sm:h-10 border-b border-l opacity-20"
                  style={{ borderColor: accentColor }}
                />

                {/* ─────────────────────────────────
                    Card Content
                ───────────────────────────────── */}

                <div className="relative z-10 p-5 xs:p-6 sm:p-8 lg:p-10 min-h-[470px] xs:min-h-[490px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-between min-w-0">
                  {/* TOP */}
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3 sm:gap-5 mb-6 sm:mb-8 min-w-0">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-3 min-w-0">
                          <span
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0"
                            style={{
                              backgroundColor: accentColor,
                              boxShadow: `0 0 12px ${accentColor}`,
                            }}
                          />

                          <span
                            className="text-[8px] sm:text-[9px] font-bold tracking-[0.18em] sm:tracking-[0.25em] uppercase truncate"
                            style={{
                              color: accentColor,
                              fontFamily: "'Orbitron', sans-serif",
                            }}
                          >
                            {current.category}
                          </span>
                        </div>

                        {/* Year */}
                        <div className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-3 gap-y-1">
                          <span
                            className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black leading-none text-white break-all"
                            style={{
                              fontFamily: "'Orbitron', sans-serif",
                            }}
                          >
                            {current.year}
                          </span>

                          <span className="text-[7px] sm:text-[9px] text-gray-600 tracking-[0.15em] sm:tracking-[0.2em]">
                            MILESTONE
                          </span>
                        </div>
                      </div>

                      {/* Number */}
                      <div className="hidden xs:flex flex-col items-end shrink-0">
                        <span className="text-[7px] sm:text-[8px] text-gray-600 tracking-[0.2em]">
                          ACHIEVEMENT
                        </span>

                        <span
                          className="text-xl sm:text-2xl font-black mt-1"
                          style={{
                            color: `${accentColor}70`,
                            fontFamily: "'Orbitron', sans-serif",
                          }}
                        >
                          {String(active + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="w-full max-w-3xl text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.2] tracking-tight break-words">
                      {current.title}
                    </h3>

                    {/* Divider */}
                    <div className="flex items-center gap-2 sm:gap-3 my-5 sm:my-6">
                      <div
                        className="h-px w-8 sm:w-12 shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />

                      <div className="h-px w-12 sm:w-24 bg-white/10" />
                    </div>

                    {/* Rank badges */}
                    {current.rankSummary &&
                      Object.values(current.rankSummary).length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 max-w-full">
                          {Object.values(current.rankSummary).map(
                            (rank, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: 0.15 + i * 0.05,
                                }}
                                className="inline-flex items-center gap-1.5 sm:gap-2 max-w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[8px] sm:text-[9px] font-black tracking-[0.1em] sm:tracking-[0.15em] border backdrop-blur-md break-words"
                                style={{
                                  color: accentColor,
                                  borderColor: `${accentColor}35`,
                                  background: `${accentColor}0d`,
                                  fontFamily: "'Orbitron', sans-serif",
                                }}
                              >
                                <Medal
                                  size={10}
                                  className="shrink-0"
                                />

                                <span className="break-words">
                                  {rank}
                                </span>
                              </motion.span>
                            )
                          )}
                        </div>
                      )}
                  </div>

                  {/* BOTTOM */}
                  <div className="mt-8 sm:mt-10 min-w-0">
                    {/* Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-3">
                      {current.highlights.map((highlight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.15 + i * 0.05,
                          }}
                          className="flex items-start gap-2.5 sm:gap-3 min-w-0 text-[11px] sm:text-xs md:text-sm text-gray-300"
                        >
                          <span
                            className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor:
                                i % 2 === 0
                                  ? "#00FF88"
                                  : "#00CCFF",
                              boxShadow: `0 0 7px ${
                                i % 2 === 0
                                  ? "#00FF88"
                                  : "#00CCFF"
                              }`,
                            }}
                          />

                          <span className="leading-relaxed break-words min-w-0">
                            {highlight}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom metadata */}
                    <div className="mt-6 sm:mt-7 pt-4 border-t border-white/8 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-gray-600 min-w-0">
                        <Target size={11} className="shrink-0" />

                        <span className="text-[7px] sm:text-[8px] tracking-[0.15em] sm:tracking-[0.2em] uppercase truncate">
                          Team Xanthronz
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <Sparkles
                          size={10}
                          style={{ color: accentColor }}
                        />

                        <span
                          className="text-[7px] sm:text-[8px] tracking-[0.15em] sm:tracking-[0.2em]"
                          style={{ color: accentColor }}
                        >
                          MILESTONE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ─────────────────────────────────
                Navigation
            ───────────────────────────────── */}

            <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 w-full min-w-0">
              <button
                onClick={() => go(-1)}
                disabled={active === 0}
                aria-label="Previous achievement"
                className="group shrink-0 p-2.5 sm:p-3 rounded-xl border border-white/8 bg-white/[0.02] text-gray-500 hover:border-[#00FF88]/35 hover:bg-[#00FF88]/[0.04] hover:text-[#00FF88] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft
                  size={16}
                  className="sm:w-[18px] sm:h-[18px] transition-transform group-hover:-translate-x-0.5"
                />
              </button>

              <div className="flex-1 min-w-0 h-10 rounded-xl border border-white/6 bg-white/[0.015] flex items-center justify-center gap-1 overflow-hidden px-2">
                {achievements.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`View achievement ${i + 1}`}
                    className="rounded-full transition-all duration-300 shrink-0"
                    style={{
                      width: i === active ? "24px" : "5px",
                      height: "5px",
                      background:
                        i === active
                          ? "linear-gradient(90deg,#00FF88,#00CCFF)"
                          : "rgba(255,255,255,0.13)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                disabled={active === achievements.length - 1}
                aria-label="Next achievement"
                className="group shrink-0 p-2.5 sm:p-3 rounded-xl border border-white/8 bg-white/[0.02] text-gray-500 hover:border-[#00CCFF]/35 hover:bg-[#00CCFF]/[0.04] hover:text-[#00CCFF] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight
                  size={16}
                  className="sm:w-[18px] sm:h-[18px] transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              MOBILE TIMELINE
          ═══════════════════════════════════════ */}

          <div className="lg:hidden w-full min-w-0">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[8px] sm:text-[9px] text-gray-600 tracking-[0.2em] sm:tracking-[0.25em]"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                TIMELINE
              </span>

              <span className="text-[8px] sm:text-[9px] text-gray-700">
                {active + 1}/{achievements.length}
              </span>
            </div>

            {/* Internal horizontal scroll only */}
            <div
              className="w-full max-w-full overflow-x-auto overflow-y-hidden scrollbar-none pb-1"
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="flex gap-2 w-max pr-4">
                {achievements.map((achievement, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`shrink-0 w-[135px] xs:w-[150px] sm:w-[175px] p-3 rounded-xl border text-left transition-all duration-250 ${
                      i === active
                        ? "border-[#00FF88]/35 bg-[#00FF88]/[0.06]"
                        : "border-white/7 bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <span
                        className={`text-[9px] sm:text-[10px] font-black tracking-widest ${
                          i === active
                            ? "text-[#00FF88]"
                            : "text-gray-500"
                        }`}
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                        }}
                      >
                        {achievement.year}
                      </span>

                      {i === active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_7px_#00FF88] shrink-0" />
                      )}
                    </div>

                    <p
                      className={`text-[9px] sm:text-[10px] leading-snug line-clamp-2 break-words ${
                        i === active
                          ? "text-gray-200"
                          : "text-gray-600"
                      }`}
                    >
                      {achievement.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              DESKTOP TIMELINE
          ═══════════════════════════════════════ */}

          <div className="hidden lg:block lg:col-span-4 min-w-0 h-full">
            <div className="relative h-full min-h-[540px] rounded-[1.5rem] border border-white/8 bg-white/[0.02] overflow-hidden">
              {/* Panel header */}
              <div className="px-5 py-4 border-b border-white/7 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg border border-[#00CCFF]/20 bg-[#00CCFF]/5 flex items-center justify-center shrink-0">
                    <Target size={13} className="text-[#00CCFF]" />
                  </div>

                  <span
                    className="text-[9px] font-bold tracking-[0.25em] text-gray-400 truncate"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                    }}
                  >
                    TIMELINE
                  </span>
                </div>

                <span className="text-[8px] text-gray-700 tracking-widest shrink-0">
                  {String(achievements.length).padStart(2, "0")} EVENTS
                </span>
              </div>

              {/* Timeline */}
              <div className="relative p-4">
                {/* Vertical line */}
                <div className="absolute left-[34px] top-8 bottom-8 w-px bg-gradient-to-b from-[#00FF88]/25 via-white/8 to-transparent" />

                <div className="space-y-2">
                  {achievements.map((achievement, i) => {
                    const isActive = i === active;

                    return (
                      <motion.button
                        key={i}
                        onClick={() => setActive(i)}
                        whileHover={{ x: 3 }}
                        className={`group relative w-full min-w-0 text-left pl-14 pr-4 py-4 rounded-xl border transition-all duration-300 ${
                          isActive
                            ? "border-[#00FF88]/30 bg-[#00FF88]/[0.055]"
                            : "border-transparent bg-transparent hover:border-white/8 hover:bg-white/[0.025]"
                        }`}
                      >
                        {/* Timeline node */}
                        <div
                          className={`absolute left-[10px] top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? "border-[#00FF88]/50 bg-[#00FF88]/10"
                              : "border-white/8 bg-[#07100a]"
                          }`}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: isActive
                                ? "#00FF88"
                                : "rgba(255,255,255,0.2)",
                              boxShadow: isActive
                                ? "0 0 8px #00FF88"
                                : "none",
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between gap-3 min-w-0">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1 min-w-0">
                              <span
                                className={`text-[9px] font-black tracking-[0.2em] shrink-0 ${
                                  isActive
                                    ? "text-[#00FF88]"
                                    : "text-gray-600"
                                }`}
                                style={{
                                  fontFamily:
                                    "'Orbitron', sans-serif",
                                }}
                              >
                                {achievement.year}
                              </span>

                              {isActive && (
                                <span className="text-[7px] tracking-widest text-[#00CCFF] shrink-0">
                                  ACTIVE
                                </span>
                              )}
                            </div>

                            <p
                              className={`text-xs font-semibold leading-snug truncate ${
                                isActive
                                  ? "text-white"
                                  : "text-gray-500"
                              }`}
                            >
                              {achievement.title}
                            </p>
                          </div>

                          <ChevronRight
                            size={14}
                            className={`shrink-0 transition-all duration-300 ${
                              isActive
                                ? "text-[#00FF88] translate-x-0"
                                : "text-gray-700 -translate-x-1 opacity-0 group-hover:opacity-100"
                            }`}
                          />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00CCFF]/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
