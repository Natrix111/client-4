<template>
  <header class="header">
    <div class="logo">Просто купить</div>
    <nav class="nav">
      <router-link to="/">Главная</router-link>
      <router-link v-if="isAuthenticated" to="/cart">Корзина</router-link>
      <router-link v-if="isAuthenticated" to="/orders">Заказы</router-link>
      <template v-if="!isAuthenticated">
        <router-link to="/register">Регистрация</router-link>
        <router-link to="/login">Вход</router-link>
      </template>
      <template v-else>
        <button @click="handleLogout" class="btn-logout">Выйти</button>
      </template>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const handleLogout = () => {
  store.commit('clearToken');
  router.push('/login');
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

.btn-logout {
  background: red;
  border: none;
  border-radius: 15px;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
  margin-left: 1rem;
}

</style>