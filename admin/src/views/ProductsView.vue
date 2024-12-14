<template>
    <div>
        <div>
            <h1>Products</h1>
            <button>Add Product</button>
        </div>
        <div v-for="product in products" :key="product._id">
            {{ product }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default defineComponent({
    name: "ProductsView",
    data() {
        return {
            products: null
        }
    },
    async beforeMount() {
       try {
        const products = await this.$axios.get('/products')
        console.log(products.data)
        this.products = products.data
       } catch( e ) {
        console.log(e)
       }
    }
})
</script>