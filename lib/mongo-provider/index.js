const mongoose = require("mongoose")

class Mongo {
    constructor(){

    }
    set collection(collectName){
       this.collection = collectName
    }
    
    get collection(){
        return this.collection = this.collection
    }

   async getCollections(){

    }

   async find(input, options = {}){
      return await this.collection.findOne({input}, options)
   }


}


module.exports = Mongo