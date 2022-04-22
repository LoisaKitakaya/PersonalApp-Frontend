import { createStore } from "vuex";

export default createStore({
  state: {
    isLoading: false,
    isAuthenticated: false,
    token: "",
    user: {
      id: 0,
      username: "",
    },
    homeIsActive: true,
    todoIsActive: false,
    habitIsActive: false,
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("token")) {
          state.token = localStorage.getItem("token");
          state.isAuthenticated = true;
          state.user.id = localStorage.getItem("userid");
          state.user.username = localStorage.getItem("username");
        } else {
          state.token = "";
          state.isAuthenticated = false;
          state.user.id = 0;
          state.user.username = "";
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

    setUser(state, user) {
      state.user = user;
      // state.user.id = user.id;
      // state.user.username = user.username;
    },

    setHomeIsActive(state, status) {
      state.homeIsActive = status;
      state.todoIsActive = false;
      state.habitIsActive = false;
    },

    setTodoIsActive(state, status) {
      state.todoIsActive = status;
      state.homeIsActive = false;
      state.habitIsActive = false;
    },

    setHabitIsActive(state, status) {
      state.habitIsActive = status;
      state.homeIsActive = false;
      state.todoIsActive = false;
    }

    // removeUser(state, user) {
    //   state.user.id = 0;
    //   state.user.username = "";
    // },

  },
  actions: {
  },
  modules: {
  },
});
