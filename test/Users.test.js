import Dao from "../src/DAO/dao.js";
import UserRepository from "../src/services/repositories/UserRepository.js";
//! como hago la prueba en el it para esto node tiene un modulo interno
import { strict as assert } from "assert";

const config = {
  mongo: {
    URL: "mongodb+srv://CodeTest:123@codercluster.4kgfcft.mongodb.net/testing?retryWrites=true&w=majority",
  },
};

const dao = new Dao(config);
const userService = new UserRepository(dao);

//! (describe) nos va a servir para poder indicar el contexto de las pruebas que se estan realizando
describe("Testing de UserRepository", () => {
  //! (it) vamos a indicar que cada it es una prueba
  //! function cuando se usa este tipo de funcion estoy declarando el codigo ejecutable pero por detras forma parte de un contexto inicializado dentro de todo mi codigo.
  //Todo arrow function ambas function pueden ser anonimas pero el anonimato puede ir mas alla del nombre
  //? si en algun momento necesitamos que nuestros test sean dependientes de un contexto general es crucial que los tengamos declarados con la palabra function

  it("El repositorio debe poder crear un usuario a partir de su dao", async function () {
    const result = await userService.save({
      first_name: "juliet",
      last_name: "castillo",
      email: "juli12@juli1.com",
      password: "123",
    });
    //!se usa funciones internas de assert para poder hacer la prueba
    //todo para comprobar si es que se guardo en la base de datos es el id que le agrega mongo al objeto ya que podemos ver que no le estamos ingresando ningun id
    //? usamos el metodo de assert que se llama ok le pasamos el result en donde le especificamos que queremos saber si tiene un id si lo tiene es porque si se guardo en la base de datos y paso el test si no lo tiene es que no
    assert.ok(result._id);
  });

  it("El respositorio debe poder obtener a los usuarios en formato de array", async function () {
    const result = await userService.getAll();
    assert.equal(Array.isArray(result),true); //! equal compara si son iguales a
  });
  it("El repository debe poder obtener Un usuario a partir de un parametro : email ",async function(){
    const result = await userService.getBy({email : "juli1@juli1.com"});
    assert.ok(result._id)
  })
});

//const a = () => {

//}
//! contextualizacion this
//this

//! difencia entre funciones function y funcion flecha es que la funcion flecha no permite el uso interno de un this
//todo si la declaramos aca causa algun problema? no causa porque el codigo al reconocer que tiene la palabra function realiza la carga de esto de manera global es decir el function tiene prioridad de carga(Inicializacion)
// a()

// function a(){

// }
//todo si se hace de esta forma si genera un error porque este ya no tiene prioridad de carga sino que realiza a manera de compilacion se realiza en prioridad de asignacion no en prioridad
// const a = () => {

// }
