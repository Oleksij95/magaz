<template>
    <div class="panel">
        <div class="panel-header">
            <div class="panel-title">Products ({{ products.length }})</div>
            <button class="accent-btn" @click="isShowNewProductPannel = true">Add Product</button>
        </div>
        <div class="panel-body-wrapper">
            <div class="panel-nav grid-5">
                <div>#</div>
                <div>Product</div>
                <div>Category</div>
                <div>Price</div>
                <div>Actions</div>
            </div>
            <div class="panel-body ">
                <div v-for="(product, idx) in products" :key="product._id" class="panel-item grid-5">
                    <div>{{ idx + 1 }}</div>
                    <div>{{ product.name }}</div>
                    <div>{{ product.price }}</div>
                    <div>{{ product.price }}</div>
                    <div>
                        <div @click="deleteProduct(product._id)" class="deleteProduct" title="delete"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="isShowNewProductPannel" class="new-product">
        <div class="new-product_head">
            <div class="title">Add new product</div>
            <div class="close" @click="isShowNewProductPannel = false"></div>
        </div>
        <form @submit.prevent="createNewProduct">
            <div class="form">
                <div class="filed">
                    <label for="seoTitle">Seo title</label>
                    <input type="text" name="seoTitle" id="seoTitle" v-model="product.seoTitle">
                </div>
                <div class="filed">
                    <label for="seoDescription">Seo description</label>
                    <input type="text" name="seoDescription" id="seoDescription" v-model="product.seoDescription">
                </div>
                <div class="filed">
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" v-model="product.name">
                </div>
                <div class="filed">
                    <label for="slug">Slug</label>
                    <input type="text" name="slug" id="slug" v-model="product.slug">
                </div>
                <div class="filed">
                    <label for="price">Price</label>
                    <input type="number " name="price" id="price" v-model="product.price">
                </div>
                <div class="filed">
                    <label for="description">Description</label>
                    <input type="text" name="description" id="description" v-model="product.description">
                </div>
                <div>
                    <div class="filed">
                        <input type="checkbox" name="isPopular" id="isPopular" v-model="product.isPopular">
                        <label for="isPopular" class="checkbox">is Popular</label>
                    </div>
                    <div class="filed">
                        <input type="checkbox" name="isNewProduct" id="isNewProduct" v-model="product.isNewProduct">
                        <label for="isNewProduct" class="checkbox">is New Product</label>
                    </div>
                </div>
            </div>
           <button type="submit" class="accent-btn">Add product</button>
        </form>
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

interface NewProduct {
    seoTitle?: string
    seoDescription?: string
    name: string
    slug: string
    price: number
    description?: string
    isPopular?:boolean
    isNewProduct?:boolean
}

export default defineComponent({
    name: "ProductsView",
    data() {
        return {
            products: [],
            isShowNewProductPannel: false,
            product: {
                seoTitle: '',
                seoDescription: '',
                name: '',
                slug: '',
                price: 0,
                description: '',
                isPopular: false,
                isNewProduct: false,
            } as NewProduct
        }
    },
    async beforeMount() {
       this.fetchProducts()
    },
    methods: {
        async fetchProducts() {
            try {
                const products = await this.$axios.get('/products')
                this.products = products.data
            } catch( e ) {
                console.log(e)
            }
        },
        async deleteProduct(id: string) {
          
            try {
                await this.$axios.delete('/products',  {data: {id}}).then(() => {
                    this.fetchProducts()
                })
            } catch( e ) {
                console.log(e)
            }
        },
        async createNewProduct() {
            this.$forceUpdate();
            const data = {
                seoTitle: this.product.seoTitle,
                seoDescription: this.product.seoDescription,
                name: this.product.name,
                slug: this.product.slug,
                price: this.product.price,
                description: this.product.description,
                isPopular: this.product.isPopular,
                isNewProduct: this.product.isNewProduct,
            }
            try {
                await this.$axios.post('/products', data).then(() => {
                    this.fetchProducts()
                    this.isShowNewProductPannel = false
                    this.product.seoTitle = ''
                    this.product.seoDescription = ''
                    this.product.name = ''
                    this.product.slug = ''
                    this.product.price = 0
                    this.product.description = ''
                    this.product.isPopular = false
                    this.product.isNewProduct = false
                })
            } catch( e ) {
                console.log(e)
            }
        
        }
    }
})
</script>