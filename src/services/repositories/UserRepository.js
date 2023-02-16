import GenericRepository from "./GenericRepository.js";
import User from '../../DAO/models/user.model.js';
export default class UserRepository extends GenericRepository{
    constructor (dao) {
        super(dao,User.model)
    }
    updateOne = (id, doc) => this.dao.updateBy(id,doc,User.model)
}