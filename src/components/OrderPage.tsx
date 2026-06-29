import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Laptop, 
  Smartphone, 
  Layers, 
  Video, 
  Palette, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Check, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Rocket, 
  Info,
  ChevronRight
} from "lucide-react";

export default function OrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  
  // Available premium items with simulated quotes/times to compute responsive aggregates
  const servicesConfig = [
    {
      id: "Website Development",
      label: "Website Development",
      estTime: 14,
      complexity: "High",
      icon: <Laptop size={16} className="text-[#58a6ff]" />,
      desc: "Node/React web engines & Next.js scaling."
    },
    {
      id: "Application Development",
      label: "Application Development",
      estTime: 21,
      complexity: "Critical",
      icon: <Smartphone size={16} className="text-[#ab7df6]" />,
      desc: "Cross-platform mobile apps & offline database storage."
    },
    {
      id: "UI/UX Design & Development",
      label: "UI/UX Design & Development",
      estTime: 10,
      complexity: "Medium-High",
      icon: <Layers size={16} className="text-[#00f2fe]" />,
      desc: "High-fidelity Figma mockups, visual pathways."
    },
    {
      id: "Reels Editing",
      label: "Reels Editing",
      estTime: 5,
      complexity: "Medium",
      icon: <Video size={16} className="text-[#ff007a]" />,
      desc: "Cinematic horizontal stabilization & viral cuts."
    },
    {
      id: "Graphics Designing",
      label: "Graphics Designing",
      estTime: 6,
      complexity: "Low-Medium",
      icon: <Palette size={16} className="text-amber-400" />,
      desc: "Vector identity assets, logo books, corporate guidelines."
    }
  ];

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "mobile") {
      const cleanPhone = value.replace(/\D/g, "");
      if (cleanPhone.length > 0 && cleanPhone.length !== 10) {
        setMobileError("Active Mobile Number must be exactly 10 digits");
      } else {
        setMobileError("");
      }
    }

    if (name === "email") {
      if (value.length > 0 && !value.endsWith("@gmail.com")) {
        setEmailError("Email must be a valid @gmail.com address");
      } else {
        setEmailError("");
      }
    }
  };

  // Compute stats on the fly for interactive UX
  const totalEstTime = selectedServices.length > 0 
    ? Math.max(...servicesConfig.filter(s => selectedServices.includes(s.id)).map(s => s.estTime))
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const phoneClean = formData.mobile.replace(/\D/g, "");
    if (phoneClean.length !== 10) {
      setMobileError("Active Mobile Number must be exactly 10 digits");
      setIsLoading(false);
      return;
    }

    if (!formData.email.endsWith("@gmail.com")) {
      setEmailError("A valid Active Gmail address (@gmail.com) is required");
      setIsLoading(false);
      return;
    }

    if (selectedServices.length === 0) {
      setErrorMsg("Please select at least one core service category.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: formData.name,
          mobile: phoneClean,
          email: formData.email,
          selected_services: selectedServices,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
      } else {
        setErrorMsg(result.error || "Internal Server Error submitting order. Please retry.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Database sync delay. Connection to `project_orders` failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setFormData({ name: "", mobile: "", email: "" });
    setSelectedServices([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      id="order-panel-layout"
      className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen"
    >
      <div className="space-y-12">
        
        {/* Onboarding Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#ab7df6]/10 border border-[#ab7df6]/20 px-3 py-1 rounded-full">
            <Rocket size={14} className="text-[#ab7df6]" />
            <span className="text-xs font-mono text-[#ab7df6] uppercase tracking-widest font-semibold">
              JPNEX WORKFLOW INTEGRATOR
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display">
            Order Project
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
            Configure your modular deliverables below. Submitting automatically triggers our internal dev loops and logs constraints into `project_orders`.
          </p>
        </div>

        {/* Dynamic Multi-column Dashboard Workspace */}
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="order-workspace"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start"
            >
              
              {/* Form & Selection side (8 Cols on Desktop) */}
              <div className="lg:col-span-7 bg-[#161b22] border border-gray-800 rounded-3xl p-6 md:p-8 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ab7df6]/5 rounded-bl-3xl pointer-events-none"></div>

                <form onSubmit={handleSubmit} className="space-y-6" id="form-project-orders">
                  
                  {/* Onboarding fields */}
                  <div className="space-y-4">
                    <h3 className="text-base font-mono font-bold uppercase tracking-wider text-[#58a6ff]">
                      [01] Founder Connect details
                    </h3>

                    {/* Customer Name */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="customer-name" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                        Client Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                          <User size={16} />
                        </div>
                        <input
                          type="text"
                          name="name"
                          id="order-input-name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Elon Musk"
                          className="w-full bg-gray-950/40 border border-gray-850 focus:border-[#58a6ff] hover:border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all focus:ring-1 focus:ring-[#58a6ff]"
                        />
                      </div>
                    </div>

                    {/* Double Fields (Phone & Gmail) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Active Mobile Number */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="mobile" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Active Mobile</span>
                          {mobileError && <span className="text-[9px] text-rose-400 font-sans tracking-normal lowercase">{mobileError}</span>}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                            <Phone size={16} />
                          </div>
                          <input
                            type="tel"
                            name="mobile"
                            id="order-input-mobile"
                            required
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="10 Digits, e.g. 9657864331"
                            className={`w-full bg-gray-950/40 border ${mobileError ? 'border-rose-500/50' : 'border-gray-850 focus:border-[#58a6ff]'} hover:border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-all focus:ring-1`}
                          />
                        </div>
                      </div>

                      {/* Gmail Address */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="email" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Gmail Address</span>
                          {emailError && <span className="text-[9px] text-rose-400 font-sans tracking-normal lowercase">{emailError}</span>}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                            <Mail size={16} />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="order-input-email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. jivanmali841@gmail.com"
                            className={`w-full bg-gray-950/40 border ${emailError ? 'border-rose-500/50' : 'border-gray-850 focus:border-[#58a6ff]'} hover:border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-all focus:ring-1`}
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Service MultiSelect Checkboxes */}
                  <div className="space-y-4 pt-4 border-t border-gray-800/60">
                    <h3 className="text-base font-mono font-bold uppercase tracking-wider text-[#ab7df6]">
                      [02] Select Core Service Deliverables
                    </h3>
                    
                    <div id="service-options" className="space-y-3">
                      {servicesConfig.map((srv) => {
                        const isChecked = selectedServices.includes(srv.id);
                        return (
                          <div
                            key={srv.id}
                            onClick={() => handleToggleService(srv.id)}
                            className={`flex items-start justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                              isChecked 
                                ? "bg-[#58a6ff]/5 border-[#58a6ff] shadow-[0_0_15px_rgba(88,166,255,0.08)]" 
                                : "bg-gray-950/30 border-gray-850 hover:border-gray-800"
                            }`}
                          >
                            <div className="flex items-start space-x-3 text-left">
                              <div className="mt-1 p-1 rounded-md bg-[#0a0e14] border border-gray-800">
                                {srv.icon}
                              </div>
                              <div>
                                <span className="text-sm font-semibold text-white block">
                                  {srv.label}
                                </span>
                                <span className="text-xs text-gray-500 block">
                                  {srv.desc}
                                </span>
                              </div>
                            </div>

                            {/* Checkmark placeholder */}
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              isChecked 
                                ? "bg-[#58a6ff] border-[#58a6ff] text-black" 
                                : "border-gray-700 bg-transparent"
                            }`}>
                              {isChecked && <Check size={12} strokeWidth={3} />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* System warnings error block */}
                  {errorMsg && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs font-mono">
                      [ORDER_ERROR]:: {errorMsg}
                    </div>
                  )}

                  {/* Place Order submit button */}
                  <button
                    type="submit"
                    id="btn-place-order"
                    disabled={isLoading}
                    className="w-full relative py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-black bg-[#ab7df6] hover:bg-[#58a6ff] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(171,125,246,0.3)]"
                  >
                    <span>{isLoading ? "Compiling Order Structure..." : "PLACE ORDER"}</span>
                    {!isLoading && <ChevronRight size={14} className="animate-pulse" />}
                  </button>

                </form>
              </div>

              {/* Dynamic Bill Sidebar (5 Cols on Desktop) */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                
                {/* Onboarding Statement Card */}
                <div className="bg-[#12161f] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#58a6ff]/40 to-transparent"></div>
                  
                  <div className="flex items-center space-x-2 text-[#58a6ff]">
                    <FileText size={18} />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      Live Delivery Specification
                    </span>
                  </div>

                  {selectedServices.length === 0 ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="mx-auto w-10 h-10 rounded-full border border-dashed border-gray-700 flex items-center justify-center text-gray-500">
                        <Info size={16} />
                      </div>
                      <p className="text-xs text-gray-500 font-mono">
                        Select one or more core software deliverables to calculate your real-time onboarding specifications.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      
                      {/* Active list summary */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono text-gray-500 uppercase block">Selected Modules:</span>
                        <div className="space-y-2">
                          {selectedServices.map((id) => (
                            <div key={id} className="flex items-center space-x-2 bg-gray-950/40 p-2 text-xs rounded-lg border border-gray-850">
                              <Check size={12} className="text-[#58a6ff] flex-shrink-0" />
                              <span className="text-gray-300 font-medium font-sans">{id}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cumulative Delivery constraints */}
                      <div className="grid grid-cols-2 gap-4 border-t border-gray-800/80 pt-5 text-left">
                        <div className="bg-gray-950/40 border border-gray-850 p-3.5 rounded-xl">
                          <div className="flex items-center space-x-1.5 text-[#ab7df6] mb-1">
                            <Clock size={12} />
                            <span className="text-[10px] font-mono uppercase tracking-wider block">Est. SLA</span>
                          </div>
                          <span className="text-2xl font-bold text-white font-mono">{totalEstTime}</span>
                          <span className="text-[10px] text-gray-500 block ml-0.5">Days Limit</span>
                        </div>

                        <div className="bg-gray-950/40 border border-gray-850 p-3.5 rounded-xl">
                          <div className="flex items-center space-x-1.5 text-amber-500 mb-1">
                            <Calendar size={12} />
                            <span className="text-[10px] font-mono uppercase tracking-wider block">Priority</span>
                          </div>
                          <span className="text-base font-bold text-white font-mono uppercase">HOLO-FAST</span>
                          <span className="text-[10px] text-gray-500 block">SLA Locked</span>
                        </div>
                      </div>

                      {/* System guarantee note */}
                      <div className="p-3 bg-gray-950 border border-gray-850 rounded-xl flex items-start space-x-2 text-[11px] text-gray-400">
                        <ShieldCheck size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-normal">
                          All project contracts are backed by automated JPNEX milestone checking. Jivan and Yuvraj will personally provide daily updates.
                        </span>
                      </div>

                    </div>
                  )}

                </div>

              </div>

            </motion.div>
          ) : (
            <motion.div
              key="order-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto p-[1px] rounded-3xl bg-gradient-to-r from-emerald-500/20 via-[#ab7df6]/20 to-emerald-500/20 shadow-2xl"
            >
              <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-8 text-center space-y-6">
                
                <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-bounce">
                  <Check size={40} className="stroke-[3]" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold text-white font-display">
                    Order Injected
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
                    Excellent choice, <span className="text-[#58a6ff] font-semibold">{formData.name}</span>. Your selections have been dispatched successfully into the `project_orders` table.
                  </p>
                </div>

                {/* Simulated dynamic voucher */}
                <div className="bg-gray-950/80 border border-gray-850 rounded-2xl p-5 text-left text-xs font-mono text-gray-400 space-y-2.5 max-w-md mx-auto">
                  <div className="border-b border-gray-850 pb-2 flex justify-between font-bold text-[#58a6ff]">
                    <span>TRANSACTION VOUCHER</span>
                    <span>SUCCESS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CLIENT:</span>
                    <span className="text-gray-200">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SECURE TEL:</span>
                    <span className="text-gray-200">{formData.mobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GMAIL DIRECT:</span>
                    <span className="text-gray-200">{formData.email}</span>
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-gray-500 font-bold">MODULES COMMITTED:</span>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {selectedServices.map(id => (
                        <span key={id} className="bg-[#58a6ff]/10 text-[#58a6ff] px-2 py-0.5 rounded text-[10px] border border-[#58a6ff]/20">
                          {id}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-850 pt-2 flex justify-between">
                    <span className="font-bold">ENGAGEMENT TARGET:</span>
                    <span className="text-emerald-400 font-bold">{totalEstTime} DAYS SLA</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-gray-800 hover:border-gray-750 text-xs font-mono text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    Place Another Order
                  </button>
                  <a
                    href="mailto:jivanmali841@gmail.com"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#58a6ff] hover:bg-white text-black text-xs font-bold font-sans tracking-wide transition-all"
                  >
                    Ping Founder Email
                  </a>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
