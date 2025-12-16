// Laddar miljövariabler från .env filen FÖRST
import dotenv from "dotenv";
dotenv.config();

// Importerar Google Gemini SDK
import { GoogleGenerativeAI } from "@google/generative-ai";
// Skapar en Gemini-klient med API-nyckel från miljövariabeln
const apiKey = process.env.GEMINI_API_KEY || "";
if (!apiKey) {
  console.warn("[Gemini] ⚠️  WARNING: GEMINI_API_KEY is not set! AI generation will use mock data.");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

// TypeScript interface som definierar strukturen för en escape room aktivitet
// Matchar Activity-typen i v-plain/src/data/Activity.ts
export interface Activity {
  id: string; // Unikt ID för aktiviteten
  imgLink: string; // URL till bild
  title: string; // Namn på escape room
  description: string; // Beskrivning av aktiviteten
  difficulty: number; // Svårighetsgrad (1-5)
  capacity: number; // Antal personer (nummer, inte sträng)
  duration: number; // Tid i minuter
  price: number; // Pris i SEK
  ageRange: "barn" | "vuxen" | "senior"; // Åldersgrupp
  selectedDate?: string | null; // Valfritt datum
  players?: number | null; // Valfritt antal spelare
}

/**
 * FUNKTION 1: Generera escape room aktiviteter
 *
 * Denna funktion använder AI för att skapa dummy-data för escape rooms.
 * Den bygger en prompt (instruktion) till AI:n som beskriver exakt vilken
 * data som behövs, skickar till Google Gemini AI, och får tillbaka JSON-data.
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

  // Fallback: Generera mock-data om AI tar för lång tid
  const generateMockActivities = (): Activity[] => {
    const mockTitles = [
      "Det Mörka Biblioteket",
      "Tidsmaskinens Hemlighet",
      "Spökslottets Gåta",
      "Rymdstationens Kod",
      "Piraternas Skatt",
      "Alkemistens Laboratorium",
      "Det Försvunna Mysteriet",
      "Cyberpunk-uppdraget",
      "Vikingarnas Saga"
    ];
    const mockDescriptions = [
      "Ett mystiskt bibliotek där böcker försvinner och hemligheter gömmer sig. Hitta den försvunna boken innan tiden tar slut!",
      "En tidsmaskin har gått sönder och du måste reparera den innan tidslinjen kollapsar. Lösa pusslet kräver både logik och kreativitet.",
      "Ett gammalt spökslott med många hemligheter. Utforska rummen och lös mysteriet om vad som hände här för hundra år sedan.",
      "En rymdstation i fara! Hitta koden som kan rädda stationen innan syret tar slut. Teamwork är avgörande.",
      "En gammal piratskatt är gömd någonstans. Följ kartan och lös gåtorna för att hitta skatten innan andra gör det.",
      "En alkemist har lämnat efter sig ett laboratorium fullt av pussel. Skapa den magiska elixiren för att rädda världen.",
      "Ett mysterium där någon har försvunnit. Hitta ledtrådarna och lös fallet innan det är för sent.",
      "I en cyberpunk-framtid måste du hacka dig in i systemet och stoppa en ond AI. Teknisk kunskap krävs!",
      "En vikingasaga där du måste hjälpa vikingarna att hitta hem. Navigera genom historien och lös gåtorna."
    ];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `room-${i + 1}`,
      imgLink: images[i] ?? images[0] ?? "",
      title: mockTitles[i % mockTitles.length] + (i >= mockTitles.length ? ` ${Math.floor(i / mockTitles.length) + 1}` : ""),
      description: mockDescriptions[i % mockDescriptions.length] || "En spännande escape room-upplevelse!",
      difficulty: Math.floor(Math.random() * 3) + 2, // 2-4
      capacity: Math.floor(Math.random() * 5) + 3, // 3-7
      duration: Math.floor(Math.random() * 30) + 60, // 60-90
      price: Math.floor(Math.random() * 200) + 250, // 250-450
      ageRange: (["barn", "vuxen", "senior"] as const)[Math.floor(Math.random() * 3)] || "vuxen",
    }));
  };

  // Förenklad prompt för snabbare generering
  const prompt = `Generate ${count} escape room activities as JSON array. Each activity: id (format "room-1"), imgLink (empty string), title (Swedish, max 40 chars), description (Swedish, 80-100 words), difficulty (1-5), capacity (2-8), duration (60-90 minutes), price (250-450 SEK), ageRange ("barn", "vuxen", or "senior"). Return ONLY valid JSON array, no markdown.`;

  // Skickar prompten till Gemini AI med timeout
  console.log(`[Gemini] Sending request to generate ${count} activities...`);
  console.log(`[Gemini] API Key present: ${!!apiKey}`);
  const startTime = Date.now();
  
  // Om ingen API-nyckel finns, använd mock-data direkt
  if (!apiKey) {
    console.log(`[Gemini] No API key, using mock data immediately`);
    return generateMockActivities();
  }
  
  try {
    // Skapa en Promise med timeout (10 sekunder)
    const generatePromise = model.generateContent(prompt);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Gemini API timeout after 10 seconds")), 10000);
    });
    
    const result = await Promise.race([generatePromise, timeoutPromise]) as any;
    const duration = Date.now() - startTime;
    console.log(`[Gemini] Received response from AI after ${duration}ms`);

    // Extraherar svaret från AI:n
    const response = result.response;
    let content = response.text() || "[]";
    console.log(`[Gemini] Raw response length: ${content.length} characters`);
    console.log(`[Gemini] Raw response preview: ${content.substring(0, 200)}...`);

    // Rensa bort eventuella markdown code blocks (```json ... ```)
    content = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    // Konverterar JSON-strängen till JavaScript-objekt
    console.log(`[Gemini] Parsing JSON response...`);
    let activities: Activity[];
    try {
      activities = JSON.parse(content);
    } catch (parseError) {
      console.error(`[Gemini] JSON parse error:`, parseError);
      console.error(`[Gemini] Content that failed to parse:`, content.substring(0, 500));
      throw new Error(`Failed to parse AI response as JSON: ${parseError}`);
    }

    console.log(`[Gemini] Parsed ${activities.length} activities`);

    // TVINGA rätt ID och bilder - ignorera vad AI:n säger
    activities.forEach((activity, index) => {
      // Tvinga rätt ID format: room-1, room-2, room-3, etc.
      activity.id = `room-${index + 1}`;
      // Sätt rätt bild för varje rum
      activity.imgLink = images[index] ?? images[0] ?? "";
    });

    console.log(`[Gemini] Returning ${activities.length} activities`);
    return activities;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`[Gemini] ❌ Error after ${duration}ms:`);
    console.error(`[Gemini] Error message:`, error.message);
    console.error(`[Gemini] Error name:`, error.name);
    if (error.stack) {
      console.error(`[Gemini] Error stack:`, error.stack.substring(0, 500));
    }
    if (error.cause) {
      console.error(`[Gemini] Error cause:`, error.cause);
    }
    console.log(`[Gemini] Falling back to mock data...`);
    // Returnera mock-data istället för att krascha
    return generateMockActivities();
  }
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

  // Skickar till Gemini AI
  const result = await model.generateContent(prompt);
  const response = result.response;

  // Returnerar rekommendationen som text
  return response.text() || "No recommendation available.";
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
  // Gemini använder system instructions i prompten istället för system role
  const prompt = `You are a helpful escape room booking assistant. Answer questions about escape rooms, difficulty levels, pricing, and booking.

User question: ${message}`;

  const result = await model.generateContent(prompt);
  const response = result.response;

  return response.text() || "Sorry, I couldn't process that.";
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

  const result = await model.generateContent(prompt);
  const response = result.response;

  return response.text() || "Story generation failed.";
}
