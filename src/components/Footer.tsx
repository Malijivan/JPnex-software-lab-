import { Mail, Phone, MapPin, ArrowUpCircle } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { ActiveView } from "../types";

interface FooterProps {
  setView: (view: ActiveView) => void;
  scrollToSection: (id: string) => void;
}

export default function Footer({ setView, scrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (view: ActiveView, sectionId?: string) => {
    if (view === "main") {
      setView("main");
      if (sectionId) {
        setTimeout(() => scrollToSection(sectionId), 100);
      }
    } else {
      setView(view);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="global-footer" className="relative mt-auto border-t border-gray-800/80 bg-[#080c10] overflow-hidden">
      {/* Decorative accent glow underlay */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#58a6ff] to-transparent filter blur-md opacity-70"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleLinkClick("main", "home")}>
              <BrandLogo size={28} />
              <span className="font-display text-lg font-bold tracking-tight text-white">
                JPnex <span className="text-[#58a6ff]">Software Lab</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Forging futuristic cloud applications, visual layouts, and web experiences. Revolutionizing the IT ecosystem under a unified vision of global tech excellence.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#58a6ff]">
              Quick Access
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button 
                  onClick={() => handleLinkClick("main", "home")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Base
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("main", "services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Core Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("main", "portfolio")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sleek Portfolios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("about")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Our Founders
                </button>
              </li>
            </ul>
          </div>

          {/* Core Contacts Detail Block */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              
              <a 
                href="mailto:jivanmali841@gmail.com" 
                className="flex items-center space-x-3 hover:text-[#58a6ff] transition-colors group"
                id="footer-email-link"
              >
                <div className="p-1.5 rounded-md bg-gray-900 border border-gray-800 group-hover:border-[#58a6ff]/40">
                  <Mail size={16} className="text-[#58a6ff]" />
                </div>
                <span>jivanmali841@gmail.com</span>
              </a>

              <a 
                href="tel:9657864331" 
                className="flex items-center space-x-3 hover:text-[#58a6ff] transition-colors group"
                id="footer-phone-link"
              >
                <div className="p-1.5 rounded-md bg-gray-900 border border-gray-800 group-hover:border-[#58a6ff]/40">
                  <Phone size={16} className="text-[#58a6ff]" />
                </div>
                <span>+91 9657864331</span>
              </a>

              <div className="flex items-start space-x-3" id="footer-location-block">
                <div className="p-1.5 rounded-md bg-gray-900 border border-gray-800 mt-0.5">
                  <MapPin size={16} className="text-[#ab7df6]" />
                </div>
                <span className="leading-relaxed">
                  Aslod Shahada, Nandurbar,<br/>
                  Maharashtra, India
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Luminous accents and copyright credits */}
        <div className="mt-12 pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-mono">
            &copy; {currentYear} <span className="text-gray-400 font-sans font-medium">JPnex Software Lab</span>. All rights reserved. 
            <br className="sm:hidden" /> Developed by <span className="text-[#58a6ff]">Jivan</span> &amp; <span className="text-[#ab7df6]">Yuvraj</span>.
          </p>

          <button
            onClick={handleBackToTop}
            className="flex items-center space-x-2 text-xs font-mono tracking-wider text-gray-400 hover:text-[#58a6ff] transition-all bg-white/5 hover:bg-[#58a6ff]/10 px-3 py-1.5 rounded-full border border-gray-800 hover:border-[#58a6ff]/30 cursor-pointer"
          >
            <span>BACK TO NEST</span>
            <ArrowUpCircle size={14} className="animate-pulse" />
          </button>
        </div>
      </div>
    </footer>
  );
}
