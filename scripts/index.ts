// Minesweeper game
// Path: index.ts

import { Game } from "./GameClass.js";

export default () => {
  return 1;
};


const newGame = document.getElementById("new-game");
const gameBoard = document.getElementById("board");

let game = null as Game;
let cells : HTMLDivElement[] = [];

newGame!.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("New game");
  cells = [];
  const columns = parseInt((document.getElementById("columns") as HTMLInputElement).value);
  const rows = parseInt((document.getElementById("rows") as HTMLInputElement).value);
  const mines = parseInt((document.getElementById("mines") as HTMLInputElement).value);
  game = new Game(columns, rows, mines); 
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }

  for(let i =0; i< game.height; i++) {
    const row = document.createElement("div");
    // delete all gameBoard children
    gameBoard.appendChild(row);
    row.classList.add("row")
    for(let j =0; j< game.width; j++) {
      const cell = document.createElement("div");
      cells.push(cell)
      cell.classList.add("cell");

      cell.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Click", i, j);
        game.play(i, j, "place");
        renderGame(game);
      })

      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        game.play(i, j, "flag");
        renderGame(game);
      })
      row!.appendChild(cell);
    }
  }
  renderGame(game);
})

const colors = ["blue", "green", "red", "purple", "orange", "yellow", "pink", "black"];
const renderGame = (game: Game) => {
  console.log(cells)
  console.log(game.maskBoard)
  console.log(game.board)
  for(let i =0; i< game.height; i++) {
    for(let j =0; j< game.width; j++) {
      const cell = cells[i*game.width + j];
      if(game.maskBoard[i][j] === "F" || game.maskBoard[i][j] === "X") {
        cell.innerHTML = "F";
        cell.style.color = "red";
      } else if(game.maskBoard[i][j] === "0") {
        cell.style.backgroundColor = "#c0bebe";
      } else if (game.maskBoard[i][j] !== "") {
        cell.innerHTML = String(game.maskBoard[i][j]);
        cell.style.backgroundColor = "#c0bebe";
        cell.style.color = colors[parseInt(String(game.maskBoard[i][j])) - 1];
      }
    }
  }
}
