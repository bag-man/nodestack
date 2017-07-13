import Socket from 'socket.io';

export default (server) => {
  const io = Socket.listen(server)
  const ROOM_SIZE = 2

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
      io.sockets.in(socket.room).emit('left', socket.id + ' has left')
      console.log(socket.id + ': client disconnected')
    })
  })
};
