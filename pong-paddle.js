"use strict";

export default class Paddle {
    #paddleX;
    #paddleY;
    #paddleWidth;
    #paddleHeight;

    constructor(canvas) {
        this.canvas = canvas;
        this.#paddleWidth = 5;
        this.#paddleHeight = 50;
        this.#reset();
    }

    #reset() {
        this.paddleY = (this.canvas.height - this.paddleHeight) / 2;
    }

    draw(ctx) {
        this.#update();
        ctx.fillStyle = "black";
        ctx.fillRect(7, this.paddleY, this.paddleWidth, this.paddleHeight);
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
}
