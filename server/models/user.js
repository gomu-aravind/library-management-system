const mongoose = require("mongoose");
require("dotenv").config();

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    subscription: {
      plan: String,
      expireyDate: Date,
      discount: Number,
      coupon:[
        {type:String}
      ],
      discountSession:Number,
      discountUpdate: Date,
      credits:Number
    },
    subSession:String,
    cartSession:String,
    fine: {
      items: [
        {
          bookId: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: true,
          },
          fineAmount: Number,
          fineDate: Date,
        },
      ],
      totalAmount:Number
    },
    borrow: {
      items: [
        {
          bookId: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: true,
          },
          returnDate: Date,
        },
      ],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
