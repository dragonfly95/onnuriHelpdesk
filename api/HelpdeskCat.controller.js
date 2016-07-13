var express = require('express');
var router = express.Router();

var service = require('./HelpdeskCat.service');

router.get('/', function(req, res, next) {

  var page = {
    pageNo : parseInt( req.query.pageNo || 1),
    pageSize : parseInt( req.query.pageSize || 10)
  };

  console.log("page:: ");
  console.log(page);

  service.findAll(req.db, page, function(err, rows) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(rows);
  });
});

/* pk로 조회하기 */
router.get('/:seq', function(req, res, next) {

  console.log("findByid : " + req.seq);
  service.findById(req.db, req.params.seq, function(err, rows) {
    res.send(rows);
  });
});

/* 저장 */
router.post('/', function(req, res, next) {

  // console.log("post" + req.body);
  service.createRow(req.db, req.body, function(err, rows) {
    res.send(rows);
  });
});

/* 수정 */
router.put('/:seq', function(req, res, next) {
  service.updateRow(req.db, req.body, function(err, rows) {
    res.send(rows);
  });
});


/* 삭제 */
router.delete('/:seq', function(req, res, next) {
  service.deleteRow(req.db, req.body, function(err,rows) {
    res.send(rows);
  });
});

module.exports = router;
