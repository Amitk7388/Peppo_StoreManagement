const Security = require("../../lib/security-provider") 

const response = require("../../lib/response-provider") 
const {success, failed} = require("../enum/res")
const Logger = require("../../lib/logger-provider")
const logger = new Logger("middleware")

module.exports = async (req, res, next) => {
    try{
        const security = new Security(process.env.secretkey)
        const token = await security.jwtVerify(req.headers.authorization)
        req.user = token
        next()
    }catch(err){
        console.log(err)
        response(res, 401, "User Not Authorized", failed)
    }
    
}