// Laddar miljövariabler från .env filen FÖRST
import dotenv from "dotenv";
dotenv.config();

// Importerar Groq SDK för att kommunicera med Groq AI
import Groq from "groq-sdk";
// Skapar en Groq-klient med API-nyckel från miljövariabeln
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// TypeScript interface som definierar strukturen för en escape room aktivitet
// Matchar Activity-typen i v-plain/src/data/Activity.ts
export interface Activity {
  id: string; // Unikt ID för aktiviteten
  imgLink: string; // URL till bild
  title: string; // Namn på escape room
  description: string; // Beskrivning av aktiviteten
  difficulty: number; // Svårighetsgrad (1-5)
  capacity: string; // Antal spelare (t.ex. "2-6")
  age: number; // Minimiålder
  duration: number; // Tid i minuter
  price: number; // Pris i SEK
  players: number; // Nuvarande antal bokade spelare
}

/**
 * FUNKTION 1: Generera escape room aktiviteter
 *
 * Denna funktion använder AI för att skapa dummy-data för escape rooms.
 * Den bygger en prompt (instruktion) till AI:n som beskriver exakt vilken
 * data som behövs, skickar till Groq AI, och får tillbaka JSON-data.
 *
 * @param count - Antal aktiviteter att generera (default: 5)
 * @returns Promise med array av Activity-objekt
 */
export async function generateActivities(
  count: number = 5
): Promise<Activity[]> {
  // Statiska escape room bilder - helt olika för varje rum
  const images = [
    "https://images.unsplash.com/photo-1528892677828-8862216f3665?w=800&q=80", // room-1 - mystery room
    "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80", // room-2 - escape room
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80", // room-3 - clock mechanism
    "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&q=80", // room-4 - library books
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80", // room-5 - dark corridor
    "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&q=80", // room-6 - tech equipment
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80", // room-7 - industrial
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", // room-8 - technology
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80", // room-9 - vintage books
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80", // room-10 - old door
    "https://images.unsplash.com/photo-1506702315536-dd8b83e2dcf9?w=800&q=80", // room-11 - mystical
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80", // room-12 - clock tower
  ];

  // Bygger prompten - AI genererar allt UTOM imgLink (vi sätter det själva)
  const prompt = `Generate ${count} unique escape room activities in JSON format. Each activity should have:
  - id: simple string with format "room-1", "room-2", "room-3" etc (use sequential numbers starting from 1)
  - imgLink: leave as empty string "" (we will set this)
  - title: creative Swedish escape room name (max 40 characters, exciting and mysterious)
  - description: engaging Swedish description (exactly 80-100 words, describe the mystery and challenge)
  - difficulty: number 1-5
  - capacity: string like "2-6" or "4-8"
  - age: minimum age (12-18)
  - duration: time in minutes (60-90)
  - price: price in SEK (250-450)
  - players: current number of players (0-5)
  
  IMPORTANT: Return ONLY a valid JSON array with no markdown, no code blocks, no extra text. Just the raw JSON array.`;

  // Skickar prompten till Groq AI och väntar på svar
  const response = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }], // Skickar som användar-meddelande
    model: "llama-3.3-70b-versatile", // Använder Llama 3.3 (stor, smart modell)
    temperature: 0.8, // Kreativitet (0-1, högre = mer kreativ)
  });

  // Extraherar svaret från AI:n
  // choices[0] = första svaret (AI kan ge flera alternativ)
  // ?.message?.content = säker navigering (undviker error om något saknas)
  // || "[]" = fallback till tom array om inget svar finns
  let content = response.choices[0]?.message?.content || "[]";

  // Rensa bort eventuella markdown code blocks (```json ... ```)
  content = content
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  // Konverterar JSON-strängen till JavaScript-objekt
  const activities: Activity[] = JSON.parse(content);

  // TVINGA rätt ID och bilder - ignorera vad AI:n säger
  activities.forEach((activity, index) => {
    // Tvinga rätt ID format: room-1, room-2, room-3, etc.
    activity.id = `room-${index + 1}`;
    // Sätt rätt bild för varje rum
    activity.imgLink = images[index] ?? images[0] ?? "";
  });

  return activities;
}

/**
 * FUNKTION 2: Rekommendera escape room baserat på preferenser
 *
 * Användaren anger antal spelare, erfarenhetsnivå och intressen.
 * AI:n analyserar detta och ger en personlig rekommendation.
 *
 * @param preferences - Objekt med användarens preferenser
 * @returns Promise med rekommendationstext
 */
export async function recommendActivity(preferences: {
  players: number; // Antal spelare
  experience: string; // Erfarenhetsnivå (t.ex. "nybörjare", "erfaren")
  interests: string; // Intressen (t.ex. "skräck", "mysterium", "äventyr")
}): Promise<string> {
  // Bygger prompt med användarens specifika önskemål
  const prompt = `Based on these preferences, recommend an escape room:
  - Number of players: ${preferences.players}
  - Experience level: ${preferences.experience}
  - Interests: ${preferences.interests}
  
  Provide a brief recommendation (2-3 sentences).`;

  // Skickar till AI med lite lägre temperatur för mer fokuserat svar
  const response = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7, // Lite lägre kreativitet för mer relevant svar
  });

  // Returnerar rekommendationen som text
  return (
    response.choices[0]?.message?.content || "No recommendation available."
  );
}

/**
 * FUNKTION 3: Chatbot assistent
 *
 * Användaren kan ställa frågor om escape rooms (svårighetsgrader, priser,
 * bokning, etc.) och få svar från AI-assistenten.
 *
 * Skillnad från andra funktioner: Använder "system" role för att definiera
 * AI:ns personlighet och uppgift.
 *
 * @param message - Användarens fråga
 * @returns Promise med assistentens svar
 */
export async function chatAssistant(message: string): Promise<string> {
  const response = await groq.chat.completions.create({
    messages: [
      {
        // SYSTEM role = Definierar AI:ns beteende och expertis
        role: "system",
        content:
          "You are a helpful escape room booking assistant. Answer questions about escape rooms, difficulty levels, pricing, and booking.",
      },
      {
        // USER role = Användarens faktiska fråga
        role: "user",
        content: message,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7, // Balanserad kreativitet för konversation
  });

  return (
    response.choices[0]?.message?.content || "Sorry, I couldn't process that."
  );
}

/**
 * FUNKTION 4: Generera escape room story/scenario
 *
 * Baserat på ett tema (t.ex. "haunted mansion", "sci-fi laboratory")
 * genererar AI:n ett komplett scenario med backstory, utmaning och mål.
 *
 * @param theme - Temat för escape room
 * @returns Promise med story-text
 */
export async function generateStory(theme: string): Promise<string> {
  // Prompt som ber AI skapa en engagerande story
  const prompt = `Create a unique escape room scenario with the theme: ${theme}
  Include:
  - Setting and backstory
  - The challenge/mystery
  - What players need to accomplish
  
  Keep it engaging and around 100-150 words.`;

  const response = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.9, // HÖGSTA kreativiteten för unika, varierade stories
  });

  return response.choices[0]?.message?.content || "Story generation failed.";
}
