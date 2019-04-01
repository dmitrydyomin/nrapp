const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');

const resourceRouter = require('./services/resourceRouter');
const { dateReviver } = require('./services/api');
// const something = require('./controllers/something');

const app = express();
app.use(bodyParser.json({ reviver: dateReviver }));

// app.use('/api/something', resourceRouter(something));

module.exports = app;
