const Product = require("../models/Product")
const Category = require("../models/Category")

class Products {
    async getProducts(req, res) {
      try {
        const products = await Product.find().sort({date_create:'desc'})
        const productsDto = []
        for (let product of products) {
            const category = await Category.findById(product.category)
            let productDto = {}
            productDto._id = product._id   
            productDto.name = product.name
            productDto.slug = product.slug
            productDto.price = product.price
            productDto.isPopular = product.isPopular
            productDto.isNewProduct = product.isNewProduct
            productDto.img = product.img
            productDto.description = product.description
            productDto.date_create = product.date_create
            productDto.category = category
            productsDto.push(productDto)
        }

        return res.json(productsDto)
      } catch( e ) {
        console.log(e)
      }
    }

    async createProduct(req, res) {
      try {
        const {seoTitle, seoDescription, name, slug, price, description, category, isPopular, isNewProduct} = req.body
        const newProduct = await Product.create( {seoTitle, seoDescription, name, slug, price, description, category, isPopular, isNewProduct} )
        return res.json({ok: true})
      } catch( e ) {
        console.log(e)
      }
    }

    async deleteProduct(req, res) {
      try {
        const id = req.body.id
        const candidate = await Product.findById(id)

        if (!candidate) {
          return res.status(404).json({message: 'Product not found'})
        }

        const product = await Product.deleteOne(candidate)
        return res.json({status: 'ok', product})

      } catch( e ) {
        return res.json({status: 'false'})
      }
    }
}

module.exports = new Products()