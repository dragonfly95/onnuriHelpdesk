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

  db.query('select * from MEMBER_FAQ where 1=1',
    [],
    function(err, rows) {
      if(err) {
        deferred.reject(new Error(err.body) );
      }
      deferred.resolve(rows);
    });

  return deferred.promise;
}

function findAllCount(db, member_faq_seq) {

  var deferred = Q.defer();

  db.query('select count(*) cnt from MEMBER_FAQ where 1=1',
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
function findById(db, member_faq_seq) {

  var deferred = Q.defer();

  db.query('select * from MEMBER_FAQ where member_faq_seq = ?' ,
    [member_faq_seq] ,
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

  db.query('insert into MEMBER_FAQ set ?' ,
    adminUser ,
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

  db.query('update MEMBER_FAQ set ? where member_faq_seq = ?' ,
   [adminUser, adminUser.member_faq_seq] ,
   function(err, rows) {
      if(err) {
        deferred.reject(new Error(err.body) );
      }
      deferred.resolve(rows);
    });

  return deferred.promise;

}


function deleteRow(db, member_faq_seq) {

  var deferred = Q.defer();

  db.query('delete from MEMBER_FAQ where member_faq_seq = ?' ,
    [member_faq_seq] ,
    function(err, rows) {
      if(err) {
        deferred.reject(new Error(err.body) );
      }
      deferred.resolve(rows);
    });

  return deferred.promise;

}
