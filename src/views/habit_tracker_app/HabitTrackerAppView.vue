<template>
  <!-- <p class="subtitle has-text-centered">Habit Tracker</p> -->
  <div class="app-window card">
    <div class="app-menu has-background-primary-light">
      <p class="is-size-4">Habit Tracker</p>
      <hr />
      <ul>
        <li class="tag-link"><a href="#">Health</a></li>
        <li class="tag-link"><a href="#">Work</a></li>
        <li class="tag-link"><a href="#">Home</a></li>
        <li class="tag-link"><a href="#">Social</a></li>
        <li class="tag-link"><a href="#">Outdoor</a></li>
        <li class="tag-link"><a href="#">Other</a></li>
      </ul>
      <br />
      <ul>
        <li class="menu-link">
          <a href="#" class="button has-text-dark is-success is-fullwidth"
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
      <div class="card app-card">
        <header class="card-header">
          <p class="card-header-title">Component</p>
        </header>
        <div class="card-content">
          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris.
            <a href="#">@bulmaio</a>. <a href="#">#css</a>
            <a href="#">#responsive</a>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Save</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
      <!--  -->
      <!--  -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "HabitTrackerAppView",
  methods: {
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
  },
};
</script>

<style lang="scss"></style>
