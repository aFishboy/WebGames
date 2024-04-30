"use strict";

import Tile from "./Tile.js";

export default class Slot {
    #tile;
    #tileToMerge;
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

    get tileToMerge() {
        return this.#tileToMerge;
    }

    set tileToMerge(valueToSet) {
        this.#tileToMerge = valueToSet;
        if (valueToSet != null) { 
            this.tileToMerge.row = this.#row;
            this.tileToMerge.col = this.#col;
        }
    }

    get row() {
        return this.#row;
    }
    get col() {
        return this.#col;
    }

    set tile(val) {
        this.#tile = val;
        if (val == null) return;
        this.#tile.row = this.#row;
        this.#tile.col = this.#col;
    }

    mergeTiles() {
        if (this.tile == null || this.tileToMerge == null) return;
        this.tile.value = this.tile.value + this.tileToMerge.value;
        this.tileToMerge.removeTile();
        this.tileToMerge = null;
    }
    canAccept(tile) {
        if (this.tile == null) return true;
        else if (this.tile.value === tile.value && this.tileToMerge == null)
            return true;
        else return false;
    }
}
