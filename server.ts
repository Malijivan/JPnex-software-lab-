import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load configuration
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Supabase client disabled by request
let supabase: any = null;

console.log("Supabase connection disabled. Server will use local JSON persistence.");

// Ensure local storage directory exists
const DATA_DIR = path.resolve(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

// Helper to load local data
function readLocalFile(filePath: string): any[] {
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// Helper to save local data
function writeLocalFile(filePath: string, data: any[]) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Local save failed:", e);
  }
}

// ------------------- API ROUTES -------------------

// 1. Submit contact message (Save to table "contact_submissions")
app.post("/api/contact", async (req, res) => {
  const { name, mobile, email, message } = req.body;

  if (!name || !mobile || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const submission = {
    name,
    mobile,
    email,
    message,
    created_at: new Date().toISOString(),
  };

  let savedToSupabase = false;
  let errorDetails = null;

  // Attempt to write to Supabase
  if (supabase) {
    try {
      const { error } = await (supabase.from("contact_submissions") as any)
        .insert([submission]);

      if (error) {
        throw error;
      }
      savedToSupabase = true;
    } catch (err: any) {
      console.error("Supabase submission error:", err);
      errorDetails = err.message || err;
    }
  }

  // Always write fallback to local file
  const localList = readLocalFile(SUBMISSIONS_FILE);
  localList.push({ ...submission, id: `c_${Date.now()}` });
  writeLocalFile(SUBMISSIONS_FILE, localList);

  res.status(200).json({
    success: true,
    message: "Submission saved successfully",
    savedToSupabase,
    localCount: localList.length,
    errorDetails,
  });
});

// 2. Place order (Save to table "project_orders")
app.post("/api/orders", async (req, res) => {
  const { customer_name, mobile, email, selected_services } = req.body;

  if (!customer_name || !mobile || !email || !selected_services || !Array.isArray(selected_services)) {
    return res.status(400).json({ error: "Customer details and selected services are required" });
  }

  const order = {
    customer_name,
    mobile,
    email,
    selected_services,
    created_at: new Date().toISOString(),
  };

  let savedToSupabase = false;
  let errorDetails = null;

  // Attempt to write to Supabase
  if (supabase) {
    try {
      const { error } = await (supabase.from("project_orders") as any)
        .insert([order]);

      if (error) {
        throw error;
      }
      savedToSupabase = true;
    } catch (err: any) {
      console.error("Supabase order error:", err);
      errorDetails = err.message || err;
    }
  }

  // Always write fallback to local file
  const localList = readLocalFile(ORDERS_FILE);
  localList.push({ ...order, id: `o_${Date.now()}` });
  writeLocalFile(ORDERS_FILE, localList);

  res.status(200).json({
    success: true,
    message: "Order placed successfully",
    savedToSupabase,
    localCount: localList.length,
    errorDetails,
  });
});

// 3. Fetch submissions & orders (For co-founder viewing option / debugging in preview)
app.get("/api/dashboard", async (req, res) => {
  let submissions = [];
  let orders = [];

  if (supabase) {
    try {
      const { data: subData, error: subError } = await (supabase.from("contact_submissions") as any)
        .select("*")
        .order("created_at", { ascending: false });
      const { data: ordData, error: ordError } = await (supabase.from("project_orders") as any)
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!subError && subData) submissions = subData;
      else submissions = readLocalFile(SUBMISSIONS_FILE);

      if (!ordError && ordData) orders = ordData;
      else orders = readLocalFile(ORDERS_FILE);
    } catch (e) {
      console.error("Supabase check fell back to local reading:", e);
      submissions = readLocalFile(SUBMISSIONS_FILE);
      orders = readLocalFile(ORDERS_FILE);
    }
  } else {
    submissions = readLocalFile(SUBMISSIONS_FILE);
    orders = readLocalFile(ORDERS_FILE);
  }

  submissions.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  orders.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  res.json({
    submissions,
    orders,
    supabaseStatus: supabase !== null ? "Connected" : "Not Configured",
  });
});

