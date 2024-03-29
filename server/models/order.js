const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orders:{
    items: [
    {
      book: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount:Number
},
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

module.exports = mongoose.model('Order', orderSchema);