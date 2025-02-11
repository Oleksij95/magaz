<template>
    <div class="statistic-item">
        <div class="statistic-item_title">{{ title }}</div>
        <div class="statistic-item_value">{{ value }}</div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        value: { 
            type: String,
            required: true
        }
    }
})
</script>

<style lang="scss" >
.statistic-item{
    background-color: #fff;
    box-shadow: 0 1px 1px 1px #c0c0c0;
    padding: 16px;
    border-radius: 8px;
    &_title{
        font-size: 16px;
        color: #a1a1a1;
        margin-bottom: 8px;
    }
    &_value{
        font-size: 28px;
        color: #000;
        font-weight: 600;
    }
}
</style>