// Setup empty JS object to act as endpoint for all routes
// sooooory for bad english
projectData = {};

// lets start with adding port number. I choose 4040 because I like number 40.
const portNo = 4040;

// Require Express to run server and routes:
// Start up an instance of app:
// first let us add express and instance:

const express = require('express');
const app = express();

// lets add cors and body-Parser to our server
const cors = require('cors');
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance (using cors)
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server and add massage that indecta that it work.
app.listen(portNo, ()=>{
    console.log('Our server is working at port', portNo)
});

// lets add the get requst
app.get("/getReqData", (req1, res1) => {
    res1.send(projectData)
});
// lets add the post requst and in the same time make the projectData = requst body so we can take the data that we want
app.post("/postReqData", (req2, res2) => {
    projectData = { ...req2.body }
// to end the response
    res2.send()
});