var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var mysql = require('mysql');

var jwt    = require('jsonwebtoken');
var config = require('./config');

// db connection  ///////////////////////////////
var db = mysql.createConnection(config.database);

db.connect(function(err) {
  if(err) {
    console.error('mysql connection error');
    console.error(err);
  }
});

//////////////////////////////////////////////////
///
///

var AttachFile  = require('./api/AttachFile.controller');
var Helpdesk    = require('./api/Helpdesk.controller');
var HelpdeskCat = require('./api/HelpdeskCat.controller');
var Login       = require('./api/Login.controller');
var Member      = require('./api/Member.controller');
var MemberFaq   = require('./api/MemberFaq.controller');
var MemberRole  = require('./api/MemberRole.controller');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  req.superSecret = config.secret;

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);


  next();
});



// 로그인 체크하기
function authentic(req, res, next) {

  // var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var token = req.body.token || req.query.token || req.headers.authorization;
  console.log('token: ' + JSON.stringify(token));
  // console.log(token.split(' '));

  // console.log(token.split(" ")[1]);

  if(token) {

    // verifies secret and checks exp
    jwt.verify(token.split(" ")[1], req.superSecret, function(err, decoded) {
      if (err) {
        console.log('fail jwt.verify ');
        return res.json({ result: 'not ok', message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        console.log("=============================");
        console.log(decoded);
        next();
      }
    });

  } else {

    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
}

app.use('/rest/api/login',        Login);

app.use('/rest/api/attachFile',   authentic, AttachFile);
app.use('/rest/api/helpdesk',     authentic, Helpdesk);
app.use('/rest/api/helpdeskCat',  authentic, HelpdeskCat);
app.use('/rest/api/member',       authentic, Member);
app.use('/rest/api/memberFaq',    authentic, MemberFaq);
app.use('/rest/api/memberRole',   authentic, MemberRole);



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
