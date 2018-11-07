const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const feedbackModel = require("./models/feedback.js");
const dbwebb = require("./models/dbwebb.js");

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

const port = 8588;

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

// Base route with api-documentation
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/documentation.html')));



app.get(
    "/feedback/:course/:kmom",
    (req, res) => feedbackModel.getFeedback(req, res)
);



app.get(
    "/inspect", ///:course/:kmom/:akronym",
    (req, res) => dbwebb.inspect(req, res)
);



const server = app.listen(port, () => console.log('Order api listening on port ' + port));

process.title = "franklin";

module.exports = server;
