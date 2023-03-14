const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Game variables
const gridSize = 20;
const numCols = Math.floor(canvas.width / gridSize);
const numRows = Math.floor(canvas.height / gridSize);
const pacman = {
	x: 9 * gridSize,
	y: 11 * gridSize,
	speed: 4,
	dir: 'right',
	mouth: 0,
};
const ghosts = [
	{ x: 8 * gridSize, y: 8 * gridSize, speed: 3, dir: 'up', color: 'red' },
	{ x: 9 * gridSize, y: 8 * gridSize, speed: 3, dir: 'up', color: 'pink' },
	{ x: 10 * gridSize, y: 8 * gridSize, speed: 3, dir: 'up', color: 'orange' },
	{ x: 9 * gridSize, y: 7 * gridSize, speed: 3, dir: 'up', color: 'cyan' },
];
const pellets = [];
let score = 0;
let lives = 3;
let gameover = false;

// Helper functions
function drawRect(x, y, width, height, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fill();
}

function drawText(text, x, y, color) {
	ctx.fillStyle = color;
	ctx.font = '16px sans-serif';
	ctx.fillText(text, x, y);
}

function isColliding(obj1, obj2) {
	return (
		obj1.x < obj2.x + gridSize &&
		obj1.x + gridSize > obj2.x &&
		obj1.y < obj2.y + gridSize &&
		obj1.y + gridSize > obj2.y
	);
}

function resetGame() {
	pacman.x = 9 * gridSize;
	pacman.y = 11 * gridSize;
	pacman.dir = 'right';
	pacman.mouth = 0;
	for (let i = 0; i < ghosts.length; i++) {
		ghosts[i].x = 9 * gridSize;
		ghosts[i].y = 8 * gridSize;
		ghosts[i].dir = 'up';
	}
	pellets.length = 0;
	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			if (level[row][col] === 1) {
				pellets.push({ x: col * gridSize, y: row * gridSize });
			}
		}
	}
	score = 0;
	lives = 3;
	gameover = false;
}

// Event listeners
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowUp') {
		upPressed = true;
	} else if (event.key === 'ArrowDown') {
		downPressed = true;
	} else if (event.key === 'ArrowLeft') {
		leftPressed = true;
	} else if (event.key === 'ArrowRight') {
		rightPressed = true;
	} else if (event.key === 'Enter' && gameover) {
		resetGame();
	}
});

