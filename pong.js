"use strict";

import Ball from "./pong-ball.js";
import Paddle from "./pong-paddle.js";


// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.85;
canvas.height = window.innerHeight * 0.6;

// Define paddle
let paddle = new Paddle(canvas)

// Define ball
let ball = new Ball(canvas);


// Event listener to track mouse movement
document.addEventListener("mousemove", (event) => {
    let mouseY =
        event.clientY - canvas.getBoundingClientRect().top - paddle.paddleHeight / 2;
    if (mouseY)
        paddle.paddleY = Math.min(canvas.height - paddle.paddleHeight, Math.max(0, mouseY));
});


// Function to draw everything
function draw() {
    canvas.width = window.innerWidth * 0.85;
    canvas.height = window.innerHeight * 0.6;
    // console.log("🚀 ~ draw ~ canvas.height:", canvas.height)
    

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddle
    paddle.draw(ctx);
    ball.draw(ctx);

    // Request next frame
    requestAnimationFrame(draw);
}

// Start the game loop
draw();
