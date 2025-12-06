# AI-Integration Arbetsflöde

## Översikt

Detta dokument förklarar hur AI-integrationen fungerar i escape room-applikationen.

## Arkitektur

```
Frontend (Vue.js) → Backend (Express) → Groq AI → Backend → Frontend
```

## Grundläggande Flöde

### 1. Frontend Initierar

- Användaren klickar på knapp
- Vue-komponent gör `fetch()` till backend

### 2. Backend Tar Emot

- Express route i `aiRoutes.ts` tar emot request
- Anropar funktion i `groqService.ts`

### 3. AI Processar

- `groqService.ts` bygger prompt (instruktion)
- Skickar till Groq AI via SDK
- AI genererar svar

### 4. Backend Returnerar

- Formaterar AI-svar
- Skickar till frontend

### 5. Frontend Visar

- Uppdaterar state/store
- Renderar UI med nya data

## De 4 AI-Funktionerna

### 1. generateActivities()

**Syfte:** Generera dummy escape room-data  
**Input:** Antal aktiviteter  
**Output:** Array av Activity-objekt  
**Temperature:** 0.8 (kreativ)

### 2. recommendActivity()

**Syfte:** Rekommendera escape room baserat på preferenser  
**Input:** { players, experience, interests }  
**Output:** Rekommendationstext  
**Temperature:** 0.7 (balanserad)

### 3. chatAssistant()

**Syfte:** Chatbot som svarar på frågor  
**Input:** Användarens meddelande  
**Output:** Assistentens svar  
**Temperature:** 0.7 (balanserad)  
**Special:** Använder "system" role för att definiera personlighet

### 4. generateStory()

**Syfte:** Skapa escape room-scenario  
**Input:** Tema (t.ex. "haunted mansion")  
**Output:** Story-text  
**Temperature:** 0.9 (mest kreativ)

## Viktiga Koncept

### Temperature

- **0.0-0.3:** Förutsägbar, faktabaserad
- **0.4-0.7:** Balanserad
- **0.8-1.0:** Kreativ, varierad

### Async/Await

- Alla AI-anrop är asynkrona (tar tid)
- `async function` returnerar Promise
- `await` väntar på svar

### Säkerhet

- API-nyckel i `.env` (aldrig i kod)
- `.env` i `.gitignore` (pushas ej)
- CORS aktiverat för frontend

## Exempel: Komplett Request

```
1. User: Klickar "Generera aktiviteter"
2. Frontend: POST /api/generate-activities { count: 5 }
3. Backend: groqService.generateActivities(5)
4. Groq AI: Genererar 5 escape rooms
5. Backend: Returnerar JSON
6. Frontend: Visar kort i UI
```

## Felsökning

- **"API key not found"** → Kolla `.env`
- **CORS error** → Aktivera CORS i backend
- **JSON parse error** → AI returnerade ogiltig data
- **Timeout** → AI-anrop tog för lång tid

## Nästa Steg

1. ✅ Skapat groqService.ts
2. → Skapa API routes (aiRoutes.ts)
3. → Skapa Express server (index.ts)
4. → Testa med Postman
5. → Bygg frontend-komponenter
