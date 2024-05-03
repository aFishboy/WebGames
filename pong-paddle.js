"use strict";

export default class Paddle {
    #paddleX;
    #paddleY;
    #paddleWidth;
    #paddleHeight;
    #score;

    constructor(canvas, xPosition) {
        this.canvas = canvas;
        this.#paddleWidth = 9;
        this.#paddleHeight = 50;
        this.paddleX = xPosition;
        this.reset();
    }

    reset() {
        this.paddleY = (this.canvas.height - this.paddleHeight) / 2;
        this.score = 0;
    }

    draw(ctx) {
        this.#update();
        ctx.fillStyle = "black";
        ctx.fillRect(
            this.paddleX,
            this.paddleY,
            this.paddleWidth,
            this.paddleHeight
        );
    }

    #update() {
        this.paddleHeight = this.canvas.height * 0.12;
    }

    get paddleWidth() {
        return this.#paddleWidth;
    }

    set paddleWidth(w) {
        this.#paddleWidth = w;
    }

    get paddleHeight() {
        return this.#paddleHeight;
    }

    set paddleHeight(h) {
        this.#paddleHeight = h;
    }

    get paddleY() {
        return this.#paddleY;
    }

    set paddleY(y) {
        this.#paddleY = y;
    }

    get paddleX() {
        return this.#paddleX;
    }

    set paddleX(x) {
        this.#paddleX = x;
    }

    get score() {
        return this.#score;
    }

    set score(s) {
        this.#score = s;
    }
}
