// load the game textures and start the physics

var loadState = {
    preload: function () {
        game.load.spritesheet('ball', 'assets/baddie.png', 32, 32);
        game.load.image('platform', 'assets/platform.png');
        game.load.image('background', 'assets/fon.jpg');
        game.load.image('door', 'assets/door.png');
        game.load.image('pause', 'assets/pause.png');
        game.load.image('play', 'assets/play.png');
		game.load.image('bullet', 'assets/bullet.png');
        game.load.image('bullet_2', 'assets/bullet_2.png');
        game.load.image('rectangle', 'assets/rectangle.png');
        game.load.image('playerImage', 'assets/status.png');
        game.load.image('other', 'assets/other.jpg');
        game.load.image('house', 'assets/house.png');
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('battle');
    }
}