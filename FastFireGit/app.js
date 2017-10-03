var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    Recruit = require("./models/recruit"),
    app = express();
    
    
//mongoose.connect("mongodb://localhost/fastfire-recruits");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


// Root route, landing page    
app.get("/", function(req, res) {
    res.render("landing"); 
});

app.get("/main", function(req, res) {
    res.render("index"); 
});


app.get("/main/about", function(req, res) {
    res.render("about"); 
});

app.get("/main/contact/business", function(req, res) {
    res.render("business");
});

app.get("/main/contact/recruitment", function(req, res) {
    res.render("recruitment");
});


// Post route to get recruitment info
app.post("/main/contact/recruitment", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var number = req.body.number;
    var file = req.body.file;
    
    var newRecruit = {name: name, email: email, number: number, file: file};
    
    Recruit.create(newRecruit, function(err, newRecruit) {
        if(err) {
            console.log(err);
            res.redirect("/");
        } else {
            console.log(newRecruit);
            res.redirect("/main");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("fastfire server is running");
});