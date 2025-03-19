<template>
  <div class="register">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleRegister" class="form">
      <div class="form-group">
        <label for="fio">ФИО:</label>
        <input type="text" id="fio" v-model="form.fio" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <button type="submit" class="btn">Зарегистрироваться</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const form = ref({
      fio: '',
      email: '',
      password: '',
    });
    const error = ref('');
    const router = useRouter();
    const store = useStore();

    const handleRegister = async () => {
      try {
        const response = await fetch('http://lifestealer86.ru/api-shop/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form.value),
        });

        const data = await response.json();

        if (response.ok) {
          store.commit('setToken', data.data.user_token);
          router.push('/login');
        } else {
          error.value = data.error?.message || 'Ошибка регистрации';
        }
      } catch (err) {
        error.value = 'Ошибка сети';
      }
    };

    return {
      form,
      error,
      handleRegister,
    };
  },
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>