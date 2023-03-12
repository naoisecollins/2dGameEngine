// ui.js
class UI {
    constructor(canvas) {
      this.canvas = canvas;
      this.score = 0;
      this.lives = 3; // add lives property and initialize it
    }
  
    updateScore(amount) {
      this.score += amount;
    }
  
    drawScore(ctx, x, y) {
      ctx.font = "24px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "left";
      ctx.fillText(`Score: ${this.score}`, x, y);
    }
    drawLives(ctx, x, y) {
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText(`Lives: ${this.lives}`, x, y + 30);
    }
    
    decrementLives() {
      this.lives -= 1;
    }
    drawGameOver(ctx) {
        ctx.fillStyle = "red";
        ctx.font = "bold 64px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 150, canvas.height / 2);
      
        // Add a restart button
        const buttonWidth = 200;
        const buttonHeight = 50;
        const buttonX = canvas.width / 2 - buttonWidth / 2;
        const buttonY = canvas.height / 2 + 50;
        ctx.fillStyle = "red";
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
      
        ctx.fillStyle = "white";
        ctx.font = "bold 24px Arial";
        ctx.fillText("Restart", canvas.width / 2 - 45, canvas.height / 2 + 80);
      
        // Add a click event listener to the canvas element
        canvas.addEventListener("click", function(event) {
          const rect = canvas.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          if (x >= buttonX && x <= buttonX + buttonWidth && y >= buttonY && y <= buttonY + buttonHeight) {
            location.reload();
          }
        });
      }

      }
      
  
  export default UI;
  