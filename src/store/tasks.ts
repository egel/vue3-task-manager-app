import { defineStore } from "pinia";
import { Task, TaskStatus, TaskUpsertForm } from "../services/api";

/**
 * Define dummy initial list
 */
function initTaskStore(): Array<Task> {
  return [
    {
      id: "adfe3a1e79aa6", // simple random string for demo purpose, best use something like uuid
      title: "Title 1",
      description: "Some description 1",
      dueDate: "2011-10-05T14:48:00.000Z",
      status: "pending",
    },
    {
      id: "6f9bb98983a02",
      title: "Title 2",
      description: "Some description 2",
      dueDate: "2011-10-05T15:48:00.000Z",
      status: "in progress",
    },
    {
      id: "1ab45d141a911",
      title: "Title 3",
      description: "Some description 3",
      dueDate: "2011-10-06T16:48:00.000Z",
      status: "completed",
    },
  ];
}

/**
 * Generate random id
 *
 * This is simple random ID generator for demo purposes. better use something
 * more solid like UUID, or send only the data to the backend and then let
 * backend to generate proper ID (depend on business requirements)
 */
function generateRandomId(): string {
  return Math.random().toString(16).toString();
}

function recoverTasks(): Array<Task> {
  const tasks = localStorage.getItem(TASKS_STORE);
  return tasks ? JSON.parse(tasks) : initTaskStore();
}

function saveTasksToLocalstorage(tasks: Array<Task>): void {
  localStorage.setItem(TASKS_STORE, JSON.stringify(tasks));
}

export const TASKS_STORE = "tasks_store";

export const useTasksStore = defineStore(TASKS_STORE, {
  state: () => ({
    tasks: recoverTasks(),
  }),
  actions: {
    addTask(taskUpsertForm: TaskUpsertForm): void {
      const task: Task = {
        ...taskUpsertForm,
        id: generateRandomId(),
      };
      this.tasks.push(task);

      // persist updated tasks
      saveTasksToLocalstorage(this.tasks);
    },
    updateTask(task: Task) {
      const idx = this.tasks.findIndex((t: Task) => t.id == task.id);
      this.tasks[idx] = Object.assign({}, task);

      // persist changed tasks
      saveTasksToLocalstorage(this.tasks);
    },
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((object: Task) => {
        return object.id !== taskId;
      });

      // persist changed tasks
      saveTasksToLocalstorage(this.tasks);
    },
    completeTask(taskId: string): void {
      const idx = this.tasks.findIndex((task: Task) => task.id == taskId);
      this.tasks[idx].status = TaskStatus.Completed;

      // persist changed tasks
      saveTasksToLocalstorage(this.tasks);
    },
  },
});
