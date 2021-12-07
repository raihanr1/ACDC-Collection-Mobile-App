const { MongoClient, ObjectId } = require("mongodb");
const uri = `mongodb+srv://raihanrobbani123:${process.env.PASSWORD_MONGO_DB}@hacktiv-react-native.afjyg.mongodb.net/hacktiv-react-native?retryWrites=true&w=majority`;

async function connectMongoDB() {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
