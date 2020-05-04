// exports.apiGET = (request,response)=>{
//     response.send("I am women get")
// }
// exports.apiPOST = (request,response)=>{
//     response.send("I am women post")
// }
// exports.apiPUT = (request,response)=>{
//     response.send("I am women put")
// }
// exports.apiDELETE = (request,response)=>{
//     response.send("I am women delete")
// }
const crud = require("../../utils/crud");
const women = require("./women.model");

module.exports = crud.crudControllers(women);