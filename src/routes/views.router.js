import { Router } from "express";
import viewController from "../controller/views.controller.js";
import { viewAdmin } from "../middleware/admin.js";
//! esto no esta comentado ya que termine usando react para las vistas
const router = Router();
router.get("/", viewController.login);
router.get("/register", viewController.register);
router.get("/products", loginMd, viewController.products);
router.get("/addproducts", viewAdmin, loginMd, viewController.addproducts);
router.get("/cartShopping", loginMd, viewController.cartShopping);
router.get('/profile',loginMd,viewController.profile);

export default router;
