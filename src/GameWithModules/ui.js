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
  }
  
  export default UI;
  