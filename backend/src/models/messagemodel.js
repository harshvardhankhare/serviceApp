
const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
},{
  timestamps:true
});

//export default mongoose.model("Message", MessageSchema)
module.exports = mongoose.model('Message',  MessageSchema)