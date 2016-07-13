var model = require('./Member.model');
var keygen = require("keygenerator");

var bcrypt = require('bcrypt');

// Create a password salt
var salt = bcrypt.genSaltSync(10);


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



function findById(db, identifier, callback) {

  model.findById(db, identifier)
  .then(function(rows) {
    console.log("MemberService findById ==> success");
    callback(null, rows);
  }, function(err) {
    console.log("MemberService findById ==> fails ");
    callback(err, null);
  });
}
function createRow(db, adminUser, callback) {

  console.log('#service -> createRow');

  var passwordToSave = bcrypt.hashSync(adminUser.passwd, salt);

  adminUser.identifier = keygen._();      // 아이디 랜덤값
  adminUser.passwd     = passwordToSave;  // 패스워드 암호화
  adminUser.regist_date = new Date();

  console.log("createRow" + JSON.stringify(adminUser));

  model.createRow(db, adminUser)
  .then(function(rows) {
    console.log('#Memberservice -> createRow success');
    callback(null, rows);
  // })
  // .fail(function(err) {
  //   console.log('#Memberservice -> createRow fail');
  //   throw err;
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

function deleteRow(db, identifier, callback) {

  model.deleteRow(db, identifier)
  .then(function(rows) {
    callback(null, rows);
  })
  .fail(function(err) {
    callback(err, null);
  });

}
