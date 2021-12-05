require("dotenv").config();
const cors = require("cors");
const express = require("express");
const router = require("./routes/index.js");
const app = express();
const port = 4002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/product`);
});
