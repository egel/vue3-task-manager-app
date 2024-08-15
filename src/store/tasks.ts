import { defineStore } from "pinia";
import { Task, TaskStatus, TaskUpsertForm } from "../services/api";

/**
 * Define dummy initial list
 */
function initStore(): Array<Task> {
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
 * more solid like UUID, or send only data to backend and let backend generate
 * proper ID (depend on business requirements)
 */
function generateRandomId(): string {
  return Math.random().toString(16).toString();
}

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: initStore(),
  }),
  actions: {
    addTask(taskUpsertForm: TaskUpsertForm) {
      const task: Task = {
        ...taskUpsertForm,
        id: generateRandomId(),
      };
      this.tasks.push(task);
    },
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((object: Task) => {
        return object.id !== taskId;
      });
    },
    completeTask(taskId: string): void {
      const idx = this.tasks.findIndex((task: Task) => task.id == taskId);
      this.tasks[idx].status = TaskStatus.Completed;
    },
  },
});
