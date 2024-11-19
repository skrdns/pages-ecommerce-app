<template>
  <div class="not-found-container p-10 bg-gray-900 bg-opacity-90 rounded-lg text-white text-center w-11/12 max-w-7xl mx-auto mt-20">
    <h1 class="text-6xl font-extrabold text-purple-500 mb-4">404</h1>
    <p class="text-xl text-gray-300 mb-6">Ой! Сторінку не знайдено.</p>
    <p class="text-lg text-gray-300 mb-8">
      Вибачте, але ми не змогли знайти сторінку, яку ви шукаєте. Можливо, посилання застаріло або сторінка була видалена.
    </p>
    <router-link to="/" class="text-xl text-purple-500 hover:text-purple-300">Повернутися на головну сторінку</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "NotFound"
});
</script>

<style scoped>
.not-found-container {
  background-color: rgba(28, 28, 28, 0.9); /* Темний фон з прозорістю */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* Тінь для глибини */
  border-radius: 10px;
  width: 95%;
  max-width: 1500px;
  margin: 80px auto;
}

.not-found-container h1 {
  font-size: 6rem;
}

.not-found-container p {
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
}

.not-found-container a {
  font-size: 1.1rem;
  text-decoration: underline;
}
</style>
