const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017";

async function connectMongo() {
  const client = new MongoClient(uri);
  await client.connect();
  const dataBase = client.db("MongoTest");
  return dataBase;
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let db;

connectMongo().then((data) => {
  db = data;
  app.listen(port);
});

app.get("/", async (req, res) => {
  let response = await db.collection("user").insertOne({
    name: "lalala kamu cantik",
    age: 3,
    age1: 3,
    age2: 3,
  });
  let data = await db.collection("user").find().toArray();
  res.json(data);
});
