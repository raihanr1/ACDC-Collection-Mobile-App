const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const Controller = require("./controllers/controller");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/users", Controller.getAllUsers);

app.post("/users", Controller.createNewUser);

app.delete("/users/:id", Controller.deletedUser);

app.post("/products", Controller.createNewProduct);

app.get("/products", Controller.getAllProduct);

app.put("/products/:id", Controller.updateProduct);

app.delete("/products/:id", Controller.deletedProduct);

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
