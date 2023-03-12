// Import the Player, Enemy, Collectible, Sound, UI, and collision modules
import Player from "./player.js";
import Enemy from "./enemy.js";
import Collectible from "./collectible.js";
import Sound from "./sounds.js";
import UI from "./ui.js";
import { circleRectCollision, detectCollision } from "./collision.js";

// Get the canvas element and its context, and create new Sound and UI objects
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sound = new Sound();
const ui = new UI(canvas);

// Set the width and height of the canvas
canvas.width = 800;
canvas.height = 600;

// Create new Player and Enemy objects
const player = new Player(50, 50, 30, 30, "blue",1000,800,600);
const enemy = new Enemy(800,600,50,50,"red",1);

// Create an array to hold Collectible objects, and add a new Collectible object to the array every 5 seconds
const collectibles = [];
setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const collectible = new Collectible(x, y, 20, "yellow");
  collectibles.push(collectible);
}, 5000);

// Define the game loop function, which clears the canvas, draws the player and enemy, checks for collisions,
// updates the UI, updates the player and enemy positions, and then calls itself recursively using requestAnimationFrame()
function gameLoop(lastTime) {
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);
  enemy.draw(ctx);
  if(!sound.bgSoundPlaying){
    sound.playBackgroundMusic();
    sound.bgSoundPlaying = true; 	
  }

  // Check for collisions between the player and the enemy
  if (detectCollision(player, enemy)) {
    // If a collision is detected and lives can be decremented, decrement the lives and prevent further decrements for 2 seconds
    if (canDecrementLives) {
      ui.decrementLives();
      canDecrementLives = false;
      setTimeout(() => {
        canDecrementLives = true;
      }, 2000);
    }
  }

  // Loop through the collectibles array, draw each non-collected collectible, and check for collisions between the player and the collectible
  collectibles.forEach((collectible) => {
    if (!collectible.isCollected) {
      collectible.draw(ctx);
      if (circleRectCollision(collectible, player)) {
        sound.play("collect");
        ui.updateScore(10);
        collectible.isCollected = true;
      }
    }
  });

  // Draw the score and lives on the UI
  ui.drawScore(ctx, 10, 30);
  ui.drawLives(ctx,10,30);

  // Update the player and enemy positions
  player.update(deltaTime);
  enemy.update(player, deltaTime);

  // Call the gameLoop function recursively using requestAnimationFrame()
  requestAnimationFrame(() => gameLoop(currentTime));
}

// Call the gameLoop function to start the game loop
gameLoop(performance.now());
// Add an event listener for the 'keydown' event on the document object
document.addEventListener("keydown", (event) => {
  // Use a switch statement to handle different key presses
  switch (event.key) {
    case "ArrowLeft":
      // Update the player's moveLeftPressed property to true
      player.moveLeftPressed = true;
      break;
    case "ArrowRight":
      // Update the player's moveRightPressed property to true
      player.moveRightPressed = true;
      break;
    case "ArrowUp":
      // Update the player's moveUpPressed property to true
      player.moveUpPressed = true;
      break;
    case "ArrowDown":
      // Update the player's moveDownPressed property to true
      player.moveDownPressed = true;
      break;
  }
});

// Add an event listener for the 'keyup' event on the document object
document.addEventListener("keyup", (event) => {
  // Use a switch statement to handle different key releases
  switch (event.key) {
    case "ArrowLeft":
      // Update the player's moveLeftPressed property to false
      player.moveLeftPressed = false;
      break;
    case "ArrowRight":
      // Update the player's moveRightPressed property to false
      player.moveRightPressed = false;
      break;
    case "ArrowUp":
      // Update the player's moveUpPressed property to false
      player.moveUpPressed = false;
      break;
    case "ArrowDown":
      // Update the player's moveDownPressed property to false
      player.moveDownPressed = false;
      break;
  }
});

