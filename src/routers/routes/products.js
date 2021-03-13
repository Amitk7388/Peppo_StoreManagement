const router = require("express").Router()
const response = require("../../../lib/response-provider")
const Logger = require("../../../lib/logger-provider")
const logger = new Logger("SM.User.Routes")
const Product = require("../../models/product")
const {success, failed} = require("../../enum/res")
const auth = require("../../middleware/tokenVerify")



router.post("/create", auth,  (req, res) => {
})






module.exports = router