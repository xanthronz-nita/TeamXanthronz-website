import React, { useState } from "react";
import { data } from "../data/data_transformed";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, X } from "lucide-react";

export default function Squads() {
    const years = Object.keys(data).sort((a, b) => b - a);
    const [selectedYear, setSelectedYear] = useState("2026");
    const [selectedMember, setSelectedMember] = useState(null);

    const currentTeam = data[selectedYear] || [];
    const leader = currentTeam.find((m) => m.role === "CAPTAIN");
    const others = currentTeam.filter((m) => m.role !== "CAPTAIN");

    return (
        <section className="relative bg-black/90 text-gray-200 min-h-screen
        py-12 sm:py-16 text-sm px-4">

            {/* Background */}
            <video
                className="fixed inset-0 w-full h-full object-cover -z-20"
                src="/videos/61695-499594106.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="fixed bg-cyan-300/40 inset-0 -z-20"></div>

            {/* Heading */}
            <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl
                font-[orbitron] font-bold text-green-400 mb-3">
                    Team Xanthronz
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm font-semibold">
                    ⚡ Meet the brilliant minds behind the innovation 🧠
                </p>
            </div>

            {/* Year Filters */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4
            text-xs sm:text-sm font-semibold mb-10 sm:mb-12">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-4 py-2 rounded-md border duration-300 ${
                            selectedYear === year
                                ? "bg-green-500 text-black border-green-400 hover:scale-95"
                                : "border-green-400/40 text-green-400 hover:bg-green-600 hover:text-black"
                        }`}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {/* Leader */}
            {leader && (
                <div className="flex justify-center mb-10 sm:mb-12">
                    <motion.div
                        whileHover={{ rotateY: 10, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 120 }}
                        className="bg-zinc-900/60 border border-green-400/30
                        backdrop-blur-md shadow-md rounded-xl overflow-hidden
                        hover:border-green-400/60 cursor-pointer
                        w-full max-w-xs"
                        onClick={() => setSelectedMember(leader)}
                    >
                        <div className="h-52 w-full overflow-hidden">
                            <img
                                src={leader.img}
                                alt={leader.name}
                                className="w-full h-full object-cover hover:scale-110 duration-700"
                            />
                        </div>

                        <div className="p-4 text-center">
                            <h3 className="text-green-400 text-lg font-semibold">
                                {leader.name}
                            </h3>
                            <p className="text-sm text-gray-300">{leader.role}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                {leader.department}
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Other Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 xl:grid-cols-5
            gap-6 sm:gap-8 lg:gap-10
            max-w-7xl mx-auto">
                {others.map((member) => (
                    <motion.div
                        key={member.name}
                        whileHover={{ rotateY: 10, scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 120 }}
                        className="bg-zinc-900/60 border border-green-400/20
                        backdrop-blur-md shadow-md rounded-xl overflow-hidden
                        hover:border-green-400/50 pt-5 cursor-pointer
                        w-full max-w-xs mx-auto"
                        onClick={() => setSelectedMember(member)}
                    >
                        <div className="h-48 w-full overflow-hidden">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-full h-full object-cover hover:scale-110 duration-700"
                            />
                        </div>

                        <div className="p-4 text-center">
                            <h3 className="text-green-400 text-lg font-semibold">
                                {member.name}
                            </h3>
                            <p className="text-sm text-gray-300">{member.role}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                {member.department}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center
                        bg-black/60 backdrop-blur-sm z-50 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMember(null)}
                    >
                        <motion.div
                            className="bg-zinc-900 border border-green-400/30
                            rounded-3xl p-6 sm:p-8
                            w-full max-w-lg md:max-w-2xl
                            relative text-center shadow-2xl"
                            initial={{ scale: 0.8, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 40 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-3 right-3 text-green-400 hover:text-green-300"
                                onClick={() => setSelectedMember(null)}
                            >
                                <X size={20} />
                            </button>

                            <img
                                src={selectedMember.img}
                                alt={selectedMember.name}
                                className="w-28 h-28 sm:w-32 sm:h-32
                                rounded-full object-cover mx-auto
                                border-2 border-green-400 mb-4"
                            />

                            <h3 className="text-green-400 text-lg sm:text-xl font-semibold mb-1">
                                {selectedMember.name}
                            </h3>
                            <p className="text-gray-300">{selectedMember.role}</p>
                            <p className="text-xs sm:text-sm text-gray-400">
                                {selectedMember.department}
                            </p>

                            <div className="flex justify-center gap-4 mt-4 text-green-400">
                                <a href={selectedMember.github} target="_blank" rel="noreferrer">
                                    <Github size={20} className="hover:text-green-300" />
                                </a>
                                <a href={`mailto:${selectedMember.email}`}>
                                    <Mail size={20} className="hover:text-green-300" />
                                </a>
                                <a href={selectedMember.linkedin} target="_blank" rel="noreferrer">
                                    <Linkedin size={20} className="hover:text-green-300" />
                                </a>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-sm text-green-400 mb-2">Skills:</h4>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {(selectedMember.skills || []).map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 bg-green-400/10
                                            text-green-300 border border-green-400/20
                                            rounded-md text-xs"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
