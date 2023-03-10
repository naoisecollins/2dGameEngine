// Get the player element and initialize its position
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const gameArea = document.getElementById("game-container");
const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;
const gameWidth = gameArea.offsetWidth;
const gameHeight = gameArea.offsetHeight;

let playerX = 0;
let playerY = 75;
let enemyX = Math.random() * (gameWidth - playerWidth);
let enemyY = Math.random() * (gameHeight - playerHeight);

// Define the game loop function
function gameLoop() {
  // Handle player movement
  if (keys.ArrowLeft && playerX > 0) {
    playerX -= 10;
  }
  if (keys.ArrowRight && playerX < gameWidth - playerWidth) {
    playerX += 10;
  }
  if (keys.ArrowUp && playerY > 0) {
    playerY -= 10;
  }
  if (keys.ArrowDown && playerY < gameHeight - playerHeight) {
    playerY += 10;
  }

  // Update the player's position
  player.style.left = `${playerX}px`;
  player.style.top = `${playerY}px`;

  // Move the enemy towards the player
  const enemySpeed = 1;
  const dx = playerX - enemyX;
  const dy = playerY - enemyY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance > 0) {
    enemyX += dx / distance * enemySpeed;
    enemyY += dy / distance * enemySpeed;
  }
  // Update the enemy's position
  enemy.style.left = `${enemyX}px`;
  enemy.style.top = `${enemyY}px`;

  // Check for collisions
  const collisionDistance = playerWidth / 2 + enemy.offsetWidth / 2;
  if (distance < collisionDistance) {
    // Collision detected, end the game
    endGame();
  } else {
    // No collision, continue the game
    requestAnimationFrame(gameLoop);
  }
}

// Start the game loop
requestAnimationFrame(gameLoop);

// Define the keydown event listener to handle player movement
const keys = {};
document.addEventListener("keydown", event => {
  keys[event.key] = true;
});

document.addEventListener("keyup", event => {
  keys[event.key] = false;
});

// Define the end game function
function endGame() {
  // Display the game over message
  alert("Game Over");
}
