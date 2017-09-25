var express = require("express"),
    expressSanitizer = require("express-sanitizer"),
    app = express(),
    flash = require("connect-flash"),
    session = require("express-session"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    fileUpload = require("express-fileupload"),
    seedDB = require("./seeds");
    
var blogRoutes = require("./routes/blogs"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");
    
app.use(flash());
app.use(fileUpload());
// app config 
//mongoose.connect("mongodb://localhost/restful_blog_app_V2");
mongoose.connect("mongodb://crawfo:euroblog@ds119302.mlab.com:19302/euroblog");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(session({
    secret: "Syd is my bestie",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SANITIZE AND SEED
app.use(expressSanitizer());
seedDB();

// MIDDLEWARE TO USE CURRENT USER FROM BODY IN ALL ROUTES
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    next();
});

app.use(commentRoutes);
app.use(indexRoutes);
app.use(blogRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server is running"); 
});