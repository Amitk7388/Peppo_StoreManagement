const Logger = require("../logger-provider/index")
const logger = new Logger("SM.validate")
const response = require("../response-provider/index")
class Validate {
    constructor(){}

async emailCheck(input, options={}){
        if(input.includes("@") === false || input.includes(".") === false || input.includes(" ") === true)throw  "Incorrect Email"
        else return input
    }
    async passwordMatch(password1, password2, options={}){
        if(password1 !== password2) throw "Password Doesn't Match"
        else return password1
    }
}

module.exports = Validate