// canvas 808x581, 1square 100x83

// Enemy class
var Enemy = function(x, y, speedx) {
    this.x = x,
    this.y = y,
    this.speedx = (Math.random() + 1)*speedx,
    this.sprite = 'images/enemy-bug.png'
};


// Updates the enemy's position when offscreen
Enemy.prototype.update = function(dt) {

    //Reset enemies position once off screen
    if (this.x > 808) {
        this.x = -101;
    } else {
        this.x = this.x + this.speedx*dt;
    };
};


// Draws enemies
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Player class
var Player =  function(x, y, spriteImage) {
	this.x = x,
	this.y = y,
	this.sprite = spriteImage
};


//player-enemy collision detection
Player.prototype.update = function() {
    for (var i = 0; i < allEnemies.length; i++) {
                if (this.y == allEnemies[i].y && this.x + 60 > allEnemies[i].x && this.x < allEnemies[i].x + 60) {
                    this.x = 303;
                    this.y = 7*83;
            };
        };
};

//Draws player
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//controls
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
            if (this.x != 606) {
                this.x += 101;
            };
        break;
        case 'down':
            if (this.y != 7*83) {
                this.y += 83;
            };
    }
};


var Target = function(x, y, image) {
    this.x = x,
    this.y = y,
    this.image = image
}

Target.prototype.update = function() {

};

Target.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);

};

//instantiates player, null until character is selected
player = new Player(303, 7*83, null);

// var Enemy = function(x, y, speedx)
// canvas 8*101x7*83, 1square 101x83
var allEnemies = [
    new Enemy(0, 83, 300),
    new Enemy(303, 83, 350),
    new Enemy(606, 83, 400),
    new Enemy(101, 2*83, 265), 
    new Enemy(505, 2*83, 190),
    new Enemy(707, 2*83, 350),
    new Enemy(202, 3*83, 185),
    new Enemy(404, 3*83, 220),
    new Enemy(606, 3*83, 370),
    new Enemy(0, 4*83, 185), 
    new Enemy(303, 4*83, 245),
    new Enemy(606, 4*83, 325),
    new Enemy(202, 5*83, 200),
    new Enemy(505, 5*83, 250),
    new Enemy(808, 5*83, 210),
    new Enemy(101, 6*83, 290),
    new Enemy(404, 6*83, 250),
    new Enemy(707, 6*83, 210)
    ];

//var Targets = function(x, y, image)
var allTargets = [
    new Target(303, 0, 'images/Star.png'),
];

// This listens for key presses and sends the keys to Player.handleInput() method.
    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            32: "space",
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    });
