<template>
  <!-- <p class="subtitle has-text-centered">To-do</p> -->
  <div class="app-window card">
    <div class="app-menu has-background-primary-light">
      <p class="is-size-4">Todo App</p>
      <hr />
      <ul>
        <li class="tag-link active" id="all">
          <a
            href="#"
            id="todo-all"
            @click="getTodoList"
            v-if="$store.state.isAuthenticated"
            >All</a
          >
          <a href="#" v-else>All</a>
        </li>
        <li class="tag-link" id="complete">
          <a
            href="#"
            id="todo-complete"
            @click="filterComplete"
            v-if="$store.state.isAuthenticated"
            >Complete</a
          >
          <a href="#" v-else>Complete</a>
        </li>
        <li class="tag-link" id="incomplete">
          <a
            href="#"
            id="todo-incomplete"
            @click="filterIncomplete"
            v-if="$store.state.isAuthenticated"
            >Incomplete</a
          >
          <a href="#" v-else>Incomplete</a>
        </li>
      </ul>
      <br />
      <ul>
        <li class="menu-link">
          <a
            href="#"
            @click="openModal"
            class="button has-text-dark is-success is-fullwidth"
            v-if="$store.state.isAuthenticated"
            >Create task</a
          >
          <a
            href="#"
            class="button has-text-dark is-success is-fullwidth"
            v-else
            >Create task</a
          >
        </li>
        <hr />
        <li class="menu-link">
          <a
            href="#"
            @click="logout"
            class="button has-text-dark is-warning is-fullwidth"
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
      <div v-if="tasks.length">
        <!--  -->
        <div v-for="task in tasks" v-bind:key="task.id" class="card app-card">
          <header class="card-header">
            <p class="card-header-title is-size-5">
              {{ task.title }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p>
                {{ task.details }} |
                <router-link
                  v-bind:to="{ name: 'todo-details', params: { id: task.id } }"
                  >View task</router-link
                >
              </p>
              <p class="has-text-link">#{{ task.tags }}</p>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
      <div class="has-text-centered" v-else>
        <p class="title">No tasks yet.</p>
        <p class="is-size-4">
          Click the 'Create todo' button to add a new task.
        </p>
      </div>
      <!--  -->
    </div>
    <!-- app screen -->

    <!-- app screen not authenticated -->
    <div class="app-screen-not-authenticated has-text-centered" v-else>
      <p class="title is-underlined">Not Authenticated</p>
      <p class="is-size-4">
        Please
        <strong
          ><router-link to="/login" class="login-redirect"
            >login</router-link
          ></strong
        >
        to view your todo list.
      </p>
    </div>
    <!-- app screen not authenticated -->
  </div>

  <!-- modal -->
  <div class="modal" id="todo-modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-background-primary-light">
        <p class="modal-card-title">New Task</p>
        <button class="delete" @click="closeModal" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <form method="post">
          <div class="field">
            <div class="control">
              <input
                type="text"
                v-model="title"
                placeholder="name of task"
                class="input"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                type="text"
                v-model="details"
                placeholder="small description of task"
                class="input"
              />
            </div>
          </div>
          <div class="field">
            <div class="select is-fullwidth">
              <select v-model="tags">
                <option value="health">Health</option>
                <option value="work">Work</option>
                <option value="home">Home</option>
                <option value="social">Social</option>
                <option value="outdoor">Outdoor</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot has-background-primary-light">
        <button class="button is-success" @click="createNewTask">Create</button>
        <button class="button" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
  <!-- modal -->
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
      tasks: [],
    };
  },
  created() {
    this.getTodoList();

    $(document).ready(() => {
      //
      let todoAll = $("#todo-all");
      let todoComplete = $("#todo-complete");
      let todoIncomplete = $("#todo-incomplete");

      //
      let allTab = $("#all");
      let completeTab = $("#complete");
      let incompleteTab = $("#incomplete");

      //
      let loginRedirect = $(".login-redirect");

      // 
      let homeTab = $("#home");
      let todoTab = $("#todo");
      let habitTab = $("#habit");
      let aboutTab = $("#about");
      let signupTab = $("#signup");
      let loginTab = $("#login");

      //
      loginRedirect.click(() => {
        homeTab.removeClass("is-active");
        todoTab.removeClass("is-active");
        habitTab.removeClass("is-active");
        aboutTab.removeClass("is-active");
        signupTab.removeClass("is-active");
        loginTab.addClass("is-active");
      });

      //
      todoAll.click(() => {
        allTab.addClass("active");
        completeTab.removeClass("active");
        incompleteTab.removeClass("active");
      });

      todoComplete.click(() => {
        allTab.removeClass("active");
        completeTab.addClass("active");
        incompleteTab.removeClass("active");
      });

      todoIncomplete.click(() => {
        allTab.removeClass("active");
        completeTab.removeClass("active");
        incompleteTab.addClass("active");
      });
    });
  },
  methods: {
    async filterComplete() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("/todo-api/filter-complete/")
        .then((response) => {
          this.tasks = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },

    async filterIncomplete() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("/todo-api/filter-incomplete/")
        .then((response) => {
          this.tasks = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },

    async getTodoList() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("/todo-api/todo/")
        .then((response) => {
          this.tasks = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },

    async createNewTask(event) {
      event.preventDefault();

      this.$store.commit("setIsLoading", true);

      const task = {
        title: this.title,
        details: this.details,
        tags: this.tags,
      };

      await axios
        .post("/todo-api/todo/", task)
        .then((response) => {
          console.log(response.data);

          toast({
            message: "Task created.",
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

      const el = document.getElementById("todo-modal");
      el.classList.remove("is-active");

      await axios
        .get("/todo-api/todo/")
        .then((response) => {
          this.tasks = response.data;
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

    openModal() {
      const el = document.getElementById("todo-modal");
      el.classList.add("is-active");
    },

    closeModal() {
      const el = document.getElementById("todo-modal");
      el.classList.remove("is-active");
    },
  },
};
</script>

<style lang="scss"></style>
