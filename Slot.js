"use strict";

// Importing Tile class from Tile.js module
import Tile from "./Tile.js";

// Exporting Slot class
export default class Slot {
    #tile;
    #tileToMerge;
    #slotElement;
    #row;
    #col;

    // Constructor for Slot class
    constructor(slotElement, row, col) {
        this.#slotElement = slotElement;
        this.#row = row;
        this.#col = col;
    }

    // Getter for tile
    get tile() {
        return this.#tile;
    }

    // Getter for tile to merge
    get tileToMerge() {
        return this.#tileToMerge;
    }

    // Setter for tile to merge
    set tileToMerge(valueToSet) {
        this.#tileToMerge = valueToSet;
        if (valueToSet != null) {
            this.tileToMerge.row = this.#row;
            this.tileToMerge.col = this.#col;
        }
    }

    // Getter for row
    get row() {
        return this.#row;
    }

    // Getter for column
    get col() {
        return this.#col;
    }

    // Setter for tile
    set tile(val) {
        this.#tile = val;
        if (val == null) return;
        this.#tile.row = this.#row;
        this.#tile.col = this.#col;
    }

    // Method to merge tiles
    mergeTiles() {
        if (this.tile == null || this.tileToMerge == null) return;
        this.tile.value = this.tile.value + this.tileToMerge.value;
        this.tileToMerge.removeTile();
        this.tileToMerge = null;
        return this.tile.value;
    }

    // Method to check if a tile can be accepted
    canAccept(tile) {
        if (this.tile == null) return true;
        else if (this.tile.value === tile.value && this.tileToMerge == null)
            return true;
        else return false;
    }
}
