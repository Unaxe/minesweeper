export class Game {
  height: number;
  width: number;
  minesNumb: number;
  isIntiate: boolean;
  board: Array<Array<String>>;
  maskBoard: Array<Array<String>>;
  lifes: number;
  flagLeft: number;

  constructor(height: number, width: number, minesNumb: number) {
    this.height = height;
    this.width = width;
    this.minesNumb = minesNumb;
    this.isIntiate = false;
    this.lifes = 3;
    this.flagLeft = minesNumb;
    this.board = [];
    this.maskBoard = [];
    for (let i = 0; i < this.height; i++) {
      this.board.push([]);
      this.maskBoard.push([]);
      for (let j = 0; j < this.width; j++) {
        this.board[i].push("");
        this.maskBoard[i].push("");
      }
    }
  }

  initiate(x: number, y: number) {
    this.isIntiate = true;
    let i = this.minesNumb;
    while (i > 0) {
      // x and y are the coordinates of the first click
      let xMine = Math.floor(Math.random() * this.width);
      let yMine = Math.floor(Math.random() * this.height);
      if (
        // Check if the mine is not one of the adjacent cells
        (xMine !== x - 1 || yMine !== y - 1) &&
        (xMine !== x - 1 || yMine !== y) &&
        (xMine !== x - 1 || yMine !== y + 1) &&
        (xMine !== x || yMine !== y - 1) &&
        (xMine !== x || yMine !== y + 1) &&
        (xMine !== x + 1 || yMine !== y - 1) &&
        (xMine !== x + 1 || yMine !== y) &&
        (xMine !== x + 1 || yMine !== y + 1) &&
        (xMine !== x || yMine !== y) &&
        this.board[xMine][yMine] !== "X"
      ) {
        this.board[xMine][yMine] = "X";
        i--;
      }
    }

    console.log(this.board);

    const checkMines = (x, y) => {
      let mines = 0;
      if (this.board[x][y] === "X") {
        return "X";
      }
      if (x > 0 && y > 0 && this.board[x - 1][y - 1] === "X") {
        mines++;
      }
      if (x > 0 && this.board[x - 1][y] === "X") {
        mines++;
      }
      if (x > 0 && y < this.height - 1 && this.board[x - 1][y + 1] === "X") {
        mines++;
      }
      if (y > 0 && this.board[x][y - 1] === "X") {
        mines++;
      }
      if (y < this.height - 1 && this.board[x][y + 1] === "X") {
        mines++;
      }
      if (x < this.width - 1 && y > 0 && this.board[x + 1][y - 1] === "X") {
        mines++;
      }
      if (x < this.width - 1 && this.board[x + 1][y] === "X") {
        mines++;
      }
      if (
        x < this.width - 1 &&
        y < this.height - 1 &&
        this.board[x + 1][y + 1] === "X"
      ) {
        mines++;
      }
      return mines;
    };

    // check all the adjacent cells and update the number of mines
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.board[i][j] !== "X") {
          this.board[i][j] = String(checkMines(i, j));
        }
      }
    }
  }

  isOver() {
    let isOver = true;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.board[i][j] !== "X" && this.maskBoard[i][j] === "") {
          isOver = false;
        }
      }
      if (!isOver) {
        break;
      }
    }
    return isOver;
  }

  place(x: number, y: number) {
    if (this.board[x][y] === "X") {
      // Game over
      this.lifes--;
      if (this.lifes <= 0) {
        this.maskBoard = this.board;
        alert("Game over");
      } else {
        alert("You lost a life");
        this.maskBoard[x][y] = "X";
      }
    } else if (this.maskBoard[x][y] === "F" || this.maskBoard[x][y] === "X") {
    } else {
      // Check for the number of mines around
      const minesAround = this.board[x][y];
      // If 0, check the adjacent cells
      if (minesAround === "0") {
        this.maskBoard[x][y] = "0";
        // Check the adjacent cells
        if (x > 0 && y > 0 && this.maskBoard[x - 1][y - 1] === "") {
          this.place(x - 1, y - 1);
        }
        if (x > 0 && y > 0 && this.maskBoard[x - 1][y] === "") {
          this.place(x - 1, y);
        }
        if (x > 0 && this.maskBoard[x - 1][y] === "") {
          this.place(x - 1, y);
        }
        if (
          x > 0 &&
          y < this.height - 1 &&
          this.maskBoard[x - 1][y + 1] === ""
        ) {
          this.place(x - 1, y + 1);
        }
        if (y > 0 && this.maskBoard[x][y - 1] === "") {
          this.place(x, y - 1);
        }
        if (y < this.height - 1 && this.maskBoard[x][y + 1] === "") {
          this.place(x, y + 1);
        }
        if (
          x < this.width - 1 &&
          y > 0 &&
          this.maskBoard[x + 1][y - 1] === ""
        ) {
          this.place(x + 1, y - 1);
        }
        if (x < this.width - 1 && this.maskBoard[x + 1][y] === "") {
          this.place(x + 1, y);
        }
        if (
          x < this.width - 1 &&
          y < this.height - 1 &&
          this.maskBoard[x + 1][y + 1] === ""
        ) {
          this.place(x + 1, y + 1);
        }
      } else {
        // Update the maskBoard
        this.maskBoard[x][y] = minesAround;
      }
    }
  }

  play(x: number, y: number, typeOfAction: "place" | "flag") {
    if (!this.isIntiate) {
      this.initiate(x, y);
      console.log("Game initiated");
    }
    if (this.isOver()) {
      return;
    }
    if (typeOfAction === "place") {
      this.place(x, y);
      // Check if the game is over
      if (this.isOver()) {
        alert("You won");
        this.maskBoard = this.board;
      }
    }
    if (typeOfAction === "flag") {
      // Flag the cell if the mask is empty
      if (this.maskBoard[x][y] === "") {
        this.maskBoard[x][y] = "F";
        this.flagLeft--;
      } else if (this.maskBoard[x][y] === "F") {
        this.maskBoard[x][y] = "";
        this.flagLeft++;
      }
    }
  }
}

