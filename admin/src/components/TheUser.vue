<template>
    <div class="user">
        {{ USER.name.charAt(0) }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex'
export default defineComponent({
    computed:{
        ...mapGetters(['USER'])
    },
})
</script>

<style lang="scss">
@import "@/assets/scss/user.scss"; 
</style>