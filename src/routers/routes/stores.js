const router = require("express").Router()
const response = require("../../../lib/response-provider")
const Logger = require("../../../lib/logger-provider")
const logger = new Logger("SM.User.Routes")
const Store = require("../../models/store")
const Validate = require("../../../lib/validate-provider")
const validate = new Validate()
const Security = require("../../../lib/security-provider")
const security = new Security()
const {success, failed} = require("../../enum/res")


router.post("/create", async (req, res) => {
  try {
    const email = await validate.emailCheck(req.body.email);
    const password = await validate.passwordMatch(req.body.password, req.body.repassword);

    const store = await Store.findOne({ storeName: req.body.storeName });
    if (store !== null) throw "Please Choose Other storeName";
    
    //Hashing Password sync
    const hasPassword = security.saltString(password);
   
    req.body.email = email;
    req.body.password = hasPassword;
  
    const data = await Store.create(req.body)


  } catch (err) {
    logger.log(err)
    response(res, 401, err, failed)
  }
  delete req.body.password;
  delete req.body.repassword
  req.body.message = "SucessFully Created";
  response(res, 201, req.body, success)
});



router.post("/login", async (req, res) => {
  try {
    console.log("this is email i got", req.body.email)
    await validate.emailCheck(req.body.email);

    const data = await Store.findOne({ email: req.body.email });
    //console.log("this is datra", data)
    if (data === null) throw "User Not Found"
    
    const check = await security.compareSync(req.body.password, data.password)
    if(!check)throw "Password is Incorrect"
    
    delete data.password
    console.log(data)

    let token = await security.createJWtToken(process.env.secretKey, data);
    response(res, 200, token, success);
  } catch (err) {
    logger.log(err);
    response(res, 422, err,  failed);
  }
});


module.exports = router