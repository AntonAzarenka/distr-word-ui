const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/distribution-words-ui'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/distribution-words-ui/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5000);
// Heroku automagically gives us SSL
// Lets write some middleware to redirect
