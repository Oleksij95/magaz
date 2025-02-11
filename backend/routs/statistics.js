const express = require("express")
const router = express.Router()
const statistics = require("../controllers/statistics")
const authMiddleware = require('../middlewares/auth');

router.get("/", authMiddleware, statistics.getStatistics)

module.exports = router