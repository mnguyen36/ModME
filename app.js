var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash    = require('connect-flash');
var session      = require('express-session');
var morgan       = require('morgan');
var passport = require('passport');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://heroku_app33971358:jf6h2nhn6ftabihaevie5ciiu8@ds043971.mongolab.com:43971/heroku_app33971358');

mongoose.connect('mongodb://heroku_app33971358:jf6h2nhn6ftabihaevie5ciiu8@ds043971.mongolab.com:43971/heroku_app33971358');

require('./config/passport')(passport);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// session before passport.session
app.use(session({ secret: 'kjh4rkj3443khj43'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

require('./routes/controller')(app, passport);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(morgan('dev')); // log every request to the console
/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;