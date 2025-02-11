<template>
    <div class="panel">
        <div class="panel-header">
            <div class="panel-title">Products </div>
            <div class="serch-wrapper">
                <form action="" @submit.prevent="searchProducts">
                    <input type="text" name="term" placeholder="Search..." v-model="term">
                    <svg v-if="term" @click="clearSearch" width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48ZM24,1A23,23,0,1,0,47,24,23,23,0,0,0,24,1Z" stroke="red" />
                        <path d="M18.7,29.8A0.5,0.5,0,0,1,18.34,29L29,18.34a0.5,0.5,0,0,1,.71.71L19.05,29.66A0.5,0.5,0,0,1,18.7,29.8Z" stroke="red" />
                        <path d="M29.3,29.8A0.5,0.5,0,0,1,29,29.66L18.34,19A0.5,0.5,0,0,1,19,18.34L29.66,29A0.5,0.5,0,0,1,29.3,29.8Z" stroke="red" />
                        <rect width="48" height="48" fill="none"/>
                    </svg>
                    <button type="submit" class="submit">Search</button>
                </form>
                
            </div>
            <button class="accent-btn" @click="isShowNewProductPannel = true">Add Product</button>
        </div>
        <div class="panel-body-wrapper">
            <div class="panel-nav grid-6 gap">
                <div>#</div>
                <div>Image</div>
                <div>Product</div>
                <div>Category</div>
                <div>Price</div>
                <div>Actions</div>
            </div>
            <div class="panel-body ">
                <router-link :to="`products/${product._id}`" v-for="(product, idx) in products" :key="product._id" class="panel-item grid-6 gap">
                    <div>{{ idx + 1 }}</div>
                    <div>
                        <img :src="product.img" width="60" v-if="product.img" />
                        <img src="../assets/default.jpg" width="60" v-else />
                    </div>
                    <div>{{ product.name }}</div>
                    <div>{{ product?.category?.name }}</div>
                    <div>{{ product.price }}</div>
                    <div @click.prevent.stop="deleteProduct(product._id)" class="deleteProduct" title="delete"></div>
                </router-link>
            </div>
        </div>

        <div class="pagination">
            <div @click="setPrevPage">prev</div>
            {{ page }} of {{ totalPages }} 
            <div @click="setNextPage">next</div>
        </div>
    </div>

    <div v-if="isShowNewProductPannel" class="new-product">
        <div class="new-product_head">
            <div class="title">Add new product</div>
            <div class="close" @click="isShowNewProductPannel = false"></div>
        </div>
        <form @submit.prevent="createNewProduct">
            <div class="form">
                <div class="field">
                    <label for="seoTitle">Seo title</label>
                    <input type="text" name="seoTitle" id="seoTitle" v-model="product.seoTitle">
                </div>
                <div class="field">
                    <label for="seoDescription">Seo description</label>
                    <input type="text" name="seoDescription" id="seoDescription" v-model="product.seoDescription">
                </div>
                <div class="field">
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" v-model="product.name">
                </div>
                <div class="field">
                    <label for="slug">Slug</label>
                    <input type="text" name="slug" id="slug" v-model="product.slug">
                </div>
                <div class="field">
                    <label for="price">Price</label>
                    <input type="number " name="price" id="price" v-model="product.price">
                </div>

                <div class="field">
                    <label for="category">Category</label>
                    <select name="category" id="category" v-model="product.category">
                        <option :value="category._id" v-for="category in categories" :key="category._id">{{category.name}}</option>
                    </select>
                </div>

                <div class="field">
                    <label for="description">Description</label>
                    <input type="text" name="description" id="description" v-model="product.description">
                </div>
                <div>
                    <div class="field">
                        <input type="checkbox" name="isPopular" id="isPopular" v-model="product.isPopular">
                        <label for="isPopular" class="checkbox">is Popular</label>
                    </div>
                    <div class="field">
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
import fetchCategories from "@/mixin/fetchCategories"

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

interface NewProduct {
    _id: string
    seoTitle?: string
    seoDescription?: string
    name: string
    slug: string
    price: number | string
    description?: string
    category: Category
    isPopular?: boolean
    isNewProduct?: boolean
    img?: string
}

interface Category {
    _id: string
    name: string
}

export default defineComponent({
    name: "ProductsView",
    mixins: [fetchCategories],
    data() {
        return {
            products: [] as NewProduct[],
            isShowNewProductPannel: false,
            categories: [] as Category[],
            term: "",
            page: 1 as number,
            totalPages: 0,
            product: {
                seoTitle: '',
                seoDescription: '',
                name: '',
                slug: '',
                price: 0,
                description: '',
                category: {},
                isPopular: false,
                isNewProduct: false,
            } as NewProduct
        }
    },
    async beforeMount() {
        const page = this.$route?.query?.page
        if (typeof page === 'string') {
            this.page = parseInt(page)
        }
       this.fetchProducts(this.page)
       this.fetchCategories()
    },
    methods: {
        async fetchProducts(page: number) {
            try {
                const products = await this.$axios.get(`/products?limit=10&name=${this.term}&page=${page}`)
                this.products = products.data.products
                this.page = products.data.page
                this.totalPages = products.data.totalPages
            } catch( e ) {
                console.log(e)           
            }
        },
        searchProducts() {
            this.page = 1
            this.fetchProducts(this.page)
        },

        async clearSearch() {
            this.term = ""
            this.fetchProducts(this.page)
        },

        setNextPage() {
            this.page = this.page + 1
            this.fetchProducts(this.page)
            this.$router.push({ query: { page: this.page }})
        },

        setPrevPage() {
            this.page = this.page - 1
            this.page > 1 ? this.fetchProducts(this.page) :  this.fetchProducts(1)
            this.$router.push({ query: { page: this.page }})
        },

        async deleteProduct(id: string) {
            try {
                await this.$axios.delete('/products',  {data: {id}}).then(() => {
                    this.fetchProducts(this.page)
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
                category: this.product.category,
            }
            try {
                await this.$axios.post('/products', data).then(() => {
                    this.fetchProducts(this.page)
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
        
        },
     
    }
})
</script>