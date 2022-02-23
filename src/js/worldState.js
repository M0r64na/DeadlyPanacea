// the world with the different houses

var worldState = {
    create: function () {
        game.world.setBounds(0, 0, width * 3, height * 3);
		
	background = game.add.image(0, 0, 'background');
	background.scale.setTo(width * 3 / 273, height * 3 / 121);

        // player
        player = game.add.sprite(0, 0, 'ball');
        player.enableBody = true;

        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;

        player.animations.add('left', [1, 0], 3.5);
        player.animations.add('right', [2, 3], 3.5);

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

        // enters
        doorsEnt = game.add.physicsGroup();
        doorsEnt.enableBody = true;

        door1 = doorsEnt.create(100, 100, 'rectangle');
        door1.scale.setTo(0.1, 1.7);

        door2 = doorsEnt.create(200, 200, 'rectangle');
        door2.scale.setTo(0.1, 1.7);

        // exits
        doorsExt = game.add.physicsGroup();
        doorsExt.enableBody = true;

        door1 = doorsExt.create(640, 450, 'rectangle');
        door1.scale.setTo(0.1, 1.7);
		
	// ------------------UI-----------------------
	// menu background
        rectangle = game.add.image(width / 2 - 325, height - 180, 'rectangle');

        rectangle.fixedToCamera = true;
		
        // image of player
        playerImage = game.add.sprite(width / 2 - 305, height - 160, 'playerImage');

        playerImage.scale.setTo(0.7, 0.7);
        playerImage.fixedToCamera = true;

        // health bar
        healthBarConfig = { x: width / 2 - 35, y: height - 120, height: 20 };

        healthBar = new HealthBar(this.game, healthBarConfig);

        healthBar.setBarColor('#ff1352');
        healthBar.setFixedToCamera(true);
        healthBar.setPercent(100);

        // mana bar
        manaBarConfig = { x: width / 2 - 35, y: height - 80, height: 10 };

        manaBar = new HealthBar(this.game, manaBarConfig);

        manaBar.setBarColor('#1391ff');
        manaBar.setFixedToCamera(true);
        manaBar.setPercent(100);
        
        // other - menu
        other = game.add.image(width / 2 + 117, height - 160, 'other');

        other.scale.setTo(0.9, 0.7);
        other.fixedToCamera = true;
    },
    update: function () {
	if(!pause) {
		game.physics.arcade.overlap(player, doorsEnt);
		game.physics.arcade.collide(player, doorsExt);

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
		}
		else if(cursors.down.isDown) {
			player.body.velocity.y = 300;
		}
		if(mouse.leftButton.isDown) {
			if((mouse.x < width - 50 || mouse.x > width - 12) && (mouse.y < 10 || mouse.y > 50)) {
				weapon.fireAtPointer(mouse);
			}
		}
	}
    }
}
