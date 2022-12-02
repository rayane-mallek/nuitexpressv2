// this generates the canvas tag on index.html with width/height attributes
let game = new Phaser.Game(900, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    // load all sprites
    game.load.image('bullet', 'img/bullet.png');
    game.load.image('enemyBullet', 'img/enemy-bullet.png');
    game.load.spritesheet('invader', 'img/invader32x32x4.png', 32, 32);
    game.load.spritesheet('ship', 'img/ship64x64x5.png', 64, 64, 5);
    game.load.spritesheet('kaboom', 'img/explode.png', 128, 128);
    game.load.image('starfield', 'img/starfield.png');


    // load all sfx and music
    game.load.audio('music1', 'audio/gradius.mp3');
    game.load.audio('sfx_enemy_die', 'audio/enemy-die.wav');
    game.load.audio('sfx_fire', 'audio/fire.wav');
    game.load.audio('sfx_player_hit', 'audio/player-hit.wav');
}
let player;
let aliens;
let bullets;
let bulletTime = 0;
let bulletDelay = 200;
let cursors;
let fireButton;
let explosions;
let starfield;
let score = 0;
let scoreString = '';
let scoreText;
let lives;
let enemyBullet;
let firingTimer = 0;
let stateText;
let livingEnemies = [];
let music; 
let sfx_fire;
let sfx_enemy_die;
let player_win = false;
let bullet_speed = 120;
let addEnnemies = false;
let ennemiesDelay = 0;
let konamiCode = false;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    music = game.add.audio('music1');
    music.volume = 0.4;
    music.play();


	//	Here we set-up our audio sprites
    sfx_fire = game.add.audio('sfx_fire');
    sfx_fire.allowMultiple = false;


    sfx_player_hit = game.add.audio('sfx_player_hit');
    sfx_player_hit.allowMultiple = true;


    sfx_enemy_die = game.add.audio('sfx_enemy_die');
    sfx_enemy_die.allowMultiple = true;


    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 900, 600, 'starfield');


    //  The starship
    player = game.add.sprite(100, 200, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);


    //  Our two animations, moving up and down.
    player.animations.add('up', [3, 4], 2, false);
    player.animations.add('down', [0, 1], 2, false);


    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);


    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);


    //  The bad guys
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;


    createAliens();


    //  The score
    scoreString = 'Score: ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '72px Consolas', fill: '#fff' });


    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Health: ', { font: '24px Consolas', fill: '#fff' });


    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '32px Consolas', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;


    for (let i = 0; i < 3; i++) {



        let ship = lives.create(game.world.width - 150 + (60 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 0;
        ship.alpha = 0.4;



    }


    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);


    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    

}

function update() {


    //  Scroll the background
    starfield.tilePosition.x -= 3;


    if (player.alive) {



        //  Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);



        if (cursors.left.isDown) {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = 200;
        }



        // keyboard up/down
        if (cursors.up.isDown) {
            player.body.velocity.y = -200;
            player.animations.play('up');
        }
        else if (cursors.down.isDown) {
            player.body.velocity.y = 200;
            player.animations.play('down');
        }
        else {  // stand still
            player.animations.stop();
            player.frame = 2;
        }


        // Konami code?
        if (konamiCode == true) {
            konamiCode = false;

            //player life up to 30
            lives.callAll('revive');
            for (let i = 3; i < 30; i++) {
                let ship = lives.create(game.world.width - 150 - (60 * (i-3)), 60, 'ship');
                ship.anchor.setTo(0.5, 0.5);
                ship.angle = 0;
                ship.alpha = 0.4;      
            }

            //reduce player delay
            bulletDelay = 50;
        }


        //  Firing?
        if (fireButton.isDown) {
            fireBullet();
        }



        if (game.time.now > firingTimer) {
            enemyFires();
        }



        //  Run collision
        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);


        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);

        if(addEnnemies == true && ennemiesDelay < game.time.now){
            createAliens();
            addEnnemies = false;
        }

    }

}

function createAliens() {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 5; x++) {
            let alien = aliens.create(x * 48, y * 50, 'invader');
            alien.anchor.setTo(0.5, 0.5);
            alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            alien.play('fly');
            alien.body.moves = false;
        }
    }
    aliens.x = 600;
    aliens.y = 250;


    //  Start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    let tween = game.add.tween(aliens).to( { x: 400 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);


    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);

}

function setupInvader (invader) {
    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');
}

function descend() {
    aliens.x -= 10;
}

function render() {

}

function fireBullet() {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime) {

        game.add.audio('sfx_fire');
        sfx_fire.volume = 0.2;
        sfx_fire.play();
    
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet) {
            //  And fire it
            bullet.reset(player.x+8, player.y);
            bullet.body.velocity.x = 400;
            bulletTime = game.time.now + bulletDelay;
        }
    }

}

function collisionHandler (bullet, alien) {
    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    game.add.audio('sfx_enemy_die');
    sfx_enemy_die.volume = 0.6;
    sfx_enemy_die.play();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;

    //  And create an explosion :)
    let explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);

    if (aliens.countLiving() == 0) {
        score += 1000;
        scoreText.text = scoreString + score;

        if( bullet_speed < 500 ) {
            //restart the game but keep the score and increase the bullet speed

            // high up the bullet speed by 30%
            bullet_speed = bullet_speed * 1.3;

            //  And bring the aliens back from the dead :)
            aliens.removeAll();
            addEnnemies = true;
            ennemiesDelay = game.time.now + 1500;
        }
        else {
            player_win = true;
            enemyBullets.callAll('kill',this);
            stateText.text = " You Won!, \n Click to restart...";
            stateText.visible = true;
            music.stop();
            // the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
        }
    }
}

function enemyHitsPlayer (player,bullet) {
    game.add.audio('sfx_player_hit');
    sfx_player_hit.volume = 0.6;
    sfx_player_hit.play();

    bullet.kill();

    // create an explosion :)
    let explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    if (player_win == true) return;

    // reduce the life of the player
    live = lives.getFirstAlive();

    if (live) {
        live.kill();
    }

    // PLAYER DIES
    // When the player dies
    if (lives.countLiving() < 1 ) {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text=" Game Over! \n Click to restart...";
        stateText.visible = true;

	    music.stop();

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }
}

function enemyFires() {
    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length = 0;

    aliens.forEachAlive(function(alien) {

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0) {
        
        let random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        let shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,randomPourcentRange(bullet_speed,10));
        firingTimer = game.time.now + 2000;
    }

}


function resetBullet (bullet) {
    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function restart() {
    //  A new level starts
    music.stop();
    music.play();

    score = 0;
    scoreText.text = scoreString + score;
    player_win = false;
    bullet_speed = 120;
    bulletDelay = 200;

    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    aliens.removeAll();
    createAliens();

    //revives the player
    player.revive();
    //hides the text
    stateText.visible = false;
}

function randomPourcentRange(value, range){
    let val = value * (1 + 2*range*(Math.random() - 0.5)/100);
    return val;
}




/******************************************
 * 
 *  KONAMI CODE IN KONAMI CODE EASTEREGG
 * 
 ******************************************/


// suite de touche du konami code
const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
// touche actuel
let current = 0;

let keyHandler = function (event) {


    if (event.key === pattern[current]) {
        current++;
        if (pattern.length === current) {
            current = 0;
            konamiCode=true;
        }
    }
    else {
        current = 0;
    }
};

document.addEventListener('keydown', keyHandler, false);