const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/**
 * Basic App Setup
 * Create new express instance
 * Define view engine (ejs)
 * Define static folder, to deploy static files like css and js
 * Initiate body-parser to receive data from form submission
 */
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Mongoose Configurations
 * Username: myblog
 * Password: 8n21eVqx7lchmvYs
 * Connection string: mongodb+srv://<username>:<password>@mongofurtadex-gao43.mongodb.net/myblog?retryWrites=true&w=majority
 * Create your connection
 * Define schemas
 * Initiate your model object and attach it to a schema for mongoose to handle database operations (CRUD)
 */

const uri = 'mongodb+srv://myblog:8n21eVqx7lchmvYs@mongofurtadex-gao43.mongodb.net/myblog?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true}, err => {
    if(err) {
        console.log("Cannot connect to MongoDB Atlas:");
        console.log(err);
    } else {
        console.log("Connected to MongoDB Atlas")
    }
});

const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
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


app.listen(3000, () => {
    console.log("Server running on port 3000");
});