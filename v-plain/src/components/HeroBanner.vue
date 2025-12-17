<script></script>

<template>
  <div class="hero-container">
    <div class="overlay"></div>
    <section>
      <h1>VARJE RUM HAR EN HEMLIGHET. HAR NI DET SOM KRÄVS?</h1>
      <p>
        Samla ditt lag och ta er an spännande rum fulla av överraskningar och
        kluriga mysterier. Utforska, lös och upptäck. Tiden tickar — klarar ni
        att knäcka koden och ta er ut?
      </p>
    </section>
  </div>
</template>

<style scoped>
.hero-container {
  width: 100%;
  height: 500px;
  background-image: url("../assets/hero.webp");
  background-position: center;
  overflow: hidden;
  position: relative;
}

.hero-container section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 168px;
  color: var(--text-color);
  text-align: center;
  overflow: hidden;
}

.hero-container section h1 {
  margin: 0;
  font-size: 62px;
  font-family: "Staatliches";
  z-index: 2;
}

.hero-container section p {
  font-size: 24px;
  z-index: 2;
}

.overlay {
  background-image: linear-gradient(
    60deg,
    var(--main-bg-color),
    var(--main-box-color)
  );
  width: 100%;
  height: 500px;
  position: absolute;
  opacity: 50%;
  z-index: 0;
  overflow: hidden;
}

.hero-action-symbol {
  position: absolute;
  z-index: 1000;
  bottom: -50px;
}

@media (max-width: 800px) {
  .hero-container section h1 {
    font-size: 40px;
  }

  .hero-container section p {
    font-size: 18px;
  }
}
</style>
