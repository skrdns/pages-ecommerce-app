<template>
  <header class="overlay-header">
    <div class="logo">
      <!-- Використовуємо router-link для переходу на Home при натисканні на лого -->
      <router-link to="/" class="logo-link">
        <img src="@/assets/logo.gif" alt="Logo" />
      </router-link>
    </div>
    <div class="nav-container">
      <nav class="nav-menu">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/shop" class="nav-link">Shop</router-link>
        <router-link to="/features" class="nav-link">Features</router-link>
        <router-link to="/cart" class="nav-link">Cart</router-link>
        <!-- Додаємо посилання на улюблені товари -->
        <router-link to="/favorites" class="nav-link">Favorites</router-link>
      </nav>
    </div>
    <button @click="navigateToLogin" class="login-button border border-white text-white px-4 py-1 rounded hover:bg-white hover:text-purple-800">
      Login
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Header',
  setup() {
    // Ініціалізація маршрутизатора для навігації
    const router = useRouter();

    // Метод для навігації на сторінку логіна
    const navigateToLogin = () => {
      router.push({ name: 'Login' });
    };

    return {
      navigateToLogin,
    };
  },
});
</script>

<style scoped>
.overlay-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
}

.logo img {
  width: 50px;
  height: auto;
}

.logo-link {
  display: block;
  text-decoration: none;
}

.nav-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.nav-menu {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.nav-link:hover {
  opacity: 1;
}

.login-button {
  transition: background-color 0.3s, color 0.3s;
}
</style>
