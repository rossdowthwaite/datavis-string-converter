// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({16:[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NameConverter = function () {
  function NameConverter() {
    _classCallCheck(this, NameConverter);

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
    };

    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
  }

  _createClass(NameConverter, [{
    key: 'convert',
    value: function convert(name) {
      this.nameData.total = 0;
      this.setName(name);
      this.setNameLength();
      this.calcUniqueChars();
      this.setLetterData();
      this.countVowels(this.nameData.stripped);
      this.countConsts(this.nameData.stripped);
      this.calculateSpreadScore();

      return this.nameData;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      this.nameData.name = name;
      this.nameData.stripped = name.replace(/\s+/g, '').toLowerCase();
    }
  }, {
    key: 'setNameLength',
    value: function setNameLength() {
      this.nameData.length = this.nameData.stripped.length;
      this.nameData.total += this.nameData.length;
    }
  }, {
    key: 'calcUniqueChars',
    value: function calcUniqueChars() {
      this.nameData.uniqueChars = new Set(this.nameData.stripped.split('')).size;
      this.nameData.total += this.nameData.uniqueChars;
    }
  }, {
    key: 'countVowels',
    value: function countVowels(str) {
      var vowels = str.match(/[aeiou]/gi);
      this.nameData.numberOfVowels = vowels === null ? 0 : vowels.length;
      return vowels;
    }
  }, {
    key: 'countConsts',
    value: function countConsts(str) {
      var consts = str.match(/[^aeiou]/gi);
      this.nameData.numberOfConsts = consts === null ? 0 : consts.length;
      return consts;
    }
  }, {
    key: 'setLetterData',
    value: function setLetterData() {
      this.nameData.letters = [];
      this.nameData.totalAlphaScore = 0;

      var names = this.nameData.name.split(' ');

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;

          for (var letter = 0; letter < name.length; letter++) {
            var l = name[letter].toLowerCase();
            var index = this.getAlphabetIndex(l);
            this.nameData.totalAlphaScore += index;

            this.nameData.letters.push({
              letter: l,
              category: this.getLetterCategory(l),
              alphaIndex: index,
              isFirst: letter === 0 ? true : false
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.nameData.total += this.nameData.totalAlphaScore;
    }
  }, {
    key: 'calculateSpreadScore',
    value: function calculateSpreadScore() {
      var _this = this;

      this.nameData.totalSpreadScore = 0;
      this.nameData.letters.map(function (letter, index) {
        letter.spreadScore = index < _this.nameData.letters.length - 1 ? letter.alphaIndex - _this.nameData.letters[index + 1].alphaIndex : 0;

        _this.nameData.totalSpreadScore += Math.abs(letter.spreadScore);
      });

      this.nameData.total += this.nameData.totalSpreadScore;
    }
  }, {
    key: 'getAlphabetIndex',
    value: function getAlphabetIndex(letter) {
      for (var i = 0; i < this.alphabet.length; i++) {
        if (this.alphabet.charAt(i) === letter) {
          return i;
        }
      }
    }
  }, {
    key: 'getLetterCategory',
    value: function getLetterCategory(letter) {
      return this.countConsts(letter) !== null ? 'const' : 'vowel';
    }
  }, {
    key: 'setScrabbleScore',
    value: function setScrabbleScore(score) {
      this.nameData.scrabbleScore = score;
      this.nameData.total += this.nameData.scrabbleScore;
    }
  }]);

  return NameConverter;
}();

module.exports = NameConverter;
},{}],17:[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrabbleScoreCalculator = function () {
  function ScrabbleScoreCalculator() {
    _classCallCheck(this, ScrabbleScoreCalculator);

    this.lookupTable = this.createLookupTable();
  }

  _createClass(ScrabbleScoreCalculator, [{
    key: 'createLookupTable',
    value: function createLookupTable() {
      var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
      var scores = '1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10'.split(',');
      var table = {};

      for (var i = 0; i < alphabet.length; i++) {
        table[alphabet[i]] = scores[i];
      }
      return table;
    }
  }, {
    key: 'calculateWord',
    value: function calculateWord(word) {
      var score = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = word[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var l = _step.value;

          score += this.lookupTable[l] * 1;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return score;
    }
  }]);

  return ScrabbleScoreCalculator;
}();

module.exports = ScrabbleScoreCalculator;
},{}],18:[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConvertNameData = function () {
  function ConvertNameData(data) {
    _classCallCheck(this, ConvertNameData);

    this.canvas = document.querySelector('#canvas');
    this.context = this.canvas.getContext('2d');
    this.nameData = [], this.rgbValues = [];
    this.canvasData = {
      colors: [],
      x: window.innerWidth / 2,
      y: window.innerHeight / 3
    };

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _createClass(ConvertNameData, [{
    key: 'initData',
    value: function initData(data) {
      this.nameData = data;
      this.calcColors();
    }
  }, {
    key: 'calcColors',
    value: function calcColors() {
      var rgbValues = [this.nameData.total, this.nameData.totalAlphaScore, this.nameData.scrabbleScore];
      this.canvasData.colors = [];

      while (this.canvasData.colors.length < 3) {
        this.canvasData.colors.push('hsl(' + rgbValues[0] * 1.5 + ', 90%, 50% )');
        rgbValues.shift();
      }
      this.updateCircle();
    }
  }, {
    key: 'updateCircle',
    value: function updateCircle() {

      this.context.fillStyle = "#4E4E4E";
      this.context.fillRect(0, 0, canvas.width, canvas.height);

      var points = [];
      var side = 0;
      var size = 200;
      var noOfSides = this.nameData.numberOfConsts;

      this.context.beginPath();
      this.context.moveTo(this.canvasData.x + size * Math.cos(0), this.canvasData.y + size * Math.sin(0));

      for (side; side < noOfSides; side++) {
        this.context.lineTo(this.canvasData.x + size * Math.cos(side * 2 * Math.PI / noOfSides), this.canvasData.y + size * Math.sin(side * 2 * Math.PI / noOfSides));
      }

      var innerRadius = 5;
      var outerRadius = size;
      var gradient = this.context.createRadialGradient(this.canvasData.x, this.canvasData.y, innerRadius, this.canvasData.x, this.canvasData.y, outerRadius);

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
  }]);

  return ConvertNameData;
}();

module.exports = ConvertNameData;
},{}],15:[function(require,module,exports) {
var NameConverter = require('./NameConverter.js');
var ScrabbleScoreCalculator = require('./ScrabbleScoreCalc.js');
var ConvertNameData = require('./ConvertNameData.js');

var nameConverter = new NameConverter();
var scrabbleScoreCalculator = new ScrabbleScoreCalculator();
var drawName = new ConvertNameData();

function convertName() {
  var name = document.getElementById("nameInput").value;

  var data = nameConverter.convert(name);
  nameConverter.setScrabbleScore(scrabbleScoreCalculator.calculateWord(data.stripped));

  console.log(data);

  drawName.initData(data);
}

// Bind function to window cos webpack
window.convertName = convertName;
},{"./NameConverter.js":16,"./ScrabbleScoreCalc.js":17,"./ConvertNameData.js":18}],19:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '56777' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[19,15])
//# sourceMappingURL=/dist/500a6d648467532dcbe8b37df3defb9b.map