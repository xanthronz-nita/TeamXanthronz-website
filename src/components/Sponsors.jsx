import React from "react";
import { motion } from "framer-motion";

export default function Sponsors() {
  const logos = [
    "/images/logos/walmart.png",
    "/images/logos/google.png",
    "/images/logos/tesla.png",
    "/images/logos/meta.png",
    "/images/logos/microsoft.png",
    "/images/logos/amazon.png",
  ];

  return (
    <div className="w-full overflow-hidden bg-transparent
    py-4 sm:py-6 md:py-8">

      <motion.div
        className="flex items-center
        gap-8 sm:gap-12 md:gap-16 lg:gap-20"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
        }}
      >
        {/* duplicated array for seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`logo-${i}`}
            className="
              h-8 sm:h-10 md:h-12 lg:h-14
              w-auto object-contain
              opacity-80 hover:opacity-100
              transition duration-300
            "
          />
        ))}
      </motion.div>
    </div>
  );
}
