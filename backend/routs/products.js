const express = require('express')
const products = require("../controllers/products")
const router = express.Router()
const upload = require('../upload');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, products.getProducts)
router.get('/:id', authMiddleware,products.getProduct)
router.put('/', authMiddleware,products.updateProduct)
router.post('/', authMiddleware,products.createProduct)
router.delete('/', authMiddleware, products.deleteProduct)


router.post('/upload', authMiddleware, upload.single('image'), products.uploadProductImage)
router.post('/upload/delete', authMiddleware, products.deleteProductImage)



module.exports = router