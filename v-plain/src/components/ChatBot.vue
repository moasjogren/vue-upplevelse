<script setup lang="ts">
import { ref } from "vue";
import { chatWithAssistant } from "../services/aiService";

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["close"]);

const message = ref("");
const messages = ref<{ role: "user" | "assistant"; content: string }[]>([]);
const loading = ref(false);

const sendMessage = async () => {
  if (!message.value.trim() || loading.value) return;

  const userMessage = message.value;
  messages.value.push({ role: "user", content: userMessage });
  message.value = "";
  loading.value = true;

  try {
    const response = await chatWithAssistant(userMessage);
    messages.value.push({ role: "assistant", content: response });
  } catch (error) {
    messages.value.push({
      role: "assistant",
      content: "Ursäkta, något gick fel. Försök igen.",
    });
  } finally {
    loading.value = false;
  }
};

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <h2>🤖 AI Assistent</h2>
        <button class="close-btn" @click="handleClose">&times;</button>
      </div>

      <div class="chat-container">
        <div class="messages">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['message', msg.role]"
          >
            <div class="message-content">{{ msg.content }}</div>
          </div>
          <div v-if="loading" class="message assistant">
            <div class="message-content typing">Skriver...</div>
          </div>
        </div>
      </div>

      <div class="input-container">
        <input
          v-model="message"
          @keyup.enter="sendMessage"
          placeholder="Ställ en fråga om escape rooms..."
          :disabled="loading"
        />
        <button @click="sendMessage" :disabled="loading || !message.trim()">
          Skicka
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--main-box-color);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--main-bg-color);
}

.modal-header h2 {
  margin: 0;
  color: var(--secondary-action-color);
}

.close-btn {
  background: none;
  border: none;
  font-size: 32px;
  color: var(--text-color);
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.close-btn:hover {
  color: var(--action-color);
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  min-height: 300px;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  max-width: 80%;
}

.message.user {
  align-self: flex-end;
}

.message.assistant {
  align-self: flex-start;
}

.message-content {
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
}

.message.user .message-content {
  background-color: var(--action-color);
  color: var(--text-color);
}

.message.assistant .message-content {
  background-color: var(--main-bg-color);
  color: var(--text-color);
}

.typing {
  font-style: italic;
  opacity: 0.7;
}

.input-container {
  display: flex;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid var(--main-bg-color);
}

.input-container input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--main-bg-color);
  background-color: var(--main-bg-color);
  color: var(--text-color);
  font-size: 16px;
}

.input-container input:focus {
  outline: none;
  border-color: var(--action-color);
}

.input-container button {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background-color: var(--action-color);
  color: var(--text-color);
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.input-container button:hover:not(:disabled) {
  opacity: 0.8;
}

.input-container button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
