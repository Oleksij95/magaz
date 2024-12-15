const { Schema, model } = require('mongoose')

const Category = new Schema({
    name: { type: String, require: true, min: 3, unique: true },
    date_create: { type: Date, default: Date.now },
})
module.exports =  model("Category", Category)