<template>
    <div class="grid-4">
        <StatisticItem v-for="item in statistics" :key="item.title" :title="item.title" :value="item.value"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatisticItem from '@/components/StatisticItem.vue';
import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance
    }
}

interface StatisticItemType {
    title: string
    value: string
}
export default defineComponent({
    name: "StatisitcView",
    components: {
        StatisticItem
    },
    data() {
        return {
            statistics: [
               
            ] as StatisticItemType[]
        }
    },
    async beforeMount() {
        const response = await this.$axios.get(`/statistics`)
        this.statistics = response.data
    }
})
</script>