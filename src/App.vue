<template>
  <div class="app container is-fluid">
    <div class="app-body">
      <!-- navigation -->
      <Navbar />
      <!-- navigation -->

      <!-- routers -->
      <div class="router">
        <router-view />
      </div>
      <!-- routers -->

      <!-- footer -->
      <Footer />
      <!-- footer -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  beforeCreate() {
    this.$store.commit("initializeStore");

    console.log(this.$store.state.user);

    if (this.$store.state.token) {
      axios.defaults.headers.common["Authorization"] =
        "Token " + this.$store.state.token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>

<style lang="scss">
// bulma
@import "../node_modules/bulma";
// bulma

$border-color: hsl(0, 0%, 71%);
$routers-background: hsl(0, 0%, 100%);
$body-background: hsl(206, 70%, 96%);

body {
  background-color: $body-background !important;
  padding: 1rem 0 !important;
  margin: 0 !important;
}

.app-body {
  box-shadow: 0px 0px 7px 2px $border-color;
  border-radius: 0.3rem;
}

.router {
  min-height: 100vh;
  border-left: 1px solid $border-color;
  border-right: 1px solid $border-color;
  background-color: $routers-background;
  padding: 1rem 0;
}
</style>
