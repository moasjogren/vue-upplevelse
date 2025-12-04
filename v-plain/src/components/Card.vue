<script setup lang="ts">
    import { defineProps } from 'vue'

    defineProps({
        activityId: String,
        imgLink: String,
        title: String,
        description: String,
        difficulty: Number,
        capacity: String,
        age: Number,
        duration: Number,
        price: Number,
    })
</script>

<template>
    <div class="card-container">
        <div class="card-top">
            <img :src="imgLink" alt="">
            <div class="card-difficulty">
                {{ difficulty }}/5
            </div>
            <div class="card-info">
                <p>
                    <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#F9EDEB"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
                    {{ capacity }} | {{ age }}+ år
                </p>
                <p> 
                    <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#F9EDEB"><path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"/></svg>
                    {{ duration }} min
                </p>
            </div>
        </div>
        <div class="card-bottom">
            <h3 class="card-title">{{ title }}</h3>
            <p class="card-description">{{ description }}</p>
            <div class="card-footer">
                <button>
                    Boka
                    <svg viewBox="0 0 24 24" fill="none"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#F9EDEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
                <div class="card-price">
                    <p>{{ price }} kr</p>
                    <p>PER PERSON</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .card-container {
        background-color: var(--main-box-color);
        border-radius: 8px;
        overflow: hidden;
        width: 100%;
        max-width: 300px;
    }

    .card-top {
        position: relative;
        height: 186px;
    }

    .card-top img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card-difficulty {
        position: absolute;
        top: 12px;
        left: 12px;
        background-color: rgba(0, 0, 0, 0.7);
        color: var(--text-color);
        padding: 8px 12px;
        border-radius: 8px;
        font-weight: bold;
    }

    .card-info {
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7);
        color: var(--text-color);
        padding: 8px 12px;
        border-radius: 8px;
        color: var(--text-color);
    }

    .card-info p {
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 8px;
        /* margin: 4px 0; */
        font-size: 14px;
    }

    .card-bottom {
        padding: 21px;
    }

    .card-title {
        font-size: 24px;
        margin-bottom: 8px;
    }

    .card-description {
        font-size: 16px;
        color: var(--text-color);
        margin-bottom: 16px;
        line-height: 1.4;
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    button {
        background-color: var(--main-bg-color);
        color: var(--secondary-action-color);
        border: solid 2px var(--main-bg-color);
        padding: 8px 32px;
        border-radius: 8px;
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: 0.2s;
    }

    button:hover {
        border: solid 2px var(--action-color);
        color: var(--action-color);

        svg path {
        stroke: var(--action-color)
        }
    }

    button svg {
        width: 26px;
        height: 26px;
    }

    button svg path {
        stroke: var(--secondary-action-color)
    }

    .card-price {
        text-align: center;
    }

    .card-price p {
        margin: 2px 0;
        font-weight: bold;
    }

    .card-price p:last-child {
        font-size: 12px;
        color: var(--secondary-action-color);
    }
</style>