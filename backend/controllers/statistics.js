const Product = require("../models/Product")
const Category = require("../models/Category")
const User = require("../models/User")

class Statisitcs {
    async getStatistics(req, res) {
        try {
            const products = await Product.find()
            const categories = await Category.find()
            const users = await User.find()

            return res.json([
                {
                    title: "Products",
                    value: products.length
                },
                {
                    title: "Categories",
                    value: categories.length
                },
                {
                    title: "Orders",
                    value: 0
                },
                {
                    title: "Users",
                    value: users.length
                }
            ])

        } catch( e ) {
            console.log(e)
        }
    }
}

module.exports = new Statisitcs()