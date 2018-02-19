class ConvertNameData {
  constructor(data) {
    this.canvas = document.querySelector('#canvas')
    this.context = this.canvas.getContext('2d')
    this.nameData = [],
    this.rgbValues = []
    this.canvasData = {
      colors: [],
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
    }

    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  initData(data) {
    this.nameData = data;
    this.calcColors()
  }

  calcColors() {
    let rgbValues = [
      this.nameData.total,
      this.nameData.totalAlphaScore,
      this.nameData.scrabbleScore,
    ];
    this.canvasData.colors = [];

    while (this.canvasData.colors.length < 3) {
      this.canvasData.colors.push( 'hsl(' + (rgbValues[0] * 1.5) + ', 90%, 50% )' )
      rgbValues.shift()
    }
    this.updateCircle()
  }

  updateCircle() {

    this.context.fillStyle = "#4E4E4E";
    this.context.fillRect(0, 0, canvas.width, canvas.height);

    let points = []
    let side = 0;
    let size = 200;
    let noOfSides = this.nameData.numberOfConsts;

    this.context.beginPath();
    this.context.moveTo(this.canvasData.x + size * Math.cos(0), this.canvasData.y + size * Math.sin(0));

    for (side; side < noOfSides; side++) {
      this.context.lineTo(this.canvasData.x + size * Math.cos(side * 2 * Math.PI / noOfSides), this.canvasData.y + size * Math.sin(side * 2 * Math.PI / noOfSides));
    }

    let innerRadius = 5;
    let outerRadius = size;
    let gradient = this.context.createRadialGradient(this.canvasData.x, this.canvasData.y, innerRadius, this.canvasData.x, this.canvasData.y, outerRadius);

    gradient.addColorStop(0, this.canvasData.colors[0]);
    gradient.addColorStop(1, this.canvasData.colors[1]);

    this.context.fillStyle = gradient;
    this.context.fill();
    this.context.closePath();

    this.context.strokeStyle = "#FFF";
    this.context.lineWidth = this.nameData.scrabbleScore;
    this.context.stroke();

    this.context.restore();
  }
}

module.exports = ConvertNameData
