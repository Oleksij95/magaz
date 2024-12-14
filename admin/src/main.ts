import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'

const app = createApp(App)

app.use(axios, {
    baseUrl: 'http://localhost:5050',
}).use(store).use(router)


app.mount('#app')
