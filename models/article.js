const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
    article : {type: String, required: true},
    title : {type:String, required : true},
    userId: { type: String, required: true },
})

module.exports = mongoose.model('Articles', articlesSchema)