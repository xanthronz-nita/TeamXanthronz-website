import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Maximize2,
} from "lucide-react";

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
      {
        name: "type",
        label: "Type",
        type: "select",
        options: ["SLIDER", "COLLAGE"],
        required: true,
      },
      {
        name: "caption",
        label: "Caption",
        type: "text",
      },
      {
        name: "image",
        label: "Image",
        type: "file",
        required: true,
      },
    ],
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const [sliderRes, collageRes] = await Promise.all([
          api.get("/gallery?type=SLIDER"),
          api.get("/gallery?type=COLLAGE"),
        ]);

        setSliderImages(sliderRes.data.data);
        setCollageImages(collageRes.data.data);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Auto advance slider
  useEffect(() => {
    if (paused || sliderImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % sliderImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [paused, sliderImages.length]);

  const openCreate = () => {
    setEditingRecord(null);
    setModalOpen(true);
  };

  const handleModalSuccess = (savedRecord, isEdit) => {
    if (isEdit) {
      setSliderImages((prev) =>
        prev.map((r) =>
          r.id === savedRecord.id ? savedRecord : r
        )
      );

      setCollageImages((prev) =>
        prev.map((r) =>
          r.id === savedRecord.id ? savedRecord : r
        )
      );
    } else {
      if (savedRecord.type === "SLIDER") {
        setSliderImages((prev) => [
          savedRecord,
          ...prev,
        ]);
      } else {
        setCollageImages((prev) => [
          savedRecord,
          ...prev,
        ]);
      }
    }

    setModalOpen(false);
  };

  const go = (dir) => {
    setPaused(true);

    setCurrentIndex(
      (p) =>
        (p + dir + sliderImages.length) %
        sliderImages.length
    );

    setTimeout(() => setPaused(false), 5000);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await api.delete(`/gallery/${id}`);

      if (type === "SLIDER") {
        setSliderImages((prev) =>
          prev.filter((img) => img.id !== id)
        );

        setCurrentIndex(0);
      } else {
        setCollageImages((prev) =>
          prev.filter((img) => img.id !== id)
        );
      }
    } catch (err) {
      console.error("Failed to delete image:", err);
      alert(err?.response?.data?.message || "Something went wrong.");
    }
  };

  const handleTypeChange = async (
    id,
    newType,
    oldType
  ) => {
    try {
      await api.put(`/gallery/${id}`, {
        type: newType,
      });

      if (oldType === "SLIDER") {
        setSliderImages((prev) =>
          prev.filter((img) => img.id !== id)
        );

        setCurrentIndex(0);
      } else {
        setCollageImages((prev) =>
          prev.filter((img) => img.id !== id)
        );
      }

      const res = await api.get(
        `/gallery?type=${newType}`
      );

      if (newType === "SLIDER") {
        setSliderImages(res.data.data);
      } else {
        setCollageImages(res.data.data);
      }
    } catch (err) {
      console.error(
        "Failed to change image type:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Something went wrong."
      );
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

      {/* ====================================================== */}
      {/* BACKGROUND */}
      {/* ====================================================== */}

      <video
        className="fixed inset-0 w-full h-full object-cover -z-20 opacity-55"
        src="/videos/215761_medium.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="fixed inset-0 -z-10 bg-[#040d06]/10" />

      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#00FF88]/4 blur-[130px] rounded-full" />


      <div className="relative z-10 max-w-7xl mx-auto">


        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div className="text-center mb-8 sm:mb-12">

          <motion.span
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold tracking-[0.2em] mb-4"
            style={{
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            GALLERY
          </motion.span>


          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.06,
            }}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight"
            style={{
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            Moments We{" "}
            <span className="bg-gradient-to-r from-[#00CCFF] to-[#00FF88] bg-clip-text text-transparent">
              Captured
            </span>
          </motion.h1>


          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.12,
            }}
            className="text-gray-400 text-sm sm:text-base mt-3"
          >
            A glimpse into our journey, our machines, and the people behind them.
          </motion.p>


          {/* Admin upload */}
          {isAdmin && (
            <motion.button
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={openCreate}
              className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black font-black text-xs tracking-[0.15em] shadow-[0_0_20px_rgba(0,255,136,0.3)] mx-auto"
              style={{
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              <Plus size={14} />
              UPLOAD
            </motion.button>
          )}

        </div>


        {/* ================================================== */}
        {/* FEATURED SLIDER */}
        {/* ================================================== */}

        {sliderImages.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="relative mb-8"
          >

            {/* Outer frame */}
            <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-md p-1.5 sm:p-2 shadow-2xl overflow-hidden">

              {/* Green top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-[#00FF88] to-[#00CCFF] z-30 rounded-full" />


              {/* Slider */}
              <div
                className="relative overflow-hidden rounded-xl sm:rounded-2xl group"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >

                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      currentIndex *
                      (100 / sliderImages.length)
                    }%)`,
                    width: `${sliderImages.length * 100}%`,
                  }}
                >

                  {sliderImages.map((img, idx) => (
                    <div
                      key={img.id}
                      className="relative flex-shrink-0"
                      style={{
                        width: `${100 / sliderImages.length}%`,
                      }}
                    >

                      <img
                        src={img.url}
                        alt={
                          img.caption ||
                          `Slide ${idx + 1}`
                        }
                        className="w-full h-[250px] sm:h-[380px] md:h-[500px] lg:h-[560px] object-cover"
                      />


                      {/* Image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040d06]/85 via-transparent to-black/10 pointer-events-none" />


                      {/* Caption */}
                      {img.caption && (
                        <div className="absolute left-5 sm:left-8 bottom-7 sm:bottom-10 max-w-xl">

                          <div className="w-8 h-[2px] bg-[#00FF88] mb-3" />

                          <p className="text-white text-sm sm:text-base md:text-lg font-semibold leading-relaxed drop-shadow-lg">
                            {img.caption}
                          </p>

                        </div>
                      )}


                      {/* Admin controls */}
                      {isAdmin && (
                        <div className="absolute top-4 right-4 flex gap-2 z-20">

                          <button
                            onClick={() =>
                              handleTypeChange(
                                img.id,
                                "COLLAGE",
                                "SLIDER"
                              )
                            }
                            className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-gray-400 hover:text-[#00CCFF] hover:border-[#00CCFF]/30 transition-all duration-200"
                            title="Move to Collage"
                          >
                            <Maximize2 size={14} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                img.id,
                                "SLIDER"
                              )
                            }
                            className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all duration-200"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>

                        </div>
                      )}

                    </div>
                  ))}

                </div>


                {/* Previous */}
                <button
                  onClick={() => go(-1)}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-[#00FF88]/15 hover:border-[#00FF88]/30 hover:text-[#00FF88] transition-all opacity-0 group-hover:opacity-100 z-20"
                >
                  <ChevronLeft size={20} />
                </button>


                {/* Next */}
                <button
                  onClick={() => go(1)}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-[#00FF88]/15 hover:border-[#00FF88]/30 hover:text-[#00FF88] transition-all opacity-0 group-hover:opacity-100 z-20"
                >
                  <ChevronRight size={20} />
                </button>


                {/* Slide counter */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/45 backdrop-blur-md border border-white/10 text-[10px] text-gray-300 tracking-widest z-20">
                  {String(currentIndex + 1).padStart(2, "0")}
                  {" / "}
                  {String(sliderImages.length).padStart(2, "0")}
                </div>


                {/* Indicators */}
                <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">

                  {sliderImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentIndex(i);
                        setPaused(true);

                        setTimeout(
                          () => setPaused(false),
                          5000
                        );
                      }}
                      className={`
                        transition-all
                        duration-300
                        rounded-full
                        ${
                          i === currentIndex
                            ? "w-7 h-1.5 bg-[#00FF88]"
                            : "w-1.5 h-1.5 bg-white/35 hover:bg-white/70"
                        }
                      `}
                    />
                  ))}

                </div>

              </div>
            </div>
          </motion.div>
        )}


        {/* ================================================== */}
        {/* COLLAGE */}
        {/* ================================================== */}

        {collageImages.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
            }}
          >

            {/* Section divider */}
            <div className="flex items-center gap-4 mb-5 sm:mb-7">

              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />

              <span
                className="text-[10px] text-gray-500 tracking-[0.2em]"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                THE JOURNEY
              </span>

              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />

            </div>


            {/* Masonry */}
            <div className="columns-2 sm:columns-2 lg:columns-3 gap-3 sm:gap-5">

              {collageImages.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.05 * index,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="relative mb-3 sm:mb-5 overflow-hidden rounded-xl sm:rounded-2xl border border-white/8 bg-white/[0.025] break-inside-avoid group cursor-pointer"
                >

                  {/* Image */}
                  <img
                    src={img.url}
                    alt={
                      img.caption ||
                      "Gallery image"
                    }
                    className="w-full h-auto object-cover group-hover:scale-[1.045] group-hover:brightness-110 transition-all duration-700"
                    loading="lazy"
                  />


                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040d06]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />


                  {/* Caption */}
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">

                      <div className="w-6 h-[2px] bg-[#00FF88] mb-2" />

                      <p className="text-xs text-white leading-relaxed">
                        {img.caption}
                      </p>

                    </div>
                  )}


                  {/* Admin controls */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-1.5 z-10">

                      <button
                        onClick={() =>
                          handleTypeChange(
                            img.id,
                            "SLIDER",
                            "COLLAGE"
                          )
                        }
                        className="p-2 rounded-lg bg-black/65 backdrop-blur-md border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        title="Move to Slider"
                      >
                        <Maximize2 size={12} />
                      </button>


                      <button
                        onClick={() =>
                          handleDelete(
                            img.id,
                            "COLLAGE"
                          )
                        }
                        className="p-2 rounded-lg bg-black/65 backdrop-blur-md border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>

                    </div>
                  )}

                </motion.div>
              ))}

            </div>

          </motion.div>
        )}


        {/* ================================================== */}
        {/* EMPTY STATE */}
        {/* ================================================== */}

        {!sliderImages.length &&
          !collageImages.length && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="relative py-24 text-center rounded-2xl border border-white/8 bg-white/[0.02]"
            >

              <div className="w-12 h-12 rounded-xl border border-[#00FF88]/15 bg-[#00FF88]/5 flex items-center justify-center mx-auto mb-4">
                <Plus
                  size={20}
                  className="text-[#00FF88]/50"
                />
              </div>

              <p className="text-gray-500 text-sm">
                No gallery images yet.
              </p>

            </motion.div>
          )}

      </div>


      {/* ================================================== */}
      {/* FORM MODAL */}
      {/* ================================================== */}

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
