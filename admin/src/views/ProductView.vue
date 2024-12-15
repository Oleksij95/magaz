<template>
    <div v-if="product" class="product-page">
        <form @submit.prevent="updateProduct" class="product-wrapper">
            <div>
                <div class="row">
                    <div class="field">
                        <label for="name">Name</label>
                        <input type="text" name="name" v-model="product.name" id="name" class="title">
                    </div>
                   <div class="field">
                        <label for="slug">Slug</label>
                        <input type="text" name="slug" v-model="product.slug" id="slug">
                   </div>
                </div>
                
                <div class="field">
                    <label for="description">Description</label>
                    <textarea type="text" name="description" v-model="product.description" id="description"></textarea>
                </div>

                <div class="row">
                    <div class="field">
                        <label for="price">Price</label>
                        <input type="number" name="price" v-model="product.price" id="price" >
                    </div>
                    <div class="field">
                        <label for="category">Category</label>
                        <select name="category" id="category" v-model="product.category">
                            <option :value="category._id" v-for="category in categories" :key="category._id">{{category.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <button type="submit" class="accent-btn">Update</button>
        </form>
    </div>
</template>

<script lang="ts">


import { defineComponent } from 'vue';
import type {AxiosInstance} from 'axios'
import fetchCategories from "@/mixin/fetchCategories"

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance
        // eslint-disable-next-line 
        $route: any
    }
}

interface Product {
    _id: string
    seoDescription?: string
    name: string
    slug: string
    price: number
    description?: string
    category?: string
    isPopular?:boolean
    isNewProduct?:boolean
}

export default defineComponent({
    name: 'ProductWciew',
    mixins: [fetchCategories],
    data() {
        return {
            product: null as Product | null,
            categories: []
        }
    },
    async beforeCreate() {
        const id = this.$route.params.id
        const product =  await this.$axios.get(`/products/${id}`)
        const categories = this.fetchCategories()
        this.product = product.data
        this.categories = categories.data
    },
    methods: {
        async updateProduct() {
            const data = {
                id: this.product?._id,
                name: this.product?.name,
                slug: this.product?.slug,
                price: this.product?.price,
                description: this.product?.description,
                category: this.product?.category
            }
            await this.$axios.put('/products', data)
        }
    }


});
</script>

<style lang="scss">
.product-wrapper{
    background-color: #fff;
    border-radius: 24px;
    padding: 40px;
    .row{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      
    }

    .field{
        margin-bottom: 16px;
    }

    label{
        display: block;
        margin-bottom: 8px;
    }
  
    input, textarea, select{
        width: 100%;
        padding: 20px;
        border-radius: 8px;
        outline: none;
        border: 1px solid #dbdbdb;
        font-size: 16px;
    }
    textarea{
        min-height: 200px;
    }
}
</style>