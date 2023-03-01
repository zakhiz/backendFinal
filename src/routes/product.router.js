import { Router } from "express";
import prodController from "../controller/product.controller.js";
import { viewAdmin } from "../middleware/admin.js";


const router = Router();

router.get("/",prodController.getAll); //! envia todos los productos
router.get("/:pid",prodController.getById); //! envia el producto filtrado por su id
router.get("/search/:modelo",prodController.getByModel); //! envia un modelo en particular
router.post("/",viewAdmin, prodController.add);//! crea el producto nuevo desde el lado de admin
router.put("/",viewAdmin, prodController.update);//! actualiza el producto desde el apartado admin
router.delete("/del",viewAdmin, prodController.deleteById);//! elimina el producto desde el apartado admin

export default router;
