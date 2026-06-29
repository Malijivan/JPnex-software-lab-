import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Award } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { ActiveView } from "../types";

interface NavbarProps {
  currentView: ActiveView;
  setView: (view: ActiveView) => void;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ currentView, setView, scrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for navbar opacity adjustment
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (view: ActiveView, sectionId?: string) => {
    setIsOpen(false);
    if (view === "main") {
      setView("main");
      if (sectionId) {
        // Wait minor tick for state to register
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 50);
      } else {
        setTimeout(() => {
          scrollToSection("home");
        }, 50);
      }
    } else {
      setView(view);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#0a0e14]/85 border-b border-gray-800/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl" 
          : "bg-transparent backdrop-blur-md"
      }`}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and brand name */}
          <div 
            id="logo-container"
            onClick={() => handleNavClick("main", "home")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <BrandLogo size={34} />
            <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-[#58a6ff] transition-colors">
              JPnex <span className="text-[#58a6ff]">Software Lab</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div id="desktop-menu" className="hidden md:flex items-center space-x-1">
            <button
              id="lnk-home"
              onClick={() => handleNavClick("main", "home")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === "main"
                  ? "text-white bg-white/5 font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </button>
            <button
              id="lnk-services"
              onClick={() => handleNavClick("main", "services")}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Services
            </button>
            <a
              id="lnk-portfolio"
              href="https://www.jivanmali.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Portfolio
            </a>
            <button
              id="lnk-about"
              onClick={() => handleNavClick("about")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === "about"
                  ? "text-[#58a6ff] bg-[#58a6ff]/10 font-semibold border-b-2 border-[#58a6ff] rounded-b-none"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              About Us
            </button>
            <button
              id="lnk-contact"
              onClick={() => handleNavClick("contact")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === "contact"
                  ? "text-[#58a6ff] bg-[#58a6ff]/10 font-semibold border-b-2 border-[#58a6ff] rounded-b-none"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#161b22] focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-[#0d1117] border-b border-gray-800/80 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <button
            id="mobile-lnk-home"
            onClick={() => handleNavClick("main", "home")}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-white hover:bg-[#161b22]"
          >
            Home
          </button>
          <button
            id="mobile-lnk-services"
            onClick={() => handleNavClick("main", "services")}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:bg-[#161b22]"
          >
            Services
          </button>
          <a
            id="mobile-lnk-portfolio"
            href="https://www.jivanmali.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:bg-[#161b22]"
          >
            Portfolio
          </a>
          <button
            id="mobile-lnk-about"
            onClick={() => handleNavClick("about")}
            className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentView === "about" ? "text-[#58a6ff] bg-[#58a6ff]/10 font-bold" : "text-gray-300 hover:bg-[#161b22]"
            }`}
          >
            About Us
          </button>
          <button
            id="mobile-lnk-contact"
            onClick={() => handleNavClick("contact")}
            className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentView === "contact" ? "text-[#58a6ff] bg-[#58a6ff]/10 font-bold" : "text-gray-300 hover:bg-[#161b22]"
            }`}
          >
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
}
