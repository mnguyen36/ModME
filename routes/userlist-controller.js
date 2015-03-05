var bcrypt   = require('bcrypt-nodejs');


module.exports = function(app, passport){

    app.get('/userlist', function (req, res) {
        if (req.isAuthenticated()){
            var user = req['user'];
            var db = req.db;
            var collection = db.get('users');
            collection.find({}, {}, function (e, docs) {
                res.json(
                    docs
                );
            });
        } else{
            res.redirect('/login');
        }
    });

    app.get('/userlist/newuser', function (req, res) {
        if (req.isAuthenticated()){
            user = req["user"];
        }
        res.render('modals/newuser', {
            title: 'Add New User',
            user: user
        });
    });

    app.post('/userlist/adduser', function (req, res) {

        // Set our internal DB variable
        var db = req.db;

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;
        var password = req.body.password;

        // Set our collection
        var collection = db.get('users');

        // Submit to the DB
        collection.insert({
            "local":{
                "name": userName,
                "email": userEmail,
                "password" : bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
            }
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

    app.get('/remove-user', function (req, res) {

        res.render('modals/removemodal', {
            userid: req.query.userid,
            username: req.query.username
        });
    });

    app.post('/remove-user', function (req, res) {

        var db = req.db;
        var id = req.body.id;
        var collection = db.get('users');
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
};