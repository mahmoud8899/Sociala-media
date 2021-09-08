
const mongoose = require('mongoose')


const StorySchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    image :{
        type : Array,

    },
    text :{
        type : String,
    }

},{
    timestamps: true
})


module.exports = mongoose.model('Story', StorySchema)