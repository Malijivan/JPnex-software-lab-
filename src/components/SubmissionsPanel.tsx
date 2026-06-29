import { useState, useEffect } from "react";
import { Terminal, RefreshCw, ChevronUp, ChevronDown, MessageSquare, Clipboard, Server, Shield, CheckCircle } from "lucide-react";
import { ContactSubmission, ProjectOrder } from "../types";

export default function SubmissionsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [supabaseStatus, setSupabaseStatus] = useState("Not Configured");
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
        setOrders(data.orders || []);
        setSupabaseStatus(data.supabaseStatus || "Not Configured");
        setLastRefreshed(new Date().toLocaleTimeString());
      }
    } catch (e) {
      console.error("Dashboard list error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  return (
    <div
      id="dev-admin-console"
      className="fixed bottom-4 right-4 z-40 max-w-sm sm:max-w-md w-full transition-all duration-300"
    >
      <div className="bg-[#12161f]/95 border border-gray-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-md">
        
        {/* Toggle Bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-950/60 hover:bg-gray-950 transition-colors border-b border-gray-800 text-xs font-mono font-bold tracking-wider text-[#58a6ff]"
          id="btn-admin-drawer"
        >
          <div className="flex items-center space-x-2">
            <Terminal size={14} className="animate-pulse" />
            <span>JPNEX ADMINISTRATIVE COCKPIT</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            {lastRefreshed && <span className="text-[10px] text-gray-600 font-normal">SLA Synchronized</span>}
            {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </div>
        </button>

        {/* Drawer content */}
        {isOpen && (
          <div className="p-4 space-y-4 max-h-[350px] overflow-y-auto">
            
            {/* Status overview */}
            <div className="flex items-center justify-between bg-gray-950/80 border border-gray-850 p-2.5 rounded-lg text-[11px] font-mono">
              <div className="flex items-center space-x-1.5 text-gray-400">
                <Server size={12} />
                <span>Supabase:</span>
              </div>
              <span className={`font-semibold ${supabaseStatus === "Connected" ? 'text-emerald-400' : 'text-amber-400'}`}>
                {supabaseStatus === "Connected" ? "● Active Production" : "Offline (Local backup)"}
              </span>
              <button
                onClick={fetchData}
                disabled={loading}
                className="p-1 hover:bg-gray-900 border border-gray-800 rounded text-gray-400 hover:text-white transition-all disabled:opacity-40 cursor-pointer"
              >
                <RefreshCw size={10} className={loading ? "animate-spin" : ""} />
              </button>
            </div>

            {/* Submissions Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-1.5 text-[11px] font-mono text-gray-400">
                <MessageSquare size={12} className="text-[#58a6ff]" />
                <span>Contact Registry ({submissions.length})</span>
              </div>

              {submissions.length === 0 ? (
                <div className="py-4 text-center border border-dashed border-gray-850 rounded-xl text-gray-600 text-[11px] font-mono">
                  No submissions recorded yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {submissions.map((sub, sidx) => (
                    <div key={sub.id || sidx} className="p-3 bg-gray-950/40 border border-gray-850 rounded-xl text-left space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-white font-sans">{sub.name}</span>
                        <span className="text-[9px] text-[#58a6ff] font-mono uppercase bg-[#161b22] px-1 rounded">SUBMIT</span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">
                        {sub.mobile} | {sub.email}
                      </div>
                      <p className="text-[11px] text-gray-400 font-sans italic pt-1 border-t border-gray-850/60">
                        "{sub.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Orders Section */}
            <div className="space-y-3 pt-2 border-t border-gray-850">
              <div className="flex items-center space-x-1.5 text-[11px] font-mono text-gray-400">
                <Clipboard size={12} className="text-[#ab7df6]" />
                <span>Active Project Orders ({orders.length})</span>
              </div>

              {orders.length === 0 ? (
                <div className="py-4 text-center border border-dashed border-gray-850 rounded-xl text-gray-600 text-[11px] font-mono">
                  No project orders placed yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {orders.map((ord, oidx) => (
                    <div key={ord.id || oidx} className="p-3 bg-gray-950/40 border border-[#ab7df6]/15 rounded-xl text-left space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-white font-sans">{ord.customer_name}</span>
                        <span className="text-[9px] text-[#ab7df6] font-mono uppercase bg-[#161b22] px-1 rounded">SLA_OK</span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">
                        {ord.mobile} | {ord.email}
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1.5">
                        {ord.selected_services?.map((svc: string, sidx: number) => (
                          <span key={sidx} className="bg-[#ab7df6]/10 text-[#ab7df6] px-1.5 py-0.5 rounded text-[8px] font-mono">
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center text-[9px] text-gray-600 font-mono">
              JPNEX LAB ENCRYPTION SHIELD SECURED
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
