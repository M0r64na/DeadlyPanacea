// the house which the player enters

var cursors;
var houseState = {
    create: function () {
        background = game.add.image(0, 0, 'background');
        background.scale.setTo(width / 273, height / 121);
		
        doors = game.add.physicsGroup();
        doors.enableBody = true;
        game.physics.arcade.enable(doors);
		
		// create house logic
		switch(house) {
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
    },
	update: function () {
		game.physics.arcade.collide(player, doors, () => { console.log("zaqk"); } );
		game.physics.arcade.collide(player, walls);

		// reset dog
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		// move dog
		if (cursors.left.isDown) {
			player.body.velocity.x = -300;
		}
		else if (cursors.right.isDown) {
			player.body.velocity.x = 300;
		}
		if (cursors.up.isDown) {
			player.body.velocity.y = -300;
		}
		else if (cursors.down.isDown) {
			player.body.velocity.y = 300;
		}
    }
}