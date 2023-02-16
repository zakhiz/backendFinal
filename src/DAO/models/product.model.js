export default class Product {
  static get model() {
    return "Products";
  }

  static get schema() {
    return {
      model: String,
      characteristics: String,
      stock: Number,
      price: Number,
      image: String,
      patent: String,
    };
  }
}
