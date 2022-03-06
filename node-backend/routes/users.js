var express = require('express');
var router = express.Router();
var MongoUtil=require('../lib/mongoUtil');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', function(req, res, next) {
  var myobj=req.body;
 console.log("myobj ", myobj)
 var db=MongoUtil.getDb();

  db.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
   // db.close();
  });
  res.send('success');
});

module.exports = router;
