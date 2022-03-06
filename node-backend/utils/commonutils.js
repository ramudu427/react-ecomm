uuidv1 = require('uuid/v1');
jwt = require('jsonwebtoken');
module.exports={
    getUUID:function(){
        return uuidv1();
    },
    getToken:function(obj){
        // console.log("app.settings.secret ", app.settings.secret);
        return jwt.sign(obj,"ecommerce");
    }
}