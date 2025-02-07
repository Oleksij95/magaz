/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import VueCookies from 'vue-cookies'

const app = createApp(App)

// @ts-ignore
const token = $cookies.get("token")
console.log(token)

app
.use(axios, {
    baseUrl: 'http://localhost:5050',
    token
}).use(store).use(router).use(VueCookies)

app.mount('#app')
