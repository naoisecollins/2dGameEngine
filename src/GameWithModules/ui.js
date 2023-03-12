// ui.js
class UI {
    constructor(canvas) {
      this.canvas = canvas;
      this.score = 0;
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
  }
  
  export default UI;
  