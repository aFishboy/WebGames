"use strict";

// Importing Slot and Tile classes from Slot.js and Tile.js modules respectively
import Slot from "./Slot.js";
import Tile from "./Tile.js";

// Constants defining the game board layout
const GRID_SIZE = 4;
const SLOT_SIZE = 15;
const GAP = 2;
const BORDER_RADIUS = 0.75;

// Exporting GameBoard class
export default class GameBoard {
    #slots;

    // Constructor for GameBoard class
    constructor(gameBoardElement) {
        // Setting CSS custom properties for grid layout
        gameBoardElement.style.setProperty("--grid-size", GRID_SIZE);
        gameBoardElement.style.setProperty("--slot-size", `${SLOT_SIZE}vmin`);
        gameBoardElement.style.setProperty("--gap", `${GAP}vmin`);
        gameBoardElement.style.setProperty(
            "--border-radius",
            `${BORDER_RADIUS}vmin`
        );

        // Creating slots for the game board
        this.#slots = createBoardSlots(gameBoardElement).map(
            (slotElements, index) => {
                return new Slot(
                    slotElements,
                    Math.floor(index / GRID_SIZE),
                    index % GRID_SIZE
                );
            }
        );
    }

    // Getter for slots
    get slots() {
        return this.#slots;
    }

    // Getter for empty slots
    get #emptySlots() {
        return this.slots.filter((slot) => slot.tile == null);
    }

    // Getter for a random empty slot
    get #randomEmptySlot() {
        const randomIndex = Math.floor(Math.random() * this.#emptySlots.length);
        return this.#emptySlots[randomIndex];
    }

    // Getter for slots arranged as rows
    get slotsAsRows() {
        return this.#slots.reduce((slot2dArray, slot) => {
            slot2dArray[slot.row] = slot2dArray[slot.row] || [];
            slot2dArray[slot.row][slot.col] = slot;
            return slot2dArray;
        }, []);
    }

    // Getter for slots arranged as columns
    get slotsAsColumns() {
        return this.#slots.reduce((slot2dArray, slot) => {
            slot2dArray[slot.col] = slot2dArray[slot.col] || [];
            slot2dArray[slot.col][slot.row] = slot;
            return slot2dArray;
        }, []);
    }

    // Method to create starting tiles
    createStartingTiles(gameBoardElement) {
        this.#randomEmptySlot.tile = new Tile(gameBoardElement);
        this.#randomEmptySlot.tile = new Tile(gameBoardElement);
    }

    // Method to create a new tile
    createNewTile(gameBoardElement) {
        this.#randomEmptySlot.tile = new Tile(gameBoardElement);
    }
}

// Function to create slots for the game board
function createBoardSlots(gameBoardElement) {
    const slots = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; ++i) {
        const slot = document.createElement("div");
        slot.classList.add("slot");
        slots.push(slot);
        gameBoardElement.append(slot);
    }
    return slots;
}
