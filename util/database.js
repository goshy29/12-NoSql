// 180. Installing the MongoDB Driver

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb+srv://georgidobromirov:uPf2SC4NvshME5IO@cluster0.h7tn47h.mongodb.net/shop-nodejs-course-project?retryWrites=true&w=majority&appName=Cluster0")
  .then(client => {
    console.log("Connected!!");
    _db = client.db();
    callback(client);
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
};

// 182. Finishing the Database Connection
const getDb = () => {
  if (_db) {
    return _db;  
  }  
  throw "No database found!!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
