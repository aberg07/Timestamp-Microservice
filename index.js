// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get('/api/:date', (req, res) => {
  //Regex expression to test if input is a date string
  if (/^[0-9]{4,}-[0-1][0-9]-[0-3][0-9]$/.test(req.params['date']))
  {
    let utcDate = new Date(req.params['date']).toUTCString();
    let unixDate = new Date(req.params['date']).getTime();
    if (utcDate === "Invalid Date") res.json({"error": "Invalid Date"})
    else res.json({"unix": unixDate, "utc": utcDate});
  }
  //Regex expression to test if input is a unix timestamp
  else if (/^-?[0-9]+$/.test(req.params['date']))
  {
    let unixDate = Number(req.params['date']);
    let convertedDate = new Date(unixDate);
    let utcDate = convertedDate.toUTCString();
    res.json({"unix": unixDate, "utc": utcDate})
  }
  //Return an error if input does not follow above formats
  else {
      res.json({"error": "Invalid Date"})
  }
})
//Return current time if no date string or unix timestamp is provided
app.get('/api/', (req, res) => {
  let utcDate = new Date().toUTCString();
  let unixDate = new Date().getTime();
  res.json({"unix": unixDate, "utc": utcDate});
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
