const redis = require("../config/redis");
const axios = require("axios");
const baseUrlMongo = "http://localhost:4001";
const baseUrlProduct = "http://localhost:4002";

class Controller {
  static async getAllUsers(req, res, next) {
    try {
      let chace = await redis.get("users");
      if (chace) {
        let data = JSON.parse(chace);
        res.status(200).json(data);
      } else {
        let response = await axios({
          url: `${baseUrlMongo}/users`,
          method: "GET",
        });
        await redis.set("users", JSON.stringify(response.data));
        res.status(200).json(response.data);
      }
    } catch (error) {
      res.status(500).json({
        message: "Invalid server",
      });
    }
  }

  static async createNewUser(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      let response = await axios({
        url: `${baseUrlMongo}/users`,
        method: "POST",
        data: { username, email, password, phoneNumber, address },
      });
      redis.del("users");
      res.status(201).json(response.data);
    } catch (error) {
      res.status(500).json({
        message: "Invalid server",
      });
    }
  }

  static async deletedUser(req, res, next) {
    try {
      let id = req.params.id;
      let response = await axios({
        url: `${baseUrlMongo}/users/${id}`,
        method: "DELETE",
      });
      redis.del("users");
      res.status(201).json(response.data);
    } catch (error) {
      if (error.response.data) {
        res.status(404).json(error.response.data);
      } else {
        res.status(500).json({
          message: "Invalid server",
        });
      }
    }
  }

  static async createNewProduct(req, res, next) {
    try {
      let { name, description, price, mainImg, CategoryId, reserveImage } =
        req.body;
      let response = await axios({
        url: `${baseUrlProduct}/users/products/11`,
        method: "POST",
        data: {
          name,
          description,
          price,
          mainImg,
          CategoryId,
          reserveImage: [reserveImage],
          AuthorId: 1,
          UserMongoId: "61a9709db005ec157b60643c",
        },
      });
      redis.del("products");
      res.status(201).json(response.data);
    } catch (error) {
      if (error.response.data) {
        res.json(error.response.data);
      } else {
        res.status(500).json({
          message: "Invalid server",
        });
      }
    }
  }

  static async getAllProduct(req, res, next) {
    try {
      let chace = await redis.get("products");
      if (chace) {
        let data = JSON.parse(chace);
        res.status(200).json(data);
      } else {
        let response = await axios({
          url: `${baseUrlProduct}/products`,
          method: "GET",
        });
        redis.set("products", JSON.stringify(response.data));
        res.status(200).json(response.data);
      }
    } catch (error) {
      res.status(500).json({
        message: "Invalid server",
      });
    }
  }

  static async updateProduct(req, res, next) {
    try {
      let id = req.params.id;
      let { name, description, price, mainImg } = req.body;
      let response = await axios({
        url: `${baseUrlProduct}/users/products/${id}`,
        method: "PUT",
        data: { name, description, price, mainImg, CategoryId: 11 },
      });
      redis.del("products");
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({
        message: "Invalid server",
      });
    }
  }

  static async deletedProduct(req, res, next) {
    try {
      let id = req.params.id;
      let response = await axios({
        url: `${baseUrlProduct}/users/products/${id}`,
        method: "DELETE",
      });
      redis.del("products");
      res.status(200).json(response.data);
    } catch (error) {
      if (error.response.data.message === "Product not found") {
        res.status(404).json(error.response.data);
      }
      res.status(500).json({
        message: "Invalid server",
      });
    }
  }
}

module.exports = Controller;
