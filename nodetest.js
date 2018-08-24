const express = require('express')
var child = require('./mymodule.js');
const app = express()

app.use(express.static(__dirname + '/public'))

/*app.get('/*', (req, res) => {
  res.redirect('index.html');
})*/

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('/call-java-app', function (req, res){
	var data = child.executeJava();
	res.send(data);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
/*
http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });

}).listen(8080);*/


/*
  fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
  */