import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoadedGeneric,
  type RouteRecordRaw,
} from "vue-router";

import BaseLayout from "@/components/base_layout/v1/index.vue";
import { useAuthStore } from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: BaseLayout,
    meta: { requiresAuth: true },
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
    meta: { requiresGuest: true },
    component: () => import("@/views/login/v1/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(
  async (
    to: RouteLocationNormalizedGeneric,
    from: RouteLocationNormalizedLoadedGeneric,
    next: NavigationGuardNext,
  ) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth) {
      if (!authStore.authUser) {
        try {
          await authStore.fetchAuthUser();

          return next();
        } catch (err) {
          return next({ name: "login" });
        }
      }

      return next();
    }

    if (to.meta.requiresGuest) {
      if (authStore.accessToken) {
        return next({ name: "home" });
      }

      return next();
    }

    next();
  },
);

export default router;
