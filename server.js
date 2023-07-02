// Get dependencies

var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const Document = require("./server/models/document");
// import the routing file to handle the default (index) route
var index = require('./server/routes/app');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... 

const messageRoutes = require('./server/routes/message');
const contactRoutes = require('./server/routes/contacts')
const documentsRoutes = require('./server/routes/documents')

var app = express(); // create an instance of express
/* 

CIT 470 - Computer Security II

 https://www.byui.edu/computer-information-technology/courses
 */

// establish a connection to the mongo database
mongoose
  .set('strictQuery', false)
  // .connect("mongodb://127.0.0.1:27017/cms", { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
  .connect("mongodb+srv://josuebcenturion:mean-stack-db@mean-stack-db.y7ma5x6.mongodb.net/cms?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(collections);
    });
  })
  .catch((err) => console.log("Connection failed: " + err));


// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'

  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});



// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/cms')));

// Tell express to map the default route ('/') to the index route
app.use('/',index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use("/api/messages", messageRoutes);
app.use("/api/documents", documentsRoutes);

app.use("/api/contacts", contactRoutes);


// Tell express to map all other non-defined routes back to the index page
/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
}); */

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log('API running on localhost: ' + port)
});
