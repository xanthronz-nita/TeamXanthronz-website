import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Trophy, Calendar, Image, Star, MessageSquare,
  Plus, Pencil, Trash2, X, Check, ChevronDown, Upload, Home
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance.js";
import { getErrorMessage } from "../utils/errorHandler.js";
import FormModal from "./FormModal.jsx";

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS = [
  {
    key: "squads",
    label: "Members",
    icon: Users,
    columns: ["name", "role", "department", "year"],
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "department", label: "Department", type: "text", required: true },
      { name: "year", label: "Year", type: "number", required: true },
      { name: "github", label: "GitHub URL", type: "text" },
      { name: "linkedin", label: "LinkedIn URL", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "skills", label: "Skills (comma separated)", type: "skills" },
      { name: "image", label: "Photo", type: "file" },
    ],
  },
  {
    key: "achievements",
    label: "Achievements",
    icon: Trophy,
    columns: ["title", "category", "year"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "year", label: "Year", type: "number", required: true },
      { name: "highlights", label: "Highlights (one per line)", type: "textarea" },
      { name: "rankSummary", label: "Rank Summary (JSON)", type: "json" },
      { name: "image", label: "Image", type: "file" },
    ],
  },
  {
    key: "events",
    label: "Events",
    icon: Calendar,
    columns: ["title", "venue", "status"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "venue", label: "Venue", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "status", label: "Status", type: "select", options: ["UPCOMING", "COMPLETED"], required: true },
      { name: "image", label: "Image", type: "file" },
    ],
  },
  {
    key: "gallery",
    label: "Gallery",
    icon: Image,
    columns: ["type", "caption"],
    fields: [
      { name: "type", label: "Type", type: "select", options: ["SLIDER", "COLLAGE"], required: true },
      { name: "caption", label: "Caption", type: "text" },
      { name: "image", label: "Image", type: "file", required: true },
    ],
  },
  {
    key: "sponsors",
    label: "Sponsors",
    icon: Star,
    columns: ["name", "order", "isActive"],
    fields: [
      { name: "name", label: "Sponsor Name", type: "text", required: true },
      { name: "websiteUrl", label: "Website URL", type: "text" },
      { name: "order", label: "Display Order", type: "number" },
      { name: "isActive", label: "Active", type: "select", options: ["true", "false"] },
      { name: "logo", label: "Logo", type: "file" },
    ],
  },
  {
    key: "requests",
    label: "Change Requests",
    icon: MessageSquare,
    // "requestedBy" is a special nested column — handled in cell renderer below
    columns: ["section", "requestedBy", "status", "description"],
    fields: [],
  },
  {
    key: "users",
    label: "Users",
    icon: Users,
    columns: ["name", "email", "role"],
    fields: [],
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, [activeTab]);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      let url;
      if (activeTab.key === "achievements") {
        url = "/achievements?page=1";
      } else if (activeTab.key === "users") {
        // fix: users endpoint is at /users not /
        url = "/users";
      } else if (activeTab.key === "requests") {
        url = "/requests";
      } else {
        url = `/${activeTab.key}`;
      }

      const res = await api.get(url);
      const data = activeTab.key === "achievements"
        ? res.data.data.achievements
        : res.data.data;
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch records:", getErrorMessage(err));
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreate = () => { setEditingRecord(null); setModalOpen(true); };
  const openEdit = (record) => { setEditingRecord(record); setModalOpen(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await api.delete(`/${activeTab.key}/${id}`);
      setRecords((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Failed to delete:", getErrorMessage(err));
      alert(getErrorMessage(err));
    }
  };

  const handleResolve = async (id, status) => {
    const adminNote = status === "REJECTED"
      ? window.prompt("Optional: add a note for rejection")
      : undefined;
    try {
      const res = await api.put(`/requests/${id}`, {
        status,
        ...(adminNote && { adminNote }),
      });
      setRecords((prev) => prev.map((r) => r.id === id ? res.data.data : r));
    } catch (err) {
      console.error("Failed to resolve request:", getErrorMessage(err));
      alert(getErrorMessage(err));
    }
  };

  const handleRoleUpdate = async (id, role) => {
    try {
      const res = await api.put(`/users/${id}/role`, { role });
      setRecords((prev) => prev.map((r) => r.id === id ? res.data.data : r));
    } catch (err) {
      console.error("Failed to update role:", getErrorMessage(err));
      alert(getErrorMessage(err));
    }
  };

  const handleGalleryTypeChange = async (id, newType) => {
    try {
      const res = await api.put(`/gallery/${id}`, { type: newType });
      setRecords((prev) => prev.map((r) => r.id === id ? res.data.data : r));
    } catch (err) {
      console.error("Failed to change gallery type:", getErrorMessage(err));
      alert(getErrorMessage(err));
    }
  };

  const handleModalSuccess = (savedRecord, isEdit) => {
    if (isEdit) {
      setRecords((prev) => prev.map((r) => r.id === savedRecord.id ? savedRecord : r));
    } else {
      setRecords((prev) => [savedRecord, ...prev]);
    }
    setModalOpen(false);
  };

  const canCreate = !["requests", "users"].includes(activeTab.key);
  const canEdit = !["requests", "users"].includes(activeTab.key);

  return (
    <section className="relative min-h-screen bg-[#040d06] text-white">
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[400px] bg-[#00FF88]/3 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#00CCFF]/3 blur-[130px] rounded-full" />

      {/* ── Fix 1: Top bar with home link ── */}
      <div className="relative z-10 border-b border-white/8 bg-[#040d06]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logos/TEAM_logo.png" alt="Xanthronz" className="h-8 w-auto" />
            <span className="text-lg font-extrabold bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent"
              style={{ fontFamily: "'VT323', monospace" }}>
              XANTHRONZ
            </span>
            <span className="text-gray-600 text-sm mx-1">/</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#00FF88]"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              ADMIN
            </span>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-400 text-xs font-bold tracking-widest hover:border-[#00FF88]/30 hover:text-[#00FF88] transition-all duration-300"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <Home size={13} /> HOME
          </Link>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#00FF88]"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              ADMIN PANEL
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Control Center
          </h1>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 flex-wrap mb-8 p-1 rounded-xl bg-white/[0.02] border border-white/8 w-fit">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.key}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold tracking-widest transition-all duration-300
                  ${activeTab.key === tab.key
                    ? "bg-[#00FF88] text-black shadow-[0_0_16px_rgba(0,255,136,0.3)]"
                    : "text-gray-400 hover:text-white"
                  }`}
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                <Icon size={13} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-white"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {activeTab.label}
            <span className="ml-3 text-sm font-normal text-gray-500">
              ({records.length})
            </span>
          </h2>
          {canCreate && (
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={openCreate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black font-black text-xs tracking-[0.15em] shadow-[0_0_20px_rgba(0,255,136,0.25)]"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <Plus size={14} /> ADD NEW
            </motion.button>
          )}
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 rounded-full border-2 border-[#00FF88]/20 border-t-[#00FF88] animate-spin" />
          </div>
        ) : records.length === 0 ? (
          <div className="py-24 text-center text-gray-500">No records found.</div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02]">
                  {activeTab.columns.map((col) => (
                    <th key={col}
                      className="px-5 py-3.5 text-left text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {col === "requestedBy" ? "Requested By" : col}
                    </th>
                  ))}
                  <th className="px-5 py-3.5 text-right text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, i) => (
                  <tr key={record.id}
                    className={`border-b border-white/5 transition-colors duration-200 hover:bg-white/[0.02]
                      ${i % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"}`}>

                    {activeTab.columns.map((col) => (
                      <td key={col} className="px-5 py-4 text-gray-300">
                        {/* ── Gallery image thumbnail ── */}
                        {activeTab.key === "gallery" && col === "type" ? (
                          <div className="flex items-center gap-3">
                            {record.url && (
                              <img
                                src={record.url}
                                alt={record.caption || "Gallery"}
                                className="w-12 h-12 rounded-lg object-cover border border-white/10"
                              />
                            )}
                            <StatusBadge value={record[col]} />
                          </div>
                        ) : (
                          <>
                            {/* ── Fix 3: nested requestedBy renderer ── */}
                            {col === "requestedBy" ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-white">
                              {record.user?.name ?? "—"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {record.user?.email ?? ""}
                            </span>
                          </div>
                        ) : col === "status" ? (
                          <StatusBadge value={record[col]} />
                        ) : col === "isActive" ? (
                          <span className={`text-xs font-bold ${record[col] ? "text-[#00FF88]" : "text-gray-500"}`}>
                            {record[col] ? "Active" : "Inactive"}
                          </span>
                        ) : col === "description" ? (
                          <span className="text-gray-400 text-xs line-clamp-1 max-w-xs block">
                            {record[col]}
                          </span>
                        ) : (
                          <span className="truncate max-w-[200px] block">
                            {record[col] ?? "—"}
                          </span>
                        )}
                          </>
                        )}
                      </td>
                    ))}

                    {/* Actions column */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">

                        {activeTab.key === "requests" && record.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleResolve(record.id, "APPROVED")}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/25 text-[#00FF88] text-xs font-bold hover:bg-[#00FF88]/20 transition-all">
                              <Check size={12} /> Approve
                            </button>
                            <button
                              onClick={() => handleResolve(record.id, "REJECTED")}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-400/10 border border-red-400/25 text-red-400 text-xs font-bold hover:bg-red-400/20 transition-all">
                              <X size={12} /> Reject
                            </button>
                          </>
                        )}

                        {activeTab.key === "users" && record.role !== "ADMIN" && (
                          <RoleDropdown
                            currentRole={record.role}
                            onChange={(role) => handleRoleUpdate(record.id, role)}
                          />
                        )}

                        {activeTab.key === "gallery" && (
                          <button
                            onClick={() => handleGalleryTypeChange(record.id, record.type === "SLIDER" ? "COLLAGE" : "SLIDER")}
                            className="px-3 py-1.5 rounded-lg bg-[#00CCFF]/10 border border-[#00CCFF]/25 text-[#00CCFF] text-xs font-bold hover:bg-[#00CCFF]/20 transition-all"
                          >
                            {record.type === "SLIDER" ? "Move to Collage" : "Move to Slider"}
                          </button>
                        )}

                        {canEdit && (
                          <button onClick={() => openEdit(record)}
                            className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all duration-200">
                            <Pencil size={13} />
                          </button>
                        )}

                        {activeTab.key !== "users" && (
                          <button onClick={() => handleDelete(record.id)}
                            className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all duration-200">
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <FormModal
            tab={activeTab}
            record={editingRecord}
            onClose={() => setModalOpen(false)}
            onSuccess={handleModalSuccess}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ value }) {
  const colors = {
    PENDING: "bg-yellow-400/10 text-yellow-400 border-yellow-400/25",
    APPROVED: "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/25",
    REJECTED: "bg-red-400/10 text-red-400 border-red-400/25",
    UPCOMING: "bg-[#00CCFF]/10 text-[#00CCFF] border-[#00CCFF]/25",
    COMPLETED: "bg-gray-500/10 text-gray-400 border-gray-500/25",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${colors[value] || "text-gray-400"}`}
      style={{ fontFamily: "'Orbitron', sans-serif" }}>
      {value}
    </span>
  );
}

// ─── Role dropdown ────────────────────────────────────────────────────────────

function RoleDropdown({ currentRole, onChange }) {
  return (
    <div className="relative">
      <select
        value={currentRole}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white/[0.03] border border-white/10 text-gray-300 text-xs font-bold rounded-lg px-3 py-1.5 pr-7 focus:outline-none focus:border-[#00FF88]/50 transition-all cursor-pointer"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        <option value="GUEST">GUEST</option>
        <option value="MEMBER">MEMBER</option>
      </select>
      <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
}

// ─── Form modal ───────────────────────────────────────────────────────────────
// Moved to separate FormModal component