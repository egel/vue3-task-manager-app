import { defineStore } from "pinia";
import { Task, TaskStatus, TaskUpsertForm } from "../services/api";

/**
 * Define dummy initial list
 */
function initStore(): Array<Task> {
  return [
    {
      id: 1,
      title: "Title 1",
      description: "Some description 1",
      dueDate: "2011-10-05T14:48:00.000Z",
      status: "pending",
    },
    {
      id: 2,
      title: "Title 2",
      description: "Some description 2",
      dueDate: "2011-10-05T15:48:00.000Z",
      status: "in progress",
    },
    {
      id: 3,
      title: "Title 3",
      description: "Some description 3",
      dueDate: "2011-10-06T16:48:00.000Z",
      status: "completed",
    },
  ];
}

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: initStore(),
  }),
  actions: {
    addTask(task: TaskUpsertForm) {
      this.tasks.push(task as Task);
    },
    deleteTask(taskId: number) {
      this.tasks = this.tasks.filter((object: Task) => {
        return object.id !== taskId;
      });
    },
    completeTask(taskId: number): void {
      const idx = this.tasks.findIndex((task: Task) => task.id == taskId);
      this.tasks[idx].status = TaskStatus.Completed;
    },
  },
});
