// load the express package and create our app
var express = require('express'),
	app = express(),
	path = require('path');

// send our index.html file to the user for the home page
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

// Create routes for main admin section
var adminRouter = express.Router();

adminRouter.use(function(req, res, next) {
	// log each request to the console
	console.log('route change', req.method, req.url);

	// continue doing what we were doing and go to the route
	next();
});

// Admin main page/dashboard
// (http://localhost:1337/admin)
adminRouter.get('/', function(req, res) {
	res.send('I am the dashboard');
});

// User page
// (http://localhost:1337/admin/users)
adminRouter.get('/users', function(req, res) {
	res.send('I show all the users!');
});

adminRouter.param('name', function(req, res, next, name) {
	console.log('doing name validations on: ' + name);
	req.name = name;
	next();
});

adminRouter.get('/users/:name', function(req, res) {
	res.send('Hello ' + req.name);
});

// Posts page
// (http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res) {
	res.send('I show all the posts!');
});

// Login routes
app.route('/login')
	.get(function(req, res) {
		res.send('this is the login form');
	})
	.post(function(req, res) {
		console.log('processing');
		res.send('processing the login form')
	})

// Apply the routes
app.use('/admin', adminRouter);

// start the server
app.listen(1337);
console.log('1337 is the magic port!');