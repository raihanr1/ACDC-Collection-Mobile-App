const { Product, User } = require("../models");

const { collectionDB } = require("./../../users/mongodb");

collectionDB()
  .then(async (db) => {
    let response = await db.collection("user").find().toArray();
    let users = await User.findAll();
    let updated = await Product.update(
      {
        UserMongoId: "61a9709db005ec157b60643c",
      },
      {
        where: {
          UserMongoId: null,
        },
      }
    );
    console.log(updated[0]);
  })
  .catch((err) => {
    console.log(err);
  });
