export default {
    methods: {
        async fetchCategories() {
            try {
                const categories = await this.$axios.get('/categories')
                this.categories = categories.data
                return categories
            } catch( e ) {
                console.log(e)
            }
        },
    }
  }