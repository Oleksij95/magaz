const Product = require("../models/Product")

class Products {
    async getProducts(req, res) {
      try {
        const products = await Product.find().sort({date_create:'desc'})
        return res.json(products)
      } catch( e ) {
        console.log(e)
      }
    }

    async createProduct(req, res) {
      try {
        const {seoTitle, seoDescription, name, slug, price, description, isPopular, isNewProduct} = req.body
        const newProduct = await Product.create( {seoTitle, seoDescription, name, slug, price, description, isPopular, isNewProduct} )
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