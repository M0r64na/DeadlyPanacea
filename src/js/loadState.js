// load the game textures and start the physics

var loadState = {
    preload: function () {
        game.load.spritesheet('ball', 'assets/baddie.png', 32, 32);
        game.load.image('platform', 'assets/platform.png');
        game.load.image('bookshelf', 'assets/bookshelf.png');
        game.load.image('canvas', 'assets/canvas.png');
        game.load.image('wall', 'assets/wallTile.png');
        game.load.image('floor', 'assets/floor.png');
        game.load.image('table', 'assets/table.png');
        game.load.image('cat', 'assets/cat_box.png');
        game.load.image('sofa', 'assets/sofa.png');
        game.load.image('rug', 'assets/rug.png');
        game.load.image('hostage', 'assets/hostage.png');
        game.load.image('background', 'assets/fon.jpg');
        game.load.image('door', 'assets/door.png');
        game.load.image('pause', 'assets/pause.png');
        game.load.image('play', 'assets/play.png');
        game.load.image('bullet_1', 'assets/bullet_1.png');
        game.load.image('bullet_2', 'assets/bullet_2.png');
        game.load.image('rectangle', 'assets/rectangle.png');
        game.load.image('playerImage', 'assets/status.png');
        game.load.image('other', 'assets/other.jpg');
        game.load.image('house', 'assets/house.png');
        game.load.image('startMenuBackground', 'assets/START.jpg');
        game.load.image('startButton', 'assets/button.png');
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('house');
        //game.state.start('menu');
    }
}