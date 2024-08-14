<template>
    <h1>List page</h1>

    <div class="list-page">
        <div v-for="i in items" :key="i.id">
            <div>{{ i.title }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { useItemsStore, initStore} from '../store/items'
import { storeToRefs } from "pinia";
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const itemsStore = useItemsStore();
        const { items } = storeToRefs(itemsStore);

        return {
            items,
        }
    },
})
</script>
