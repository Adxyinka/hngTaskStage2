const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 3000;

// Calling form.js from models

const Form = require("./models/form");

//middlewares

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Connecting to database

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

//rendering index file

app.get("/", function(req, res) {

  res.render("index");

});

// form submission

app.get('/result', (req, res) => {

  res.render('result');

});

//creating form

app.post("/", function(req, res) {

  const username = req.body.username;
  const email = req.body.email;
  const message = req.body.message;

  const f = {
    username: username,
    email: email,
    message: message,
  };

  Form.create(f, function(err, newlyCreatedForm) {
      res.redirect('/result')
  });

});


app.listen(port, () => console.log('server running'))
