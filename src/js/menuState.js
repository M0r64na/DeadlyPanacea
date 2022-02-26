var menuState = {
    create: function () {
        startButton = game.add.button(346, 407, 'startButton', () => { game.state.start('world'); });
		startButton.scale.setTo(0.84, 0.69);

        // TO DO - add how-to-play button
        // howToPlayButton = game.add.button(x1, y1, 'howToPlayButton', () => { game.state.start('guide'); });
        // startButton.scale.setTo(x2, y2);

        startMenuBackground = game.add.image(0, 0, 'startMenuBackground');
        startMenuBackground.scale.setTo(width / 1620, height / 894);
    }
}