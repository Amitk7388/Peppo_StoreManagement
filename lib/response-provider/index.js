const loggerM = require("../logger-provider/index");
const logger = new loggerM("UM.messages")


const response = function (res, statusCode, message, state,) {

  if (!statusCode) throw new Error("status code require");
  if (!state) throw new Error("state required");
  try {
    res.status(statusCode).json({ response: message, state: state });
  }catch(error){logger.log("failed to send message to user")}
  
};

module.exports = response;