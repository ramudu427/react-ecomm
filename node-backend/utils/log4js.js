log4js = require('log4js');
var logger = log4js.getLogger();
module.exports={
    log:function(level,message){
        logger.level=level;
        if(level=="info"){
             logger.info(message);

        }else if(level=="error"){
             logger.error(message);

        }else{
             logger.debug(message);

        }
    }
}
