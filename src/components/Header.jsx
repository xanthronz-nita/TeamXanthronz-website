import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#001804] via-[#001a0b] to-[#000d05]
    sticky top-0 z-50 border-b border-[#00ff88]/20 backdrop-blur-md
    shadow-[0_0_8px_rgba(0,255,136,0.1)]">

      <div className="w-full h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <img
              src="/logos/TEAM_logo.png"
              alt="club logo"
              className="h-10 sm:h-12 lg:h-14 w-auto
              drop-shadow-[0_0_3px_rgba(0,255,136,0.3)]"
            />
          </Link>

          <h5 className="text-3xl sm:text-4xl font-[VT323] font-extrabold tracking-wide
          bg-gradient-to-r from-[#00ff88] to-[#0ba85a]
          bg-clip-text text-transparent
          drop-shadow-[0_0_5px_rgba(0,255,136,0.3)]">
            XANTHRONZ
          </h5>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center space-x-10">
          {[
            { to: "/", label: "Home" },
            { to: "/Squads", label: "Squads" },
            { to: "/events", label: "Events" },
            { to: "/gallery", label: "Gallery" },
            { to: "/contacts", label: "About Us" },
          ].map(({ to, label }) => (
            <li key={to} className="relative group">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  [
                    "relative font-semibold tracking-wide pb-1 transition-all duration-300 font-[Orbitron] text-lg",
                    isActive
                      ? "text-[#00FF88] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-[#00FF88] after:to-[#00FFCC] after:animate-[beam_2s_ease-in-out_infinite]"
                      : "text-[#B8C2C0] hover:text-[#00FF88] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 hover:after:left-0 hover:after:w-full after:bg-[#00FF88] after:transition-all after:duration-300",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          <button className="rounded-full border border-[#00FF88]/60 px-4 py-1.5
          text-[#00FF88] text-sm font-semibold transition-all duration-500
          hover:bg-[#00FF88]/20 hover:text-[#00FFCC]">
            LOGIN
          </button>

          <button className="rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88]
          px-4 py-1.5 text-black text-sm font-semibold transition-all duration-300
          hover:from-[#00FF88] hover:to-[#00FFCC]">
            SIGN UP
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-green-400 text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-black/95 border-t border-[#00ff88]/20 px-6 py-6 space-y-4">
          {[
            { to: "/", label: "Home" },
            { to: "/Squads", label: "Squads" },
            { to: "/events", label: "Events" },
            { to: "/gallery", label: "Gallery" },
            { to: "/contacts", label: "About Us" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="block text-lg font-[Orbitron] text-gray-300 hover:text-[#00FF88]"
            >
              {label}
            </NavLink>
          ))}

          <div className="flex gap-3 pt-4">
            <button className="flex-1 border border-[#00FF88]/60 px-4 py-2 text-[#00FF88] rounded-full">
              LOGIN
            </button>
            <button className="flex-1 bg-gradient-to-r from-[#00CC66] to-[#00FF88]
            text-black px-4 py-2 rounded-full">
              SIGN UP
            </button>
          </div>
        </div>
      )}

      {/* Beam Animation */}
      <style>
        {`
          @keyframes beam {
            0% { opacity: 0.6; transform: scaleX(0.4); }
            50% { opacity: 1; transform: scaleX(1); }
            100% { opacity: 0.6; transform: scaleX(0.4); }
          }
        `}
      </style>
    </nav>
  );
}
