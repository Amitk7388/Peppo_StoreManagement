const Debug = require("debug")
class logger {
    constructor(namespace, options = {}){
        if(!namespace) throw new Error("loger requires one namespace")
        this.namespace = namespace || "SM"// SM = Store Management 
    }
    
    log(message, ns){
        if(!ns) ns = this.namespace
        let debug = Debug(ns)
        debug(message)
    }
    error(message, ns){
        if(!ns) ns = this.namespace
        ns = ns.concat(".error")
        let debug = Debug(ns)
        debug(message) 
    }
}



module.exports = logger