var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var dbmsCtrl = require('./dbaudit-ctrl');

router.post('/getSchemaData', dbmsCtrl.getSchemaData);

router.post('/saveSyncConfigData', dbmsCtrl.saveSyncConfigData);
router.post('/getSyncConfigData', dbmsCtrl.getSyncConfigData);

router.post('/getAuditUserData', dbmsCtrl.getUserData);

router.get('/getAuditLogData', dbmsCtrl.getUserLogData);

module.exports = router;