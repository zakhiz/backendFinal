import GenericRepository from "./GenericRepository.js";
import Product from "../../DAO/models/product.model.js";

export default class ProductRepository extends GenericRepository{
    constructor(dao){
        super(dao,Product.model)
    }
    deleteById = (id) => this.dao.deleteById(id,Product.model);
    updateById = (id,doc) => this.dao.updateById(id,doc,Product.model)
}