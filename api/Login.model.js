var bcrypt = require('bcrypt');

// Create a password salt
var salt = bcrypt.genSaltSync(10);


module.exports = {
  findByUserId : findByUserId
};


function findByUserId(db, loginform, next) {

  console.log("Login.model.findByUserId ==> ");

  db.query('select * from HMEMBER where 1=1 and EMAIL=?',
    [loginform.email],
    function(err, rows,fields) {

      if(err) throw err;

      if(rows.length == 1) {
        // Salt and hash password

        var passwordToSave = bcrypt.hashSync(loginform.passwd, salt);


console.log("#11");
console.log(rows[0]);
console.log(loginform);
console.log(passwordToSave + '  ::  ' + rows[0].PASSWD);

        if(bcrypt.compareSync(loginform.passwd, rows[0].PASSWD)) {  // 패스워드 맞으면

          console.log("Login.model.findByUserId => 패스워드 맞아요.");
          next(err, rows);
        } else {
          console.log("Login.model.findByUserId => 패스워드 xxxxxxxxxxxxxxxxxxxx.");
          next(err, null);
        }
      } else {
        console.log("Login.model.findByUserId => 이메일 안맞아요..");
        next(err, null);
      }



    });  // end db.query
}
