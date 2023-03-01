import mongoose from "mongoose";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";

export default class Dao {
  constructor(config) {
    mongoose.set("strictQuery", false);
    this.connection = mongoose.connect(config.mongo.URL);
    const genericTimeStamps ={
        timestamps : {
            createdAt : "Create_at",
            updatedAt : "Update_at"
        }
    }

    const userSchema = mongoose.Schema(User.schema,genericTimeStamps);
    const productSchema = mongoose.Schema(Product.schema,genericTimeStamps);

    this.models = {
        [User.model] : mongoose.model(User.model,userSchema),
        [Product.model] : mongoose.model(Product.model,productSchema)
    }
  }
  get = (options, entity) => {
        if(!this.models[entity])throw new Error(`Entity ${entity} not defined in models`)
        return this.models[entity].find(options);
  }

  getBy = (options, entity) => {
        if(!this.models[entity])throw new Error(`Entity ${entity} not defined in models`)
        return this.models[entity].findOne(options)
  }

  getById = (id,entity) => {
        if(!this.models[entity])throw new Error(`Entity ${entity} not defined in models`)
        return this.models[entity].findById(id)
  }
  save = (document, entity) => {
        if(!this.models[entity])throw new Error(`Entity ${entity} not defined in models`)
        return this.models[entity].create(document);
  }

  updateBy = (id,document,entity) => {
        if(!this.models[entity])throw new Error(`Entity ${entity} not defined in models`)
        return this.models[entity].updateOne({_id: id}, {$set: { cart : document}});
  }
  updateById = (id,document,entity) => {
      if(!this.models[entity])throw new Error(`Entity ${entity} not defined in models`)
        return this.models[entity].updateOne({_id: id}, {$set: document});
  }
  deleteById = (id,entity) => {
      if(!this.models[entity])throw new Error(`Entity ${entity} not defined in models`)
        return this.models[entity].findByIdAndDelete({_id : id});
  }

}
