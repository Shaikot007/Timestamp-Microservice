require('dotenv').config();
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.get('/api/timestamp/:date_string?', function (req, res) {
  var value = req.params.date_string;
  // var valid = value.toString();
  var valid = Date.parse(value);

  // value is empty
  if (!value) {
    const date = new Date();
    const unixtime = date.getTime();
    const utctime = date.toUTCString();

    res.send({unix: unixtime, utc: utctime})
  }

  // value is number
  else if (isNaN(value) === false) {
    const date = new Date(parseInt(value));
    const unixtime = date.getTime();
    const utctime = date.toUTCString();

    res.send({unix: unixtime, utc: utctime})
  }

  // value is invalid
  else if (isNaN(valid) === true) {
    res.send({error : "Invalid Date"})
  }

  // value is not number
  else if (isNaN(value) === true) {
    const date = new Date(value);
    const unixtime = date.getTime();
    const utctime = date.toUTCString();

    res.send({unix: unixtime, utc: utctime})
  }
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
