var request = require('request');

// var conn = require('../database');
// var compression = require('../compression')
// const { stringify } = require('querystring');
// var loginTypeModule = require('../Modules/login');
// var commonFunction = require('../commonFunction');
// var bcrypt = null;
// try {
//     bcrypt = require('bcrypt-nodejs');
// }
// catch (ex) {
//     console.log('Bcrypt not found, falling back to bcrypt-nodejs');
//     bcrypt = require('bcrypt-nodejs');
// }

// var zlib = require('zlib');
var appConfig = require('../config.json');
 var AES_256_encryption = require('../encryption');
 var encryption = new AES_256_encryption();
// const aKey = appConfig.DB.aKey;
// var crypto = require('crypto');

var dbms = {};


// function comparePassword(password, hash) {
//     try {
//         if (!password) {
//             return false;
//         }
//         if (!hash) {
//             return false;
//         }
//         // console.log(password, hash);
//         // console.log(bcrypt.compareSync(password, hash))
//         return bcrypt.compareSync(password, hash);
//     }
//     catch (ex) {
//         console.log("compare password error", ex);
//     }

// }

// function hashPassword(password) {
//     var bcrypt = null;

//     try {
//         bcrypt = require('bcrypt-nodejs');
//     }
//     catch (ex) {
//         console.log('Bcrypt not found, falling back to bcrypt-nodejs');
//         bcrypt = require('bcrypt-nodejs');
//     }

//     if (!password) {
//         return null;
//     }
//     try {
//         var salt = bcrypt.genSaltSync(12);
//         var hash = bcrypt.hashSync(password, salt);
//         return hash;
//     }
//     catch (ex) {
//         console.log(ex);
//     }
// }



// dbms.getSchemaData = function (req, res, next) {

//     var error_response = {
//         status: false,
//         message: "Some error occurred!",
//         error: null,
//         data: null
//     }

//     var error = {};
//     var response = {
//         status: false,
//         message: "Some error occured",
//         data: null,
//         error: null
//     };
//     var validationFlag = true;

//     // if (!req.query.token) {
//     //     error.token = 'Invalid token';
//     //     validationFlag *= false;
//     // }

//     if (!validationFlag) {
//         response.error = error;
//         response.message = 'Please check the error';
//         res.status(400).json(response);
//         console.log(response);
//     }
//     else {
//         try {
//             // commonFunction.validateToken(req.query.token, function (err, tokenResult) {
//             //     try {
//             //         if ((!err) && !(!(tokenResult))) {


//             var inputs = [
//                 req.st.db.escape(req.query.token),
//                 req.st.db.escape(req.query.lngId || 1),
//                 req.st.db.escape(JSON.stringify(req.body || {})),

//                 req.st.db.escape(req.body.DBSecretKey || 0)
//             ];

//             var procQuery = 'CALL tm_getSchemaData(' + inputs.join(',') + ')';
//             console.log(procQuery);
//             req.db.query(procQuery, function (err, result) {
//                 console.log(err);

//                 if (!err && result && result[0] && result[0][0] && result[0][0].message) {
//                     response.status = true;
//                     response.message = result[0][0].message;
//                     response.error = null;
//                     response.data = {
//                         schemaDetails: result[1][0] ? result[1] : {}
//                     };
//                     res.status(200).json(response);
//                 }

//                 else if (!err && result && result[0] && result[0][0] && result[0][0]._error) {
//                     response.status = false;
//                     response.message = result[0][0]._error;
//                     response.error = null;
//                     response.data = null;
//                     res.status(200).json(response);
//                 }
//                 else {
//                     response.status = false;
//                     response.message = "Something went wrong";
//                     response.error = null;
//                     response.data = null;
//                     res.status(500).json(response);
//                 }
//             });
//             //     }
//             //     else {
//             //         res.status(401).json(response);
//             //     }
//             // }
//             // catch (ex) {
//             //     console.log(ex);
//             //     response.error = ex;
//             //     res.status(200).json(response);
//             // }
//             // });
//         }
//         catch (ex) {
//             console.log(ex);
//             response.error = ex;
//             res.status(200).json(response);
//         }
//     }
// };


// dbms.saveSyncConfigData = function (req, res, next) {

//     var error_response = {
//         status: false,
//         message: "Some error occurred!",
//         error: null,
//         data: null
//     }

//     var error_logger = {
//         details: 'signup/nearkart-ctrl : icrCtrl.saveSyncConfigData'
//     }

//     var error = {};
//     var response = {
//         status: false,
//         message: "Some error occured",
//         data: null,
//         error: null
//     };
//     var validationFlag = true;

