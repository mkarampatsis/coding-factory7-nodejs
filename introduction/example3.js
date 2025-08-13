const fs = require('fs');
const http = require('http');
const os = require('os');

// Get the OS type of our machine
osType = os.type();

// Create a string of HTML content for a file we will create
htmlContent = `
  <!DOCTYPE html>
  <html>
    <h3>Hello, World! Your OS type is ${osType}</h3>
  </html>
`

// Create an index.html file with the htmlContent variable as the content.
// Since this is async, we will provide a callback as a third argument
// that will run after the file has been created. It is in this callback that
// we will read the file. For code clarity, we won't handle errors.

const server = http.createServer((req, res) => {
  // Your logs appear twice because the browser typically makes two requests when you visit http://localhost:3000/:

  // First request: The browser requests the main page (/).
  // Second request: Many browsers automatically send a favicon request (/favicon.ico), even if you haven't set one.
  // Αρχικά να το δούμε χωρίς το req.url === '/favicon.ico' για να δουν τα διπλά console.log
  if (req.url === '/favicon.ico') {
    res.writeHead(204, { 'Content-Type': 'image/x-icon' }); // No Content for favicon
    res.end();
    return;
  }

  console.log("Αρχικά δημιουργούμε το αρχείο index.html με περιέχομενα το htmlContent");
  fs.writeFile('./index1.html', htmlContent, err => {
    if (err) {
      console.log("Problem in writing file")
    } else {
      console.log("Στη συνέχεια διάβαζουμε το αρχείο index.html");
      fs.readFile('index.html', 'utf8', (err, content) => {
        if (err) {
          console.log(err)
        }
        console.log("Ορίζουμε headers σε αυτό που θα επιστρέψουμε πίσω");
        res.setHeader('Content-Type', 'text/html');
        // res.setHeader('Content-Type', 'application/json');
        res.end(content);
      });
    }
  })
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});