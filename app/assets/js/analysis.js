class PixelAnalysis {

  constructor(socket) {
    this.socket = socket.socket
  }

  processImage(imgData) {
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
}
module.exports = PixelAnalysis
