const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/weather', weatherRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
