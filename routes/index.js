var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");


// Root Route
router.get("/", function(req, res) {
    res.redirect("/blogs");
});



// Delete route
router.delete("/blogs/:id", function(req, res) {
    // Destory blog in db
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            // redirect
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
    
});


// Destinations route
router.get("/destinations/:location", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            req.flash("info", "Hmm, we aren't really sure what went wrong but if you got here please send us an email to let us know! Thanks");
            res.redirect("/blogs");
        } else {
            var sortedBlogs = middleware.sortDates(blogs);
            res.render("destinations", {blogs: sortedBlogs, location: req.params.location});
        }
    }); 
});


// REGISTER ROUTES
router.get("/register", function(req, res) {
    res.render('auth/register');
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            return res.render("auth/register");
        } 
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to the euroBlog, feel free to start posting or commenting " + user.firstName + "!");
            res.redirect("/blogs"); 
        });
    });
});

// LOGIN ROUTES
router.get("/login", function(req, res) {
    res.render("auth/login"); 
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    }), function(req, res) {
});


// LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/blogs");
});

module.exports = router;