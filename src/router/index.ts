import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import BaseLayout from "@/components/base_layout/v1/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: BaseLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/dashboard/v1/index.vue"),
      },
      {
        path: "/portfolio",
        name: "portfolio",
        component: () => import("@/views/portfolio/v1/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/v1/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
