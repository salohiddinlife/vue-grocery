<template>
  <div class="sort">
    <div class="sort__label">
      <b>Sorting via:</b>
      <span @click="openSort">{{ activeSort }}</span>
    </div>
    <div class="sort__popup" v-show="sortOpen">
      <ul>
        <li
          :class="item.isActive == true ? 'active' : ''"
          v-for="item in getSort"
          :key="item.id"
          @click="onClickSort(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { useFormatted } from "@/store/formatted";
import { computed, ref } from "vue";

const formattedStore = useFormatted();

const getSort = computed(() => formattedStore.sort);
const activeSort = ref("All");
const sortOpen = ref(false);

const openSort = () => {
  sortOpen.value = !sortOpen.value;
};

const onClickSort = (item) => {
  getSort.value.forEach((el) => {
    el.isActive = false;
  });
  item.isActive = true;
  activeSort.value = item.name;
  sortOpen.value = false;
};
</script>
