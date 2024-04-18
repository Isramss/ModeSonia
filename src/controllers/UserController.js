import { generateAuthToken } from "../middlewares/auth";
import User from "../models/UserModel";

const inscription = async (req, res) => {
  console.log(req.body);
  try {
    let newUser = await User.create(req.body);

    res.json({ message: "User created", newUser });
  } catch (error) {
    console.log("Erreur lors de la création de l'utilisateur:");
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
const listUsers = async (req, res) => {
  const isAdmin = req.user.isAdmin;
  try {
    if (isAdmin) {
      let users = await User.find();
      res.json(
        users.map((user) => ({
          ...user.toObject(),
          fullname: user.fullname,
        }))
      );
    } else {
      res.status(401).send("non-authorized");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const OneUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user) {
      res.json({
        id: user.id,
        // name: user.name.first,
        email: user.email,
        address: user.address,
        zipcode: user.zipcode,
      });
    } else {
      res.status(401).send("user not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  const isAdmin = req.user.isAdmin;
  const userId = req.params.id;
  try {
    if (isAdmin) {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        // Vérifiez si aucun utilisateur n'a été trouvé avec cet ID
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user, message: "User deleted" });
    } else {
      res.status(401).send("non-authorized");
    }
  } catch (error) {
    res.status(400).json({ message: " error delete" });
  }
};

const updateUsers = async (req, res) => {
  const { id } = req.params;
  const { name, email, address, zipcode } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        address,
        zipcode,
      },
      { new: true }
    );
    res.json({ message: "User updated", updateUser });
  } catch (error) {
    res.status(400).json({ message: "error update user" });
  }
};

export { inscription, login, listUsers, OneUser, deleteUser, updateUsers };
