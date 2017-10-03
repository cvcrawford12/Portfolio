var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware");

router.get("/blogs", function(req, res) {
    // Get current date to compare blog in question
    var now = new Date().getDate();
    Blog.find({}, function(err, blogs) {
        if(err) {
            req.flash("error", "We were unable to connect to the server. Try again later");
        } else {
            var sortedBlogs = middleware.sortDates(blogs); 
            res.render("index", {blogs: sortedBlogs, date: now});
        }
    });
});


// New Post Route
router.get("/blogs/new", middleware.isLoggedIn, function(req, res) {
    res.render("blogs/new"); 
});


// Create Route
router.post("/blogs", middleware.isLoggedIn, function(req, res) {
    if(req.files.file != null) {
        var image2 = req.files.file; 
        console.log(image2.name);
    }
    
    // Sanitize data
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.blog.body;
    var location = req.body.location;
    var created = req.body.created;
    var likes = 0;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    // concatenate into new blog
    var newBlog = {title: title, image: image, location: location, likes: likes, created: created, body: body, author: author};
    Blog.create(newBlog, function(err, newBlog) {
         if(err) {
             req.flash("info", "Something went wrong when we tried creating your blog, try again and make sure all the categories are properly filled out.");
             res.render("blogs/new");
         } else {
             // then redirect
             res.redirect("/blogs");
         }
    });
});

// Show Route
router.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("blogs/show", {blog: foundBlog});
        }
    }); 
});

// Edit Blog route
router.get("/blogs/:id/edit", middleware.checkBlogOwnership, function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            console.log(err);
        } else {
            res.render("blogs/edit", {blog: foundBlog});
        }
    });  
});

router.put("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            req.flash("error", "We were unable to located the blog to be edited. Something must have went wrong with the servers. Try again later");
            res.redirect("back");
        } else {
            foundBlog.title = req.body.title;
            foundBlog.image = req.body.image;
            foundBlog.body = req.body.blog.body;
            foundBlog.location = req.body.location;
            foundBlog.save();
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

router.delete("/blogs/:id", middleware.checkBlogOwnership, function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    }); 
});


// Likes route
router.get("/blogs/:id/likes", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            req.flash("error", "Unfortunately our database that handles the likes must be down");
        } else {
            foundBlog.likes += 1;
            foundBlog.save();   
            res.redirect("back");
        }
    }); 
});

module.exports = router;