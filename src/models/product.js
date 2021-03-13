const mongoose = require("mongoose")
const ProductSchema = mongoose.Schema({
    productName : {type: String},
    price: Number,
    MRP: Number,
    Store: {type: mongoose.Schema.Types.ObjectId, ref : "store"},
    photos:[ String],
    description: String,
})

module.exports = mongoose.model("products", ProductSchema)