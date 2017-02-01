class Socket {

  constructor (io) {
    this.socket = io.connect('/')
    this.room = null

    this.socket.on('connect', () => {
      this.room = this.socket.io.engine.id
      this.socket.emit('join', this.room)
    })

    this.socket.on('joined', () => {
      console.log('connected to server')
    })
  }

}

module.exports = Socket
