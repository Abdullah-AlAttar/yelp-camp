const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    middleware = require('../middleware');
// ====================
// COMMENTS ROUTES
// ====================

router.get("/new", middleware.isLoggedIn, function (req, res) {
    // find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    })
});

router.post("/", middleware.isLoggedIn, function (req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
});


//edit route
router.get('/:comment_id/edit',middleware.ensureCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect('back');
        } else {
            res.render('comments/edit', {
                campground_id: req.params.id,
                comment: comment
            });
        }
    });
});
// Update route

router.put('/:comment_id/', middleware.ensureCommentOwnership,function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});
// destroy route
router.delete('/:comment_id', middleware.ensureCommentOwnership,function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {

            res.redirect('back');
        } else {

            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});


module.exports = router;