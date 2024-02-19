// create web server
// create a server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var comments = [];

var server = http.createServer(function(req, res) {
  // parse the url
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  var query = urlObj.query;

  // if the request is for the index.html
  if (pathname === '/') {
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        res.end('read file error');
        return;
      }
      res.end(data);
    });
  }
  // if the request is for the comments
  else if (pathname === '/comments') {
    var str = JSON.stringify(comments);
    res.end(str);
  }
  // if the request is for the post comment
  else if (pathname === '/post') {
    var str = '';
    req.on('data', function(chunk) {
      str += chunk;
    });
    req.on('end', function() {
      var obj = querystring.parse(str);
      comments.push(obj);
      res.end('success');
    });
  }
  // if the request is for the favicon.ico
  else if (pathname === '/favicon.ico') {
    fs.readFile('./favicon.ico', function(err, data) {
      if (err) {
        res.end('read file error');
        return;
      }
      res.end(data);
    });
  }
  // if the request is for the static file
  else {
    fs.readFile('.' + pathname, function(err, data) {
      if (err) {
        res.end('read file error');
        return;
      }
      res.end(data);
    });
  }
});

server.listen(3000, function() {
  console.log('server is listening on port 3000');
});
// Path: index.html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Comments</title>
</head>
<body>
  <ul id="comments"></ul>
  <form id="commentForm">
    <input type="text" name="name" placeholder="Your Name">
    <input type="text" name="content" placeholder="Your Comment">
    <button type="submit">Submit</button>
  </form>
  <