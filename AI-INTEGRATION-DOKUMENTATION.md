# AI-Integration Dokumentation

**Vue.js Escape Room + Groq AI** | December 2025

---

## 📖 Översikt

Escape room-bokningssida med Vue.js och Express som använder AI (Groq/Llama 3.3) för att dynamiskt generera escape rooms, chatbot-svar och scenarios istället för statisk dummy-data.

---

## 🎯 Implementerat

### Backend (Express + TypeScript)

- **generateActivities** - 12 AI escape rooms med titel, beskrivning, pris, svårighetsgrad
- **chatAssistant** - Chatbot för kundservice-frågor
- **generateStory** - Scenarios baserat på tema
- **recommendActivity** - Rekommendation (backend klar, UI saknas)

### Frontend (Vue 3 + TypeScript)

- **Home.vue** - AI-genererade rum, pagination, localStorage
- **ChatBot.vue** - Floating chat med AI-assistent
- **StoryGenerator.vue** - 8 fördefinierade teman + custom input
- **Card.vue** - Escape room-kort med detaljer

---

## 🚀 Snabbstart

**1. Installation:**

- Backend: `cd server && npm install`
- Frontend: `cd ../v-plain && npm install`

**2. Konfigurera:**

- Skapa `server/.env` med `GROQ_API_KEY=din-nyckel-här` och `PORT=3001`

**3. Starta:**

- Terminal 1: `cd server && npm run dev`
- Terminal 2: `cd v-plain && npm run dev`

**4. Öppna:** `http://localhost:5173`

- Klicka "🔄 Generera Nya Rum" → 12 AI escape rooms
- Klicka 💬 floating button → AI chatbot
- Gå till "Story Generator" → Generera scenarios

---

## 🤖 AI-Funktioner

### 1. Generate Activities

**Endpoint:** `POST /api/generate-activities`  
**Request:** `{ "count": 12 }`  
**Response:** Array med 12 escape rooms (id, title, description, difficulty, price, etc.)  
**Temperature:** 0.8 (kreativ men strukturerad)

### 2. Chat Assistant

**Endpoint:** `POST /api/chat`  
**Request:** `{ "message": "Vilken svårighetsgrad passar nybörjare?" }`  
**Response:** `{ "success": true, "reply": "För nybörjare..." }`  
**Temperature:** 0.7 (balanserad)

### 3. Generate Story

**Endpoint:** `POST /api/generate-story`  
**Request:** `{ "theme": "Spökhus" }`  
**Response:** `{ "success": true, "story": "100-150 ord scenario..." }`  
**Temperature:** 0.9 (maximalt kreativ)

### 4. Recommend Activity

**Endpoint:** `POST /api/recommend`  
**Request:** `{ "players": 4, "experience": "erfaren", "interests": "skräck" }`  
**Response:** `{ "success": true, "recommendation": "..." }`  
**Status:** Backend klar, frontend UI ej implementerad

---

## 🔄 Dataflöde (Exempel: Generera Aktiviteter)

1. USER: Klickar "Generera Nya Rum"
2. Home.vue: handleGenerateActivities() → sätter loading = true
3. aiService.ts: fetch POST /api/generate-activities
4. aiRoutes.ts: Validerar → anropar groqService.generateActivities(12)
5. groqService.ts: Bygger prompt → groq.chat.completions.create()
6. GROQ AI: Llama 3.3 genererar 12 escape rooms i JSON
7. Backend: Parsar JSON → tvingar rätt ID format → tilldelar bilder
8. Frontend: Tar emot data → localStorage → componentKey++ (re-render)
9. UI: 12 nya Card-komponenter visas

---

## 🎨 Frontend Komponenter

### Home.vue

**Features:**

- "Generera Nya Rum" knapp
- 12 AI-genererade escape rooms
- Pagination (6 rum per sida)
- localStorage persistence
- Floating chat-knapp (öppnar ChatBot)

### ChatBot.vue

**Features:**

- Floating button (bottom-right)
- Modal med chat-interface
- Message history (user/assistant)
- Loading state ("Skriver...")
- Enter-to-send

### StoryGenerator.vue

**Features:**

- 8 fördefinierade teman (Spökhus, Sci-Fi, Pyramid, etc.)
- Custom tema-input
- Genererar 100-150 ord story
- Copy-to-clipboard funktion

---

## 🔌 Backend API

**4 Endpoints:**

- `POST /api/generate-activities`
- `POST /api/chat`
- `POST /api/generate-story`
- `POST /api/recommend`

**Key Files:**

- `server/src/index.ts` - Express server med CORS och JSON parsing
- `server/src/routes/aiRoutes.ts` - API routes med validering
- `server/src/groqService.ts` - Groq AI logic med Llama 3.3-70b-versatile

---

## 🛠️ Teknisk Stack

### Frontend

- Vue 3.5.24 (Composition API)
- TypeScript
- Vite 7.2.4
- Vue Router 4.6.3
- Pinia 3.0.4 + persistedstate

### Backend

- Node.js v22.11.0
- Express
- TypeScript
- Groq SDK
- dotenv
- CORS

### AI

- Groq API platform
- Llama 3.3-70b-versatile
- Temperature: 0.7-0.9

---

## 📚 Lärdomar

### Vad Fungerade Bra ✅

- Centraliserad API Layer (`aiService.ts`)
- localStorage Persistence
- TypeScript för type safety
- Komponentisering (återanvändbara komponenter)
- Forced IDs (backend tvingar rätt format)
- Error handling

### Vad Kunde Förbättras ⚠️

- AI Response Time (5-10s känns långt)
- Rate Limiting saknas
- Image Loading (lazy loading)
- Testing (inga unit tests)
- Accessibility (ARIA labels, keyboard nav)

### Tips för Vidare Utveckling

1. **Prompt Engineering är Kritiskt** - Formulera bra prompts
2. **Temperature Matters** - Testa olika värden
3. **Validera AI Output** - AI kan returnera oväntad data
4. **Fallbacks** - Ha backup-data om AI misslyckas
5. **User Feedback** - Visa tydliga loading states

---

_Dokumentation uppdaterad: December 2025_