//     if (!req.query.token) {
//         error.token = 'Invalid token';
//         validationFlag *= false;
//     }

//     if (!validationFlag) {
//         response.error = error;
//         response.message = 'Please check the error';
//         res.status(400).json(response);
//         console.log(response);
//     }
//     else {
//         try {
//             // commonFunction.validateToken(req.query.token, function (err, tokenResult) {
//             //     try {
//             //         if ((!err) && !(!(tokenResult))) {


//             var inputs = [
//                 req.st.db.escape(req.query.token),
//                 req.st.db.escape(req.query.lngId || 1),
//                 req.st.db.escape(JSON.stringify(req.body || {})),

//                 req.st.db.escape(req.body.DBSecretKey || 0)
//             ];

//             var procQuery = 'CALL icrWeb_save_sync_config_data(' + inputs.join(',') + ')';
//             console.log(procQuery);
//             req.db.query(procQuery, function (err, result) {
//                 console.log(err);

//                 if (!err && result && result[0] && result[0][0] && result[0][0].message) {
//                     response.status = true;
//                     response.message = result[0] && result[0][0] && result[0][0].message ? result[0][0].message : "Data saved successfully";
//                     response.error = null;
//                     response.data = {
//                         list: result[1] && result[1][0] ? result[1] : []
//                     }

//                     res.status(200).json(response);


//                     sync_source_config_data(inputs.join(','), (err, result) => {
//                         if (!err) {
//                             console.log(result);
//                         }
//                         else {
//                             console.log('err', err)
//                         }

//                     })
//                 }

//                 else if (!err && result && result[0] && result[0][0] && result[0][0]._error) {
//                     response.status = false;
//                     response.message = result[0][0]._error;
//                     response.error = null;
//                     response.data = null;
//                     res.status(200).json(response);
//                 }
//                 else {
//                     response.status = false;
//                     response.message = "Something went wrong";
//                     response.error = null;
//                     response.data = null;
//                     res.status(500).json(response);
//                 }
//             });
//             //     }
//             //     else {
//             //         res.status(401).json(response);
//             //     }
//             // }
//             // catch (ex) {
//             //     console.log(ex);
//             //     response.error = ex;
//             //     res.status(200).json(response);
//             // }
//             // });
//         }
//         catch (ex) {
//             console.log(ex);
//             response.error = ex;
//             res.status(200).json(response);
//         }
//     }
// };







