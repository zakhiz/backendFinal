import {codeAlt} from '../../functions/code.js';

export default class ProductDTO {
  static productDbdto = (product) => {
    return {
      model : product.model,
      characteristics : product.characteristics,
      stock : product.stock,
      price : product.price,
      image : product.image,
      patent : product.patent || codeAlt(10)
    };
  };
}
