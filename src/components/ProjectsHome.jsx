import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ProjectsHome() {
  const projects = [
    {
      id: 1,
      name: "HoloCart",
      year: "2024",
      thumbnail: "/images/holocart-thumb.jpg",
      description:
        "An AI-driven collaborative shopping cart for smarter in-store experiences.",
      github: "https://github.com/example/holocart",
    },
    {
      id: 2,
      name: "EcoTrack",
      year: "2023",
      thumbnail: "/images/ecotrack-thumb.jpg",
      description:
        "IoT-based sustainability tracker for carbon footprint management.",
      github: "https://github.com/example/ecotrack",
    },
    {
      id: 3,
      name: "RetailVision",
      year: "2025",
      thumbnail: "/images/retailvision-thumb.jpg",
      description:
        "Computer vision powered shelf analytics for retail optimization.",
      github: "https://github.com/example/retailvision",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 80,
      },
    }),
  };

  return (
    <section className="w-full min-h-screen bg-black/70 flex flex-col items-center
    py-16 sm:py-20 px-4">

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Orbitron]
      font-semibold mb-12 sm:mb-16 text-green-500 tracking-wide text-center">
        Projects and Innovations
      </h1>

      {/* Projects Grid */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center
      gap-6 sm:gap-8 lg:gap-10 w-full max-w-7xl">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1 }}
            className="relative w-full sm:w-[45%] lg:w-[30%]
            h-[220px] sm:h-[260px] lg:h-[300px]
            rounded-2xl overflow-hidden shadow-xl
            border border-green-200/50 bg-cyan-400/5
            group cursor-pointer"
          >
            {/* Thumbnail */}
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-full object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100
            transition-all duration-500 flex flex-col justify-center items-center
            text-center p-4 bg-black/40">
              <p className="text-xs sm:text-sm text-white mb-4">
                {project.description}
              </p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white hover:text-green-300 transition"
              >
                <ExternalLink size={18} />
                <span className="text-sm">GitHub</span>
              </a>
            </div>

            {/* Year */}
            <div className="absolute top-3 right-3 bg-green-500/70
            text-white text-xs px-3 py-1 rounded-full">
              {project.year}
            </div>

            {/* Name */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2
            text-white text-base sm:text-lg font-medium font-mono
            px-3 py-1 rounded-lg">
              {project.name}
            </div>

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r
            from-transparent via-cyan-400/20 to-transparent
            opacity-0 group-hover:opacity-100 transition duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <button className="mt-12 sm:mt-16 border border-cyan-300/50 px-4 py-2
      rounded-sm text-green-400 font-semibold font-mono bg-slate-800
      hover:rounded-2xl hover:bg-green-500 hover:text-black duration-700">
        All Projects →
      </button>
    </section>
  );
}
