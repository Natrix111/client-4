<template>
  <div class="orders">
    <h2>Мои заказы</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else>
      <div v-if="orders.length === 0">У вас пока нет заказов</div>
      <div v-else>
        <div v-for="order in orders" :key="order.id" class="order-item">
          <h3>Заказ #{{ order.id }}</h3>
          <p><strong>Товары:</strong> {{ order.products.join(', ') }}</p>
          <p><strong>Сумма заказа:</strong> {{ order.order_price }} ₽</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const orders = ref([]);
const loading = ref(true);

const token = computed(() => store.state.token);

const fetchOrders = async () => {
  try {
    const response = await fetch('http://lifestealer86.ru/api-shop/order', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      orders.value = data.data;
    } else {
      console.error('Ошибка при загрузке заказов:', data.error?.message);
    }
  } catch (err) {
    console.error('Ошибка сети:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.orders {
  padding: 2rem;
}

.order-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

</style>