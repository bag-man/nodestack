const Socket = require('socket.io')
  , cv = require('opencv')
  , async = require('async')

module.exports = (server) => {
  const io = Socket.listen(server)
  const ROOM_SIZE = 1

  io.sockets.on('connection', (socket) => {

    console.log(socket.id + ': client connected')

    socket.on('error', console.log)

    socket.on('join', function (room) {
      if (io.sockets.adapter.rooms[room] && io.sockets.adapter.rooms[room].length < ROOM_SIZE) {
        socket.join(room)
        socket.room = room
        io.sockets.in(room).emit('joined', socket.id + ' has joined')
      } else {
        socket.emit('joined', 'Room full :(')
      }
    })

    socket.on('disconnect', () => {
      io.sockets.in(socket.id).emit('left', socket.id + ' has left')
      console.log(socket.id + ': client disconnected')
    })

    socket.on('stream', (img) => {
      // do stuff
      io.sockets.in(socket.id).emit('hrUpdate', 90)
      console.log('hr sent to ' + socket.id)

      let output = img.replace(/^data:image\/(png|jpeg);base64,/, '')
      let buffer = new Buffer(output, 'base64')

      async.auto({
        readFromSocket: function (callback) {
          readFromSocket(buffer, callback)
        }
        , face: ['readFromSocket', function (results, callback) {
          detect(cv.FACE_CASCADE, callback, results)
        }]
        , eyes: ['readFromSocket', function (results, callback) {
          detect('./node_modules/opencv/data/haarcascade_mcs_eyepair_small.xml', callback, results)
        }]
      }, function (err, results) {
        emitFrame(err, results)
      })
    })

    function readFromSocket (buffer, callback) {
      cv.readImage(buffer, function (err, mat) {
        callback(err, mat)
      })
    }

    function detect (haarfile, callback, results) {
      var im = results['readFromSocket']
      im.detectObject(haarfile, {}, function (err, faces) {
        if (err) callback(err)

        for (var i = 0; i < faces.length; i++) {
          let face = faces[i]
          im.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2)
        }
        callback(null, im)
      })
    }

    function emitFrame (err, results) {
      if (err) {

      } else {
        var im = results['eyes']
        io.sockets.in(socket.id).emit('frame', {
          buffer: im.toBuffer()
        })
      }
    }

  })
}
