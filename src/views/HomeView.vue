<template>
  <div class="home section">
    <!-- intro -->
    <div class="intro has-text-centered">
      <p class="title">Welcome to <strong>Personal App</strong></p>
      <p class="intro-text is-size-4">
        Personal App gives you a to-do list app, habit tracker app and
        statistics on the latter to help you keep track of your daily activities
        and habits.
      </p>
      <br />
      <p>
        <router-link
          to="/about"
          class="is-underlined is-size-5 has-text-link about-redirect"
          >Learn more</router-link
        >
      </p>
    </div>
    <!-- intro -->
  </div>
</template>

<script>
// @ is an alias to /src
import $ from "jquery";

export default {
  name: "HomeView",
  methods: {
    todoChangeActive() {
      this.$store.commit("setTodoIsActive", true);
    },

    habitChangeActive() {
      this.$store.commit("setHabitIsActive", true);
    },
  },
  created() {
    $(document).ready(() => {
      //
      let aboutRedirect = $(".about-redirect");

      //
      let homeTab = $("#home");
      let todoTab = $("#todo");
      let habitTab = $("#habit");
      let aboutTab = $("#about");
      let signupTab = $("#signup");
      let loginTab = $("#login");

      //
      aboutRedirect.click(() => {
        homeTab.removeClass("is-active");
        todoTab.removeClass("is-active");
        habitTab.removeClass("is-active");
        aboutTab.addClass("is-active");
        signupTab.removeClass("is-active");
        loginTab.removeClass("is-active");
      });
    });
  },
};
</script>

<style lang="scss">
.intro-text {
  width: 70%;
  margin: auto;
}

.home {
  height: 100vh !important;
  padding-top: 10rem;
}
</style>
