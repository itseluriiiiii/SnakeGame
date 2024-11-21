const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const boxSize = 20;
const canvasSize = canvas.width; 
const totalBoxes = canvasSize / boxSize;


let snake = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 }; 
let food = spawnFood();
let score = 0;

function drawSnake() {
    ctx.fillStyle = "lime"; //color
    snake.forEach(segment => {
        ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });
}
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (
        head.x < 0 || head.x >= totalBoxes || 
        head.y < 0 || head.y >= totalBoxes || 
        snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
    )
    {
        alert(`Game Over! Your score: ${score}`);
        document.location.reload(); 
    }

    snake.unshift(head); 

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
    } 
    else 
    {
        snake.pop(); 
    }
}
function spawnFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * totalBoxes),
            y: Math.floor(Math.random() * totalBoxes),
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)); 
    return newFood;
}
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    moveSnake();
    setTimeout(gameLoop, 200); 
}

// Handle key press for direction change
document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

gameLoop();
