import { defineStore } from "pinia";
import axios from "axios";

export const useFormatted = defineStore({
  id: "formatted",
  state: () => ({
    url: "https://dummyjson.com/products",
    prev: 0,
    limit: 12,
    regProducts: null,
    original: null,
    sort: [
      {
        id: 1,
        name: "All",
        isActive: true,
      },
      {
        id: 2,
        name: "Price",
        isActive: false,
      },
      {
        id: 3,
        name: "A/Z",
        isActive: false,
      },
      {
        id: 4,
        name: "Rating",
        isActive: false,
      },
    ],
  }),
  actions: {
    async getFormatted() {
      this.isLoading = true;

      try {
        const res = await axios.get(`${this.url}?limit=100`);

        if (res) {
          const data = res.data.products;
          data.forEach((obj) => {
            obj.amount = 0;
            obj.totalPrice = 0;
          });
          this.original = data;
          // Only assign the original data once during initialization
          if (!this.regProducts) {
            this.regProducts = [...this.original]; // Make a shallow copy
          }
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }

      this.isLoading = false;
    },
  },
  getters: {
    filterProduct() {
      if (!this.regProducts) {
        return []; // Return empty array or handle null case appropriately
      }

      const DO_NOT_SORT = 0;
      const SORT_BY_RATING = 1;
      const SORT_BY_PRICE = 2;
      const SORT_BY_TITLE = 3;

      const sortFunctions = {
        [SORT_BY_RATING]: (a, b) => a.rating - b.rating,
        [SORT_BY_PRICE]: (a, b) => a.price - b.price,
        [SORT_BY_TITLE]: (a, b) => a.title.localeCompare(b.title),
      };

      const indexSort = this.sort.findIndex((el) => el.isActive);
      
      if (indexSort === DO_NOT_SORT) {
        return [...this.regProducts];
      }

      const selectedSortFunction = sortFunctions[indexSort] || ((a, b) => 0);

      return [...this.regProducts].sort(selectedSortFunction);
    },
  },
});
