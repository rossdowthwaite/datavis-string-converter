class NameConverter {

  constructor() {
    this.nameData = {
      name: '',
      stripped: '',
      length: 0,
      uniqueChars: 0,
      numberOfVowels: 0,
      numberOfConsts: 0,
      letters: [],
      totalAlphaScore: 0,
      totalSpreadScore: 0,
      scrabbleScore: 0,
      total: 0
    }

    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
  }

  convert(name) {
    this.nameData.total = 0;
    this.setName(name);
    this.setNameLength();
    this.calcUniqueChars();
    this.setLetterData();
    this.countVowels(this.nameData.stripped);
    this.countConsts(this.nameData.stripped);
    this.calculateSpreadScore()

    return this.nameData
  }

  setName (name) {
    this.nameData.name = name
    this.nameData.stripped = name.replace(/\s+/g, '').toLowerCase();
  }

  setNameLength() {
    this.nameData.length = this.nameData.stripped.length
    this.nameData.total += this.nameData.length
  }

  calcUniqueChars() {
    this.nameData.uniqueChars = new Set( this.nameData.stripped.split('') ).size
    this.nameData.total += this.nameData.uniqueChars
  }

  countVowels(str) {
    let vowels = str.match(/[aeiou]/gi);
    this.nameData.numberOfVowels =  vowels === null ? 0 : vowels.length;
    return vowels
  }

  countConsts(str) {
    let consts = str.match(/[^aeiou]/gi);
    this.nameData.numberOfConsts =  consts === null ? 0 : consts.length;
    return consts
  }

  setLetterData() {
    this.nameData.letters = [];
    this.nameData.totalAlphaScore = 0

    const names = this.nameData.name.split(' ')

    for(let name of names) {
      for (var letter = 0; letter < name.length; letter++) {
        let l = name[letter].toLowerCase()
        let index = this.getAlphabetIndex(l)
        this.nameData.totalAlphaScore += index;

        this.nameData.letters.push({
          letter: l,
          category: this.getLetterCategory(l),
          alphaIndex: index,
          isFirst: letter === 0 ? true : false
        })
      }
    }

    this.nameData.total += this.nameData.totalAlphaScore
  }

  calculateSpreadScore(){
    this.nameData.totalSpreadScore = 0;
    this.nameData.letters.map( (letter, index) => {
      letter.spreadScore = index < this.nameData.letters.length - 1
        ? letter.alphaIndex - this.nameData.letters[index+1].alphaIndex
        : 0

      this.nameData.totalSpreadScore +=  Math.abs(letter.spreadScore)
    })

    this.nameData.total += this.nameData.totalSpreadScore
  }

  getAlphabetIndex(letter) {
    for (var i = 0; i < this.alphabet.length; i++) {
      if( this.alphabet.charAt(i) === letter ) {
        return i
      }
    }
  }

  getLetterCategory(letter) {
    return this.countConsts(letter) !== null ? 'const' : 'vowel'
  }

  setScrabbleScore(score) {
    this.nameData.scrabbleScore = score
    this.nameData.total += this.nameData.scrabbleScore
  }

}

module.exports = NameConverter
