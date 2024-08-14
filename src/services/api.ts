/* eslint-disable */
/* tslint:disable */

// definition of API interfaces & types
//

export interface Task {
  id: number; // simply for demo purpose, best use string with something like uuid
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in progress" | "completed";
}
