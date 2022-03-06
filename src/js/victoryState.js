var victoryState = {
    create: function () {
        startMenuBackground = game.add.image(0, 0, 'startMenuBackground');
        startMenuBackground.scale.setTo(width / 1920, height * 3 / 1080);

        title = game.add.image(width / 10, 50, 'title');
        title.scale.setTo(0.5, 0.5);

        style = { font: "bold 28px Informal Roman", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(width / 6, 200, 'Congratulations :)\nYou managed to save your family as well as\nthe invaluable cure for all desease that will help the human civilization to survive!', style);

        startButton = game.add.button(width / 2 - 100, height - 100, 'startButton', () => { game.state.start('world'); });
		startButton.scale.setTo(0.3, 0.3);
    }
}