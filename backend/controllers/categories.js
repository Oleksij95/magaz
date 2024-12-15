const Category = require("../models/Category")
const Product = require("../models/Product")

class Categories {
    async getCategories(req, res) {
        try {
            const categories = await Category.find().sort({date_create:'desc'})
            const categoriesDto = []
            for (let category of categories) {
                const products = await Product.find({category: category._id})
                let categoryDto = {}
                categoryDto._id = category._id
                categoryDto.name = category.name
                categoryDto.date_create = category.date_create
                categoryDto.products = products
                categoriesDto.push(categoryDto)
            }
            return res.json(categoriesDto)
        } catch (e) {
            return res.json({status: 'false'})
        }
    }

    async addCategory(req, res) {
        try {
            const { name } = req.body
            const alredyExist = await Category.findOne({'name': name})
            console.log(alredyExist)
            if (alredyExist) {
                return res.status(404).json({error: 'this category alredy exist'})
            }
            const cat = await Category.create({ name })
            return res.json(cat)
        } catch (e) {
            return res.json({status: 'false'})
        }
    }
}

module.exports = new Categories