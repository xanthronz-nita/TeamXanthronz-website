import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import api from "../api/axiosInstance.js";
import { getErrorMessage } from "../utils/errorHandler.js";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await api.get("/achievements?page=1");
        setAchievements(res.data.data.achievements);
      } catch (err) {
        console.error("Failed to fetch achievements:", getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (isLoading) {
    return (
      <section className="relative bg-[#040d06]/30 py-16 sm:py-24 flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-[#00FF88]/20 border-t-[#00FF88] animate-spin" />
      </section>
    );
  }

  if (!achievements.length) {
    return (
      <section className="relative bg-[#040d06]/30 py-16 sm:py-24 flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 text-sm">No achievements yet.</p>
      </section>
    );
  }

  // Flatten all highlights sorted oldest to newest year
  const allBullets = [...achievements]
    .sort((a, b) => a.year - b.year)
    .flatMap((a) => a.highlights);

  return (
    <section id="explore" className="relative bg-[#040d06]/30 py-16 sm:py-24 overflow-hidden">

      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00CCFF]/4 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-0 left-0 w-[300px] h-[300px] bg-[#00FF88]/3 blur-[100px] rounded-full" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF88]/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="flex items-center gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={14} className="text-[#00FF88]" />
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#00FF88]"
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                MILESTONES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Achievements as a{" "}
              <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
                Team
              </span>
            </h2>
          </div>
        </div>

        <ul className="space-y-4">
          {allBullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
              <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
              {bullet}
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
