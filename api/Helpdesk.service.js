var model = require('./Helpdesk.model');

module.exports = {
  findAll : findAll,
  findById : findById,
  createRow : createRow,
  updateRow : updateRow,
  deleteRow : deleteRow
};


function findAll(db, page, callback) {

  var json = {};

  // 목록 가져오기
  model.findAll(db, page).then(function(rows) {

    json.result = "ok";
    json.list = rows;
    json.msg = '';

    // count 가져오기
    return model.findAllCount(db, page);

  }, function(err) {
    callback(err, null);
  })
  .then(function(rows) {

    console.log('#service -> findAllCount');

    var offset = rows[0].cnt % page.pageSize === 0 ? 1 : 0;
    if(rows[0].cnt === 0) offset = 0;
    json.page = {
      pageNo:page.pageNo,
      pageCount: Math.floor(rows[0].cnt / page.pageSize) - offset,
      listCount:rows[0].cnt
    };

    callback(null, JSON.stringify(json));

  }, function(err) {
    callback(err, null);
  });


}



function findById(db, admin_user_id, callback) {

  model.findById(db, admin_user_id)
  .then(function(rows) {
    callback(null, rows);
  })
  .fail(function(err) {
    callback(err, null);
  });
}


function createRow(db, adminUser, callback) {

  console.log('#service -> createRow');

  model.createRow(db, adminUser)
  .then(function(rows) {

    console.log('#service -> success');
    callback(null, rows);
  })
  .fail(function(err) {

    console.log('#service -> fail');
    callback(err, null);
  });

}

function updateRow(db, adminUser, callback) {

  console.log('#service -> updateRow');

  model.updateRow(db, adminUser)
  .then(function(rows) {

    console.log('#service -> success');
    callback(null, rows);
  })
  .fail(function(err) {

    console.log('#service -> fail');
    callback(err, null);
  });

}

function deleteRow(db, admin_user_id, callback) {

  model.deleteRow(db, admin_user_id)
  .then(function(rows) {
    callback(null, rows);
  })
  .fail(function(err) {
    callback(err, null);
  });

}
