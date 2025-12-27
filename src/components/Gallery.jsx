import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gallery from "../data/gallery";

export default function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide every 3s (UNCHANGED)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % gallery.slider.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen w-full bg-black/60 text-green-400 font-mono
        px-4 sm:px-6 lg:px-10 py-16 sm:py-20 flex flex-col items-center overflow-hidden">

            {/* Background Video */}
            <video
                className="fixed inset-0 w-full h-full object-cover -z-20"
                src="/videos/215761_medium.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="fixed inset-0 w-full h-full bg-black/40 -z-20"></div>

            {/* =================== Animated Heading =================== */}
            <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-[orbitron] font-bold
                text-green-400 mb-10 sm:mb-12 text-center px-2"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
            >
                <span className="text-sky-500">Moments</span>{" "}
                we <span className="text-sky-500">captured</span>{" "}
                so far...
            </motion.h2>

            {/* =================== Auto-Sliding Carousel =================== */}
            <div className="relative w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl
            overflow-hidden rounded-2xl border border-green-400/20
            shadow-green-500/10 shadow-lg mb-14 sm:mb-16">

                <motion.div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        width: `${gallery.slider.length * 100}%`,
                    }}
                >
                    {gallery.slider.map((img, idx) => (
                        <div
                            key={idx}
                            className="w-full flex-shrink-0"
                        >
                            <img
                                src={img}
                                alt={`Slide ${idx}`}
                                className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px]
                                object-cover opacity-90 hover:opacity-100
                                transition-all duration-500"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* =================== Collage Grid =================== */}
            <div
                className="columns-2 sm:columns-3 md:columns-4 lg:columns-5
                gap-3 sm:gap-4 w-full max-w-6xl space-y-3 sm:space-y-4"
            >
                {gallery.collage.map((img, index) => (
                    <motion.div
                        key={index}
                        className="overflow-hidden rounded-xl
                        border border-green-400/10 bg-green-500/5
                        hover:shadow-[0_0_30px_8px_rgba(0,255,128,0.7)]
                        transition-shadow duration-500"
                        whileHover={{
                            scale: 1.2,
                            rotate: Math.random() * 2 - 1,
                            transition: { type: "spring", stiffness: 200 },
                        }}
                    >
                        <img
                            src={img}
                            alt={`Gallery ${index}`}
                            className="w-full h-auto object-cover
                            hover:brightness-110 transition-all duration-500"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
