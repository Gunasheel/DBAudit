/**
 * Created by Sanjit Nair on 04-11-2014.
 */

//Get the Libraries

var mysql = require('mysql2'),
    //db_server = "10.0.100.223",//Name of the Server.
    //db_server = "182.73.205.244",//Name of the Server.
    //  db_server = "104.196.9.194",//Name of the Server.
    // db_server = "182.74.145.170",//Name of the Server port= 4406 , p=ezeone.
    db_server = "13.126.166.185",
    db_port = 3306, //Integers please db_port = 3306 .
    // db_collection = "livedb"; //Name of DB Collection
    db_collection = "icanrefer_new"; //Name of DB Collection


exports.getDBContext = function () {

    console.log("DB Test");

    var pool = mysql.createPool({
        host: db_server,
        port: db_port,
        database: db_collection,
        user: 'root',
        // user:'whatmate',
        //password: 'ezeid',
        //commented below to access database from local vedha system
        // password: 'mateonet@lentEZe2017',
        password: 'icanrefer@tm2020',
        multipleStatements: true,
        waitForConnections: true,
        queueLimit: 0,
        dateStrings: true,
        // connectTimeout: 120,
        charset: "utf8mb4_unicode_ci"
    });
    return pool;

};


//module.exports = pool;

