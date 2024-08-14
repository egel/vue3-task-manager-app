<template>
  <AppNavigation />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<script lang="ts">
import AppNavigation from './components/AppNavigation.vue'
import AppFooter from './components/AppFooter.vue'

export default {
    components: {
        AppNavigation,
        AppFooter,
    }
}
</script>

<style scoped>
.app-footer {
  margin: 20px 0;
  padding: 0 20px;
}

.app-navigation {
  margin: 20px 0;
  padding: 0 20px;
}
</style>
