const mongoose = require("mongoose");
const Logger = require("../../lib/logger-provider/index")
const logger = new Logger("SM.DatabaseConnection")

const Mongoconnection = mongoUrl => {
    mongoUrl = mongoUrl || process.env.devMongo
    mongoose.connect(mongoUrl, { useNewUrlParser: true })
    const db = mongoose.connection
    db.once("open", () => logger.log(`Database connection done SucessFully ${mongoUrl}`))
    db.on("error", () => logger.error(error))
}

module.exports = Mongoconnection