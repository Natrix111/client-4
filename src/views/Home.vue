<template>
  <Header/>
  <div class="home">
    <h1>Добро пожаловать в магазин «Просто купить»</h1>
    <p>Здесь вы можете найти лучшие товары по выгодным ценам!</p>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: 'Home',
  components: {Header},
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}
</style>