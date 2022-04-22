<template>
  <div class="home">
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
        <a href="#" class="is-underlined has-text-link">Learn more</a>
      </p>
    </div>
    <!-- intro -->
    <hr />
    <!-- todo section -->
    <div class="todo-section">
      <div class="todo-image">
        <img src="@/assets/todo-thumbnail.jpg" alt="todo app thumbnail" />
      </div>
      <div class="todo-caption">
        <p class="is-size-4">
          <strong class="has-text-primary is-underlined">Todo App</strong> is a
          beautifully designed application that lets you create a 'to-do list'
          that helps you keep track and focus on your activities.
        </p>
        <br />
        <p class="get-started">
          <a href="#" class="button is-primary">Get started</a>
        </p>
      </div>
    </div>
    <!-- todo section -->
    <hr />
    <!-- habit section -->
    <div class="habit-section">
      <div class="habit-caption">
        <p class="is-size-4">
          <strong class="has-text-link is-underlined">Habit Tracker App</strong>
          is a wonderful application if you want to start a new habit and track
          your progress throughout. It is a good place to start for personal
          development.
        </p>
        <br />
        <p class="get-started">
          <a href="#" class="button is-info">Get started</a>
        </p>
      </div>
      <div class="habit-image">
        <img
          src="@/assets/habit-thumbnail.jpg"
          alt="habit tracker app thumbnail"
        />
      </div>
    </div>
    <!-- habit section -->
    <hr />
    <!-- visualization section -->
    <div class="visualization-section">
      <div class="visualization-image">
        <img
          src="@/assets/visualization-thumbnail.jpg"
          alt="data visualization thumbnail"
        />
      </div>
      <div class="visualization-caption">
        <p class="is-size-4">
          <strong class="has-text-danger is-underlined"
            >Data Visualization</strong
          >
          is a sub-functionality offered by the habit tracker app, that helps
          you visualize your data (habit), making it easier to track your
          progress.
        </p>
        <br />
        <p class="get-started">
          <a href="#" class="button is-danger">Get started</a>
        </p>
      </div>
    </div>
    <!-- visualization section -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>

<style lang="scss">
.intro-text {
  width: 70%;
  margin: auto;
}

.todo-section,
.habit-section,
.visualization-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 2rem;
}

.todo-caption,
.habit-caption,
.visualization-caption {
  text-align: justify;
  width: 90%;
  margin: auto;
}

.get-started {
  text-align: center;
}
</style>
