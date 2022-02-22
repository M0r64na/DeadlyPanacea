var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game(
                           width,
                           height,
                           Phaser.CANVAS,
                           "game",
                           {preload: preload, create: create, update: update, render: render}
                           );

var fon;
var player;
var cursors;
var sprite;
var fons;
var platform;
var pauseButton;
var fireButton;
var mouse;
var group;
var rectangle;
var border;
var healthBarConfig;
var manaBarConfig;
var playerImage;
var other;
var lastX;
var lastY;
var pause = false;

function preload() {
    game.load.spritesheet('ball', 'assets/baddie.png', 32, 32);
    game.load.image('platform', 'assets/platform.png');
    game.load.image('fon', 'assets/fon.jpg');
    game.load.image('door', 'assets/door.png');
    game.load.image('pause', 'assets/pause.png');
    game.load.image('play', 'assets/play.png');
	game.load.image('patron', 'assets/bullet.png');
    game.load.image('rectangle', 'assets/rectangle.png');
    game.load.image('playerImage', 'assets/status.png');
    game.load.image('other', 'assets/other.jpg');
	game.load.image('house', 'assets/house.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.setBounds(0, 0, width * 5, height * 5);

    for (var i = 0; i < width*2/121; i++) {
        for (var j = 0; j < height*2/121; j++) {
            game.add.image(i*121, j*121, 'fon');
        }
    }

    // player
    player = game.add.sprite(0, 0, 'ball');
    player.enableBody = true;

    game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;

	player.animations.add('left', [1,0], 3.5);
	player.animations.add('right', [2,3], 3.5);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

	// weapon
	weapon = game.add.weapon(10, 'patron');

	weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	weapon.bulletSpeed = 400;
	weapon.bulletKillDistance = 150;
	weapon.fireRate = 1000;

	weapon.trackSprite(player, 40, 15, true);

	mouse = game.input.mousePointer;

    // pause button
    pauseButton = game.add.button(width - 50, 10, 'pause', pauseAndUnpause, this, 2, 1, 0);

    pauseButton.fixedToCamera = true;

    // rectangle
    rectangle = game.add.image(width/2 - 325, height - 180, 'rectangle');

    rectangle.fixedToCamera = true;

    // image of player
    playerImage = game.add.sprite(width/2 - 305, height - 160, 'playerImage');

    playerImage.scale.setTo(0.7, 0.7);
    playerImage.fixedToCamera = true;

    // health bar
    healthBarConfig = {x: width/2 - 35, y: height - 120, height: 20};

	healthBar = new HealthBar(this.game, healthBarConfig);

    healthBar.setBarColor('#ff1352');
    healthBar.setFixedToCamera(true);
    healthBar.setPercent(100); 

    // mana bar
    manaBarConfig = {x: width/2 - 35, y: height - 80, height: 10};

    manaBar = new HealthBar(this.game, manaBarConfig);

    manaBar.setBarColor('#1391ff');
    manaBar.setFixedToCamera(true);
    manaBar.setPercent(100);

    // other - menu
    other = game.add.image(width/2 + 117, height - 160, 'other');

    other.scale.setTo(0.9, 0.7);
    other.fixedToCamera = true;

    // setup group physics for  the doors
    doorsEnt = game.add.physicsGroup();
    doorsEnt.enableBody = true;
    game.physics.arcade.enable(doorsEnt);

    // create the doors TODO make them separate
    doorHelen = createDoor(100, 100, 150, 150, 'door', doorsEnt);
    doorHelen.body.onCollide = new Phaser.Signal();
    doorHelen.body.onCollide.add(enterHouse, 300, 300);

    doorJosh = createDoor(100, 200, 150, 250, 'door', doorsEnt);
    doorStanley = createDoor(200, 200, 250, 250, 'door', doorsEnt);

    // setup exits logic
    doorsExt = game.add.physicsGroup();
    doorsExt.enableBody = true;
    game.physics.arcade.enable(doorsExt);
    doorPeter = createDoor(200, 100, 250, 150, 'door', doorsExt);
}

function update() {
    if(!pause) {
        game.physics.arcade.collide(player, doorsEnt, () => {console.log("collide")});
        game.physics.arcade.collide(player, doorsExt, exitHouse);

        // reset dog
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        // move dog
        if(cursors.left.isDown) {
            player.body.velocity.x = -300;
		    player.animations.play('left');
        }
        else if(cursors.right.isDown) {
            player.body.velocity.x = 300;
		    player.animations.play('right');
        }
        if(cursors.up.isDown) {
            player.body.velocity.y = -300;
            player.animations.play('right');
        }
        else if(cursors.down.isDown) {
            player.body.velocity.y = 300;
            player.animations.play('left');
        }
	    if(mouse.leftButton.isDown) {
		    if((mouse.x < width - 50 || mouse.x > width - 12) && (mouse.y < 10 || mouse.y > 50)) {
                weapon.fireAtPointer(mouse);
		    }
        }
	}
}

function render() {
    game.debug.geom(fon,'#bd8a2c');
	game.debug.cameraInfo(game.camera, 0, height - 170);
    game.debug.spriteCoords(player, 0, height - 60);

	weapon.debug(0, 20);
}

function pauseAndUnpause() {
    if(!pause) {
        pauseButton.loadTexture('play', 0);
        pause = true;
	}
    else {
        pauseButton.loadTexture('pause', 0);
        pause = false;
	}
}

function createDoor(x1Cord, y1Cord, x2Cord, y2Cord, texture, group) {
    door = group.create(x1Cord, y1Cord, texture);
    door.scale.setTo((x2Cord - x1Cord) / door.width, (y2Cord - y1Cord) / door.height);
    door.body.immovable = true;
    return door;
}

function enterHouse(x, y) {
    console.log(x, y);
    game.camera.x = x;
    game.camera.y = y;
    game.camera.unfollow();

    player.lastX = player.x;
    player.lastY = player.y;

    player.x = game.camera.x + width / 2;
    player.y = game.camera.y + height / 2;
}

function exitHouse() {
    player.x = player.lastX;
    player.y = player.lastY + 30;
    
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
}
