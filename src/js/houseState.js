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
		player = game.add.sprite(width/2, height/2, 'player');
		player.enableBody = true;

		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		player.anchor.setTo(0.5, 0.5);
        player.body.maxVelocity.x = 300;
        player.body.maxVelocity.y = 300;
        player.body.drag.x = 2000;
        player.body.drag.y = 2000;
    
		setUpPlayerMovementController();
		setUpPlayerMovementAnimations();

		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
		
		switch(difficulty) {
			case "easy":
				player.x = width / 2;
				player.y = height / 2 + 170;
				break;
			case "hard":
				player.x = width / 2 + 175;
				player.y = height / 2 + 200;
				break;
		}

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

		// -------------------------PHYSICS-------------------------------
		game.physics.arcade.collide(player, doors, () => { console.log("zaqk"); } );
		game.physics.arcade.collide(player, walls);
		game.physics.arcade.collide(player, npc, () => { interacting = true; } );

		// -------------------------CONTROLLER----------------------------
		playerMovement();

		// go to battle
		if (interacting) {
			text.visible = true;
			// todo add battle state
        }
    }
}