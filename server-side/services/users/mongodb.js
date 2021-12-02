const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";

async function connectMongoDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const dataBase = client.db("MongoTest");
    return dataBase;
  } catch (error) {
    console.log(error);
  }
}

async function collectionDB() {
  try {
    let response = await connectMongoDB();
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  connectMongoDB,
  collectionDB,
};
