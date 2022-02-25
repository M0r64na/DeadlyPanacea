function createDoor(x1Cord, y1Cord, x2Cord, y2Cord, texture, group) {
    door = group.create(x1Cord, y1Cord, texture);
    door.scale.setTo((x2Cord - x1Cord) / door.width, (y2Cord - y1Cord) / door.height);
    door.body.immovable = true;
    return door;
}

function createEasyHouse(game) {
    game.world.setBounds(width - 400, height - 300, 800, 600);
    table = game.add.image(2000, 1500, 'rectangle');
    table.scale.setTo(0.7, 1.4);
    // player
    player = game.add.sprite(0, 0, 'ball');
    player.enableBody = true;

    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
}

//edna promenliva string da pishe imeto i switch za logikata

//mnogo promenlivi i po tqh da se pravi nivoto