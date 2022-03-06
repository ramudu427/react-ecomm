const MongoClient=require('mongodb').MongoClient;
let url="mongodb://localhost:27017"
let db_name=config.get('ecommerce.db_name');
let db;
module.exports={
    connectToDb:function(callback){
        MongoClient.connect(url,function(err,result){
    db=result.db(db_name);
    return callback(err);
        });
    },
    getDb:function(){
        return db;
    }
}
