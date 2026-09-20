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

      {/* Sponsor Showcase Box */}
      <div className="relative w-full rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-md overflow-hidden">

        {/* Top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-[#00FF88] to-[#00CCFF] rounded-full z-10" />

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#00CCFF]/30 to-transparent" />

        {/* Corner details */}
        <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-[#00FF88]/15 pointer-events-none" />

        <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-[#00FF88]/15 pointer-events-none" />

        <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-[#00CCFF]/15 pointer-events-none" />

        <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-[#00CCFF]/15 pointer-events-none" />


        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#040d06] via-[#040d06]/80 to-transparent z-10 pointer-events-none" />

        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#040d06] via-[#040d06]/80 to-transparent z-10 pointer-events-none" />


        {/* Logo Track */}
        <div className="py-5 sm:py-7">

          <div
            className="flex items-center gap-12 sm:gap-16 animate-marquee"
            style={{ width: "max-content" }}
          >

            {all.map((sponsor, i) => (
              <a
                key={`${sponsor.name}-${i}`}
                href={sponsor.websiteUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="sponsor-item shrink-0"
              >

                {/* Individual Logo Box */}
                <div
                  className="
                    group
                    relative
                    flex items-center justify-center
                    min-w-[130px] sm:min-w-[155px]
                    h-[70px] sm:h-[80px]
                    px-5 sm:px-7
                    rounded-xl
                    border border-white/[0.05]
                    bg-white/[0.02]
                    transition-all duration-300 ease-out
                    hover:border-[#00FF88]/20
                    hover:bg-white/[0.04]
                  "
                >

                  {/* Hover glow */}
                  <div
                    className="
                      absolute inset-0
                      rounded-xl
                      bg-[#00FF88]/5
                      opacity-0
                      blur-lg
                      transition-opacity duration-300
                      group-hover:opacity-100
                    "
                  />

                  <img
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    className="
                      relative z-10
                      h-9 sm:h-11
                      max-w-[115px] sm:max-w-[140px]
                      w-auto
                      object-contain
                      select-none
                      transition-transform duration-300 ease-out
                      group-hover:scale-110
                    "
                    draggable={false}
                  />

                </div>

              </a>
            ))}

          </div>

        </div>

      </div>


      {/* Animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
          will-change: transform;
        }

        /* Pause when hovering over the logo showcase */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </div>
  );
}
