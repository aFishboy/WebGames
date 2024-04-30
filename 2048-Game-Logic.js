"use strict";

import GameBoard from "./GameBoard.js";

const gameBoardElement = document.querySelector("#game-board");
let gameBoard = new GameBoard(gameBoardElement);
gameBoard.createStartingTiles(gameBoardElement);
enableKeyListener();


function gameLose() {
    alert("NEED TO ADD"); ////////////////////////////////////////////////////////
    restartGame();
}

function restartGame(){
    gameBoardElement.innerHTML = "";
    gameBoard = new GameBoard(gameBoardElement);
    gameBoard.createStartingTiles(gameBoardElement);
    enableKeyListener();
}

function enableKeyListener() {
    window.addEventListener("keydown", handleUserInput, { once: true });
}

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
    gameBoard.slots.forEach((slot) => slot.mergeTiles());
    gameBoard.createNewTile(gameBoardElement);

    if (cannotMove()) {
        gameLose();
    }

    enableKeyListener();
}

function cannotMove() {
    return (
        !canMoveInDirectionUp() &&
        !canMoveInDirectionDown() &&
        !canMoveInDirectionLeft() &&
        !canMoveInDirectionRight()
    );
}
function ableToMoveDirection(slots) {
    return slots.some((array) => {
        return array.some((slot, index) => {
            if (slot.tile == null || index === 0) return false;
            const nextSlot = array[index - 1];
            return nextSlot.canAccept(slot.tile);
        });
    });
}

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
