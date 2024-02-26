<template>
  <div class="wrapper">
    <Header />
    <RouterView/>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
</script>

<style lang="scss" scoped></style>
