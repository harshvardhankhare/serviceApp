
// //export default mongoose.model("Conversation", ConversationSchema);

const mongoose = require("mongoose")
const ConversationSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        sender: {
            type: String,
            required: true,
        },
        rec: {
            type: String,
            required: true,
        },
        readBySeller: {
            type: Boolean,
            required: true,
        },
        readByBuyer: {
            type: Boolean,
            required: true,
        },
        lastMessage: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Conversation', ConversationSchema)