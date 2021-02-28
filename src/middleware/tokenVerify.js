// module.exports = async (req, res) => {
//     try {
//         const email = await validate.emailCheck(req.body.email);
//         const emailExtist = await UserSchema.findOne({ email: req.body.email });
//         if (emailExtist !== null) throw "User Not Found";
//       } catch (err) {
//         logger.log(err);
//         response(res, 422, err, "Failed");
//       }
    
// }