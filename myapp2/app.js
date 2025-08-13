const express = require('express');
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
// The express.urlencoded() middleware in ExpressJS is used to handle form submissions 
// sent in application/x-www-form-urlencoded format. It encodes form data as key-value pairs, converting special characters like spaces into %20 or +
// extended: true : Allows parsing of nested objects and arrays using the qs library.
app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use('/', express.static('files'));

// The app.use() function in Express.js adds middleware to the application’s request-processing 
// pipeline. It applies the specified middleware to all incoming requests or to specific routes,
//  allowing you to modify request/response objects, perform operations, or handle errors 
// throughout the application.

const logger = (req, res, next) => {
	
	let url = req.url;
	console.log("Logger: ", req.body);
	let time = new Date();
	console.log('Received request for ' + url + ' at' + time);
	
	next();
};

app.post('/user', (req, res) => {
	console.log(req.body);
	
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let email = req.body.email;
	let sex = req.body.sex;

  // res.send("Hello>>", req.body);
  // res.send(req.body);
	res.send('Name: ' + firstname + ' Surname: ' + lastname + ' Email: ' + email + ' Sex:' + sex);
	console.log(JSON.stringify(req.headers));
  	console.log("Content-Type>>",res.get('Content-type'));
});

app.post('/userForm', logger, (req, res) => {
	console.log("userForm: ", req.body);
	
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let email = req.body.email;
	let sex = req.body.sex;
	
	res.send('Name: ' + firstname + ' Surname: ' + lastname + ' Email: ' + email + ' Sex:' + sex);
});

app.use('/user1', (req, res) =>{
	console.log("user 1");
	res.send("User 1");
});

app.use('/user2', (req, res) =>{
	console.log("user 2");
	res.send("User 2");
});

app.use('/user2/hello', (req, res) =>{
	console.log("user 2 hello");
	res.send("User 2 hello");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})