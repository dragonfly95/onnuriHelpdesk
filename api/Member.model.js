var Q = require('q');


module.exports = {
  findAll : findAll,
  findAllCount : findAllCount,
  findById : findById,
  createRow : createRow,
  updateRow : updateRow,
  deleteRow : deleteRow
};

function findAll(db, page) {

  var deferred = Q.defer();

  db.query('select * from HMEMBER where 1=1' ,
    [] ,
    function(err, rows) {
      if(err) {
        deferred.reject(new Error(err.body) );
      }
      deferred.resolve(rows);
    });

  return deferred.promise;
}

function findAllCount(db, admin_user_id) {

  var deferred = Q.defer();

  db.query('select count(*) cnt from HMEMBER where 1=1',
    [],
    function(err, rows) {
      if(err) {
        deferred.reject(new Error(err.body) );
      }
      deferred.resolve(rows);
    });

  return deferred.promise;

}

//id 조회 테스트
function findById(db, identifier) {

  var deferred = Q.defer();

  db.query('select * from HMEMBER where identifer = ?',
    [identifier],
    function(err, rows) {
        if(err) {
          console.log("Member.Model findbyId ==> fail");
          deferred.reject(new Error(err.body) );
        }
        console.log("Member.Model findbyId ==> success");
        deferred.resolve(rows);
    });

  return deferred.promise;
}


function createRow(db, adminUser) {

  var deferred = Q.defer();

  db.query('insert into HMEMBER set ?',
    adminUser,
    function(err, rows) {
        if(err) {
          console.log("member.model.createRow ==>> error ");
          deferred.reject(new Error(err.body) );
        }
        console.log("member.model.createRow ==>> success ");
        deferred.resolve(rows);
    });

  return deferred.promise;

}


function updateRow(db, adminUser) {

  var deferred = Q.defer();

  db.query('update HMEMBER set ? where identifier = ?',
    [adminUser, adminUser.admin_user_id],
     function(err, rows) {
        if(err) {
          deferred.reject(new Error(err.body) );
        }
        deferred.resolve(rows);
    });

  return deferred.promise;

}


function deleteRow(db, admin_user_id) {

  var deferred = Q.defer();

  db.query('delete from HMEMBER where identifier = ?',
    [admin_user_id],
     function(err, rows) {
        if(err) {
          deferred.reject(new Error(err.body) );
        }
        deferred.resolve(rows);
    });

  return deferred.promise;

}
