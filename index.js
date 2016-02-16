var express = require('express');
var bodyParser = require('body-parser')
var CubeMaze = require('maze-cube');
var uuid = require('node-uuid');
var app = express();

app.use(bodyParser.json());
app.use(express.static('dist'))
app.get('/', function (req, res) {
      res.sendFile(__dirname + '/index.html');
});

app.post('/create', function (req, res) {
    var body = req.body;
    var config = body && (body.config.y && body.config.x && body.config.z) ? body.config : {x:10, y:10, z: 5};
    var name = config.name;
    var maze = new CubeMaze(config);
    maze.id = uuid.v4();
    maze.name= name;

    res.send(maze);
});

var server = app.listen(3000, function () {
      var host = server.address().address;
        var port = server.address().port;

          console.log('Maze cube is listening at http://%s:%s', host, port);
});
