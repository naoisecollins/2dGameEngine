// collectible.js
class Collectible {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.isCollected = false;
      this.soundPlayed = false;
    }
  
    draw(ctx) {
      if (!this.isCollected) { // Only draw the coin if it hasn't been collected yet
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
    }
  
    checkCollision(player) {
      // Calculate the distance between the player and the collectible
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      // If the player and the collectible are close enough, mark the collectible as collected
      if (distance < player.width / 2 + this.radius) {
        this.isCollected = true;
      }
    }
  }
  
  export default Collectible;
  