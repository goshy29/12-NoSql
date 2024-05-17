// 181. Creating the Database Connection
// 182. Finishing the Database Connection
const getDb = require("../util/database").getDb;

const mongodb = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
    this.userId = userId;
  }  

  save() {
    // 183. Using the Database Connection
    const db = getDb();
    let dbOp;

    // 189. Working on the Product Model to Edit our Product
    if (this._id) {
      dbOp = db.collection("products").updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this}); 
    } else {
      dbOp = db.collection("products").insertOne(this);     
    }
    return dbOp
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
  }

  // 186. Fetching All Products
  static fetchAll() {
    const db = getDb();
    return db.collection("products").find().toArray()
      .then(products => {
        //console.log(products);
        return products;
      })
      .catch(err => console.log(err));  
  }

  // 187. Fetching a Single Product
  static findById(productId) {
    const db = getDb();
    return db.collection("products").find({_id: new mongodb.ObjectId(productId)}).next()
      .then(product => {
        //console.log(product);
        return product;
      })
      .catch(err => console.log(err));
  }

  // 192. Deleting Products
  static deleteProductById(productId) {
    const db = getDb();
    return db.collection("products").deleteOne({_id: new mongodb.ObjectId(productId)})
      .then(result => {
        console.log("Deleted Product!!");
      })
      .catch(err => console.log(err));
  }
}

module.exports = Product;
