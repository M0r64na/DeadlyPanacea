var width = window.innerWidth;
var height = window.innerHeight;
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
game.state.add('battle', battleState);

game.state.start('load');

var background;
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
var difficulty = "hard";
var interacting = false;
var movementI = 0;
var angle;
var currentWeaponIndex = 1;
var changeWeaponKey;
var movePlayerUpKey;
var movePlayerDownKey;
var movePlayerLeftKey;
var movePlayerRightKey;