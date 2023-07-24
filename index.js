const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");

const homeStartingContent = "Hii, I'm Shashwat Pandey. " +
"In this  BLOG SITE:- I share my personal blogs";
const aboutContent = "I'm passionate about learning new Tech. Commands. I'm interseted in Web Development. " +
"So, I joined a bootcamp of web-development. I like new challanges and path of their solutions"
const contact = "Mobile number = 62840XXXXX , G-mail = shashwatpanXXXXXX@gmail.com"


const app = express();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

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

app.get("/posts",(req,res)=>{

    res.render("posts.ejs",{post: posts});
    console.log(posts);
})

app.post("/compose",(req,res)=>{
    // const title = req.body.title;
    // const post = req.body.post;
    // console.log(title);
    // console.log(post);
    const post = {
        title: req.body.title,
        contant: req.body.post
    };
    posts.push(post);
    res.redirect("/posts")
});

app.get("/posts/:postName",(req,res)=>{
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post){
        const storesTitle = _.lowerCase(post.title);
        if(requestedTitle === storesTitle){
            res.render("post",{
                title:post.title,
                contant:post.contant
            })
            // console.log("Match Found")
        }
        // else{
        //     console.log("No Match");
        // }
    })

})







app.listen(3000,()=>{
    console.log("Server is running on 3000")
})