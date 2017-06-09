var Blog = require("../models/blog");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkBlogOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Blog.findById(req.params.id, function(err, foundBlog) {
           if(err) {
               req.flash("error", err.message);
               res.redirect("back");
           } else {
               if(foundBlog.author.id.equals(req.user._id)) {
                   next();
               } else {
                   req.flash("error", "You do not have permission to do that!");
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    } 
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    req.flash("error", "Please Login First!");
    res.redirect("/login");
};

middlewareObj.sortDates = function(blogs) {
    var newBlogs = blogs.sort(function(a, b) {
        var tempA = a.created.getTime();
        var tempB = b.created.getTime();
        return tempA>tempB ? -1 : tempA<tempB ? 1 : 0;
    });  
    return newBlogs;
};

module.exports = middlewareObj;