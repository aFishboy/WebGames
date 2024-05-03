// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let paddleWidth = 5;
let paddleHeight = 50;
// Define paddle
let paddleY = (canvas.height - paddleHeight) / 2; // Initial paddle position

// Event listener to track mouse movement
document.addEventListener("mousemove", (event) => {
    console.log("🚀 ~ window.innerWidth:", window.innerWidth);
    let mouseY =
        event.clientY - canvas.getBoundingClientRect().top - paddleHeight / 2;
    if (mouseY)
        paddleY = Math.min(canvas.height - paddleHeight, Math.max(0, mouseY));
});

// Function to draw paddle
function drawPaddle() {
    ctx.fillStyle = "black";
    ctx.fillRect(7, paddleY, paddleWidth, paddleHeight);
}

// Function to draw everything
function draw() {
    canvas.width = window.innerWidth * 0.85;
    canvas.height = window.innerHeight * 0.6;
    paddleHeight = canvas.height * 0.12

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddle
    drawPaddle();

    // Request next frame
    requestAnimationFrame(draw);
}

// Start the game loop
draw();
