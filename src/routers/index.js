const router = require("express").Router()

const userRoute = require("./routes/user")
const storeRoute = require("./routes/stores")
const productRoute = require("./routes/products")
const auth = require("../middleware/tokenVerify")



router.use("/", userRoute)
router.use("/store", storeRoute)
router.use("/product/", auth, productRoute)


module.exports = router