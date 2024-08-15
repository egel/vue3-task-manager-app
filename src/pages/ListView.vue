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

    <tbody tag="tbody" name="list" is="vue:transition-group">
      <tr v-for="i in sortedList" :key="i.id">
        <td>{{i.title}}</td>
        <td>{{i.description}}</td>
        <td>{{ formatDate(i.dueDate)}}</td>
        <td>{{i.status}}</td>
        <td>
          <Button
            class="color-danger"
            @click="tasksStore.deleteTask(i.id)"
            title="Delete Task"
          >✖</Button>
          <Button
            class="color-success"
            @click="formEditTask(i.id)"
            title="Edit Task"
          >✎</Button>
          <Button
            v-if="i.status != taskStatus.Completed"
            class="color-success"
            @click="tasksStore.completeTask(i.id)"
            title="Compelete Task"
          >✓</Button>
        </td>
      </tr>
    </tbody>
  </table>

  <transition>
    <div v-if="editTask">
      <h2>Edit Task</h2>
      <form @submit.prevent="submitFormEditTask" class="task-form">
        <InputField v-model="form.title" type="text" name="Title" />
        <InputField v-model="form.description" type="text" name="Description" />
        <input v-model="form.dueDate" type="date" placeholder="Due Date" />
        <SelectField
          :options="statusOptions"
          class="select"
          @input="(e) => onSelectStatus(e)"
        />
        <div class="action-buttons">
          <Button type="button" @click="cancelForm()">Cancel</Button>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  </transition>

  <transition>
    <div v-if="addNewTask">
      <h2>New Task</h2>
      <form @submit.prevent="submitFormNewTask" class="task-form">
        <InputField v-model="form.title" type="text" name="Title" />
        <InputField v-model="form.description" type="text" name="Description" />
        <input v-model="form.dueDate" type="date" placeholder="Due Date" />
        <SelectField
          :options="statusOptions"
          :default="statusOptions.Pending"
          class="select"
          @input="(e) => onSelectStatus(e)"
        />
        <div class="action-buttons">
          <Button type="button" @click="cancelForm()">Cancel</Button>
          <Button type="submit" >Add</Button>
        </div>
      </form>
    </div>
  </transition>

  <Button v-if="!addNewTask && !editTask" @click="toggleAddTask()">New Task</Button>
</template>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  min-width: 200px;
  width: 100%;
  max-width: 450px;
}

/* transitions */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<script lang="ts">
import { useTasksStore, initStore,} from '../store/tasks'
import { storeToRefs } from "pinia";
import { defineComponent, ref, reactive } from 'vue'
import { TaskStatusType, TaskStatus } from '../services/api.ts'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import InputField from '../components/InputField.vue'
import Button from '../components/Button.vue'
import SelectField from '../components/SelectField.vue'

export default defineComponent({
  components: {
    InputField,
    Button,
    SelectField,
  },

  setup() {
    const tasksStore = useTasksStore();
    const { tasks } = storeToRefs(tasksStore);
    const taskStatus = TaskStatus

    const sortBy = ref(void 0)
    const sortOrder = ref(1)
    const addNewTask = ref(false)
    const editTask = ref(false)

    // generate new initial form values
    const getInitialFormData = (): Task => ({
      id: '',
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
      editTask,
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
     * Convert ISOString to date in format yyyy-MM-dd
     *
     * TODO/INFO: date not handle timezones or UTC for demo pusposes
     */
    convertDateToYearMonthDay(isoDate: string | undefined): string {
      if (!isoDate || isoDate.length <= 0) return '0001-01-01';
      const date = new Date(isoDate);
      const d = `0${date.getDate()}`.slice(-2);
      const m = `0${date.getMonth() + 1}`.slice(-2);
      const y = date.getFullYear();
      return `${y}-${m}-${d}`
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
     * Toggle showing form for adding new task
     */
    toggleEditTask(): void {
      this.editTask = !this.editTask
    },

    /**
     * Cancel add or edit, and clean up the form
     */
    cancelForm(): void {
      this.resetUserForm();
      this.editTask = false
      this.addNewTask = false
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
     * Execute submit form adding new task
     */
    submitFormNewTask(): void {
      // TODO: if needed, here enhance form validation to check min/max/required ect.
      if (this.form) {
        this.addTask(this.form)
        this.resetUserForm()
        this.toggleAddTask()
      }
    },

    /**
     * Execute submit form editing exisitng task
     */
    submitFormEditTask(): void {
      // TODO: if needed, here enhance form validation to check min/max/required ect.
      if (this.form) {
        this.tasksStore.updateTask(this.form)
        this.resetUserForm()
        this.toggleEditTask()
      }
    },

    /**
     * Open task from the list in editing form
     */
    formEditTask(taskId: number): void {
      if (this.form.id == taskId) return
      const task = this.tasks.find((task) => task.id == taskId)
      this.resetUserForm()
      this.form.id = task.id
      this.form.title = task.title
      this.form.description = task.description

      // due to using simple date input (demo purpose) convert to yyyy-MM-dd format
      this.form.dueDate = this.convertDateToYearMonthDay(task.dueDate)
      this.form.status = task.status
      this.editTask = true
    },

    /**
     * Addign selected status value to form
     *
     * TODO: make it generic
     */
    onSelectStatus(value: string): void {
      this.form.status = value
    }
  }
})
</script>
