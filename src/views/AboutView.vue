<template>
  <div class="title has-text-centered">About Personal App</div>
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
        <router-link
          to="/todo"
          @click="todoChangeActive"
          class="button is-primary"
          >Get started</router-link
        >
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
        <router-link
          to="/habit"
          @click="habitChangeActive"
          class="button is-info"
          >Get started</router-link
        >
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
        is a sub-functionality offered by the habit tracker app, that helps you
        visualize your data (habit), making it easier to track your progress.
      </p>
      <br />
      <p class="get-started">
        <router-link
          to="/habit"
          @click="habitChangeActive"
          class="button is-danger"
          >Get started</router-link
        >
      </p>
    </div>
  </div>
  <!-- visualization section -->
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style lang="scss">
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

.todo-caption,
.visualization-caption {
  margin-left: 1rem;
}

.habit-caption {
  margin-right: 1rem;
}

.todo-image,
.visualization-image {
  margin-right: 1rem;
}

.habit-image {
  margin-left: 1rem;
}
.get-started {
  text-align: center;
}
</style>
