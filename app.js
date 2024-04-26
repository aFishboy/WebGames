"use strict";

import GameBoard from "./GameBoard.js";

const gameBoardElement = document.querySelector("#game-board");
const gameBoard = new GameBoard(gameBoardElement);
gameBoard.createStartingTiles(gameBoardElement);

//

//   background-color: rgb(207, 229, 253);
//   background-color: rgb(167, 201, 238);
