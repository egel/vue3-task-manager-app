/* eslint-disable */
/* tslint:disable */

// definition of API interfaces & types
//

export const TaskStatus = {
  Pending: "pending",
  InProgress: "in progress",
  Completed: "completed",
} as const;

// export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];
export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface Task {
  id: number; // simply for demo purpose, best use string with something like uuid
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatusType;
}

export interface TaskUpsertForm {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatusType;
}
