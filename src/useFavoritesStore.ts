import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  }),
  actions: {
    addToFavorites(product) {
      if (!this.favorites.find((item) => item.id === product.id)) {
        this.favorites.push(product)
        this.saveFavorites()
      }
    },
    removeFromFavorites(productId) {
      this.favorites = this.favorites.filter((product) => product.id !== productId)
      this.saveFavorites()
    },
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
  },
  getters: {
    getFavorites(state) {
      return state.favorites
    },
  },
})
