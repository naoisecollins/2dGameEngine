// main.js
import Player from "./player.js";
import Enemy from "./enemy.js";
import Collectible from "./collectible.js";
import Sound from "./sounds.js";
import UI from "./ui.js";
import { circleRectCollision, detectCollision } from "./collision.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sound = new Sound();
const ui = new UI(canvas);

canvas.width = 800;
canvas.height = 600;

const player = new Player(50, 50, 30, 30, "blue",1000,800,600);
const enemy = new Enemy(800,600,50,50,"red",1);
const collectibles = [];

// Add collectibles every 5 seconds
setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const collectible = new Collectible(x, y, 20, "yellow");
  collectibles.push(collectible);
}, 5000);

function gameLoop(lastTime) {
  // Calculate the deltaTime since the last frame
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000; // convert to seconds

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);
  enemy.draw(ctx);

  // Check for collision with the enemy
  if (detectCollision(player, enemy)) {
    console.log("player destroyed");
    //sound.play("destroy");
    ui.decrementLives();
  }


// Check for collision with the collectible
collectibles.forEach((collectible) => {
  if (!collectible.isCollected) {
    collectible.draw(ctx);
    if (circleRectCollision(collectible, player)) {
      console.log("collectible collected");
      sound.play("collect");
      ui.updateScore(10);
      collectible.isCollected = true;
    }
  }
});
  ui.drawScore(ctx, 10, 30);
  ui.drawLives(ctx,10,30);
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
