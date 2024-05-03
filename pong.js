"use strict";

import Ball from "./pong-ball.js";
import Paddle from "./pong-paddle.js";

// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth > 500 ? 500 : window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.6;

// Define paddle
const playerXPosition = 7;
const npcXPosition = canvas.width - 16;
const playerPaddle = new Paddle(canvas, playerXPosition);
const npcPaddle = new Paddle(canvas, npcXPosition);

// Define ball
const ball = new Ball(canvas);

document.addEventListener("keydown", startGame);
ctx.fillStyle = "black";
ctx.font = "24px Arial";
ctx.textAlign = "center";
ctx.fillText(
    "Press any key to start",
    canvas.width / 2,
    canvas.height / 2 - 16
);
ctx.fillText(
    "First to 3 points wins!",
    canvas.width / 2,
    canvas.height / 2 + 16
);

const playerScore = document.querySelector("#p-score");
const npcScore = document.querySelector("#npc-score");

function startGame() {
    playerPaddle.reset();
    npcPaddle.reset();
    ball.reset();
    playerScore.innerHTML = `<p>Your Score: ${playerPaddle.score}<p>`;
    npcScore.innerHTML = `<p>AI Score: ${npcPaddle.score}<p>`;
    update(); // Start the game loop
}

// Event listener to track mouse movement
document.addEventListener("mousemove", (event) => {
    let mouseY =
        event.clientY -
        canvas.getBoundingClientRect().top -
        playerPaddle.paddleHeight / 2;
    if (mouseY)
        playerPaddle.paddleY = Math.min(
            canvas.height - playerPaddle.paddleHeight,
            Math.max(0, mouseY)
        );
});
function isBallPaddleCollision(paddle, ball) {
    return (
        paddle.paddleX < ball.ballX + ball.ballWidth &&
        paddle.paddleX + paddle.paddleWidth > ball.ballX &&
        paddle.paddleY < ball.ballY + ball.ballHeight &&
        paddle.paddleY + paddle.paddleHeight > ball.ballY
    );
}

function handleCollision() {
    if (isBallPaddleCollision(playerPaddle, ball)) {
        if (playerPaddle.paddleX + playerPaddle.paddleWidth >= ball.ballX)
            ball.xVelocity *= -1;
    } else if (isBallPaddleCollision(npcPaddle, ball)) {
        if (npcPaddle.paddleX <= ball.ballX + ball.ballWidth)
            ball.xVelocity *= -1;
    }
}

function update() {
    canvas.width = window.innerWidth > 500 ? 500 : window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.6;
    controlNPCPaddle();
    handleCollision();
    handleScore();
    if (shouldEndGame()) endGame();
    else draw();
}

function handleScore() {
    if (ball.ballX + ball.ballWidth > canvas.width) {
        playerPaddle.score++;
        playerScore.innerHTML = `<p>Your Score: ${playerPaddle.score}<p>`;
        ball.reset();
    } else if (ball.ballX < 0) {
        npcPaddle.score++;
        npcScore.innerHTML = `<p>AI Score: ${npcPaddle.score}<p>`;
        ball.reset();
    }
}
function shouldEndGame() {
    return playerPaddle.score >= 3 || npcPaddle.score >= 3;
}
function endGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.addEventListener("keydown", startGame);
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 16);
    ctx.fillText(
        "Press any key to play again!",
        canvas.width / 2,
        canvas.height / 2 + 16
    );
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddle
    playerPaddle.draw(ctx);
    npcPaddle.draw(ctx);
    ball.draw(ctx);

    // Request next frame
    requestAnimationFrame(update);
}

function controlNPCPaddle() {
    let targetY = ball.ballY - npcPaddle.paddleHeight / 2;

    targetY = Math.min(
        canvas.height - npcPaddle.paddleHeight,
        Math.max(0, targetY)
    );

    let distanceY = targetY - npcPaddle.paddleY;

    let speed = 0.08;

    let randomError = Math.random();
    let errorThreshold = window.innerWidth > 500 ? 0.70 : 0.30;

    if (randomError < errorThreshold) {
        return;
    }

    npcPaddle.paddleY += distanceY * speed;
}
