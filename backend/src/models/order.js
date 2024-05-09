const mongoose = require("mongoose")

const orderSchema = new  mongoose.Schema({

    gigId: {
        type: String,
        required: true,
      },
      
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      sellerId: {
        type: String,
        required: true,
      },
      buyerId: {
        type: String,
        required: true,
      },
      
})

module.exports = mongoose.model('Order', orderSchema);