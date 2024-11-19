<template>
  <div class="shop-container p-10 bg-gray-900 bg-opacity-90 rounded-lg mt-20 text-white text-center w-11/12 max-w-7xl mx-auto">
    <h1 class="text-4xl font-extrabold mb-8">SkeletonStore</h1>

    <!-- Фільтри -->
    <div class="filter-container mb-10 p-5 bg-purple-800 bg-opacity-80 rounded-lg shadow-lg">
      <!-- Пошук і категорії -->
      <div class="filter-item mb-4">
        <label for="search" class="text-lg font-semibold">Пошук за назвою:</label>
        <input
          type="text"
          id="search"
          v-model="filters.search"
          @input="updateURL"
          placeholder="Введіть назву..."
          class="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div class="filter-item mb-4">
        <label for="category" class="text-lg font-semibold">Категорія:</label>
        <select
          v-model="filters.category"
          @change="updateURL"
          id="category"
          class="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="">Всі категорії</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>

      <!-- Ціна -->
      <div class="filter-item mb-4 flex gap-5">
        <div class="flex-1">
          <label for="min-price" class="text-lg font-semibold">Ціна від:</label>
          <input
            type="number"
            id="min-price"
            v-model="filters.minPrice"
            @input="updateURL"
            placeholder="Мінімальна ціна"
            class="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div class="flex-1">
          <label for="max-price" class="text-lg font-semibold">Ціна до:</label>
          <input
            type="number"
            id="max-price"
            v-model="filters.maxPrice"
            @input="updateURL"
            placeholder="Максимальна ціна"
            class="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      <div class="filter-item mt-6">
        <button
          @click="resetFilters"
          class="w-full bg-white text-black p-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
        >
          Скинути фільтри
        </button>
      </div>
    </div>

    <!-- Продукти -->
    <div v-if="filteredProducts.length > 0" class="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        class="product-card flex flex-col items-center bg-purple-800 p-5 rounded-lg shadow-lg hover:shadow-2xl transform hover:translate-y-1 transition-all"
        v-for="product in paginatedProducts"
        :key="product.id"
      >
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.title"
          class="product-image w-full h-64 object-cover rounded-md mb-4"
        />
        <h3 class="text-lg font-semibold text-white mb-2">{{ product.title }}</h3>
        <p class="text-sm text-gray-300 mb-4">{{ product.description }}</p>
        <p class="text-lg font-semibold text-white mb-4">{{ product.price }} $</p>

        <!-- Блок кнопок -->
        <div class="button-group flex flex-col gap-4 mt-auto">
          <button
            @click="addToCart(product)"
            class="add-to-cart-button bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-bold transition-colors"
          >
            Додати до кошика
          </button>
          <button
            @click="addToFavorites(product)"
            :class="isFavorite(product.id) ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'"
            class="add-to-favorites-button text-white px-4 py-2 rounded-md font-bold transition-colors"
          >
            {{ isFavorite(product.id) ? 'Вже в улюбленому' : 'Додати в улюблене' }}
          </button>
          <button
            v-if="isFavorite(product.id)"
            @click="removeFromFavorites(product)"
            class="remove-from-favorites-button bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-bold transition-colors"
          >
            Забрати з улюбленого
          </button>
          <router-link
            :to="`/product/${product.id}`"
            class="view-product-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-bold transition-colors"
          >
            Переглянути
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="no-products text-xl font-bold text-gray-300">
      Немає товарів, що відповідають фільтрам.
    </div>

    <!-- Пагінація -->
    <div class="pagination mt-6" v-if="filteredProducts.length > 0">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="prev-page bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700"
      >
        Попередня
      </button>
      <span class="page-number text-white mx-4">{{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="next-page bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700"
      >
        Наступна
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';  // Імпортуємо useRouter для роботи з роутером
import { fetchProducts, fetchCategories } from '@/api/products'; // Імпортуємо API методи

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

export default defineComponent({
  name: 'Shop',
  setup() {
    const router = useRouter();  // Ініціалізація useRouter для доступу до роутера
    const products = ref<Product[]>([]);
    const categories = ref<Category[]>([]);
    const filters = ref({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: ''
    });
    const favorites = ref<Product[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));
    const sortBy = ref('default');
    const currentPage = ref(1);
    const itemsPerPage = ref(8);
    const maxPages = ref(12);

    // Завантаження продуктів та категорій
    const fetchData = async () => {
      products.value = await fetchProducts();
      categories.value = await fetchCategories();
    };

    const sortedProducts = computed(() => {
      let sorted = [...products.value];
      switch (sortBy.value) {
        case 'priceLowHigh':
          return sorted.sort((a, b) => a.price - b.price);
        case 'priceHighLow':
          return sorted.sort((a, b) => b.price - a.price);
        case 'titleAZ':
          return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'titleZA':
          return sorted.sort((a, b) => b.title.localeCompare(a.title));
        default:
          return sorted;
      }
    });

    const filteredProducts = computed(() => {
      return sortedProducts.value.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(filters.value.search.toLowerCase());
        const matchesCategory = !filters.value.category || product.categoryId === Number(filters.value.category);
        const matchesPrice =
          (!filters.value.minPrice || product.price >= Number(filters.value.minPrice)) &&
          (!filters.value.maxPrice || product.price <= Number(filters.value.maxPrice));
        return matchesSearch && matchesCategory && matchesPrice;
      });
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
    });

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredProducts.value.slice(start, end);
    });

    const addToCart = (product: Product) => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (!cart.find(item => item.id === product.id)) {
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    };

    const addToFavorites = (product: Product) => {
      if (!favorites.value.find(item => item.id === product.id)) {
        favorites.value.push(product);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    };

    const removeFromFavorites = (product: Product) => {
      const index = favorites.value.findIndex(item => item.id === product.id);
      if (index > -1) {
        favorites.value.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    };

    const isFavorite = (productId: string) => {
      return favorites.value.some(product => product.id === productId);
    };

    const resetFilters = () => {
      filters.value = { search: '', category: '', minPrice: '', maxPrice: '' };
      updateURL();
    };

    const updateURL = () => {
      // Оновлюємо URL з новими фільтрами
      router.push({
        query: {
          search: filters.value.search,
          category: filters.value.category,
          minPrice: filters.value.minPrice,
          maxPrice: filters.value.maxPrice
        }
      });
    };

    const updateSorting = () => {
      currentPage.value = 1;
    };

    const goToPage = (page: number) => {
      if (page < 1 || page > totalPages.value) return;
      currentPage.value = page;
    };

    onMounted(() => {
      fetchData();
    });

    return {
      filters,
      sortBy,
      categories,
      favorites,
      currentPage,
      itemsPerPage,
      maxPages,
      filteredProducts,
      totalPages,
      paginatedProducts,
      addToCart,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      resetFilters,
      updateURL,
      updateSorting,
      goToPage
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
.no-products {
  margin: 50px 0;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
