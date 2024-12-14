<template>
    <div>
        <TheNavbar />
        <div class="page-wrapper">
            <TopLine />
            <div class="page">
                <router-view/>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TopLine from '@/components/TopLine.vue';

export default defineComponent({
    components: {
        TheNavbar,
        TopLine
    },
});
</script>


<style lang="scss">
@import "./assets/scss/styles.scss"; 
</style>