const auth = require("../../utils/auth");
const user = require("./user.model");

module.exports  = auth.authControllers(user)
