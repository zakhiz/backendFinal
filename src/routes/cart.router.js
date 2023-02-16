import { Router } from "express";
import cartController from "../controller/cart.controller.js";
const router = Router();

router.post("/",cartController.addprod);
router.post("/mailer",cartController.mail)

export default router;
