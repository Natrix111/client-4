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
          :placeholder="field.placeholder || ''"
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
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.auth-form:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  outline: none;
}

.form-group input.error-input {
  border-color: #ff4d4d;
  box-shadow: 0 0 0 3px rgba(255, 77, 77, 0.2);
}

.error-message {
  color: #ff4d4d;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}
</style>