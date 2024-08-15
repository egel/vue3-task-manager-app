<template>
  <form v-if="addNewTask" @submit.prevent="submitForm" class="task-form">
    <InputField v-model="form.title" type="text" name="Title" />
    <input v-model="form.title" type="text" placeholder="Title" />
    <input v-model="form.description" type="text" placeholder="Description" />
    <input v-model="form.dueDate" type="date" placeholder="Due Date" />
    <select v-model="form.status">
      <option checked @click="selectStatus(void 0)">Not Selected</option>
      <option v-for="o in statusOptions" :key="o.id" :value="o">{{ o }}</option>
    </select>
    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 2em;
  white-space: nowrap;
}

nav {
  color: #fff;
  display: flex;
  flex-direction: row;
}

ul {
  display: inline;
  padding: 0;
}

li {
  display: inline;
}

.nav-item {
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
}
</style>

<script lang="ts">
import { ref } from 'vue'
import type { RouteParams, RouterLink} from 'vue-router'
import AppLink from './AppLink.vue'
import InputField from './InputField.vue'

export default {
    name: "TaskUpsertForm",
    components: {
      InputField,
    },
    methods: {
      handleSubmit() {
        alert("form submitted");
      },
    }
}
</script>
