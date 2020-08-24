//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Lodash
const lodash = require('lodash');


const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque ifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat .";
const contactContent = "Scelerisque eleifend donec pulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    allPosts: posts
  })

})

app.get('/about', function(req, res) {
  res.render("about", {
    aboutStartContent: aboutContent
  })
})

app.get('/contact', function(req, res) {
  res.render("contact", {
    contactStartContent: contactContent
  })
})

app.get('/compose', function(req, res) {
  res.render('compose')
})

app.get("/posts/:postTitle", function(req, res) {
  const requestedPost = req.params.postTitle;
  posts.forEach(function(post) {
    if (lodash.lowerCase(requestedPost) === lodash.lowerCase(post.title)) {
      res.render('post', {
        postTitle: post.title,
        postContent: post.content
      })
    }
  })
})

app.post('/compose', function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post)
  res.redirect('/')
})

app.listen(3000, function() {
  console.log("Server is UP on port 3000");
});
