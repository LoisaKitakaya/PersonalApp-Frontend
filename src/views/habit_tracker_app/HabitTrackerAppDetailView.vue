<template>
  <!-- <p class="subtitle has-text-centered">To-do</p> -->
  <div class="app-window card">
    <div class="app-menu has-background-primary-light">
      <p class="is-size-4">Habit Tracker</p>
      <hr />
      <ul>
        <li class="tag-link">
          <a href="#">Habits</a>
        </li>
      </ul>
      <br />
      <ul>
        <li class="menu-link">
          <router-link
            to="/habit"
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
      <div class="card app-card app-card-detail">
        <header class="card-header">
          <p class="card-header-title is-size-5">
            {{ log.title }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <p>Action: {{ log.action }}</p>
            <p>Units: {{ log.units }}</p>
            <p>Goal: {{ log.goal }}</p>
          </div>
        </div>
        <footer class="card-footer">
          <a
            href="#"
            @click="openModal"
            class="card-footer-item has-text-dark has-background-primary-light"
            v-if="$store.state.isAuthenticated"
            >Edit</a
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

  <!-- modal -->
  <div class="modal" id="todo-modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-background-primary-light">
        <p class="modal-card-title">Edit Habit</p>
        <button class="delete" @click="closeModal" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <form method="post">
          <div class="field">
            <label for="title" class="label">Title</label>
            <div class="control">
              <input
                type="text"
                v-model="title"
                placeholder="habit"
                class="input"
              />
            </div>
          </div>
          <div class="field">
            <label for="action" class="label">Action</label>
            <div class="control">
              <input
                type="text"
                v-model="action"
                placeholder="action"
                class="input"
              />
            </div>
          </div>
          <div class="field">
            <label for="units" class="label">Units</label>
            <div class="control">
              <input
                type="text"
                v-model="units"
                placeholder="e.g. litres"
                class="input"
              />
            </div>
          </div>
          <div class="field">
            <label for="goal" class="label">Goal</label>
            <div class="control">
              <input type="number" v-model="goal" class="input" />
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot has-background-primary-light">
        <button class="button is-success" @click="edit">Update</button>
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
  name: "HabitTrackerAppDetailView",
  data() {
    return {
      title: "",
      action: "",
      units: "",
      goal: 0,
      log: [],
    };
  },
  created() {
    this.getHabitLog();
  },
  methods: {
    openModal() {
      const el = document.getElementById("todo-modal");
      el.classList.add("is-active");
    },

    closeModal() {
      const el = document.getElementById("todo-modal");
      el.classList.remove("is-active");
    },

    async edit() {
      this.$store.commit("setIsLoading", true);

      const update = {
        title: this.title,
        action: this.action,
        units: this.units,
        goal: this.goal,
      };

      const logId = this.$route.params.id;

      await axios
        .patch(`/tracker-api/habit/${logId}/`, update)
        .then((response) => {
          console.log(response.data);

          toast({
            message: "Habit has been updated.",
            type: "is-info",
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: "bottom-right",
          });

          this.$router.push("/habit");
        })
        .catch((error) => {
          console.log(error);
        });

      const el = document.getElementById("todo-modal");
      el.classList.remove("is-active");

      await axios
        .get(`/tracker-api/habit/${logId}`)
        .then((response) => {
          this.log = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },

    async deleteTask() {
      this.$store.commit("setIsLoading", true);

      const logId = this.$route.params.id;

      await axios
        .delete(`/tracker-api/habit/${logId}/`)
        .then((response) => {
          console.log(response.data);

          toast({
            message: "Habit has been deleted.",
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: "bottom-right",
          });

          this.$router.push("/habit");
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },

    async getHabitLog() {
      this.$store.commit("setIsLoading", true);

      const logId = this.$route.params.id;

      await axios
        .get(`/tracker-api/habit/${logId}`)
        .then((response) => {
          this.log = response.data;
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
