<template>
  <div class="tabs is-centered has-background-primary-light">
    <ul>
      <li class="is-active" id="home">
        <router-link to="/" class="is-size-5" id="home-btn">Home</router-link>
      </li>
      <li id="todo">
        <router-link to="/todo" class="is-size-5" id="todo-btn"
          >To-do</router-link
        >
      </li>
      <li id="habit">
        <router-link to="/habit" class="is-size-5" id="habit-btn"
          >Habit</router-link
        >
      </li>
      <li id="about">
        <router-link to="/about" class="is-size-5" id="about-btn"
          >About</router-link
        >
      </li>
      <li v-if="!$store.state.isAuthenticated" id="signup">
        <router-link to="/signup" class="is-size-5" id="signup-btn"
          >Signup</router-link
        >
      </li>
      <li v-if="!$store.state.isAuthenticated" id="login">
        <router-link to="/login" class="is-size-5" id="login-btn"
          >Login</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
// JQuery
import $ from "jquery";
// JQuery

export default {
  name: "Navbar",
  created() {
    $(document).ready(() => {
      //
      let homeTab = $("#home");
      let homeBtn = $("#home-btn");

      let todoTab = $("#todo");
      let todoBtn = $("#todo-btn");

      let habitTab = $("#habit");
      let habitBtn = $("#habit-btn");

      let aboutTab = $("#about");
      let aboutBtn = $("#about-btn");

      let signupTab = $("#signup");
      let signupBtn = $("#signup-btn");

      let loginTab = $("#login");
      let loginBtn = $("#login-btn");

      //
      homeBtn.click(() => {
        homeTab.addClass("is-active");
        todoTab.removeClass("is-active");
        habitTab.removeClass("is-active");
        aboutTab.removeClass("is-active");
        signupTab.removeClass("is-active");
        loginTab.removeClass("is-active");
      });

      todoBtn.click(() => {
        homeTab.removeClass("is-active");
        todoTab.addClass("is-active");
        habitTab.removeClass("is-active");
        aboutTab.removeClass("is-active");
        signupTab.removeClass("is-active");
        loginTab.removeClass("is-active");
      });

      habitBtn.click(() => {
        homeTab.removeClass("is-active");
        todoTab.removeClass("is-active");
        habitTab.addClass("is-active");
        aboutTab.removeClass("is-active");
        signupTab.removeClass("is-active");
        loginTab.removeClass("is-active");
      });

      aboutBtn.click(() => {
        homeTab.removeClass("is-active");
        todoTab.removeClass("is-active");
        habitTab.removeClass("is-active");
        aboutTab.addClass("is-active");
        signupTab.removeClass("is-active");
        loginTab.removeClass("is-active");
      });

      signupBtn.click(() => {
        homeTab.removeClass("is-active");
        todoTab.removeClass("is-active");
        habitTab.removeClass("is-active");
        aboutTab.removeClass("is-active");
        signupTab.addClass("is-active");
        loginTab.removeClass("is-active");
      });

      loginBtn.click(() => {
        homeTab.removeClass("is-active");
        todoTab.removeClass("is-active");
        habitTab.removeClass("is-active");
        aboutTab.removeClass("is-active");
        signupTab.removeClass("is-active");
        loginTab.addClass("is-active");
      });
    });
  },
};
</script>

<style lang="scss">
$border-color: hsl(0, 0%, 71%);

.tabs {
  padding: 0.25rem 0 0 0 !important;
  margin: 0 !important;
  border-top-right-radius: 0.3rem;
  border-top-left-radius: 0.3rem;
}
</style>
