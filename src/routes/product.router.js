import { Router } from "express";
import prodController from "../controller/product.controller.js";
import { loginMd } from "../middleware/loginMd.middleware.js";
import { viewAdmin } from "../middleware/admin.js";


const router = Router();

router.get("/", prodController.getAll); loginMd,viewAdmin,
router.get("/:pid",prodController.getById);loginMd,viewAdmin,
router.post("/", prodController.add);
router.put("/:pid",loginMd,viewAdmin, prodController.update);
router.delete("/:pid",loginMd,viewAdmin, prodController.deleteById);

export default router;
