export default {
    methods: {
        async fetchCategories() {
            /* eslint-disable */
            // @ts-ignore
            const token = this.$cookies.get('token')
            try {
                const categories = await this.$axios.get('/categories',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                this.categories = categories.data
                return categories
            } catch( e ) {
                console.log(e)
            }
        },
    }
  }