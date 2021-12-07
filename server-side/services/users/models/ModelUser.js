const { collectionDB, connectMongoDB } = require("../mongodb");
const { ObjectId } = require("mongodb");
class UserModel {
  static async getAllUsers() {
    try {
      let response = await (await collectionDB())
        .collection("user")
        .find()
        .toArray();
      return response;
    } catch (error) {
      return error;
    }
  }

  static async getUsersById(id) {
    try {
      let data = await (await collectionDB()).collection("user").findOne({
        _id: new ObjectId(id),
      });
      if (data === null) {
        throw {
          message: "User not found",
        };
      } else {
        return data;
      }
    } catch (error) {
      if (error.name === "BSONTypeError") {
        return {
          message: "Invalid user id",
        };
      }
      return error;
    }
  }

  static async createNewUsers({
    username,
    email,
    password,
    phoneNumber,
    address,
    role,
  }) {
    try {
      let newUser = {
        username,
        email,
        password,
        phoneNumber,
        role,
        address,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      let response = await (await collectionDB())
        .collection("user")
        .insertOne(newUser);
      let data = await (await collectionDB()).collection("user").findOne({
        _id: response.insertedId,
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  static async deleteUsers(id) {
    try {
      let data = await (await collectionDB()).collection("user").deleteOne({
        _id: new ObjectId(id),
      });
      if (data.deletedCount === 0) {
        throw {
          message: "User not found",
        };
      } else {
        return data;
      }
    } catch (error) {
      if (error.name === "BSONTypeError") {
        return {
          message: "Invalid user id",
        };
      }
      return error;
    }
  }

  static async updateUsers({
    id,
    username,
    email,
    password,
    phoneNumber,
    address,
  }) {
    try {
      let response = await (await connectMongoDB())
        .collection("user")
        .updateOne(
          {
            _id: new ObjectId(id),
          },
          {
            $set: {
              username,
              email,
              password,
              phoneNumber,
              address,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          }
        );
      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserModel;
