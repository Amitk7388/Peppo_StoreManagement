const router = require("express").Router()
const response = require("../../../lib/response-provider")
const Logger = require("../../../lib/logger-provider")
const logger = new Logger("SM.User.Routes")
const User = require("../../models/user")
const Validate = require("../../../lib/validate-provider")
const validate = new Validate()
const Security = require("../../../lib/security-provider")
const security = new Security()
const enums = require("../../enum/res")


router.get('/', async (req, res) => {
    logger.log("On routes")
    res.send("Working on it")
})

router.post("/register", async (req, res) => {
  try {
    const email = await validate.emailCheck(req.body.email);
    const password = await validate.passwordMatch(req.body.password, req.body.repassword);
    
    const emailExtist = await User.findOne({email : req.body.email}) 
    if(emailExtist !== null) throw "Email Already Exist"
    
    //Hashing Password sync
    const hasPassword = security.saltString(password);
   
    req.body.email = email;
    req.body.password = hasPassword;
    
    const data = await User.create(req.body)
  }catch(err){ 
      logger.log(err); 
      response(res, 422, err, enums.failed)
    }
    
    delete req.body.password;
    delete req.body.repassword
    req.body.message = "SucessFully Created";
    response(res, 201, req.body, enums.success);
});








router.post("/login", async (req, res) => {
  try {
    console.log("this is email i got", req.body.email)
    await validate.emailCheck(req.body.email);

    const data = await User.findOne({ email: req.body.email });
    //console.log("this is datra", data)
    if (data === null) throw "User Not Found"
    
    const check = await security.compareSync(req.body.password, data.password)
    if(!check)throw "Password is Incorrect"
    
    delete data.password
    console.log(data)

    let token = await security.createJWtToken(process.env.secretKey, data);
    response(res, 200, token, enums.success);
  } catch (err) {
    logger.log(err);
    response(res, 422, err,  enums.failed);
  }
});

module.exports = router