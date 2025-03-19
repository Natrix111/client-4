<template>
  <div class="home">
    <h1>Добро пожаловать в магазин «Просто купить»</h1>
    <p>Здесь вы можете найти лучшие товары по выгодным ценам!</p>
    <ProductList />
  </div>
</template>

<script setup>
import ProductList from '../components/ProductList.vue';
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}
</style>