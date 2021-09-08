const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({


    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },

    textpost: { type: String },
    image: {
        type: Array
    },

    liken: [
       {
        userId : { type: String },
        username : { type: String },
        image : { type: String },
       }
    ],
    comment: [
        {
            userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            userName: { type: String },
            userImage: { type: String },
            textcomment: { type: String },
            imagecomment: { type: String },           
            date: { type: Date }

        }
    ],



}, {
    timestamps: true
})





module.exports = mongoose.model('post', PostSchema)