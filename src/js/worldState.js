// the world with the different houses

var worldState = {
    create: function () {
        game.world.setBounds(0, 0, width * 3, height * 3);
		
	    background = game.add.image(0, 0, 'background');
	    background.scale.setTo(width * 3 / 273, height * 3 / 121);

        // player
        player = game.add.sprite(lastX, lastY, 'ball');
        player.enableBody = true;

        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.maxVelocity.x = 300;
        player.body.maxVelocity.y = 300;
        player.body.drag.x = 2000;
        player.body.drag.y = 2000;

        cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

        // weapon - move to battle state
        changeWeaponKey = game.input.keyboard.addKey(Phaser.KeyCode.Q);
        createFirstWeapon();

        mouse = game.input.mousePointer;

	    // pause button
	    pauseButton = game.add.button(width - 50, 10, 'pause', pauseAndUnpause, this, 2, 1, 0);
    
        pauseButton.fixedToCamera = true;

        // ------------------WORLD CREATION-----------------------
        // setup group physics for  the doors
        doors = game.add.physicsGroup();
        doors.enableBody = true;
        game.physics.arcade.enable(doors);

        // create the doors TODO make them separate
        doorHelen = createDoor(100, 100, 150, 150, 'door', doors);

        doorJosh = createDoor(100, 200, 150, 250, 'door', doors);
        doorStanley = createDoor(200, 200, 250, 250, 'door', doors);

        // setup exits logic
        doorsExt = game.add.physicsGroup();
        doorsExt.enableBody = true;
        game.physics.arcade.enable(doorsExt);
        doorPeter = createDoor(200, 100, 250, 150, 'door', doorsExt);
		
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
		    game.physics.arcade.collide(player, doors);
		    game.physics.arcade.collide(player, doorsExt);

		    // reset dog
            player.body.acceleration.x = 0;
            player.body.acceleration.y = 0;

		    // move dog
		    if(cursors.left.isDown) {
			    player.body.acceleration.x -= 2000;
			    player.animations.play('left');
		    }
		    else if(cursors.right.isDown) {
                player.body.acceleration.x += 2000;
			    player.animations.play('right');
		    }
		    if(cursors.up.isDown) {
			    player.body.acceleration.y -= 2000;
		    }
		    else if(cursors.down.isDown) {
			    player.body.acceleration.y += 2000;
		    }

		    if(mouse.leftButton.isDown) {
			    if((mouse.x < width - 50 || mouse.x > width - 12) && (mouse.y < 10 || mouse.y > 50)) {
				    weapon.fireAtPointer(mouse);
			    }
		    }

            if(changeWeaponKey.isDown) {
                ++currentWeaponIndex;

                if(currentWeaponIndex > 2) {
                    currentWeaponIndex = 1;
                }
                
                if(currentWeaponIndex == 1) 
                {
                    createFirstWeapon();
                }
                else 
                {
                    createSecondWeapon();
                }
            }
	    }
    }
}

function createFirstWeapon() {
    weapon = game.add.weapon(10, 'bullet_1');

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 400;
    weapon.bulletKillDistance = 150;
    weapon.fireRate = 1000;

    weapon.trackSprite(player, 40, 15, true);
}

function createSecondWeapon() {
    weapon = game.add.weapon(10, 'bullet_2');

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 650;
    weapon.bulletKillDistance = 100;
    weapon.fireRate = 800;

    weapon.trackSprite(player, 40, 15, true);
}