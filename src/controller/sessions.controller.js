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
  ){
  req.logger.error(`${req.infoPeticion}| valores incompletos en el formulario de registro`);
    return res
      .status(400)
      .send({ status: "error", error: " incomplete values" });
  }
  const exists = await userService.getBy({ email });
  if (exists){
  req.logger.error(`${req.infoPeticion}| el email registrado ya esta en uso`);
    return res
      .status(400)
      .send({ status: "error", error: "User already exists" });
  }
  //! Verifica si los valores enviados desde el body esten y si el usuario que intenta registrarse ya lo este por un filtrado con el email
  const hashedPassword = await createHash(password); //! hasheo de password
  const user = UserDTO.UserDbdto({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    age,
    phone_number,
    address,
    avatar: `${req.protocol}://${req.hostname}:8080/images/${req.file.filename}`,//! req.file.filename obtiene el contenido del input de tipo file
    //! comentar el avatar al momento del registro con swagger
  });
  //! Despues de verificar, hashear y construir el usuario con los valores enviados en el body se envia el objeto del usuario a la base de datos con el userService.save 
  const result = await userService.save(user);
  res.send({ status: "success", payload: result._id });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password){
  req.logger.error(`${req.infoPeticion}| incomplete values`)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
      
  }
  const user = await userService.getBy({ email });
  if (!user){
  req.logger.error(`${req.infoPeticion}| invalid credentials email`)
    return res
      .status(404)
      .send({ status: "error", error: "Invalid Credentials" });
  }
  //! verifica si los valores de email y password esten completos, por ultimo verifica si el email enviado pertenezca a un usuario registrado
  const isValidatePassword = await validatePassword(user, password);
  //! envia el usuario filtrado y el password a una funcion interna de bcrypt que comprara la password y del usuario su propiedad password que desea loguearse
  if (!isValidatePassword){
    req.logger.error(`${req.infoPeticion}| invalid credentials password`)
    return res
      .status(404)
      .send({ status: "error", error: "invalid credentials" });
  }
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
  //! armo un usuariotoken con los datos del usuario que quiere hacer el login para poder enviar solo las propiedades y valores que sean necesarias
  const token = Jwt.sign(tokenizedUser, config.jwt.SECRET, { expiresIn: "1d" });
  res.cookie(config.jwt.COOKIE, token,{
    httpOnly: false,
    sameSite: "none",
    secure: true,
  }).send({ status: "success" });
  
};
  //! se envia el usuariotoken a la funcion sign de jsonwebtoken donde recibe los datos que va guardar en el token, la palabra secreta y cuando expira el mismo
  
const logout = (req,res) => {
  res.clearCookie(config.jwt.COOKIE).send({status : 'success', message : "logged out"})
}
//! En el metodo clearCookie se le envia el nombre de la cookie para que este sea eliminado de los encabezados

const DataUser = async (req,res) => {
  const {data} = req.params;
  const decoded = Jwt.verify(data,config.jwt.SECRET);
  const user = await userService.getById({_id : decoded.id})
  if (!user){
    req.logger.error(`${req.infoPeticion}| el usuario no existe`)
      return res
        .status(404)
        .send({ status: "error", error: "el usuario no exisite" });
  }
  const newUser= {
    _id : user._id,
    cart : user.cart,
    first_name : user.first_name,
    last_name : user.last_name,
    age : user.age,
    phone_number: user.phone_number,
    address: user.address,
    role : user.role,
    avatar: user.avatar,
  }
  //! Recibe el valor el token por los params luego lo detokenizo y con los datos del usuario destokenizado agarro el id y traigo todos los datos, armo un nuevo cuerpo de usuario donde solo envio los datos que necesito para el frontend esto lo hago porque necesito que los datos se actualicen continuamente entonces fue una solucion
  res.send({status : "success", payload: newUser})
}

export default {
  login,
  logout,
  register,
  DataUser
};
