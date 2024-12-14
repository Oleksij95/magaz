<template>
    <div class="top-line">
        <TheUser />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import TheUser from '@/components/TheUser.vue';
export default defineComponent({
    components: {
        TheUser
    }
})
</script>