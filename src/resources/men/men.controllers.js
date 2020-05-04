// exports.apiGET = function(request,response){
//     response.send("I am men get")
// }
// exports.apiPOST = function(request,response){
//     response.send("I am men post")
// }
// exports.apiPUT = function(request,response){
//     response.send("I am men put")
// }
// exports.apiDELETE = function(request,response){
//     response.send("I am men delete")
// }
const crud = require("../../utils/crud");
const men = require("./men.model");

module.exports  = crud.crudControllers(men)