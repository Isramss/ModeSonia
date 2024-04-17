import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema(
  {
    articles: [
      {
        article: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Article",
        },
        quantity: {
          type: Number,
          min: [1, "Quantity can not be less then 1."],
        },
        price: Number,
        amount: Number,
      },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
