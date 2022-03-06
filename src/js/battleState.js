// the battle arena

var battleState = {
	create: function () {
		// setup the background 
        //background = game.add.image(0, 0, 'background');
        //background.scale.setTo(width / 273, height / 121);
		
        game.world.setBounds(0, 0, width, height - 200);
		
		for(var i = 0; i < width; i += 50){
			for(var j = 0; j < height; j += 50){
				floor = game.add.image(i, j, "floor");
				floor.scale.setTo(50/260, 50/260);
			}
		}
		
		// create enemy
		enemy1 = createEnemy(width / 3, 100, 'enemy');
		enemy1.animations.add('left', [4, 3, 2, 1, 4], 5);
		enemy1.animations.add('right', [5 , 6, 7, 8, 5], 5);
		enemy2 = createEnemy(width * 2 / 3, 100, 'enemy');
		enemy2.animations.add('left', [4, 3, 2, 1, 4], 5);
		enemy2.animations.add('right', [5 , 6, 7, 8, 5], 5);
		
		// enemy weapon
		enemyWeapon1 = createWeapon('bullet_1', 400, 150, 300, enemy1);
		enemyWeapon2 = createWeapon('bullet_1', 400, 150, 300, enemy2);
		
		if (difficulty == "hard"){
			enemy.health = 0;
			enemy2.kill();
			enemy1.x = width / 2;
			enemy1.maxHealth = 200;
			enemyWeapon1.bullets.damage = 10;
		}
		
		// player
		player = game.add.sprite(width/2, height/2, 'player');
		player.enableBody = true;
		
		game.physics.arcade.enable(player);
		player.body.setCircle(enemy.width/2);
		player.anchor.setTo(0.5, 0.5);
        player.body.maxVelocity.x = 300;
        player.body.maxVelocity.y = 300;
        player.body.drag.x = 2000;
        player.body.drag.y = 2000;
		player.maxHealth = 100;
		player.health = 100;

		player.body.collideWorldBounds = true;

		setUpPlayerMovementController();
		setUpPlayerMovementAnimations();
		
        // weapon
        changeWeaponKey = game.input.keyboard.addKey(Phaser.KeyCode.Q);
        createFirstWeapon();

        mouse = game.input.mousePointer;

		// pause button
	    pauseButton = game.add.button(width - 50, 10, 'pause', pauseAndUnpause, this, 2, 1, 0);
    
        pauseButton.fixedToCamera = true;
		
		// -----------------------------UI------------------------------
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
        healthBar.setPercent(player.health);

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
			// ---------------------RESET VARIABLES---------------------------
			if (player.health <= 0) game.state.start("defeat");
			if (enemy1.health <= 0) enemyWeapon1.bullets.destroy();
			if (enemy2.health <= 0) enemyWeapon2.bullets.destroy();
			healthBar.setPercent(player.health);
		
			// -------------------------PHYSICS-------------------------------
			game.physics.arcade.overlap(enemy1, weapon.bullets, hitEnemy);
			game.physics.arcade.overlap(enemy2, weapon.bullets, hitEnemy);
			game.physics.arcade.overlap(player, enemyWeapon1.bullets, hitPlayer);
			game.physics.arcade.overlap(player, enemyWeapon2.bullets, hitPlayer);
			
			// todo player weapons one hitscan+heal but no damage other damage
			// heal will be out of the map, if the player takes it it returns out of the map

			// enemy behaviour
			switch(difficulty) {
				case "easy":
					enemyLogic(enemy1, enemyWeapon1);
					enemyLogic(enemy2, enemyWeapon2);
					break;
				case "hard":
					enemyLogic(enemy1, enemyWeapon1);
					break;
			}
		
			// -------------------------CONTROLLER----------------------------
			playerMovement(player);
			playerFire(player, weapon);
			
			if (enemy1.health <= 0 && enemy2.health <= 0){
				if (difficulty == "hard") game.state.start('win');
				else {
					game.state.start('world');
					difficulty = "hard";
				}
			}
	    }
	}
}