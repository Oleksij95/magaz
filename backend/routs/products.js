const express = require('express')

const products = require("../controllers/products")

const router = express.Router()


router.get('/', products.getProducts)
router.get('/:id', products.getProduct)
router.put('/', products.updateProduct)
router.post('/', products.createProduct)
router.delete('/', products.deleteProduct)

module.exports = router