<template>
  <div class="cart">
    <h2>Корзина</h2>
    <button @click="goBack" class="btn-back">Назад</button>
    <div v-if="loading">Загрузка...</div>
    <div v-else>
      <div v-if="cartItems.length === 0">Корзина пуста</div>
      <div v-else>
        <div v-for="(group, productId) in groupedCartItems" :key="productId" class="cart-item">
          <h3>{{ group[0].name }}</h3>
          <p>{{ group[0].description }}</p>
          <p class="price">Цена: {{ group[0].price }} ₽</p>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(group[0].id)" class="btn-quantity">-</button>
            <span>{{ group.length }}</span>
            <button @click="increaseQuantity(group[0].product_id)" class="btn-quantity">+</button>
          </div>
          <button @click="removeGroup(group[0].product_id)" class="btn-remove">Удалить все</button>
        </div>
        <div class="total-price">
          <strong>Общая сумма: {{ totalPrice }} ₽</strong>
        </div>
        <button @click="placeOrder" class="btn-order">Оформить заказ</button>
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
const cartItems = ref([]);
const loading = ref(true);

const token = computed(() => store.state.token);

const fetchCart = async () => {
  try {
    const response = await fetch('http://lifestealer86.ru/api-shop/cart', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      cartItems.value = data.data;
    } else {
      console.error('Ошибка при загрузке корзины:', data.error?.message);
    }
  } catch (err) {
    console.error('Ошибка сети:', err);
  } finally {
    loading.value = false;
  }
};

const groupedCartItems = computed(() => {
  const groups = {};
  cartItems.value.forEach((item) => {
    if (!groups[item.product_id]) {
      groups[item.product_id] = [];
    }
    groups[item.product_id].push(item);
  });
  return groups;
});

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price, 0);
});

const increaseQuantity = async (productId) => {
  try {
    const response = await fetch(`http://lifestealer86.ru/api-shop/cart/${productId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      await fetchCart();
    } else {
      console.error('Ошибка при увеличении количества товара');
    }
  } catch (err) {
    console.error('Ошибка сети:', err);
  }
};

const decreaseQuantity = async (itemId) => {
  try {
    const response = await fetch(`http://lifestealer86.ru/api-shop/cart/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
    });

    if (response.ok) {
      await fetchCart();
    } else {
      console.error('Ошибка при уменьшении количества товара');
    }
  } catch (err) {
    console.error('Ошибка сети:', err);
  }
};

const removeGroup = async (productId) => {
  try {
    const itemsToRemove = cartItems.value.filter((item) => item.product_id === productId);
    for (const item of itemsToRemove) {
      await fetch(`http://lifestealer86.ru/api-shop/cart/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.value}`,
        },
      });
    }
    await fetchCart();
  } catch (err) {
    console.error('Ошибка сети:', err);
  }
};

const placeOrder = async () => {
  try {
    const response = await fetch('http://lifestealer86.ru/api-shop/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      router.push('/orders');
    } else {
      console.error('Ошибка при оформлении заказа');
    }
  } catch (err) {
    console.error('Ошибка сети:', err);
  }
};

const goBack = () => {
  router.push('/');
};

onMounted(() => {
  fetchCart();
});
</script>

<style scoped>
.cart {
  padding: 2rem;
}

.cart-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.price {
  font-weight: bold;
  color: #4CAF50;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.btn-quantity {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-quantity:hover {
  background-color: #45a049;
}

.btn-remove {
  padding: 0.5rem 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-remove:hover {
  background-color: #ff1a1a;
}

.btn-order {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.btn-order:hover {
  background-color: #45a049;
}

.btn-back {
  padding: 0.5rem 1rem;
  background-color: #ddd;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.btn-back:hover {
  background-color: #ccc;
}

.total-price {
  margin-top: 1rem;
  font-size: 1.2rem;
}
</style>