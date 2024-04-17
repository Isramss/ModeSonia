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
    validate: {
      validator: function (v) {
        return v.endsWith(".fr") || v.endsWith(".com");
        // oblige de finir un mail par .fr ||.com
      },
      message: (props) =>
        `${props.value} n'est pas une adresse e-mail valide, veuillez utiliser une adresse se terminant par .fr ou .com`,
      // envoi un message d'erreur dans la console
    },
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
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
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

//Voir si c'est a modifier ou meme re adapter

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
