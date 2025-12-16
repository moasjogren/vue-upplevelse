<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import activityList from "../data/Activity";
import type { Activity } from "../data/Activity";
import star from "../assets/star.svg";
import starEmpty from "../assets/starEmpty.svg";

const route = useRoute();
const router = useRouter();
const activityData = ref<Activity | null>(null);

// AI-integration: Hämta aktivitet från antingen localStorage (AI-genererade) eller mock-data
onMounted(() => {
  const savedActivities = localStorage.getItem("aiActivities");
  let allActivities = activityList;

  if (savedActivities) {
    try {
      allActivities = JSON.parse(savedActivities);
    } catch (err) {
      console.error("Failed to load saved activities:", err);
    }
  }

  activityData.value =
    allActivities.find((activity) => activity.id === route.params.id) || null;

  const filterData = localStorage.getItem("filterData");
  if (filterData) {
    const parsed = JSON.parse(filterData);
    selectedDate.value = parsed.selectedDate || "";
    players.value = parsed.players || 2;
  }
});

function goBack() {
  router.go(-1);
}

const selectedDate = ref<string>("");
const players = ref<number>(2);
const hotelAdded = ref<boolean>(false);
const foodAdded = ref<boolean>(false);
const vrAdded = ref<boolean>(false);

const addOnPrices = {
  hotel: 899,
  food: 239,
  vr: 189,
};

const totalPrice = computed(() => {
  let total = 0;

  if (activityData.value?.price && players.value) {
    total = activityData.value.price * players.value;
    if (hotelAdded.value) total += addOnPrices.hotel * players.value;
    if (foodAdded.value) total += addOnPrices.food * players.value;
    if (vrAdded.value) total += addOnPrices.vr * players.value;
  }
  return total;
});

function toggleAddOn(addOn: "hotel" | "food" | "vr") {
  if (addOn === "hotel") hotelAdded.value = !hotelAdded.value;
  if (addOn === "food") foodAdded.value = !foodAdded.value;
  if (addOn === "vr") vrAdded.value = !vrAdded.value;
}

function saveBooking() {
  const bookingData = {
    id: activityData.value?.id || "",
    imgLink: activityData.value?.imgLink || "",
    title: activityData.value?.title || "",
    description: activityData.value?.description || "",
    difficulty: activityData.value?.difficulty || 0,
    capacity: players.value,
    duration: activityData.value?.duration || 0,
    price: totalPrice.value,
    ageRange: activityData.value?.ageRange || "vuxen",
    selectedDate: selectedDate.value,
    players: players.value,
    addOns: {
      hotel: hotelAdded.value,
      food: foodAdded.value,
      vr: vrAdded.value,
    },
  };
  const existingBookings = localStorage.getItem("bookingData");
  const bookings = existingBookings ? JSON.parse(existingBookings) : [];

  bookings.push(bookingData);

  localStorage.setItem("bookingData", JSON.stringify(bookings));
}

const count: number[] = [1, 2, 3, 4, 5];
</script>

