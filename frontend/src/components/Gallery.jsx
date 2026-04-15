import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Trash2, Maximize2 } from "lucide-react";
import api from "../api/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
import FormModal from "./FormModal.jsx";

export default function Gallery() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [sliderImages, setSliderImages] = useState([]);
  const [collageImages, setCollageImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const galleryTab = {
    key: "gallery",
    label: "Gallery",
    fields: [
      { name: "type", label: "Type", type: "select", options: ["SLIDER", "COLLAGE"], required: true },
      { name: "caption", label: "Caption", type: "text" },
      { name: "image", label: "Image", type: "file", required: true },
    ],
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // fetch both types in parallel
        const [sliderRes, collageRes] = await Promise.all([
          api.get("/gallery?type=SLIDER"),
          api.get("/gallery?type=COLLAGE"),
        ]);
        setSliderImages(sliderRes.data.data);
        setCollageImages(collageRes.data.data);
      } catch (err) {
        console.error("Failed to fetch gallery:", getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // auto-advance slider
  useEffect(() => {
    if (paused || sliderImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [paused, sliderImages.length]);

  const openCreate = () => {
    setEditingRecord(null);
    setModalOpen(true);
  };

  const handleModalSuccess = (savedRecord, isEdit) => {
    if (isEdit) {
      // Update existing record
      setSliderImages((prev) =>
        prev.map((r) => r.id === savedRecord.id ? savedRecord : r)
      );
      setCollageImages((prev) =>
        prev.map((r) => r.id === savedRecord.id ? savedRecord : r)
      );
    } else {
      // For new records, refetch the appropriate gallery type
      if (savedRecord.type === "SLIDER") {
        setSliderImages((prev) => [savedRecord, ...prev]);
      } else {
        setCollageImages((prev) => [savedRecord, ...prev]);
      }
    }
    setModalOpen(false);
  };

  const go = (dir) => {
    setPaused(true);
    setCurrentIndex((p) => (p + dir + sliderImages.length) % sliderImages.length);
    setTimeout(() => setPaused(false), 5000);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      if (type === "SLIDER") {
        setSliderImages((prev) => prev.filter((img) => img.id !== id));
        // reset index if it's now out of bounds
        setCurrentIndex(0);
      } else {
        setCollageImages((prev) => prev.filter((img) => img.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete image:", getErrorMessage(err));
      alert(getErrorMessage(err));
    }
  };

  const handleTypeChange = async (id, newType, oldType) => {
    try {
      await api.put(`/gallery/${id}`, { type: newType });
      if (oldType === "SLIDER") {
        setSliderImages((prev) => prev.filter((img) => img.id !== id));
        setCurrentIndex(0);
      } else {
        setCollageImages((prev) => prev.filter((img) => img.id !== id));
      }
      // Refetch the other type to include the moved image
      const res = await api.get(`/gallery?type=${newType}`);
      if (newType === "SLIDER") {
        setSliderImages(res.data.data);
      } else {
        setCollageImages(res.data.data);
      }
    } catch (err) {
      console.error("Failed to change image type:", getErrorMessage(err));
      alert(getErrorMessage(err));
    }
  };

  if (isLoading) {
    return (
      <section className="relative min-h-screen bg-[#040d06]/0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#00FF88]/20 border-t-[#00FF88] animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-[#040d06]/0 text-white overflow-hidden px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
      <video className="fixed inset-0 w-full h-full object-cover -z-20 opacity-55"
        src="/videos/215761_medium.mp4" autoPlay muted loop playsInline />
      <div className="fixed inset-0 -z-10 bg-[#040d06]/25" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
            GALLERY
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Moments We{" "}
            <span className="bg-gradient-to-r from-[#00CCFF] to-[#00FF88] bg-clip-text text-transparent">
              Captured
            </span>
          </motion.h1>

          {/* Admin: upload button */}
          {isAdmin && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={openCreate}
              className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black font-black text-xs tracking-[0.15em] shadow-[0_0_20px_rgba(0,255,136,0.3)] mx-auto"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <Plus size={14} /> UPLOAD
            </motion.button>
          )}
        </div>

        {/* Slider */}
        {sliderImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative w-full overflow-hidden rounded-2xl border border-white/8 shadow-2xl mb-6 group"
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / sliderImages.length)}%)`,
                width: `${sliderImages.length * 100}%`,
              }}
            >
              {sliderImages.map((img, idx) => (
                <div key={img.id} className="relative flex-shrink-0"
                  style={{ width: `${100 / sliderImages.length}%` }}>
                  <img
                    src={img.url}
                    alt={img.caption || `Slide ${idx + 1}`}
                    className="w-full h-[220px] sm:h-[340px] md:h-[460px] object-cover"
                  />
                  {/* Admin: delete on slider image */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleTypeChange(img.id, "COLLAGE", "SLIDER")}
                        className="p-2 rounded-lg bg-black/60 border border-white/10 text-gray-400 hover:text-[#00CCFF] hover:border-[#00CCFF]/30 transition-all duration-200"
                        title="Move to Collage"
                      >
                        <Maximize2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(img.id, "SLIDER")}
                        className="p-2 rounded-lg bg-black/60 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all duration-200"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040d06]/60 via-transparent to-transparent pointer-events-none" />

            {/* Nav arrows */}
            <button onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/50 border border-white/10 text-white hover:bg-[#00FF88]/20 hover:border-[#00FF88]/30 hover:text-[#00FF88] transition-all opacity-0 group-hover:opacity-100">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/50 border border-white/10 text-white hover:bg-[#00FF88]/20 hover:border-[#00FF88]/30 hover:text-[#00FF88] transition-all opacity-0 group-hover:opacity-100">
              <ChevronRight size={20} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {sliderImages.map((_, i) => (
                <button key={i}
                  onClick={() => { setCurrentIndex(i); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
                  className={`rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 h-1.5 bg-[#00FF88]" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Collage grid */}
        {collageImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="columns-2 sm:columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
          >
            {collageImages.map((img) => (
              <motion.div
                key={img.id}
                className="relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] break-inside-avoid group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <img
                  src={img.url}
                  alt={img.caption || "Gallery image"}
                  className="w-full h-auto object-cover group-hover:brightness-110 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                {/* Admin: delete on collage image */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <button
                      onClick={() => handleTypeChange(img.id, "SLIDER", "COLLAGE")}
                      className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title="Move to Slider"
                    >
                      <Maximize2 size={12} />
                    </button>
                    <button
                      onClick={() => handleDelete(img.id, "COLLAGE")}
                      className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {!sliderImages.length && !collageImages.length && (
          <div className="py-24 text-center text-gray-500">No gallery images yet.</div>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <FormModal
            tab={galleryTab}
            record={editingRecord}
            onClose={() => setModalOpen(false)}
            onSuccess={handleModalSuccess}
          />
        )}
      </AnimatePresence>
    </section>
  );
}