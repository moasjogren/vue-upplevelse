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
  // Bygger prompten (instruktionen) till AI:n
  // Vi specificerar exakt vilka fält vi behöver och vilken typ av data
  const prompt = `Generate ${count} unique escape room activities in JSON format. Each activity should have:
  - id: random string
  - imgLink: placeholder image URL
  - title: creative escape room name
  - description: engaging description (50-100 words)
  - difficulty: number 1-5
  - capacity: string like "2-6" or "4-8"
  - age: minimum age (10-18)
  - duration: time in minutes (45-120)
  - price: price in SEK (200-500)
  - players: current number of players (0-10)
  
  Return ONLY a JSON array, no other text.`;

  // Skickar prompten till Groq AI och väntar på svar
  const response = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }], // Skickar som användar-meddelande
    model: "llama-3.1-70b-versatile", // Använder Llama 3.1 (stor, smart modell)
    temperature: 0.8, // Kreativitet (0-1, högre = mer kreativ)
  });

  // Extraherar svaret från AI:n
  // choices[0] = första svaret (AI kan ge flera alternativ)
  // ?.message?.content = säker navigering (undviker error om något saknas)
  // || "[]" = fallback till tom array om inget svar finns
  const content = response.choices[0]?.message?.content || "[]";

  // Konverterar JSON-strängen till JavaScript-objekt och returnerar
  return JSON.parse(content);
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
    model: "llama-3.1-70b-versatile",
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
    model: "llama-3.1-70b-versatile",
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
    model: "llama-3.1-70b-versatile",
    temperature: 0.9, // HÖGSTA kreativiteten för unika, varierade stories
  });

  return response.choices[0]?.message?.content || "Story generation failed.";
}
