const { Schema, model } = require('mongoose')

const User = new Schema({
    name: { type: String, require: true, min: 3 },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    date_create: { type: Date, default: Date.now },
})
module.exports =  model("User", User)