document.addEventListener('keyup', (event) => {
	if (event.key === 'ArrowUp') {
		upPressed = false;
	} else if (event.key === 'ArrowDown') {
		downPressed = false;
	} else if (event.key === 'ArrowLeft') {
		leftPressed = false;
	} else if (event.key === 'ArrowRight') {
		rightPressed = false;
	}
});

    // Game loop
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Draw game objects
        drawRect(0, 0, canvas.width, canvas.height, 'black');
    
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                if (level[row][col] === 1) {
                    drawCircle(col * gridSize + gridSize / 2, row * gridSize + gridSize / 2, 3, 'white');
                }
            }
        }
    
        drawText(`Score: ${score}`, 10, 20, 'white');
        drawText(`Lives: ${lives}`, canvas.width - 70, 20, 'white');
    
        drawCircle(pacman.x + gridSize / 2, pacman.y + gridSize / 2, gridSize / 2, 'yellow');
    
        for (let i = 0; i < ghosts.length; i++) {
            drawCircle(ghosts[i].x + gridSize / 2, ghosts[i].y + gridSize / 2, gridSize / 2, ghosts[i].color);
        }
    
        for (let i = 0; i < pellets.length; i++) {
            drawCircle(pellets[i].x + gridSize / 2, pellets[i].y + gridSize / 2, 3, 'white');
        }
    
        // Update game objects
        if (!gameover) {
            if (upPressed && pacman.dir !== 'down') {
                pacman.dir = 'up';
            } else if (downPressed && pacman.dir !== 'up') {
                pacman.dir = 'down';
            } else if (leftPressed && pacman.dir !== 'right') {
                pacman.dir = 'left';
            } else if (rightPressed && pacman.dir !== 'left') {
                pacman.dir = 'right';
            }
    
            if (pacman.dir === 'up') {
                pacman.y -= pacman.speed;
            } else if (pacman.dir === 'down') {
                pacman.y += pacman.speed;
            } else if (pacman.dir === 'left') {
                pacman.x -= pacman.speed;
            } else if (pacman.dir === 'right') {
                pacman.x += pacman.speed;
            }
    
            pacman.mouth += 0.2;
            if (pacman.mouth >= Math.PI / 4) {
                pacman.mouth = 0;
            }
    
            for (let i = 0; i < ghosts.length; i++) {
                if (isColliding(pacman, ghosts[i])) {
                    lives--;
                    if (lives > 0) {
                        resetGame();
                    } else {
                        gameover = true;
                    }
                    return;
                }
    
                if (ghosts[i].dir === 'up') {
                    ghosts[i].y -= ghosts[i].speed;
                } else if (ghosts[i].dir === 'down') {
                    ghosts[i].y += ghosts[i].speed;
                } else if (ghosts[i].dir === 'left') {
                    ghosts[i].x -= ghosts[i].speed;
                } else if (ghosts[i].dir === 'right') {
                    ghosts[i].x += ghosts[i].speed;
                }
    
                if (isColliding(pacman, ghosts[i])) {
                    lives--;
                    if (lives > 0) { // check if lives is greater than 0
                        respawnPacman(); // respawn pacman if lives > 0
                    } else {
                        gameOver(); // end the game if lives <= 0
                    }
                }
                
// Update ghost direction
function updateGhostDirection(ghost) {
	let possibleDirs = [];
	if (ghost.row > 0 && level[ghost.row - 1][ghost.col] !== 2) {
		possibleDirs.push('up');
	}
	if (ghost.row < numRows - 1 && level[ghost.row + 1][ghost.col] !== 2) {
		possibleDirs.push('down');
	}
	if (ghost.col > 0 && level[ghost.row][ghost.col - 1] !== 2) {
		possibleDirs.push('left');
	}
	if (ghost.col < numCols - 1 && level[ghost.row][ghost.col + 1] !== 2) {
		possibleDirs.push('right');
	}

	let dir;
	do {
		let rand = Math.floor(Math.random() * possibleDirs.length);
		dir = possibleDirs[rand];
	} while (dir === oppositeDirs[ghost.dir]);

	ghost.dir = dir;
}

// Game over
function gameOver() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawText('GAME OVER', canvas.width / 2, canvas.height / 2, 'white', 'center');

	setTimeout(() => {
		document.location.reload();
	}, 3000);
}

// Game loop
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw game objects
	drawRect(0, 0, canvas.width, canvas.height, 'black');

	for (let row = 0; row < numRows; row++) {
		for (let col = 0; col < numCols; col++) {
			if (level[row][col] === 1) {
				drawCircle(col * gridSize + gridSize / 2, row * gridSize + gridSize / 2, 3, 'white');
			}
		}
	}

	drawText(`Score: ${score}`, 10, 20, 'white');
	drawText(`Lives: ${lives}`, canvas.width - 70, 20, 'white');

	drawCircle(pacman.x + gridSize / 2, pacman.y + gridSize / 2, gridSize / 2, 'yellow');

	for (let i = 0; i < ghosts.length; i++) {
		drawCircle(ghosts[i].x + gridSize / 2, ghosts[i].y + gridSize / 2, gridSize / 2, ghosts[i].color);
	}

	for (let i = 0; i < pellets.length; i++) {
		drawCircle(pellets[i].x + gridSize / 2, pellets[i].y + gridSize / 2, 3, 'white');
	}

	// Update game objects
	if (!gameover) {
		if (upPressed && pacman.dir !== 'down') {
			pacman.dir = 'up';
		} else if (downPressed && pacman.dir !== 'up') {
			pacman.dir = 'down';
		} else if (leftPressed && pacman.dir !== 'right') {
			pacman.dir = 'left';
		} else if (rightPressed && pacman.dir !== 'left') {
			pacman.dir = 'right';
		}

		if (pacman.dir === 'up') {
			pacman.y -= pacman.speed;
		} else if (pacman.dir === 'down') {
			pacman.y += pacman.speed;
		} else if (pacman.dir === 'left') {
			pacman.x -= pacman.speed;
		} else if (pacman.dir === 'right') {
			pacman.x += pacman.speed;
		}
	}

	// missing code should be here

}

// Check collisions
for (let i = 0; i < pellets.length; i++) {
    if (collides(pacman, pellets[i])) {
        score += 10;
        pellets.splice(i, 1);
        break;
    }
}

for (let i = 0; i < ghosts.length; i++) {
    if (collides(pacman, ghosts[i])) {
        lives--;
        if (lives === 0) {
            gameover = true;
        } else {
            pacman.x = startX;
            pacman.y = startY;
            pacman.dir = 'right';
            for (let j = 0; j < ghosts.length; j++) {
                ghosts[j].x = ghosts[j].startX;
                ghosts[j].y = ghosts[j].startY;
                ghosts[j].dir = 'none';
            }
        }
        break;
    }
}

// Move ghosts
for (let i = 0; i < ghosts.length; i++) {
    if (ghosts[i].dir === 'none') {
        updateGhostDirection(ghosts[i]);
    }

    if (ghosts[i].dir === 'up') {
        ghosts[i].y -= ghosts[i].speed;
    } else if (ghosts[i].dir === 'down') {
        ghosts[i].y += ghosts[i].speed;
    } else if (ghosts[i].dir === 'left') {
        ghosts[i].x -= ghosts[i].speed;
    } else if (ghosts[i].dir === 'right') {
        ghosts[i].x += ghosts[i].speed;
    }

    if (ghosts[i].x % gridSize === 0 && ghosts[i].y % gridSize === 0) {
        updateGhostDirection(ghosts[i]);
    }
}

// Check victory
if (pellets.length === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawText('YOU WIN!', canvas.width / 2, canvas.height / 2, 'white', 'center');

    setTimeout(() => {
        document.location.reload();
    }, 3000);
}
}

// Request next frame
requestAnimationFrame(draw);
}

// Start game
draw();
    }