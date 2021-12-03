const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const port = 4000;
const Controller = require("./controllers/controller");
const redis = require("./config/redis");
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    let data = null;
    // let data = await redis.get("users");
    if (data) {
      res.json(JSON.parse(data));
    } else {
      let response = await axios({
        url: "http://localhost:4001/users",
      });
      let user = response.data.filter(
        (el) => el._id === "61a9709db005ec157b60643c"
      );
      console.log(user);
      await redis.set("users", JSON.stringify(response.data));
      res.status(200).json(response.data);
    }
  } catch (error) {
    console.log(error, ">>>");
  }
});

app.get("/asup", async (req, res) => {
  try {
    let response = await axios({
      url: "http://localhost:4002/products",
    });
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error, ">>>");
  }
});

app.listen(port);
