// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    //unique: true
  },
  password: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true
  },
  country :{
    type:String,
    required:true
  },

  desc:{
type:String
  },
  isSeller: {
    type :Boolean,
    default:false
  }
});

module.exports = mongoose.model('User', UserSchema);
