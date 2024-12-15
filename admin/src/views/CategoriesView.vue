<template>
    <div class="panel">
        <div class="panel-header">
            <div class="panel-title">Categories ({{ categories.length }})</div>
            <button class="accent-btn" @click="isShowNewCatPannel = true">Add Category</button>
        </div>
        <div class="panel-body-wrapper">
            <div class="panel-nav grid-5">
                <div>#</div>
                <div>ID</div>
                <div>Category</div>
                <div>Products in category</div>
            </div>
            <div class="panel-body">
                <div v-for="(category, idx) in categories" :key="category._id" class="panel-item grid-5">
                    <div>{{ idx + 1 }}</div>
                    <div>{{ category._id }}</div>
                    <div>{{ category.name }}</div>
                    <div>{{ category.products.length }}</div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="isShowNewCatPannel" class="new-cat">
        <div class="new-product_head">
            <div class="title">Add new category</div>
            <div class="close" @click="isShowNewCatPannel = false"></div>
        </div>
        <form @submit.prevent="createNewCat">
            <div class="form">
                <div class="field">
                    <label for="seoTitle">Name</label>
                    <input type="text" name="seoTitle" id="seoTitle" v-model="cat.name" :class="{errorField: error}">
                    <div v-if="error" class="error">{{ error }}</div>
                </div>
            </div>
           <button type="submit" class="accent-btn">Add category</button>
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

export default defineComponent({
    name: "ProductsView",
    mixins: [fetchCategories],
    data() {
        return {
            isShowNewCatPannel: false,
            categories: [],
            cat: {
                name: ""
            },
            error: null
        }
    },
    async beforeMount() {
       this.fetchCategories()
    },
    methods: {
        async createNewCat() {
            try {
                const data = {
                    name: this.cat.name
                }
                await this.$axios.post('/categories', data).then(() => {
                    this.fetchCategories()
                    this.isShowNewCatPannel = false
                    this.cat.name = ''
                    this.error = null
                })
            // eslint-disable-next-line 
            } catch( e:any ) {
                this.error = e.response.data.error
            }
        }
    }
})
</script>