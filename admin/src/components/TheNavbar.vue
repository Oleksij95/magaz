<template>
    <div class="navbar">
        <nav>
            <router-link to="/statistics">Statistics</router-link>
            <router-link to="/products">Products</router-link>
            <router-link to="/categories">Categories</router-link>
            <router-link to="/">Orders</router-link>
        </nav>
        <div @click="logoutUser" class="logout">Logout</div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
export default defineComponent({
    methods: {
        logoutUser() {
            this.$cookies.remove("token");
            this.logout()
            this.$router.push({ name: 'home' })
        },
        ...mapActions(['logout'])
    }
})
</script>