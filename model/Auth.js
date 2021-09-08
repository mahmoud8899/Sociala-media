const mongoose = require('mongoose')



const UserSchema = mongoose.Schema({
  
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String
  },
  coverPhoto :{
    type: String
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  




  AddAddress:[
    {
      University : {type: String},
      living : {type: String},
      job : {type: String}
    }
  ],

  Albums: {
    type: Array,
    default: [],
  },

  description : {
    type : String,
    
  },

  requiresFriends: {
    type: Array,
    default: [],
  },
  hereallawait: {
    type: Array,
    default: [],
  },

  Friends: {
    type: Array,
    default: [],
  },



}, {
  timestamps: true
})





module.exports = mongoose.model('user', UserSchema)