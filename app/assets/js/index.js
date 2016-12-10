const Socket = require('./socket')
const Action = require('./actions')

let socket = new Socket(window.io)
  , action = new Action(socket)

$('.echo').on('click', () => {
  action.echo()
})
