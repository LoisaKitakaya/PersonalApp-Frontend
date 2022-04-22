<template>
  <div class="tabs is-centered has-background-primary-light">
    <ul>
      <li v-bind:class="{ 'is-active': $store.state.homeIsActive }">
        <a href="#" @click="homeChangeActive">Home</a>
      </li>
      <li v-bind:class="{ 'is-active': $store.state.todoIsActive }">
        <a href="#" @click="todoChangeActive">Todo</a>
      </li>
      <li v-bind:class="{ 'is-active': $store.state.habitIsActive }">
        <a href="#" @click="habitChangeActive">Habit</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    homeChangeActive() {
      this.$store.commit("setHomeIsActive", true);
    },

    todoChangeActive() {
      this.$store.commit("setTodoIsActive", true);
    },

    habitChangeActive() {
      this.$store.commit("setHabitIsActive", true);
    },
  },
};
</script>

<style lang="scss">
$border-color: hsl(0, 0%, 71%);

.tabs {
  padding: 0.25rem 0 0 0 !important;
  margin: 0 !important;
  border-left: 1px solid $border-color;
  border-right: 1px solid $border-color;
  border-top: 1px solid $border-color;
  border-top-right-radius: 0.3rem;
  border-top-left-radius: 0.3rem;
}
</style>
