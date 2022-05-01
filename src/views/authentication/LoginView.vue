<template>
  <div class="section">
    <h1 class="title has-text-centered">Login</h1>
    <form
      class="box auth-form has-background-primary-light"
      @submit.prevent="submitForm"
    >
      <div class="field">
        <label for="email" class="label">Email</label>
        <div class="control">
          <input
            type="email"
            class="input"
            name="email"
            placeholder="e.g. email@example.com"
            v-model="username"
          />
        </div>
      </div>
      <div class="field">
        <label for="password" class="label">Password</label>
        <div class="control">
          <input
            type="password"
            class="input"
            name="password"
            placeholder="**********"
            v-model="password"
          />
        </div>
      </div>
      <!-- handle errors -->
      <div class="notification is-danger is-light" v-if="errors.length">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
      <!-- handle errors -->
      <br />
      <div class="field">
        <div class="control form-button">
          <button type="submit" class="button is-success">Login</button>
        </div>
      </div>
    </form>
    <br />
    <p class="has-text-centered">
      Don't have an account? Click
      <router-link to="/signup" class="has-text-link signup-redirect"
        >here</router-link
      >
      to create one.
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import $ from "jquery";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    async submitForm() {
      this.$store.commit("setIsLoading", true);

      this.errors = [];

      if (this.username === "") {
        this.errors.push("Please provide a username-is required.");
      }

      if (this.password === "") {
        this.errors.push("Please provide password-is required.");
      }

      if (!this.errors.length) {
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("token");

        const formData = {
          username: this.username,
          password: this.password,
        };

        await axios
          .post("/auth/token/login/", formData)
          .then((response) => {
            console.log(response.data);

            const token = response.data.auth_token;

            this.$store.commit("setToken", token);

            axios.defaults.headers.common["Authorization"] = "Token " + token;

            localStorage.setItem("token", token);

            toast({
              message: "Successfully logged in.",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: "bottom-right",
            });

            this.$router.push("/");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}:${error.response.data[property]}`
                );
              }
            } else {
              this.errors.push("Ooops! Something went wrong.");
            }
          });
      }

      this.$store.commit("setIsLoading", false);
    },
  },
  created() {
    $(document).ready(() => {
      //
      let loginRedirect = $(".signup-redirect");

      //
      let homeTab = $("#home");
      let todoTab = $("#todo");
      let habitTab = $("#habit");
      let aboutTab = $("#about");
      let signupTab = $("#signup");
      let loginTab = $("#login");

      //
      loginRedirect.click(() => {
        homeTab.removeClass("is-active");
        todoTab.removeClass("is-active");
        habitTab.removeClass("is-active");
        aboutTab.removeClass("is-active");
        signupTab.addClass("is-active");
        loginTab.removeClass("is-active");
      });
    });
  },
};
</script>
