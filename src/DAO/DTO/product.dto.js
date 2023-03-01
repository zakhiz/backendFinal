import {codeAlt} from '../../functions/code.js';

export default class ProductDTO {
  //! aprovecho el dto para poder agregarle a la propiedad patente un valor ya que cuando creo el producto la defino esta propiedad como un string vacio entonces importo mi funcion para generar codigos aleatorios en el cual le envio una longitud y este mismo me retorna el string que luego lo defino como el nuevo valor de la propiedad 
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
