"use strict";

import Slot from "./Slot.js";
import Tile from "./Tile.js";

const GRID_SIZE = 4;
const SLOT_SIZE = 15;
const GAP = 2;
const BORDER_RADIUS = 0.75;

export default class GameBoard {
    #slots;
    constructor(gameBoardElement) {
        gameBoardElement.style.setProperty("--grid-size", GRID_SIZE);
        gameBoardElement.style.setProperty("--slot-size", `${SLOT_SIZE}vmin`);
        gameBoardElement.style.setProperty("--gap", `${GAP}vmin`);
        gameBoardElement.style.setProperty(
            "--border-radius",
            `${BORDER_RADIUS}vmin`
        );

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

    get slots() {
        return this.#slots;
    }

    get #emptySlots() {
        return this.slots.filter((slot) => slot.tile == null);
    }

    get #randomEmptySlot() {
        const randomIndex = Math.floor(Math.random() * this.#emptySlots.length);
        return this.#emptySlots[randomIndex];
    }

    get slotsAsColumns() {}

    createStartingTiles(gameBoardElement) {
        this.#randomEmptySlot.tile = new Tile(gameBoardElement);
        this.#randomEmptySlot.tile = new Tile(gameBoardElement);
    }
}

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
