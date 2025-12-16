// API Base URL - pekar på vår backend server
const API_URL = "http://localhost:3002/api";

// Type definition för Activity (matchar backend och befintlig Activity.ts)
import type { Activity } from "../data/Activity";

/**
 * Generera escape room aktiviteter med AI
 *
 * Anropar backend endpoint som använder Google Gemini AI för att skapa
 * dummy-data för escape rooms baserat på Activity-strukturen.
 *
 * @param count - Antal aktiviteter att generera (default: 5)
 * @returns Promise med array av Activity-objekt
 * @throws Error om API-anropet misslyckas
 */
export async function generateActivities(
  count: number = 5
): Promise<Activity[]> {
  console.log(`[Frontend] 🚀 Fetching ${count} activities from ${API_URL}/generate-activities`);
  
  // Testa först om backend svarar
  try {
    console.log(`[Frontend] 🔍 Testing backend connection...`);
    const healthCheck = await fetch(`${API_URL.replace('/api', '')}/api/health`, {
      method: "GET",
    });
    if (healthCheck.ok) {
      const health = await healthCheck.json();
      console.log(`[Frontend] ✅ Backend is alive:`, health);
    } else {
      console.warn(`[Frontend] ⚠️ Backend health check failed:`, healthCheck.status);
    }
  } catch (healthError) {
    console.error(`[Frontend] ❌ Cannot reach backend:`, healthError);
    throw new Error("Cannot connect to backend server. Make sure it's running on http://localhost:3002");
  }
  
  try {
    // Skapa en timeout för fetch-anropet (15 sekunder - ger backend mer tid)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log(`[Frontend] ⏱️ Timeout triggered after 15 seconds`);
      controller.abort();
    }, 15000);
    
    console.log(`[Frontend] 📤 Sending POST request...`);
    // Gör POST request till backend
    const response = await fetch(`${API_URL}/generate-activities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count }), // Skickar antal som vill generera
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log(`[Frontend] ✅ Response received:`, response.status, response.statusText);

    // Kolla om request lyckades
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response error:", errorText);
      throw new Error(`Failed to generate activities: ${response.status} ${response.statusText}`);
    }

    // Parse JSON-svaret från backend
    const data = await response.json();
    console.log("Response data:", data);

    // Backend returnerar { success: true, activities: [...] }
    if (!data.activities || !Array.isArray(data.activities)) {
      console.error("Invalid response format:", data);
      throw new Error("Invalid response format from server");
    }

    console.log(`Received ${data.activities.length} activities from server`);
    return data.activities;
  } catch (error: any) {
    console.error(`[Frontend] ❌ Error in generateActivities:`, error);
    if (error.name === 'AbortError') {
      console.error("[Frontend] ⏱️ Request was cancelled/timed out");
      throw new Error("Request timeout - backend took too long to respond");
    }
    if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      console.error("[Frontend] 🌐 Network error - backend may not be running or CORS issue");
      throw new Error("Cannot connect to backend server. Make sure it's running on http://localhost:3002");
    }
    console.error("[Frontend] Full error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
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
