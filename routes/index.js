//var express = require('express');
//var router = express.Router();
//var passport = require('passport');



module.exports = function(app, passport) {
    //var router = app.router;


    /* GET home page. */
    app.get('/', function (req, res, next) {
        var email = "";
        if (req.isAuthenticated()){
            email = req["user"].local.email;
        }
        res.render('index', {
            title: 'ModME',
            email : email
        });
    });

    /* GET Hello World page. */
    app.get('/helloworld',
        function (req, res) {
            res.render('helloworld',
                {
                    title: 'Hello, World!'
                }
            )
        }
    );

    /* GET LOGIN */
    app.get('/login',
        function (req, res) {

            if (req.isAuthenticated()){
                res.redirect('/');
            }
            res.render('login',
                {
                    title: 'LOGIN PAGE',
                    message: req.flash('loginMessage')
                }
            )
        }
    );

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/userlist',
        failureRedirect: '/login?login',
        failureFlash: true
    }));

    /* SIGN UP */
    app.get('/signup',
        function (req, res) {
            res.render('signup',
                {
                    message: req.flash('signupMessage')
                }
            )
        }
    );

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/userlist',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /* Log Out */
    app.get('/logout',
        function (req, res) {
            req.logout();
            res.redirect('/');
        }
    );


    /* GET Userlist page. */
    app.get('/userlist', function (req, res) {
        if (req.isAuthenticated()){
            var email = req['user'].local.email;
            var db = req.db;
            var collection = db.get('usercollection');
            collection.find({}, {}, function (e, docs) {
                res.render('userlist',
                    {
                        email: email,
                        title: 'User List',
                        userlist: docs
                    }
                );
            });
        } else{
            res.redirect('/login');
        }
    });

    /* GET New User page. */
    app.get('/newuser', function (req, res) {
        var email = "";
        if (req.isAuthenticated()){
            email = req["user"].local.email;
        }
        res.render('newuser', {
            title: 'Add New User',
            email: email
        });
    });

    /* POST to Add User Service */
    app.post('/adduser', function (req, res) {

        // Set our internal DB variable
        var db = req.db;

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username": userName,
            "email": userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });
    });

//REMOVE USER
    app.get('/remove-user', function (req, res) {

        // query strings: (name, userid)
        res.render('removemodal', {
            userid: req.query.userid,
            username: req.query.username
        });
    });


    app.post('/remove-user', function (req, res) {

        var db = req.db;
        var id = req.body.id;
        var collection = db.get('usercollection');
        collection.remove({
            "_id": id
        }, function (err, doc) {
            if (err) {
                res.send("problem");
            } else {
// If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        })

    });
    //return app;
};





//module.exports = router;
