const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const mongodb = require("mongodb");

const homeStartingContent = "Hii, I'm Shashwat Pandey. " +
"In this  BLOG SITE:- I share my personal blogs";
const aboutContent = "I'm passionate about learning new Tech. Commands. I'm interseted in Web Development. " +
"So, I joined a bootcamp of web-development. I like new challanges and path of their solutions"
const contact = "Mobile number = 62840XXXXX , G-mail = shashwatpanXXXXXX@gmail.com"


const app = express();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/Blogs', { useNewUrlParser: true, useUnifiedTopology: true });
const blogsSchema = {
    title: String,
    content: String
};

const blogs = mongoose.model("newblog",blogsSchema);

// let posts = [];
let newBlog;

app.get("/",(req,res)=>{
    res.render("home.ejs",{homePage: homeStartingContent});
    
})



app.get("/about",(req,res)=>{
    res.render("about.ejs",{about: aboutContent});
})



app.get("/contact",(req,res)=>{
    res.render("contact.ejs",{contact: contact});
})



app.get("/compose",(req,res)=>{
    res.render("compose.ejs");
})

app.get("/posts", async (req, res) => {
    try {
        const foundPosts = await blogs.find({});
        res.render("posts.ejs", { post: foundPosts }); // Pass the variable as "post"
    } catch (err) {
        console.error("Error fetching blog posts:", err);
        // Handle the error appropriately
    }
});

app.post("/compose", (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.post
    };

    const newBlog = new blogs({
        title: post.title,
        content: post.content
    });

    newBlog.save()
        .then(() => {
            res.redirect("/posts");
        })
        .catch(err => {
            console.error("Error saving blog post:", err);
            // Handle the error appropriately
        });
});


app.get("/posts/:postName", async (req, res) => {
    try {
        const requestedTitle = _.lowerCase(req.params.postName);

        const foundPost = await blogs.findOne({ title: requestedTitle });

        if (foundPost) {
            res.render("post", {
                title: foundPost.title,
                content: foundPost.content
            });
        } else {
            // Handle the case when no post is found
            res.render("post", {
                title: "Post Not Found",
                content: "The requested post was not found."
            });
        }
    } catch (err) {
        console.error("Error fetching blog post:", err);
        // Handle the error appropriately
    }
});



app.listen(3000,()=>{
    console.log("Server is running on 3000")
})
