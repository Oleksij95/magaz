const express = require('express')
const authMiddleware = require('../middlewares/auth');

const auth = require("../controllers/auth")
const route = express.Router()

route.post("/login", auth.login)
route.get("/checkAuth", auth.checkAuth)

module.exports = route