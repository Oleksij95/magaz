const express = require('express')
const categories = require("../controllers/categories")

const router = express.Router()

router.get('/', categories.getCategories)
router.post('/', categories.addCategory)

module.exports = router