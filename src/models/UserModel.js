import { mongoose, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  adress: {
    type: String,
  },
  zipcode: {
    type: Number,
    min: [1000, "Le Code Postal est trop court"],
    max: 99999,
  },
  password: { type: String, min: [6, "Must be at least 6 characters"] },
});

UserSchema.methods.crypto = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.veryPass = async (password, elderpassword) => {
  const result = await bcrypt.compare(password, elderpassword);
  return result;
};

const User = mongoose.model("User", UserSchema);

export default User;
