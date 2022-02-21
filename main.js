var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game(width, height, Phaser.CANVAS, "game", {preload: preload, create: create, update: update, render: render});

var fon, player, cursors, sprite, fons, platform, pauseButton, fireButton, mouse, group, rectangle, border, healthBarConfig, manaBarConfig, playerImage, other, lastX, lastY;
var pause = false;

function preload() {
    game.load.spritesheet('ball', 'assets/baddie.png', 32, 32);
    game.load.image('platform', 'assets/platform.png');
    game.load.image('fon', 'assets/fon.jpg');
    game.load.image('pause', 'assets/pause.png');
    game.load.image('play', 'assets/play.png');
	game.load.image('patron', 'assets/bullet.png');
    game.load.image('rectangle', 'assets/rectangle.png');
    game.load.image('playerImage', 'assets/status.png');
    game.load.image('other', 'assets/other.jpg');
	game.load.spritesheet('house', 'assets/house.png', 200, 200);
}
function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, width * 5, height * 5);
    for (var i = 0; i < width*2/121; i++)
    {
        for (var j = 0; j < height*2/121; j++)
        {
            game.add.image(i*121, j*121, 'fon');
        }
    }

    //fon.enableBody = true;
    player = game.add.sprite(0, 0, 'ball');
    player.enableBody = true;
    game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	player.animations.add('left', [1,0], 3.5);
	player.animations.add('right', [2,3], 3.5);
    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

	//weapon
	weapon = game.add.weapon(10, 'patron');
	weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	weapon.bulletSpeed = 400;
	weapon.bulletKillDistance = 150;
	weapon.fireRate = 1000;
	weapon.trackSprite(player, 40, 15, true);
	mouse = game.input.mousePointer;

    //pause button
    pauseButton = game.add.button(width - 50, 10, 'pause', pauseAndUnpause, this, 2, 1, 0);
    pauseButton.fixedToCamera = true;

    //rectangle
    rectangle = game.add.image(width/2 - 325, height - 180, 'rectangle');
    rectangle.fixedToCamera = true;

    //image of player
    playerImage = game.add.sprite(width/2 - 305, height - 160, 'playerImage');
    playerImage.scale.setTo(0.7, 0.7);
    playerImage.fixedToCamera = true;

    //health bar
    healthBarConfig = {x: width/2 - 35, y: height - 120, height: 20};
	healthBar = new HealthBar(this.game, healthBarConfig);
    healthBar.setBarColor('#ff1352');
    healthBar.setFixedToCamera(true);
    healthBar.setPercent(100); 

    //mana bar
    manaBarConfig = {x: width/2 - 35, y: height - 80, height: 10};
    manaBar = new HealthBar(this.game, manaBarConfig);
    manaBar.setBarColor('#1391ff');
    manaBar.setFixedToCamera(true);
    manaBar.setPercent(100);

    //other - menu
    other = game.add.image(width/2 + 117, height - 160, 'other');
    other.scale.setTo(0.9, 0.7);
    other.fixedToCamera = true;

    //enters
    doorsEnt = game.add.physicsGroup();
    doorsEnt.enableBody = true;
    door1 = doorsEnt.create(100, 100, 'rectangle');
    door1.scale.setTo(0.1, 1.7);
    door2 = doorsEnt.create(200, 200, 'rectangle');
    door2.scale.setTo(0.1, 1.7);

    //exits
    doorsExt = game.add.physicsGroup();
    doorsExt.enableBody = true;
    door1 = doorsExt.create(width * 3, height * 3, 'rectangle');
    door1.scale.setTo(0.1, 1.7);
    door2 = doorsExt.create(width * 3, height * 3, 'rectangle');
    door.scale.setTo(0.1, 1.7);
}
function update(){
    if(pause == false) {
        game.physics.arcade.overlap(player, doorsEnt, enterHouse);
        game.physics.arcade.collide(player, doorsExt, exitHouse);

        //reset dog
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        //move dog
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -300;
		    player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 300;
		    player.animations.play('right');
        }
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -300;
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 300;
        }
	    if (mouse.leftButton.isDown) {
		    if((mouse.x < width - 50 || mouse.x > width - 12) && (mouse.y < 10 || mouse.y > 50)) {
                weapon.fireAtPointer(mouse);
		    }
        }
	}
}
function render(){
    game.debug.geom(fon,'#bd8a2c');
	game.debug.cameraInfo(game.camera, 0, height - 170);
    game.debug.spriteCoords(player, 0, height - 60);
	weapon.debug(0, 20);
}
function pauseAndUnpause() {
    if(pause == false) {
        pauseButton.loadTexture('play', 0);
        pause = true;
	}
    else {
        pauseButton.loadTexture('pause', 0);
        pause = false;
	}
}
function enterHouse() {
    game.camera.setPosition(width * 3, height * 3);
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