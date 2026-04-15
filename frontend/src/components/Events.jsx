import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, CheckCircle, Clock, ArrowRight, Plus, Pencil, Trash2 } from "lucide-react";
import api from "../api/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
import { getErrorMessage } from "../utils/errorHandler.js";
import FormModal from "./FormModal.jsx";

export default function Events() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [activeTab, setActiveTab] = useState("UPCOMING");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const eventsTab = {
    key: "events",
    label: "Events",
    columns: ["title", "venue", "status"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "venue", label: "Venue", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "status", label: "Status", type: "select", options: ["UPCOMING", "COMPLETED"], required: true },
      { name: "image", label: "Image", type: "file" },
    ],
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/events?status=${activeTab}`);
        setEvents(res.data.data);
      } catch (err) {
        console.error("Failed to fetch events:", getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [activeTab]); // refetch whenever tab changes

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete event:", getErrorMessage(err));
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
      setEvents((prev) => prev.map((r) => r.id === savedRecord.id ? savedRecord : r));
    } else {
      setEvents((prev) => [savedRecord, ...prev]);
    }
    setModalOpen(false);
  };

  // format ISO date string to readable format
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  return (
    <section className="relative min-h-screen bg-[#040d06]/0 text-white overflow-hidden">
      <video className="fixed inset-0 w-full h-full object-cover -z-20 opacity-55"
        src="/videos/215761_medium.mp4" autoPlay muted loop playsInline />
      <div className="fixed inset-0 -z-10 bg-[#040d06]/25" />
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] bg-[#00FF88]/4 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            CLUB EVENTS
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
              Events &
            </span>{" "}
            Innovations
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
            className="text-gray-400 text-sm sm:text-base">
            🚀 Explore our journey through events & innovations
          </motion.p>
        </div>

        {/* Tabs + admin add button */}
        <div className="flex justify-center items-center gap-4 mb-10 sm:mb-14 relative">
          <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/8">
            {[
              { key: "UPCOMING", label: "Upcoming", icon: Clock },
              { key: "COMPLETED", label: "Completed", icon: CheckCircle },
            ].map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold tracking-widest transition-all duration-300
                  ${activeTab === key
                    ? "bg-[#00FF88] text-black shadow-[0_0_16px_rgba(0,255,136,0.3)]"
                    : "text-gray-400 hover:text-white"
                  }`}
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                <Icon size={14} />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.slice(0, 5)}</span>
              </button>
            ))}
          </div>

          {/* Admin: add button */}
          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={openCreate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black font-black text-xs tracking-[0.15em] shadow-[0_0_20px_rgba(0,255,136,0.3)]"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <Plus size={14} /> ADD
            </motion.button>
          )}
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 rounded-full border-2 border-[#00FF88]/20 border-t-[#00FF88] animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>

              {events.length === 0 ? (
                <div className="py-24 text-center text-gray-500">
                  No {activeTab.toLowerCase()} events at the moment.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
                  {events.map((event, i) => (
                    <motion.div key={event.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -6 }}
                      className="group relative bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden flex flex-col gap-0 hover:border-[#00FF88]/20 transition-all duration-400"
                    >
                      {/* Event Image */}
                      {event.imageUrl || event.image ? (
                        <div className="relative h-48 overflow-hidden bg-white/5">
                          <img
                            src={event.imageUrl || event.image}
                            alt={event.title}
                            className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040d06]/40" />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-[#00FF88]/10 to-[#00CCFF]/10 flex items-center justify-center">
                          <Calendar size={32} className="text-white/20" />
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="p-6 flex flex-col gap-4">
                        {/* Admin controls */}
                        {isAdmin && (
                          <div className="absolute top-4 right-4 flex gap-2 z-10">
                            <button
                              onClick={() => openEdit(event)}
                              className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all duration-200"
                            >
                              <Pencil size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete(event.id)}
                              className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all duration-200"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        )}

                        {/* Status chip */}
                        <div>
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] px-2.5 py-1 rounded-full
                            ${activeTab === "UPCOMING"
                              ? "bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/25"
                              : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                            }`}
                            style={{ fontFamily: "'Orbitron', sans-serif" }}>
                            {activeTab === "UPCOMING" ? (
                              <><span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" /> UPCOMING</>
                            ) : (
                              <><CheckCircle size={10} /> COMPLETED</>
                            )}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00FF88] transition-colors duration-300 leading-tight">
                          {event.title}
                        </h3>

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Calendar size={13} className="text-[#00FF88] shrink-0" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <MapPin size={13} className="text-[#00FF88] shrink-0" />
                            {event.venue}
                          </div>
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed flex-1">
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        <AnimatePresence>
          {modalOpen && (
            <FormModal
              tab={eventsTab}
              record={editingRecord}
              onClose={() => setModalOpen(false)}
              onSuccess={handleModalSuccess}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}