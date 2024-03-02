document.addEventListener("DOMContentLoaded", () => {
    let snakeSize = 1;
    const gameContainer = document.querySelector('.game-container');
    const snake = document.getElementById('snake');
    const food = document.getElementById('food');
    const levelDisplay = document.getElementById('level');
    const livesDisplay = document.getElementById('lives');
    const scoreDisplay = document.getElementById('score');

    let level = 1;
    let lives = 3;
    let score = 0;
    let snakeLength = 1;
    let direction = 'right';
    let interval;
    let speed = 200;

    function startGame() {
        createSnake();
        createFood();
        interval = setInterval(moveSnake, speed);
        document.addEventListener('keydown', changeDirection);
    }

    function createSnake() {
        snake.style.left = '0px';
        snake.style.top = '0px';
        snakeLength = 1;
        for (let i = 1; i < snakeLength; i++) {
            appendSnakePart();
        }
    }

    function createFood() {
        const foodX = Math.floor(Math.random() * 19) * 20;
        const foodY = Math.floor(Math.random() * 19) * 20;
        food.style.left = foodX + 'px';
        food.style.top = foodY + 'px';
    }

    function appendSnakePart() {
        const newPart = document.createElement('div');
        newPart.className = 'snake-part';
        gameContainer.appendChild(newPart);
    }

    function moveSnake() {
        const snakeParts = document.querySelectorAll('.snake-part');
        let prevX = parseInt(snake.style.left);
        let prevY = parseInt(snake.style.top);

        switch (direction) {
            case 'up':
                snake.style.top = prevY - 20 + 'px';
                break;
            case 'down':
                snake.style.top = prevY + 20 + 'px';
                break;
            case 'left':
                snake.style.left = prevX - 20 + 'px';
                break;
            case 'right':
                snake.style.left = prevX + 20 + 'px';
                break;
        }

        if (checkCollision()) {
            handleCollision();
        }

        const headX = parseInt(snake.style.left);
        const headY = parseInt(snake.style.top);

        if (headX === parseInt(food.style.left) && headY === parseInt(food.style.top)) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            createFood();
            appendSnakePart();
        }

        // Move each snake part to the previous part's position
        for (let i = snakeParts.length - 1; i > 0; i--) {
            const prevPart = snakeParts[i - 1];
            const part = snakeParts[i];
            part.style.left = prevPart.style.left;
            part.style.top = prevPart.style.top;
        }

        // Move the first part (head) to the new position
        snakeParts[0].style.left = prevX + 'px';
        snakeParts[0].style.top = prevY + 'px';
    }

    function changeDirection(e) {
        switch (e.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }

    function checkCollision() {
        const headX = parseInt(snake.style.left);
        const headY = parseInt(snake.style.top);

        // Check collision with walls
        if (headX < 0 || headX >= 400 || headY < 0 || headY >= 400) {
            return true;
        }

        // Check collision with itself
        const snakeParts = document.querySelectorAll('.snake-part');
        for (let i = 1; i < snakeParts.length; i++) {
            const part = snakeParts[i];
            if (headX === parseInt(part.style.left) && headY === parseInt(part.style.top)) {
                return true;
            }
        }

        return false;
    }

    function handleCollision() {
        clearInterval(interval);
        lives--;

        if (lives === 0) {
            gameOver();
        } else {
            levelUp();
        }
    }

    function levelUp() {
        level++;
        levelDisplay.textContent = `Level: ${level}`;
        speed -= 20; // Increase speed for the next level
        resetSnake();
        createFood();
        interval = setInterval(moveSnake, speed);
    }

    function resetSnake() {
        const snakeParts = document.querySelectorAll('.snake-part');
        snakeParts.forEach(part => part.remove());
        createSnake();
     
    }

    function gameOver() {
        clearInterval(interval);
        alert('Game Over! Your final score is ' + score);
        resetGame();
    }

    function resetGame() {
        level = 1;
        lives = 3;
        score = 0;
        speed = 200;
        levelDisplay.textContent = `Level: ${level}`;
        livesDisplay.textContent = `Lives: ${lives}`;
        scoreDisplay.textContent = `Score: ${score}`;
        startGame();
    }

    // Start the game
    startGame();
});