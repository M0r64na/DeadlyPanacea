// the house which the player enters

var cursors;
var houseState = {
    create: function () {
        background = game.add.image(0, 0, 'background');
        background.scale.setTo(width / 273, height / 121);
        createEasyHouse(game);
    },
	update: function () {

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