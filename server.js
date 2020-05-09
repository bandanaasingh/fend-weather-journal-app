// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//get route that returns projectData object in server code.
app.get('/all', function (req, res) {
    res.send(projectData)
});

//post route that adds incoming data to projectData.
app.post('/add', function (req, res) {

    newEntry = {
        temperature: req.body.temp,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
    projectData = newEntry;
    res.send(projectData);
    console.log(projectData)
});

