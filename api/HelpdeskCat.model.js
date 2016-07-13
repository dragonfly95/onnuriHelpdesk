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

  db.query('select * from TB_ADMIN_USER where 1=1',
    [],
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

  db.query('select count(*) cnt from TB_ADMIN_USER where 1=1',
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
function findById(db, admin_user_id) {

  var deferred = Q.defer();

  db.query('select * from TB_ADMIN_USER where admin_user_id = ?',
    [admin_user_id],
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

  db.query('insert into TB_ADMIN_USER set ?',
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

  db.query('update TB_ADMIN_USER set ? where admin_user_id = ?',
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

  db.query('delete from TB_ADMIN_USER where admin_user_id = ?',
    [admin_user_id],
     function(err, rows) {
        if(err) {
          deferred.reject(new Error(err.body) );
        }
        deferred.resolve(rows);
    });

  return deferred.promise;

}
