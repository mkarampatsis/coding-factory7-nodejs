import express from 'express';
import { greet } from './utils'
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/greetings', (req, res) => {
  const message = greet("World 2"); // Call the function
  res.send(message);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

// npm i --save-dev typescript
// npm i --save-dev @types/express
// npx tsc
// node dist/app.js

// NOTE: npx is a tool that allows you to run Node.js packages without installing them globally.

// tsc is the TypeScript compiler which will take our TypeScript code and compile it to 
// JavaScript. This command will result in a new file named example.js that we can run 
// using Node.js. Now when we know how to compile and run TypeScript code let's 
// see TypeScript bug-preventing capabilities in action!