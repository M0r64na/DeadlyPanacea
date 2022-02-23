var game = new Phaser.Game(
                           700,
                           500,
                           Phaser.CANVAS,
                           "game",
                           );

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('world', worldState);

game.state.start('load');

var fon;
var player;
var cursors;
var sprite;
var fons;
var platform;
var pauseButton;
var fireButton;
var mouse;
var group;
var rectangle;
var border;
var healthBarConfig;
var manaBarConfig;
var playerImage;
var other;
var lastX;
var lastY;
var pause = false;

/*function create() {
    
}

function update() {
    if(!pause) {
        game.physics.arcade.overlap(player, doorsEnt, enterHouse);
        game.physics.arcade.collide(player, doorsExt, exitHouse);

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

function render() {
    game.debug.geom(fon,'#bd8a2c');
	game.debug.cameraInfo(game.camera, 0, height - 170);
    game.debug.spriteCoords(player, 0, height - 60);

	weapon.debug(0, 20);
}
*/
function pauseAndUnpause() {
    if(!pause) {
        pauseButton.loadTexture('play', 0);
        pause = true;
	}
    else {
        pauseButton.loadTexture('pause', 0);
        pause = false;
	}
}

function enterHouse() {
    game.camera.setPosition(width * 3, height * 3);
    game.camera.unfollow();

    player.lastX = player.x;
    player.lastY = player.y;

    player.x = game.camera.x + width / 2;
    player.y = game.camera.y + height / 2;
}

function exitHouse() {
    player.x = player.lastX;
    player.y = player.lastY + 30;
    
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
}