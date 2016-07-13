var express = require('express');
var router = express.Router();

var service = require('./Login.service');
var jwt    = require('jsonwebtoken');

router.post('/auth', function(req, res, next) {
  service.findByUserId(req.db, req.body, function(err, user) {

    if(err) {
      console.log("#2");
      // throw err;
      res.json({'message':'login fail', result:'not ok'});
    }

    // if user is found and password is right
    // create a token
    var token = jwt.sign(user, req.superSecret, {
      expiresIn: '24h'
    });


    console.log("login.controller => success");
    // res.writeHead(200, {'Authorization':'bearer ' + token, 'Content-Type': 'application/json' });
    res.json({'token':token});

  });

});

module.exports = router;
