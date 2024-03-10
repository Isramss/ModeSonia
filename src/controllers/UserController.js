import User from "../models/UserModel";

const saveUser = async (req, res) => {
  try {
    const newUser = await new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.adress = req.body.address;
    newUser.zipcode = req.body.zipcode;
    newUser.password = await newUser.crypto(req.body.password);
    newUser.save();
    const token = generateAuthToken(newUser);
    res.json({ newUser, token });
  } catch (error) {
    console.log(error);
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

export { saveUser, login };
