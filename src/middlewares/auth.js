import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  const token = tokenHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non authorisé. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_Token); // mettre dans le .env le SECRET_Token
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide." });
  }
};
const generateAuthToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_Token, {
    expiresIn: "7d",
  });
  return token;
};

export { auth, generateAuthToken };
