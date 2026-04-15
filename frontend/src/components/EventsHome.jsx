import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Sponsors from "./Sponsors.jsx";
import api from "../api/axiosInstance.js";
import { getErrorMessage } from "../utils/errorHandler.js";

export default function EventsHome() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events?status=UPCOMING");
        // sort by date ascending (soonest first) then take first 3
        const sorted = res.data.data
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        setEvents(sorted);
      } catch (err) {
        console.error("Failed to fetch events:", getErrorMessage(err));
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });

  return (
    <div className="w-full bg-[#040d06]/40 py-16 sm:py-24 overflow-hidden">

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#00FF88]/4 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            UPCOMING EVENTS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            What's{" "}
            <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
              Coming Up
            </span>
          </motion.h2>
        </div>

        {/* Cards — only renders if there are events */}
        {events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 mb-10 sm:mb-14">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#00FF88]/20 transition-all duration-400"
              >
                {/* Number */}
                <span className="text-5xl font-black text-white/5 leading-none"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  0{i + 1}
                </span>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00FF88] transition-colors duration-300">
                  {event.title}
                </h3>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <CalendarDays size={13} className="text-[#00FF88] shrink-0" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-400">
                    <MapPin size={13} className="text-[#00FF88] shrink-0 mt-0.5" />
                    {event.venue}
                  </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed flex-1">
                  {event.description}
                </p>

                <div className="pt-3 border-t border-white/5">
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00FF88] hover:gap-3 transition-all duration-200"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Learn More <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#00FF88]/30 text-[#00FF88] font-bold text-sm tracking-widest hover:bg-[#00FF88]/10 hover:border-[#00FF88]/60 transition-all duration-300"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              View All Events <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00FF88]/20 to-transparent mb-16 sm:mb-24" />

        {/* Sponsors */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            OUR PARTNERS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="text-2xl sm:text-3xl font-black text-white"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Trusted by{" "}
            <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </motion.h2>
        </div>
        <Sponsors />

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00FF88]/20 to-transparent mt-16 mb-16 sm:mt-24 sm:mb-24" />

        {/* Collab CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-white/[0.02] border border-white/8 rounded-2xl p-8 sm:p-12"
        >
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Let's{" "}
            <span className="text-[#00FF88]">Collaborate</span>
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Interested in sponsoring or partnering with Team Xanthronz? We'd love to hear from you.
          </p>
          <a
            href="mailto:xanthronz.team@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black font-black text-sm tracking-widest hover:opacity-90 shadow-[0_0_24px_rgba(0,255,136,0.25)] hover:shadow-[0_0_36px_rgba(0,255,136,0.4)] transition-all duration-300"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <Mail size={16} /> Reach Out
          </a>
        </motion.div>
      </div>
    </div>
  );
}