// the battle arena

var battleState = {
	create: function () {
		// setup the background 
        background = game.add.image(0, 0, 'background');
        background.scale.setTo(width / 273, height / 121);
		
		// create enemy
		enemy1 = createEnemy(width / 3, 100, 'player');
		enemy2 = createEnemy(width * 2 / 3, 100, 'player');
		
		// enemy weapon
		enemyWeapon1 = createWeapon('bullet_1', 400, 150, 300, enemy1);
		enemyWeapon2 = createWeapon('bullet_1', 400, 150, 300, enemy2);
		
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
			// ---------------------RESET VARIABLES---------------------------
			if (enemy1.health <= 0) enemyWeapon1.bullets.destroy();
			if (enemy2.health <= 0) enemyWeapon2.bullets.destroy();
		
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
					easyEnemy(enemy1, enemyWeapon1);
					easyEnemy(enemy2, enemyWeapon2);
					break;
				case "hard":
					hardEnemy(enemy1, enemyWeapon1);
					hardEnemy(enemy2, enemyWeapon2);
					break;
			}
		
			// -------------------------CONTROLLER----------------------------
			playerMovement(player);
			playerFire(player, weapon);
	    }
	}
}