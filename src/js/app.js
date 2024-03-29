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
game.state.add('guide', guideState);
game.state.add('world', worldState);
game.state.add('house', houseState);
game.state.add('battle', battleState);
game.state.add('defeat', defeatState);
game.state.add('victory', victoryState);

game.state.start('load');

var background;
var player;
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
var lastX = 30;
var lastY = 30;
var difficulty = 'easy';
var interacting = false;
var movementI = 0;
var angle;
var currentWeaponIndex = 1;
var changeWeaponKey;
var movePlayerUpKey;
var movePlayerDownKey;
var movePlayerLeftKey;
var movePlayerRightKey;
var firstHouse;
var secondHouse;
var firstHouseDoor;
var secondHouseDoor;
var playerDamage;
var startMenuBackground;
var title;
var startButton;
var guideButton;
var firstTestTubeSet;
var secondTestTubeSet;