const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
});

var articleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  content: String
});
const Article = mongoose.model('Articles', articleSchema);



const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";




app.get("/", function(req, res) {


  Article.find({}, function(error, articles) {

    res.render("home", {
      posts: articles
    });
  });
  // res.render("home", {posts:posts});
// mongoose.connection.close()

});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact_me", function(req, res) {
  res.render("contact");
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {

  if (req.body.password == process.env.COMPOSE_PASSWORD) {

    const article = new Article({
      title: req.body.newPostTitle,
      content: req.body.newPost
    });
    article.save(function(err) {
      if (err) {
        res.send(err.errmsg);
      } else {
        res.redirect("/")
      }
    });
  } else {
    res.redirect("/compose")
  }
// mongoose.connection.close()
});

app.get("/posts/:title", function(req, res) {
  console.log(req.params.title);
  Article.findOne({
    title: (req.params.title)
  }, function(err, article) {
    if (article != null) {
      console.log(err);
      console.log(article);
      res.render("post", {
        post: article
      });
      // console.log(err.errmsg+"hey");
      // res.send("No such article exists")
    } else {
      console.log(err);
      console.log(article);
      res.send("No such article exists")
    }

  });
// mongoose.connection.close()
});


app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});
