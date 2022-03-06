// the world with the different houses

var worldState = {
    create: function () {
        // world background
        background = game.add.image(0, 0, 'background');

        walls = game.add.physicsGroup();
        walls.enableBody = true;

        wall = walls.create(background.width / 2 - 520, 0);
        wall.scale.setTo(1040 / 32, 625 / 32);
        wall.body.immovable = true;

        wall = walls.create(background.width / 2 - 335, 625);
        wall.scale.setTo(670 / 32, 223 / 32);
        wall.body.immovable = true;

        game.world.setBounds(0, 0, background.width, background.height);

        // player
        player = game.add.sprite(lastX, lastY, 'ball');
        player.enableBody = true;

        setUpPlayerMovementController();

        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.maxVelocity.x = 300;
        player.body.maxVelocity.y = 300;
        player.body.drag.x = 2000;
        player.body.drag.y = 2000;

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

        // ------------------WORLD CREATION-----------------------
        // setup group physics for  the doors
        doors = game.add.physicsGroup();
        doors.enableBody = true;
        game.physics.arcade.enable(doors);

        // create houses
        houses = game.add.physicsGroup();
	    houses.enableBody = true;

        firstHouse = houses.create(background.width / 12 + 60, background.height / 2 + 30, 'house');
	    firstHouse.scale.setTo(0.21, 0.21);
	    firstHouse.body.immovable = true;

        secondHouse = houses.create(background.width * 5 / 6 - 60, background.height / 8, 'house');
	    secondHouse.scale.setTo(0.21, 0.21);
	    secondHouse.body.immovable = true;

        // create the doors
        firstHouseDoor = createDoor(firstHouse.x + firstHouse.width / 2, firstHouse.y + firstHouse.height / 2, firstHouse.x + firstHouse.width, firstHouse.y + firstHouse.height, 'door', doors);
        secondHouseDoor = createDoor(secondHouse.x + secondHouse.width / 2, secondHouse.y + secondHouse.height / 2, secondHouse.x + secondHouse.width, secondHouse.y + secondHouse.height, 'door', doors);
		
	    // ------------------UI-----------------------
	    // menu background
        /*
        rectangle = game.add.image(width / 2 - 325, height - 180, 'rectangle');

        rectangle.fixedToCamera = true;
		
        // image of player
        playerImage = game.add.sprite(width / 2 - 305, height - 160, 'playerImage');

        playerImage.scale.setTo(0.7, 0.7);
        playerImage.fixedToCamera = true;

        // health bar
        healthBarConfig = { x: width / 2 - 35, y: height - 120, height: 20 };

        healthBar = new HealthBar(this.game, healthBarConfig);

        healthBar.setBarColor('#ff1352');
        healthBar.setFixedToCamera(true);
        healthBar.setPercent(100);

        // mana bar
        manaBarConfig = { x: width / 2 - 35, y: height - 80, height: 10 };

        manaBar = new HealthBar(this.game, manaBarConfig);

        manaBar.setBarColor('#1391ff');
        manaBar.setFixedToCamera(true);
        manaBar.setPercent(100);
        
        // other - menu
        other = game.add.image(width / 2 + 117, height - 160, 'other');

        other.scale.setTo(0.9, 0.7);
        other.fixedToCamera = true;
        */
    },
    update: function () {
        game.physics.arcade.collide(player, walls);
        game.physics.arcade.collide(player, houses);
        game.physics.arcade.collide(player, doors);

        playerMovement();
    }
}