const router = require("express").Router()
const response = require("../../../lib/response-provider")
const Logger = require("../../../lib/logger-provider")
const logger = new Logger("SM.User.Routes")
const Product = require("../../models/product")
const {success, failed} = require("../../enum/res")
///const auth = require("../../middleware/tokenVerify")



router.post("/create", async(req, res) => {
    req.body.Store = req.user.payload._id
    try {
        const create = await Product.create(req.body)
    }catch(err){
        logger.log(err);
        response(res, 422, err,  failed);
    }
    response(res, 201, "Created SucessFuully",  success)
})


router.get("/getbyid", async(req, res) => {
  try{
    console.log(req.user)
    const data = await Product.find({Store: req.user.payload._id})
    response(res, 201, data,  success)
  }catch(err){
    response(res, 400, err,  failed)
  }
})



router.get("/getall", async (req, res) => {
  try {
    const data = await Product.find({}).populate("Store")
    response(res, 201, data, success);
  } catch (err) {
      console.log(err)
    response(res, 400, err, failed);
  }
});



module.exports = router