import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Globe,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-black text-gray-300 font-mono py-10 px-4 sm:px-8 md:px-16 lg:px-20">
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        
        {/* ===== Left Column ===== */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <img
              src="/logos/TEAM_logo.png"
              alt="Xanthronz Logo"
              className="h-9 sm:h-10 w-auto"
            />
            <h2 className="text-xl sm:text-2xl font-bold text-green-400">
              Xanthronz
            </h2>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-gray-400 max-w-md mx-auto md:mx-0">
            A futuristic innovation team passionate about building intelligent and immersive experiences.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-5">
            <a href="#" className="hover:text-green-400 transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              <Globe size={18} />
            </a>
          </div>
        </div>

        {/* ===== Middle Column ===== */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-around gap-8 text-center sm:text-left">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-3">
              Navigation
            </h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-green-300">Home</a></li>
              <li><a href="#" className="hover:text-green-300">Projects</a></li>
              <li><a href="#" className="hover:text-green-300">Innovations</a></li>
              <li><a href="#" className="hover:text-green-300">Team</a></li>
              <li><a href="#" className="hover:text-green-300">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-green-300">Gallery</a></li>
              <li><a href="#" className="hover:text-green-300">Blog</a></li>
              <li><a href="#" className="hover:text-green-300">FAQ</a></li>
              <li><a href="#" className="hover:text-green-300">Developers</a></li>
              <li><a href="#" className="hover:text-green-300">Founders</a></li>
            </ul>
          </div>
        </div>

        {/* ===== Right Column ===== */}
        <div className="text-center md:text-left">
          <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-3">
            Contact Us
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex items-start justify-center md:justify-start gap-2">
              <MapPin className="text-green-400 mt-0.5" size={16} />
              <span>Xanthronz HQ, Innovation Hub, India</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="text-green-400" size={16} />
              <span>+91 9876543210</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="text-green-400" size={16} />
              <span>xanthronz.team@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="border-t border-gray-700 mt-10 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-400 max-w-7xl mx-auto">
        <p className="text-center md:text-left">
          © 2025 Xanthronz. All rights reserved.
        </p>

        <p className="flex items-center gap-1 text-center">
          Developed with <Heart className="text-green-400" size={14} /> by{" "}
          <span className="text-green-400 font-semibold">
            Xanthronz Tech Team
          </span>
        </p>
      </div>
    </footer>
  );
}
