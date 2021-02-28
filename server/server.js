const express = require("express")
const routes = require("../src/routers/index")
const bodyParser = require("body-parser")
const cors = require('cors')
const Logger  = require("../lib/logger-provider/index.js")
const logger = new Logger("SM.server")
const MongoConnection = require("./util.js/index")
const morgan = require("morgan")

require('dotenv').config()

//intializing express
const app = express()

//Seting up mongo connection
MongoConnection()

// parse application/x-www-form-urlencoded && parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//adding middleware morgan to know api log
app.use(morgan("dev"))

//If you want to use these api in browser with diff frontend framework
app.use(cors())

//seting up the routes
app.use("/api", routes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => logger.log(`Working on port htpp://localhost:${PORT}`))