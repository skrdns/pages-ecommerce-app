<template>
  <div id="app" class="app-container">
    <Header />
    <router-view />
    <GifBackground />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import GifBackground from '@/components/GifBackground.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    GifBackground,
    Footer,
  },
});
</script>

<style>
/* Контейнер для забезпечення фіксації футера */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Займає всю висоту вікна браузера */
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

router-view {
  flex: 1; /* Основний вміст займає всю доступну висоту */
}
</style>
