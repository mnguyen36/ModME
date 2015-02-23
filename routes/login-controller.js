module.exports = function(app, passport) {

    app.get('/login',
        function (req, res) {
            if (req.isAuthenticated()) {
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
        failureRedirect: '/login',
        failureFlash: true
    }));
};