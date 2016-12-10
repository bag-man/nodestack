class Socket {

  constructor (io) {
    this.socket = io.connect('/')
    this.room = null

    this.socket.on('connect', () => {
      this.room = this.socket.io.engine.id

      if (window.location.hash) {
        this.room = window.location.hash.substring(1)
      } else {
        window.location.hash = this.room
      }

      this.socket.emit('join', this.room)
    })
  }

}

module.exports = Socket
