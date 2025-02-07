import axios from 'axios'
import type {App} from 'vue'

interface AxiosOptions {
    baseUrl?: string
    token?: string
}

function getCookie(cname: string) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default {
    install: (app: App, options: AxiosOptions) => {
   
        app.config.globalProperties.$axios = axios.create({
            baseURL: options.baseUrl,
        })

        app.config.globalProperties.$axios.interceptors.request.use(
            (config) => {
              const token = getCookie('token')
              if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
              }
          
              return config;
            },
          
            (error) => {
              return Promise.reject(error);
            }
          );

    }
}