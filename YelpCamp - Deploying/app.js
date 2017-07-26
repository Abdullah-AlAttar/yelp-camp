const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    flash=require('connect-flash'),
    passport = require('passport'),
    User = require('./models/user');
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override');

const campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index');


// mongoose.connect("mongodb://localhost/yelp_camp_v4");
mongoose.connect("mongodb://Squeaky:squeaky!hole@ds113713.mlab.com:13713/yelpcamp");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method')).use(flash());
// seedDB();
// passport configuration 

app.use(require('express-session')({
    secret: 'you touch my tralalala',
    resave: false,
    saveUninitialized: false,
}));

passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize()).use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes).use('/campgrounds', campgroundRoutes).use('/campgrounds/:id/comments', commentRoutes);

app.listen( process.env.PORT||3400, process.env.IP, function () {
    console.log("The YelpCamp Server Has Started!");
});