// API Base URL - pekar på vår backend server
const API_URL = "http://localhost:3001/api";

// Type definition för Activity (matchar backend och befintlig Activity.ts)
export interface Activity {
  id: string;
  imgLink: string;
  title: string;
  description: string;
  difficulty: number;
  capacity: string;
  age: number;
  duration: number;
  price: number;
  players: number;
}

/**
 * Generera escape room aktiviteter med AI
 *
 * Anropar backend endpoint som använder Groq AI för att skapa
 * dummy-data för escape rooms baserat på Activity-strukturen.
 *
 * @param count - Antal aktiviteter att generera (default: 5)
 * @returns Promise med array av Activity-objekt
 * @throws Error om API-anropet misslyckas
 */
export async function generateActivities(
  count: number = 5
): Promise<Activity[]> {
  // Gör POST request till backend
  const response = await fetch(`${API_URL}/generate-activities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count }), // Skickar antal som vill generera
  });

  // Kolla om request lyckades
  if (!response.ok) {
    throw new Error("Failed to generate activities");
  }

  // Parse JSON-svaret från backend
  const data = await response.json();

  // Backend returnerar { success: true, activities: [...] }
  return data.activities;
}

/**
 * Chatta med AI-assistenten
 *
 * Skickar användarens meddelande till AI-assistenten och får svar tillbaka.
 *
 * @param message - Användarens fråga/meddelande
 * @returns Promise med AI:ns svar som sträng
 * @throws Error om API-anropet misslyckas
 */
export async function chatWithAssistant(message: string): Promise<string> {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to chat with assistant");
  }

  const data = await response.json();
  return data.reply;
}

/**
 * Generera en story/scenario för escape room
 *
 * Baserat på ett tema genererar AI ett komplett scenario.
 *
 * @param theme - Temat för escape room (t.ex. "spökhus", "sci-fi")
 * @returns Promise med story-text
 * @throws Error om API-anropet misslyckas
 */
export async function generateStory(theme: string): Promise<string> {
  const response = await fetch(`${API_URL}/generate-story`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ theme }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate story");
  }

  const data = await response.json();
  return data.story;
}
