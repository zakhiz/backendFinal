import Jwt from "jsonwebtoken";
import config from "../config/config.js";
import nodemailer from "nodemailer";
import { userService,productService } from "../services/repositories/services.js";

const addprod = async (req, res) => {
  const { id } = req.body;
  const product = await productService.getById(id);
  let tokenized = req.cookies.itZ2zXYh6X;
  const decoded = Jwt.verify(tokenized, config.jwt.SECRET);
  const uid = await userService.getBy({ _id: decoded.id });
  let userId = uid._id;
  let userData = await userService.getById(userId.toString());
  let cart = userData.cart;
  cart.push(product);
  await userService.updateOne(userId, cart);
  res.send({status : "success"})
};

const mail = async (req, res) => {
  const { id } = req.body;
  let usercart = await userService.getById(id);
  let orden = usercart.cart;

  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: config.nodemailer.USER,
      pass: config.nodemailer.PASS,
    },
  });

  let html;
  for (let i = 0; i < orden.length; i++) {
    html += `<div style = "
          color : #000;
          "> 
         <h1 style="
         ">🚗 ${orden[i].model}</h1>
         <div style = "
            display: flex;
            justify-content: center;
         ">
         <img style ="
          width: 400px;
          height: 400px;
          border-radius: 10px;
          "src="${orden[i].image}"/>
         </div>
          <p>💴 ${orden[i].price}</p>
        </div>
      `;
  }

  const result = await transport.sendMail({
    from: "JDM STORE",
    to: "sebastianhigaramirez@gmail.com",
    subject: "orden de compra",
    html: `<p>Pedido a nombre de ${usercart.first_name} ${usercart.last_name}</p>
          ${html}
      `,
  });
  res.send({ status: "success", payload: result });
};

export default {
  addprod,
  mail,
};
