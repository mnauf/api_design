const express = require("express");
const body_parser = require("body-parser");
const app = express();
// const cors = require("cors");
const morgan = require("morgan");
const men_router = require("./resources/men/men.router");
const women_router = require("./resources/women/women.router")


// middlewares
app.use(morgan("dev")); //logging
app.use(body_parser.urlencoded({ extended: true })); // allows urlencoded parameters in request
// app.use(cors); // allows requests from server to server

// routers
app.use("/api/men",men_router);
app.use("/api/women",women_router)

app.get("/",(request,response)=>{
    response.send("Welcome")
})

app.listen(3000,(req,res)=>{
    console.log("i am up")
})