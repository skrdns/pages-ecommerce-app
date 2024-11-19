<template>
  <div class="gif-background"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GifBackground',
});
</script>

<style scoped>
.gif-background {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/disco.gif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
