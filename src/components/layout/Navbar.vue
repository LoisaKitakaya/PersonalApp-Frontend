<template>
  <div class="tabs is-centered has-background-primary-light">
    <ul>
      <li class="is-active">
        <router-link to="/" class="is-size-5">Home</router-link>
      </li>
      <li>
        <router-link to="/todo" class="is-size-5">To-do</router-link>
      </li>
      <li>
        <router-link to="/habit" class="is-size-5">Habit</router-link>
      </li>
      <li>
        <router-link to="/about" class="is-size-5">About</router-link>
      </li>
      <li v-if="!$store.state.isAuthenticated">
        <router-link to="/signup" class="is-size-5">Signup</router-link>
      </li>
      <li v-if="!$store.state.isAuthenticated">
        <router-link to="/login" class="is-size-5">Login</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
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
