// Minesweeper game
// Path: index.ts
import { Game } from "./GameClass.js";
export default (function () {
    return 1;
});
var newGame = document.getElementById("new-game");
var gameBoard = document.getElementById("board");
var game = null;
var cells = [];
newGame.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("New game");
    cells = [];
    var columns = parseInt(document.getElementById("columns").value);
    var rows = parseInt(document.getElementById("rows").value);
    var mines = parseInt(document.getElementById("mines").value);
    game = new Game(columns, rows, mines);
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    var _loop_1 = function (i) {
        var row = document.createElement("div");
        // delete all gameBoard children
        gameBoard.appendChild(row);
        row.classList.add("row");
        var _loop_2 = function (j) {
            var cell = document.createElement("div");
            cells.push(cell);
            cell.classList.add("cell");
            cell.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("Click", i, j);
                game.play(i, j, "place");
                renderGame(game);
            });
            cell.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                game.play(i, j, "flag");
                renderGame(game);
            });
            row.appendChild(cell);
        };
        for (var j = 0; j < game.width; j++) {
            _loop_2(j);
        }
    };
    for (var i = 0; i < game.height; i++) {
        _loop_1(i);
    }
    renderGame(game);
});
var colors = ["blue", "green", "red", "purple", "orange", "yellow", "pink", "black"];
var renderGame = function (game) {
    var flagLeft = document.getElementById("mines-left");
    flagLeft.innerHTML = String(game.flagLeft) + "F";
    var lifesLeft = document.getElementById("lifes");
    lifesLeft.innerHTML = String(game.lifes) + "❤";
    for (var i = 0; i < game.height; i++) {
        for (var j = 0; j < game.width; j++) {
            var cell = cells[i * game.width + j];
            if (game.maskBoard[i][j] === "F" || game.maskBoard[i][j] === "X") {
                cell.innerHTML = "F";
                cell.style.color = "red";
            }
            else if (game.maskBoard[i][j] === "0") {
                cell.style.backgroundColor = "#c0bebe";
            }
            else if (game.maskBoard[i][j] !== "") {
                cell.innerHTML = String(game.maskBoard[i][j]);
                cell.style.backgroundColor = "#c0bebe";
                cell.style.color = colors[parseInt(String(game.maskBoard[i][j])) - 1];
            }
        }
    }
};
