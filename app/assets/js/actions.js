class Actions {

  constructor (socket) {
    this.socket = socket.socket
    this.socket.on('hrUpdate', this.hrUpdate.bind(this))
  }

  send () {
    let img = 'test'
    this.socket.emit('send', img)
  }

  hrUpdate (hr) {
    console.log('Heart rate is: ' + hr)
  }

}

module.exports = Actions
