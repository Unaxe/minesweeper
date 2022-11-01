var Game = /** @class */ (function () {
    function Game(height, width, minesNumb) {
        this.height = height;
        this.width = width;
        this.minesNumb = minesNumb;
        this.isIntiate = false;
        this.board = [];
        this.maskBoard = [];
        for (var i = 0; i < this.height; i++) {
            this.board.push([]);
            this.maskBoard.push([]);
            for (var j = 0; j < this.width; j++) {
                this.board[i].push("");
                this.maskBoard[i].push("");
            }
        }
    }
    Game.prototype.initiate = function (x, y) {
        var _this = this;
        this.isIntiate = true;
        var i = this.minesNumb;
        while (i > 0) {
            // x and y are the coordinates of the first click
            var xMine = Math.floor(Math.random() * this.width);
            var yMine = Math.floor(Math.random() * this.height);
            if (xMine !== x && yMine !== y) {
                if (this.board[xMine][yMine] !== "X") {
                    this.board[xMine][yMine] = "X";
                    i--;
                    console.log("Mine placed at " + xMine + " " + yMine, i);
                }
            }
        }
        console.log(this.board);
        var checkMines = function (x, y) {
            var mines = 0;
            if (_this.board[x][y] === "X") {
                return "X";
            }
            if (x > 0 && y > 0 && _this.board[x - 1][y - 1] === "X") {
                mines++;
            }
            if (x > 0 && _this.board[x - 1][y] === "X") {
                mines++;
            }
            if (x > 0 && y < _this.height - 1 && _this.board[x - 1][y + 1] === "X") {
                mines++;
            }
            if (y > 0 && _this.board[x][y - 1] === "X") {
                mines++;
            }
            if (y < _this.height - 1 && _this.board[x][y + 1] === "X") {
                mines++;
            }
            if (x < _this.width - 1 && y > 0 && _this.board[x + 1][y - 1] === "X") {
                mines++;
            }
            if (x < _this.width - 1 && _this.board[x + 1][y] === "X") {
                mines++;
            }
            if (x < _this.width - 1 &&
                y < _this.height - 1 &&
                _this.board[x + 1][y + 1] === "X") {
                mines++;
            }
            return mines;
        };
        // check all the adjacent cells and update the number of mines
        for (var i_1 = 0; i_1 < this.height; i_1++) {
            for (var j = 0; j < this.width; j++) {
                if (this.board[i_1][j] !== "X") {
                    this.board[i_1][j] = String(checkMines(i_1, j));
                }
            }
        }
    };
    Game.prototype.play = function (x, y, typeOfAction) {
        if (!this.isIntiate) {
            this.initiate(x, y);
            console.log("Game initiated");
        }
        if (typeOfAction === "place") {
            if (this.board[x][y] === "X") {
                // Game over
                this.maskBoard = this.board;
                alert("Game over");
            }
            else {
                // Check for the number of mines around
                var minesAround = this.board[x][y];
                // If 0, check the adjacent cells
                if (minesAround === "0") {
                    this.maskBoard[x][y] = "0";
                    // Check the adjacent cells
                    if (x > 0 && y > 0 && this.maskBoard[x - 1][y] === "") {
                        this.play(x - 1, y - 1, "place");
                    }
                    if (x > 0 && this.maskBoard[x - 1][y] === "") {
                        this.play(x - 1, y, "place");
                    }
                    if (x > 0 &&
                        y < this.height - 1 &&
                        this.maskBoard[x - 1][y + 1] === "") {
                        this.play(x - 1, y + 1, "place");
                    }
                    if (y > 0 && this.maskBoard[x][y - 1] === "") {
                        this.play(x, y - 1, "place");
                    }
                    if (y < this.height - 1 && this.maskBoard[x][y + 1] === "") {
                        this.play(x, y + 1, "place");
                    }
                    if (x < this.width - 1 &&
                        y > 0 &&
                        this.maskBoard[x + 1][y - 1] === "") {
                        this.play(x + 1, y - 1, "place");
                    }
                    if (x < this.width - 1 && this.maskBoard[x + 1][y] === "") {
                        this.play(x + 1, y, "place");
                    }
                    if (x < this.width - 1 &&
                        y < this.height - 1 &&
                        this.maskBoard[x + 1][y + 1] === "") {
                        this.play(x + 1, y + 1, "place");
                    }
                }
                else {
                    // Update the maskBoard
                    this.maskBoard[x][y] = minesAround;
                }
                // Check if the game is over
                var isOver = true;
                for (var i = 0; i < this.height; i++) {
                    for (var j = 0; j < this.width; j++) {
                        if (this.board[i][j] !== "X" && this.maskBoard[i][j] === "") {
                            isOver = false;
                        }
                    }
                    if (!isOver) {
                        break;
                    }
                }
                if (isOver) {
                    this.maskBoard = this.board;
                    alert("You won");
                }
            }
        }
        if (typeOfAction === "flag") {
            // Flag the cell if the mask is empty
            if (this.maskBoard[x][y] === "") {
                this.maskBoard[x][y] = "F";
            }
            else if (this.maskBoard[x][y] === "F") {
                this.maskBoard[x][y] = "";
            }
        }
    };
    return Game;
}());
export { Game };
