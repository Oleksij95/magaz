const Product = require("../models/Product")

class Products {
    async getProducts(req, res) {
      try {
        const products = await Product.find()
        return res.json(products)
      } catch( e ) {
        console.log(e)
      }
    }
}

module.exports = new Products()