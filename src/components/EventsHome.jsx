import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import Sponsors from "./Sponsors";

export default function EventsHome() {
    const events = [
        {
            id: 1,
            name: "TechNova Summit",
            date: "March 15, 2025",
            venue: "Walmart Innovation Hub, Bengaluru",
            description:
                "A convergence of technology enthusiasts showcasing innovative AI and retail solutions.",
        },
        {
            id: 2,
            name: "Green Future Expo",
            date: "July 10, 2025",
            venue: "EcoDome Convention Center, Mumbai",
            description:
                "A sustainability-driven event focusing on eco-tech, IoT, and carbon management systems.",
        },
        {
            id: 3,
            name: "Retail Intelligence Conference",
            date: "November 21, 2025",
            venue: "Hyatt Convention Hall, Hyderabad",
            description:
                "A premier event exploring AI, data analytics, and computer vision in modern retail.",
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                type: "spring",
                stiffness: 80,
            },
        }),
    };

    return (
        <div className="w-full min-h-screen bg-black/70 flex flex-col justify-center items-center py-16 sm:py-20 px-4">
            
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Orbitron] font-semibold mb-12 sm:mb-16 text-green-500 tracking-wide text-center">
                Upcoming Events
            </h1>

            {/* Events Cards */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 w-full max-w-7xl">
                {events.map((event, i) => (
                    <motion.div
                        key={event.id}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative w-full sm:w-[45%] lg:w-[30%]
                        min-h-[260px] rounded-2xl overflow-hidden shadow-xl
                        border border-green-200/50 bg-cyan-400/5
                        p-5 sm:p-6 flex flex-col justify-between"
                    >
                        {/* Event Title */}
                        <h2 className="text-lg sm:text-xl font-semibold text-white font-mono text-center mb-3">
                            {event.name}
                        </h2>

                        {/* Date & Venue */}
                        <div className="flex flex-col items-center gap-2 text-xs sm:text-sm text-green-300">
                            <div className="flex items-center gap-2">
                                <CalendarDays size={16} />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-center">
                                <MapPin size={16} />
                                <span>{event.venue}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-xs sm:text-sm text-center mt-4 leading-relaxed">
                            {event.description}
                        </p>

                        {/* Glow Stripe */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-500" />
                    </motion.div>
                ))}
            </div>

            {/* View All Button */}
            <button className="mt-12 sm:mt-16 border border-cyan-300/50 px-4 py-2 rounded-sm
            text-green-400 font-semibold font-mono bg-slate-800
            hover:rounded-2xl hover:bg-green-500 hover:text-black duration-700">
                View All Events →
            </button>

            {/* Sponsors */}
            <div className="w-full text-center mt-20 sm:mt-28">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Orbitron] font-semibold mb-12 sm:mb-16 text-green-500 tracking-wide">
                    Our Partners
                </h1>
                <Sponsors />
            </div>

            {/* Reach Out */}
            <div className="flex flex-col items-center justify-center text-center mt-16 pb-5">
                <h3 className="text-lg sm:text-xl text-green-400 font-mono mb-6">
                    Reach out to us for collaborations.
                </h3>

                <button className="flex items-center justify-center gap-2
                border border-cyan-300/50 px-5 py-2 rounded-sm
                text-green-400 font-semibold font-mono bg-cyan-900
                hover:rounded-2xl hover:bg-green-500 hover:text-black duration-700">
                    <span>Reach out</span>
                    <img
                        className="h-5 invert brightness-0"
                        src="/images/image.png"
                        alt="mail"
                    />
                </button>
            </div>
        </div>
    );
}
