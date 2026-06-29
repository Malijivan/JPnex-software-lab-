import { motion } from "motion/react";
import { Users, Code, Award, Rocket, ArrowRight, Github, Linkedin, Sparkles, Instagram } from "lucide-react";
import { ActiveView } from "../types";

interface AboutPageProps {
  setView: (view: ActiveView) => void;
} 

export default function AboutPage({ setView }: AboutPageProps) {
  
  const founders = [
    {
      name: "Jivan Mali",
      role: "Founder / Owner",
      email: "jivanmali841@gmail.com",
      bio: "Full Stack Web Developer",
      initials: "JM",
      avatarGradient: "from-[#58a6ff] to-[#00f2fe]",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://www.instagram.com/_mali_jivan_007/?hl=en",
      accent: "#58a6ff",
      imageUrl: "/jivan_mali.jpeg"
    },
    {
      name: "Yuvraj Mali",
      role: "Owner / Cinematic Editor",
      email: "",
      bio: "Cinematic Editor & Video Production Expert",
      initials: "YM",
      avatarGradient: "from-[#ab7df6] to-[#7928ca]",
      instagram: "https://www.instagram.com/yuviiii._33?igsh=Zm91azNsMHVmdmI0",
      accent: "#ab7df6",
      imageUrl: "/yuvraj_mali.jpeg"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      id="about-us-layout"
      className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 min-h-screen"
    >
      
      {/* ----------------- HEADER SECTION ----------------- */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#58a6ff]/10 border border-[#58a6ff]/20 px-3 py-1 rounded-full">
          <Users size={14} className="text-[#58a6ff]" />
          <span className="text-xs font-mono text-[#58a6ff] uppercase tracking-wider font-semibold">
            THE FORCE BEHIND JPNEX
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display">
          About Us
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400">
          JPnex Software Lab was built on absolute transparency, mathematical precision, and a relentless passion for high-tech digital systems.
        </p>
      </div>

      {/* ----------------- FOUNDERS SHOWCASE ----------------- */}
      <div className="space-y-10">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Meet the Founders
          </h2>
          <div className="w-16 h-[2px] bg-[#58a6ff] mx-auto mt-3"></div>
        </div>

        <div id="founders-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 justify-items-center">
          {founders.map((founder, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group relative w-full max-w-md p-8 rounded-3xl bg-[#161b22] border border-gray-800/80 hover:border-[#58a6ff]/30 shadow-2xl transition-all duration-300 backdrop-blur-sm"
              id={`founder-card-${idx}`}
            >
              {/* Profile Background Aura */}
              <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-r ${founder.avatarGradient} opacity-5 blur-3xl pointer-events-none group-hover:opacity-15 transition-opacity`}></div>

              <div className="flex flex-col items-center text-center space-y-6">
                
                {/* Advanced SVG Sci-fi Profile Placeholder */}
                <div className="relative w-80 h-80 flex items-center justify-center">
                  
                  {/* Decorative boundary */}
                  <div className="absolute inset-0 rounded-sm border-2 border-dashed border-gray-700 group-hover:border-[#58a6ff]/40 transition-colors"></div>
                  
                  {/* Actual avatar design */}
                  <div className={`w-[19rem] h-[19rem] rounded-sm bg-gradient-to-br ${founder.avatarGradient} p-[3px] shadow-[0_0_20px_rgba(0,0,0,0.6)]`}>
                    <div className="w-full h-full rounded-sm bg-[#0a0e14] flex items-center justify-center relative overflow-hidden group-hover:bg-gradient-to-br transition-all">
                      
                      {founder.imageUrl ? (
                        <img 
                          src={founder.imageUrl} 
                          alt={founder.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-gray-500 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M5 20C5 16 9 15 12 15C15 15 19 16 19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}

                      {/* Floating Initial Badge */}
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[8px] font-mono rounded bg-gray-900 border border-gray-800 text-gray-400 group-hover:text-white font-bold">
                        {founder.initials}
                      </span>
                    </div>
                  </div>

                  {/* Pulsing indicator marker */}
                  <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#161b22] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  </div>
                </div>

                {/* Identity header */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-blue-500 bg-clip-text text-transparent tracking-tight font-display">
                    {founder.name}
                  </h3>
                  <div className="inline-flex items-center space-x-1.5 bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
                    <Code size={14} className="text-[#58a6ff]" />
                    <span className="text-sm font-bold bg-gradient-to-r from-[#58a6ff] to-[#00f2fe] bg-clip-text text-transparent">
                      {founder.role}
                    </span>
                  </div>
                </div>

                {/* Biography */}
                <p className="text-sm text-gray-400 leading-relaxed text-center sm:px-4">
                  {founder.bio}
                </p>

                {/* Founder Social Links */}
                <div className="flex items-center space-x-3 pt-2">
                  {founder.github && (
                    <a 
                      href={founder.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 rounded-full bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800 transition-all cursor-pointer"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {founder.linkedin && (
                    <a 
                      href={founder.linkedin} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 rounded-full bg-gray-900 text-gray-400 hover:text-[#58a6ff] hover:bg-gray-800 border border-gray-800 transition-all cursor-pointer"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {"instagram" in founder && founder.instagram && (
                    <a 
                      href={founder.instagram} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 rounded-full bg-gray-900 text-gray-400 hover:text-[#e1306c] hover:bg-gray-800 border border-gray-800 transition-all cursor-pointer"
                    >
                      <Instagram size={16} />
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ----------------- OUR JOURNEY SECTION ----------------- */}
      <div id="our-journey-panel" className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Our Journey
          </h2>
          <p className="text-sm text-gray-400">
            Chronology of a software enterprise built to redefine cloud aesthetics.
          </p>
          <div className="w-16 h-[2px] bg-[#ab7df6] mx-auto"></div>
        </div>

        <div className="relative border-l border-gray-800 ml-4 md:ml-10 space-y-12 py-4">
          
          {/* Milestone 1 */}
          <div className="relative pl-8 md:pl-12">
            {/* Timeline bullet */}
            <div className="absolute top-1 -left-[9px] w-4 h-4 rounded-full bg-[#161b22] border-2 border-[#58a6ff] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#58a6ff]"></div>
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#58a6ff] font-semibold uppercase">
                Phase One: The Awakening
              </span>
              <h3 className="text-lg font-bold text-white text-left font-display">
                Forging the Lab
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed text-left">
                Both driven by an insatiable curiosity for system boundaries, owners **Jivan Mali** and **Yuvraj Mali** combined their technical codebases and cinematic designs. Disillusioned by standard, low-efficiency templates inside the software industry, they founded **JPnex Software Lab**.
              </p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="relative pl-8 md:pl-12">
            {/* Timeline bullet */}
            <div className="absolute top-1 -left-[9px] w-4 h-4 rounded-full bg-[#161b22] border-2 border-[#ab7df6] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ab7df6]"></div>
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#ab7df6] font-semibold uppercase">
                Phase Two: Creative Synthesis
              </span>
              <h3 className="text-lg font-bold text-white text-left font-display">
                Merging Dev with Short-Form Retention
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed text-left">
                Realizing that modern corporate clients need more than mere layouts, JPnex expanded. They synchronized production engineering (Website and Native Applications compile stacks) with modern multimedia assets (Reels Editing, Vector Styling, and Figma layouts). It became a unified machine for complete corporate growth.
              </p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="relative pl-8 md:pl-12">
            {/* Timeline bullet */}
            <div className="absolute top-1 -left-[9px] w-4 h-4 rounded-full bg-[#161b22] border-2 border-[#00f2fe] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]"></div>
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#00f2fe] font-semibold uppercase">
                Phase Three: Scaling Domination
              </span>
              <h3 className="text-lg font-bold text-white text-left font-display">
                Targeting the Global IT Horizon
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed text-left">
                With a clear blueprint mapped from Maharashtra to the global digital frontier, JPnex Software Lab has scaled its client operations. Every vector, route, and Firestore cluster is crafted to withstand immense user loads while displaying breathtaking aesthetic harmony. Jivan and Yuvraj continue to push boundaries, translating absolute client dreams into highly lucrative tech realities.
              </p>
            </div>
          </div>

        </div>

        {/* Global CTA button block */}
        <div className="pt-6 text-center">
          <button
            onClick={() => setView("order")}
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider text-black bg-white hover:bg-[#58a6ff] hover:text-black transition-all cursor-pointer"
          >
            <span>JOIN OUR DIGITAL EXPEDITION</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

    </motion.div>
  );
}
