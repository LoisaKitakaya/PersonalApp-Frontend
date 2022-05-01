<template>
  <!-- <p class="subtitle has-text-centered">To-do</p> -->
  <div class="app-window card">
    <div class="app-menu has-background-primary-light">
      <p class="is-size-4">Todo App</p>
      <hr />
      <ul>
        <li class="tag-link">
          <a href="#">All</a>
        </li>
        <li class="tag-link">
          <a href="#">Complete</a>
        </li>
        <li class="tag-link">
          <a href="#">Incomplete</a>
        </li>
      </ul>
      <br />
      <ul>
        <li class="menu-link">
          <router-link
            to="/todo"
            class="button has-text-dark is-fullwidth"
            v-if="$store.state.isAuthenticated"
            >Back</router-link
          >
        </li>
        <hr />
        <li class="menu-link">
          <a
            href="#"
            @click="logout"
            class="button has-text-dark is-warning is-fullwidth logout-redirect"
            v-if="$store.state.isAuthenticated"
            >Logout</a
          >
          <a
            href="#"
            class="button has-text-dark is-warning is-fullwidth"
            v-else
            >Logout</a
          >
        </li>
      </ul>
    </div>
    <!-- app screen -->
    <div class="app-screen" v-if="$store.state.isAuthenticated">
      <!--  -->
      <div class="card app-card app-card-detail">
        <header class="card-header">
          <p class="card-header-title is-size-5">
            {{ task.title }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <p>{{ task.details }}</p>
            <p class="has-text-link">#{{ task.tags }}</p>
          </div>
        </div>
        <footer class="card-footer">
          <a
            href="#"
            @click="isCompleted"
            class="card-footer-item has-text-dark has-background-success-light"
            >Completed</a
          >
          <a
            href="#"
            @click="deleteTask"
            class="card-footer-item has-text-dark has-background-danger-light"
            >Delete</a
          >
        </footer>
      </div>
      <!--  -->
    </div>
    <!-- app screen -->

    <!-- app screen not authenticated -->
    <div class="app-screen-not-authenticated has-text-centered" v-else>
      <p class="title is-underlined">Not Authenticated</p>
      <p class="is-size-4">
        Please <strong><router-link to="/login">login</router-link></strong> to
        view your todo list.
      </p>
    </div>
    <!-- app screen not authenticated -->
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import $ from "jquery";

export default {
  name: "TodoAppView",
  data() {
    return {
      title: "",
      details: "",
      tags: "",
      task: [],
    };
  },
  created() {
    this.getTodoListItem();

    $(document).ready(() => {
      //
      let logoutRedirect = $(".logout-redirect");

      //
      let homeTab = $("#home");
      let todoTab = $("#todo");
      let habitTab = $("#habit");
      let aboutTab = $("#about");
      let signupTab = $("#signup");
      let loginTab = $("#login");

      //
      logoutRedirect.click(() => {
        homeTab.addClass("is-active");
        todoTab.removeClass("is-active");
        habitTab.removeClass("is-active");
        aboutTab.removeClass("is-active");
        signupTab.removeClass("is-active");
        loginTab.removeClass("is-active");
      });
    });
  },
  methods: {
    async isCompleted() {
      this.$store.commit("setIsLoading", true);

      const update = {
        completed: true,
      };

      const taskId = this.$route.params.id;

      await axios
        .patch(`/todo-api/todo/${taskId}/`, update)
        .then((response) => {
          console.log(response.data);

          toast({
            message: "Task marked as completed.",
            type: "is-info",
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: "bottom-right",
          });

          this.$router.push("/todo");
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },

    async deleteTask() {
      this.$store.commit("setIsLoading", true);

      const taskId = this.$route.params.id;

      await axios
        .delete(`/todo-api/todo/${taskId}/`)
        .then((response) => {
          console.log(response.data);

          toast({
            message: "Task has been deleted.",
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: "bottom-right",
          });

          this.$router.push("/todo");
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },

    async getTodoListItem() {
      this.$store.commit("setIsLoading", true);

      const taskId = this.$route.params.id;

      await axios
        .get(`/todo-api/todo/${taskId}`)
        .then((response) => {
          this.task = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },

    async logout() {
      this.$store.commit("setIsLoading", true);

      await axios
        .post("/auth/token/logout/")
        .then((response) => {
          console.log(response.data);

          toast({
            message: "Logged out.",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: "bottom-right",
          });
        })
        .catch((error) => {
          console.log(error);
        });

      axios.defaults.headers.common["Authorization"] = "";
      sessionStorage.removeItem("token");

      this.$store.commit("removeToken");

      this.$router.push("/");

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>

<style lang="scss"></style>
