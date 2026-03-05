/**
 * Shem 72 API – Lambda Handler
 * Este archivo es el punto de entrada para AWS Lambda.
 * server.js sigue funcionando igual para desarrollo local.
 * #Code made by Emma Ledesma
 */

const serverless = require("serverless-http");
const express    = require("express");
const cors       = require("cors");

const angelRoutes = require("./routes/angels");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api/angels", angelRoutes);

// Ruta raíz → info de la API
app.get("/api", (req, res) => {
  res.json({
    name:    "Shem 72 API",
    version: "1.0.0",
    status:  "OK",
    author:  "Emma Ledesma",
    endpoints: {
      list_all:  "GET /api/angels",
      filter:    "GET /api/angels?zodiac=Aries&choir=Serafines",
      by_number: "GET /api/angels/:number",
      calculate: "GET /api/angels/calculate/:day/:month"
    }
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Exportar el handler para Lambda
module.exports.handler = serverless(app);