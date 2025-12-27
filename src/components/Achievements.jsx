import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Book, Users, Video, Calendar } from "lucide-react";

const stats = [
  {
    icon: <Book size={40} />,
    number: 20,
    label: "AI Projects",
    desc: "Machine Learning Projects Completed",
  },
  {
    icon: <Users size={40} />,
    number: 50,
    label: "Active Members",
    desc: "Data Scientists and AI Enthusiasts",
  },
  {
    icon: <Video size={40} />,
    number: 10,
    label: "Workshops Conducted",
    desc: "Learning Sessions & Technical Talks",
  },
  {
    icon: <Calendar size={40} />,
    number: 8,
    label: "Events",
    desc: "Learning Sessions & Technical Talks",
  },
];

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 1200;
    const increment = end / (duration / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count}</span>;
};

export default function ScrollStepCards() {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e) => {
      const atTop = activeCard === 0 && e.deltaY < 0;
      const atBottom = activeCard === stats.length - 1 && e.deltaY > 0;
      if (atTop || atBottom) return;

      e.preventDefault();
      if (isAnimating.current) return;
      isAnimating.current = true;

      if (e.deltaY > 0) {
        setActiveCard((prev) => Math.min(prev + 1, stats.length - 1));
      } else {
        setActiveCard((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        isAnimating.current = false;
      }, 900);
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, [activeCard]);

  return (
    <section
      id="explore"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-cyan-400/5 via-black/40 to-black/70 text-white"
    >
      <div className="sticky top-0 min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden px-4 lg:px-16">
        
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Orbitron] font-semibold text-cyan-200 max-w-md mb-6">
            Milestones we achieved as a team.
          </h1>

          <button
            className="bg-slate-900/90 text-green-400 font-semibold font-mono
            px-6 sm:px-8 py-3 border border-cyan-500 text-lg sm:text-xl mt-4
            shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all
            hover:scale-105 hover:rounded-2xl hover:bg-green-500 hover:text-black duration-700"
          >
            See more →
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-full lg:w-2/3 h-[70vh] sm:h-[75vh] flex items-center justify-center overflow-hidden mt-12 lg:mt-0">
          {stats.map((stat, index) => {
            const isActive = index === activeCard;
            const isPrevious = index < activeCard;
            const isNext = index > activeCard;

            let animateProps = {};
            if (isActive) {
              animateProps = { x: 0, rotate: 0, opacity: 1, scale: 1 };
            } else if (isPrevious) {
              animateProps = { x: "-120%", rotate: -15, opacity: 0, scale: 0.9 };
            } else {
              animateProps = { x: "120%", rotate: 15, opacity: 0, scale: 0.9 };
            }

            return (
              <motion.div
                key={stat.label}
                animate={animateProps}
                transition={{ type: "spring", stiffness: 100, damping: 22 }}
                className="absolute w-[90%] sm:w-[80%] lg:w-3/4 h-[70%]
                bg-cyan-400/20 rounded-2xl backdrop-blur-md border border-cyan-300/30
                shadow-xl flex flex-col justify-center items-center text-center p-6 sm:p-8"
              >
                <div className="text-cyan-300 absolute top-4 left-4">
                  {stat.icon}
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  <Counter target={stat.number} />+
                </h2>

                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {stat.label}
                </h3>

                <p className="text-sm sm:text-base text-white/70 max-w-xs">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}

          {/* DOT NAVIGATION */}
          <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {stats.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCard(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeCard
                    ? "bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    : "bg-white/30 hover:bg-cyan-300/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
