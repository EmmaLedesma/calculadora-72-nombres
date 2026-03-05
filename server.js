/**
 * Shem 72 API Server
 * #Code made by Emma Ledesma
 */

const express = require("express");
const cors = require("cors");
const path = require("path");

const angelRoutes = require("./routes/angels");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rutas API
app.use("/api/angels", angelRoutes);

// Ruta raíz → info de la API
app.get("/api", (req, res) => {
  res.json({
    name: "Shem 72 API",
    version: "1.0.0",
    status: "OK",
    author: "Emma Ledesma",
    endpoints: {
      list_all:      "GET /api/angels",
      filter:        "GET /api/angels?zodiac=Aries&choir=Serafines&sephira=Kether",
      by_number:     "GET /api/angels/:number",
      calculate:     "GET /api/angels/calculate/:day/:month"
    }
  });
});

// Cualquier otra ruta → index.html (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🔥 Shem 72 API running at http://localhost:${PORT}`);
  console.log(`📖 API docs: http://localhost:${PORT}/api`);
});
