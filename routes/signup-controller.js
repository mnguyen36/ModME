module.exports = function(app, passport){

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
};