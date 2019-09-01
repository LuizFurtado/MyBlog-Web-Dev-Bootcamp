const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOVerride = require("method-override");

/**
 * Basic App Setup
 * Create new express instance
 * Define view engine (ejs)
 * Define static folder, to deploy static files like css and js
 * Initiate body-parser to receive data from form submission
 */
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOVerride("_method"));

/**
 * Mongoose Configurations
 * Username: myblog
 * Password: 8n21eVqx7lchmvYs
 * Connection string: mongodb+srv://<username>:<password>@mongofurtadex-gao43.mongodb.net/myblog?retryWrites=true&w=majority
 * Create your connection
 * Define schemas
 * Initiate your model object and attach it to a schema for mongoose to handle database operations (CRUD)
 */

mongoose.set("useFindAndModify", false);

const uri =
  "mongodb+srv://myblog:8n21eVqx7lchmvYs@mongofurtadex-gao43.mongodb.net/myblog?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true }, err => {
  if (err) {
    console.log("Cannot connect to MongoDB Atlas:");
    console.log(err);
  } else {
    console.log("Connected to MongoDB Atlas");
  }
});

const postSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

/**
 * Manual post creation, just for testing
 */
// Post.create({
//     title: "This is my first post!",
//     image: 'https://images.unsplash.com/photo-1454486837617-ce8e1ba5ebfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80',
//     body: "I just created a new blog entry! Yey!"
// });

/**
 * Start your RESTfull routes definition
 */
app.get("/", (req, res) => {
  res.redirect("/posts");
});

//Index route: starting point for your restfull routes
app.get("/posts", (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log("Cannot reach your blog posts...");
      console.log(err);
    } else {
      res.render("index", { posts: posts });
    }
  });
});

//New route: displays new post form
app.get("/posts/new", (req, res) => {
  res.render("new");
});

//Create route: posts a new enty to the database
app.post("/posts", (req, res) => {
  Post.create(req.body.post, (err, post) => {
    if (err) {
      console.log("Cannot create your new post!");
      console.log(err);
      res.render("new");
    } else {
      console.log("New post created");
      console.log(post);
      res.redirect("/posts");
    }
  });
});

//Show route: displays a single post entry
app.get("/posts/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log("Post not found");
      console.log(err);
    } else {
      res.render("show", { post: post });
    }
  });
});

//Edit route: recovers an existing entry from the database and allows editing the item
app.get("/posts/:id/edit", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log("Post now found...");
      console.log(err);
    } else {
      res.render("edit", { post: post });
    }
  });
});

//Update route: submit changes made using the edit form to the database, modifying existing item
app.put("/posts/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.post, (err, post) => {
    if (err) {
      console.log("Cannot update your blog post");
      console.log(err);
    } else {
      console.log("Post updated");
      console.log(post);
      res.redirect("/posts/" + req.params.id);
    }
  });
});

//Delete route: find and delete a single item from the database
app.delete("/posts/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log("Cannot delete this post...");
      console.log(err);
      res.redirect("/posts/" + req.params.id);
    } else {
      res.redirect("/posts");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
