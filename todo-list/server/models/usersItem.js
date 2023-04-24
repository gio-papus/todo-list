const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    email:{
      type:String,
      required: true
    },
    pass:{
      type:String,
      required: true
    }
  })
  
  module.exports = mongoose.model("users",UsersSchema)