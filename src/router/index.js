import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import TodoAppView from "../views/todo_app/TodoAppView.vue";
import HabitTrackerAppView from "../views/habit_tracker_app/HabitTrackerAppView.vue";
import HabitTrackerAppDetailView from "../views/habit_tracker_app/HabitTrackerAppDetailView.vue";
import SignupView from "../views/authentication/SignupView.vue";
import LoginView from "../views/authentication/LoginView.vue";
import TodoAppDetailView from "../views/todo_app/TodoAppDetailView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/todo",
    name: "todo",
    component: TodoAppView,
  },
  {
    path: "/todo/:id",
    name: "todo-details",
    component: TodoAppDetailView,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/habit",
    name: "habit",
    component: HabitTrackerAppView,
  },
  {
    path: "/habit/:id",
    name: "habit-details",
    component: HabitTrackerAppDetailView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
