import config from "../config/config.js";
import { createHash, validatePassword } from "../utils.js";
import Jwt from "jsonwebtoken";
import { userService } from "../services/repositories/services.js";
import UserDTO from "../DAO/DTO/User.dto.js";
const register = async (req, res) => {
  const { first_name, last_name, email, password, age, phone_number, address } =
    req.body;
  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !age ||
    !phone_number ||
    !address
  )
    return res
      .status(400)
      .send({ status: "error", error: " incomplete values" });
  const exists = await userService.getBy({ email });
  if (exists)
    return res
      .status(400)
      .send({ status: "error", error: "User already exists" });
  const hashedPassword = await createHash(password);
  const user = UserDTO.UserDbdto({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    age,
    phone_number,
    address,
    avatar: `${req.protocol}://${req.hostname}:8080/images/${req.file.filename}`,
  });
  const result = await userService.save(user);
  res.send({ status: "success", payload: result._id });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  const user = await userService.getBy({ email });
  if (!user)
    return res
      .status(404)
      .send({ status: "error", error: "Invalid Credentials" });
  const isValidatePassword = await validatePassword(user, password);
  if (!isValidatePassword)
    return res
      .status(404)
      .send({ status: "error", error: "invalid credentials" });
  const tokenizedUser = {
    id: user._id,
    role: user.role,
    name: `${user.first_name} ${user.last_name}`,
    avatar: user.avatar,
    age: user.age,
    phone_number: user.phone_number,
    address: user.address,
    cart : user.cart
  };
  const token = Jwt.sign(tokenizedUser, config.jwt.SECRET, { expiresIn: "1d" });
  res.cookie(config.jwt.COOKIE, token,{
    httpOnly: false,
    sameSite: "none",
    secure: true,
  }).send({ status: "success" });
};

const logout = (req,res) => {
  res.clearCookie(config.jwt.COOKIE).send({status : 'success', message : "logged out"})
}

export default {
  login,
  logout,
  register,
};
