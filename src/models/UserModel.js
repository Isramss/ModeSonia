import { mongoose, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  name: {
    first: {
      type: String,
      trim: true,
    },
    last: {
      type: String,
      trim: true,
    },
  },

  email: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  zipcode: {
    type: Number,
    min: [1000, "Le Code Postal est trop court"],
    max: 99999,
  },
  password: {
    type: String,
    min: [6, "Must be at least 6 characters"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.virtual("fullname").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

//Vor si c'est a modifier ou meme re adapter

UserSchema.methods.crypto = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.verifPass = async (password, elderPassword) => {
  const result = await bcrypt.compare(password, elderPassword);
  return result;
};

const User = mongoose.model("User", UserSchema);

export default User;
