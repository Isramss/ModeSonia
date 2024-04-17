import { mongoose, Schema } from "mongoose";

const articleSchema = new Schema(
  {
    title_Produit: { type: String, required: true, unique: true },
    imageURL: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,

      min: [1, "Quantity can not be less then 1."],
    },
    sizes: [{ type: String }], // Nouvelle propriété pour les tailles des produits
  },

  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
