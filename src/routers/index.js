const router = require("express").Router()

const userRoute = require("./routes/user")
const storeRoute = require("./routes/stores")
const productRoute = require("./routes/products")

router.use("/", userRoute)
router.use("/store", storeRoute)
router.use("/product/", productRoute)


module.exports = router