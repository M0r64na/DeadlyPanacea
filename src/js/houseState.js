// the house which the player enters

var houseState = {
	create: function () {
		// setup the background 
        background = game.add.image(0, 0, 'background');
        background.scale.setTo(width / 273, height / 121);

		// create a physics group for doors 
		doors = game.add.physicsGroup();
        doors.enableBody = true;
        game.physics.arcade.enable(doors);
		
		// create house logic
		switch(difficulty) {
			case "easy":
				createEasyHouse(game);
				break;
			case "hard":
				createHardHouse(game);
				break;
		}
		
		// player
		player = game.add.sprite(width/2, height/2, 'ball');
		player.enableBody = true;

		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;

		cursors = game.input.keyboard.createCursorKeys();

		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

		// npc
		npc = game.add.sprite(width / 2 - 100, height / 2 - 100, 'ball');
		npc.enableBody = true;
		game.physics.arcade.enable(npc);
		npc.body.immovable = true;

		// text (for texting purposes)
		text = game.add.text(300, 10, "touch");
		text.visible = false;
    },
	update: function () {
		// ------------------------RESET VARIABLES------------------------
		interacting = false;
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		// -------------------------PHYSICS-------------------------------
		game.physics.arcade.collide(player, doors, () => { console.log("zaqk"); } );
		game.physics.arcade.collide(player, walls);
		game.physics.arcade.collide(player, npc, () => { interacting = true; } );

		// -------------------------CONTROLLER----------------------------
		// move dog
		if (cursors.left.isDown) {
			player.body.velocity.x = -300;
			text.visible = false;
		}
		else if (cursors.right.isDown) {
			player.body.velocity.x = 300;
			text.visible = false;
		}
		if (cursors.up.isDown) {
			player.body.velocity.y = -300;
			text.visible = false;
		}
		else if (cursors.down.isDown) {
			player.body.velocity.y = 300;
			text.visible = false;
		}

		// go to battle
		if (interacting) {
			text.visible = true;
			// todo add battle state
        }
    }
}