// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
// Dependencies
const bodyParser = require('body-parser');
/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
// Here we use the 'use' method to 
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// GET Route server Side
app.get('/get', function (req, res) {
  res.send(projectData);
})
// POST Route
app.post('/post', function (req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
})

// Setup Server 
const port = 3000;
const server = app.listen(port, listening);
function listening() {
  console.log(`server: http://localhost:${port}`);
}
