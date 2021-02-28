const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: String,
    email: {type:String, unique : true, required: true},
    password : {type: String, required: true},
    phone : String,
}, { timestamps: true })


module.exports = mongoose.model("user", UserSchema)