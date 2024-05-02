"use strict";

const tileColors = [
    "#aad6fe",
    "#8bc6ef",
    "#7bb6df",
    "#6ca6d0",
    "#5d96c1",
    "#4e86b2",
    "#3e75a2",
    "#2f6593",
    "#205584",
    "#104574",
    "#013565",
    "#143b60",
    "#012a51",
    "#010e23",
];

// Class definition for Tile
export default class Tile {
    #tileElement; // Private property for the tile element
    #row; // Private property for the row
    #col; // Private property for the column
    #value; // Private property for the value

    // Constructor for Tile class
    constructor(gameBoard, v = Math.random() > 0.1 ? 2 : 4) {
        // Creating a tile element
        this.#tileElement = document.createElement("div");
        this.#tileElement.classList.add("tile"); // Adding class "tile" to the tile element
        gameBoard.append(this.#tileElement); // Appending the tile element to the game board
        this.value = v; // Setting the initial value of the tile
    }

    // Getter for the value of the tile
    get value() {
        return this.#value;
    }

    // Setter for the row of the tile
    set row(v) {
        this.#row = v;
        this.#tileElement.style.setProperty("--row", v); // Setting the CSS custom property "--row"
    }

    // Setter for the column of the tile
    set col(v) {
        this.#col = v;
        this.#tileElement.style.setProperty("--col", v); // Setting the CSS custom property "--col"
    }

    // Setter for the value of the tile
    set value(v) {
        this.#value = v;
        this.#tileElement.textContent = v; // Setting the text content of the tile element
        // Determining the stage of the tile based on its value and setting its color accordingly
        const stage = Math.log2(v) - 1 > 13 ? 13 : Math.floor(Math.log2(v)) - 1;
        this.#tileElement.style.setProperty("--tile-color", tileColors[stage]); // Setting the color of the tile
        if (stage >= 8)
            this.#tileElement.style.setProperty("--text-color", "#F0F7FF"); // Setting the text color of the tile
    }

    // Method to remove the tile element from the DOM
    removeTile() {
        this.#tileElement.remove();
    }
}
