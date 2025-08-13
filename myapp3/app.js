const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.get('/create', (req, res) => {
  console.log("Req /create" );
  res.render('form', {});
});

app.post('/user', (req, res) => {
  console.log("Req /user" );
  
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let sex = req.body.sex;

  res.render('user', 
  {
    name:firstname, 
    surname:lastname, 
    mail:email, 
    sex:sex
  });
});


app.get('/users', (req, res) => {
  console.log("Req /users" );
  
  const users = [
    {
      "name":"name1", 
      "surname":"surname1", 
      "mail":"mail1", 
      "sex":"sex1"
    },
    {
      "name":"name2", 
      "surname":"surname2",
      "mail":"mail2", 
      "sex":"sex2"
    }
  ]

  res.render('users', {users});

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})