<template>
  <div class="tabs is-centered has-background-primary-light">
    <ul>
      <li v-bind:class="{ 'is-active': $store.state.homeIsActive }">
        <router-link to="/" @click="homeChangeActive" class="is-size-5"
          >Home</router-link
        >
      </li>
      <li v-bind:class="{ 'is-active': $store.state.todoIsActive }">
        <router-link to="/todo" @click="todoChangeActive" class="is-size-5"
          >To-do</router-link
        >
      </li>
      <li v-bind:class="{ 'is-active': $store.state.habitIsActive }">
        <router-link to="/habit" @click="habitChangeActive" class="is-size-5"
          >Habit</router-link
        >
      </li>
      <li
        v-bind:class="{ 'is-active': $store.state.signupIsActive }"
        v-if="!$store.state.isAuthenticated"
      >
        <router-link to="/signup" @click="signupChangeActive" class="is-size-5"
          >Signup</router-link
        >
      </li>
      <li
        v-bind:class="{ 'is-active': $store.state.loginIsActive }"
        v-if="!$store.state.isAuthenticated"
      >
        <router-link to="/login" @click="loginChangeActive" class="is-size-5"
          >Login</router-link
        >
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
    signupChangeActive() {
      this.$store.commit("setSignupIsActive", true);
    },

    loginChangeActive() {
      this.$store.commit("setLoginIsActive", true);
    },
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
