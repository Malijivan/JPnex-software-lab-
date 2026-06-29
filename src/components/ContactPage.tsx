import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, User, MessageSquare, ShieldCheck, Sparkles, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time custom validation
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Re-verify fields
    const phoneClean = formData.mobile.replace(/\D/g, "");
    if (phoneClean.length !== 10) {
      setMobileError("Please enter a valid 10-digit mobile number");
      setIsLoading(false);
      return;
    }

    if (!formData.email.endsWith("@gmail.com")) {
      setEmailError("A valid Active Gmail address (@gmail.com) is required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          mobile: phoneClean,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setFormData({ name: "", mobile: "", email: "", message: "" });
      } else {
        setErrorMsg(result.error || "Internal Server Error submitting contact. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Network latency detected. Unable to connect to JPnex database server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      id="contact-us-layout"
      className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen flex flex-col justify-center"
    >
      <div className="space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-[#58a6ff]/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
              SECURE CRYPTO-NODE ENVELOPE
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display">
            Contact Us
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-400">
            Connect directly with founders Jivan &amp; Yuvraj. Our system seals communications and feeds them securely to the `contact_submissions` registry.
          </p>
        </div>

        {/* Contact Form Wrapper */}
        <div className="p-[1px] rounded-3xl bg-gradient-to-b from-gray-800 to-transparent max-w-2xl mx-auto shadow-2xl">
          <div className="bg-[#161b22] border border-gray-800/80 rounded-3xl p-8 md:p-10 relative overflow-hidden backdrop-blur-sm">
            
            {/* Dynamic visual aura */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#58a6ff]/5 rounded-full blur-3xl pointer-events-none"></div>

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="form-contact"
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                  id="form-contact-submissions"
                >
                  {/* Name field */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="name" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="form-input-name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-gray-950/40 border border-gray-850 focus:border-[#58a6ff] hover:border-gray-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all focus:ring-1 focus:ring-[#58a6ff]"
                      />
                    </div>
                  </div>

                  {/* Dual Grid Mobile & Gmail */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Active Mobile field */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="mobile" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Active Mobile</span>
                        {mobileError && <span className="text-[10px] text-rose-400 font-sans tracking-normal lowercase">{mobileError}</span>}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                          <Phone size={16} />
                        </div>
                        <input
                          type="tel"
                          name="mobile"
                          id="form-input-mobile"
                          required
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="e.g. 9657864331"
                          className={`w-full bg-gray-950/40 border ${mobileError ? 'border-rose-500/50 focus:ring-rose-400 focus:border-rose-400' : 'border-gray-850 focus:border-[#58a6ff]'} hover:border-gray-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all focus:ring-1`}
                        />
                      </div>
                    </div>

                    {/* Gmail Address field */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="email" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Gmail Address</span>
                        {emailError && <span className="text-[10px] text-rose-400 font-sans tracking-normal lowercase">{emailError}</span>}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                          <Mail size={16} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="form-input-email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jivanmali841@gmail.com"
                          className={`w-full bg-gray-950/40 border ${emailError ? 'border-rose-500/50 focus:ring-rose-400 focus:border-rose-400' : 'border-gray-850 focus:border-[#58a6ff]'} hover:border-gray-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all focus:ring-1`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="message" className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Write Secret Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3.5 left-3.5 text-gray-500">
                        <MessageSquare size={16} />
                      </div>
                      <textarea
                        name="message"
                        id="form-input-message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Hi Jivan and Yuvraj, I wish to initiate an enterprise website design for..."
                        className="w-full bg-gray-950/40 border border-gray-850 focus:border-[#58a6ff] hover:border-gray-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all focus:ring-1 focus:ring-[#58a6ff]"
                      />
                    </div>
                  </div>

                  {/* Error Notification banner */}
                  {errorMsg && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-mono">
                      [ERROR]:: {errorMsg}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-submit-contact"
                    disabled={isLoading}
                    className="w-full relative py-4 rounded-xl font-semibold text-xs tracking-wider uppercase text-black bg-[#58a6ff] hover:bg-white hover:text-black transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_rgba(88,166,255,0.25)] disabled:opacity-50"
                  >
                    <span>{isLoading ? "Encrypting submissions..." : "Secure Submit Link"}</span>
                    {!isLoading && <Send size={13} className="animate-pulse" />}
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-8 relative z-10"
                >
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-bounce">
                    <CheckCircle size={40} />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white font-display">
                      Secure Submit Successful
                    </h2>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                      Your message has been compiled and injected safely into the JPnex database registry (`contact_submissions`). Founders Jivan &amp; Yuvraj will review soon.
                    </p>
                  </div>

                  <div className="bg-gray-950/60 border border-gray-800 p-4 rounded-2xl max-w-sm mx-auto text-left space-y-1.5 text-xs text-gray-500 font-mono">
                    <div className="flex justify-between">
                      <span>STATUS:</span>
                      <span className="text-[#58a6ff]">ENCRYPTED_SAVED</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DAT-TABLE:</span>
                      <span className="text-gray-300">contact_submissions</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SYS-TIME:</span>
                      <span className="text-gray-350">{new Date().toISOString().substring(0, 19).replace('T', ' ')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2 rounded-full border border-gray-800 hover:border-gray-700 text-xs font-mono text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
