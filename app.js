const express = require("express");
let app = express();
const session = require("express-session");
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Includes models
require("./models/models.js");
require('./models/db.js');

// User defined middleware and controllers (route implementations)
const main = require('./controllers/main.js');
const login = require('./controllers/login.js');
const credentials = require("./credentials.js");
const demo_data = require("./models/demo_data");
let middleware = require("./lib/middleware.js");
let searchController = require("./controllers/search.js");
let signup = require("./controllers/signup.js");

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// Session Stuff
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
  }),
);

// Form handler and static files
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//Extra Middleware
app.use(middleware.flashMessages); // Process flash messages
app.use(middleware.populateFormData);

//Main Routes
app.get('/', main.root);
app.get('/', middleware.loginRequired, main.root);

//Search Routes
app.get('/search', middleware.loginRequired, searchController.search);
app.post('/search', searchController.processInformation);
app.post('/addToFavorites', middleware.loginRequired, searchController.addToFavorites);
app.post('/removeFromFavorites', middleware.loginRequired, searchController.removeFromFavorites);

// Get login stuff
app.get('/login', login.login);
app.post('/login', login.processLogin);
app.post('/signup', signup.processSignup);
app.get('/logout', middleware.loginRequired, login.processLogout);

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
