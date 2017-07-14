// Enemies our player must avoid
var Enemy = function(x, y, speedx) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x,
    this.y = y,
    this.speedx = Math.random() + speedx
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //turn this into an array of enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speedx*dt
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player =  function () {
	this.x = 10,
	this.y = 10,
	this.speed = 0,
	this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function() {
    this.x += this.speed,
    this.y += this.speed
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(exp){
    switch(exp) {
        case 'left':
        this.x--;
        break;
        case 'up':
        this.y++;
        break;
        case 'right':
        this.x++;
        break;
        case 'down':
        this.y--;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(2,1,32), new Enemy(2,1,1), new Enemy(2,1,1)];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