// 4. Admin Add Custom Contact Submission Row
app.post("/api/dashboard/contacts", async (req, res) => {
  const { name, mobile, email, message } = req.body;
  if (!name || !mobile || !email) {
    return res.status(400).json({ error: "Name, mobile, and email are required" });
  }

  const submission = {
    name,
    mobile,
    email,
    message: message || "System Inserted via Admin Dashboard",
    created_at: new Date().toISOString(),
  };

  let savedToSupabase = false;
  let supabaseData: any = null;

  if (supabase) {
    try {
      const { data, error } = await (supabase.from("contact_submissions") as any)
        .insert([submission])
        .select();
      if (!error && data) {
        savedToSupabase = true;
        supabaseData = data;
      }
    } catch (err: any) {
      console.error("Admin insert contact error:", err);
    }
  }

  const localList = readLocalFile(SUBMISSIONS_FILE);
  const newLocal = { ...submission, id: supabaseData?.[0]?.id || `c_${Date.now()}` };
  localList.push(newLocal);
  writeLocalFile(SUBMISSIONS_FILE, localList);

  res.status(200).json({
    success: true,
    savedToSupabase,
    data: newLocal,
  });
});

// 5. Admin Add Custom Project Order Row
app.post("/api/dashboard/orders", async (req, res) => {
  const { customer_name, mobile, email, selected_services } = req.body;
  if (!customer_name || !mobile || !email || !selected_services || !Array.isArray(selected_services)) {
    return res.status(400).json({ error: "Customer details and selected services are required" });
  }

  const order = {
    customer_name,
    mobile,
    email,
    selected_services,
    created_at: new Date().toISOString(),
  };

  let savedToSupabase = false;
  let supabaseData: any = null;

  if (supabase) {
    try {
      const { data, error } = await (supabase.from("project_orders") as any)
        .insert([order])
        .select();
      if (!error && data) {
        savedToSupabase = true;
        supabaseData = data;
      }
    } catch (err: any) {
      console.error("Admin insert order error:", err);
    }
  }

  const localList = readLocalFile(ORDERS_FILE);
  const newLocal = { ...order, id: supabaseData?.[0]?.id || `o_${Date.now()}` };
  localList.push(newLocal);
  writeLocalFile(ORDERS_FILE, localList);

  res.status(200).json({
    success: true,
    savedToSupabase,
    data: newLocal,
  });
});

// 6. Admin Delete Contact Submission Row
app.delete("/api/dashboard/contacts/:id", async (req, res) => {
  const { id } = req.params;
  let deletedFromSupabase = false;
  let supabaseError = null;

  if (supabase) {
    try {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (isUUID) {
        const { error } = await (supabase.from("contact_submissions") as any)
          .delete()
          .eq("id", id);
        if (!error) {
          deletedFromSupabase = true;
        } else {
          supabaseError = error.message || "Unknown Supabase Error";
          console.error("Supabase delete error details:", error);
        }
      }
    } catch (err: any) {
      supabaseError = err.message || "Catch block error";
      console.error("Supabase delete contact error:", err);
    }
  }

  // Local state update
  const localList = readLocalFile(SUBMISSIONS_FILE);
  const updatedList = localList.filter((item: any) => item.id !== id);
  writeLocalFile(SUBMISSIONS_FILE, updatedList);

  if (supabase && supabaseError) {
    return res.status(403).json({
      success: false,
      error: `Could not delete from Supabase (Row Level Security missing DELETE policy?). Details: ${supabaseError}`
    });
  }

  res.json({
    success: true,
    deletedFromSupabase,
  });
});

// 7. Admin Delete Project Order Row
app.delete("/api/dashboard/orders/:id", async (req, res) => {
  const { id } = req.params;
  let deletedFromSupabase = false;
  let supabaseError = null;

  if (supabase) {
    try {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (isUUID) {
        const { error } = await (supabase.from("project_orders") as any)
          .delete()
          .eq("id", id);
        if (!error) {
          deletedFromSupabase = true;
        } else {
          supabaseError = error.message || "Unknown Supabase Error";
          console.error("Supabase delete error details:", error);
        }
      }
    } catch (err: any) {
      supabaseError = err.message || "Catch block error";
      console.error("Supabase delete order error:", err);
    }
  }

  // Local state update
  const localList = readLocalFile(ORDERS_FILE);
  const updatedList = localList.filter((item: any) => item.id !== id);
  writeLocalFile(ORDERS_FILE, updatedList);

  if (supabase && supabaseError) {
    return res.status(403).json({
      success: false,
      error: `Could not delete from Supabase (Row Level Security missing DELETE policy?). Details: ${supabaseError}`
    });
  }

  res.json({
    success: true,
    deletedFromSupabase,
  });
});

// Vite Middleware & SPA serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
