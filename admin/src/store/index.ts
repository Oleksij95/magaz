/* eslint-disable */
import axios from 'axios';

import { createStore  } from 'vuex'

const baseUrl = process.env.BASE_URL || 'http://localhost:5050';

type authLoginData = {
    data: {
        userDto: {
            email: string,
            id: string,
            name: string,
        },
        token: string
    }   
}


export default createStore({
    state: {
        user: null,
        isAuthenticated: false
    },
    getters: {
        USER(state) {
            return state.user
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            state.isAuthenticated = true
        }
    },
    actions: {
        async login({commit}, data) {
            const response = await axios.post('http://localhost:5050/auth/login', data).then((res: authLoginData) => {
                commit('setUser', res.data.userDto)
                // @ts-ignore
                $cookies.set('token', res.data.token, '1h')
                return {status: 'Ok'}
            }).catch((e) => {
                return e
            })
            // console.log(response)
            return response
        },
        async checkAuth({commit}) {
            try {
                // @ts-ignore
                const token = $cookies.get('token')
                // @ts-ignore
                const user = await axios.get('http://localhost:5050/auth/checkAuth', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                commit('setUser', user.data.user)
                return token
            } catch( e ) {
                // console.log(e)
            }
        },

    },
    modules: {
    }
})
