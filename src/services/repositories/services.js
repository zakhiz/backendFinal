import UserRepository from "./UserRepository.js";
import ProductRepository from "./ProductRepository.js";
import Dao from '../../DAO/dao.js';
import config from "../../config/config.js";

const dao = new Dao(config);

export const userService = new UserRepository(dao);

export const productService = new ProductRepository(dao);
