<template>
  <div
    class="features-container p-10 bg-gray-900 bg-opacity-90 rounded-lg mt-20 text-white text-center w-11/12 max-w-7xl mx-auto"
  >
    <h1 class="text-4xl font-extrabold mb-8 text-purple-500">Наша колекція одягу</h1>
    <p class="text-lg text-gray-300 leading-relaxed text-justify mb-8">
      Ознайомтесь з нашою унікальною колекцією стильного та модного одягу. Чи то повсякденний
      образ, чи особливий костюм — у нас ви знайдете все, щоб створити ідеальний стиль. Оновіть свій
      гардероб з нашими ексклюзивними речами!
    </p>

    <div class="clothing-image mb-10 flex justify-center">
      <img
        v-if="featuredProduct.image"
        :src="featuredProduct.image"
        alt="Clothing Image"
        class="w-72 h-72 object-cover rounded-lg shadow-xl"
      />
    </div>

    <h2 class="text-2xl font-semibold text-purple-700 mb-4">Чому обирають наш одяг?</h2>
    <ul class="list-disc list-inside text-lg text-gray-300 space-y-4 mb-8 text-left">
      <li>
        <strong>Якісні матеріали:</strong> Наш одяг виготовлений з найкращих тканин,
        забезпечуючи комфорт та довговічність.
      </li>
      <li>
        <strong>Модні дизайни:</strong> Ми слідкуємо за останніми трендами, щоб ви завжди були у
        моді.
      </li>
      <li>
        <strong>Доступні ціни:</strong> Ми пропонуємо стильний одяг за прийнятними цінами, не
        жертвуючи якістю.
      </li>
      <li>
        <strong>Ексклюзивні пропозиції:</strong> Підтримуйте дизайнерів та отримуйте доступ до
        обмежених колекцій.
      </li>
    </ul>

    <h2 class="text-2xl font-semibold text-purple-700 mb-4">Як зробити покупку?</h2>
    <p class="text-lg text-gray-300 leading-relaxed text-justify mb-8">
      Купувати у нас просто та зручно! Просто виберіть товар, що вам сподобався, та оформіть замовлення. Ми
      пропонуємо швидку доставку та просту систему повернень.
    </p>

    <h2 class="text-2xl font-semibold text-purple-700 mb-4">
      Приєднуйтесь до нашого модного світу
    </h2>
    <p class="text-lg text-gray-300 leading-relaxed text-justify">
      Станьте частиною нашої модної родини та слідкуйте за новими надходженнями. Ми гарантуємо, що у нас
      є одяг для кожного, незалежно від вашого стилю та вподобань.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

// Тип для продукту
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export default defineComponent({
  name: 'Features',
  setup() {
    // Стан для зберігання вибраного продукту
    const featuredProduct = ref<{ image: string }>({
      image: '',
    });

    // Асинхронна функція для завантаження продукту
    const fetchFeaturedProduct = async () => {
      try {
        // Запит до API
        const { data } = await axios.get('https://api.escuelajs.co/api/v1/products');

        // Фільтруємо продукти за категоріями
        const clothingProducts = data.filter((product: Product) => {
          const categories = ['clothes', 'apparel', 'fashion'];
          return categories.some((category) => product.title.toLowerCase().includes(category));
        });

        // Якщо знайшли продукти, зберігаємо перший продукт
        if (clothingProducts.length > 0) {
          featuredProduct.value = {
            image: clothingProducts[0].images[0] || '',
          };
        }
      } catch (err) {
        console.error('Помилка завантаження продукту:', err);
      }
    };

    // Викликаємо функцію після монтування компонента
    onMounted(() => {
      fetchFeaturedProduct();
    });

    return {
      featuredProduct,
    };
  },
});
</script>

<style scoped>
.features-container {
  background-color: rgba(28, 28, 28, 0.9);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  width: 95%;
  max-width: 1500px;
  margin: 80px auto;
}

.features-container h1,
.features-container h2 {
  font-family: 'Inter', sans-serif;
}

.features-container p {
  font-family: 'Roboto', sans-serif;
}
</style>
