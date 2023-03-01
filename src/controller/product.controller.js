import ProductDTO from "../DAO/DTO/product.dto.js";
import { productService } from "../services/repositories/services.js";

const getAll = async (req, res) => {
  const prods = await productService.getAll();
  //! trae todos los productos
  res.send({status : 'success',payload : prods})
};

const getById = async (req, res) => {
  const { pid } = req.params;
  const result = await productService.getBy({_id:pid});
  //! Recibe un id por params este mismo se manda en el metodo de productService para encontrar el producto
  res.send({ status: "success", payload: result });
};

const getByModel = async (req,res) => {
  const {modelo} = req.params;
  const result = await productService.getBy({model : modelo});
  //! Recibe un el nombre de un modelo de vehiculo usa el metodo de filtrado y trae el vehiculo enviado por params 
  res.send({ status: "success", payload: result });
}

const add = async (req, res) => {
  const { model, characteristics, stock, price, image } = req.body;
  if (!model || !characteristics || !stock || !price || !image){
    req.logger.error(`${req.infoPeticion}| los valores del formulario para agregar vehiculos estan incompleto`)
    return res
      .status(400)
      .send({ status: "error", error: "incomplete values" });
  }
  const newProduct = ProductDTO.productDbdto({
    model,
    characteristics,
    stock,
    price,
    image,
  });
  const result = await productService.save(newProduct);
  //! Recibe por el body los valores enviados por el formulario luego de validar si estos datos estan completos se arma el cuerpo del producto que primero pasa por el dto para agregarle el valor de la propiedad patente para despues poder usar el metodo save del productService
  res.send({ status: "success", payload: result._id });
};

const update = async (req, res) => {
  const products = await productService.getAll();

  const { model,newModel, characteristics, stock, price, image } = req.body;

  if (!model || !newModel || !characteristics || !stock || !price || !image){
    req.logger.error(`${req.infoPeticion}| los valores del formulario para actualizar vehiculos estan incompleto`)
    res.status(400).send({ status: "error", error: "incomplete values" });
  }
  const exist = await productService.getBy({model : model})
  if (!exist) {
    req.logger.error(`${req.infoPeticion}| el modelo ingresado no existe`)
      return res
      .status(400)
      .send({ status: "error", error: "Vehiculo inexistente" });
  }

  let pid = exist._id.toString();

  const productUpdate = {
    model : newModel,
    characteristics,
    stock,
    price,
    image,
  };
  //! obtengo los valores desde el formulario de actualizacion de esos valores agarro el modelo a actualizar, despues de filtrarlo para verificar si existe tomo el id del modelo y construyo el objeto a actualizar con los nuevos valores.
  if (products.some((obj) => obj.id == pid)) {
    const result = await productService.updateById(pid, productUpdate);
    //! por ultimo compruebo si el id que filtre del modelo pertencese a todos los productos que tengo si es asi acciono el metodo de actualizar enviandole el id que filtre con el nombre del modelo y el objeto actualizado
    res.send({ status: "success", payload: result._id });
  }
};

const deleteById = async (req, res) => {
  const productDel = await productService.getAll();
  const {model} = req.body;
  if (!model){
    req.logger.error(`${req.infoPeticion}| valores incompletos en el formulario de ingreso de modelo`)
    res.status(400).send({ status: "error", error: "incomplete values" });
  }
  const exist = await productService.getBy({ model : model})
  if (!exist) {
    req.logger.error(`${req.infoPeticion}| El vehiculo no existe`)
      return res
      .status(400)
      .send({ status: "error", error: "Vehiculo inexistente" });
  }
  let pid = exist._id.toString();
  //! Por el body recibo el modelo a eliminar el cual verifico que exista y una vez verificado obtengo su id y lo envio en el metodo delete
  if (productDel.some((obj) => obj.id == pid)) {
    const result = await productService.deleteById(pid);
    res.send({ status: "success", payload: result._id });
  }
};

export default {
  getAll,
  getById,
  getByModel,
  add,
  update,
  deleteById,
};
