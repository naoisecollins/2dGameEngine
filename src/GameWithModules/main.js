// main.js
import Player from "./player.js";
import Enemy from "./enemy.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const player = new Player(50, 50, 30, 30, "blue");
const enemy = new Enemy(50,50,50,50,"red",5);
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);
  enemy.draw(ctx);
  player.update();
  enemy.update();

  requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      player.moveLeft();
      break;
    case "ArrowRight":
      player.moveRight();
      break;
    case "ArrowUp":
      player.moveUp();
      break;
    case "ArrowDown":
      player.moveDown();
      break;
  }
});
