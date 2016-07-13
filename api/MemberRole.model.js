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

  db.query('select * from MEMBER_ROLE where 1=1' ,
    [] ,
    function(err, rows) {
      if(err) {
        deferred.reject(new Error(err.body) );
      }
      deferred.resolve(rows);
    });

  return deferred.promise;
}

function findAllCount(db, seq) {

  var deferred = Q.defer();

  db.query('select count(*) cnt from MEMBER_ROLE where 1=1' ,
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
function findById(db, seq) {

  var deferred = Q.defer();

  db.query('select * from MEMBER_ROLE where seq = ?',
    [seq],
    function(err, rows) {
        if(err) {
          deferred.reject(new Error(err.body) );
        }
        deferred.resolve(rows);
    });

  return deferred.promise;
}


function createRow(db, adminUser) {

  var deferred = Q.defer();

  db.query('insert into MEMBER_ROLE set ?' ,
    adminUser,
    function(err, rows) {
        if(err) {
          deferred.reject(new Error(err.body) );
        }
        deferred.resolve(rows);
    });

  return deferred.promise;

}


function updateRow(db, adminUser) {

  var deferred = Q.defer();

  db.query('update MEMBER_ROLE set ? where seq = ?' ,
    [adminUser, adminUser.seq],
    function(err, rows) {
      if(err) {
        deferred.reject(new Error(err.body) );
      }
      deferred.resolve(rows);
    });

  return deferred.promise;

}


function deleteRow(db, seq) {

  var deferred = Q.defer();

  db.query('delete from MEMBER_ROLE where seq = ?' ,
    [seq] ,
    function(err, rows) {
      if(err) {
        deferred.reject(new Error(err.body) );
      }
      deferred.resolve(rows);
    });

  return deferred.promise;

}
