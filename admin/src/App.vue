<template>
    <div>
        <TheNavbar v-if="USER" />
        <div :class="{'page-wrapper': USER}">
            <TopLine v-if="USER" />
            <div :class="{page: USER}">
                <router-view/>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TopLine from '@/components/TopLine.vue';
import { mapGetters, mapActions } from 'vuex'
/* eslint-disable */
export default defineComponent({
    components: {
        TheNavbar,
        TopLine
    },
    computed:{
        ...mapGetters(['USER'])
    },
    methods: {
        ...mapActions(['checkAuth'])
    },
    async beforeMount() {
        await this.checkAuth()
        // @ts-ignore
        if ( this.USER && this.$router.currentRoute._value.name === "home" ) {
            // @ts-ignore
            this.$router.push("/products")
        }
    },
    watch: {
		$route() {
            // @ts-ignore
            if ( this.USER && this.$router.currentRoute._value.name === "home" ) {
                // @ts-ignore
                this.$router.push("/products")
            }
		}
	},
});
</script>


<style lang="scss">
@import "./assets/scss/styles.scss"; 
</style>