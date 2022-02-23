var menuState = {
    create: function () {
        startButton = game.add.button(346, 407, 'startButton', () => { game.state.start('world'); });
		startButton.scale.setTo(0.84, 0.69);

        startMenuBackground = game.add.image(0, 0, 'startMenuBackground');
        startMenuBackground.scale.setTo(width / 1620, height / 894);
    }
}