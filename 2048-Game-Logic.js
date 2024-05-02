"use strict";

// Importing GameBoard class from GameBoard.js module
import GameBoard from "./GameBoard.js";

// Selecting the game board element
const gameBoardElement = document.querySelector("#game-board");
const gameOverMessage = document.getElementById("gameOverMessage");
const restartButton = document.getElementById("restartButton");
const scoreBoardElement = document.querySelector("#scoreboard");

// Creating a new instance of GameBoard and initializing the game
let gameBoard = new GameBoard(gameBoardElement);
gameBoard.createStartingTiles(gameBoardElement);


// Enable key listener to handle user input
enableKeyListener();

let currentScore = 0;

// Function to handle game loss
function gameLose() {
    gameOverMessage.classList.add("show");
    window.removeEventListener("keydown", handleUserInput);
    restartButton.addEventListener("click", restartGame)
}

// Function to restart the game
function restartGame() {
    gameOverMessage.classList.remove("show");
    gameBoardElement.innerHTML = ""; // Clearing the game board
    scoreBoardElement.innerHTML = "<p>Score: 0<p>"
    gameBoard = new GameBoard(gameBoardElement); // Creating a new instance of GameBoard
    gameBoard.createStartingTiles(gameBoardElement); // Creating starting tiles
    enableKeyListener(); // Re-enabling key listener
}

// Function to enable key listener
function enableKeyListener() {
    window.addEventListener("keydown", handleUserInput, { once: true }); // Listening for keydown event once
}

// Function to handle user input
function handleUserInput(event) {
    switch (event.key) {
        case "ArrowUp":
            if (!canMoveInDirectionUp()) {
                enableKeyListener();
                return;
            }
            slideUp();
            break;
        case "ArrowDown":
            if (!canMoveInDirectionDown()) {
                enableKeyListener();
                return;
            }
            slideDown();
            break;
        case "ArrowLeft":
            if (!canMoveInDirectionLeft()) {
                enableKeyListener();
                return;
            }
            slideLeft();
            break;
        case "ArrowRight":
            if (!canMoveInDirectionRight()) {
                enableKeyListener();
                return;
            }
            slideRight();
            break;
        default:
            enableKeyListener();
            return;
    }
    // Merging tiles and creating new tile
    for (const slot of gameBoard.slots) {
        const returnedScore = slot.mergeTiles();
        if (returnedScore != null) currentScore += returnedScore;
    }
    // gameBoard.slots.forEach((slot) => slot.mergeTiles());
    scoreBoardElement.innerHTML = `<p>Score: ${currentScore}<p>`;
    gameBoard.createNewTile(gameBoardElement);

    // Checking if the game cannot move anymore, signaling game over
    if (cannotMove()) {
        gameLose();
    }

    enableKeyListener(); // Re-enabling key listener
}

// Function to check if the game cannot move in any direction
function cannotMove() {
    return (
        !canMoveInDirectionUp() &&
        !canMoveInDirectionDown() &&
        !canMoveInDirectionLeft() &&
        !canMoveInDirectionRight()
    );
}

// Function to check if tiles can move in a given direction
function ableToMoveDirection(slots) {
    return slots.some((array) => {
        return array.some((slot, index) => {
            if (slot.tile == null || index === 0) return false;
            const nextSlot = array[index - 1];
            return nextSlot.canAccept(slot.tile);
        });
    });
}

// Functions to check if tiles can move in specific directions
function canMoveInDirectionUp() {
    return ableToMoveDirection(gameBoard.slotsAsColumns);
}

function canMoveInDirectionDown() {
    return ableToMoveDirection(
        gameBoard.slotsAsColumns.map((col) => {
            return col.slice().reverse();
        })
    );
}

function canMoveInDirectionLeft() {
    return ableToMoveDirection(gameBoard.slotsAsRows);
}

function canMoveInDirectionRight() {
    return ableToMoveDirection(
        gameBoard.slotsAsRows.map((row) => {
            return row.slice().reverse();
        })
    );
}

// Function to slide tiles in a given direction
function slideTiles(slots) {
    slots.forEach((sliceOf2dArray) => {
        for (let i = 1; i < sliceOf2dArray.length; ++i) {
            const slot = sliceOf2dArray[i];
            if (slot.tile == null) continue;
            let lastAcceptedSlot;
            for (let j = i - 1; j >= 0; --j) {
                const slotToCheckSlide = sliceOf2dArray[j];
                if (!slotToCheckSlide.canAccept(slot.tile)) {
                    break;
                }
                lastAcceptedSlot = slotToCheckSlide;
            }
            if (lastAcceptedSlot != null) {
                if (lastAcceptedSlot.tile != null) {
                    lastAcceptedSlot.tileToMerge = slot.tile;
                } else {
                    lastAcceptedSlot.tile = slot.tile;
                }
                slot.tile = null;
            }
        }
    });
}

// Functions to slide tiles in specific directions
function slideUp() {
    return slideTiles(gameBoard.slotsAsColumns);
}
function slideDown() {
    return slideTiles(
        gameBoard.slotsAsColumns.map((col) => {
            return col.slice().reverse();
        })
    );
}

function slideLeft() {
    return slideTiles(gameBoard.slotsAsRows);
}
function slideRight() {
    return slideTiles(
        gameBoard.slotsAsRows.map((row) => {
            return row.slice().reverse();
        })
    );
}
