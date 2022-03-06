var menuState = {
    create: function () {
        startMenuBackground = game.add.image(0, 0, 'startMenuBackground');
        startMenuBackground.scale.setTo(width / 1920, height / 1080);

        title = game.add.image(width / 10, 50, 'title');
        title.scale.setTo(0.5, 0.5);

        startButton = game.add.button(width / 3, height / 3 + 60, 'startButton', () => { game.state.start('world'); });
		startButton.scale.setTo(0.7, 0.7);

        guideButton = game.add.button(width / 3, height / 2 + 70, 'guideButton', () => { game.state.start('guide'); });
        guideButton.scale.setTo(0.7, 0.7);

        firstTestTubeSet = game.add.image(5, 70, 'first_test_tube_set');
        firstTestTubeSet.scale.setTo(0.23, 0.23);

        secondTestTubeSet = game.add.image(width * 4.8 / 7, 70, 'second_test_tube_set');
        secondTestTubeSet.scale.setTo(0.23, 0.23);
    }
}