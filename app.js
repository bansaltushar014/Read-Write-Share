var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var profileRouter = require('./routes/profile');
var api = require('./app_api/routes/api_routes');

var session = require('express-session');
var socket = require('./routes/socket');
var flash = require('req-flash');
var validator = require('express-validator');
var cors = require("cors");
var app = express();
app.io = require('socket.io')();
require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cors({origin:"*"}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: '123' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());
app.use(flash());


app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  // console.log('print this '+req.isAuthenticated());
  next();
});


app.use('/api', api);
app.use('/profile', profileRouter);
app.use('/socket', socket.router);
app.use('/user', userRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

socket.sck(app.io);
module.exports = app;
