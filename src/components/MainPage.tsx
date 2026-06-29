import { motion } from "motion/react";
import { 
  Laptop, 
  Smartphone, 
  Layers, 
  Video, 
  Palette, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Globe,
  Terminal,
  Compass,
  Share2
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { ServiceItem, ActiveView } from "../types";

interface MainPageProps {
  setView: (view: ActiveView) => void;
  scrollToSection: (id: string) => void;
}

export default function MainPage({ setView, scrollToSection }: MainPageProps) {
  
  // List of high-end corporate services
  const services: ServiceItem[] = [
    {
      id: "web-dev",
      title: "Website Development",
      description: "Cutting-edge, highly optimized web applications crafted with Next.js, React, and server deployments.",
      longDescription: "Deploy interactive, lightning-fast web storefronts and Enterprise SaaS solutions that convert views into high-yielding corporate assets.",
      iconName: "Laptop",
      features: ["Next.js & React 18+", "SEO Dominance", "Headless CMS Solutions", "Tailwind Fluid Styling"]
    },
    {
      id: "app-dev",
      title: "Application Development",
      description: "Cross-platform mobile apps for iOS and Android compiled with robust native APIs and fluid transitions.",
      longDescription: "Engineered with React Native and native backplanes to supply smooth multi-user collaboration and secure hardware access.",
      iconName: "Smartphone",
      features: ["iOS & Android Native", "Offline-First Syncing", "Biometric Encryption", "Stripe Checkout Integrations"]
    },
    {
      id: "ui-ux",
      title: "UI/UX Design & Development",
      description: "Sleek, high-fidelity prototypes and research architectures emphasizing tactile micro-interactions.",
      longDescription: "User journeys converted into absolute visual clarity. Generates intuitive controls and brand aesthetics suited for high conversion.",
      iconName: "Layers",
      features: ["Tactile Wireframing", "Custom Animated Assets", "Figma Design Token Systems", "Responsive Testing"]
    },
    {
      id: "reels-edit",
      title: "Reels Editing",
      description: "High-retention vertical short-form cinematography optimized for TikTok, Reels, and YouTube Shorts.",
      longDescription: "Amplify your social presence with modern grading, dynamic subtitles, custom sound design, and retention-engineered sequencing.",
      iconName: "Video",
      features: ["Retention Sequencing", "Dynamic Custom Typography", "Acoustic SFX Enhancements", "Viral Formatting Guides"]
    },
    {
      id: "gfx-design",
      title: "Graphics Designing",
      description: "Elite corporate brand guidelines, logos, vector illustration boards, and cohesive commercial collateral.",
      longDescription: "Inject visual authority into your venture. Receive responsive vector formats and print-ready identity books that leave lasting impressions.",
      iconName: "Palette",
      features: ["Advanced Vector Systems", "Cohesive Typography Kits", "Premium Pitch Deck Guides", "Creative Poster Layouts"]
    },
    {
      id: "social-media",
      title: "Social Media Management",
      description: "Comprehensive management of your social media platforms to build brand presence and engage audiences.",
      longDescription: "We manage client social media accounts like Instagram, Facebook, LinkedIn, and more. From content creation to posting schedules to AI influencer promotional reels.",
      iconName: "Share2",
      features: ["Instagram & Facebook", "Content Calendar", "Audience Engagement", "AI Influencer Promotional Reels"]
    }
  ];

  // Map icon strings to Lucide components
  const getIcon = (name: string) => {
    switch (name) {
      case "Laptop": return <Laptop className="text-[#58a6ff]" size={28} />;
      case "Smartphone": return <Smartphone className="text-[#ab7df6]" size={28} />;
      case "Layers": return <Layers className="text-[#00f2fe]" size={28} />;
      case "Video": return <Video className="text-[#ff007a]" size={28} />;
      case "Palette": return <Palette className="text-amber-400" size={28} />;
      case "Share2": return <Share2 className="text-[#38ef7d]" size={28} />;
      default: return <Laptop className="text-[#58a6ff]" size={28} />;
    }
  };

  return (
    <div id="main-content-layout" className="relative">
      
      {/* ----------------- SECTION A: HERO ----------------- */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 px-4 md:px-8 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto text-center space-y-10 py-16">
          
          {/* Subtitle Tech-badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-[#58a6ff]/10 border border-[#58a6ff]/20 px-4 py-1.5 rounded-full"
          >
            <Sparkles size={14} className="text-[#58a6ff] animate-spin" />
            <span className="text-xs font-mono tracking-wider text-[#58a6ff] uppercase font-semibold">
              Scaling Ideas Into Global Giants
            </span>
          </motion.div>

          {/* Epic Centered Holographic Logo Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative group p-6 rounded-full bg-gradient-to-b from-gray-900/40 to-transparent border border-white/5 shadow-2x neon-glow">
              <BrandLogo size={140} />
              
              {/* Absolutes decorative rings */}
              <div className="absolute inset-x-0 -bottom-2 flex justify-center">
                <span className="px-3 py-1 text-[10px] font-mono rounded-full bg-[#161b22] border border-gray-800 text-gray-400 uppercase tracking-widest">
                  LAB-CORES ENGAGED
                </span>
              </div>
            </div>
          </motion.div>

          {/* Vision Heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white leading-none"
            >
              Welcome to <br />
              <span className="bg-gradient-to-r from-white via-[#58a6ff] to-[#ab7df6] bg-clip-text text-transparent">
                JPnex Software Lab
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl mx-auto text-base sm:text-xl text-gray-400 font-sans"
            >
              The Future of IT Solutions and Digital Transformation. We construct ultra-premium, high-integrity digital systems that scale with enterprise speed.
            </motion.p>
          </div>

          {/* CTA Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              id="hero-cta-explore"
              onClick={() => scrollToSection("services")}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm tracking-wide bg-[#58a6ff] text-black hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(88,166,255,0.4)] flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              id="hero-cta-order"
              onClick={() => setView("order")}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm tracking-wide bg-white/5 text-white hover:bg-white/10 border border-gray-800 hover:border-gray-700 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Launch Onboarding</span>
              <Zap size={14} className="text-[#ab7df6]" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* ----------------- SECTION B: SERVICES ----------------- */}
      <section
        id="services"
        className="relative py-28 px-4 sm:px-6 lg:px-8 border-y border-gray-900 bg-[#0d1117]/70"
      >
        {/* Subtle cyan glow accent */}
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#58a6ff]/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header block */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#ab7df6]/15 to-[#58a6ff]/15 border border-[#58a6ff]/10 px-3 py-1 rounded-full">
              <span className="text-[10px] font-mono text-[#58a6ff] uppercase tracking-widest font-semibold">
                High-Caliber Capabilities
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Our Professional Services
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
              JPnex Software Lab brings corporate elegance and mathematical accuracy together, building systems designed to empower your workspace.
            </p>
          </div>

          {/* Cards 3-Column Grid */}
          <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 rounded-2xl bg-[#161b22]/70 border border-gray-800/80 hover:border-[#58a6ff]/40 shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm flex flex-col justify-between"
              >
                {/* Accent corner light */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-tr-2xl pointer-events-none"></div>

                <div className="space-y-6">
                  {/* Floating Icon Frame */}
                  <div className="inline-flex p-3 rounded-xl bg-gray-900 border border-gray-800 group-hover:border-[#58a6ff]/30 transition-transform group-hover:scale-105 duration-300">
                    {getIcon(item.iconName)}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#58a6ff] transition-colors font-display">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed min-h-[50px]">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans border-t border-gray-800/60 pt-3">
                      {item.longDescription}
                    </p>
                  </div>
                </div>

                {/* Sub Features Bullet Blocks */}
                <div className="mt-6 pt-5 border-t border-gray-800/40 space-y-2">
                  {item.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center space-x-2 text-xs text-gray-400">
                      <CheckCircle2 size={12} className="text-[#58a6ff] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Call for Order Onboarding */}
          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block p-1 rounded-2xl bg-gradient-to-r from-gray-800/80 via-[#58a6ff]/20 to-gray-800/80"
            >
              <div className="px-8 py-6 rounded-2xl bg-[#0a0e14] border border-gray-800/45 max-w-xl mx-auto space-y-4">
                <p className="text-sm text-gray-400 font-medium">
                  Have a customized requirement or ready to collaborate?
                </p>
                <button
                  id="services-cta-order"
                  onClick={() => setView("order")}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider text-black bg-[#58a6ff] hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(88,166,255,0.25)] cursor-pointer"
                >
                  <span>ORDER PROJECT NOW</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ----------------- SECTION C: PORTFOLIO ----------------- */}
      <section
        id="portfolio"
        className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0e14]"
      >
        {/* Subtle purple gradient cloud */}
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-[#ab7df6]/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header block */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00f2fe]/10 to-[#ab7df6]/15 px-3 py-1 rounded-full border border-purple-500/10">
              <span className="text-[10px] font-mono text-[#ab7df6] uppercase tracking-widest font-semibold">
                Sleek Gallery System
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Showcase
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
              A high-end architectural layout depicting the creative and functional systems currently in active development.
            </p>
          </div>

          {/* Interactive Benchmarks placeholder layout */}
          <div id="portfolio-interactive" className="relative p-1 rounded-3xl bg-gradient-to-b from-gray-800/50 to-transparent">
            <div className="bg-[#12161f]/90 border border-gray-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden backdrop-blur-md">
              
              {/* Outer corner wires simulation for high technological look */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-gray-600 flex items-center space-x-1">
                <Terminal size={10} />
                <span>JP-NODE::STAGE_ALPHA_0.1</span>
              </div>
              <div className="absolute top-4 right-4 text-[10px] font-mono text-[#58a6ff] flex items-center space-x-1 animate-pulse">
                <span>ON-TRACK</span>
              </div>

              {/* Wireframe Mockup Slots Grid */}
              <div id="wireframe-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 opacity-30 select-none">
                <div className="border border-dashed border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center space-y-3">
                  <Globe className="text-gray-500" size={32} />
                  <span className="text-xs font-mono text-gray-500">[WEB FRONTEND BACKPLANE]</span>
                </div>
                <div className="border border-dashed border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center space-y-3">
                  <Smartphone className="text-gray-500" size={32} />
                  <span className="text-xs font-mono text-gray-500">[CROSS-PLATFORM ENGINE]</span>
                </div>
                <div className="border border-dashed border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center space-y-3">
                  <Palette className="text-gray-500" size={32} />
                  <span className="text-xs font-mono text-gray-500">[CORPORATE DEPLOY BOOK]</span>
                </div>
              </div>

              <div className="mt-12 text-left relative z-10 p-6 sm:p-8 bg-gray-900/60 border border-gray-700/50 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-between hover:border-gray-600 transition-colors">
                <div className="space-y-4 flex-1 w-full">
                  <div className="flex justify-between items-start w-full gap-4">
                    <div className="inline-flex items-center space-x-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 h-fit">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Completed Project</span>
                    </div>
                    <div className="w-40 h-[80px] sm:w-56 sm:h-[80px] bg-white rounded-lg p-2 shadow-lg flex-shrink-0 flex items-center justify-center -mr-[232px] sm:-mr-[232px] relative z-20">
                      <img src="/adv-logo.png" alt="Advtech Engineering Services Logo" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white">Advtech Engineering Services Website</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-4">
                    <div>
                      <span className="text-gray-500 font-medium">Category:</span>
                      <p className="text-gray-300">Custom Web Development & Solutions</p>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium">Role:</span>
                      <p className="text-gray-300">Full-Stack Developer (Design, Development, & Deployment)</p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-gray-500 font-medium">Tech Stack:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'].map((tech) => (
                          <span key={tech} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-md border border-gray-700">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-gray-400 text-sm leading-relaxed">
                      A high-performance, fully responsive corporate website designed specifically for industrial engineering services. Built with a modern aesthetic, clean navigation, and a user-centric layout to effectively showcase engineering solutions, tech capabilities, and client services. Optimized for speed, SEO, and seamless cross-device performance.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 md:self-end flex flex-col sm:flex-row md:flex-col gap-3">
                  <a
                    href="https://adv-technology.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-[#58a6ff] text-black px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
                  >
                    <span className="text-lg">👁️</span>
                    <span>View Live Demo</span>
                  </a>
                  <a
                    href="/adv-invoice.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors border border-gray-600"
                  >
                    <span className="text-lg">📄</span>
                    <span>View Invoice</span>
                  </a>
                </div>
              </div>
 
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
