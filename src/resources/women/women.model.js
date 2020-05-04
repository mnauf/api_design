const mongoose = require("mongoose")

const schema = mongoose.Schema

const woman = new schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Woman",woman)