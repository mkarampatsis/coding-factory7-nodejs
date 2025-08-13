const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

// Function Expression
const server = http.createServer((req, res) => {
  if (req) {
    console.log("A request");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});