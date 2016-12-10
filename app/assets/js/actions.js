class Actions {

  constructor (socket) {
    this.socket = socket.socket
  }

  echo () {
    console.log('Hello World')
  }

}

module.exports = Actions
