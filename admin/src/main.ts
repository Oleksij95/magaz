/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import VueCookies from 'vue-cookies'

const app = createApp(App)


app
.use(axios, {
    baseUrl: 'http://localhost:5050',
}).use(store).use(router).use(VueCookies)

app.mount('#app')
