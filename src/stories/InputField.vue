<template>
  <input
    :type="type"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    :placeholder="name"
  />
</template>

<style scoped>
input {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  padding: 7px 4px;
  border: 1px solid #666666;
  border-radius: 6px;
  font-size: 1em;
  color: #f1f1f1;
  text-align: left;
  background-color: #282828;
  transition: border-color 0.25s;
  width: 100%;
  color-scheme: dark;
}

input:hover {
  border-color: #646cff;
}

input:placeholder,
input::placeholder {
  font-size: 1em;
  color: #666;
}

input:focus,
input:active,
input:focus-visible {
  outline: none;
  border-color: #6400FF;
}
</style>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
  modelValue: string,
  name: string;
  type: {
    type: string,
    default: 'text',
  }
}>();

defineEmits(["update:modelValue"]);
</script>
