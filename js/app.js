// canvas 505x606, 1square 100x81

// Enemies our player must avoid
var Enemy = function(x, y, speedx) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x,
    this.y = y,
    this.speedx = speedx,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //turn this into an array of enemies
    this.sprite = 'images/enemy-bug.png'
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Reset enemies position once off screen
    if (this.x > 505) {
        this.x = -101;
    } else {
        this.x = this.x + this.speedx*dt;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player =  function (x, y) {
	this.x = x,
	this.y = y,
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
            if (this.x != 0) {
                this.x -= 101;
            };
        break;
        case 'up':
            if (this.y != 0) {
                this.y -= 83;
            };
        break;
        case 'right':
            if (this.x != 404) {
                this.x += 101;
            };
        break;
        case 'down':
            if (this.y != 415) {
                this.y += 83;
            };
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var Enemy = function(x, y, speedx)
// canvas 505x606, 1square 101x83

var allEnemies = [
    new Enemy(0, 83, 150), 
    new Enemy(202, 2*83, 185), 
    new Enemy(404, 3*83, 200),
    new Enemy(303, 2*83, 185)
    ];

var player = new Player(202, 415);


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
