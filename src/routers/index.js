const router = require("express").Router()

const userRoute = require("./routes/user")

router.use("/", userRoute)


module.exports = router