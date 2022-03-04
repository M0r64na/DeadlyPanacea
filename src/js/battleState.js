// the battle arena

var battleState = {
	create: function () {
		// setup the background 
        background = game.add.image(0, 0, 'background');
        background.scale.setTo(width / 273, height / 121);
		
		// create enemy
		enemy = game.add.sprite(width / 2 - 16, 100, 'ball');
		enemy.enebleBody = true;
		game.physics.arcade.enable(enemy);
		enemy.body.setCircle(enemy.width/2);
		enemy.anchor.setTo(0.5, 0.5);
		enemy.body.collideWorldBounds = true;
		
		enemy.maxHealth = 100;
		enemy.health = 100;
		enemy.body.angle = Math.PI/2;
		
		// enemy weapon
		enemyWeapon = game.add.weapon(10, 'bullet_1');

		enemyWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		enemyWeapon.bulletSpeed = 400;
		enemyWeapon.bulletKillDistance = 150;
		enemyWeapon.fireRate = 300;

		enemyWeapon.trackSprite(enemy, 40, 15, true);
		
		// player
		player = game.add.sprite(width/2, height/2, 'ball');
		player.enableBody = true;
		
		game.physics.arcade.enable(player);
		player.body.setCircle(enemy.width/2);
		player.anchor.setTo(0.5, 0.5);

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
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		
		// -------------------------PHYSICS-------------------------------
		game.physics.arcade.overlap(player, enemy);
		
		// todo player weapons one hitscan+heal but no damage other damage
		// heal will be out of the map, if the player takes it it returns out of the map

		// enemy behaviour
		switch(difficulty) {
			case "easy":
				easyEnemy(game);
				break;
			case "hard":
				hardEnemy(game);
				break;
		}
		
		// -------------------------CONTROLLER----------------------------
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
	}
}
