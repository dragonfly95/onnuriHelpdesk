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

  var start = page.pageNo * page.pageSize;
  if(page.pageNo <= 1) start = 0;


  console.log('Helpdesk.mode.js');
  console.log('select * from HELPDESK where 1=1 order by helpdesk_seq desc limit ?,?');
  console.log('start :: ' + start);
  console.log('page.pageSize :: ' + page.pageSize);

  db.query('select * from HELPDESK where 1=1 order by helpdesk_seq desc limit ?,?',
    [start, page.pageSize],
     function(err, rows) {
        if(err) {
          console.log('#error findAll');
          deferred.reject(new Error(err.body) );
        }
        deferred.resolve(rows);
    });

  return deferred.promise;
}

function findAllCount(db, helpdesk_seq) {

  var deferred = Q.defer();

  db.query('select count(*) cnt from HELPDESK where 1=1',
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
function findById(db, helpdesk_seq) {

  var deferred = Q.defer();

  db.query('select * from HELPDESK where helpdesk_seq = ?',
    [helpdesk_seq],
     function(err, rows) {
        if(err) {
          deferred.reject(new Error(err.body) );
        }
        deferred.resolve(rows);
    });

  return deferred.promise;

}

function createRow(db, helpdesk) {

  var deferred = Q.defer();

  db.query('insert into HELPDESK set ?',
    helpdesk,
    function(err, rows) {
      if(err) {
        deferred.reject(new Error(err.body) );
      }
      deferred.resolve(rows);
    });

  return deferred.promise;

}


function updateRow(db, helpdesk) {

  var deferred = Q.defer();

  db.query('update HELPDESK set ? where helpdesk_seq = ?',
    [helpdesk, helpdesk.helpdesk_seq],
     function(err, rows) {
        if(err) {
          deferred.reject(new Error(err.body) );
        }
        deferred.resolve(rows);
    });

  return deferred.promise;

}


function deleteRow(db, helpdesk_seq) {

  var deferred = Q.defer();

  db.query('delete from HELPDESK where helpdesk_seq = ?',
    [helpdesk_seq],
    function(err, rows) {
      if(err) {
        deferred.reject(new Error(err.body) );
      }
      deferred.resolve(rows);
    });

  return deferred.promise;

}
