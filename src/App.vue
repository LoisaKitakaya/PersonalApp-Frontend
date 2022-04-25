<template>
  <div class="loader" v-bind:class="{ show: $store.state.isLoading }"></div>
  <div
    class="app container is-fluid"
    v-bind:class="{ hide: $store.state.isLoading }"
    id="top"
  >
    <div class="app-body card">
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

// fonts
@import url("https://fonts.googleapis.com/css2?family=Courgette&family=Rokkitt&display=swap");

// families
$Rokkitt: "Rokkitt", serif;

// fonts

// bootstrap icons

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");

// bootstrap icons

// animate.css

@import "../node_modules/animate.css";

// animate.css

$border-color: hsl(0, 0%, 71%);
$routers-background: hsl(0, 0%, 100%);

body {
  padding: 1rem 0 !important;
  margin: 0 !important;
  scroll-behavior: smooth !important;
  background-color: #ffffff;
  font-family: $Rokkitt;
  // background-image: url("@/assets/body-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.app-body {
  // box-shadow: 0px 0px 7px 2px $border-color;
  border-radius: 0.3rem;
  border: 1px solid $border-color;
}

.router {
  // min-height: 100vh;
  // background-color: $routers-background;
  padding: 1rem;
  background-image: url("@/assets/body-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.auth-form {
  width: 50% !important;
  margin: auto;
}

.form-button {
  width: fit-content;
  margin: auto;
}

// App Container
// App Container
// App Container

$card-background-color: hsl(0, 0%, 100%);

.app-window {
  display: flex;
  height: 600px;
  border: 1px solid $border-color;
  border-radius: 0.3rem;
  margin: 0 4rem;
}

.app-menu {
  position: relative;
  width: 20%;
  top: 0;
  left: 0;
  padding: 2rem 1rem;
  text-align: center;
  overflow-y: auto;
  border-right: 1px solid $border-color;
  border-top-left-radius: 0.3rem;
  border-bottom-left-radius: 00.3rem;
}

.app-screen,
.app-screen-not-authenticated {
  width: 80%;
  top: 0;
  right: 0;
  padding: 2rem 4rem;
  overflow-y: auto;
  text-align: justify;
  background-image: url("@/assets/todo-window-background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}

.app-screen::-webkit-scrollbar,
.app-menu::-webkit-scrollbar {
  width: 7px;
}

.app-screen::-webkit-scrollbar-thumb,
.app-menu::-webkit-scrollbar-thumb {
  background-color: rgba(47, 79, 79, 0.24);
  border-radius: 0.3rem;
}

.app-menu::-webkit-scrollbar-track,
.app-screen::-webkit-scrollbar-track {
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}

.app-screen,
.app-menu {
  scrollbar-width: thin;
  scrollbar-color: white darkgray;
}

.tag-link {
  padding: 0.65rem 0;
  border-bottom: 1px solid $border-color;
}

.menu-link {
  padding: 0.65rem;
}

.card {
  background-color: $card-background-color !important;
}

.app-card {
  margin-bottom: 1rem;
  opacity: 0.9 !important;
}

.app-card-detail {
  margin-top: 6rem;
}

.app-screen-not-authenticated {
  padding-top: 10rem;
}

.card-divider {
  margin: 0.5rem;
}

// App Container
// App Container
// App Container

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 120px;
  height: 120px;
  margin: -76px 0 0 -76px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;
  display: none;
}

.show {
  display: block !important;
}

.hide {
  display: none !important;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
