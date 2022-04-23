import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import TodoAppView from '../views/TodoAppView.vue'
import HabitTrackerAppView from '../views/HabitTrackerAppView.vue'
import SignupView from '../views/authentication/SignupView.vue'
import LoginView from '../views/authentication/LoginView.vue'

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
    path: "/habit",
    name: "habit",
    component: HabitTrackerAppView,
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
  routes
})

export default router
