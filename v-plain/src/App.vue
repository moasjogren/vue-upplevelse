<script setup lang="ts"></script>

<!-- Enkel setup för Vue router utifrån Joels basic-exempel. Lägg till sidor i /views och länka i /router -->

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink :to="{ name: 'about' }">About</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  /* background-color: #f0f0f0; */
  margin-bottom: 2rem;
}

.router-link-active {
  font-weight: bold;
  color: #42b883; /* Vue green */
  text-decoration: underline;
}
</style>
