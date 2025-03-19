// src/server.ts
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { buildChoiceData } from "./buildData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Some data endpoint
app.get("/api/choices", (req, res) => {
  const data = buildChoiceData();
  res.json(data);
});

// Serve static files from dist/client
const clientDir = path.resolve(__dirname, "client");
app.use(express.static(clientDir));

// Catch-all route to serve index.html (for any client-side routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDir, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
