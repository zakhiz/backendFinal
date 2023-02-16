import GenericRepository from "./GenericRepository.js";
import Product from "../../DAO/models/product.model.js";

export default class ProductRepository extends GenericRepository{
    constructor(dao){
        super(dao,Product.model)
    }
}