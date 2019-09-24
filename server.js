var path = require('path');
var express = require('express');
var app = express();
var openBrowsers = require('open-browsers');

// log
// const log4js = require('log4js');
// log4js.addLayout('json', config => function (logEvent) {
//   logEvent.data = logEvent.data[0];
//   return JSON.stringify(logEvent) + config.separator;
// });
// const logConf = require('./conf/log.conf');
// log4js.configure(logConf);
// const logger = log4js.getLogger('chatLog');


// Development mode hot update
if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);
  // use in develope mode
  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));

  app.get('/', function(req, res) {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result) {
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
} else {
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '/')));

// online user
var onlineUsers = {};
// Number of online users
var onlineCount = 0;

io.on('connection', function(socket) {
  // Listening to the client's login
  socket.on('login', function(obj) {
    // User id is set to socketid
    socket.id = obj.uid;

   
    // If there is no such user, Then the number of people online +1
    //Add it to online users

    if (!onlineUsers.hasOwnProperty(obj.uid)) {
      onlineUsers[obj.uid] = obj.username;
      onlineCount++;
    }

    /*
    Send a login event to the client, sending online users, 
    online users, and login users
    */
    io.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
    // logger.info({ socketId: socket.id, ip: socket.request.connection.remoteAddress, user: obj.username, event: 'in', message: obj.username + ' Joined group chat'});
    console.log(obj.username + ' Joined group chat');
  });

  // Listen for client disconnects

  socket.on('disconnect', function() {
    // If there is this user
    if (onlineUsers.hasOwnProperty(socket.id)) {
      var obj = { uid: socket.id, username: onlineUsers[socket.id] };


      // Delete this user, the number of online users -1

      delete onlineUsers[socket.id];
      onlineCount--;

      // Send a logout event to the client,
      /// sending online users, online users, and logout users

      io.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
      logger.info({ socketId: socket.id, ip: socket.request.connection.remoteAddress, user: obj.username, event: 'out', message: obj.username + ' Exited the group chat'});
      console.log(obj.username + ' Exited the group chat');
    }
  });

  // Listen for information sent by the client

  socket.on('message', function(obj) {
    io.emit('message', obj);
    logger.info({ socketId: socket.id, ip: socket.request.connection.remoteAddress, user: obj.username, event: 'chat', message: obj.username + ' Saying:' + obj.message});
    console.log(obj.username + ' Saying:' + obj.message);
  });
});

server.listen(3300, function(err) {
  if (process.env.NODE_ENV !== 'production') {
    openBrowsers('http://localhost:3300');
  }
  console.log('Listening at *:3300');
});
