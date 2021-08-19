//importing dependencies

const express = require("express")

const app = express();

const path = require('path');

var mongoose = require("mongoose");

var bodyParser = require("body-parser");



// Calling form.js from models

var Form = require("./models/form");


app.use('/public', express.static(path.join(__dirname, 'public')));

// Connecting to database

mongoose.connect("mongodb://localhost/index", {

  useNewUrlParser: true,

  useUnifiedTopology: true

});



//middlewares

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));



//rendering form.ejs

app.get("/", function(req, res) {

  res.render("index");

});



// form submission

app.get('/result', (req, res) => {

  res.render('result');

});



//creating form

app.post("/", function(req, res) {

  var username = req.body.username;

  var email = req.body.email;

  var message = req.body.message;

  var f = {
    username: username,
    email: email,
    message: message,
  };

  Form.create(f, function(err, newlyCreatedForm) {

    if (err)

    {

      console.log(err);

    } else {

      res.redirect("/result");

    }

  });

});



// Starting the server at port 3000

app.listen(3000)
