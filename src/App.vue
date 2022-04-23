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

$border-color: hsl(0, 0%, 71%);
$routers-background: hsl(0, 0%, 100%);
$body-background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23ffffff' stroke-width='.5' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cuse fill='%23fcfcfc' href='%23s' y='2'/%3E%3Cuse fill='%23fcfcfc' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='2'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23f2f2f2'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23efefef'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");

body {
  padding: 1rem 0 !important;
  margin: 0 !important;
  scroll-behavior: smooth !important;
  background-color: #ffffff;
  background-image: $body-background;
  background-attachment: fixed;
  background-size: cover;
  font-family: $Rokkitt;
}

.app-body {
  // box-shadow: 0px 0px 7px 2px $border-color;
  border-radius: 0.3rem;
  border: 1px solid $border-color;
}

.router {
  min-height: 100vh;
  background-color: $routers-background;
  padding: 1rem;
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
  // box-shadow: 1px 1px 7px 2px $border-color;
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

.app-screen {
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
  opacity: 0.9 !important;
  background-color: $card-background-color !important;
}

.app-card {
  margin-bottom: 1rem;
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
