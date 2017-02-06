const clm = require('./lib/clmtrackr.js')
const pModel = require('./lib/model_pca_20_svm.js')


class Actions {

  constructor (socket) {
    this.socket = socket.socket

    this.vid = document.getElementById('videoel');
		this.overlay = document.getElementById('overlay');
		this.overlayCC = this.overlay.getContext('2d');

    // this.canvas = document.getElementById('canvas')
    // this.width = 400
    // this.height = 300
    // this.canvasFace = document.getElementById('canvas-face')
    // this.context = this.canvasFace.getContext('2d')
    // this.img = new Image()
    // this.video = document.getElementById('video')

    // show loading notice
    // this.overlayCC.fillStyle = '#333'
    // this.overlayCC.fillText('Loading...', this.canvasFace.width / 2 - 30, this.canvasFace.height / 3)

    this.ctrack = new clm.Tracker({useWebGL: true})
		this.ctrack.init(pModel)

    this.socket.on('hrUpdate', this.hrUpdate.bind(this))
    this.socket.on('frame', this.loadImage.bind(this))
 }

  stream () {
    navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)
    navigator.getMedia(
      // constraints
      {
        video: true
        , audio: false
      },

      // success callback
      (mediaStream) => {
        this.vid.src = window.URL.createObjectURL(mediaStream)
        this.vid.play()
        this.ctrack.start(this.vid)
        setInterval(this.takePicture.bind(this)
        , 100)
      },
      // handle error
      function (error) {
        console.log(error)
      })
  }

  hrUpdate (hr) {
    console.log('Heart rate is: ' + hr)
  }



  takePicture () {
      this.overlayCC.clearRect(0, 0, 400, 300)
      let positions = this.ctrack.getCurrentPosition()
			if (positions) {
					this.ctrack.draw(this.overlay)
			}
      // window.requestAnimFrame(this.takePicture())      
    //   let context = this.canvas.getContext('2d')
    //   if (this.width && this.height) {
    //     this.canvas.width = this.width
    //     this.canvas.height = this.height
    //     context.drawImage(this.video, 0, 0, this.width, this.height)
    //     let jpgQuality = 0.6
    //     let theDataURL = this.canvas.toDataURL('image/jpeg', jpgQuality)
    //     this.socket.emit('stream', theDataURL)
    // }
  }

  loadImage (data) {
    // Reference: http://stackoverflow.com/questions/24107378/socket-io-began-to-support-binary-stream-from-1-0-is-there-a-complete-example-e/24124966#24124966
    let uint8Arr = new Uint8Array(data.buffer)
    let str = String.fromCharCode.apply(null, uint8Arr)
    let base64String = btoa(str)
    let context = this.context
    let canvasFaceWidth = this.canvasFace.width
    let canvasFaceHeight = this.canvasFace.height
    this.img.onload = function () {
      context.drawImage(this, 0, 0, canvasFaceWidth, canvasFaceHeight)
    }
    this.img.src = 'data:image/png;base64,' + base64String
  }

}
module.exports = Actions
