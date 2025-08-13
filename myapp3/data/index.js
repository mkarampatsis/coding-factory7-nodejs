const users= require('./users.json')

module.exports = () => ({
  users: users
});


// json-server --id _id --port 8000 --watch ./src/assets/data/index.js