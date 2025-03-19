<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import Header from './components/Header.vue';

const store = useStore();

onMounted(() => {
  const token = localStorage.getItem('userToken');
  if (token) {
    store.commit('setToken', token);
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>