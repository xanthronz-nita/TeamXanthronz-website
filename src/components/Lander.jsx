import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Lander() {
    const RotatingWords = () => {
        const words = ["DESIGN", "PROTOTYPE", "RACE"];
        const [index, setIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(
                () => setIndex((prev) => (prev + 1) % words.length),
                1500
            );
            return () => clearInterval(interval);
        }, []);

        return (
            <span className="relative inline-flex justify-center items-center font-mono overflow-hidden
            align-middle h-[1.5em]
            min-w-[6ch] sm:min-w-[7ch] md:min-w-[9ch] lg:min-w-[11ch]">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={words[index]}
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="absolute text-cyan-400 font-semibold text-center"
                    >
                        {words[index]}
                    </motion.span>
                </AnimatePresence>
            </span>
        );
    };

    return (
        <section className="relative flex justify-center items-center min-h-screen w-full
        overflow-hidden text-white px-4 sm:px-6">

            {/* Background */}
            <div className="absolute inset-0 bg-cyan-400/5" />

            {/* Foreground */}
            <motion.div
                className="relative z-10 flex flex-col justify-center items-center text-center
                origin-center scale-[0.9] sm:scale-[0.85] md:scale-[0.8] lg:scale-[0.75] xl:scale-[0.7]
                space-y-6 sm:space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Heading */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span className="inline-block bg-gradient-to-r from-[#00FF88] via-[#00CC66] to-[#00FFCC] bg-clip-text text-transparent">
                        DESIGNING,&nbsp;
                    </motion.span>

                    <motion.span className="inline-block bg-gradient-to-r from-[#66FF00] via-[#00FF88] to-[#00CC44] bg-clip-text text-transparent">
                        BUILDING&nbsp;
                    </motion.span>

                    <motion.span className="inline-block bg-gradient-to-r from-[#00FFAA] via-[#00FF66] to-[#00CC88] bg-clip-text text-transparent">
                        & RACING&nbsp;
                    </motion.span>

                    <motion.span className="inline-block bg-gradient-to-r from-[#00eeff] via-[#00c0fa] to-[#00FFCC] bg-clip-text text-transparent">
                        EVs
                    </motion.span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    className="text-base sm:text-lg md:text-2xl font-medium leading-relaxed
                    flex flex-wrap items-center justify-center text-center
                    bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    We <RotatingWords /> edge-cutting electric vehicles with passion and innovation.
                </motion.p>

                {/* Team Info */}
                <motion.div className="flex flex-col items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#00FF88]">
                        Powered By eBaja
                    </h2>

                    <h1 className="font-extrabold font-mono text-4xl sm:text-5xl
                    bg-gradient-to-r from-[#00eeff] via-[#40a7ff] to-[#00FFCC]
                    bg-clip-text text-transparent">
                        TEAM XANTRONZ
                    </h1>

                    <p className="tracking-[0.2em] text-sm sm:text-lg text-gray-200">
                        SINCE 2018 • NIT AGARTALA
                    </p>
                </motion.div>

                {/* Logo */}
                <motion.img
                    className="h-40 sm:h-56 md:h-72 lg:h-80 object-contain"
                    src="/logos/TEAM_logo.png"
                    alt="Team Logo"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Explore Button */}
                <motion.button
                    onClick={() => {
                        const section = document.getElementById("explore");
                        section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-4 px-4 py-2 rounded-full border border-[#00FF88]/20
                    bg-gradient-to-r from-[#003922]/20 to-[#002233]/20
                    text-sm font-medium text-[#00FF88]
                    hover:border-[#00FF88]/40 transition-all duration-300"
                    whileHover={{ y: -2 }}
                >
                    EXPLORE ↓
                </motion.button>
            </motion.div>
        </section>
    );
}
