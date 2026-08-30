import React from "react";
import { MapPin, Phone, Mail, Github, Linkedin, Instagram, Globe, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Squads", to: "/squads" },
  { label: "Events", to: "/events" },
  { label: "Evolve", to: "/evolve" },
  { label: "Gallery", to: "/gallery" },
  { label: "About Us", to: "/about" },
];

const SOCIAL = [
  { icon: Instagram, href: "https://www.instagram.com/team_xanthronz_ebaja?igsi=aWR1bWUzN2s2eHVu", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/team-xanthronz/", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Globe, href: "#", label: "Website" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#030b04]/60 border-t border-white/8 text-gray-400 overflow-hidden">

      {/* Top glow strip */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#00FF88]/30 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#00FF88]/3 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-4 sm:pb-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">

          {/* Brand col */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logos/TEAM_logo.png" alt="Xanthronz" className="h-10 w-auto" />
              <span className="text-xl font-extrabold bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent"
                style={{ fontFamily: "'VT323', monospace", fontSize: "1.6rem" }}>
                XANTHRONZ
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 mb-5 max-w-xs">
              E-Baja team from NIT Agartala — building electric ATVs and making Northeast India proud on the national stage.
            </p>
            <div className="flex gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/8 text-gray-500 hover:text-[#00FF88] hover:border-[#00FF88]/30 hover:bg-[#00FF88]/8 transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-[#00FF88] mb-4 uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}
                    className="text-sm text-gray-500 hover:text-[#00FF88] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-[#00FF88] mb-4 uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Resources
            </h3>
            <ul className="space-y-2.5">
              {["SAE E-BAJA", "NIT Agartala", "Blog", "FAQ", "Sponsors"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-[#00FF88] transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-[#00FF88] mb-4 uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={15} className="text-[#00FF88] shrink-0 mt-0.5" />
                <span className="text-gray-500">NIT Agartala, Tripura, India — 799046</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={15} className="text-[#00FF88] shrink-0" />
                <span className="text-gray-500">+91 95875 92397, +91 70752 39484</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={15} className="text-[#00FF88] shrink-0" />
                <a href="mailto:xanthronz.nita@gmail.com" className="text-gray-500 hover:text-[#00FF88] transition-colors">
                  xanthronz.nita@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© 2025 Team Xanthronz · NIT Agartala. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Developed with{" "}
            <Heart size={12} className="text-[#00FF88]" />{" "}
            by the{" "}
            <span className="text-[#00FF88] font-semibold">Xanthronz Tech Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
}