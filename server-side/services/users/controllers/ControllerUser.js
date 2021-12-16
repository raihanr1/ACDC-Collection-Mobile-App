const ModelUser = require("../models/ModelUser");

class UserController {
  static async getAllUsers(req, res) {
    try {
      let response = await ModelUser.getAllUsers();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getUsersById(req, res) {
    try {
      let id = req.params.id;
      let response = await ModelUser.getUsersById(id);
      res.status(200).json(response);
    } catch (error) {
      if (error.message == "Invalid user id") {
        res.status(400).json(error);
      } else if (error.message == "User not found") {
        res.status(400).json(error);
      } else {
        res.status(500).json(error);
      }
    }
  }

  static async createNewUsers(req, res) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      let response = await ModelUser.createNewUsers({
        username,
        email,
        password,
        phoneNumber,
        address,
        role: "Customer",
      });
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteUsers(req, res) {
    try {
      let id = req.params.id;
      let response = await ModelUser.deleteUsers(id);
      if (response.message === "User not found") {
        throw response;
      }
      if (response.message === "Invalid user id") {
        throw response;
      }
      res.status(200).json({
        message: `User id with ${id} success deleted`,
      });
    } catch (error) {
      if (error.message == "Invalid user id") {
        res.status(400).json(error);
      } else if (error.message == "User not found") {
        res.status(400).json(error);
      } else {
        res.status(500).json(error);
      }
    }
  }

  static async updateUsers(req, res) {
    try {
      let id = req.params.id;
      let { username, email, password, phoneNumber, address } = req.body;
      let response = await ModelUser.updateUsers({
        id,
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(200).json({
        message: "User has been updated",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
