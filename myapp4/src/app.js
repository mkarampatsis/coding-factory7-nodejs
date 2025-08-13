"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var utils_1 = require("./utils");
var app = (0, express_1.default)();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/greetings', function (req, res) {
    var message = (0, utils_1.greet)("World"); // Call the function
    res.send(message);
});
app.listen(port, function () {
    return console.log("Express is listening at http://localhost:".concat(port));
});
// npx tsc example.ts
