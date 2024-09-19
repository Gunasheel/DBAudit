var express = require('express');
var router = express.Router();

var DbHelper = require('./database.js'),
    db = DbHelper.getDBContext();
var StdLib = require('./std-lib.js');
var stdLib = new StdLib(db);
var encryption=require('./encryption.js');

router.all('*',function(req,res,next){
    req.db = db;
    req.st = stdLib;
     try{
        console.log("token is ibnva dsjnojvnadspi");

        req.query.token = req.headers.token || req.query.token;
      
        req.query.lngId = req.headers.lngid || req.headers.lngId || req.query.lngId || 1;
    
        //  var filePath = req.CONFIG.CONSTANT.INDEX_PATH;
        //  htmlIndexFile = fs.readFileSync(filePath);
        //  indexTemplate = req.CONFIG.CONSTANT.INDEX_TPL;
     }
     catch(ex){
         console.log('indexFileNotFound');
     }
     next();
 });

 var dbms=require('./dbaudit/dbaudit-routes')

 router.use('/dbaudit',dbms);








module.exports = router;