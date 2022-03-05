// the battle arena

var battleState = {
	create: function () {
		// setup the background 
        background = game.add.image(0, 0, 'background');
        background.scale.setTo(width / 273, height / 121);
		
		// create enemy
		enemy1 = createEnemy(width / 3, 100, 'ball');
		enemy2 = createEnemy(width * 2 / 3, 100, 'ball');
		
		// enemy weapon
		enemyWeapon1 = createWeapon('bullet_1', 400, 150, 300, enemy1);
		enemyWeapon2 = createWeapon('bullet_1', 400, 150, 300, enemy2);
		
		// player
		player = game.add.sprite(width/2, height/2, 'ball');
		player.enableBody = true;
		
		game.physics.arcade.enable(player);
		player.body.setCircle(enemy.width/2);
		player.anchor.setTo(0.5, 0.5);
        player.body.maxVelocity.x = 300;
        player.body.maxVelocity.y = 300;
        player.body.drag.x = 2000;
        player.body.drag.y = 2000;

		player.body.collideWorldBounds = true;

		cursors = game.input.keyboard.createCursorKeys();
		
		// -----------------------------UI------------------------------
	    // menu background
        rectangle = game.add.image(width / 2 - 325, height - 180, 'rectangle');

        rectangle.fixedToCamera = true;
		
        // image of player
        playerImage = game.add.sprite(width / 2 - 305, height - 160, 'playerImage');

        playerImage.scale.setTo(0.7, 0.7);
        playerImage.fixedToCamera = true;
		
        // weapon
        changeWeaponKey = game.input.keyboard.addKey(Phaser.KeyCode.Q);
        createFirstWeapon();

        mouse = game.input.mousePointer;

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
		// ---------------------RESET VARIABLES---------------------------
		
		// -------------------------PHYSICS-------------------------------
		game.physics.arcade.overlap(player, enemy);
		
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
