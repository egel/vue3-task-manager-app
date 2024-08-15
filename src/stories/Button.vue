<script lang="ts">
// import {defineProps, defineSlots} from 'vue'

export default {
  props: {
    type: String,
    title: String,
    backgroundColor: {
      type:String,
      default: "#282828"
    },
    fontColor: {
      type: String,
      default: "#f1f1f1"
    },
    onClick: Function,
  },
}
</script>

<template>
  <button
    class="button"
    :style="{ 'background-color': backgroundColor, 'color': fontColor}"
    :type="type"
    :title="title"
    @click="onClick"
  >
    <slot>Button</slot>
  </button>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

button {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  color: #f1f1f1;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>

