<template>
  <h1>List page</h1>
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th @click="sort('title')">Title {{ sortArrow('title')}}</th>
        <th @click="sort('description')">Description {{ sortArrow('description') }} </th>
        <th @click="sort('dueDate')" >Due Date {{  sortArrow('dueDate') }}</th>
        <th @click="sort('status')">Status {{ sortArrow('status') }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="i in sortedList" :key="i.id">
        <td>{{i.title}}</td>
        <td>{{i.description}}</td>
        <td>{{ formatDate(i.dueDate)}}</td>
        <td>{{i.status}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { useItemsStore, initStore} from '../store/items'
import { storeToRefs } from "pinia";
import { defineComponent, ref } from 'vue'

export default defineComponent({
  data() {
    const itemsStore = useItemsStore();
    const { items } = storeToRefs(itemsStore);
    const sortBy = ref(void 0)
    const sortOrder = ref(1)

    return {
      items,
      sortBy,
      sortOrder,
    }
  },

  computed: {
    /**
     * Return sorted list
     */
    sortedList () {
      return [...this.items].sort((a, b) => {
        if (a[this.sortBy] >= b[this.sortBy]) {
          return this.sortOrder
        }
        return -this.sortOrder
      })
    }
  },

  methods: {
    /**
     * Formatting date to simple long output
     */
    formatDate(dateString): string {
      const date = new Date(dateString);

      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
    },

    /**
     * Sort elements by
     */
    sort(sortBy: string): void {
      if(this.sortBy === sortBy) {
        this.sortOrder = -this.sortOrder
        return
      }
      this.sortBy = sortBy
    },


    /**
     * Return sorting sign
     */
    sortArrow(sortBy: string): string {
      if (sortBy == this.sortBy) {
        return this.sortOrder > 0 ? '▼' : '▲' ;
      } else {
        return ''
      }
    }
  }
})
</script>
