import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// custom config
import axios from 'axios'

// default axios url
axios.defaults.baseURL = "https://personalapp-backend.herokuapp.com";

createApp(App).use(store).use(router).mount('#app')
