var model = require('./Login.model');

module.exports = {
  findByUserId : findByUserId
};


function findByUserId(db, loginform, next) {
  model.findByUserId(db, loginform, function(err,rows) {

    if(err) {
      console.log("#2");
      // throw err;
      next(err, null);
    }

    console.log("rows ,, service " + rows);

    if(rows === null) {
      console.log("rows :: Cannot read property '0' of null");
      next(null, null);
    } else {
      var user = {
        email : rows[0].EMAIL,
        passwd : rows[0].PASSWD
      };

      next(null, user);
    }



  });
}
