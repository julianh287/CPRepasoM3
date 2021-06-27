'use strict';

const express = require('express');
const app = express();
module.exports = app; // this line is only used to make testing easier.
const routes = require('./routes/index.js');

app.use(express.json());//reads body
app.use('/users', routes); //localhost:3000/users

// remember to plug in your router and any other middleware you may need here.

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
