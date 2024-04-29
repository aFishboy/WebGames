"use strict";

import GameBoard from "./GameBoard.js";

const gameBoardElement = document.querySelector("#game-board");
const gameBoard = new GameBoard(gameBoardElement);
gameBoard.createStartingTiles(gameBoardElement);
enableKeyListener();

function enableKeyListener() {
    window.addEventListener("keydown", handleUserInput, { once: true });
}

function handleUserInput(event) {
    console.log(event);
    switch (event.key) {
        case "ArrowUp":
            slideUp();
            break;
        case "ArrowDown":
            slideDown();
            break;
        case "ArrowLeft":
            slideLeft();
            break;
        case "ArrowRight":
            slideRight();
            break;
        default:
            enableKeyListener();
            return;
    }

    //

    enableKeyListener();
}

function slideUp() {
    slideTiles(gameBoard.slotsAsColumns)
}
function slideDown() {
}
function slideLeft() {
}
function slideRight() {
}
