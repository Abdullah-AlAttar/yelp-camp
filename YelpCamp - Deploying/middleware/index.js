const Campground = require('../models/campground'),
    Comment = require('../models/comment');

var middlewareObj = {};


middlewareObj.ensureCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {

        Campground.findById(req.params.id, function (err, foundCampground) {

            if (err) {
                req.flash('error', 'Campground not found');
                res.redirect('/campgrounds');
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'you do not have permission');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in');
        res.redirect('back');
    }
};
middlewareObj.ensureCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                console.log(err);
                req.flash('error', 'log ing first');
                res.redirect('/campgrounds');
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
};
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.flash('error', 'Please Login First!');
    res.redirect('/login');
};


module.exports = middlewareObj;