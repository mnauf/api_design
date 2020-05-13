const express = require("express");
const body_parser = require("body-parser");
const app = express();
// const cors = require("cors");
const mongoose = require("mongoose")
const morgan = require("morgan");
const men_router = require("./resources/men/men.router");
const women_router = require("./resources/women/women.router")
const user_router = require("./resources/user/user.router")
const auth = require("./utils/auth");


const db = "mongodb+srv://mnaufil:virufy@cluster0-wuuzb.mongodb.net/test?retryWrites=true&w=majority";
app.use(express.json());
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to mongodb");
});
// middlewares

app.use(morgan("dev")); //logging
app.use(body_parser.urlencoded({ extended: true })); // allows urlencoded parameters in request
// app.use(cors); // allows requests from server to server

// routers
app.use("/api/log",user_router);
app.use("/api/men",auth.protect, men_router);
app.use("/api/women",auth.protect , women_router)

app.get("/",(request,response)=>{
    response.send("Welcome")
})

app.listen(3000,(req,res)=>{
    console.log("i am up")
})