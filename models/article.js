const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
    content : {type: String, required: true},
    title : {type:String, required : true},
    introduction: {type:String, required : true},
    notation: {
        type: {
            average: { type: Number, default: 0 }, 
            count: { type: Number, default: 0 }
        },
        required: true
    },
    tags : {type:Array, required : true},
    imageurl : { type: String, required: true },
    userId: { type: String, required: true },
    date: {type:String,required: true}
})

module.exports = mongoose.model('Articles', articlesSchema)