<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header></Header>
  <main>
    <RouterView />
  </main>
  <Footer></Footer>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 2rem;
}

.router-link-active {
  font-weight: bold;
  color: #42b883;
  text-decoration: underline;
}
</style>
