<template>
  <div class="product-list">
    <h2>Каталог товаров</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="getImageUrl(product.image)" :alt="product.name" class="product-image" />
        <div class="product-details">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p class="price">Цена: {{ product.price }} ₽</p>
          <button v-if="isClient" @click="addToCart(product)" class="btn-add-to-cart">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const products = ref([]);
const loading = ref(true);

const getImageUrl = (imagePath) => {
  return `http://lifestealer86.ru/${imagePath}`;
};

const isClient = computed(() => {
  return store.getters.isAuthenticated;
});

const fetchProducts = async () => {
  try {
    const response = await fetch('http://lifestealer86.ru/api-shop/products');
    const data = await response.json();
    if (response.ok) {
      products.value = data.data;
    } else {
      console.error('Ошибка при загрузке товаров:', data.error?.message);
    }
  } catch (err) {
    console.error('Ошибка сети:', err);
  } finally {
    loading.value = false;
  }
};

const addToCart = (product) => {
  console.log('Товар добавлен в корзину:', product);
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.product-list {
  padding: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.price {
  font-weight: bold;
  color: #4CAF50;
  margin: 1rem 0;
}

.btn-add-to-cart {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.btn-add-to-cart:hover {
  background-color: #45a049;
}
</style>