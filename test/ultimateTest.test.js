import chai from "chai";
import supertest from "supertest";

const expect = chai.expect; //! expect seria como estar a la espectativa de algo

const requester = supertest("http://localhost:8080"); //! inicializamos supertest apuntando a un servidor

describe("Testing a nivel servidor", () => {
  //! podemos usar describe dentro de discribes ya que si lo hacemos todo con it se perderian los conceptos
  //TODO registro de un usuario simulando un formData
  describe("Test de usuarios", () => {
    it("El endpoint POST /api/sessions/register debe crear un nuevo usuario en la base de datos", async function () {
      const userMock = {
        first_name: "cary",
        last_name: "zare",
        email: "loki@loki.com",
        password: "123",
        age: 28,
        phone_number: 12512521,
        address: "calle falsa2 234",
      };
      //todo aca vamos a hacer el test como si estuvieramos mandandole la data por un formData
      const response = await requester
        .post("/api/sessions/register")
        .field("first_name", userMock.first_name)
        .field("last_name", userMock.last_name)
        .field("email", userMock.email)
        .field("password", userMock.password)
        .field("age", userMock.age)
        .field("phone_number", userMock.phone_number)
        .field("address", userMock.address)
        .attach('image',"./test/messi.jpg");
      //! para el archivo que en este caso seria el avatar le doy la direccion de donde encontrar el archivo aca en la carpeta test
      expect(response.status).to.be.equal(200);
      expect(response._body.status).to.be.equal("success")
      expect(response._body).to.have.property("payload");

      //! le pido a resquester que aplique un metodo post en el cual le ingreso la url para registrarse en este caso luego al lado le pongo un send y le envio el modelo
      //! en axios accedemos a la respuesta de esta manera response.data
      //?   const response = await requester
      //?     .post("/api/sessions/register")
      //?    .send(userMock);
      //?   expect(response.status).to.be.equal(200);
      //! aca le pedimos que compare que la respuesta sea igual a 200
      //todo chai utiliza muchos conectores linguisticos en ingles
      //?   expect(response._body).to.have.property("payload");
      //! aca le pedimos que compare si es que la respuesta tiene la propiedad payload
    });
  });
  //! carga de un producto
  //todo PARA CREAR EL PRODUCTO SACAR LOS MIDDLEWARE DE ADMIN YA QUE SOLO ESTA DISPONIBLE PARA ADMINISTRADORES
  describe("Test de productos", () => {
    it("El endpoint POST /api/products debe crear un producto en la base de datos", async () => {
      const mockProduct = {
        model: "nissan skyline r34",
        characteristics: "r34",
        stock: 15,
        price: 60000,
        image: "https://img.remediosdigitales.com/50967d/captura-de-pantalla-2022-08-26-a-las-17.38.32/1366_2000.jpeg"
      };
      const result = await requester.post("/api/product").send(mockProduct);
      expect(result.status).to.be.equal(200);
      expect(result._body).to.have.property("payload");
    });
  });
  describe('Test de session',()=> {
    let cookie //! declaramos la cookie a nivel contexto de session 
      it('Debe loguear correctamente al usuario y debe insertar un cookie con el token', async ()=> {
          const userMock= {
             email : "loki@loki.com",
             password : "123"
          }
          const response = await requester.post('/api/sessions/login').send(userMock);
          expect(response.status).to.be.equal(200);
          const cookieHeaders = response.headers['set-cookie'][0];
          expect(cookieHeaders).to.be.ok //! extraemos la cookie para compararla
          cookie = {
            name : cookieHeaders.split('=')[0],//! partimos el string con el split apartir del simbolo igual y accedemos a la primera cookie
            value : cookieHeaders.split('=')[1] //! para que el value lo contenga el mismo split pero ahora en la parte uno
          }
          expect(cookie.name).to.be.ok.and.equal("ingresar una cookie")//TODO AGREGAR NOMBRE DE COOKIE YO LA RETIRO POR LAS DUDAS YA QUE DESPUES LE TENGO QUE HACER EL DEPLOY
        })
  })
});
