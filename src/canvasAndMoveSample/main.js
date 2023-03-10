// Get the player element and initialize its position
const player = document.getElementById("player");
let playerX = 0;
let playerY = 0;

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
  event.preventDefault();

  // Update the player's position
  player.style.left = `${playerX}px`;
  player.style.top = `${playerY}px`;

});
