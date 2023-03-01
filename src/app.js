import express from "express";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";
import sessionsRouter from "./routes/sessions.router.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import addLogger from "./middleware/addlogger.js";

const app = express();
const PORT = process.env.PORT || 8080;
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Inventario de autos JDM STORE",
      description: "API privada para el uso de un ecommerce",
    },
  },
  apis : [ `${__dirname}/docs/**/*.yaml` ]
};
const specs = swaggerJsdoc(swaggerOptions);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use('/api-docs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))
// app.engine("handlebars", handlebars.engine());
// app.set("views", `${__dirname}/views`);
// app.set("view engine", "handlebars");

// app.use("/", viewRouter);
app.use(addLogger)

app.use("/api/product", productRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => console.log(`Listening in ${PORT}`));
