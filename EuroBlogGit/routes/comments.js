var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var Blog = require("../models/blog");
var middleware = require("../middleware");


// Comment Route
router.get("/blogs/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/comment", {blog: blog});   
        }
    });
});

router.post("/blogs/:id/comments", function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect("/blogs/" + blog._id);
                }
            });
            
        }
    });     
});


// Edit Comment Route
router.get("/blogs/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/edit", {blog_id: req.params.id, comment: foundComment});      
        }
    });
});


// Update Comment Route
router.put("/blogs/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    }); 
});


// Delete Comment Route
router.delete("/blogs/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});


module.exports = router;