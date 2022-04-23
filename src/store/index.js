import { createStore } from "vuex";

export default createStore({
  state: {
    isLoading: false,
    isAuthenticated: false,
    token: "",
    homeIsActive: true,
    todoIsActive: false,
    habitIsActive: false,
    signupIsActive: false,
    loginIsActive: false,
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("token")) {
          state.token = localStorage.getItem("token");
          state.isAuthenticated = true;
        } else {
          state.token = "";
          state.isAuthenticated = false;
        }
    },

    setIsLoading(state, status) {
        state.isLoading = status;
      },

    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },

    removeToken(state, token) {
      state.token = "";
      state.isAuthenticated = false;
    },

    setHomeIsActive(state, status) {
      state.homeIsActive = status;
      state.todoIsActive = false;
      state.habitIsActive = false;
      state.signupIsActive = false;
      state.loginIsActive = false;
    },

    setTodoIsActive(state, status) {
      state.todoIsActive = status;
      state.homeIsActive = false;
      state.habitIsActive = false;
      state.signupIsActive = false;
      state.loginIsActive = false;
    },

    setHabitIsActive(state, status) {
      state.habitIsActive = status;
      state.homeIsActive = false;
      state.todoIsActive = false;
      state.signupIsActive = false;
      state.loginIsActive = false;
    },

    setSignupIsActive(state, status) {
      state.signupIsActive = status;
      state.loginIsActive = false;
      state.habitIsActive = false;
      state.homeIsActive = false;
      state.todoIsActive = false;
    },

    setLoginIsActive(state, status) {
      state.loginIsActive = status;
      state.signupIsActive = false;
      state.habitIsActive = false;
      state.homeIsActive = false;
      state.todoIsActive = false;
    },

  },
  actions: {
  },
  modules: {
  },
});
