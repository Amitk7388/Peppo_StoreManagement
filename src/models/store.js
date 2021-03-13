const mongoose = require("mongoose")
const StoreSchema = mongoose.Schema({
    storeName : {type: String, unique: true},
    address: String,
    isActive: Boolean,
    pincode: Number,
    email: {type: String, unique: true}, 
    password: String
})

module.exports = mongoose.model("stores", StoreSchema)