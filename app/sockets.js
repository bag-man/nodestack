const Socket = require('socket.io')

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

    socket.on('send', (img) => {
      console.log(img)
      // do stuff
      io.sockets.in(socket.id).emit('hrUpdate', 90)
      console.log('hr sent to ' + socket.id)
    })
  })
}
