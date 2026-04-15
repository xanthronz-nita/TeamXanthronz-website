import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Image, Info, ChevronRight, Zap, LogOut, Shield, MessageSquarePlus } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import RequestChangeModal from "./RequestChangeModal.jsx";
import api from "../api/axiosInstance.js";
import { getErrorMessage } from "../utils/errorHandler.js";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/squads", label: "Squads" },
  { to: "/events", label: "Events" },
  { to: "/evolve", label: "Evolve" },
];

const DRAWER_LINKS = [
  { to: "/gallery", label: "Gallery", icon: Image },
  { to: "/about", label: "About Us", icon: Info },
  { to: "/achievements", label: "Achievements", icon: Zap },
];

export default function Header() {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  const isAdmin = user?.role === "ADMIN";
  const isMember = user?.role === "MEMBER";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setDrawerOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Fetch pending requests count for admin
  useEffect(() => {
    if (isAdmin) {
      const fetchPendingRequests = async () => {
        try {
          const res = await api.get("/requests");
          const pendingCount = res.data.data.filter((req) => req.status === "PENDING").length;
          setPendingRequestsCount(pendingCount);
        } catch (err) {
          console.error("Failed to fetch requests:", getErrorMessage(err));
        }
      };
      fetchPendingRequests();
    }
  }, [isAdmin]);

  const handleLogout = async () => {
    await logout();
    setDrawerOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#020c05]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,255,136,0.12),0_8px_32px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
            <div className="relative">
              <img src="/logos/TEAM_logo.png" alt="Xanthronz"
                className="h-9 sm:h-12 w-auto drop-shadow-[0_0_6px_rgba(0,255,136,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(0,255,136,0.6)] transition-all duration-300" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent"
              style={{ fontFamily: "'VT323', monospace" }}>
              XANTHRONZ
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === "/"}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-semibold tracking-widest transition-all duration-300 rounded-md inline-block
                    ${isActive ? "text-[#00FF88]" : "text-[#8fa89a] hover:text-[#00FF88]"}`
                  }
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/about"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest rounded-full border border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88]/10 hover:border-[#00FF88]/60 transition-all duration-300"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              About
            </Link>

            <button
              aria-label="Toggle menu"
              onClick={() => setDrawerOpen((v) => !v)}
              className="relative p-2 rounded-lg text-[#00FF88] hover:bg-[#00FF88]/10 transition-all duration-300 border border-transparent hover:border-[#00FF88]/20"
            >
              <span className={`block transition-all duration-300 ${drawerOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}>
                <Menu size={22} />
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${drawerOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}>
                <X size={22} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── DRAWER ── */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-400 ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Panel */}
        <aside className={`absolute right-0 top-0 h-full w-[85vw] max-w-xs sm:max-w-sm
          bg-[#050f07] border-l border-[#00FF88]/15
          flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.8)]
          transition-transform duration-400 ease-out
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>

          {/* Drawer header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#00FF88]/10">
            <div className="flex items-center gap-3">
              <img src="/logos/TEAM_logo.png" alt="logo" className="h-8 w-8" />
              <span className="text-[#00FF88] font-bold text-sm tracking-widest"
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                XANTHRONZ
              </span>
            </div>
            <button onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-lg text-[#00FF88]/60 hover:text-[#00FF88] hover:bg-[#00FF88]/10 transition-all">
              <X size={18} />
            </button>
          </div>

          {/* Drawer body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">

            {/* User info — shown when logged in */}
            {!isLoading && user && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#00FF88]/5 border border-[#00FF88]/15 mb-6">
                <div className="w-9 h-9 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 flex items-center justify-center shrink-0">
                  <span className="text-sm font-black text-[#00FF88]"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {user.name[0].toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-[#00FF88]/60 font-bold tracking-widest"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {user.role}
                  </p>
                </div>
              </div>
            )}

            {/* Main nav */}
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#00FF88]/40 mb-3 uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Navigation
            </p>
            <nav className="flex flex-col gap-1 mb-8">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink key={to} to={to} end={to === "/"}
                  onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200
                    ${isActive
                      ? "bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20"
                      : "text-[#8fa89a] hover:bg-[#ffffff]/5 hover:text-white"
                    }`
                  }
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {label}
                  <ChevronRight size={14} className="opacity-40" />
                </NavLink>
              ))}
            </nav>

            {/* Extra links */}
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#00FF88]/40 mb-3 uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              More
            </p>
            <nav className="flex flex-col gap-1 mb-6">
              {DRAWER_LINKS.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#8fa89a] hover:bg-[#ffffff]/5 hover:text-white transition-all duration-200">
                  <div className="p-1.5 rounded-lg bg-[#00FF88]/8 text-[#00FF88]">
                    <Icon size={14} />
                  </div>
                  {label}
                </Link>
              ))}

              {/* Admin panel link */}
              {isAdmin && (
                <Link to="/admin" onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#00FF88] hover:bg-[#00FF88]/8 transition-all duration-200 border border-[#00FF88]/15 mt-1 relative">
                  <div className="p-1.5 rounded-lg bg-[#00FF88]/8 text-[#00FF88]">
                    <Shield size={14} />
                  </div>
                  <span>Admin Panel</span>
                  {pendingRequestsCount > 0 && (
                    <div className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-[#00CCFF] text-black text-xs font-bold">
                      {pendingRequestsCount}
                    </div>
                  )}
                </Link>
              )}

              {/* Request a change — MEMBER only */}
              {isMember && (
                <button
                  onClick={() => { setRequestModalOpen(true); setDrawerOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#00CCFF] hover:bg-[#00CCFF]/8 transition-all duration-200 border border-[#00CCFF]/15 mt-1 w-full text-left"
                >
                  <div className="p-1.5 rounded-lg bg-[#00CCFF]/8 text-[#00CCFF]">
                    <MessageSquarePlus size={14} />
                  </div>
                  Request a Change
                </button>
              )}
            </nav>
          </div>

          {/* Drawer footer */}
          <div className="p-5 sm:p-6 border-t border-[#00FF88]/10 flex flex-col gap-3">

            {/* Logged in — show logout */}
            {!isLoading && user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-400/20 text-red-400 text-sm font-bold tracking-widest hover:bg-red-400/8 transition-all"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <LogOut size={15} /> LOGOUT
              </button>
            ) : (
              // Logged out — show login + register
              <>
                <Link to="/login" onClick={() => setDrawerOpen(false)}
                  className="w-full text-center py-3 rounded-xl border border-[#00FF88]/30 text-[#00FF88] text-sm font-bold tracking-widest hover:bg-[#00FF88]/8 transition-all"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  LOGIN
                </Link>
                <Link to="/register" onClick={() => setDrawerOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#00CC66] to-[#00FF88] text-black text-sm font-black tracking-widest hover:opacity-90 transition-all"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  REGISTER
                </Link>
              </>
            )}

            {/* Join us prompt — always visible */}
            <div className="mt-1 flex flex-col items-center gap-2 pt-3 border-t border-white/5">
              <p className="text-[10px] text-gray-500 text-center">
                Want to be a core team member?
              </p>
              <Link to="/evolve" onClick={() => setDrawerOpen(false)}
                className="text-xs font-bold text-[#00CCFF] hover:text-[#00FF88] transition-colors duration-300 tracking-widest"
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                JOIN US →
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Request Change Modal */}
      <RequestChangeModal isOpen={requestModalOpen} onClose={() => setRequestModalOpen(false)} />
    </>
  );
}