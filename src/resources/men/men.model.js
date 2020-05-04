const mongoose = require("mongoose")

const schema = mongoose.Schema

const man = new schema({
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

module.exports = mongoose.model("Man",man)