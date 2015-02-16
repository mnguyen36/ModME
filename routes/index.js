var express = require('express');
var router = express.Router();
var passport = require('passport');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ModME' });
});

/* GET Hello World page. */
router.get('/helloworld',
    function(req, res) {
      res.render('helloworld',
          {
            title: 'Hello, World!'
          }
      )
    }
);

/* GET LOGIN */
router.get('/login',
    function(req, res){
        res.render('login',
            {
                title: 'LOGIN PAGE',
                message: req.flash('loginMessage')
            }
        )
    }
);

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/userlist',
    failureRedirect: '/login?login',
    failureFlash: true
}));

/* SIGN UP */
router.get('/signup',
    function(req, res){
        res.render('signup',
            {
                message: req.flash('signupMessage')
            }
        )
    }
);

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/userlist',
    failureRedirect: '/signup',
    failureFlash: true
}));

/* Log Out */
router.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
    }
);


/* GET Userlist page. */
router.get('/userlist', isLoggedIn, function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist',
            {
                title:'User List',
                userlist: docs
            }
        );
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
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
router.get('/remove-user', function (req, res){
    // query strings: (name, userid)
    res.render('removemodal', {
        userid: req.query.userid,
        username: req.query.username
    });
});


router.post('/remove-user', function(req, res){

   var db = req.db;
   var id = req.body.id;
   var collection = db.get('usercollection');
   collection.remove({
       "_id": id
   }, function( err, doc){
       if (err){
           res.send("problem");
       } else {
// If it worked, set the header so the address bar doesn't still say /adduser
           res.location("userlist");
           // And forward to success page
           res.redirect("userlist");       }
   })

});


function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next;
    }
    res.redirect('/');
}

module.exports = router;
