var width = window.innerWidth;
var height = window.innerHeight;
console.log(width, height);
var game = new Phaser.Game(
                           width,
                           height,
                           Phaser.CANVAS,
                           "body",
                           'load',
                           true,
                           false
                           );

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('world', worldState);
game.state.add('house', houseState);

game.state.start('load');

//var background;
var player;
var cursors;
var sprite;
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
var doors;
var lastX = 0;
var lastY = 0;
var house = "hard";
var interacting = false;
