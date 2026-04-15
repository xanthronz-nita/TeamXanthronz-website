import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquarePlus, Send } from "lucide-react";
import api from "../api/axiosInstance.js";
import { getErrorMessage } from "../utils/errorHandler.js";

// Usage:
// <ChangeRequestModal isOpen={open} onClose={() => setOpen(false)} />

const SECTIONS = [
  "Members / Squads",
  "Achievements",
  "Events",
  "Gallery",
  "Sponsors",
  "Other",
];

export default function ChangeRequestModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ section: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.section || !form.description.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await api.post("/request-change", form);
      setSuccess(true);
      // auto close after 2 seconds on success
      setTimeout(() => {
        setSuccess(false);
        setForm({ section: "", description: "" });
        onClose();
      }, 2000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setForm({ section: "", description: "" });
    setError("");
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            className="relative bg-[#050f07] border border-[#00CCFF]/20 rounded-2xl w-full max-w-md mx-auto shadow-2xl"
            initial={{ scale: 0.88, opacity: 0, y: 32 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 32 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#00CCFF]/10 border border-[#00CCFF]/20">
                  <MessageSquarePlus size={16} className="text-[#00CCFF]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    REQUEST A CHANGE
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Admin will review your request
                  </p>
                </div>
              </div>
              <button onClick={handleClose}
                className="p-2 rounded-lg text-gray-500 hover:text-[#00CCFF] hover:bg-[#00CCFF]/10 transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-4">

              {/* Success state */}
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-8 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center">
                    <Send size={24} className="text-[#00FF88]" />
                  </div>
                  <h4 className="text-base font-black text-white"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    REQUEST SUBMITTED
                  </h4>
                  <p className="text-sm text-gray-400">
                    Your request has been sent to the admin for review.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Section select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Section <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {SECTIONS.map((section) => (
                        <button
                          key={section}
                          onClick={() => { setForm((p) => ({ ...p, section })); setError(""); }}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all duration-200 border
                            ${form.section === section
                              ? "border-[#00CCFF]/50 bg-[#00CCFF]/10 text-[#00CCFF]"
                              : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
                            }`}
                          style={{ fontFamily: "'Orbitron', sans-serif" }}
                        >
                          {section}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe what you'd like to change and why..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00CCFF]/50 transition-all resize-none"
                    />
                    <span className="text-[10px] text-gray-600 self-end">
                      {form.description.length} chars
                    </span>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
                    >
                      {error}
                    </motion.p>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            {!success && (
              <div className="p-6 border-t border-white/8 flex gap-3">
                <button onClick={handleClose}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 text-sm font-bold hover:border-white/20 hover:text-white transition-all"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  CANCEL
                </button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#0099CC] to-[#00CCFF] text-black font-black text-sm tracking-widest shadow-[0_0_20px_rgba(0,204,255,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {isSubmitting ? "SENDING..." : <><Send size={14} /> SUBMIT</>}
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}