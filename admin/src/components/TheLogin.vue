<template>
    <div class="login">
       
        <form @submit.prevent="handlerForm">
            <div v-if="error" class="error">{{ error }}</div>
            <h1>Login</h1>
            <input type="text" name="email" v-model="email" placeholder="Email">
            <input type="password" name="pass" v-model="pass" placeholder="Password">
            <button type="submit" class="accent-btn">Login</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type {AxiosInstance} from 'axios'
import { mapActions } from 'vuex'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    // eslint-disable-next-line
    $cookies: any
  }
}

export default defineComponent({
    data() {
        return {
            email: '',
            pass: '',
            error: ''
        }
    },
    methods: {
        async handlerForm() {
            this.error = ''
            const login = await this.login({
                email: this.email,
                password: this.pass
            })  
            if (login.status > 200) {
                login.response?.data?.error ? this.error = login?.response?.data?.error : this.error = login.message
            }
        },
        ...mapActions(['login'])
    },
   
})
</script>

<style lang="scss">
@import "@/assets/scss/login.scss"; 
</style>