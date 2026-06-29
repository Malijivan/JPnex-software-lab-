import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  LogOut, 
  Database, 
  Shuffle, 
  Trash2, 
  UserPlus, 
  Plus, 
  CheckCircle,
  HelpCircle,
  ChevronRight,
  RefreshCw,
  Loader2,
  Mail,
  Phone,
  FileText
} from "lucide-react";
import { ContactSubmission, ProjectOrder } from "../types";

export default function AdminPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("jpnex_admin_auth") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isPasswordShaking, setIsPasswordShaking] = useState(false);

  // Dashboard states
  const [activeTab, setActiveTab] = useState<"contacts" | "orders">("contacts");
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [orders, setOrders] = useState<ProjectOrder[]>([]);
  const [supabaseStatus, setSupabaseStatus] = useState<string>("Detecting status...");
  const [isLoading, setIsLoading] = useState(true);

  // New Contact inline form state
  const [newContact, setNewContact] = useState({
    name: "",
    mobile: "",
    email: "",
    message: ""
  });
  const [addingContact, setAddingContact] = useState(false);

  // New Order inline form state
  const [newOrder, setNewOrder] = useState({
    customer_name: "",
    mobile: "",
    email: "",
    selected_services: [] as string[]
  });
  const [addingOrder, setAddingOrder] = useState(false);

  // List of professional services for selection
  const serviceOptions = [
    "Website Development",
    "Application Development",
    "UI/UX Design & Development",
    "Reels Editing",
    "Graphics Designing"
  ];

  // Fetch full data registry
  const fetchRegistryData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/dashboard");
      if (response.ok) {
        const result = await response.json();
        setContacts(result.submissions || []);
        setOrders(result.orders || []);
        setSupabaseStatus(result.supabaseStatus === "Connected" ? "Connected (Live Supabase Server)" : "Local JSON Backup Server");
      } else {
        setSupabaseStatus("Connection Error");
      }
    } catch (err) {
      console.error("Dashboard pull error:", err);
      setSupabaseStatus("Network Off-SLA");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistryData();
    }
  }, [isAuthenticated]);

  // Handle administrator authentication
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const correctUser = "JPnex Software Lab";
    const correctPass = "JPnex.software";

    if (username === correctUser && password === correctPass) {
      sessionStorage.setItem("jpnex_admin_auth", "true");
      setIsAuthenticated(true);
    } else {
      setLoginError("Invalid Credentials, access denied");
      setIsPasswordShaking(true);
      setTimeout(() => setIsPasswordShaking(false), 500);
    }
  };

  // Logout operations
  const handleLogout = () => {
    sessionStorage.removeItem("jpnex_admin_auth");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setLoginError("");
  };

  // Add contact inline row
  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.mobile || !newContact.email) {
      alert("Please fill in all core fields");
      return;
    }

    setAddingContact(true);
    try {
      const response = await fetch("/api/dashboard/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setNewContact({ name: "", mobile: "", email: "", message: "" });
        await fetchRegistryData();
      } else {
        alert("Insert failed: " + (data.error || "Unknown Error"));
      }
    } catch (err) {
      console.error("Custom contact sync failed:", err);
    } finally {
      setAddingContact(false);
    }
  };

  // Add order inline row
  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.customer_name || !newOrder.mobile || !newOrder.email) {
      alert("Please fill in name, mobile and email");
      return;
    }
    if (newOrder.selected_services.length === 0) {
      alert("Please select at least one core service category");
      return;
    }

    setAddingOrder(true);
    try {
      const response = await fetch("/api/dashboard/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setNewOrder({ customer_name: "", mobile: "", email: "", selected_services: [] });
        await fetchRegistryData();
      } else {
        alert("Order launch failed: " + (data.error || "Unknown Error"));
      }
    } catch (err) {
      console.error("Custom order sync failed:", err);
    } finally {
      setAddingOrder(false);
    }
  };

  // Remove contact row
  const handleDeleteContact = async (id: string | undefined) => {
    if (!id) return;
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this contact submission from the registry?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/dashboard/contacts/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        await fetchRegistryData();
      } else {
        const errData = await response.json().catch(() => null);
        alert(errData?.error || "Unable to delete entry from server.");
      }
    } catch (err) {
      console.error("Delete call aborted:", err);
    }
  };

  // Remove order row
  const handleDeleteOrder = async (id: string | undefined) => {
    if (!id) return;
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this project order from the database server?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/dashboard/orders/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        await fetchRegistryData();
      } else {
        const errData = await response.json().catch(() => null);
        alert(errData?.error || "Unable to delete entry from database.");
      }
    } catch (err) {
      console.error("Delete call aborted:", err);
    }
  };

  const toggleServiceInForm = (svc: string) => {
    setNewOrder(prev => ({
      ...prev,
      selected_services: prev.selected_services.includes(svc)
        ? prev.selected_services.filter(s => s !== svc)
        : [...prev.selected_services, svc]
    }));
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen relative">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* CINEMATIC SECURE LOGIN CARD */
          <motion.div
            key="login-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center py-12"
          >
            <div className="w-full max-w-md relative p-[1px] rounded-3xl bg-gradient-to-r from-gray-800 via-[#58a6ff]/20 to-gray-800 shadow-2xl">
              <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-8 relative overflow-hidden backdrop-blur-md">
                
                {/* Decorative electric-blue backdrop aura */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#58a6ff]/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="text-center space-y-3 mb-8 relative z-10">
                  <div className="inline-flex p-3 rounded-full bg-slate-950 border border-gray-800 shadow-[0_0_15px_rgba(88,166,255,0.15)] mb-1">
                    <Lock className="text-[#58a6ff] size-6 animate-pulse" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                    Guarded Administrative Gate
                  </h2>
                  <p className="text-xs text-gray-400 font-mono">
                    AUTHORIZED INTERNAL PERSONNEL ONLY
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-6 relative z-10">
                  
                  {/* Username Field */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block">
                      Admin Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="JPnex Software Lab"
                        className="w-full bg-gray-950/50 border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#58a6ff] hover:border-gray-700 focus:ring-1 focus:ring-[#58a6ff] transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className={`space-y-1.5 text-left ${isPasswordShaking ? "animate-bounce" : ""}`}>
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block">
                      Security Keyphrase
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <Lock size={16} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••••"
                        className="w-full bg-gray-950/50 border border-gray-800 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#58a6ff] hover:border-gray-700 focus:ring-1 focus:ring-[#58a6ff] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Error Prompt banner with shake */}
                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-mono text-center"
                    >
                      [SECURITY]:: {loginError}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full relative py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-black bg-[#58a6ff] hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_20px_rgba(88,166,255,0.2)]"
                  >
                    <span>Authenticate Console</span>
                    <ChevronRight size={14} className="animate-pulse" />
                  </button>

                </form>

              </div>
            </div>
          </motion.div>
        ) : (
          /* FULL DYNAMIC DIGITAL DASHBOARD CONTROL CENTER */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Top Status Administrator Header */}
            <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl bg-[#161b22]/90 border border-gray-800 backdrop-blur-md gap-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-[#58a6ff]/10 border border-[#58a6ff]/20 text-[#58a6ff]">
                  <Database size={24} className="animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div className="text-left space-y-1">
                  <h3 className="text-lg font-bold text-white font-display">JPnex Console Server</h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Welcome, Administrator</span>
                    <span className="text-gray-600">|</span>
                    <span className="text-slate-400 font-bold">{supabaseStatus}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchRegistryData}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-mono text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
                  <span>Sync Server</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 transition-all text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut size={12} />
                  <span>Exit Session</span>
                </button>
              </div>
            </div>

            {/* Main Selector Tabs Navigation Panel */}
            <div className="flex border-b border-gray-800/80 gap-2">
              <button
                onClick={() => setActiveTab("contacts")}
                className={`px-6 py-3.5 text-sm font-semibold tracking-wide border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "contacts"
                    ? "border-[#58a6ff] text-[#58a6ff] bg-[#58a6ff]/5"
                    : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Mail size={16} />
                <span>Contact Submissions ({contacts.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-6 py-3.5 text-sm font-semibold tracking-wide border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "orders"
                    ? "border-[#ab7df6] text-[#ab7df6] bg-[#ab7df6]/5"
                    : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FileText size={16} />
                <span>Project Orders ({orders.length})</span>
              </button>
            </div>

            {/* TAB CONTENT LAYOUTS */}
            {isLoading ? (
              /* Sync Skeleton */
              <div className="py-24 text-center space-y-4">
                <Loader2 size={36} className="text-[#58a6ff] animate-spin mx-auto" />
                <p className="text-sm text-gray-400 font-mono tracking-wide">
                  Syncing with Supabase Production Server...
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* CONTACT SUBMISSIONS TAB */}
                {activeTab === "contacts" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    
                    {/* Inline Form block at the top */}
                    <div className="bg-[#12161f] border border-gray-800/80 p-6 rounded-2xl text-left space-y-4">
                      <div className="flex items-center gap-2 text-[#58a6ff] border-b border-gray-800/60 pb-3">
                        <UserPlus size={16} />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                          Inject New Contact Entry
                        </h4>
                      </div>

                      <form onSubmit={handleAddContact} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 uppercase">Contact Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="John Carter"
                            value={newContact.name}
                            onChange={(e) => setNewContact(p => ({ ...p, name: e.target.value }))}
                            className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-700"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 uppercase">Phone (Mobile)</label>
                          <input 
                            type="text" 
                            required
                            placeholder="9657864331"
                            value={newContact.mobile}
                            onChange={(e) => setNewContact(p => ({ ...p, mobile: e.target.value }))}
                            className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-700"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 uppercase">Gmail Address</label>
                          <input 
                            type="email" 
                            required
                            placeholder="jivanmali841@gmail.com"
                            value={newContact.email}
                            onChange={(e) => setNewContact(p => ({ ...p, email: e.target.value }))}
                            className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-700"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 uppercase">Secret Message (Optional)</label>
                          <input 
                            type="text" 
                            placeholder="Custom submission notes..."
                            value={newContact.message}
                            onChange={(e) => setNewContact(p => ({ ...p, message: e.target.value }))}
                            className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-700"
                          />
                        </div>
                        <div className="md:col-span-4 flex justify-end">
                          <button
                            type="submit"
                            disabled={addingContact}
                            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#58a6ff] hover:bg-white text-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus size={14} />
                            <span>{addingContact ? "Adding..." : "Add Record"}</span>
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Table View block */}
                    <div className="bg-[#12161f] border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl text-left">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] border-collapse">
                          <thead>
                            <tr className="bg-gray-950/60 border-b border-gray-850 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                              <th className="px-6 py-4 font-semibold text-left">Registered UUID</th>
                              <th className="px-6 py-4 font-semibold text-left">Client Name</th>
                              <th className="px-6 py-4 font-semibold text-left">Phone Number</th>
                              <th className="px-6 py-4 font-semibold text-left">Gmail Address</th>
                              <th className="px-6 py-4 font-semibold text-left">Secret Message</th>
                              <th className="px-6 py-4 font-semibold text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-850 font-sans text-xs text-gray-300">
                            {contacts.length === 0 ? (
                              <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-600 font-mono text-[11px]">
                                  No records currently configured. Try adding a test body row first!
                                </td>
                              </tr>
                            ) : (
                              contacts.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
                                  <td className="px-6 py-4 font-mono text-[10px] text-gray-500 max-w-[120px] truncate" title={c.id}>
                                    {c.id || "LOCAL_CACHE"}
                                  </td>
                                  <td className="px-6 py-4 font-semibold text-white">
                                    {c.name}
                                  </td>
                                  <td className="px-6 py-4 font-mono">
                                    {c.mobile}
                                  </td>
                                  <td className="px-6 py-4">
                                    {c.email}
                                  </td>
                                  <td className="px-6 py-4 text-gray-400 max-w-[200px] truncate" title={c.message}>
                                    {c.message}
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    <button
                                      onClick={() => handleDeleteContact(c.id)}
                                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 transition-all cursor-pointer"
                                      title="Delete Submission"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </motion.div>
                )}

                {/* PROJECT ORDERS TAB */}
                {activeTab === "orders" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    
                    {/* Inline Order Builder Form block */}
                    <div className="bg-[#12161f] border border-gray-800/80 p-6 rounded-2xl text-left space-y-4">
                      <div className="flex items-center gap-2 text-[#ab7df6] border-b border-gray-800/60 pb-3">
                        <UserPlus size={16} />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                          Define Custom Project Order
                        </h4>
                      </div>

                      <form onSubmit={handleAddOrder} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-500 uppercase">Customer Name</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. Elon Musk"
                              value={newOrder.customer_name}
                              onChange={(e) => setNewOrder(p => ({ ...p, customer_name: e.target.value }))}
                              className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-700"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-500 uppercase">Phone Number</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. 9657864331"
                              value={newOrder.mobile}
                              onChange={(e) => setNewOrder(p => ({ ...p, mobile: e.target.value }))}
                              className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-700"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-500 uppercase">Gmail Account</label>
                            <input 
                              type="email" 
                              required
                              placeholder="e.g. jivanmali841@gmail.com"
                              value={newOrder.email}
                              onChange={(e) => setNewOrder(p => ({ ...p, email: e.target.value }))}
                              className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-700"
                            />
                          </div>
                        </div>

                        {/* Checklist for Selected Services */}
                        <div className="space-y-1.5 text-left">
                          <span className="text-[10px] font-mono text-gray-500 uppercase block">Selected Services Requirements:</span>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {serviceOptions.map((svc) => {
                              const isChecked = newOrder.selected_services.includes(svc);
                              return (
                                <button
                                  key={svc}
                                  type="button"
                                  onClick={() => {
                                    setNewOrder(prev => ({
                                      ...prev,
                                      selected_services: prev.selected_services.includes(svc)
                                        ? prev.selected_services.filter(s => s !== svc)
                                        : [...prev.selected_services, svc]
                                    }));
                                  }}
                                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all flex items-center gap-1.5 ${
                                    isChecked 
                                      ? "bg-[#ab7df6]/15 border-[#ab7df6] text-[#ab7df6]" 
                                      : "bg-gray-950 border-gray-805 text-gray-400 hover:text-white"
                                  }`}
                                >
                                  {isChecked && <span className="w-1.5 h-1.5 rounded-full bg-[#ab7df6] animate-pulse"></span>}
                                  <span>{svc}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex justify-end pt-2 border-t border-gray-800/65">
                          <button
                            type="submit"
                            disabled={addingOrder}
                            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#ab7df6] hover:bg-white text-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus size={14} />
                            <span>{addingOrder ? "Adding..." : "Add Record"}</span>
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Table View block */}
                    <div className="bg-[#12161f] border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl text-left">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] border-collapse">
                          <thead>
                            <tr className="bg-gray-950/60 border-b border-gray-850 text-[10px] font-mono uppercase tracking-wider text-gray-400">
                              <th className="px-6 py-4 font-semibold text-left">Voucher UUID</th>
                              <th className="px-6 py-4 font-semibold text-left">Customer Name</th>
                              <th className="px-6 py-4 font-semibold text-left">Phone Number</th>
                              <th className="px-6 py-4 font-semibold text-left">Gmail Address</th>
                              <th className="px-6 py-4 font-semibold text-left">Committed Modules</th>
                              <th className="px-6 py-4 font-semibold text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-850 font-sans text-xs text-gray-300">
                            {orders.length === 0 ? (
                              <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-600 font-mono text-[11px]">
                                  No records currently configured. Try adding a test body row first!
                                </td>
                              </tr>
                            ) : (
                              orders.map((o) => (
                                <tr key={o.id} className="hover:bg-slate-900/40 transition-colors">
                                  <td className="px-6 py-4 font-mono text-[10px] text-gray-500 max-w-[120px] truncate" title={o.id}>
                                    {o.id || "LOCAL_CACHE"}
                                  </td>
                                  <td className="px-6 py-4 font-semibold text-white">
                                    {o.customer_name}
                                  </td>
                                  <td className="px-6 py-4 font-mono">
                                    {o.mobile}
                                  </td>
                                  <td className="px-6 py-4">
                                    {o.email}
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                      {o.selected_services && Array.isArray(o.selected_services) ? (
                                        o.selected_services.map((svc, sidx) => (
                                          <span 
                                            key={sidx} 
                                            className="px-2 py-0.5 rounded text-[9px] font-mono bg-indigo-500/10 border border-indigo-505/20 text-indigo-400"
                                          >
                                            {svc}
                                          </span>
                                        ))
                                      ) : (
                                        <span className="text-gray-600 font-mono italic">[null]</span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    <button
                                      onClick={() => handleDeleteOrder(o.id)}
                                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 transition-all cursor-pointer"
                                      title="Delete Order"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </motion.div>
                )}

              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
