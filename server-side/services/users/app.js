require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4001;
const { connectMongoDB } = require("./mongodb");
connectMongoDB().then((data) => {
  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}/mongo`);
  });
});
const Controller = require("./controllers/ControllerUser");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/users", Controller.getAllUsers);

app.get("/users/:id", Controller.getUsersById);

app.post("/users", Controller.createNewUsers);

app.delete("/users/:id", Controller.deleteUsers);

app.put("/users/:id", Controller.updateUsers);

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/mongo`);
});
