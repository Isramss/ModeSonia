import { generateAuthToken } from "../middlewares/auth";
import User from "../models/UserModel";

const inscription = async (req, res) => {
  console.log(req.body);
  try {
    let newUser = await User.create(req.body);
    // console.log(newUser.fullname);
    res.json({ message: "User created", newUser });
  } catch (error) {
    console.log("Erreur lors de la création de l'utilisateur:");
  }
};
const listUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.json(
      users.map((user) => ({
        ...user.toObject(),
        fullname: user.fullname,
      }))
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      // Vérifiez si aucun utilisateur n'a été trouvé avec cet ID
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user, message: "User deleted" });
  } catch (error) {
    res.status(400).json({ message: " error delete" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).select("+password");
    const verify = await user.verifPass(password, user.password);
    if (!verify) {
      const error = new Error("Le mot de passe est incorrect");
      throw error;
    }
    const token = generateAuthToken(user);
    res.json({ message: "success", token });
  } catch (error) {
    res.json({ message: "error" + error });
  }
};

export { inscription, login, listUsers, deleteUser };
