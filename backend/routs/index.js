const express = require('express')
const router = express.Router()

const productsRouter = require('./products')
const categoriesRouter = require('./categories')
const authRouter = require('./auth')
const statisticsRouter = require('./statistics')

router.use('/products', productsRouter)
router.use('/categories', categoriesRouter)
router.use('/auth', authRouter)
router.use('/statistics', statisticsRouter)

module.exports = router

