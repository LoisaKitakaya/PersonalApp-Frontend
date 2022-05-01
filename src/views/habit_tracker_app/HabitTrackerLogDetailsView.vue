<template>
  <!-- <p class="subtitle has-text-centered">To-do</p> -->
  <div class="app-window card">
    <div class="app-menu has-background-primary-light">
      <p class="is-size-4">Habit Logs</p>
      <hr />
      <ul>
        <li class="tag-link">
          <a href="#">Logs</a>
        </li>
      </ul>
      <br />
      <ul>
        <li class="menu-link">
          <router-link
            to="/logs"
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
            {{ log.habit }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <p>Achievement: {{ log.achievement }}</p>
            <p>Created at: {{ log.created_at }}</p>
            <p>Updated at: {{ log.updated_at }}</p>
          </div>
        </div>
        <footer class="card-footer">
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

export default {
  name: "HabitTrackerLogDetailView",
  data() {
    return {
      log: [],
    };
  },
  created() {
    this.getHabitLog();
  },
  methods: {
    async deleteTask() {
      this.$store.commit("setIsLoading", true);

      const logId = this.$route.params.id;

      await axios
        .delete(`/tracker-api/habit-log/${logId}/`)
        .then((response) => {
          console.log(response.data);

          toast({
            message: "Habit log has been deleted.",
            type: "is-danger",
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

      this.$store.commit("setIsLoading", false);
    },

    async getHabitLog() {
      this.$store.commit("setIsLoading", true);

      const logId = this.$route.params.id;

      await axios
        .get(`/tracker-api/habit-log/${logId}`)
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
