const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
    content : {type: String, required: true},
    title : {type:String, required : true},
    tags : {type:Array, required : true},
    imageurl : {type:String},
    userId: { type: String, required: true },
    date: {type:String,required: true}
})

module.exports = mongoose.model('Articles', articlesSchema)