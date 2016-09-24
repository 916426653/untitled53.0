var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var routes = require('./config/routes');
var config=require('./config/config');


// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

mongoose.connect('mongodb://localhost/blogOne');

// view engine setup

app.set('views', path.join(__dirname, 'views'));
// app.set( 'view engine', 'ejs');


app.set( 'view engine', 'html');
app.engine( '.html', require( 'ejs').__express );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "45454",
    // resave : 是指每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟
    resave: false,
    // saveUninitialized: 是指无论有没有session cookie，每次请求都设置个session cookie
    saveUninitialized: true,
    store: new MongoStore({
      cookieSecret:'wqq',
      db:'blogOne',
      host:'localhost'
    })
}))


// app.use('/', routes);
// app.use('/users', users);
console.log(config);
routes(app);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
