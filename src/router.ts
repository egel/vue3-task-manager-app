import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
export type AppRouteNames = "list" | "task-managment";

export const routes: RouteRecordRaw[] = [
  {
    name: "task-list",
    path: "/",
    component: () => import("./pages/TaskList.vue"),
  },
  {
    name: "other",
    path: "/other",
    component: () => import("./pages/Other.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
