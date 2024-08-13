import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
export type AppRouteNames = "list" | "task-managment";

export const routes: RouteRecordRaw[] = [
  {
    name: "list",
    path: "/",
    component: () => import("./pages/ListView.vue"),
  },
  {
    name: "task-managment",
    path: "/task-management",
    component: () => import("./pages/TaskManagement.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
