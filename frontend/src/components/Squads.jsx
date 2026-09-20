import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  X,
  Crown,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import api from "../api/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
import { getErrorMessage } from "../utils/errorHandler.js";
import FormModal from "./FormModal.jsx";

export default function Squads() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const squadsTab = {
    key: "squads",
    label: "Members",
    columns: ["name", "role", "department", "year"],
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      {
        name: "department",
        label: "Department",
        type: "text",
        required: true,
      },
      { name: "year", label: "Year", type: "number", required: true },
      { name: "github", label: "GitHub URL", type: "text" },
      { name: "linkedin", label: "LinkedIn URL", type: "text" },
      { name: "email", label: "Email", type: "email" },
      {
        name: "skills",
        label: "Skills (comma separated)",
        type: "skills",
      },
      { name: "image", label: "Photo", type: "file" },
    ],
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/squads");
        setMembers(res.data.data);
      } catch (err) {
        console.error(
          "Failed to fetch members:",
          getErrorMessage(err)
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Derive sorted unique years from loaded members
  const years = useMemo(() => {
    return [...new Set(members.map((m) => m.year))]
      .sort((a, b) => b - a)
      .map(String);
  }, [members]);

  // Set default selected year once data loads
  useEffect(() => {
    if (years.length && !selectedYear) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  // Filter members for selected year
  const currentTeam = members.filter(
    (m) => m.year === Number(selectedYear)
  );

  const leader = currentTeam.find(
    (m) => m.role === "CAPTAIN"
  );

  const others = currentTeam.filter(
    (m) => m.role !== "CAPTAIN"
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this member?")) return;

    try {
      await api.delete(`/squads/${id}`);

      setMembers((prev) =>
        prev.filter((m) => m.id !== id)
      );

      if (selectedMember?.id === id) {
        setSelectedMember(null);
      }
    } catch (err) {
      console.error(
        "Failed to delete member:",
        getErrorMessage(err)
      );

      alert(getErrorMessage(err));
    }
  };

  const openCreate = () => {
    setEditingRecord(null);
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditingRecord(record);
    setModalOpen(true);
  };

  const handleModalSuccess = (savedRecord, isEdit) => {
    if (isEdit) {
      setMembers((prev) =>
        prev.map((r) =>
          r.id === savedRecord.id ? savedRecord : r
        )
      );
    } else {
      setMembers((prev) => [
        savedRecord,
        ...prev,
      ]);
    }

    setModalOpen(false);
  };

  if (isLoading) {
    return (
      <section className="relative min-h-screen bg-[#040d06]/10 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#00FF88]/20 border-t-[#00FF88] animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-[#040d06]/10 text-white overflow-hidden">

      {/* Background video */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-20 opacity-55"
        src="/videos/215761_medium.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />

      {/* Background overlay */}
      <div className="fixed inset-0 -z-10 bg-[#040d06]/25" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#00FF88]/4 blur-[130px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">

        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <div className="text-center mb-10 sm:mb-14">

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            MEET THE TEAM
          </motion.span>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Team{" "}
              <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
                Xanthronz
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="text-gray-400 text-sm sm:text-base"
            >
              ⚡ Meet the brilliant minds behind the innovation 🧠
            </motion.p>
          </div>

          {/* Admin: add member */}
          {isAdmin && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={openCreate}
              className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black font-black text-xs tracking-[0.15em] shadow-[0_0_20px_rgba(0,255,136,0.3)] mx-auto"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <Plus size={14} />
              ADD
            </motion.button>
          )}
        </div>


        {/* ===================================================== */}
        {/* YEAR FILTER */}
        {/* ===================================================== */}

        <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-14">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`
                px-4 py-2
                rounded-xl
                text-xs
                font-bold
                tracking-widest
                transition-all
                duration-300
                ${
                  selectedYear === year
                    ? "bg-[#00FF88] text-black shadow-[0_0_16px_rgba(0,255,136,0.3)]"
                    : "border border-white/10 text-gray-400 hover:border-[#00FF88]/30 hover:text-[#00FF88]"
                }
              `}
              style={{
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              {year}
            </button>
          ))}
        </div>


        {/* ===================================================== */}
        {/* EMPTY STATE */}
        {/* ===================================================== */}

        {currentTeam.length === 0 && (
          <div className="py-24 text-center text-gray-500">
            No members found for this year.
          </div>
        )}


        {/* ===================================================== */}
        {/* CAPTAIN */}
        {/* ===================================================== */}

        {leader && (
          <div className="relative flex justify-center mb-12 sm:mb-16">

            {/* Connector */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 sm:h-10 bg-gradient-to-b from-[#FFD700]/30 to-transparent" />

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.45,
              }}
              className="relative"
            >

              {/* Captain badge */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-[10px] font-bold tracking-widest z-20 shadow-[0_0_18px_rgba(255,215,0,0.12)]"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                <Crown size={10} />
                CAPTAIN
              </div>

              <MemberCard
                member={leader}
                onClick={setSelectedMember}
                leader
                isAdmin={isAdmin}
                onDelete={handleDelete}
                onEdit={() => openEdit(leader)}
              />

            </motion.div>
          </div>
        )}


        {/* ===================================================== */}
        {/* MEMBERS GRID */}
        {/* ===================================================== */}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-4
              sm:gap-5
              lg:gap-6
              items-stretch
            "
          >
            {others.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: i * 0.045,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="min-w-0"
              >
                <MemberCard
                  member={member}
                  onClick={setSelectedMember}
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                  onEdit={() => openEdit(member)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>


      {/* ======================================================= */}
      {/* MEMBER MODAL */}
      {/* ======================================================= */}

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >

            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

            <motion.div
              className="relative bg-[#050f07] border border-[#00FF88]/20 rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto shadow-2xl text-center"
              initial={{
                scale: 0.88,
                opacity: 0,
                y: 32,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.88,
                opacity: 0,
                y: 32,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 24,
              }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* Close */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:text-[#00FF88] hover:bg-[#00FF88]/10 transition-all"
              >
                <X size={18} />
              </button>


              {/* Profile image */}
              <div className="relative inline-block mb-4">

                {selectedMember.imgUrl ? (
                  <img
                    src={selectedMember.imgUrl}
                    alt={selectedMember.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover mx-auto border-2 border-[#00FF88]/30"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/5 border-2 border-[#00FF88]/30 mx-auto flex items-center justify-center">
                    <span
                      className="text-3xl font-black text-[#00FF88]/30"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                      }}
                    >
                      {selectedMember.name[0]}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 rounded-2xl ring-1 ring-[#00FF88]/20 shadow-[0_0_20px_rgba(0,255,136,0.15)]" />
              </div>


              {/* Name */}
              <h3 className="text-xl font-black text-white mb-1">
                {selectedMember.name}
              </h3>

              {/* Role */}
              <p
                className="text-[#00FF88] text-sm font-semibold mb-1"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                {selectedMember.role}
              </p>

              {/* Department */}
              <p className="text-gray-400 text-xs mb-5">
                {selectedMember.department}
              </p>


              {/* Social links */}
              <div className="flex justify-center gap-3 mb-6">

                {selectedMember.github && (
                  <a
                    href={selectedMember.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all"
                  >
                    <Github size={16} />
                  </a>
                )}

                {selectedMember.email && (
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all"
                  >
                    <Mail size={16} />
                  </a>
                )}

                {selectedMember.linkedin && (
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all"
                  >
                    <Linkedin size={16} />
                  </a>
                )}

              </div>


              {/* Skills */}
              {selectedMember.skills?.length > 0 && (
                <div>

                  <p
                    className="text-[10px] font-bold tracking-[0.2em] text-[#00FF88]/60 mb-3 uppercase"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                    }}
                  >
                    Skills
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">

                    {selectedMember.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs bg-[#00FF88]/8 text-[#00FF88] border border-[#00FF88]/20 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}

                  </div>

                </div>
              )}

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>


      {/* ======================================================= */}
      {/* FORM MODAL */}
      {/* ======================================================= */}

      <AnimatePresence>
        {modalOpen && (
          <FormModal
            tab={squadsTab}
            record={editingRecord}
            onClose={() => setModalOpen(false)}
            onSuccess={handleModalSuccess}
          />
        )}
      </AnimatePresence>

    </section>
  );
}


/* ============================================================= */
/* MEMBER CARD */
/* ============================================================= */

function MemberCard({
  member,
  onClick,
  leader = false,
  isAdmin,
  onDelete,
  onEdit,
}) {
  return (
    <div className="relative group h-full">

      {/* Admin controls */}
      {isAdmin && (
        <div className="absolute top-2 left-2 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(member.id);
            }}
            className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all duration-200"
          >
            <Pencil size={11} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(member.id);
            }}
            className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all duration-200"
          >
            <Trash2 size={11} />
          </button>

        </div>
      )}


      {/* Card */}
      <motion.div
        whileHover={{
          y: -7,
          scale: 1.025,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 20,
        }}
        onClick={() => onClick(member)}
        className={`
          relative
          h-full
          cursor-pointer
          bg-white/[0.03]
          border
          border-white/8
          rounded-2xl
          overflow-hidden
          hover:border-[#00FF88]/25
          hover:bg-[#00FF88]/[0.045]
          transition-all
          duration-300
          shadow-lg
          shadow-black/10
          ${leader ? "w-56 sm:w-64" : "w-full"}
        `}
      >

        {/* Top accent */}
        <div
          className={`
            absolute
            top-0
            left-0
            right-0
            h-[2px]
            bg-gradient-to-r
            from-[#00FF88]
            to-[#00CCFF]
            transition-opacity
            duration-300
            ${
              leader
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }
          `}
        />


        {/* Image */}
        <div
          className={`
            relative
            overflow-hidden
            bg-black/10
            ${
              leader
                ? "h-60 sm:h-64"
                : "h-44 sm:h-48 lg:h-52"
            }
          `}
        >

          {member.imgUrl ? (
            <img
              src={member.imgUrl}
              alt={member.name}
              className="
                w-full
                h-full
                object-cover
                opacity-90
                group-hover:opacity-100
                group-hover:scale-[1.06]
                transition-all
                duration-700
                ease-out
              "
            />
          ) : (
            <div className="w-full h-full bg-white/[0.03] flex items-center justify-center">
              <span
                className="text-5xl font-black text-[#00FF88]/20"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                {member.name[0]}
              </span>
            </div>
          )}

          {/* Image fade */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#040d06] to-transparent pointer-events-none" />

          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00FF88]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        </div>


        {/* Information */}
        <div className="relative px-3.5 sm:px-4 py-4 text-center">

          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00FF88] transition-colors duration-300 truncate">
            {member.name}
          </h3>

          <p className="text-xs text-gray-400 mt-1 truncate">
            {member.role}
          </p>

          {member.department && (
            <p className="text-[10px] text-gray-600 mt-1 truncate">
              {member.department}
            </p>
          )}

        </div>


        {/* Bottom corner decoration */}
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-[#00FF88]/0 group-hover:border-[#00FF88]/15 transition-colors duration-500 rounded-br-2xl pointer-events-none" />

      </motion.div>

    </div>
  );
}
