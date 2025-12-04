<template>
  <footer>
    <div class="footer-content-container">
      <section>
        <h3>Hitta till oss</h3>
        <p>Utgångsvägen 27</p>
        <p>611 11 Stockholm</p>
        <!-- Google maps karta -->
        <iframe
          class="map"
          width="300px"
          height="200px"
          style="border: 0"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.5!2d18.0!3d59.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f77f5f5f5f5f5%3A0x5f5f5f5f5f5f5f5f!2sUtg%C3%A5ngsv%C3%A4gen%2027%2C%20611%2011%20Stockholm!5e0!3m2!1ssv!2sse!4v1234567890"
          allowfullscreen="false"
          aria-hidden="false"
          tabindex="0"
        >
        </iframe>
      </section>

      <section>
        <h3>Länkar</h3>
        <a href="">Kontakta oss</a>
        <a href="">Jobba hos oss</a>
        <a href="">Våra Escape Rooms</a>
        <a href="">Team Building</a>
        <a href="">FAQ</a>
      </section>

      <section>
        <h3>Öppettider</h3>
        <p>Måndag - Torsdag: 11:00 - 20:00</p>
        <p>Fredag - Lördag: 11:00 - 22:00</p>
        <p>Söndag: <strong>STÄNGT</strong></p>

        <div class="logo">
          <h1>‘SCAPE</h1>
          <svg
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffffff"
          >
            <path
              d="M520-40v-240l-84-80-40 176-276-56 16-80 192 40 64-324-72 28v136h-80v-188l158-68q35-15 51.5-19.5T480-720q21 0 39 11t29 29l40 64q26 42 70.5 69T760-520v80q-66 0-123.5-27.5T540-540l-24 120 84 80v300h-80Zm20-700q-33 0-56.5-23.5T460-820q0-33 23.5-56.5T540-900q33 0 56.5 23.5T620-820q0 33-23.5 56.5T540-740Z"
            />
          </svg>
        </div>
      </section>
    </div>
    <small>Copyright 2025 - FJS24 Team 2</small>
  </footer>
</template>

<style scoped>
footer {
  /* padding: 0 158px; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-content-container {
  display: flex;
  /* gap: 112px; */
  justify-content: space-between;
  width: 100vw;
}

section {
  display: flex;
  flex-direction: column;
  margin-right: 18px;
}

h3 {
  font-size: 36px;
}

a {
  color: var(--text-color);
  margin: 2px;
}

iframe {
  margin-top: 32px;
  border-radius: 8px;
}

small {
  color: var(--action-color);
  padding: 12px 0;
}
</style>
