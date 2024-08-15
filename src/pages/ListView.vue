/**
 * TODO: extract th to separate component (DRY rule)
 * TODO: extract form to separate component (best practice to reuse it)
 */
<template>
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th @click="sort('title')">Title {{ sortArrow('title')}}</th>
        <th @click="sort('description')">Description {{ sortArrow('description') }} </th>
        <th @click="sort('dueDate')" >Due Date {{ sortArrow('dueDate') }}</th>
        <th @click="sort('status')">Status {{ sortArrow('status') }}</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="i in sortedList" :key="i.id">
        <td>{{i.title}}</td>
        <td>{{i.description}}</td>
        <td>{{ formatDate(i.dueDate)}}</td>
        <td>{{i.status}}</td>
        <td>
          <button class="color-danger" @click="tasksStore.deleteTask(i.id)">✖</button>
          <button v-if="i.status != taskStatus.Completed" class="color-success" @click="tasksStore.completeTask(i.id)">✓</button>
        </td>
      </tr>
    </tbody>
  </table>

  <form v-if="addNewTask" @submit.prevent="submitForm" class="task-form">
    <input v-model="form.title" type="text" placeholder="Title" />
    <input v-model="form.description" type="text" placeholder="Description" />
    <input v-model="form.dueDate" type="date" placeholder="Due Date" />
    <select v-model="form.status">
      <option checked @click="selectStatus(void 0)">Not Selected</option>
      <option v-for="o in statusOptions" :key="o.id" :value="o">{{ o }}</option>
    </select>
    <button type="submit">Add</button>
  </form>

  <button v-if="!addNewTask" @click="toggleAddTask()">Add new task</button>
</template>

<script lang="ts">
import { useTasksStore, initStore,} from '../store/tasks'
import { storeToRefs } from "pinia";
import { defineComponent, ref, reactive } from 'vue'
import { TaskStatusType, TaskStatus } from '../services/api.ts'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

export default defineComponent({
  setup() {
    const tasksStore = useTasksStore();
    const { tasks } = storeToRefs(tasksStore);
    const taskStatus = TaskStatus

    const sortBy = ref(void 0)
    const sortOrder = ref(1)
    const addNewTask = ref(false)

    const getInitialFormData = () => ({
      title: '',
      description: '',
      dueDate: void 0,
      status: taskStatus.Pending,
    })

    const form = reactive(getInitialFormData())

    const resetUserForm = () => Object.assign(form, getInitialFormData())

    const statusOptions: TaskStatusType = Object.values(TaskStatus)

    return {
      tasks,
      tasksStore,
      taskStatus,

      sortBy,
      sortOrder,
      addNewTask,
      resetUserForm,

      form,
      statusOptions,
    }
  },

  computed: {
    /**
     * Return sorted list
     */
    sortedList () {
      return [...this.tasks].sort((a, b) => {
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
      const date: Date = new Date(dateString);
      return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
    },

    /**
     * Convert Date object to ISOString
     */
    convertDateToISOString(date: Date | undefined): string {
      const now = Date.now()
      // when undefined use current time
      const newDate: Date = date ? new Date(date) : new Date(now)
      return newDate.toISOString()
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
    },

    /**
     * Toggle showing form for adding new task
     */
    toggleAddTask(): void {
      this.addNewTask = !this.addNewTask
    },

    /**
     * Clean and add task to the list
     */
    addTask(): void {
      // convert Date to ISOString before adding to list
      this.form.dueDate = this.convertDateToISOString(this.form.dueDate)
      this.tasksStore.addTask(this.form)
    },

    /**
     * Select status for form adding new task
     */
    selectStatus(status: TaskStatusType | undefined) {
      this.form.status = status
    },

    /**
     * Execute submit form
     */
    submitForm(): void {
      // TODO: when needed enhance here form validation to check min/max/required ect.
      if (this.form) {
        this.addTask(this.form)
        this.resetUserForm()
        this.toggleAddTask()
      }
    },

    /**
     * Remove task from the list
     */
    deleteTask(taskId: number): void {
      this.tasksStore.deleteTask(taskId)
    }
  }
})
</script>
