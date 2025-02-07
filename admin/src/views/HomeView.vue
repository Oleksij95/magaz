<template>
  <div class="home">
    <TheLogin />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TheLogin from '@/components/TheLogin.vue';
export default defineComponent({
  name: 'HomeView',
  components: {
    TheLogin
  },
});
</script>
