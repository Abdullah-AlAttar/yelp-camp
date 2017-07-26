const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');

router.get("/", function (req, res) {
    res.render("landing");
});


//=========================================
// Auth routes
router.get('/register', function (req, res) {
    res.render('register');
});
// sign up route
router.post('/register', function (req, res) {
    User.register(new User({
        username: req.body.username
    }), req.body.password, function (err, user) {
        if (err) {
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            req.flash('success', 'Welcome to yelpcamp' + user.username);
            res.redirect('/campgrounds');
        });
    });

});
// login route
router.get('/login', function (req, res) {
    res.render('login');
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function (req, res) {});
//logout route
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'Logged Out Successfully');
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;