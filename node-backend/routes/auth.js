var express = require('express');
var authRouter = express.Router();
let mongoClient = require('../lib/mongoUtil');
let logger = require('../utils/log4js');
let commonUtils=require('../utils/commonutils');
authRouter.post('/signup', function (req, res) {
    let data = req.body;
    data.user_id = commonUtils.getUUID();
    let db = mongoClient.getDb();
    bcrypt.hash(data.password, 10, function (err, hash) {
        data.password = hash;
        db.collection('users').insertOne(data, function (err, result) {
            if (err) {
                logger.log("error", "Error occured while inserting the user profile");
                res.send({ status: false, info: "Got an error" })
            } else {
                let token=commonUtils.getToken({user_id:data.user_id});
                logger.log("info", "Profile is created successfully")
                res.send({ status: true, info: "Profile created successfully", token: token });
            }
        })
    });


});

authRouter.post('/login', function (req, res) {
    var data = req.body;
    let db = mongoClient.getDb();
    db.collection('users').findOne({ email: data.email }, function (err, result) {
        if (err) {
            logger.log("error", "Error occured while connected to db")
            res.send({ status: false, info: "Got an error" });
        } else {
            if(result){
                bcrypt.compare(data.password, result.password, function (err, hash) {
                    if (hash) {
                        let token = jwt.sign({ user_id: result.user_id }, "ecommerce");
                        logger.log("info", "Password is matched")
                        res.send({ status: true, info: "Password matched", token: token });
                    } else {
                        logger.log("error", "Password is not matched")
                        res.send({ status: false, info: "Password is not matched" });
                    }
                });
            }else{
                logger.log("error", "Email is not found")
                res.send({ status: false, info: "Email is not found" });
            }
         
        }
    })

})

module.exports = authRouter;