<template>
  <main>
    <div v-if="activityData" class="main-content">
      <div class="title-container">
        <button class="back-btn" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none">
            <g stroke-width="0"></g>
            <g stroke-linecap="round" stroke-linejoin="round"></g>
            <g>
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="#ffafc5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </button>
        <h1>{{ activityData.title }}</h1>
      </div>

      <div class="activity-container">
        <div class="activity-content">
          <div class="img-container">
            <img :src="activityData.imgLink" alt="" />
          </div>
          <div class="activity-content-text">
            <p>{{ activityData.description }}</p>
            <p class="duration">
              <svg
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#F9EDEB"
              >
                <path
                  d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"
                />
              </svg>
              {{ activityData.duration }} min
            </p>
            <h4>Passar till</h4>
            <div class="difficulty">
              <div class="difficulty-box">
                <div>
                  <svg
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#F9EDEB"
                  >
                    <path
                      d="M480-240q-60 0-108.5-33T300-360h360q-23 54-71.5 87T480-240ZM380-420q-21 0-35.5-14.5T330-470q0-21 14.5-35.5T380-520q21 0 35.5 14.5T430-470q0 21-14.5 35.5T380-420Zm200 0q-21 0-35.5-14.5T530-470q0-21 14.5-35.5T580-520q21 0 35.5 14.5T630-470q0 21-14.5 35.5T580-420ZM480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-32 5-62t16-59l80 14q-11 25-16 51.5t-5 55.5q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-16-2-31.5t-5-30.5q-81-9-150-48T485-651l70-41q32 37 72.5 63t88.5 39q-25-39-61.5-68.5T573-704l84-50q83 47 133 129.5T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80ZM200-615l413-155q-32-26-70-39.5T463-823q-95 0-169.5 57.5T200-615Zm-64 110q-7-20-11.5-41t-4.5-43q0-91 51-163t129-112q-2-4-2.5-7.5t-.5-8.5q0-17 11.5-28.5T337-920q14 0 24 8t14 20q22-5 43.5-8t44.5-3q67 0 127.5 26T697-802l122-46 28 75-711 268Zm271-188Z"
                    />
                  </svg>
                  <h5>Åldersgräns</h5>
                </div>
                <p>{{ activityData.ageRange }}</p>
              </div>
              <div class="difficulty-box">
                <div>
                  <svg
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#F9EDEB"
                  >
                    <path
                      d="m298-456 143-104-143-104-36 48 77 56-77 56 36 48Zm364 0 36-48-77-56 77-56-36-48-143 104 143 104ZM420-278l60-60 60 60 60-60 39 39 42-42-81-81-60 60-60-60-60 60-60-60-81 81 42 42 39-39 60 60Zm60 198q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"
                    />
                  </svg>
                  <h5>Svårighetsgrad</h5>
                </div>

                <img
                  v-for="number in count"
                  :key="number"
                  :src="number <= activityData.difficulty ? star : starEmpty"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <form class="schedule-container">
        <div class="schedule-top">
          <h2>{{ selectedDate || "Välj ett datum" }}</h2>
          <p>
            <span class="kronor">{{ activityData.price }} kr</span> <br />PER
            PERSON
          </p>
        </div>
        <div class="schedule-times">
          <button class="time-btn">11:00</button>
          <button class="time-btn">13:00</button>
          <button class="time-btn">15:00</button>
          <button class="time-btn">17:00</button>
          <button class="time-btn">19:00</button>
          <button class="time-btn">21:00</button>
        </div>

        <div class="add-ons">
          <h3>Tillägg</h3>

          <div class="add-on-card">
            <div class="add-on-card-left">
              <img :src="activityData.imgLink" />
              <p><span class="kronor">Hotell</span> <br />En natt på Scandic</p>
            </div>

            <div class="add-on-card-right">
              <p><span class="kronor">899 kr</span> <br />PER PERSON</p>
              <button
                class="time-btn"
                :class="{ active: hotelAdded }"
                @click.prevent="toggleAddOn('hotel')"
                type="button"
              >
                <svg
                  v-if="!hotelAdded"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ffafc5"
                >
                  <path
                    d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
                  />
                </svg>
                <span v-else>✓</span>
              </button>
            </div>
          </div>
          <div class="add-on-card">
            <div class="add-on-card-left">
              <img :src="activityData.imgLink" />
              <p><span class="kronor">Mat</span> <br />Buffé på Vapiano</p>
            </div>

            <div class="add-on-card-right">
              <p><span class="kronor">239 kr</span> <br />PER PERSON</p>
              <button
                class="time-btn"
                :class="{ active: foodAdded }"
                @click.prevent="toggleAddOn('food')"
                type="button"
              >
                <svg
                  v-if="!foodAdded"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ffafc5"
                >
                  <path
                    d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
                  />
                </svg>
                <span v-else>✓</span>
              </button>
            </div>
          </div>

          <div class="add-on-card">
            <div class="add-on-card-left">
              <img :src="activityData.imgLink" />
              <p>
                <span class="kronor">VR-upplevelse</span> <br />Lös ett escape
                room i VR!
              </p>
            </div>

            <div class="add-on-card-right">
              <p><span class="kronor">189 kr</span> <br />PER PERSON</p>
              <button
                class="time-btn"
                :class="{ active: vrAdded }"
                @click.prevent="toggleAddOn('vr')"
                type="button"
              >
                <svg
                  v-if="!vrAdded"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ffafc5"
                >
                  <path
                    d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
                  />
                </svg>
                <span v-else>✓</span>
              </button>
            </div>
          </div>
        </div>

        <div class="total-sum">
          <div class="total-sum-right">
            <p>Antal personer</p>
            <label
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -1150 960 960"
                width="24px"
                fill="#ffafc5"
              >
                <path
                  d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"
                />
              </svg>
            </label>
            <input type="number" v-model.number="players" />
          </div>
          <div class="total-sum-left">
            <p>
              Totalt: <br />
              <span class="kronor">{{ totalPrice }} kr</span>
            </p>
            <button @click="saveBooking()" class="time-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#ffafc5"
              >
                <path
                  d="M456.67-608.67v-122H334v-66.66h122.67v-122h66.66v122h122v66.66h-122v122h-66.66ZM286.53-80q-30.86 0-52.7-21.97Q212-123.95 212-154.81q0-30.86 21.98-52.69 21.97-21.83 52.83-21.83t52.69 21.97q21.83 21.98 21.83 52.84 0 30.85-21.97 52.69Q317.38-80 286.53-80Zm402.66 0q-30.86 0-52.69-21.97-21.83-21.98-21.83-52.84 0-30.86 21.97-52.69 21.98-21.83 52.84-21.83 30.85 0 52.69 21.97Q764-185.38 764-154.52q0 30.85-21.97 52.69Q720.05-80 689.19-80ZM54.67-813.33V-880h121l170 362.67H630.8l158.87-280h75L698-489.33q-11 19.33-28.87 30.66-17.88 11.34-39.13 11.34H328.67l-52 96H764v66.66H282.67q-40.11 0-61.06-33-20.94-33-2.28-67L280-496 133.33-813.33H54.67Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-else>
      <p>Laddar...</p>
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

