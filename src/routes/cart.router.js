import { Router } from "express";
import cartController from "../controller/cart.controller.js";
const router = Router();

router.post("/",cartController.addprod);//! añade productos al carrito
router.post("/mailer",cartController.mail)//! actualiza el array del carrito a vacio, envia la todos los productos que tenia el carrito por email al usuario que finaliza la compra

export default router;
