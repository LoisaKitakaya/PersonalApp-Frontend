<template>
  <!-- <p class="subtitle has-text-centered">To-do</p> -->
  <div class="app-window card">
    <div class="app-menu has-background-primary-light">
      <p class="is-size-4">Todo App</p>
      <hr />
      <ul>
        <li class="tag-link"><a href="#">All</a></li>
        <li class="tag-link"><a href="#">Incomplete</a></li>
        <li class="tag-link"><a href="#">Complete</a></li>
      </ul>
      <br />
      <ul>
        <li class="menu-link">
          <a
            href="#"
            @click="openModal"
            class="button has-text-dark is-success is-fullwidth"
            >Create todo</a
          >
        </li>
        <li class="menu-link">
          <a
            href="#"
            @click="logout"
            class="button has-text-dark is-warning is-fullwidth"
            >Logout</a
          >
        </li>
      </ul>
    </div>
    <div class="app-screen">
      <!--  -->
      <!--  -->
      <div class="card app-card" v-for="task in tasks" v-bind:key="task.id">
        <header class="card-header">
          <p class="card-header-title">{{ task.title }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            {{ task.details }}
          </div>
        </div>
      </div>
      <!--  -->
      <!--  -->
    </div>
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

export default {
  name: "TodoAppView",
  data() {
    return {
      title: "",
      details: "",
      tags: "",
      tasks: [],
      hasChanged: false,
    };
  },
  mounted() {
    this.getTodoList();
  },
  methods: {
    async getTodoList() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("/todo-api/todo/")
        .then((response) => {
          console.log(response.data);
          this.task = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.hasChanged = true;

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
            type: "is-success",
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
            type: "is-danger",
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
  watch: {
    tasks: () => {
      if (this.hasChanged === true) {
        this.getTodoList();
        this.hasChanged = false;
        console.log("Watcher has seen.");
      }
    },
  },
};
</script>

<style lang="scss"></style>