.title-container {
  display: flex;
}

.title-container h1 {
  font-size: 36px;
}

.back-btn {
  background: none;
  border: none;
  text-decoration: none;
  padding: 0;
  cursor: pointer;
  width: 46px;
  transform: rotate(180deg);
}

.back-btn svg {
  width: 48px;
  transition: 0.2s;
}

.back-btn svg:hover {
  margin-left: 10px;
}

.activity-container {
  margin-bottom: 20px;
}

.activity-content {
  display: flex;
  gap: 24px;
}

.img-container {
  border-radius: 8px;
  overflow: hidden;
  width: 900px;
  height: 400px;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.activity-content-text {
  display: flex;
  flex-direction: column;
  /* gap: 36px; */
}

.activity-content-text p:first-child,
.duration {
  font-size: 21px;
}

.activity-content-text h4 {
  font-size: 28px;
  font-weight: 600;
  color: var(--secondary-action-color);
  margin: 32px 0 18px 0;
}

.duration {
  display: flex;
  height: fit-content;
  align-items: center;
  gap: 8px;
  margin: 24px 0;
}

.difficulty {
  display: flex;
  gap: 24px;
}

.difficulty-box div {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.difficulty-box h5 {
  font-size: 16px;
  font-weight: 400;
  margin: 0;
}

.difficulty-box:first-of-type p {
  text-align: center;
  font-size: 36px;
}

.difficulty-box:last-of-type {
  border-left: 2px solid var(--transparent-color);
  padding-left: 24px;
}

.difficulty-box:last-of-type img {
  margin: 12px 8px 0 0;
  width: 28px;
}

.schedule-container {
  padding: 21px 62px;
  margin-bottom: 20px;
  /* max-width: 800px; */
  background-color: var(--main-box-color);
  border-radius: 8px;
}

.schedule-top {
  display: flex;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--transparent-color);
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.schedule-top h2 {
  text-transform: capitalize;
  font-size: 32px;
  font-weight: 600;
}

.schedule-top p,
.add-on-card-right p {
  text-align: center;
  color: var(--secondary-action-color);
  font-weight: 500;
}

.schedule-top .kronor {
  font-size: 32px;
  font-weight: 600;
  color: var(--text-color);
  line-height: 1;
}

.schedule-times {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.time-btn {
  background-color: var(--main-bg-color);
  color: var(--secondary-action-color);
  border: solid 2px var(--main-bg-color);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.2s;
  text-decoration: none;
  height: fit-content;
}

.time-btn:hover {
  border: solid 2px var(--action-color);
  color: var(--action-color);

  svg path {
    fill: var(--action-color);
    transition: 0.1s;
  }
}

.time-btn.active {
  background-color: var(--action-color);
  border-color: var(--action-color);
  color: var(--main-bg-color);
}

.time-btn.active span {
  font-size: 20px;
}

.add-ons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.add-ons h3 {
  font-size: 21px;
  font-weight: 500;
  color: var(--secondary-action-color);
  margin-top: 24px;
}

.add-on-card {
  display: flex;
  justify-content: space-between;
  height: fit-content;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.add-on-card img {
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.add-on-card-left {
  display: flex;
  align-items: center;
  gap: 10px;
  /* width: fit-content; */
}

.add-on-card-left .kronor {
  font-size: 21px;
  font-weight: 500;
}

.add-on-card-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.add-on-card-right p {
  font-size: 12px;
}

.add-on-card-right .kronor {
  font-size: 21px;
  line-height: 1;
  font-weight: 600;
  color: var(--text-color);
}

.add-on-card-right .time-btn {
  padding: 16px;
}

.total-sum {
  display: flex;
  justify-content: space-between;
  border-top: 2px solid var(--transparent-color);
  margin-top: 30px;
  padding-top: 10px;
}

.total-sum-right {
  height: fit-content;
  align-items: center;
}

.total-sum-right p {
  /* margin-bottom: 8px; */
  font-size: 21px;
}

.total-sum-right label svg {
  width: 32px;
  margin-left: 10px;
}

.total-sum-right > input {
  width: 70px;
  height: 15px;
  text-align: center;
  border-radius: 8px;
  margin-left: 10px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--text-color);
  font-size: 16px;
  border: none;
}

.total-sum-left {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  height: fit-content;
  align-items: center;
}

.total-sum-left p {
  font-size: 16px;
}

.total-sum-left .kronor {
  font-size: 21px;
  font-weight: 600;
}

.total-sum-left .time-btn {
  display: flex;
  padding: 12px;
}
</style>
