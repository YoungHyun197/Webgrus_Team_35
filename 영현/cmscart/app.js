var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var config = require('./config/database');
var bodyParser = require('body-parser')
var session = require('express-session')
var expressValidator = require('express-validator')

// Connect to db
mongoose.connect(config.database, {useNewUrlParser : true}, { useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongoDB');
});

// Init app
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set pulbic folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser midleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// express Session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//Express Validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + napespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// Set routes
var pages = require('./routes/pages.js');
var adminPages = require('./routes/admin_pages.js');
app.use('/admin/pages',adminPages);
app.use('/',pages);

//Start the server
var port = 3000;
app.listen(port, function() {
    console.log('Server started on port ' + port);
});