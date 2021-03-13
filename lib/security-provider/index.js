const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

class Auth {
    constructor(secretKey){
     this.secretKey = secretKey 
    }

    set JWT_ALGORITHM(str){
        this.JWT_ALGORITHM = str
    }
    
    get JWT_ALGORITHM(){
        if(!this.JWT_ALGORITHM) this.JWT_ALGORITHM = "RS256"
        return this.JWT_ALGORITHM
    }
    
    decode(authorization){
        let token = authorization.split(" ")[1]
        return token
    }
    
    compareSync(password, passwordHash){
        return bcrypt.compareSync(password, passwordHash)
    }

    saltString(password){
        let saltround = 10
        let salt = bcrypt.genSaltSync(saltround)
        return bcrypt.hashSync(password, salt)
    }

    async createJWtToken(secretkey, payload, options = {}){
        let expiresIn = options.expiresIn ? parseInt(options.expiresIn) : 3600
        console.log(expiresIn)
        let jwtOption = { expiresIn: expiresIn} 
        const token =jwt.sign({payload}, secretkey, jwtOption)
        return {
            tokenType : "Bearer",
            token : token, 
            expiresIn : 3600
        }
    }

    async jwtVerify(token){
        if(!token)throw "User Not Authorised, No Token avialable"
        const oken = this.decode(token)
        
       return jwt.verify(oken, this.secretKey, (err, data) => {
            if(err) throw err
            return data
        })
    }

}

module.exports = Auth