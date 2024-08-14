<template>
  <header class="app-navigation">
    <h1>Task Manager App</h1>
    <nav>
      <ul class="nav-list">
        <li class="nav-item" >
          <AppLink
            class="nav-link"
            to="/"
            :name="list"
            :aria-label="list"
          >
            Task List
          </AppLink>
        </li>

        <li class="nav-item" >
          <RouterLink to="/task-management">Task management</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
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

export default {
    name: "AppNavigation",
    components: {
      AppLink,
    }
}
</script>
