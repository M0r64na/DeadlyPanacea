// 

var menuState = {
    create: function () {
        var startText = game.add.text(80, 80, 'Start', { fill: '#ffffff' });
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.start, this);
    },
    start: function () {
        game.state.start('world');
        console.log("w dwon");
    }
}
