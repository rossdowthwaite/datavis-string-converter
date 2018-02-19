const NameConverter = require('./NameConverter.js');
const ScrabbleScoreCalculator = require('./ScrabbleScoreCalc.js');
const ConvertNameData = require('./ConvertNameData.js');

let nameConverter = new NameConverter()
let scrabbleScoreCalculator = new ScrabbleScoreCalculator()
let drawName = new ConvertNameData()

function convertName() {
  let name = document.getElementById("nameInput").value;

  let data = nameConverter.convert(name)
  nameConverter.setScrabbleScore( scrabbleScoreCalculator.calculateWord(data.stripped) )

  console.log(data)

  drawName.initData(data)
}

// Bind function to window cos webpack
window.convertName = convertName
