const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
	console.log('About page');
	res.send('This is the about page');
});

app.get('/help', (req, res) => {
	console.log('Help page');
	res.send('This is the Help page');
});

app.get('/user', (req, res) => {
	// ?name=Bob&surname=Dylan&age=81
	let query = req.query;
	console.log("Query: ",query);
	
	let name = query.name;
	let surname = query.surname;
	let age = query.age;
	
	let length = Object.keys(query).length;
	console.log("Lenght: ", length);
	
	res.send('Name: ' + name + ' Surname: ' + surname + ' Age: ' + age);
});

app.get('/user/:name/:surname/:age', (req, res) => {
	let params = req.params;
	console.log("Params: ", params);
	
	let name = params.name;
	let surname = params.surname;
	let age = params.age;
	
	let length = Object.keys(params).length;
	console.log("Lenght: ", length);
	
	res.send('Name: ' + name + ' Surname: ' + surname + ' Age: ' + age);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
