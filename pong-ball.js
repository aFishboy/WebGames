"use strict";

export default class Ball {
    #ballX;
    #ballY;
    #ballXVelocity;
    #ballYVelocity;
    #ballWidth;
    #ballHeight;

    constructor(canvas) {
        this.canvas = canvas;
        this.ballWidth = 7;
        this.ballHeight = 7;
        this.#reset();
    }

    // Public method to draw the ball on the canvas
    draw(ctx) {
        this.#update();
        ctx.fillStyle = "black";
        ctx.fillRect(this.ballX, this.ballY, this.ballWidth, this.ballHeight);
    }

    // Public method to update ball position
    #update() {
        this.#calculateVelocity();
        this.#ballX += this.#ballXVelocity;
        this.#ballY += this.#ballYVelocity;
    }

    #calculateVelocity() {
        //calc x velocity change

        //calc y velocity change
        if (this.ballY < 0 || this.ballY + this.ballHeight > this.canvas.height)
            this.yVelocity *= -1;
    }

    // Private method to reset ball position and velocity
    #reset() {
        this.#ballX = (this.canvas.width - this.ballWidth) / 2;
        this.#ballY = (this.canvas.height - this.ballHeight) / 2;
        let velocity = Math.random() < 0.5 ? 1.2 : -1.2;
        this.#ballXVelocity = velocity; // random starting velocity of -50 to 50
        this.#ballYVelocity = velocity;
    }

    get ballWidth() {
        return this.#ballWidth;
    }

    set ballWidth(w) {
        this.#ballWidth = w;
    }

    get ballHeight() {
        return this.#ballHeight;
    }

    set ballHeight(h) {
        this.#ballHeight = h;
    }

    // Getters and setters for ball position
    get ballX() {
        return this.#ballX;
    }

    set ballX(value) {
        this.#ballX = value;
    }

    get ballY() {
        return this.#ballY;
    }

    set ballY(value) {
        this.#ballY = value;
    }

    // Getters and setters for ball velocity
    get xVelocity() {
        return this.#ballXVelocity;
    }

    set xVelocity(value) {
        this.#ballXVelocity = value;
    }

    get yVelocity() {
        return this.#ballYVelocity;
    }

    set yVelocity(value) {
        this.#ballYVelocity = value;
    }
}
