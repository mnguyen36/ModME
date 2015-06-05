var express         = require('express');
var path            = require('path');
//var mongo           = require('mongodb');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var flash           = require('connect-flash');
var session         = require('express-session');
var morgan          = require('morgan');
var passport        = require('passport');
var monk            = require('monk');

// Monk for regular mongo usage
var db = monk('mongodb://heroku_app33971358:jf6h2nhn6ftabihaevie5ciiu8@ds043971.mongolab.com:43971/heroku_app33971358');
// Mongoose for user schema login/signup
mongoose.connect('mongodb://heroku_app33971358:jf6h2nhn6ftabihaevie5ciiu8@ds043971.mongolab.com:43971/heroku_app33971358');
require('./config/passport')(passport);
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon(__dirname + '/public/images/remove.png'));
app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// session before passport.session
app.use(session({ secret: 'kjh4rkj3443khj43'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Make db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

/// catch 404 and forwarding to error handler
require('./routes/controller')(app, passport);
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(morgan('dev')); // log every request to the console

// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('jade/error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;