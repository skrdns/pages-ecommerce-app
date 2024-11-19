<template>
  <div v-if="product" class="product-detail-container p-10 bg-gray-900 bg-opacity-90 rounded-lg text-white text-center w-11/12 max-w-7xl mx-auto mt-20">
    <h1 class="text-4xl font-extrabold mb-8">{{ product.title }}</h1>

    <div class="product-detail-content flex flex-col md:flex-row gap-6">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.title"
        class="product-image w-full md:w-1/2 h-64 object-cover rounded-md mb-4"
      />
      <div class="product-info w-full md:w-1/2 text-left">
        <p class="text-lg text-gray-300 mb-4">{{ product.description }}</p>
        <p class="text-xl font-semibold text-white mb-4">{{ product.price }} $</p>
        <button
          @click="addToCart(product)"
          class="add-to-cart-button bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-bold transition-colors"
        >
          Додати до кошика
        </button>
        <button
          @click="addToFavorites(product)"
          :class="isFavorite(product.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'"
          class="add-to-favorites-button text-white px-4 py-2 rounded-md font-bold transition-colors mt-4"
        >
          {{ isFavorite(product.id) ? 'Вже в улюбленому' : 'Додати в улюблене' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProductById } from '@/api/products'; // Імпортуємо метод для отримання продукту за ID

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

export default defineComponent({
  name: 'ProductDetail',
  setup() {
    const route = useRoute(); // Отримуємо параметри маршруту
    const product = ref<Product | null>(null);

    // Завантаження продукту за ID
    const fetchProduct = async (id: string) => {
      product.value = await fetchProductById(id);
    };

    const addToCart = (product: Product) => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (!cart.find(item => item.id === product.id)) {
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    };

    const addToFavorites = (product: Product) => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (!favorites.find(item => item.id === product.id)) {
        favorites.push(product);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    const isFavorite = (productId: string) => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      return favorites.some((product: Product) => product.id === productId);
    };

    // Викликаємо fetchProduct при монтуванні компонента
    onMounted(() => {
      const productId = route.params.id as string;
      fetchProduct(productId);
    });

    return {
      product,
      addToCart,
      addToFavorites,
      isFavorite,
    };
  },
});
</script>

<style scoped>
.product-image {
  width: 100%;
  height: 16rem;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
