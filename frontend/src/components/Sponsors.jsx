import { useEffect, useState } from "react";
import api from "../api/axiosInstance.js";
import { getErrorMessage } from "../utils/errorHandler.js";

export default function Sponsors() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await api.get("/sponsors");
        setLogos(res.data.data);
      } catch (err) {
        console.error("Failed to fetch sponsors:", getErrorMessage(err));
      }
    };
    fetchSponsors();
  }, []);

  // need at least one sponsor to show marquee
  if (!logos.length) return null;

  // duplicate 3x for seamless infinite loop
  const all = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-4 relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#040d06] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#040d06] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-12 sm:gap-16 animate-marquee" style={{ width: "max-content" }}>
        {all.map((sponsor, i) => (
          <a
            key={i}
            href={sponsor.websiteUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            <img
              src={sponsor.logoUrl}
              alt={sponsor.name}
              className="h-8 sm:h-10 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity duration-300 grayscale hover:grayscale-0 select-none"
              draggable={false}
            />
          </a>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}