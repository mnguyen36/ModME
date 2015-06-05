module.exports = function(app) {

    app.get('/', function (req, res) {
        var user = "";
        if (req.isAuthenticated()){
            user = req["user"];
        }
        res.render('index', {
            user : user
        });
    });

    app.get('/logout',
        function (req, res) {
            req.logout();
            res.redirect('/');
        }
    );
};
