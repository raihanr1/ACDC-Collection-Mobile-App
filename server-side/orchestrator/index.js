require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const redis = require("./config/redis");
const baseUrlUsers = "http://localhost:4001";
const baseUrlApp = "http://localhost:4002";

const typeDefs = gql`
  type User {
    _id: String
    username: String
    email: String
    phoneNumber: String
    role: String
    address: String
  }
  type SuccessDeleteUser {
    message: String
  }
  type Category {
    id: String
    name: String
    mainImg: String
  }
  type Image {
    id: String
    ProductId: String
    imgUrl: String
  }
  type Product {
    id: String
    name: String
    slug: String
    description: String
    price: String
    mainImg: String
    UserMongoId: String
    Category: Category
    Images: [Image]
  }
  type DetailProduct {
    id: String
    name: String
    slug: String
    description: String
    price: String
    mainImg: String
    UserMongoId: String
    Images: [Image]
    Author: User
  }
  type UpdateProduct {
    message: String
  }
  type CreateNewProduct {
    message: String
  }

  type SuccessDeletedProduct {
    message: String
  }

  type Category {
    id: String
    name: String
    mainImg: String
  }

  type Query {
    Users: [User]
    Products: [Product]
    Categories: [Category]
    ProductDetail(id: Int): [DetailProduct]
  }
  type Mutation {
    addNewUser(
      username: String
      email: String
      phoneNumber: String
      address: String
      password: String
    ): User
    deleteUser(_id: String): SuccessDeleteUser
    updateProduct(
      name: String
      description: String
      price: Int
      mainImg: String
      CategoryId: Int
    ): UpdateProduct
    createNewProduct(
      name: String
      description: String
      price: Int
      mainImg: String
      CategoryId: Int
      reserveImage: String
    ): CreateNewProduct
    deleteProduct(id: Int): SuccessDeletedProduct
  }
`;

const resolvers = {
  Query: {
    Users: async () => {
      try {
        let chace = await redis.get("users");
        if (chace) {
          let data = JSON.parse(chace);
          return data;
        } else {
          let response = await axios({
            url: `${baseUrlUsers}/users`,
            method: "GET",
          });
          await redis.set("users", JSON.stringify(response.data));
          return response.data;
        }
      } catch (error) {
        return error.response.data;
      }
    },
    Categories: async () => {
      try {
        let chace = await redis.get("categories");
        if (chace) {
          return JSON.parse(chace);
        } else {
          let response = await axios({
            method: "GET",
            url: `${baseUrlApp}/products/categories`,
          });
          redis.set("categories", JSON.stringify(response.data));
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    Products: async () => {
      try {
        let chace = await redis.get("products");
        if (chace) {
          let data = JSON.parse(chace);
          return data;
        } else {
          let response = await axios({
            url: `${baseUrlApp}/products`,
            method: "GET",
          });
          redis.set("products", JSON.stringify(response.data));
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ProductDetail: async (_, { id }) => {
      try {
        let response = await axios({
          method: "GET",
          url: `${baseUrlApp}/products/${id}`,
        });
        let usersId = response.data[0].UserMongoId;
        let usersResponse = await axios({
          method: "GET",
          url: `${baseUrlUsers}/users/${usersId}`,
        });
        let product = response.data[0];
        let user = usersResponse.data;
        return [
          {
            ...product,
            Author: user,
          },
        ];
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addNewUser: async (
      _,
      { username, email, password, phoneNumber, address }
    ) => {
      try {
        let response = await axios({
          url: `${baseUrlUsers}/users`,
          method: "POST",
          data: { username, email, password, phoneNumber, address },
        });
        redis.del("users");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (_, { _id }) => {
      try {
        let response = await axios({
          url: `${baseUrlUsers}/users/${_id}`,
          method: "DELETE",
        });
        redis.del("users");
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    updateProduct: async (
      _,
      { name, description, price, mainImg, CategoryId }
    ) => {
      try {
        await axios({
          url: `${baseUrlApp}/users/products/65`,
          method: "PUT",
          data: { name, description, price, mainImg, CategoryId },
        });
        redis.del("products");
        return {
          message: "Entity item has been updated",
        };
      } catch (error) {
        return error.response.data;
      }
    },
    createNewProduct: async (
      _,
      { name, description, price, mainImg, CategoryId, reserveImage }
    ) => {
      try {
        await axios({
          url: `${baseUrlApp}/users/products/11`,
          method: "POST",
          data: {
            name,
            description,
            price,
            mainImg,
            reserveImage: [reserveImage],
            AuthorId: 1,
            UserMongoId: "61a9709db005ec157b60643c",
          },
        });
        redis.del("products");
        return {
          message: `Entity item has been created`,
        };
      } catch (error) {
        return error.response.data;
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        let response = await axios({
          url: `${baseUrlApp}/users/products/${id}`,
          method: "DELETE",
        });
        redis.del("products");
        return {
          message: "Entity item has been deleted",
        };
      } catch (error) {
        return error.response.data;
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
