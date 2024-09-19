#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('ezeid_node:server');
var http = require('http');
// var logger = require('../logger.js')
// var log = logger.logger;

var https = require('https');
var fs = require('fs');

/*var options = {
  pfx: fs.readFileSync('finalcert.pfx'),
  passphrase:'hire'
};*/


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '1010');
app.set('port', port);

/**
 * Create HTTP server.
 */

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var cluster = require('cluster');

var workers = process.env.WORKERS || require('os').cpus().length;

if (cluster.isMaster) {

  console.log('start cluster with %s workers', workers);

  //for (var i = 0; i < workers; ++i) {
  //
  //}
  var worker = cluster.fork().process;
  console.log('worker %s started.', worker.pid);

  cluster.on('exit', function(worker) {
    console.log('worker %s died. restart...', worker.process.pid);
    cluster.fork();
  });

} else {

  var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('DBAudit Server is started successfully, and listening on port ' + app.get('port'));
  })
      .on('error', onError)
      .on('listening', onListening);
}

process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
  process.exit(1)
});

//if (cluster.isMaster) {
//    for (var i = 0; i < numCPUs; i++) {
//        cluster.fork();
//    }
//
//    cluster.on('exit', function(worker, code, signal) {
//        console.log('worker ' + worker.process.pid + ' died');
//        log.error('worker ' + worker.process.pid + ' died')
//    });
//} else {
//    var server = http.createServer(app).listen(app.get('port'), function(){
//        console.log('EZEID Server is started successfully, and listening on port ' + app.get('port'));
//    });
//
//    server.on('error', onError);
//    server.on('listening', onListening);
//}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
