const express = require('express')
const categories = require("../controllers/categories")
const authMiddleware = require('../middlewares/auth');

const router = express.Router()

router.get('/', authMiddleware, categories.getCategories)
router.post('/', authMiddleware, categories.addCategory)

module.exports = router