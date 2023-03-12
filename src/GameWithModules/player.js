// player.js
class Player {
    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.speed = 5; // Set player speed
    }
  
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    update() {
      // Handle player movement and collision detection here
    }
  
    moveLeft() {
      this.x -= this.speed;
    }
  
    moveRight() {
      this.x += this.speed;
    }
  
    moveUp() {
      this.y -= this.speed;
    }
  
    moveDown() {
      this.y += this.speed;
    }
  }
  
  export default Player;
  