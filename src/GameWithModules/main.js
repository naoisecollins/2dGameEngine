// main.js
import Player from "./player.js";
import Enemy from "./enemy.js";
import Collectible from "./collectable.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const player = new Player(50, 50, 30, 30, "blue",1000,800,600);
const enemy = new Enemy(800,600,50,50,"red",1);
const collectible = new Collectible(400, 300, 20, "yellow");

function gameLoop(lastTime) {
  // Calculate the deltaTime since the last frame
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000; // convert to seconds

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);
  enemy.draw(ctx);
  collectible.draw(ctx);

  // Check for collision with the collectible
  if (!collectible.isCollected) {
    collectible.checkCollision(player);
  }

  // Update the player and enemy
  player.update(deltaTime);
  enemy.update(player, deltaTime);

  requestAnimationFrame(() => gameLoop(currentTime));
}

gameLoop(performance.now());

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      player.moveLeftPressed = true;
      break;
    case "ArrowRight":
      player.moveRightPressed = true;
      break;
    case "ArrowUp":
      player.moveUpPressed = true;
      break;
    case "ArrowDown":
      player.moveDownPressed = true;
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      player.moveLeftPressed = false;
      break;
    case "ArrowRight":
      player.moveRightPressed = false;
      break;
    case "ArrowUp":
      player.moveUpPressed = false;
      break;
    case "ArrowDown":
      player.moveDownPressed = false;
      break;
  }
});
