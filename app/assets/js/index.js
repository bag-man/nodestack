import Socket from './socket'
import Action from './actions'

let socket = new Socket(window.io)
  , action = new Action(socket)

$('.echo').on('click', () => {
  action.echo()
})
