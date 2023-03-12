class Player {
  constructor(x, y, width, height, color, speed, levelWidth, levelHeight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed; // Set player speed
    this.levelWidth = levelWidth;
    this.levelHeight = levelHeight;
    this.moveLeftPressed = false;
    this.moveRightPressed = false;
    this.moveUpPressed = false;
    this.moveDownPressed = false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(deltaTime) {
    // Calculate the distance the player should move in this frame
    const distance = this.speed * deltaTime;

    // Move the player based on the current key inputs
    if (this.moveLeftPressed && this.x > 0) {
      this.x -= distance;
    }
    if (this.moveRightPressed && this.x + this.width < this.levelWidth) {
      this.x += distance;
    }
    if (this.moveUpPressed && this.y > 0) {
      this.y -= distance;
    }
    if (this.moveDownPressed && this.y + this.height < this.levelHeight) {
      this.y += distance;
    }
  }

  moveLeft() {
    this.moveLeftPressed = true;
  }

  moveRight() {
    this.moveRightPressed = true;
  }

  moveUp() {
    this.moveUpPressed = true;
  }

  moveDown() {
    this.moveDownPressed = true;
  }

  stopMoveLeft() {
    this.moveLeftPressed = false;
  }

  stopMoveRight() {
    this.moveRightPressed = false;
  }

  stopMoveUp() {
    this.moveUpPressed = false;
  }

  stopMoveDown() {
    this.moveDownPressed = false;
  }
}

export default Player;
