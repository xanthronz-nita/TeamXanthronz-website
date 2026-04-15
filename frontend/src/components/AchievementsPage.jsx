import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Trophy, Plus, Pencil, Trash2 } from "lucide-react";
import api from "../api/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
import { getErrorMessage } from "../utils/errorHandler.js";
import FormModal from "./FormModal.jsx";

export default function AchievementsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("All");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const achievementsTab = {
    key: "achievements",
    label: "Achievements",
    columns: ["title", "category", "year"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "year", label: "Year", type: "number", required: true },
      { name: "highlights", label: "Highlights (one per line)", type: "textarea" },
      { name: "rankSummary", label: "Rank Summary (JSON)", type: "json" },
      { name: "image", label: "Image", type: "file" },
    ],
  };

  // derive unique years from loaded achievements for filter pills
  const years = [...new Set(achievements.map((a) => a.year))].sort((a, b) => b - a);

  // ── Fetch (resets list when year filter changes) ───────────────────────────
  useEffect(() => {
    const fetchAchievements = async () => {
      setIsLoading(true);
      try {
        const yearParam = selectedYear !== "All" ? `&year=${selectedYear}` : "";
        const res = await api.get(`/achievements?page=1${yearParam}`);
        setAchievements(res.data.data.achievements);
        setHasMore(res.data.data.hasMore);
        setPage(1);
      } catch (err) {
        console.error("Failed to fetch achievements:", getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchAchievements();
  }, [selectedYear]);

  // ── Load more ──────────────────────────────────────────────────────────────
  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const yearParam = selectedYear !== "All" ? `&year=${selectedYear}` : "";
      const res = await api.get(`/achievements?page=${nextPage}${yearParam}`);

      // append new results to existing list
      setAchievements((prev) => [...prev, ...res.data.data.achievements]);
      setHasMore(res.data.data.hasMore);
      setPage(nextPage);
    } catch (err) {
      console.error("Failed to load more achievements:", getErrorMessage(err));
    } finally {
      setLoadingMore(false);
    }
  };

  // ── Admin: delete ──────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this achievement?")) return;
    try {
      await api.delete(`/achievements/${id}`);
      setAchievements((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to delete achievement:", getErrorMessage(err));
      alert(getErrorMessage(err));
    }
  };

  const openCreate = () => {
    setEditingRecord(null);
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditingRecord(record);
    setModalOpen(true);
  };

  const handleModalSuccess = (savedRecord, isEdit) => {
    if (isEdit) {
      setAchievements((prev) => prev.map((r) => r.id === savedRecord.id ? savedRecord : r));
    } else {
      setAchievements((prev) => [savedRecord, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <section className="relative min-h-screen bg-[#040d06] text-white overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 w-[600px] h-[400px] bg-[#00FF88]/4 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#00CCFF]/4 blur-[130px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-[#00FF88]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00FF88]"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              ACHIEVEMENTS
            </span>
          </motion.div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight"
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Our{" "}
                <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
                  Milestones
                </span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                className="text-gray-400 text-sm sm:text-base max-w-2xl">
                From our bold beginning to setting benchmarks, Team Xanthronz has consistently made its mark in the E-BAJA SAE arena.
              </motion.p>
            </div>

            {/* Admin: add button */}
            {isAdmin && (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black font-black text-xs tracking-[0.15em] shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                onClick={openCreate}
              >
                <Plus size={14} /> ADD
              </motion.button>
            )}
          </div>
        </div>

        {/* Filter pills */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center gap-2 mb-8 sm:mb-12">
          <span className="text-xs text-gray-500 font-semibold tracking-widest mr-1"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            FILTER:
          </span>
          {["All", ...years.map(String)].map((y) => (
            <button key={y} onClick={() => setSelectedYear(y === "All" ? "All" : y)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all duration-200
                ${selectedYear === y || (y === "All" && selectedYear === "All")
                  ? "bg-[#00FF88] text-black shadow-[0_0_16px_rgba(0,255,136,0.3)]"
                  : "border border-white/10 text-gray-400 hover:border-[#00FF88]/30 hover:text-[#00FF88]"
                }`}
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {y}
            </button>
          ))}
        </motion.div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 rounded-full border-2 border-[#00FF88]/20 border-t-[#00FF88] animate-spin" />
          </div>
        ) : achievements.length === 0 ? (
          <div className="py-24 text-center text-gray-500">No achievements found.</div>
        ) : (
          <>
            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
              <AnimatePresence>
                {achievements.map((item, idx) => (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    whileHover={{ y: -6 }}
                    className="group relative bg-white/[0.03] border border-white/8 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:border-[#00FF88]/20 transition-all duration-400"
                  >
                    {/* Admin controls */}
                    {isAdmin && (
                      <div className="absolute top-3 left-3 z-20 flex gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all duration-200"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all duration-200"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative h-44 sm:h-48 overflow-hidden bg-white/5">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title}
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full bg-white/[0.03]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040d06] via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-sm">
                        <span className="text-xs font-black text-white/80"
                          style={{ fontFamily: "'Orbitron', sans-serif" }}>
                          {item.year}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <span className="text-[10px] font-bold tracking-[0.15em] text-[#00CCFF] uppercase block mb-3"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        {item.category}
                      </span>

                      <h3 className="text-base sm:text-lg font-bold text-white mb-3 leading-tight group-hover:text-[#00FF88] transition-colors duration-300">
                        {item.title}
                      </h3>

                      {item.rankSummary && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {Object.values(item.rankSummary).map((r, i) => (
                            <span key={i}
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00FF88]/10 border border-[#00FF88]/25 text-[#00FF88]"
                              style={{ fontFamily: "'Orbitron', sans-serif" }}>
                              {r}
                            </span>
                          ))}
                        </div>
                      )}

                      <ul className="space-y-1.5 mb-5">
                        {item.highlights.slice(0, 3).map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                            <span className="text-[#00FF88] mt-0.5 shrink-0">▹</span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-end pt-3 border-t border-white/5">
                        <span className="text-[10px] text-gray-600">
                          {item.highlights.length} highlights
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load more */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <motion.button
                  onClick={loadMore}
                  disabled={loadingMore}
                  whileHover={{ scale: loadingMore ? 1 : 1.04, y: loadingMore ? 0 : -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3.5 rounded-full border border-[#00FF88]/30 text-[#00FF88] font-bold text-xs tracking-[0.2em] hover:bg-[#00FF88]/8 hover:border-[#00FF88]/55 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {loadingMore ? "LOADING..." : "LOAD MORE"}
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <FormModal
            tab={achievementsTab}
            record={editingRecord}
            onClose={() => setModalOpen(false)}
            onSuccess={handleModalSuccess}
          />
        )}
      </AnimatePresence>
    </section>
  );
}