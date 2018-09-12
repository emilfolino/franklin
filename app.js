const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const feedback = require("./feedback.json");

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



app.get("/feedback/:course/:kmom", (req, res) => {
    if (feedback[req.params.course]) {
        if (feedback[req.params.course][req.params.kmom]) {
            return res.json({
                data: feedback[req.params.course][req.params.kmom]
            });
        } else {
            return res.status(500).json({
                errors: {
                    status: 500,
                    detail: "Kmom was not found"
                }
            });
        }
    } else {
        return res.status(500).json({
            errors: {
                status: 500,
                detail: "Course was not found"
            }
        });
    }


});



const server = app.listen(port, () => console.log('Order api listening on port ' + port));

module.exports = server;
