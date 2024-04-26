"use strict";

import Tile from "./Tile.js";

export default class Slot {
    #tile;
    #slotElement;
    #row;
    #col;

    constructor(slotElement, row, col) {
        this.#slotElement = slotElement;
        this.#row = row;
        this.#col = col;
    }

    get tile() {
        return this.#tile;
    }

    set tile(val) {
        this.#tile = val;
        if (val == null) return;
        this.#tile.row = this.#row;
        this.#tile.col = this.#col;
    }
}
