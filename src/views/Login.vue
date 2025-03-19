<template>
  <div class="login">
    <h2>Вход в систему</h2>
    <AuthForm
        :fields="fields"
        buttonText="Войти"
        :onSubmit="handleLogin"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AuthForm from '../components/AuthForm.vue';

const fields = [
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Пароль', type: 'password', required: true },
];

const error = ref('');
const router = useRouter();
const store = useStore();

const handleLogin = async (formData) => {
  try {
    const response = await fetch('http://lifestealer86.ru/api-shop/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      store.commit('setToken', data.data.user_token);
      router.push('/');
    } else {
      error.value = data.error?.message || 'Ошибка входа';
    }
  } catch (err) {
    error.value = 'Ошибка сети';
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>