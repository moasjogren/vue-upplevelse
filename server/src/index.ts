// Importerar Express framework för att skapa web server
import express from "express";
// Importerar CORS för att tillåta requests från frontend
import cors from "cors";
// Importerar dotenv för att läsa miljövariabler från .env
import dotenv from "dotenv";
// Importerar våra AI routes
import aiRoutes from "./routes/aiRoutes.js"; // OBS: .js extension för ES modules

// Laddar miljövariabler från .env filen
dotenv.config();

// Skapar Express app-instansen
const app = express();

// Hämtar port från miljövariabel, default till 3002 (3001 kan vara upptagen)
const PORT = process.env.PORT || 3002;

// ========== MIDDLEWARE ==========

// CORS - Tillåter frontend (Vue) att anropa backend
// Tillåter alla origins under utveckling för att undvika CORS-problem
app.use(
  cors({
    origin: true, // Tillåt alla origins under utveckling
    credentials: true,
  })
);

// JSON parser - Låter oss läsa JSON data i request body
app.use(express.json());

// Logger middleware - Loggar alla incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] 📥 ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`  📦 Body:`, JSON.stringify(req.body));
  }
  console.log(`  🌐 Origin:`, req.headers.origin || 'N/A');
  next();
});

// ========== ROUTES ==========

// Health check endpoint - För att testa att servern körs
app.get("/", (req, res) => {
  console.log(`[API] ✅ Health check requested`);
  res.json({
    message: "AI Backend Server is running! 🚀",
    endpoints: [
      "POST /api/generate-activities",
      "POST /api/recommend",
      "POST /api/chat",
      "POST /api/generate-story",
    ],
  });
});

// Ytterligare health check för API
app.get("/api/health", (req, res) => {
  console.log(`[API] ✅ API health check requested`);
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    geminiApiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Monterar AI routes på /api prefix
// Alla routes i aiRoutes.ts blir då /api/generate-activities etc.
app.use("/api", aiRoutes);

// ========== ERROR HANDLING ==========

// 404 handler - För okända routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

// Global error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Server error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
);

// ========== START SERVER ==========

// Startar servern och lyssnar på angiven port
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🤖 Google Gemini AI connected`);
});
