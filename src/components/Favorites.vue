<template>
  <div
    class="favorites-container p-10 bg-gray-900 bg-opacity-90 rounded-lg mt-20 text-white text-center w-11/12 max-w-7xl mx-auto"
  >
    <h1 class="text-4xl font-extrabold mb-8">Favorite Clothes</h1>

    <div v-if="favorites.length === 0" class="no-favorites text-xl font-semibold text-gray-400">
      Немає улюблених товарів.
    </div>

    <div class="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="product in favorites"
        :key="product.id"
        class="product-card flex flex-col items-center bg-purple-800 p-5 rounded-lg shadow-lg hover:shadow-2xl transform hover:translate-y-1 transition-all"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="product-image w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 class="text-xl font-semibold text-white mb-2">{{ product.name }}</h3>
        <p class="text-gray-300 text-base mb-4">{{ product.description }}</p>
        <p class="text-lg font-semibold text-white mb-4">${{ product.price }}</p>

        <!-- Кнопка для видалення з улюблених -->
        <button
          @click="removeFromFavorites(product.id)"
          class="remove-from-favorites-button bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-bold transition-colors mt-2"
        >
          Видалити з улюблених
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useFavoritesStore } from '@/useFavoritesStore'; // Імпорт Pinia Store

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default defineComponent({
  name: 'Favorites',
  setup() {
    // Отримуємо доступ до Pinia store
    const store = useFavoritesStore();

    // Обчислюваний властивість для отримання улюблених товарів
    const favorites = computed(() => store.getFavorites);

    // Метод для видалення товару з улюблених
    const removeFromFavorites = (productId: string) => {
      store.removeFromFavorites(productId); // Видаляємо товар через Pinia store
    };

    // Повертаємо необхідні дані та методи для шаблону
    return {
      favorites,
      removeFromFavorites
    };
  }
});
</script>

<style scoped>
/* Стилі для сторінки улюблених товарів */
.favorites-list {
  display: grid;
  gap: 1.5rem;
}

.remove-from-favorites-button {
  background-color: #ef4444;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.remove-from-favorites-button:hover {
  background-color: #dc2626;
}
</style>
