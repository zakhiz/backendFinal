import Jwt from "jsonwebtoken";
import config from "../config/config.js";
import nodemailer from "nodemailer";
import { userService,productService } from "../services/repositories/services.js";

const addprod = async (req, res) => {
  const { id,token } = req.body; //! con el id lo que hago es filtrar el producto y con el token filtro al usuario que hizo la accion
  const product = await productService.getById(id);
  const decoded = Jwt.verify(token, config.jwt.SECRET);
  const uid = await userService.getBy({ _id: decoded.id });
  let userId = uid._id;
  let userData = await userService.getById(userId.toString());
  //! Una vez filtrado el producto y encontrado el usuario que acciono el agregar al carrito se pushea el producto a la propiedad cart que es un array  
  let cart = userData.cart;
  cart.push(product);
  await userService.updateOne(userId, cart);
  res.send({status : "success"})
};

const mail = async (req, res) => {
  const { id } = req.body;   
  let usercart = await userService.getById(id);
  let orden = usercart.cart;
  //! recibe el id luego filtra el usuario y en una variable se guarda la propiedad cart del usuario que es un array
  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: config.nodemailer.USER,
      pass: config.nodemailer.PASS,
    },
  });

  let htmldata;
  for (let i = 0; i < orden.length; i++) { 
    htmldata += `<div style = "color : #000;"> 
         <h1>🚗 ${orden[i].model}</h1>
         <img style ="
          width: 400px;
          height: 400px;
          border-radius: 10px;
          "src="${orden[i].image}"/>
          <p>💴 ${orden[i].price}</p>
        </div>
      `;
  }
  //! recorro el array cart y construyo sus propiedades en el cuerpo que voy a enviar por mail

  const result = await transport.sendMail({
    from: "JDM STORE",
    to: `${usercart.email}`,
    subject: "orden de compra",
    html: `<p>Pedido a nombre de ${usercart.first_name} ${usercart.last_name}</p>
          <div>${htmldata}</div>
      `,
  });
  await userService.updateOne(usercart._id,[])
  //! luego de realizar el envio del mail actualizo la propiedad cart del usuario a un array vacio
  res.send({ status: "success", payload: result });
};

export default {
  addprod,
  mail,
};
