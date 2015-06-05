module.exports = function(app, passport) {

    require('./home-controller.js')(app);

    require('./login-controller.js')(app, passport);

    require('./signup-controller.js')(app, passport);

    require('./user-controller.js')(app);

};