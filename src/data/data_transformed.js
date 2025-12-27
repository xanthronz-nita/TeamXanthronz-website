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
    <section className="relative min-h-screen bg-black/90 text-gray-200 py-12 sm:py-16 px-4">

      {/* Background */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-20"
        src="/videos/61695-499594106.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="fixed inset-0 bg-cyan-300/40 -z-20" />

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-[orbitron] font-bold text-green-400 mb-2">
          Team Xanthronz
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-semibold">
          ⚡ Meet the brilliant minds behind the innovation
        </p>
      </div>

      {/* Year Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 text-xs sm:text-sm rounded-md border transition ${
              selectedYear === year
                ? "bg-green-500 text-black border-green-400"
                : "border-green-400/40 text-green-400 hover:bg-green-600 hover:text-black"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Captain */}
      {leader && (
        <div className="flex justify-center mb-12">
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 10 }}
            transition={{ type: "spring", stiffness: 120 }}
            onClick={() => setSelectedMember(leader)}
            className="w-full max-w-xs bg-zinc-900/60 border border-green-400/30
            rounded-xl overflow-hidden cursor-pointer backdrop-blur-md"
          >
            <div className="h-52">
              <img
                src={leader.photo || "/images/placeholder.jpg"}
                alt={leader.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-green-400 font-semibold text-lg">{leader.name}</h3>
              <p className="text-sm text-gray-300">{leader.role}</p>
              <p className="text-xs text-gray-400">{leader.department}</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
      lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {others.map((member) => (
          <motion.div
            key={member.name}
            whileHover={{ scale: 1.03, rotateY: 8 }}
            transition={{ type: "spring", stiffness: 120 }}
            onClick={() => setSelectedMember(member)}
            className="w-full max-w-xs mx-auto bg-zinc-900/60 border
            border-green-400/20 rounded-xl overflow-hidden cursor-pointer"
          >
            <div className="h-48">
              <img
                src={member.photo || "/images/placeholder.jpg"}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-green-400 font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-300">{member.role || "Member"}</p>
              <p className="text-xs text-gray-400">{member.department}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50
            flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="relative w-full max-w-lg bg-zinc-900
              border border-green-400/30 rounded-3xl p-6 sm:p-8 text-center"
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-green-400"
                onClick={() => setSelectedMember(null)}
              >
                <X size={20} />
              </button>

              <img
                src={selectedMember.photo || "/images/placeholder.jpg"}
                alt={selectedMember.name}
                className="w-28 h-28 rounded-full object-cover mx-auto border-2 border-green-400 mb-4"
              />

              <h3 className="text-green-400 text-lg font-semibold">
                {selectedMember.name}
              </h3>
              <p className="text-gray-300">{selectedMember.role}</p>
              <p className="text-xs text-gray-400">{selectedMember.department}</p>

              <div className="flex justify-center gap-4 mt-4 text-green-400">
                <a href={selectedMember.github} target="_blank" rel="noreferrer">
                  <Github size={20} />
                </a>
                <a href={`mailto:${selectedMember.email}`}>
                  <Mail size={20} />
                </a>
                <a href={selectedMember.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
