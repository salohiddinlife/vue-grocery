import { defineStore } from 'pinia';

export const useLikedStore = defineStore('liked', {
  state: () => ({
    likedProducts: JSON.parse(localStorage.getItem('likedProducts')) || [],
    likedColors: JSON.parse(localStorage.getItem('likedColors')) || {},
    showNotification: false,
  }),
  getters: {
    totalLikedProducts() {
      return this.likedProducts.length;
    },
  },
  actions: {
    async addToLikeds(product) {
      this.likedProducts.push(product);
      this.likedColors[product.id] = 'red';
      this.updateLocalStorage();

      await this.showNotificationForFiveSeconds();
    },
    removeFromLikeds(product) {
      this.likedProducts = this.likedProducts.filter(
        (favProduct) => favProduct.id !== product.id
      );
      delete this.likedColors[product.id];
      this.updateLocalStorage();
    },
    isProductLiked(productId) {
      return this.likedProducts.some((product) => product.id === productId);
    },
    updateLocalStorage() {
      localStorage.setItem('likedProducts', JSON.stringify(this.likedProducts));
      localStorage.setItem('likedColors', JSON.stringify(this.likedColors));
    },
    async showNotificationForFiveSeconds() {
      if (!this.showNotification) {
        this.showNotification = true;
        await new Promise((resolve) => setTimeout(resolve, 5000));
        this.showNotification = false;
      }
    },
  },
});
