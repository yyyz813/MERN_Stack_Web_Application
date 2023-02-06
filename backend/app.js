var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tutorsRouter = require('./routes/tutors');
var appointmentsRouter = require('./routes/appointments');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/allTutorsList', tutorsRouter);
app.use('/allAppointments', appointmentsRouter);
app.use('/', loginRouter);

// auth
// app.all( '*',function(req, response, next) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Credentials", "true");
//   response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   response.header("Access-Control-Allow-Headers", "x-access-token,User-Agent,sec-ch-ua-platform,sec-ch-ua-mobile,sec-ch-ua,Referer,Content-Type,Accept");
//   next();
// });

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
