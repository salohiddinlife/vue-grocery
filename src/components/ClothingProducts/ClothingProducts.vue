<template>
  <div class="clothing__header">
    <div class="clothing__header-title">All products</div>
    <Sorting />
  </div>
  <div class="clothing__products" v-if="paginatedProducts.length">
    <div
      class="clothing__products-item"
      v-for="(item, idx) in paginatedProducts"
      :key="idx"
    >
      <span class="clothing__products-item-heart" @click="liked(item)">
        <img src="/src/assets/img/heart.svg" v-if="!item.liked" />
        <img src="/src/assets/img/heart-solid.svg" v-else alt="" />
      </span>
      <RouterLink :to="'/product/' + item.id" class="clothing__products-item">
        <img class="clothing__products-item-img" :src="item.thumbnail" alt="" />
        <div class="clothing__products-item-descr">
          <div>
            <h2>{{ item.title }}</h2>
            <p>{{ item.brand }}’s Brand</p>
            <span class="product__status">
              <img
                :src="
                  item.stock > 0
                    ? '/src/assets/img/checked.svg'
                    : '/src/assets/img/not_checked.svg'
                "
              />
              <h3>{{ item.stock > 0 ? "in stock" : "out of stock" }}</h3>
            </span>
          </div>
          <span class="clothing__products-item-price"
            ><p>${{ item.price }}</p></span
          >
        </div>
      </RouterLink>
    </div>
  </div>
  <div v-else class="loader__div">
    <Loader class="loader__main" />
  </div>
  <div class="control__btns">
    <button @click="products.getFormatted('prev')">prev</button>
    <button @click="products.getFormatted('next')">next</button>
  </div>
  <div class="paggination">
    <div
      class="page"
      :class="activePage == page ? 'active' : ''"
      @click="pageClick(page)"
      v-for="(page, index) in totalPage"
      :key="index"
    >
      {{ page }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, inject } from "vue";
import { useFormatted } from "@/store/formatted";
import Sorting from "@/components/Sorting/Sorting.vue";
const api = inject("api");

const sort = ref("");

const products = useFormatted();
const content = ref([]);

const productInPages = ref(12);
const activePage = ref(1);


const totalPage = computed(() =>
  Math.ceil(getProducts.value.length / productInPages.value)
);

const paginatedProducts = computed(() => {
  const from = (activePage.value - 1) * productInPages.value; 
  const to = from + productInPages.value; 
  return getProducts.value.slice(from, to);
});

function pageClick(page) {
  activePage.value = page;
}

const getProducts = computed(() => {
    return products.filterProduct;
});

onMounted(async () => {
  await products.getFormatted();
});
</script>

<style lang="scss" scoped>
.loader__div {
  display: grid;
  height: 100vh;
  width: 100%;
  place-items: center;
}
.product__status {
  display: flex;
  align-items: center;
  gap: 5px;
  & img {
    height: 14px;
    width: 14px;
  }
  & h3 {
    color: rgb(33, 184, 33);
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
  }
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
