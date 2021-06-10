// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;

//Set up server and the callBack function
const server = app.listen(port, () =>
    console.log(`Your Server Is Running On Localhost: ${port}`));


//GET route that returns the projectData object
app.get('/GetProjectData', (request, response) => {
    response.send(projectData)
})

app.post('/PostProjectData', (request, response) => {
    projectData = {...request.body };
    response.end();
})