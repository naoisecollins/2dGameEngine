class Enemy {
    constructor(x, y, width, height, color, speed) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.speed = speed;
    }
  
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    update() {
      // Handle enemy movement and collision detection here
      this.x += this.speed;
      if (this.x + this.width > canvas.width || this.x < 0) {
        this.speed = -this.speed;
      }
    }
  }
  
  export default Enemy;
  