import ProductDTO from "../DAO/DTO/product.dto.js";
// const prodManager = new ProductManager();
import { productService } from "../services/repositories/services.js";

const getAll = async (req, res) => {
  const prods = await productService.getAll();
  res.send({status : 'success',payload : prods})
};

const getById = async (req, res) => {
  const { pid } = req.params;
  const result = await productService.getBy({_id:pid});
  res.send({ status: "success", payload: result });
};

const add = async (req, res) => {
  const { model, characteristics, stock, price, image } = req.body;
  console.log(req.body);
  if (!model || !characteristics || !stock || !price || !image)
    return res
      .status(400)
      .send({ status: "error", error: "incomplete values" });

  const newProduct = ProductDTO.productDbdto({
    model,
    characteristics,
    stock,
    price,
    image,
  });
  const result = await productService.save(newProduct);
  res.send({ status: "success", payload: result });
};

const update = async (req, res) => {
  const { pid } = req.params;
  const products = await productService.getAll();

  const { model, characteristics, stock, price, image } = req.body;

  if (!model || !characteristics || !stock || !price || !image)
    res.status(400).send({ status: "error", error: "incomplete values" });

  const productUpdate = {
    model,
    characteristics,
    stock,
    price,
    image,
  };
  productUpdate.Date.now();

  if (products.some((obj) => obj.id == pid)) {
    const result = await prodManager.updateById(pid, productUpdate);
    res.send({ status: "success", payload: result._id });
  }
};

const deleteById = async (req, res) => {
  const { pid } = req.params;
  const productDel = await productService.getAll();
  if (productDel.some((obj) => obj.id == pid)) {
    const result = await prodManager.deleteById(pid);
    res.send({ status: "success", payload: result._id });
  }
};

export default {
  getAll,
  getById,
  add,
  update,
  deleteById,
};