dbms.getUserData = function (req, res, next) {


    var error_response = {
        status: false,
        message: "Some error occurred!",
        error: null,
        data: null
    }

    var error_logger = {
        details: 'signup/nearkart-ctrl : icrCtrl.getUserData'
    }

    var error = {};
    var response = {
        status: false,
        message: "Some error occured",
        data: null,
        error: null
    };
    var validationFlag = true;

    // if (!req.query.token) {
    //     error.token = 'Invalid token';
    //     validationFlag *= false;
    // }

    if (!validationFlag) {
        response.error = error;
        response.message = 'Please check the error';
        res.status(400).json(response);
        console.log(response);
    }
    else {
        try {
            // commonFunction.validateToken(req.query.token, function (err, tokenResult) {
            //     try {
            //         if ((!err) && !(!(tokenResult))) {

            req.st.validateToken(req.query.token, function (err, tokenResult) {
                if ((!err) && tokenResult) {
                    var decryptBuf = encryption.decrypt1((req.body.data), tokenResult[0].secretKey);
                    zlib.unzip(decryptBuf, function (_, resultDecrypt) {
                        try {
                            req.body = resultDecrypt ? JSON.parse(resultDecrypt.toString('utf-8')) : req.body;
                            console.log(req.body);
                            var validationFlag = true;










                            function logDifferences(differences) {
                                differences.forEach(diff => {
                                    const query = 'CALL icr_Audit_logs_SP(?, ?, ?,?,?)';

                                    req.db.query(query, [diff.parameter, diff.inputValue, diff.responseValue, diff.idKey, req.body["tableId"]], (err, results) => {
                                        if (err) {
                                            console.error('Error logging difference:', err);
                                            return;
                                        }
                                        console.log('Logged difference:', diff);
                                    });
                                });
                            }

                            var inputs = [
                                req.st.db.escape(req.query.token),
                                req.st.db.escape(req.query.lngId || 1),
                                req.st.db.escape(JSON.stringify(req.body || {})),

                                req.st.db.escape(req.body.DBSecretKey || 0)
                            ];

                            var procQuery = 'CALL icrWeb_get_audit_user_data(' + inputs.join(',') + ')';
                            console.log(procQuery);
                            req.db.query(procQuery, function (err, result) {
                                console.log(err);

                                if (!err && result && result[0] && result[0][0] && result[0][0].message) {
                                    response.status = true;
                                    response.message = result[0] && result[0][0] && result[0][0].message ? result[0][0].message : "Data saved successfully";
                                    response.error = null;
                                    response.data = {
                                        list: result[1] && result[1][0] ? result[1] : []
                                    }

                                    let responseData = result[1] && result[1][0] ? result[1][0] : {};


                                    console.log(responseData);

                                    if (responseData && responseData["jsonData"]) {
                                        responseData = responseData["jsonData"];

                                        // Input data (req.body)
                                        let inputData = req.body["properties"];

                                        console.log(inputData);

                                        // Define only the parameters you want to compare
                                        const paramsToCompare = [];

                                        // Store differences
                                        let differences = [];

                                        // Compare only the selected parameters
                                        /*
                                        paramsToCompare.forEach(key => {
                                            if (inputData[key] !== responseData[key]) {
                                                differences.push({
                                                    parameter: key,
                                                    idKey:inputData["TID"],
                                                    inputValue: inputData[key],
                                                    responseValue: responseData[key] || 'undefined'
                                                });
                                            }
                                        });
                    */

                                        // Compare input body and response data
                                        Object.keys(inputData).forEach(key => {
                                            if (inputData[key] !== responseData[key]) {
                                                differences.push({
                                                    parameter: key,
                                                    idKey: req.body["refId"],
                                                    inputValue: inputData[key],
                                                    responseValue: responseData[key] || 'undefined'
                                                });
                                            }
                                        });

                                        // Log differences
                                        console.log("Differences found:", differences);
                                        logDifferences(differences);
                                        // Prepare response object
                                        response = {
                                            status: true,
                                            message: result[0][0].message || "Data saved successfully",
                                            error: null,
                                            data: {
                                                list: result[1] ? result[1] : [],
                                                differences: differences // Include differences in the response
                                            }
                                        };

                                    }
                                    else {
                                        response.status = true;
                                        response.message = "No Previous Logs Present";
                                        response.error = null;
                                        response.data = null;
                                    }
                                    res.status(200).json(response);



                                }


                                else if (!err && result && result[0] && result[0][0] && result[0][0]._error) {
                                    response.status = false;
                                    response.message = result[0][0]._error;
                                    response.error = null;
                                    response.data = null;
                                    res.status(200).json(response);
                                }
                                else {
                                    response.status = false;
                                    response.message = "Something went wrong";
                                    response.error = null;
                                    response.data = null;
                                    res.status(500).json(response);
                                }

                            });


                            //     }
                            //     else {
                            //         res.status(401).json(response);
                            //     }
                            // }
                            // catch (ex) {
                            //     console.log(ex);
                            //     response.error = ex;
                            //     res.status(200).json(response);
                            // }
                            // });

                        }
                        catch (err) {
                            console.log(err);

                            res.status(401).json(response);
                        }
                    });
                }
            });


        }
        catch (ex) {
            console.log(ex);
            response.error = ex;
            res.status(200).json(response);
        }
    }
};





dbms.getUserLogData = function (req, res, next) {


    var error_response = {
        status: false,
        message: "Some error occurred!",
        error: null,
        data: null
    }

    var error_logger = {
        details: 'signup/nearkart-ctrl : icrCtrl.getUserData'
    }

    var error = {};
    var response = {
        status: false,
        message: "Some error occured",
        data: null,
        error: null
    };
    var validationFlag = true;



    if (!validationFlag) {
        response.error = error;
        response.message = 'Please check the error';
        res.status(400).json(response);
        console.log(response);
    }
    else {
        try {



            var inputs = [
                req.st.db.escape(req.query.token),
                req.st.db.escape(req.query.lngId || 1),
                req.st.db.escape(req.query.refId || 1),

                req.st.db.escape(req.body.DBSecretKey || 0)
            ];

            var procQuery = 'CALL icrWeb_get_audit_log_data(' + inputs.join(',') + ')';
            console.log(procQuery);
            req.db.query(procQuery, function (err, result) {
                console.log(err);

                if (!err && result && result[0] && result[0][0] && result[0][0].message) {
                    response.status = true;
                    response.message = result[0] && result[0][0] && result[0][0].message ? result[0][0].message : "Data saved successfully";
                    response.error = null;
                    response.data = {
                        list: result[1] && result[1][0] ? result[1] : []
                    }

                    let responseData = result[1] && result[1][0] ? result[1][0] : {};

                    res.status(200).json(response);



                }


                else if (!err && result && result[0] && result[0][0] && result[0][0]._error) {
                    response.status = false;
                    response.message = result[0][0]._error;
                    response.error = null;
                    response.data = null;
                    res.status(200).json(response);
                }
                else {
                    response.status = false;
                    response.message = "Something went wrong";
                    response.error = null;
                    response.data = null;
                    res.status(500).json(response);
                }
            });

        }
        catch (ex) {
            console.log(ex);
            response.error = ex;
            res.status(200).json(response);
        }
    }
};
























