// Importerar Express och dess typer för att skapa API endpoints
import express from "express";
// Importerar AI-funktionerna från groqService
import {
  generateActivities,
  recommendActivity,
  chatAssistant,
  generateStory,
} from "../groqService.js"; // OBS: .js extension krävs för ES modules

// Skapar en ny router-instans
const router = express.Router();

/**
 * POST /api/generate-activities
 *
 * Genererar escape room aktiviteter med AI
 * Body: { count: number } - Antal aktiviteter att generera (default: 5)
 * Response: { success: true, activities: Activity[] }
 */
router.post(
  "/generate-activities",
  async (req: express.Request, res: express.Response) => {
    try {
      // Hämtar antal från request body, default till 5 om inget anges
      const { count = 5 } = req.body;

      // Anropar AI-funktionen för att generera aktiviteter
      const activities = await generateActivities(count);

      // Skickar tillbaka success response med data
      res.json({
        success: true,
        activities,
      });
    } catch (error) {
      // Om något går fel, logga error och skicka error response
      console.error("Error generating activities:", error);
      res.status(500).json({
        success: false,
        error: "Failed to generate activities",
      });
    }
  }
);

/**
 * POST /api/recommend
 *
 * Rekommenderar escape room baserat på användarens preferenser
 * Body: { players: number, experience: string, interests: string }
 * Response: { success: true, recommendation: string }
 */
router.post(
  "/recommend",
  async (req: express.Request, res: express.Response) => {
    try {
      // Hämtar preferenser från request body
      const { players, experience, interests } = req.body;

      // Validerar att alla required fields finns
      if (!players || !experience || !interests) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: players, experience, interests",
        });
      }

      // Anropar AI för att få rekommendation
      const recommendation = await recommendActivity({
        players,
        experience,
        interests,
      });

      res.json({
        success: true,
        recommendation,
      });
    } catch (error) {
      console.error("Error getting recommendation:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get recommendation",
      });
    }
  }
);

/**
 * POST /api/chat
 *
 * Chatbot som svarar på frågor om escape rooms
 * Body: { message: string }
 * Response: { success: true, reply: string }
 */
router.post("/chat", async (req: express.Request, res: express.Response) => {
  try {
    // Hämtar användarens meddelande
    const { message } = req.body;

    // Validerar att meddelande finns
    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    // Anropar chatbot-funktionen
    const reply = await chatAssistant(message);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Error in chat:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process chat message",
    });
  }
});

/**
 * POST /api/generate-story
 *
 * Genererar ett escape room scenario baserat på tema
 * Body: { theme: string }
 * Response: { success: true, story: string }
 */
router.post(
  "/generate-story",
  async (req: express.Request, res: express.Response) => {
    try {
      // Hämtar temat från request body
      const { theme } = req.body;

      // Validerar att tema finns
      if (!theme) {
        return res.status(400).json({
          success: false,
          error: "Theme is required",
        });
      }

      // Genererar story med AI
      const story = await generateStory(theme);

      res.json({
        success: true,
        story,
      });
    } catch (error) {
      console.error("Error generating story:", error);
      res.status(500).json({
        success: false,
        error: "Failed to generate story",
      });
    }
  }
);

// Exporterar routern så den kan användas i index.ts
export default router;
