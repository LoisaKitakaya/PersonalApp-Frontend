<template>
  <div class="section">
    <h1 class="title has-text-centered">Signup</h1>
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
      <div class="field">
        <label for="password2" class="label">Confirm password</label>
        <div class="control">
          <input
            type="password"
            class="input"
            name="password2"
            placeholder="**********"
            v-model="password2"
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
          <button type="submit" class="button is-success">Submit</button>
        </div>
      </div>
    </form>
    <br />
    <p class="has-text-centered">
      Already have an account? Click
      <router-link to="/login" class="has-text-link login-redirect"
        >here</router-link
      >
      to log in.
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import $ from "jquery";

export default {
  name: "SignupView",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
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

      if (this.password !== this.password2) {
        this.errors.push("Passwords don't match-must be identical.");
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };

        await axios
          .post("/auth/users/", formData)
          .then((response) => {
            console.log(response.data);

            toast({
              message: "Account was created. Please login.",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: "bottom-right",
            });

            this.$router.push("/login");
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
      let loginRedirect = $(".login-redirect");

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
        signupTab.removeClass("is-active");
        loginTab.addClass("is-active");
      });
    });
  },
};
</script>
