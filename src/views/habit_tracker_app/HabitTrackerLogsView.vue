<template>
  <!-- <p class="subtitle has-text-centered">To-do</p> -->
  <div class="app-window card">
    <div class="app-menu has-background-primary-light">
      <p class="is-size-4">Habit Logs</p>
      <hr />
      <ul>
        <li class="tag-link" id="h-tab">
          <router-link
            to="/habit"
            id="h-btn"
            v-if="$store.state.isAuthenticated"
            >Habits</router-link
          >
          <a href="#" v-else>Habits</a>
        </li>
        <li class="tag-link active" id="l-tab">
          <router-link to="/logs" id="h-btn" v-if="$store.state.isAuthenticated"
            >Logs</router-link
          >
          <a href="#" v-else>Logs</a>
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
            >Create habit log</a
          >
          <a
            href="#"
            class="button has-text-dark is-success is-fullwidth"
            v-else
            >Create habit log</a
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
      <div v-if="logs.length">
        <!--  -->
        <div v-for="log in logs" v-bind:key="log.id" class="card app-card">
          <header class="card-header">
            <p class="card-header-title is-size-5">
              {{ log.habit }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p>
                Achievement: {{ log.achievement }} |
                <router-link
                  v-bind:to="{
                    name: 'logs-details',
                    params: { id: log.id },
                  }"
                  >View habit log</router-link
                >
              </p>
              <p>Created at: {{ log.created_at }}</p>
              <p>Updated at: {{ log.updated_at }}</p>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
      <div class="has-text-centered" v-else>
        <p class="title">No habit logs yet.</p>
        <p class="is-size-4">
          Click the 'Create habit log' button to add a new log.
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
        to track your habits.
      </p>
    </div>
    <!-- app screen not authenticated -->
  </div>

  <!-- modal -->
  <div class="modal" id="todo-modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-background-primary-light">
        <p class="modal-card-title">New Log</p>
        <button class="delete" @click="closeModal" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <form method="post">
          <div class="field">
            <label class="label">Habit</label>
            <div class="select is-fullwidth">
              <select v-model="habit">
                <option
                  v-for="habit in habitList"
                  :key="habit.id"
                  :value="habit.id"
                >
                  {{ habit.title }}
                </option>
              </select>
            </div>
          </div>
          <div class="field">
            <label for="achievement" class="label">Achievement</label>
            <div class="control">
              <input type="number" v-model="achievement" class="input" />
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot has-background-primary-light">
        <button class="button is-success" @click="createNewLog">Create</button>
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
  name: "HabitTrackerLogsView",
  data() {
    return {
      logs: [],
      habitList: [],
      habit: "",
      achievement: 0,
    };
  },
  created() {
    this.getLogs();

    this.getHabits();
  },
  methods: {
    async getLogs() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("/tracker-api/habit-log/")
        .then((response) => {
          this.logs = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },

    async getHabits() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("/tracker-api/habit/")
        .then((response) => {
          this.habitList = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },

    async createNewLog(event) {
      event.preventDefault();

      this.$store.commit("setIsLoading", true);

      const log = {
        habit: this.habit,
        achievement: this.achievement,
      };

      console.log(log);

      await axios
        .post("/tracker-api/habit-log/", log)
        .then((response) => {
          console.log(response.data);

          toast({
            message: "Habit log created.",
            type: "is-info",
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: "bottom-right",
          });

          this.$router.push("/logs");
        })
        .catch((error) => {
          console.log(error);
        });

      const el = document.getElementById("todo-modal");
      el.classList.remove("is-active");

      await axios
        .get("/tracker-api/habit-log/")
        .then((response) => {
          this.logs = response.data;
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
