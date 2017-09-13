var Engine = (function(global) {
    /*canvas*/
    var doc = global.document;
    var win = global.window;
    var canvas = doc.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var lastTime;

    canvas.width = 707;
    canvas.height = 808;
    ctx.font = "25pt Chewy";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    doc.body.appendChild(canvas);

    /* Game Loop*/
    function main() {
        /*time delta for smooth animation*/
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /*use time delta for smooth animation*/
        update(dt);
        render();

        /* used to determine the time delta for the next time this function is called.*/
        lastTime = now;

        /* this creates the animation effect*/
        win.requestAnimationFrame(main);
    }

    /*initial setup*/
    function init() {
        reset();
    }

    function lvlOne() {
                var rowImages = [
                'images/grass-block.png',   // Top row
                'images/stone-block.png',   
                'images/stone-block.png',  
                'images/stone-block.png',   
                'images/stone-block.png',  
                'images/stone-block.png',   
                'images/stone-block.png',
                'images/grass-block.png',

            ],
            numRows = 8,
            numCols = 7,
            row, col;

            //creates level
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
    }

    //good spot to implement collision features
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    /* Calls game pieces update methods*/
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });

        allTargets.forEach(function(target) {
            target.update();
        });

        player.update();
    }

    /* renders game stage or winner stage*/
    function render() {
        //draws level
        lvlOne();

        //checks to see if game's won and then draws game menu
        for (var i = 0; i < allTargets.length; i++) {
            if (player.x == allTargets[i].x && player.y == allTargets[i].y) {
                ctx.drawImage(Resources.get(player.sprite), 303, 4*73);

                ctx.fillText("YOU'RE A SUPERSTAR!", canvas.width/2, 4*75);
                ctx.fillText("PRESS THE SPACEBAR TO PLAY AGAIN", canvas.width/2, 7*83)
                player.handleInput = (exp) => {
                    switch(exp) {
                        case "left":
                        break;
                        case "up":
                        break;
                        case "right":
                        break;
                        case "down":
                        break;
                        case "space":
                            window.location.reload(false);
                        break;
                    }
                }
            } 
            else {
                renderEntities();
            }
        }
    }

    /* calls game pieces render function*/
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        allTargets.forEach(function(target) {
            target.render();
        })

        player.render();
    }

    /* initial character select menu*/
    function reset() {
        let spriteImage = null;
        let selector = {
            x: 303,
            resetHandleInput: (direction) => {
                switch(direction) {
                case 'space':

                    switch(selector.x) {
                        case 101:
                            spriteImage = 'images/char-boy.png'
                        break;
                        case 202:
                            spriteImage = 'images/char-cat-girl.png'
                        break;
                        case 303:
                            spriteImage = 'images/char-horn-girl.png'
                        break;
                        case 404:
                            spriteImage = 'images/char-pink-girl.png'
                        break;
                        case 505:
                            spriteImage = 'images/char-princess-girl.png'
                    }
                    //creates player
                    global.player = new Player(303, 7*83, spriteImage);
                    //stops listener
                    selector.resetHandleInput = (direction) => {
                        switch(direction) {
                            case "left":
                            break;
                            case "right": 
                            break;
                            case "space":
                            break;
                        }
                    }
                    lastTime = Date.now();
                    //starts game loop
                    main();

                break;
                case 'left':
                    if (selector.x != 101) {
                        selector.x -= 101;
                    };
                break;
                case 'right':
                    if (selector.x != 505) {
                        selector.x += 101;
                    };
                };
            }
        };
        //character select menu content
        let renderMenu = function () {
            lvlOne();
            ctx.drawImage(Resources.get('images/Selector.png'), selector.x, 3*83);
            ctx.drawImage(Resources.get('images/char-boy.png'), 101, 3*83);
            ctx.drawImage(Resources.get('images/char-cat-girl.png'), 202, 3*83);
            ctx.drawImage(Resources.get('images/char-horn-girl.png'), 303, 3*83);
            ctx.drawImage(Resources.get('images/char-pink-girl.png'), 404, 3*83);
            ctx.drawImage(Resources.get('images/char-princess-girl.png'), 505, 3*83);
            ctx.fillText("USE THE SPACE BAR TO SELECT CHRARACTER", canvas.width/2, 6*83);
            ctx.fillText("USE ARROW KEYS TO MOVE", canvas.width/2, 7*83);
            win.requestAnimationFrame(renderMenu);
        }
        renderMenu();


            document.addEventListener('keyup', function(e) {
                    let allowedKeys = {
                        32: 'space',
                        37: 'left',
                        39: 'right'
                    };
                selector.resetHandleInput(allowedKeys[e.keyCode]);
            });

  
    };



    //images for resources load file that caches images
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Selector.png',
        'images/Star.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png'

    ]);
    Resources.onReady(init);

    //makes it easier to use by other js files if its global
    global.ctx = ctx;
})(this);
