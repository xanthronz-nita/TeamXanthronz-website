import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, CheckCircle } from "lucide-react";

// Sample events data (replace with real data or import)
const eventsData = {
  upcoming: [
    {
      id: 1,
      title: "AI Bootcamp 2026",
      date: "March 12, 2026",
      venue: "Main Auditorium",
      description: "A hands-on bootcamp covering AI, ML, and real-world projects.",
    },
    {
      id: 2,
      title: "Hackathon X",
      date: "April 5, 2026",
      venue: "Innovation Lab",
      description: "24-hour hackathon to build futuristic tech solutions.",
    },
  ],
  completed: [
    {
      id: 3,
      title: "Web Dev Workshop",
      date: "Jan 18, 2025",
      venue: "Seminar Hall B",
      description: "Workshop on modern React and frontend best practices.",
    },
    {
      id: 4,
      title: "Intro to Cybersecurity",
      date: "Oct 2, 2024",
      venue: "Online",
      description: "Basics of cybersecurity, ethical hacking, and defense.",
    },
  ],
};

export default function Event() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <section className="relative bg-black/90 text-gray-200 min-h-screen py-12 sm:py-16 text-sm overflow-hidden">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-20"
        src="/videos/61695-499594106.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="fixed bg-cyan-300/40 inset-0 w-full h-full -z-20" />

      {/* Heading */}
      <div className="text-center mb-10 sm:mb-12 px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-[orbitron] font-bold text-green-400 mb-3">
          Club Events
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm font-semibold">
          🚀 Explore our journey through events & innovations
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 text-xs sm:text-sm font-semibold px-4">
        {["upcoming", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-5 py-2 rounded-md border duration-300 ${
              activeTab === tab
                ? "bg-green-500 text-black border-green-400"
                : "border-green-400/40 text-green-400 hover:bg-green-600 hover:text-black"
            }`}
          >
            {tab === "upcoming" ? "Upcoming Events" : "Completed Events"}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-8 lg:px-12 justify-items-center">
        {eventsData[activeTab].map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.05, rotateY: 6 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-zinc-900/60 border border-green-400/30 backdrop-blur-md shadow-md
            rounded-2xl p-5 sm:p-6 w-full max-w-xs sm:max-w-sm hover:border-green-400/60"
          >
            <h3 className="text-green-400 text-base sm:text-lg font-semibold mb-2">
              {event.title}
            </h3>

            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Calendar size={14} /> {event.date}
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
              <MapPin size={14} /> {event.venue}
            </div>

            <p className="text-gray-300 text-sm mb-4">
              {event.description}
            </p>

            {activeTab === "completed" && (
              <div className="flex items-center gap-2 text-green-400 text-xs font-semibold">
                <CheckCircle size={14} /> Successfully Completed
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
