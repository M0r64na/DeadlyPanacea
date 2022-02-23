var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game(
                           width,
                           height,
                           Phaser.CANVAS,
                           "game",
                           );

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('world', worldState);

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
var lastX;
var lastY;
