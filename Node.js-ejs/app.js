const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartLingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula quam eget est gravida, quis consectetur lectus porta. Pellentesque quis posuere odio. Phasellus sollicitudin nunc quis purus congue, in elementum nisl finibus. Phasellus eu dolor a nisl pretium aliquet nec eu ipsum. Praesent vitae elementum elit, eu viverra sapien. Integer eu nunc id urna cursus molestie facilisis eget metus. Suspendisse finibus purus eu est tempus hendrerit. Nunc ligula odio, pellentesque at pellentesque a, imperdiet sed nunc. Curabitur et diam sollicitudin, molestie arcu a, placerat nisi. Praesent sagittis vel ipsum non rhoncus. Duis eget purus cursus, lobortis tortor et, sollicitudin lacus. Pellentesque blandit et sem non pretium. Nullam vitae neque consectetur, ullamcorper leo eget, viverra dolor.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula quam eget est gravida, quis consectetur lectus porta. Pellentesque quis posuere odio. Phasellus sollicitudin nunc quis purus congue, in elementum nisl finibus. Phasellus eu dolor a nisl pretium aliquet nec eu ipsum. Praesent vitae elementum elit, eu viverra sapien. Integer eu nunc id urna cursus molestie facilisis eget metus. Suspendisse finibus purus eu est tempus hendrerit. Nunc ligula odio, pellentesque at pellentesque a, imperdiet sed nunc. Curabitur et diam sollicitudin, molestie arcu a, placerat nisi. Praesent sagittis vel ipsum non rhoncus. Duis eget purus cursus, lobortis tortor et, sollicitudin lacus. Pellentesque blandit et sem non pretium. Nullam vitae neque consectetur, ullamcorper leo eget, viverra dolor.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula quam eget est gravida, quis consectetur lectus porta. Pellentesque quis posuere odio. Phasellus sollicitudin nunc quis purus congue, in elementum nisl finibus. Phasellus eu dolor a nisl pretium aliquet nec eu ipsum. Praesent vitae elementum elit, eu viverra sapien. Integer eu nunc id urna cursus molestie facilisis eget metus. Suspendisse finibus purus eu est tempus hendrerit. Nunc ligula odio, pellentesque at pellentesque a, imperdiet sed nunc. Curabitur et diam sollicitudin, molestie arcu a, placerat nisi. Praesent sagittis vel ipsum non rhoncus. Duis eget purus cursus, lobortis tortor et, sollicitudin lacus. Pellentesque blandit et sem non pretium. Nullam vitae neque consectetur, ullamcorper leo eget, viverra dolor.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = []

app.get("/", function (req, res) {
    res.render("home", { 
        startingContent: homeStartLingContent,
        posts: posts
    });
});

app.get("/about", function(req, res) {
    res.render("about", { aboutContent: aboutContent});
});

app.get("/contact", function (req, res) {
    res.render("contact", { contactContent: contactContent});
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

app.post("/compose", function(req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };

    posts.push(post);

    res.redirect("/");
});

app.get("/posts/:postName", function(req, res) {
    const requesttedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if(storedTitle === requesttedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content    
            })
        }
    });    
});

app.listen(3000);