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

export default class Tile {
    #tileElement;
    #row;
    #col;
    #value;
    constructor(gameBoard, v = Math.random() > 0.1 ? 2 : 4) {
        this.#tileElement = document.createElement("div");
        this.#tileElement.classList.add("tile");
        gameBoard.append(this.#tileElement);
        this.value = v;
    }

    get value() {
        return this.#value;
    }

    set row(v) {
        this.#row = v;
        this.#tileElement.style.setProperty("--row", v);
    }

    set col(v) {
        this.#col = v;
        this.#tileElement.style.setProperty("--col", v);
    }

    set value(v) {
        this.#value = v;
        this.#tileElement.textContent = v;
        const stage = Math.log2(v) - 1 > 13 ? 13 : Math.floor(Math.log2(v)) - 1;
        this.#tileElement.style.setProperty("--tile-color", tileColors[stage]);
        if (stage >= 8)
            this.#tileElement.style.setProperty("--text-color", "#F0F7FF");
    }
}
