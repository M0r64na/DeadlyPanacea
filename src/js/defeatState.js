var defeatState = {
    create: function () {
        startMenuBackground = game.add.image(0, 0, 'startMenuBackground');
        startMenuBackground.scale.setTo(width / 1920, height * 3 / 1080);

        title = game.add.image(width / 10, 50, 'title');
        title.scale.setTo(0.5, 0.5);

        style = { font: "bold 28px Informal Roman", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(width / 6, 200, 'Oh, noooooo! You didn\'t manage to save your family today!\nBut don\'t worry - your enemies have told that the will give you another chance\nto trade yoyr family\'s safety fr the invaluable desease cure!\nWill you succeed this time?\nWish you luck!.\nMay the force be with you :)', style);

        startButton = game.add.button(width / 2 - 100, height - 100, 'startButton', () => { game.state.start('world'); });
		startButton.scale.setTo(0.3, 0.3);
    }
}