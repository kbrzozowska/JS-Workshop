/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(2);
var Coin = __webpack_require__(1);
module.exports = function Game() {

    this.board = document.querySelector("#board").getElementsByTagName('div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    var self = this;
    var interval = null;
    this.index = function(x, y) {
        return x + (y * 10);
    }
    this.hideVisibleFurry = function() {
        document.querySelector(".furry").classList.remove('furry');
    }
    this.showFurry = function() {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }
    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }
    this.keyboard = function() {
        document.addEventListener('keydown', function(event) {
            self.turnFurry(event);
        });

    }

    this.moveFurry = function() {
        self.hideVisibleFurry();

        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;

        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;

        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;

        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;

        }
        this.checkCoinCollision();
        this.gameOver();

        // console.log(self.furry.direction, self.furry.x, self.furry.y)
    }
    this.turnFurry = function(event) {
        if (event.which == "37") {
            self.furry.direction = "left";

        } else if (event.which == "39") {
            self.furry.direction = "right";

        } else if (event.which == "38") {
            self.furry.direction = "up";

        } else if (event.which == "40") {
            self.furry.direction = "down";
        }

    }
    this.checkCoinCollision = function() {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            self.score = self.score + 1;

            document.querySelector("#score").children[0].innerHTML = "SCORE: " + self.score;

            document.querySelector(".coin").classList.remove('coin');

            this.coin = new Coin();

            this.showCoin();
            // console.log("boom");
        }
    }
    this.gameOver = function() {
        if (this.furry.y < 0 || this.furry.y > 9 || this.furry.x < 0 || this.furry.x > 9) {
            // console.log(interval);
            clearInterval(interval);

            document.querySelector(".coin").classList.remove('coin');
            document.querySelector("#score").children[0].innerHTML = "SCORE: " + self.score;

            newGame = new Game();

            newGame.showCoin();
            newGame.showFurry();
            newGame.startGame();

        } else {
            self.showFurry();

        }

    }

    this.startGame = function() {
        // console.log(document.querySelector("#score").children[0].innerHTML);
        // console.log(self.score);

        self.keyboard();
        interval = setInterval(function() {

            self.moveFurry();

        }, 250);
    }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// function Furry() {
//     this.x = 0;
//     this.y = 0;
//     this.direction = "right";
// }
//
// function Coin() {
//     this.x = Math.floor(Math.random() * 10);
//     this.y = Math.floor(Math.random() * 10);
// }
//
// function Game() {
//     this.board = document.querySelector("#board").getElementsByTagName('div');
//     this.furry = new Furry();
//     this.coin = new Coin();
//     this.score = 0;
//     var self = this;
//     var interval = null;
//     this.index = function(x, y) {
//         return x + (y * 10);
//     }
//     this.hideVisibleFurry = function() {
//         document.querySelector(".furry").classList.remove('furry');
//     }
//     this.showFurry = function() {
//         this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
//     }
//     this.showCoin = function() {
//         this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
//     }
//     this.keyboard = function() {
//         document.addEventListener('keydown', function(event) {
//             self.turnFurry(event);
//         });
//
//     }
//
//     this.moveFurry = function() {
//         self.hideVisibleFurry();
//
//         if (this.furry.direction === "right") {
//             this.furry.x = this.furry.x + 1;
//
//         } else if (this.furry.direction === "left") {
//             this.furry.x = this.furry.x - 1;
//
//         } else if (this.furry.direction === "up") {
//             this.furry.y = this.furry.y - 1;
//
//         } else if (this.furry.direction === "down") {
//             this.furry.y = this.furry.y + 1;
//
//         }
//         this.checkCoinCollision();
//         this.gameOver();
//
//         // console.log(self.furry.direction, self.furry.x, self.furry.y)
//     }
//     this.turnFurry = function(event) {
//         if (event.which == "37") {
//             self.furry.direction = "left";
//
//         } else if (event.which == "39") {
//             self.furry.direction = "right";
//
//         } else if (event.which == "38") {
//             self.furry.direction = "up";
//
//         } else if (event.which == "40") {
//             self.furry.direction = "down";
//         }
//
//     }
//     this.checkCoinCollision = function() {
//         if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
//             self.score = self.score + 1;
//
//             document.querySelector("#score").children[0].innerHTML = "SCORE: " + self.score;
//
//             document.querySelector(".coin").classList.remove('coin');
//
//             this.coin = new Coin();
//
//             this.showCoin();
//             // console.log("boom");
//         }
//     }
//     this.gameOver = function() {
//         if (this.furry.y < 0 || this.furry.y > 9 || this.furry.x < 0 || this.furry.x > 9) {
//             // console.log(interval);
//             clearInterval(interval);
//
//             document.querySelector(".coin").classList.remove('coin');
//             document.querySelector("#score").children[0].innerHTML = "SCORE: " + self.score;
//
//             newGame = new Game();
//
//             newGame.showCoin();
//             newGame.showFurry();
//             newGame.startGame();
//
//         } else {
//             self.showFurry();
//
//         }
//
//     }
//
//     this.startGame = function() {
//         // console.log(document.querySelector("#score").children[0].innerHTML);
//         // console.log(self.score);
//
//         self.keyboard();
//         interval = setInterval(function() {
//
//             self.moveFurry();
//
//         }, 250);
//     }
// }

var Game = __webpack_require__(0);

//tutaj tworze obiekt gry, korzystam z konstruktora Game
var newGame = new Game();

//tutaj wywołuje metode na nowym obiekcie

newGame.showCoin();
newGame.showFurry();
newGame.startGame();


/***/ })
/******/ ]);