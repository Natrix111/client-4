<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <div v-for="field in fields" :key="field.name" class="form-group">
      <label :for="field.name">{{ field.label }}:</label>
      <input
          :type="field.type"
          :id="field.name"
          v-model="formData[field.name]"
          :class="{ 'error-input': errors[field.name] }"
          @input="clearError(field.name)"
      />
      <p v-if="errors[field.name]" class="error-message">{{ errors[field.name] }}</p>
    </div>
    <button type="submit" class="btn">{{ buttonText }}</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  onSubmit: {
    type: Function,
    required: true,
  },
});

const formData = ref({});
const errors = ref({});

props.fields.forEach((field) => {
  formData.value[field.name] = '';
});

const clearError = (fieldName) => {
  if (errors.value[fieldName]) {
    errors.value[fieldName] = '';
  }
};

const validateForm = () => {
  let isValid = true;
  errors.value = {};

  props.fields.forEach((field) => {
    if (field.required && !formData.value[field.name]) {
      errors.value[field.name] = 'Это поле обязательно для заполнения';
      isValid = false;
    } else if (field.type === 'email' && !isValidEmail(formData.value[field.name])) {
      errors.value[field.name] = 'Введите корректный email';
      isValid = false;
    }
  });

  return isValid;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleSubmit = async () => {
  if (validateForm()) {
    await props.onSubmit(formData.value);
  }
};
</script>

<style scoped>
.auth-form {
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

.form-group input.error-input {
  border-color: red;
}

.error-message {
  color: red;
  margin-top: 0.5rem;
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
</style>