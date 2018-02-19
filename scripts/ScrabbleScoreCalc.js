class ScrabbleScoreCalculator {
  constructor() {
    this.lookupTable = this.createLookupTable()
  }

  createLookupTable() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    let scores = '1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10'.split(',')
    let table = {};

    for (var i = 0; i < alphabet.length; i++) {
      table[alphabet[i]] = scores[i]
    }
    return table
  }

  calculateWord( word ) {
    let score = 0;
    for (let l of word) {
      score += this.lookupTable[l]*1
    }
    return score
  }
}

module.exports = ScrabbleScoreCalculator
