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
    description: { type: String },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
