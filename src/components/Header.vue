<template>
  <header class="header">
    <div class="logo">Просто купить</div>
    <nav class="nav">
      <router-link to="/">Главная</router-link>
      <router-link to="/register">Регистрация</router-link>
      <router-link to="/login">Вход</router-link>
      <router-link to="/cart">Корзина</router-link>
      <router-link to="/orders">Заказы</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #4CAF50;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav a {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
}

.nav a:hover {
  text-decoration: underline;
}
</style>