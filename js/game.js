var Furry = require("./furry.js");
var Coin = require("./coin.js");
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
