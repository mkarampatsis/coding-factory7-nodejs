const fs = require('fs');
const http = require('http');
const os = require('os');

// Get the OS type of our machine
osType = os.type();

// Create a string of HTML content for a file we will create
htmlContent = `
  <!DOCTYPE html>
  <html>
    <h3>Hello, World! Your OS type is ${osType}, new Index File</h3>
  </html>
`

const server = http.createServer((req, res) => {
  fs.writeFileSync('./index2.html', htmlContent);
  let readFile = fs.readFileSync('index2.html', 'utf8');
  if (readFile) {
    res.setHeader('Content-Type', 'text/html');
    res.end(readFile);
  }
});

server.listen(3000, () => {
  console.log('Listening on port 3000!');
});