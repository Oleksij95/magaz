<template>
    <div v-if="product" class="product-page">
        <form @submit.prevent="updateProduct" class="product-wrapper">
            <div>
                <div class="field">
                    <label for="image">Image</label>
                    <div class="product-image">
                        <input type="file" name="image" id="image"  accept="image/*" ref="logo" @change="onFileChange">
                        <img v-if="logo || product.img" :src="logo || product.img" />
                        <img v-else src="../assets/default.jpg"  />
                        <div v-if="logo || product.img" @click="deleteFile" class="delete"></div>
                    </div>
                </div>
                
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
                        <div>
                            <input type="checkbox" name="isPopular" id="isPopular" v-model="product.isPopular">
                            <label for="isPopular" class="checkbox">is Popular</label>
                        </div>

                        <div>
                            <input type="checkbox" name="isNewProduct" id="isNewProduct" v-model="product.isNewProduct">
                            <label for="isNewProduct" class="checkbox">is New Product</label>
                        </div>
                    </div>
                   
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
        $refs: HTMLFormElement
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
    isPopular?: boolean
    isNewProduct?: boolean
    img?: string
}

export default defineComponent({
    name: 'ProductWciew',
    mixins: [fetchCategories],
    data() {
        return {
            product: null as Product | null,
            categories: [],
            logo: '',
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
                category: this.product?.category,
                isPopular: this.product?.isPopular,
                isNewProduct: this.product?.isNewProduct,
            }
            await this.$axios.put('/products', data)
        },

        // eslint-disable-next-line 
        async onFileChange(e: any) {
            const file = e.target.files[0]
            if (file && file.size < 5 * 1024 * 1024) {
                const formData = new FormData();
                /* eslint-disable */ 
                // @ts-ignore
                formData.append('productId', this.product?._id);
                formData.append('image', file);
                const response = await this.$axios.post('/products/upload', formData)
                this.logo = response.data.imageUrl
            }
        },

        async deleteFile() {
            try {
                const data = {
                    productId: this.product?._id
                }
                await this.$axios.post('/products/upload/delete', data)
                this.logo = ''
                this.$refs.logo.value=""
            } catch (e) {
                console.log(e)
            }
        },
    }

});
</script>

<style lang="scss">
@import "@/assets/scss/vars.scss"; 
.product-wrapper{
    background-color: #fff;
    border-radius: 16px;
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
        padding: 12px 16px;
        border-radius: 8px;
        outline: none;
        border: 1px solid #dbdbdb;
        font-size: 16px;
    }
    textarea{
        min-height: 200px;
    }
    .product-image{
        border: 1px dashed #ccc;
        width: 200px;
        height: 200px;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        input{
            position: absolute;
            width: 100%;
            height: 100%;
            border: none;
            opacity: 0;
        }
        img{
            max-width: 100%;
            border-radius: 4px;
        }
        .delete{
            position: absolute;
            right: 8px;
            top: 8px;
            width: 20px;
            height: 20px;
            background: url("../assets/delete.svg");
            background-size: cover;
            cursor: pointer;
            z-index: 1;
        }
    }

    label{
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        position: relative;
        cursor: pointer;
        &.checkbox{
            padding-left: 30px;
            margin-top: 16px;
            &::before{
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 16px;
                height: 16px;
                border-radius: 4px;
                border: 1px solid $btn-primary;
            }
        }
    }


    input[type='checkbox']{
        display: none;
    }

    input:checked ~ label{
        &::before{
            background: $btn-primary;
        }
    }

}
</style>