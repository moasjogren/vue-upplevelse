<script setup>
import { useRoute, useRouter } from "vue-router";
import activityList from "../data/Activity";

const route = useRoute();
const router = useRouter();

const activityData = activityList.find(
  (activity) => activity.id === route.params.id
);

function goBack() {
  router.go(-1);
}
</script>

<template>
  <main>
    <div class="main-content">
      <button class="back-btn" @click="goBack">< Tillbaka</button>

      <div class="activity-container">
        <h1>{{ activityData.title }}</h1>
        <div class="activity-content">
          <div class="img-container">
            <img :src="activityData.imgLink" alt="" />
          </div>
          <div class="activity-content-text">
            <p>{{ activityData.description }}</p>
            <p class="duration">
              <svg
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="#F9EDEB"
              >
                <path
                  d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"
                />
              </svg>
              >{{ activityData.duration }} min
            </p>
            <h4>Passar till</h4>
            <div class="difficulty">
              <div class="difficulty-box">
                <p>Åldersgräns</p>
                <p>{{ activityData.age }}+</p>
              </div>
              <div class="difficulty-box">
                <p>Svårighetsgrad</p>
                <p>{{ activityData.difficulty }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-content {
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.back-btn {
  background: none;
  color: var(--secondary-action-color);
  border: none;

  font-weight: bold;
  font-size: 12px;
  cursor: pointer;

  display: flex;
  align-items: center;
  margin: 12px 0px;

  transition: 0.2s;
  text-decoration: none;
}

.activity-container {
  height: 100vh;
  padding: 8px 12px;
  border-radius: 16px;
  margin-bottom: 20px;
}

.activity-content {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.img-container {
  border-radius: 8px;
  overflow: hidden;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.activity-content-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.duration {
  display: flex;
  height: fit-content;
  align-items: center;
  gap: 4px;
}

.difficulty {
  display: flex;
  gap: 10px;
}

.difficulty-box:last-of-type {
  border-left: 1px solid var(--text-color);
  padding-left: 8px;
}
</style>
