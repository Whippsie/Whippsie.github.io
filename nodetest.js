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

app.use(express.urlencoded({extended: true})); 

app.post('/call-java-app', function (req, res){
	var location = req.body.location
	console.log(location);
	var nameConfigFile = req.body.nameConfigFile
	console.log(nameConfigFile);
	var data = child.executeJava(location,nameConfigFile);
	res.send(data);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

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