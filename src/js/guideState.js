var guideState = {
    create: function () {
        startMenuBackground = game.add.image(0, 0, 'startMenuBackground');
        startMenuBackground.scale.setTo(width / 1920, height * 3 / 1080);

        title = game.add.image(width / 10, 50, 'title');
        title.scale.setTo(0.5, 0.5);

        style = { font: "bold 28px Informal Roman", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(width / 6, 150, 'Dear jury,\nThere is a text document containig the story of the game in the game folder.\n\nNOTE: The player is moved by the following keyboard keys:\nW => UP\nS => DOWN\nA => LEFT\nD => RIGHT\nThe player fires bullets by clicking the left mouse button.', style);

        startButton = game.add.button(width / 2 - 100, height - 100, 'startButton', () => { game.state.start('world'); });
		startButton.scale.setTo(0.3, 0.3);
    }
}