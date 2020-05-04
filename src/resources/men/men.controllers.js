const crud = require("../../utils/crud");
const men = require("./men.model");

module.exports  = crud.crudControllers(men)