// dbms.getSyncConfigData = function (req, res, next) {

//     var error_response = {
//         status: false,
//         message: "Some error occurred!",
//         error: null,
//         data: null
//     }

//     var error_logger = {
//         details: 'signup/nearkart-ctrl : icrCtrl.getSyncConfigData'
//     }

//     var error = {};
//     var response = {
//         status: false,
//         message: "Some error occured",
//         data: null,
//         error: null
//     };
//     var validationFlag = true;

//     if (!req.query.token) {
//         error.token = 'Invalid token';
//         validationFlag *= false;
//     }

//     if (!validationFlag) {
//         response.error = error;
//         response.message = 'Please check the error';
//         res.status(400).json(response);
//         console.log(response);
//     }
//     else {
//         try {
//             // commonFunction.validateToken(req.query.token, function (err, tokenResult) {
//             //     try {
//             //         if ((!err) && !(!(tokenResult))) {


//             var inputs = [
//                 req.st.db.escape(req.query.token),
//                 req.st.db.escape(req.query.lngId || 1),
//                 req.st.db.escape(JSON.stringify(req.body || {})),

//                 req.st.db.escape(req.body.DBSecretKey || 0)
//             ];

//             var procQuery = 'CALL icrWeb_get_sync_config_data(' + inputs.join(',') + ')';
//             console.log(procQuery);
//             req.db.query(procQuery, function (err, result) {
//                 console.log(err);

//                 if (!err && result && result[0] && result[0][0] && result[0][0].message) {
//                     response.status = true;
//                     response.message = result[0] && result[0][0] && result[0][0].message ? result[0][0].message : "Data loaded successfully";
//                     response.error = null;
//                     response.data = {
//                         list: result[1] && result[1][0] ? result[1] : []
//                     }

//                     res.status(200).json(response);
//                 }

//                 else if (!err && result && result[0] && result[0][0] && result[0][0]._error) {
//                     response.status = false;
//                     response.message = result[0][0]._error;
//                     response.error = null;
//                     response.data = null;
//                     res.status(200).json(response);
//                 }
//                 else {
//                     response.status = false;
//                     response.message = "Something went wrong";
//                     response.error = null;
//                     response.data = null;
//                     res.status(500).json(response);
//                 }
//             });
//             //     }
//             //     else {
//             //         res.status(401).json(response);
//             //     }
//             // }
//             // catch (ex) {
//             //     console.log(ex);
//             //     response.error = ex;
//             //     res.status(200).json(response);
//             // }
//             // });
//         }
//         catch (ex) {
//             console.log(ex);
//             response.error = ex;
//             res.status(200).json(response);
//         }
//     }
// };



// dbms.sync_source_config_data = (inputs, type, callback) => {
//     // inputs is req.body
//     var procQuery = 'CALL icrWeb_get_fetch_sync_urls(' + type + ')';
//     console.log(procQuery);

//     db.query(procQuery, function (err, dbresult) {
//         if (!err && dbresult && dbresult[0]) {
//             console.log(dbresult[0]);

//             var recurs = (index) => {
//                 if (index < dbresult[0].length) {
//                     var result = dbresult[0][index];
//                     let config = {
//                         method: 'post',
//                         maxBodyLength: Infinity,
//                         url: result.url,
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         data: inputs
//                     };

//                     console.log("config")
//                     console.log(config)

//                     axios(config)
//                         .then(res => {
//                             console.log("response;")
//                             console.log('response ', res.data);
//                             return recurs(++index);

//                         })
//                         .catch(error => {
//                             console.log(error)
//                             return recurs(++index);

//                         })
//                 } else {
//                     callback(null, "Finished")
//                 }
//             }
//             return recurs(0);
//         }
//         else {
//             let message = "NO DATA";
//             callback(null, message);
//         }
//     })


// };




module.exports = dbms;