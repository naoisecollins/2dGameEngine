// Get the player element and initialize its position
const player = document.getElementById("player");
const gameArea = document.getElementById("game-container");
const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;
const gameWidth = gameArea.offsetWidth;
const gameHeight = gameArea.offsetHeight;
let playerX = 0;
let playerY = 75;

// Define the keydown event listener to handle player movement
document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowLeft":
      playerX -= 10;
      break;
    case "ArrowRight":
      playerX += 10;
      break;
    case "ArrowUp":
      playerY -= 10;
      break;
    case "ArrowDown":
      playerY += 10;
      break;
    default:
      return;
  }

  if (playerX < 0) {
    playerX = 0;
  } else if (playerX > gameWidth - playerWidth) {
    playerX = gameWidth - playerWidth;
  }
  if (playerY < 0) {
    playerY = 0;
  } else if (playerY > gameHeight - playerHeight) {
    playerY = gameHeight - playerHeight;
  }

  event.preventDefault();

  // Update the player's position
  player.style.left = `${playerX}px`;
  player.style.top = `${playerY}px`;

});
