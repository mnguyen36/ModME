module.exports = function(app, passport) {
    /* GET home page. */
    app.get('/', function (req, res) {
        var user = "";
        if (req.isAuthenticated()){
            user = req["user"];
        }
        res.render('index', {
            title: 'ModME',
            user : user
        });
    });

    require('./login-controller.js')(app, passport);

    require('./signup-controller.js')(app, passport);

    require('./userlist-controller.js')(app, passport);

    require('./task-controller.js')(app);

    require('./eval-template-controller.js')(app);

    app.get('/logout',
        function (req, res) {
            req.logout();
            res.redirect('/');
        }
    );

    //app.register('.html', require('jade'));

    app.get('/test', function(req, res){
        res.render('test');
    })
};