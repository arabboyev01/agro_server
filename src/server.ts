import express from "express";
import createProduct from "./routes/products/createProducts";
import getProducts from "./routes/products/getProcuts";
import createUser from "./user/create";
import getUser from "./user/getUser";
import login from "./user/login";

const app = express();

app.use(express.json());

const PORT = 3500;

app.use("/api/v1/products", createProduct);
app.use("/api/v1/products", getProducts);
app.use("/api/v1/user", createUser);
app.use("/api/v1/user", getUser);
app.use("/api/v1/login", login);

app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});
