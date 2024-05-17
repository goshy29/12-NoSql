const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

// 180. Installing the MongoDB Driver
const mongoConnect= require("./util/database").mongoConnect;

// 194. Creating New User
const User = require("./models/user");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  // 194. Creating New User

  User.findUserById("6644abe4a3caccb24da20dc5")
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// 180. Installing the MongoDB Driver
mongoConnect(() => {
  app.listen(3000);
});