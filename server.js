import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 SUPABASE
const supabase = createClient(
  "https://mtyoiozghdnudciydiez.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10eW9pb3pnaGRudWRjaXlkaWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3OTY1NDEsImV4cCI6MjA5MjM3MjU0MX0.yWodFKKb3wMhZAgXwDTBn1dpy-6W3bzepFUK9bkUzH8"
);

// ================= ROUTES =================

// GET QUEUE
app.get("/queue", async (req, res) => {
  const { data, error } = await supabase.from("queue").select("*");

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// REMOVE PLAYER
app.post("/remove", async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "No name provided" });

  const { error } = await supabase
    .from("queue")
    .delete()
    .eq("name", name);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ success: true });
});

// RESET QUEUE
app.post("/reset", async (req, res) => {
  const { error } = await supabase
    .from("queue")
    .delete()
    .neq("userId", "0");

  if (error) return res.status(500).json({ error: error.message });

  res.json({ success: true });
});

// ================= START =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 API läuft auf Port " + PORT);
});