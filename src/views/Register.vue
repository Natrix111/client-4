<template>
  <div class="register">
    <h2>Регистрация</h2>
    <AuthForm
        :fields="fields"
        buttonText="Зарегистрироваться"
        :onSubmit="handleRegister"
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
  { name: 'fio', label: 'ФИО', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Пароль', type: 'password', required: true },
];

const error = ref('');
const router = useRouter();
const store = useStore();

const handleRegister = async (formData) => {
  try {
    const response = await fetch('http://lifestealer86.ru/api-shop/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>