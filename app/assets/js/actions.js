const clm = require('./lib/clmtrackr.js')
const pModel = require('./lib/model_pca_20_svm.js')

class Actions {

  constructor (socket) {
    this.socket = socket.socket

    this.video = document.getElementById('video')
    this.frameRate = 15
		this.overlay = document.getElementById('overlay')
		this.overlayContext = this.overlay.getContext('2d')
    this.width = 1024
    this.height = 768
    this.pixelResolution = 50

    // show loading notice
    // this.overlayCC.fillStyle = '#333'
    // this.overlayCC.fillText('Loading...', this.canvasFace.width / 2 - 30, this.canvasFace.height / 3)

    this.facetracker = new clm.Tracker({useWebGL: true})
		this.facetracker.init(pModel) // pModel is a model more to pick from on github

    // this.socket.on('hrUpdate', this.hrUpdate.bind(this))
    // this.socket.on('frame', this.loadImage.bind(this))
 }

  stream () {
    navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)
    navigator.getMedia(
      // constraints
      {
        audio: false
        , video: {
          width: { ideal: this.width }
          , height: { ideal: this.height }
        }
      },
      // success callback
      (mediaStream) => {
        this.video.src = window.URL.createObjectURL(mediaStream)
        this.video.play()
        this.facetracker.start(this.video)
        setInterval(this.takePicture.bind(this)
        , 1000 / this.frameRate)
      },
      // handle error
      function (error) {
        console.log(error)
      })
  }

  takePicture () {
      this.overlayContext.clearRect(0, 0, this.width, this.height)
      let positions = this.facetracker.getCurrentPosition()
			if (positions) {
          let box = this.pickBox(positions)
					this.facetracker.draw(this.overlay)

          this.overlayContext.strokeRect(box.l, box.t, box.r - box.l, box.b - box.t)
          let imgData = this.overlayContext.getImageData(box.l, box.t, this.pixelResolution, this.pixelResolution)

          this.processImage(imgData)
			}
  }

  processImage (imgData) {
    let red = []
        , green = []
        , blue = []
        , alpha = []

        for (let x = 0; x < this.pixelResolution; x++) {
          red[x] = imgData.data[0 + (4 * x)]
          green[x] = imgData.data[1 + (4 * x)]
          blue[x] = imgData.data[2 + (4 * x)]
          alpha[x] = imgData.data[3 + (4 * x)]
        }

  }

  pickBox (positions) {
        let r, b, t, l

        let r1 = positions[15][0]
        let l1 = positions[39][0]
        let t1 = positions[31][1] + 20
        let b1 = positions[38][1] + 20

        let r2 = positions[35][0]
        let l2 = positions[19][0]
        let t2 = positions[26][1] + 20
        let b2 = positions[36][1] + 20

        // pick larger box
        if ((r1 - l1) * (b1 - t1) > (r2 - l2) * (b2 - t2)) {
          r = parseInt(r1)
          l = parseInt(l1)
          t = parseInt(t1)
          b = parseInt(b1)
        } else {
          r = parseInt(r2)
          l = parseInt(l2)
          t = parseInt(t2)
          b = parseInt(b2)
        }
        return { r: r
               , l: l
               , t: t
               , b: b}
  }

  // hrUpdate (hr) {
  //   console.log('Heart rate is: ' + hr)
  // }

  // sendImage () {
    //   let context = this.canvas.getContext('2d')
    //   if (this.width && this.height) {
    //     this.canvas.width = this.width
    //     this.canvas.height = this.height
    //     context.drawImage(this.video, 0, 0, this.width, this.height)
    //     let jpgQuality = 0.6
    //     let theDataURL = this.canvas.toDataURL('image/jpeg', jpgQuality)
    //     this.socket.emit('stream', theDataURL)
    // }
  // }

  // loadImage (data) {
    // let uint8Arr = new Uint8Array(data.buffer)
    // let str = String.fromCharCode.apply(null, uint8Arr)
    // let base64String = btoa(str)
    // let context = this.context
    // let canvasFaceWidth = this.canvasFace.width
    // let canvasFaceHeight = this.canvasFace.height
    // this.img.onload = function () {
    //   context.drawImage(this, 0, 0, canvasFaceWidth, canvasFaceHeight)
    // }
    // this.img.src = 'data:image/png;base64,' + base64String
  // }

}
module.exports = Actions
