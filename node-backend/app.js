var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
config=require('config');
bcrypt = require('bcrypt');
saltRounds = 10;
//Winston is also used for logging, will work on it later
// const winston = require('winston');
// winston.configure({
//   transports: [
//     new winston.transports.File({ filename: 'somefile.log' })
//   ]
// });

// winston.info('Hello again distributed logs');
var MongoUtil=require('./lib/mongoUtil');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter=require('./routes/auth');
var app = express();
// Mongodb Setup
MongoUtil.connectToDb(function(err,result){
  if(err){
    console.log("err",err)
  }
})
app.set('secret','ecommerce');
app.use(cors()) // Use this after the variable declaration
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
