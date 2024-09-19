var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var uuid = require('node-uuid');
// var aws_sns_push = require('./routes/modules/notification/aws-sns-push.js');

var compress = require('compression');
var fs = require('fs');
var multer = require('multer');
const crypto = require('crypto')

var app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//var alumni = require('./routes/alumni.js');
// app.use(multer({
//     dest: './uploads',
//     limits: {
//         fieldNameSize: 200,
//         files: 10,
//         fields: 50,
//         fileSize: (1024 * 1024 * 100)
//     }
// }));

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors(
    {
        origin: ['https://www.tallite.com', 'https://acs.tallite.com', 'https://ijper.tallite.com', 'https://ind.tallite.com', 'https://peoplestaff.tallite.com', 'https://seagull.tallite.com', 'https://fgheewala.tallite.com', 'https://grabagrub.tallite.com', 'https://jobraiser.tallite.com', 'https://talentmicro.tallite.com', 'https://korcomptenz.tallite.com', 'https://hm.tallite.com', 'http://dev.tallite.com', 'http://localhost:4200', 'http://careers.peoplestaff.in', 'https://careers.peoplestaff.in', 'https://www.cvmine.com', 'https://cvmine.com', 'http://localhost:4201','https://careers.grab.in','https://moglix.tallite.com','https://smartsoc.tallite.com','http://devhm.tallite.com']
    }
))

// app.options('/',cors());

app.disable('x-powered-by');
app.disable('server');

app.use(logger('dev'));
// app.use(bodyParser.json());

app.use(cookieParser());
var CONFIG = JSON.parse(fs.readFileSync(__dirname + '/config.json'));


// Request rate limiter
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 1 * 1000, // 1 sec, 1 request max
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)


// Add headers
app.all('*', function (req, res, next) {
    console.log();

    req.query.token = req.headers.token || req.query.token;

    req.query.lngId = req.headers.lngid || req.headers.lngId || req.query.lngId || 1;

    if (!req.headers.token) {
        var key = CONFIG.DB.aKey
    } else {
        var key = req.headers.token;
    }

    let hash = crypto.createHash('sha512')
        .update(req.headers.timestamp + req.headers.ip + req.headers.region + key)
        .digest('hex')
    if (req.headers.hash == hash || req.headers.xes || req.url.indexOf('duplicate_check_portal_applicants') != -1 || req.url.indexOf('save_portal_applicants') != -1) {

        req.CONFIG = CONFIG;
        req.query.lngId = 1;

        //// Website you wish to allow to connect
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', req.method);
        res.setHeader('Content-Security-Policy', "default-src 'self';");
        //// Request headers you wish to allow
        //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        // res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    } else {
        console.log("Hash failed")
        res.status(400).json({
            status: false,
            message: "Bad request!!!!",
            data: null
        })
    }
});

// Added for testing purpose

// Set header to force download
function setHeaders(res, path) {
    res.setHeader('Content-Disposition', contentDisposition(path))
}

 var api = require('./api.js');
// var index = require('./routes/index.js');
// var redirectMiddleware = require('./routes/middleware/redirect-middleware');
// const { CompositionHookPage } = require('twilio/lib/rest/video/v1/compositionHook');
// app.use(redirectMiddleware);
app.use(compress());
app.use('/api',api);

// app.use('/api_v2', api);
// app.use('/api_uat', api);
// app.use('/api', api);
// app.use('/api_us', api);
// app.use('/api_ae', api);

/**
 * EZEOne Alumni Middleware
 */

//app.use('/',alumni);
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}



// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log('404 : Page not found');

    if (req.type == 'json') {
        res.type('json').status(404).json({ message: 'Invalid Service call', status: false });
    }
    else {
        res.status(404).send('');
    }
});


module.exports = app;