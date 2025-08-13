const mongoose = require("mongoose");
const app = require("./app");
const port = 3000

mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => { 
        console.log("Connection to MongoDB established");
        
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        });
    },
    err => { console.log('Failed to connect to MongoDB', err) }
  );

