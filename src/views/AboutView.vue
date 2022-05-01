<template>
  <br />
  <div class="title has-text-centered">About Personal App</div>
  <!-- todo section -->
  <div class="todo-section">
    <div class="todo-caption">
      <p class="title has-text-centered">
        <i class="bi bi-clock-history"></i>
      </p>
      <p class="is-size-4">
        Todo App is a beautifully designed application that lets you create a
        'to-do list' that helps you keep track and focus on your activities.
        <router-link
          to="/todo"
          class="has-text-link-dark is-underlined todo-redirect"
          >Get started</router-link
        >
      </p>
    </div>
  </div>
  <!-- todo section -->
  <br />
  <br />
  <!-- habit section -->
  <div class="habit-section">
    <div class="habit-caption">
      <p class="title has-text-centered">
        <i class="bi bi-calendar2-week"></i>
      </p>
      <p class="is-size-4">
        Habit Tracker App is a wonderful application if you want to start a new
        habit and track your progress. It is a good place to start for personal
        development.
        <router-link
          to="/habit"
          class="has-text-link-dark is-underlined habit-redirect"
          >Get started</router-link
        >
      </p>
    </div>
  </div>
  <!-- habit section -->
  <br />
  <br />
  <!-- visualization section -->
  <div class="visualization-section">
    <div class="visualization-caption">
      <p class="title has-text-centered">
        <i class="bi bi-graph-up"></i>
      </p>
      <p class="is-size-4">
        Data Visualization is a sub-functionality offered by the habit tracker
        app, that helps you visualize your data (habit), making it easier to
        track your progress.
        <router-link
          to="/habit"
          class="has-text-link-dark is-underlined habit-redirect"
          >Get started</router-link
        >
      </p>
    </div>
  </div>
  <!-- visualization section -->
  <br />
</template>

<script>
import $ from "jquery";

export default {
  name: "AboutView",
  created() {
    $(document).ready(() => {
      //
      let todoRedirect = $(".todo-redirect");
      let habitRedirect = $(".habit-redirect");

      //
      let homeTab = $("#home");
      let todoTab = $("#todo");
      let habitTab = $("#habit");
      let aboutTab = $("#about");
      let signupTab = $("#signup");
      let loginTab = $("#login");

      //
      todoRedirect.click(() => {
        homeTab.removeClass("is-active");
        todoTab.addClass("is-active");
        habitTab.removeClass("is-active");
        aboutTab.removeClass("is-active");
        signupTab.removeClass("is-active");
        loginTab.removeClass("is-active");
      });

      habitRedirect.click(() => {
        homeTab.removeClass("is-active");
        todoTab.removeClass("is-active");
        habitTab.addClass("is-active");
        aboutTab.removeClass("is-active");
        signupTab.removeClass("is-active");
        loginTab.removeClass("is-active");
      });
    });
  },
};
</script>

<style lang="scss">
.todo-section,
.habit-section,
.visualization-section {
  width: 70%;
  margin: auto;
}

.todo-caption,
.habit-caption,
.visualization-caption {
  text-align: center;
  width: 50%;
  margin: auto;
}

.bi {
  font-size: 5rem !important;
}
</style>
