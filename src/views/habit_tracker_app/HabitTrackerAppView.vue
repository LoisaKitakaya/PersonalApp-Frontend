<template>
  <!-- <p class="subtitle has-text-centered">To-do</p> -->
  <div class="app-window card">
    <div class="app-menu has-background-primary-light">
      <p class="is-size-4">Habit Tracker</p>
      <hr />
      <ul>
        <li class="tag-link">
          <a href="#" @click="getHabits" v-if="$store.state.isAuthenticated"
            >Habits</a
          >
          <a href="#" v-else>Habits</a>
        </li>
        <li class="tag-link">
          <a href="#" v-if="$store.state.isAuthenticated">Charts</a>
          <a href="#" v-else>Charts</a>
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
            >Create habit</a
          >
          <a
            href="#"
            class="button has-text-dark is-success is-fullwidth"
            v-else
            >Create habit</a
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
      <div v-if="habits.length">
        <!--  -->
        <div
          v-for="habit in habits"
          v-bind:key="habit.id"
          class="card app-card"
        >
          <header class="card-header">
            <p class="card-header-title is-size-5">{{ habit.title }}</p>
          </header>
          <div class="card-content">
            <div class="content">
              <p>
                Action: {{ habit.action }} |
                <router-link
                  v-bind:to="{
                    name: 'habit-details',
                    params: { id: habit.id },
                  }"
                  >View task</router-link
                >
              </p>
              <p>Units: {{ habit.units }}</p>
              <p>Goal: {{ habit.goal }}</p>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
      <div class="has-text-centered" v-else>
        <p class="title">No habits yet.</p>
        <p class="is-size-4">
          Click the 'Create habit' button to add a new habit.
        </p>
      </div>
      <!--  -->
    </div>
    <!-- app screen -->

    <!-- app screen not authenticated -->
    <div class="app-screen-not-authenticated has-text-centered" v-else>
      <p class="title is-underlined">Not Authenticated</p>
      <p class="is-size-4">
        Please <strong><router-link to="/login">login</router-link></strong> to
        track your habits.
      </p>
    </div>
    <!-- app screen not authenticated -->
  </div>

  <!-- modal -->
  <div class="modal" id="todo-modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-background-primary-light">
        <p class="modal-card-title">New Habit</p>
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
        <button class="button is-success" @click="createNewHabit">
          Create
        </button>
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
  name: "HabitTrackerAppView",
  data() {
    return {
      habits: [],
      title: "",
      action: "",
      units: "",
      goal: 0,
    };
  },
  created() {
    this.getHabits();
  },
  methods: {
    async getHabits() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("/tracker-api/habit/")
        .then((response) => {
          this.habits = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },

    async createNewHabit(event) {
      event.preventDefault();

      this.$store.commit("setIsLoading", true);

      const habit = {
        title: this.title,
        action: this.action,
        units: this.units,
        goal: this.goal,
      };

      await axios
        .post("/tracker-api/habit/", habit)
        .then((response) => {
          console.log(response.data);

          toast({
            message: "Habit created.",
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
        .get("/tracker-api/habit/")
        .then((response) => {
          this.habits = response.data;
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
